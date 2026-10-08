#!/usr/bin/python3
import argparse
import asyncio
import binascii
import errno
import hashlib
import hmac
import json
import logging
import os
from pathlib import Path
import secrets
import signal
import sqlite3
import struct
import tempfile
import time
from collections import OrderedDict
from concurrent.futures import TimeoutError as FutureTimeoutError
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from urllib.parse import parse_qs, urlsplit

from workflow import read_workflow_logs
from plc_logs import read_plc_write_logs


LOGGER = logging.getLogger("shuttle-simulator")
MAGIC = b"\x55\xaa"
MAX_LENGTH = 120


class ProtocolError(ValueError):
    pass


class ControlError(ValueError):
    pass


def integer(value, name, minimum=0, maximum=255):
    if type(value) is not int or not minimum <= value <= maximum:
        raise ControlError(f"{name} must be an integer from {minimum} to {maximum}")
    return value


def frame(payload):
    length = len(payload) + 1
    if not 2 <= length <= MAX_LENGTH:
        raise ProtocolError("Invalid frame length")
    data = MAGIC + bytes([length]) + payload
    return data + struct.pack(">H", binascii.crc_hqx(data, 0xFFFF))


def decode(data):
    if len(data) < 6 or data[:2] != MAGIC or len(data) != data[2] + 4:
        raise ProtocolError("Invalid frame header or length")
    if not 2 <= data[2] <= MAX_LENGTH:
        raise ProtocolError("Frame exceeds ECS decoder limits")
    if binascii.crc_hqx(data[:-2], 0xFFFF) != int.from_bytes(data[-2:], "big"):
        raise ProtocolError("CRC-16/CCITT-FALSE mismatch")
    return data[3:-2]


class FrameBuffer:
    def __init__(self):
        self.data = bytearray()

    def feed(self, chunk):
        self.data.extend(chunk)
        packets = []
        while len(self.data) >= 3:
            if self.data[:2] != MAGIC:
                raise ProtocolError("Unexpected bytes before 55 AA header")
            length = self.data[2]
            if not 2 <= length <= MAX_LENGTH:
                raise ProtocolError("Invalid length byte")
            total = length + 4
            if len(self.data) < total:
                break
            packet = bytes(self.data[:total])
            decode(packet)
            del self.data[:total]
            packets.append(packet)
        return packets


class Journal:
    def __init__(self, path):
        self.connection = sqlite3.connect(path)
        self.connection.row_factory = sqlite3.Row
        self.connection.execute("PRAGMA journal_mode=WAL")
        self.connection.execute("PRAGMA synchronous=FULL")
        self.connection.executescript("""
            CREATE TABLE IF NOT EXISTS events (
                id INTEGER PRIMARY KEY,
                timestamp TEXT NOT NULL,
                kind TEXT NOT NULL,
                details TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS saved_state (
                id INTEGER PRIMARY KEY CHECK (id = 1),
                data TEXT NOT NULL
            );
            CREATE UNIQUE INDEX IF NOT EXISTS warehouse_exchange_fingerprint
            ON events(json_extract(details, '$.fingerprint'))
            WHERE kind='warehouse_exchange';
            CREATE UNIQUE INDEX IF NOT EXISTS plc_write_fingerprint
            ON events(json_extract(details, '$.fingerprint'))
            WHERE kind='plc_write';
        """)

    def record(self, kind, **details):
        stamp = datetime.now(timezone.utc).isoformat(timespec="milliseconds")
        with self.connection:
            cursor = self.connection.execute(
                "INSERT INTO events(timestamp, kind, details) VALUES (?, ?, ?)",
                (stamp, kind, json.dumps(details, separators=(",", ":"))),
            )
        return cursor.lastrowid

    def save(self, state):
        with self.connection:
            self.connection.execute(
                "INSERT OR REPLACE INTO saved_state(id, data) VALUES (1, ?)",
                (json.dumps(state),),
            )

    def load(self):
        row = self.connection.execute("SELECT data FROM saved_state WHERE id=1").fetchone()
        return json.loads(row["data"]) if row else None

    def latest(self):
        return self.connection.execute("SELECT COALESCE(MAX(id), 0) FROM events").fetchone()[0]

    def last_self_test(self):
        row = self.connection.execute(
            "SELECT details FROM events WHERE kind='self_test_result' ORDER BY id DESC LIMIT 1"
        ).fetchone()
        return json.loads(row["details"]) if row else None

    def record_warehouse_exchange(self, event):
        fingerprint = hashlib.sha256(
            json.dumps(event, sort_keys=True, ensure_ascii=True).encode()).hexdigest()
        exists = self.connection.execute(
            "SELECT 1 FROM events WHERE kind='warehouse_exchange' "
            "AND json_extract(details, '$.fingerprint')=?", (fingerprint,)).fetchone()
        if not exists:
            self.record("warehouse_exchange", fingerprint=fingerprint, exchange=event)

    def record_plc_write(self, event):
        fingerprint = hashlib.sha256(
            json.dumps(event, sort_keys=True, ensure_ascii=True).encode()).hexdigest()
        exists = self.connection.execute(
            "SELECT 1 FROM events WHERE kind='plc_write' "
            "AND json_extract(details, '$.fingerprint')=?", (fingerprint,)).fetchone()
        if not exists:
            self.record("plc_write", fingerprint=fingerprint, write=event)

    def plc_writes(self, after, limit, through):
        rows = self.connection.execute(
            "SELECT id, timestamp, details FROM events "
            "WHERE kind='plc_write' AND id>? AND id<=? ORDER BY id LIMIT ?",
            (after, through, limit)).fetchall()
        return [dict(id=row["id"], captured_at=row["timestamp"],
                     **json.loads(row["details"])["write"]) for row in rows]

    def events(self, after, limit, through=None, task_only=False):
        if through is None:
            through = self.latest()
        filter_sql = (
            " AND kind NOT IN ('rx_chunk', 'tx_attempt', 'tx_sent')"
            " AND (kind!='rx_frame' OR json_extract(details, '$.message_type')!='33')"
            if task_only else "")
        rows = self.connection.execute(
            "SELECT * FROM events WHERE id>? AND id<=?" + filter_sql + " ORDER BY id LIMIT ?",
            (after, through, limit),
        ).fetchall()
        return [
            dict(id=row["id"], timestamp=row["timestamp"], kind=row["kind"],
                 details=json.loads(row["details"]))
            for row in rows
        ]


class Shuttle:
    def __init__(self, journal, clock=time.monotonic):
        self.journal = journal
        self.clock = clock
        self.state = {
            "car_number": 1, "x": 0, "y": 0, "z": 1, "soc": 90,
            "mode": 0, "state": 0, "point_state": 1,
            "task_number": 0, "task_step": 0, "updn": 0, "orb": 0,
            "pallet": 0, "error_type": 0, "error_code": 0,
            "armed": False, "command_seconds": 1.0, "allowed_nodes": [],
            "last_error": None,
        }
        saved = journal.load()
        if saved:
            self.state.update(saved)
        self.state.update(armed=False, state=0, task_number=0, task_step=0,
                          error_type=0, error_code=0, last_error=None)
        self.pending = []
        self.due = None
        self.paused = False
        self.seen = OrderedDict()
        self.journal.record("startup", simulation=True,
                            message="Disarmed; in-flight work is never resumed after restart")
        self.persist()

    def persist(self):
        self.journal.save(self.state)

    def snapshot(self):
        return dict(self.state, simulation=True, pending_commands=list(self.pending))

    def position(self, state=None):
        state = self.state if state is None else state
        return [state["x"], state["y"], state["z"]]

    def check_position(self, position):
        if position not in self.state["allowed_nodes"]:
            raise ProtocolError(f"Position {position} is not in the configured test map")

    def configure(self, data):
        if self.state["armed"]:
            raise ControlError("Disarm before changing the simulated shuttle")
        expected = {"car_number", "x", "y", "z", "soc", "mode",
                    "command_seconds", "allowed_nodes"}
        if set(data) != expected:
            raise ControlError("Configuration fields must be: " + ", ".join(sorted(expected)))
        values = {key: integer(data[key], key, 1 if key == "car_number" else 0,
                               100 if key == "soc" else 255)
                  for key in ("car_number", "x", "y", "z", "soc", "mode")}
        seconds = data["command_seconds"]
        if type(seconds) not in (float, int) or not 0.2 <= seconds <= 60:
            raise ControlError("command_seconds must be from 0.2 to 60")
        nodes = data["allowed_nodes"]
        if not isinstance(nodes, list) or not 1 <= len(nodes) <= 4096:
            raise ControlError("Provide 1 to 4096 enabled test-map nodes")
        clean_nodes = []
        for node in nodes:
            if not isinstance(node, list) or len(node) != 3:
                raise ControlError("Each map node must be [x, y, z]")
            clean_nodes.append([integer(v, "coordinate") for v in node])
        if [values["x"], values["y"], values["z"]] not in clean_nodes:
            raise ControlError("Initial position must be in the test map")
        self.state.update(values, command_seconds=float(seconds), allowed_nodes=clean_nodes,
                          task_number=0, task_step=0, state=0, point_state=1,
                          updn=0, orb=0, pallet=0, error_type=0, error_code=0,
                          last_error=None)
        self.pending.clear()
        self.seen.clear()
        self.due = None
        self.paused = False
        self.persist()
        self.journal.record("configured", state=self.snapshot())

    def control(self, action, data):
        if action == "configure":
            self.configure(data)
            return
        if data:
            raise ControlError("This action does not accept parameters")
        if action == "arm":
            if self.state["armed"]:
                raise ControlError("Already armed")
            self.check_position(self.position())
            self.state["armed"] = True
        elif action == "disarm":
            self.state["armed"] = False
            self.pending.clear()
            self.due = None
            self.state["state"] = 0
            self.paused = False
        elif action == "fault":
            if not self.state["armed"]:
                raise ControlError("Arm the simulator before injecting a fault")
            self.fail("Operator-injected simulated fault")
            return
        elif action == "recover":
            if not self.state["error_type"]:
                raise ControlError("No simulated fault to recover")
            self.state.update(error_type=0, error_code=0, last_error=None,
                              state=6 if self.pending else 0)
            self.paused = bool(self.pending)
            self.due = None
        elif action == "pause":
            if not self.pending or self.state["error_type"]:
                raise ControlError("No running task to pause")
            self.paused = True
            self.state["state"] = 6
            self.due = None
        elif action == "resume":
            if not self.paused or self.state["error_type"]:
                raise ControlError("No paused, fault-free task to resume")
            self.paused = False
            self.start_command()
        elif action == "cancel":
            if not self.pending:
                raise ControlError("No task to cancel")
            self.pending.clear()
            self.due = self.clock() + self.state["command_seconds"]
            self.paused = False
            self.state["state"] = 7
        else:
            raise ControlError("Unknown simulator action")
        self.persist()
        self.journal.record("control", action=action, state=self.snapshot())

    def fail(self, message):
        self.state.update(state=11, error_type=1, error_code=1, last_error=message)
        self.due = None
        self.persist()
        self.journal.record("fault", message=message, state=self.snapshot())

    def status(self):
        s = self.state
        payload = bytes([0x01, s["car_number"], s["x"], s["y"], s["z"],
                         s["soc"], s["mode"], s["state"], s["point_state"]])
        payload += struct.pack(">HBH", s["task_number"], s["task_step"], 0)
        payload += bytes([s["updn"], s["orb"], s["pallet"], s["error_type"], 0])
        payload += struct.pack(">HH", s["error_code"], 0)
        return frame(payload)

    def acknowledgement(self, kind, task):
        return frame(bytes([kind]) + struct.pack(">HBB", task, self.state["car_number"], 0))

    def apply_command(self, state, command):
        operation, content = command["operation"], command["content"]
        if operation in (1, 5):
            state.update(updn=1, pallet=1)
        elif operation == 2:
            state.update(updn=0, pallet=0)
        elif operation in (3, 4):
            state["orb"] = operation - 3
        elif operation == 6:
            state["point_state"] = 1
        elif 7 <= operation <= 0x16:
            direction = (operation - 7) % 4
            axis = "y" if direction < 2 else "x"
            current = state[axis]
            positive = direction in (0, 2)
            if (positive and content < current) or (not positive and content > current):
                raise ProtocolError("Direction conflicts with absolute target coordinate")
            step = 1 if positive else -1
            for coordinate in range(current, content + step, step):
                probe = dict(state)
                probe[axis] = coordinate
                self.check_position(self.position(probe))
            state[axis] = content
        else:
            raise ProtocolError(f"Unsupported task operation 0x{operation:02X}")

    def start_command(self):
        command = self.pending[0]
        operation = command["operation"]
        self.state["state"] = operation if operation in (1, 2, 3, 4) else (
            1 if operation == 5 else 5 if 7 <= operation <= 0x16 else 0)
        self.due = self.clock() + self.state["command_seconds"]

    def tick(self):
        if not self.state["armed"] or self.due is None or self.clock() < self.due:
            return False
        if not self.pending:
            self.state["state"] = 0
            self.due = None
            self.persist()
            self.journal.record("ready_after_cancel", state=self.snapshot())
            return True
        command = self.pending.pop(0)
        self.apply_command(self.state, command)
        self.state["task_step"] += 1
        self.journal.record("command_completed", command=command, position=self.position())
        if self.pending:
            self.start_command()
        else:
            self.due = None
            self.state.update(state=0, point_state=1)
            self.journal.record("task_completed", task_number=self.state["task_number"],
                                state=self.snapshot())
        self.persist()
        return True

    def handle(self, packet):
        payload = decode(packet)
        kind = payload[0]
        if len(payload) < 4:
            raise ProtocolError("Command lacks transaction and shuttle number")
        task = int.from_bytes(payload[1:3], "big")
        if payload[3] != self.state["car_number"]:
            raise ProtocolError("Command is addressed to a different shuttle number")
        if not self.state["armed"]:
            raise ProtocolError("Simulator is disarmed; no acknowledgement was sent")
        if kind == 0x33:
            if len(payload) != 5 or payload[4] != 10:
                raise ProtocolError("Unsupported heartbeat layout")
            return [self.acknowledgement(kind, task), self.status()]
        key = hashlib.sha256(payload).hexdigest()
        if key in self.seen:
            self.journal.record("duplicate_command", fingerprint=key, task_number=task)
            return [self.seen[key], self.status()]
        if kind == 0x40 and self.pending:
            if len(payload) != 8 or task != self.state["task_number"]:
                raise ProtocolError("Path refinement must address the active task")
            command_id, operation, content = struct.unpack(">HBB", payload[4:])
            active = self.pending[0]
            if self.paused or self.state["error_type"]:
                raise ProtocolError("Cannot refine a paused or faulted path")
            if (not 7 <= operation <= 0x16 or
                    not 7 <= active["operation"] <= 0x16 or
                    (operation - 7) % 4 != (active["operation"] - 7) % 4 or
                    content != active["content"]):
                raise ProtocolError("Path refinement differs from the active movement")
            active["operation"] = operation
            self.journal.record("path_refined", task_number=task,
                                instruction_id=command_id, command=dict(active))
            response = self.acknowledgement(kind, task)
            self.seen[key] = response
            if len(self.seen) > 256:
                self.seen.popitem(last=False)
            return [response, self.status()]
        if kind in (0x30, 0x40):
            if self.pending or self.state["state"] != 0 or self.state["error_type"]:
                raise ProtocolError("Shuttle is not ready for a new task")
            if kind == 0x30:
                if len(payload) < 5 or payload[4] == 0 or len(payload) != 5 + 4 * payload[4]:
                    raise ProtocolError("Task command count does not match payload")
                instructions = payload[5:]
            else:
                if len(payload) != 8:
                    raise ProtocolError("Path command must contain one instruction")
                instructions = payload[4:]
            commands = []
            preview = dict(self.state)
            ids = set()
            for offset in range(0, len(instructions), 4):
                command_id, operation, content = struct.unpack(">HBB", instructions[offset:offset + 4])
                if command_id == 0 or command_id in ids:
                    raise ProtocolError("Instruction IDs must be nonzero and unique")
                ids.add(command_id)
                command = dict(id=command_id, operation=operation, content=content)
                self.apply_command(preview, command)
                commands.append(command)
            self.seen.clear()
            self.pending = commands
            self.state.update(task_number=task, task_step=0)
            self.start_command()
            self.journal.record("task_accepted", task_number=task, commands=commands)
        elif kind == 0x90:
            if len(payload) != 7 or self.pending:
                raise ProtocolError("Position reset requires XYZ and an idle shuttle")
            position = list(payload[4:7])
            self.check_position(position)
            self.state.update(zip(("x", "y", "z"), position))
        elif kind in (0x35, 0x36, 0x37, 0x38, 0x39, 0x3C):
            if len(payload) != 5:
                raise ProtocolError("Function command requires one parameter byte")
            actions = {0x35: "recover", 0x36: "pause", 0x37: "resume", 0x38: "cancel"}
            if kind in actions:
                self.control(actions[kind], {})
            elif kind == 0x39:
                if self.pending:
                    raise ProtocolError("Cannot change floor while a task is running")
                self.check_position([self.state["x"], self.state["y"], payload[4]])
                self.state["z"] = payload[4]
            else:
                if self.pending:
                    raise ProtocolError("Cannot realign while a task is running")
                self.state["point_state"] = 1
        else:
            raise ProtocolError(f"Unsupported message type 0x{kind:02X}; not acknowledged")
        self.persist()
        response = self.acknowledgement(kind, task)
        self.seen[key] = response
        if len(self.seen) > 256:
            self.seen.popitem(last=False)
        return [response, self.status()]


class Application:
    def __init__(self, shuttle, token, allowed_peers):
        self.shuttle = shuttle
        self.token = token
        self.allowed_peers = set(allowed_peers)
        self.sessions = {}
        self.loop = None
        self.failed = None
        self.stop = None
        self.plc_snapshot = None
        self.plc_lock = asyncio.Lock()

    def fatal(self, error):
        LOGGER.critical("Simulator halted: %s", error, exc_info=True)
        self.failed = error
        self.shuttle.state["armed"] = False
        for writer in self.sessions.values():
            writer.close()
        self.stop.set()

    async def send(self, writer, packet, reason):
        peer = str(writer.get_extra_info("peername"))
        tx = self.shuttle.journal.record("tx_attempt", peer=peer, hex=packet.hex().upper(),
                                         reason=reason)
        writer.write(packet)
        await asyncio.wait_for(writer.drain(), 5)
        self.shuttle.journal.record("tx_sent", peer=peer, attempt_id=tx,
                                    hex=packet.hex().upper(), reason=reason)

    async def connection(self, reader, writer):
        peer = writer.get_extra_info("peername")
        session = str(peer)
        accepted = False
        buffer = FrameBuffer()
        try:
            if peer[0] not in self.allowed_peers or self.sessions:
                self.shuttle.journal.record("connection_rejected", peer=session,
                                            reason="Peer not allowed or a client is already connected")
                return
            accepted = True
            self.sessions[session] = writer
            self.shuttle.journal.record("connected", peer=session)
            if self.shuttle.state["armed"]:
                await self.send(writer, self.shuttle.status(), "initial_status")
            while not self.stop.is_set():
                chunk = await reader.read(4096)
                if not chunk:
                    if buffer.data:
                        self.shuttle.journal.record("incomplete_frame", peer=session,
                                                    hex=buffer.data.hex().upper())
                    break
                self.shuttle.journal.record("rx_chunk", peer=session, hex=chunk.hex().upper())
                packets = buffer.feed(chunk)
                for packet in packets:
                    self.shuttle.journal.record("rx_frame", peer=session,
                                                hex=packet.hex().upper(),
                                                message_type=f"{packet[3]:02X}")
                    try:
                        responses = self.shuttle.handle(packet)
                    except (ProtocolError, ControlError) as error:
                        self.shuttle.journal.record("command_rejected", peer=session,
                                                    message=str(error), hex=packet.hex().upper())
                        if self.shuttle.state["armed"]:
                            self.shuttle.fail(str(error))
                            await self.send(writer, self.shuttle.status(), "command_rejected")
                        continue
                    for response in responses:
                        await self.send(writer, response, "command_response")
        except ProtocolError as error:
            self.shuttle.journal.record("protocol_error", peer=session, message=str(error))
        except (ConnectionError, asyncio.TimeoutError) as error:
            self.shuttle.journal.record("connection_error", peer=session, message=str(error))
        except (sqlite3.Error, OSError) as error:
            self.fatal(error)
        finally:
            if accepted:
                self.sessions.pop(session, None)
                try:
                    self.shuttle.journal.record("disconnected", peer=session)
                    if self.shuttle.pending:
                        self.shuttle.fail("Disconnected with unfinished work; recover explicitly")
                except sqlite3.Error as error:
                    self.fatal(error)
            writer.close()
            try:
                await writer.wait_closed()
            except ConnectionError:
                LOGGER.warning("Connection already closed: %s", session)

    async def periodic(self):
        next_report = 0.0
        while not self.stop.is_set():
            await asyncio.sleep(0.1)
            try:
                if not self.sessions:
                    continue
                changed = self.shuttle.tick()
                now = time.monotonic()
                if self.shuttle.state["armed"] and (changed or now >= next_report):
                    next_report = now + 1
                    for writer in tuple(self.sessions.values()):
                        try:
                            await self.send(writer, self.shuttle.status(), "periodic_status")
                        except (ConnectionError, asyncio.TimeoutError) as error:
                            self.shuttle.journal.record("tx_failed", message=str(error))
                            writer.close()
            except (sqlite3.Error, OSError, ProtocolError) as error:
                self.fatal(error)

    async def collect_plc_writes(self):
        async with self.plc_lock:
            result = await asyncio.to_thread(read_plc_write_logs)
            for event in result["events"]:
                self.shuttle.journal.record_plc_write(event)
            self.plc_snapshot = {key: value for key, value in result.items() if key != "events"}

    async def poll_plc_writes(self):
        while not self.stop.is_set():
            try:
                await self.collect_plc_writes()
            except (sqlite3.Error, OSError) as error:
                self.fatal(error)
                return
            await asyncio.sleep(5)

    async def api(self, method, path, query, data):
        if path == "/api/plc-writes" and method == "GET":
            try:
                after = int(query.get("after", ["0"])[0])
                limit = int(query.get("limit", ["100"])[0])
                through_text = query.get("through", [None])[0]
                through = None if through_text is None else int(through_text)
            except ValueError as error:
                raise ControlError("Invalid PLC write cursor") from error
            if after < 0 or not 1 <= limit <= 1000 or (through is not None and through < 0):
                raise ControlError("PLC write cursor or page size is out of range")
            if through is None or self.plc_snapshot is None:
                await self.collect_plc_writes()
            if through is None:
                through = self.shuttle.journal.latest()
            rows = self.shuttle.journal.plc_writes(after, limit, through)
            count = self.shuttle.journal.connection.execute(
                "SELECT COUNT(*) FROM events WHERE kind='plc_write' AND id<=?",
                (through,)).fetchone()[0]
            return dict(self.plc_snapshot, events=rows, through=through, total=count)
        if path == "/api/workflow" and method == "GET":
            result = await asyncio.to_thread(read_workflow_logs)
            for event in result["events"]:
                self.shuttle.journal.record_warehouse_exchange(event)
            rows = self.shuttle.journal.connection.execute(
                "SELECT details FROM events WHERE kind='warehouse_exchange' "
                "ORDER BY id DESC LIMIT 300").fetchall()
            result["events"] = [json.loads(row["details"])["exchange"] for row in reversed(rows)]
            result["scope"] += " Observed exchanges are retained in the persistent journal."
            return result
        if path == "/api/state" and method == "GET":
            return dict(self.shuttle.snapshot(), connections=list(self.sessions),
                        latest_event=self.shuttle.journal.latest(),
                        self_test=self.shuttle.journal.last_self_test())
        if path == "/api/self-test" and method == "POST":
            if data != {}:
                raise ControlError("Self-test expects an empty JSON object")
            result = await run_self_test()
            self.shuttle.journal.record("self_test_result", **result)
            return result
        if path == "/api/events" and method == "GET":
            task_only = query.get("task_only", ["0"])[0]
            if task_only not in ("0", "1"):
                raise ControlError("task_only must be 0 or 1")
            try:
                after = int(query.get("after", ["0"])[0])
                limit = int(query.get("limit", ["200"])[0])
                through = int(query.get("through", [str(self.shuttle.journal.latest())])[0])
            except ValueError as error:
                raise ControlError("Invalid event cursor") from error
            if after < 0 or not 1 <= limit <= 1000 or through < 0:
                raise ControlError("Event cursor or page size is out of range")
            return dict(events=self.shuttle.journal.events(
                            after, limit, through, task_only=task_only == "1"),
                        latest_event=self.shuttle.journal.latest())
        if path == "/api/control" and method == "POST":
            if not isinstance(data, dict) or set(data) != {"action", "parameters"}:
                raise ControlError("Provide action and parameters")
            if not isinstance(data["action"], str) or not isinstance(data["parameters"], dict):
                raise ControlError("Invalid control action or parameters")
            self.shuttle.control(data["action"], data["parameters"])
            if data["action"] == "disarm":
                for writer in self.sessions.values():
                    writer.close()
            return self.shuttle.snapshot()
        raise ControlError("Unknown API route or method")


async def run_self_test():
    results = []
    now = [0.0]

    def check(name, condition, details):
        results.append(dict(name=name, passed=bool(condition), details=details))

    with tempfile.TemporaryDirectory(prefix="shuttle-self-test-") as directory:
        journal = Journal(Path(directory) / "events.sqlite3")
        writer = None
        server = None
        app = None
        try:
            shuttle = Shuttle(journal, lambda: now[0])
            shuttle.configure(dict(
                car_number=1, x=1, y=1, z=1, soc=90, mode=0,
                command_seconds=1.0, allowed_nodes=[[1, 1, 1], [1, 2, 1]],
            ))
            shuttle.control("arm", {})
            app = Application(shuttle, "", ["127.0.0.1"])
            app.stop = asyncio.Event()
            server = await asyncio.start_server(app.connection, "127.0.0.1", 0)
            port = server.sockets[0].getsockname()[1]
            reader, writer = await asyncio.open_connection("127.0.0.1", port)

            async def receive():
                header = await asyncio.wait_for(reader.readexactly(3), 2)
                packet = header + await asyncio.wait_for(reader.readexactly(header[2] + 1), 2)
                decode(packet)
                return packet

            initial = await receive()
            check("TCP connection and initial status",
                  initial == shuttle.status(),
                  "Temporary localhost connection received a CRC-valid 0x01 status.")
            check("Status field layout",
                  len(initial[2:-2]) == 24 and initial[2:12] == bytes(
                      [24, 1, 1, 1, 1, 1, 90, 0, 0, 1]),
                  "24-byte length/body matches the inspected ECS parser.")
            check("CRC reference vector",
                  binascii.crc_hqx(b"123456789", 0xFFFF) == 0x29B1,
                  "CRC-16/CCITT-FALSE known vector is 0x29B1.")

            heartbeat = frame(bytes.fromhex("33000A010A"))
            writer.write(heartbeat[:4])
            await writer.drain()
            await asyncio.sleep(0.02)
            writer.write(heartbeat[4:])
            await writer.drain()
            ack, status = await receive(), await receive()
            check("Fragmented heartbeat and correlated acknowledgement",
                  decode(ack) == bytes.fromhex("33000A0100") and status == shuttle.status(),
                  "Transaction 10 and shuttle 1 echoed; CRC-valid status returned.")

            task = frame(bytes.fromhex("300064010100010702"))
            writer.write(task)
            await writer.drain()
            ack, moving = await receive(), await receive()
            check("Task acceptance and moving feedback",
                  decode(ack) == bytes.fromhex("3000640100")
                  and moving[10] == 5 and shuttle.state["task_number"] == 100,
                  "Task 100 acknowledged; status reports moving before completion.")
            writer.write(task)
            await writer.drain()
            await receive()
            await receive()
            check("Duplicate task protection", len(shuttle.pending) == 1,
                  "Resending the same task does not queue a second execution.")

            shuttle.control("pause", {})
            now[0] = 2.0
            check("Pause prevents completion",
                  not shuttle.tick() and shuttle.position() == [1, 1, 1]
                  and shuttle.state["state"] == 6,
                  "Advancing the virtual clock does not complete a paused task.")
            shuttle.control("resume", {})
            now[0] = 3.0
            shuttle.tick()
            await app.send(writer=next(iter(app.sessions.values())),
                           packet=shuttle.status(), reason="self_test_completion")
            completed = await receive()
            check("Move completion and final feedback",
                  shuttle.position() == [1, 2, 1] and completed[10] == 0
                  and int.from_bytes(completed[12:14], "big") == 100
                  and completed[14] == 1 and not shuttle.pending,
                  "Ready at (1,2,1), task 100, completed instruction 1.")
            shuttle.control("fault", {})
            shuttle.control("recover", {})
            check("Fault injection and recovery",
                  shuttle.state["state"] == 0 and shuttle.state["error_type"] == 0,
                  "Injected fault is cleared through explicit recovery.")

            bad = bytearray(heartbeat)
            bad[-1] ^= 1
            rejected = False
            try:
                FrameBuffer().feed(bad)
            except ProtocolError:
                rejected = True
            check("Corrupt packet rejection", rejected,
                  "Invalid CRC raises a protocol error, not a success response.")
            rejected = False
            try:
                shuttle.handle(frame(bytes.fromhex("EE00000100")))
            except ProtocolError:
                rejected = True
            check("Unsupported command rejection", rejected,
                  "Unknown message type receives no success acknowledgement.")
            kinds = {event["kind"] for event in journal.events(0, 1000)}
            check("Bidirectional exchange and completion logging",
                  {"rx_chunk", "rx_frame", "tx_attempt", "tx_sent",
                   "task_accepted", "task_completed"} <= kinds,
                  "Raw packets, socket writes, and task transitions are journaled.")
        except (ProtocolError, ControlError, ConnectionError, asyncio.TimeoutError,
                asyncio.IncompleteReadError) as error:
            LOGGER.exception("Isolated self-test failed")
            check("Self-test execution", False, str(error))
        finally:
            if writer:
                writer.close()
                await writer.wait_closed()
            if server:
                server.close()
                await server.wait_closed()
            if app:
                for connection in tuple(app.sessions.values()):
                    connection.close()
                # Let connection handlers finish their journal writes before closing SQLite.
                for _ in range(100):
                    if not app.sessions:
                        break
                    await asyncio.sleep(0.01)
                if app.sessions:
                    raise RuntimeError("Self-test connection did not shut down")
            journal.connection.close()
    return dict(
        passed=bool(results) and all(result["passed"] for result in results),
        checks=results, timestamp=datetime.now(timezone.utc).isoformat(timespec="seconds"),
        scope="Isolated simulator self-test only; not WMS/WES/ECS end-to-end verification.",
    )


def http_handler(application, origins, hosts):
    class Handler(BaseHTTPRequestHandler):
        server_version = "IsolatedShuttleSimulator/1"

        def log_message(self, fmt, *args):
            LOGGER.info("HTTP %s %s", self.client_address[0], fmt % args)

        def origin_allowed(self):
            origin = self.headers.get("Origin")
            return origin is None or origin in origins

        def headers_for(self, status, content_type="application/json"):
            self.send_response(status)
            self.send_header("Content-Type", content_type)
            self.send_header("Cache-Control", "no-store")
            self.send_header("X-Content-Type-Options", "nosniff")
            if self.headers.get("Origin") in origins:
                self.send_header("Access-Control-Allow-Origin", self.headers["Origin"])
                self.send_header("Vary", "Origin")

        def respond(self, status, data):
            payload = json.dumps(data).encode()
            self.headers_for(status)
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)

        def do_OPTIONS(self):
            if not self.origin_allowed() or self.headers.get("Host") not in hosts:
                self.respond(403, {"error": "Origin or host not allowed"})
                return
            self.headers_for(204)
            self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Authorization, Content-Type")
            self.send_header("Content-Length", "0")
            self.end_headers()

        def do_GET(self):
            self.request_api("GET")

        def do_POST(self):
            self.request_api("POST")

        def request_api(self, method):
            if not self.origin_allowed() or self.headers.get("Host") not in hosts:
                self.respond(403, {"error": "Origin or host not allowed"})
                return
            if not hmac.compare_digest(self.headers.get("Authorization", "").encode(),
                                       ("Bearer " + application.token).encode()):
                self.respond(401, {"error": "A simulator access token is required"})
                return
            parts = urlsplit(self.path)
            data = None
            try:
                if method == "POST":
                    if self.headers.get("Transfer-Encoding"):
                        raise ControlError("Chunked request bodies are not supported")
                    length = int(self.headers.get("Content-Length", "0"))
                    if not 1 <= length <= 131072:
                        raise ControlError("Request body must be 1 to 131072 bytes")
                    if self.headers.get_content_type() != "application/json":
                        raise ControlError("Expected application/json")
                    data = json.loads(self.rfile.read(length))
                result = asyncio.run_coroutine_threadsafe(
                    application.api(method, parts.path, parse_qs(parts.query), data),
                    application.loop,
                ).result(timeout=10)
                self.respond(200, result)
            except (ControlError, ProtocolError, ValueError) as error:
                LOGGER.warning("Rejected API request: %s", error)
                self.respond(400, {"error": str(error)})
            except (sqlite3.Error, OSError, TimeoutError, FutureTimeoutError) as error:
                LOGGER.exception("API operation failed")
                self.respond(503, {"error": "Simulator operation failed; inspect service journal"})
                application.loop.call_soon_threadsafe(application.fatal, error)

        def setup(self):
            super().setup()
            self.connection.settimeout(10)

    return Handler


def open_http_listener(application, config, host, hosts):
    try:
        return ThreadingHTTPServer(
            (host, config["http_port"]),
            http_handler(application, set(config["allowed_origins"]), hosts))
    except OSError as error:
        if (error.errno != errno.EADDRNOTAVAIL or
                host not in config.get("optional_http_bind", [])):
            raise
        LOGGER.warning("Optional API address %s unavailable; using remaining listeners. "
                       "Restart after restoring the VPN to bind this address.", host)
        application.shuttle.journal.record(
            "listener_unavailable", host=host, port=config["http_port"],
            message=str(error), recovery="Restart simulator after restoring VPN")
        return None


async def serve(config, data_dir):
    application = Application(Shuttle(Journal(data_dir / "events.sqlite3")),
                              (data_dir / "access-token").read_text().strip(),
                              config["allowed_peers"])
    application.loop = asyncio.get_running_loop()
    application.stop = asyncio.Event()
    for sig in (signal.SIGTERM, signal.SIGINT):
        application.loop.add_signal_handler(sig, application.stop.set)
    tcp_servers, http_servers = [], []
    periodic = None
    plc_poll = None
    try:
        for host in config["tcp_bind"]:
            tcp_servers.append(await asyncio.start_server(
                application.connection, host, config["tcp_port"], limit=4096))
        hosts = {f"{host}:{config['http_port']}" for host in config["http_bind"]}
        for host in config["http_bind"]:
            server = open_http_listener(application, config, host, hosts)
            if server is None:
                continue
            http_servers.append(server)
            Thread(target=server.serve_forever, daemon=True).start()
        application.shuttle.journal.record("listeners_started", configuration=config)
        LOGGER.info("Isolated simulator started, disarmed. TCP=%s:%s API=%s:%s",
                    config["tcp_bind"], config["tcp_port"],
                    config["http_bind"], config["http_port"])
        periodic = asyncio.create_task(application.periodic())
        plc_poll = asyncio.create_task(application.poll_plc_writes())
        await application.stop.wait()
    finally:
        for server in tcp_servers:
            server.close()
            await server.wait_closed()
        for writer in tuple(application.sessions.values()):
            writer.close()
        for task in (periodic, plc_poll):
            if task:
                task.cancel()
                try:
                    await task
                except asyncio.CancelledError:
                    pass
        for server in http_servers:
            server.shutdown()
            server.server_close()
        application.shuttle.state["armed"] = False
        application.shuttle.persist()
        application.shuttle.journal.record("shutdown", simulation=True)
    if application.failed:
        raise RuntimeError("Simulator stopped after an operational failure") from application.failed


def main():
    parser = argparse.ArgumentParser(description="Isolated Ehox shuttle TCP simulator")
    parser.add_argument("--isolated-test", action="store_true", required=True,
                        help="Confirm there is no production equipment/inventory connection")
    parser.add_argument("--config", type=Path, required=True)
    parser.add_argument("--data-dir", type=Path, required=True)
    args = parser.parse_args()
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    os.umask(0o077)
    args.data_dir.mkdir(parents=True, exist_ok=True, mode=0o700)
    token_path = args.data_dir / "access-token"
    if not token_path.exists():
        with token_path.open("x") as token_file:
            token_file.write(secrets.token_urlsafe(32) + "\n")
    config = json.loads(args.config.read_text())
    asyncio.run(serve(config, args.data_dir))


if __name__ == "__main__":
    main()
