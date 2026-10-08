import asyncio
import binascii
import errno
import json
from pathlib import Path
import sqlite3
import struct
import tempfile
import unittest
from threading import Thread
from http.server import ThreadingHTTPServer
from unittest.mock import patch
from urllib.error import HTTPError
from urllib.request import Request, urlopen

from simulator import (
    Application, ControlError, FrameBuffer, Journal, ProtocolError,
    Shuttle, decode, frame, http_handler, open_http_listener, run_self_test,
)


def configuration():
    return dict(car_number=1, x=1, y=1, z=1, soc=90, mode=0,
                command_seconds=1.0,
                allowed_nodes=[[x, y, z] for x in range(1, 4)
                               for y in range(1, 4) for z in (1, 2)])


def task_packet(task=100, commands=((1, 7, 2),), kind=0x30):
    payload = bytes([kind]) + struct.pack(">HB", task, 1)
    if kind == 0x30:
        payload += bytes([len(commands)])
    payload += b"".join(struct.pack(">HBB", *command) for command in commands)
    return frame(payload)


class ProtocolTests(unittest.TestCase):
    def test_known_ccitt_false_vector(self):
        self.assertEqual(binascii.crc_hqx(b"123456789", 0xFFFF), 0x29B1)

    def test_frame_length_and_payload(self):
        packet = frame(bytes.fromhex("330000010A"))
        self.assertEqual(packet[:3], bytes.fromhex("55AA06"))
        self.assertEqual(len(packet), packet[2] + 4)
        self.assertEqual(decode(packet), bytes.fromhex("330000010A"))

    def test_fragmented_and_coalesced_frames(self):
        a, b = frame(bytes.fromhex("330000010A")), task_packet()
        parser = FrameBuffer()
        self.assertEqual(parser.feed(a[:1]), [])
        self.assertEqual(parser.feed(a[1:5]), [])
        self.assertEqual(parser.feed(a[5:] + b), [a, b])
        self.assertEqual(parser.data, b"")

    def test_crc_rejected(self):
        packet = bytearray(task_packet())
        packet[-1] ^= 1
        with self.assertRaisesRegex(ProtocolError, "CRC"):
            FrameBuffer().feed(packet)

    def test_bad_header_and_length(self):
        for bad in (b"GET /", bytes.fromhex("55AAFF")):
            with self.subTest(bad=bad), self.assertRaises(ProtocolError):
                FrameBuffer().feed(bad)

    def test_oversized_output_rejected(self):
        with self.assertRaises(ProtocolError):
            frame(bytes(120))


class ShuttleTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.journal = Journal(Path(self.directory.name) / "journal.sqlite3")
        self.now = 0.0
        self.shuttle = Shuttle(self.journal, lambda: self.now)
        self.shuttle.configure(configuration())

    def tearDown(self):
        self.journal.connection.close()
        self.directory.cleanup()

    def arm(self):
        self.shuttle.control("arm", {})

    def test_disarmed_by_default(self):
        self.assertFalse(self.shuttle.state["armed"])
        with self.assertRaisesRegex(ProtocolError, "disarmed"):
            self.shuttle.handle(frame(bytes.fromhex("330000010A")))

    def test_configuration_rejects_invalid_or_unknown_fields(self):
        for key, value in (("car_number", 0), ("soc", 101), ("x", True),
                           ("mode", 256), ("command_seconds", float("nan")),
                           ("allowed_nodes", [])):
            with self.subTest(key=key), self.assertRaises(ControlError):
                data = configuration()
                data[key] = value
                self.shuttle.configure(data)
        with self.assertRaises(ControlError):
            self.shuttle.configure(dict(configuration(), typo=1))

    def test_no_map_no_arm(self):
        self.shuttle.state["allowed_nodes"] = []
        with self.assertRaises(ProtocolError):
            self.arm()

    def test_status_layout_matches_ecs_parser(self):
        self.arm()
        body = self.shuttle.status()[2:-2]
        self.assertEqual(len(body), 24)
        self.assertEqual(body[0], 24)
        self.assertEqual(body[1:10], bytes([1, 1, 1, 1, 1, 90, 0, 0, 1]))
        self.assertEqual(body[10:24], bytes(14))

    def test_heartbeat_returns_correlated_ack_and_status(self):
        self.arm()
        responses = self.shuttle.handle(frame(bytes.fromhex("33000A010A")))
        self.assertEqual(decode(responses[0]), bytes.fromhex("33000A0100"))
        self.assertEqual(responses[1], self.shuttle.status())

    def test_task_progress_and_completion(self):
        self.arm()
        responses = self.shuttle.handle(task_packet(commands=((1, 7, 3), (2, 9, 2), (3, 1, 0))))
        self.assertEqual(decode(responses[0]), bytes.fromhex("3000640100"))
        self.assertEqual(self.shuttle.state["state"], 5)
        self.assertEqual(self.shuttle.state["task_step"], 0)
        self.now = 1.0
        self.assertTrue(self.shuttle.tick())
        self.assertEqual(self.shuttle.position(), [1, 3, 1])
        self.assertEqual(self.shuttle.state["task_step"], 1)
        self.now = 2.0
        self.shuttle.tick()
        self.assertEqual(self.shuttle.position(), [2, 3, 1])
        self.now = 3.0
        self.shuttle.tick()
        self.assertEqual(self.shuttle.state["state"], 0)
        self.assertEqual(self.shuttle.state["task_step"], 3)
        self.assertEqual(self.shuttle.state["pallet"], 1)
        self.assertEqual(self.shuttle.pending, [])

    def test_duplicate_task_does_not_execute_twice(self):
        self.arm()
        packet = task_packet()
        self.shuttle.handle(packet)
        self.shuttle.handle(packet)
        self.assertEqual(len(self.shuttle.pending), 1)
        self.now = 1
        self.shuttle.tick()
        self.shuttle.handle(packet)
        self.assertEqual(self.shuttle.pending, [])

    def test_invalid_task_is_atomically_rejected(self):
        self.arm()
        with self.assertRaisesRegex(ProtocolError, "Unsupported"):
            self.shuttle.handle(task_packet(commands=((1, 7, 2), (2, 0xEE, 0))))
        self.assertEqual(self.shuttle.position(), [1, 1, 1])
        self.assertEqual(self.shuttle.pending, [])
        self.assertEqual(self.shuttle.state["task_number"], 0)

    def test_repeated_round_trips_reuse_identical_task_bytes(self):
        self.arm()
        outward = task_packet(task=7000, commands=((7001, 7, 2),))
        returning = task_packet(task=7000, commands=((7001, 8, 1),))
        for packet, target in [(outward, 2), (returning, 1),
                               (outward, 2), (returning, 1)]:
            self.shuttle.handle(packet)
            self.shuttle.handle(packet)
            self.assertEqual(len(self.shuttle.pending), 1)
            self.now += 1
            self.shuttle.tick()
            self.assertEqual(self.shuttle.state["y"], target)
            self.shuttle.handle(packet)
            self.assertEqual(self.shuttle.pending, [])
        accepted = [e for e in self.journal.events(0, 100)
                    if e["kind"] == "task_accepted"]
        self.assertEqual(len(accepted), 4)

    def test_rejected_new_task_does_not_clear_duplicate_protection(self):
        self.arm()
        packet = task_packet()
        self.shuttle.handle(packet)
        self.now = 1
        self.shuttle.tick()
        with self.assertRaises(ProtocolError):
            self.shuttle.handle(task_packet(commands=((1, 0xEE, 0),)))
        self.shuttle.handle(packet)
        self.assertEqual(self.shuttle.pending, [])

    def test_function_commands_do_not_expire_last_task_deduplication(self):
        self.arm()
        packet = task_packet()
        self.shuttle.handle(packet)
        self.now = 1
        self.shuttle.tick()
        self.shuttle.handle(frame(bytes.fromhex("3C00010100")))
        self.shuttle.handle(packet)
        self.assertEqual(self.shuttle.pending, [])

    def test_missing_intermediate_map_node_rejected(self):
        self.arm()
        self.shuttle.state["allowed_nodes"].remove([1, 2, 1])
        with self.assertRaisesRegex(ProtocolError, "test map"):
            self.shuttle.handle(task_packet(commands=((1, 7, 3),)))

    def test_direction_mismatch_rejected(self):
        self.arm()
        with self.assertRaisesRegex(ProtocolError, "Direction"):
            self.shuttle.handle(task_packet(commands=((1, 8, 3),)))

    def test_task_count_and_instruction_ids_validated(self):
        self.arm()
        cases = [
            frame(bytes.fromhex("300064010200010702")),
            task_packet(commands=((0, 7, 2),)),
            task_packet(commands=((1, 7, 2), (1, 9, 2))),
        ]
        for packet in cases:
            with self.subTest(packet=packet), self.assertRaises(ProtocolError):
                self.shuttle.handle(packet)

    def test_real_ecs_16_bit_instruction_ids_report_completion_count(self):
        self.arm()
        self.shuttle.handle(task_packet(
            task=7000, commands=((7001, 7, 2), (7002, 1, 0))))
        self.now = 1
        self.shuttle.tick()
        self.assertEqual(self.shuttle.state["task_step"], 1)
        self.assertEqual(self.shuttle.state["task_number"], 7000)
        self.now = 2
        self.shuttle.tick()
        self.assertEqual(self.shuttle.state["task_step"], 2)
        self.assertEqual(self.shuttle.state["state"], 0)
        self.assertEqual(decode(self.shuttle.status())[9:12], bytes.fromhex("1B5802"))
        completed = [event["details"]["command"]["id"]
                     for event in self.journal.events(0, 100)
                     if event["kind"] == "command_completed"]
        self.assertEqual(completed, [7001, 7002])

    def test_unknown_message_and_wrong_shuttle_not_acknowledged(self):
        self.arm()
        for payload in ("EE00000100", "330000020A"):
            with self.subTest(payload=payload), self.assertRaises(ProtocolError):
                self.shuttle.handle(frame(bytes.fromhex(payload)))

    def test_path_command(self):
        self.arm()
        self.shuttle.handle(task_packet(kind=0x40))
        self.now = 1
        self.shuttle.tick()
        self.assertEqual(self.shuttle.position(), [1, 2, 1])

    def test_path_refines_active_movement_without_queuing_duplicate(self):
        self.arm()
        self.shuttle.handle(task_packet(task=7000, commands=((7001, 7, 2),)))
        refinement = task_packet(task=7000, commands=((7000, 0x13, 2),), kind=0x40)
        responses = self.shuttle.handle(refinement)
        self.assertEqual(decode(responses[0]), bytes.fromhex("401B580100"))
        self.assertEqual(len(self.shuttle.pending), 1)
        self.assertEqual(self.shuttle.pending[0]["operation"], 0x13)
        self.shuttle.handle(refinement)
        self.assertEqual(len(self.shuttle.pending), 1)
        self.now = 1
        self.shuttle.tick()
        self.assertEqual(self.shuttle.position(), [1, 2, 1])
        self.assertEqual(self.shuttle.state["task_step"], 1)

    def test_path_refinement_rejects_different_task_direction_or_target(self):
        self.arm()
        self.shuttle.handle(task_packet(task=7000, commands=((7001, 7, 2),)))
        for packet in [
                task_packet(task=7001, commands=((7001, 7, 2),), kind=0x40),
                task_packet(task=7000, commands=((7000, 8, 2),), kind=0x40),
                task_packet(task=7000, commands=((7000, 7, 3),), kind=0x40)]:
            with self.subTest(packet=packet), self.assertRaises(ProtocolError):
                self.shuttle.handle(packet)
        self.assertEqual(self.shuttle.pending[0]["operation"], 7)

    def test_path_refinement_rejects_paused_task(self):
        self.arm()
        self.shuttle.handle(task_packet(task=7000, commands=((7001, 7, 2),)))
        self.shuttle.control("pause", {})
        with self.assertRaisesRegex(ProtocolError, "paused"):
            self.shuttle.handle(task_packet(
                task=7000, commands=((7000, 7, 2),), kind=0x40))

    def test_position_sync(self):
        self.arm()
        responses = self.shuttle.handle(frame(bytes.fromhex("90000701020302")))
        self.assertEqual(self.shuttle.position(), [2, 3, 2])
        self.assertEqual(decode(responses[0]), bytes.fromhex("9000070100"))

    def test_fault_recovery_requires_resume(self):
        self.arm()
        self.shuttle.handle(task_packet())
        self.shuttle.control("fault", {})
        self.now = 2
        self.assertFalse(self.shuttle.tick())
        self.shuttle.control("recover", {})
        self.assertEqual(self.shuttle.state["state"], 6)
        self.assertFalse(self.shuttle.tick())
        self.shuttle.control("resume", {})
        self.now = 3
        self.shuttle.tick()
        self.assertEqual(self.shuttle.position(), [1, 2, 1])

    def test_cancel_never_completes_pending_commands(self):
        self.arm()
        self.shuttle.handle(task_packet())
        self.shuttle.control("cancel", {})
        self.now = 1
        self.shuttle.tick()
        self.assertEqual(self.shuttle.position(), [1, 1, 1])
        self.assertEqual(self.shuttle.state["state"], 0)
        kinds = [event["kind"] for event in self.journal.events(0, 100)]
        self.assertNotIn("task_completed", kinds)

    def test_restart_disarms_and_preserves_audit(self):
        self.arm()
        self.shuttle.handle(task_packet())
        last = self.journal.latest()
        fresh = Shuttle(self.journal, lambda: self.now)
        self.assertFalse(fresh.state["armed"])
        self.assertEqual(fresh.pending, [])
        self.assertGreater(self.journal.latest(), last)
        self.assertEqual(fresh.state["allowed_nodes"], configuration()["allowed_nodes"])

    def test_journal_pagination_and_snapshot(self):
        first = self.journal.latest()
        self.journal.record("first")
        through = self.journal.latest()
        self.journal.record("second")
        records = self.journal.events(first, 100, through)
        self.assertEqual([event["kind"] for event in records], ["first"])

    def test_task_focused_journal_preserves_commands_and_errors(self):
        after = self.journal.latest()
        self.journal.record("rx_chunk", hex="55AA")
        self.journal.record("rx_frame", message_type="33")
        self.journal.record("tx_sent", hex="55AA")
        self.journal.record("rx_frame", message_type="30")
        self.journal.record("command_completed", command={"id": 7001})
        self.journal.record("fault", message="test")
        events = self.journal.events(after, 100, task_only=True)
        self.assertEqual([e["kind"] for e in events],
                         ["rx_frame", "command_completed", "fault"])


class NetworkTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.journal = Journal(Path(self.directory.name) / "network.sqlite3")
        self.shuttle = Shuttle(self.journal)
        self.shuttle.configure(configuration())
        self.shuttle.control("arm", {})
        self.app = Application(self.shuttle, "test-only-token", ["127.0.0.1"])
        self.app.loop = asyncio.get_running_loop()
        self.app.stop = asyncio.Event()
        self.server = await asyncio.start_server(self.app.connection, "127.0.0.1", 0)
        self.port = self.server.sockets[0].getsockname()[1]
        self.clients = []

    async def asyncTearDown(self):
        self.app.stop.set()
        for writer in self.clients:
            writer.close()
            await writer.wait_closed()
        self.server.close()
        await self.server.wait_closed()
        await asyncio.sleep(0.1)
        self.journal.connection.close()
        self.directory.cleanup()

    async def client(self):
        reader, writer = await asyncio.open_connection("127.0.0.1", self.port)
        self.clients.append(writer)
        return reader, writer

    async def packet(self, reader):
        header = await asyncio.wait_for(reader.readexactly(3), 2)
        return header + await reader.readexactly(header[2] + 1)

    async def test_tcp_exchange_logged_both_directions(self):
        reader, writer = await self.client()
        self.assertEqual(decode(await self.packet(reader))[0], 1)
        request = frame(bytes.fromhex("330000010A"))
        writer.write(request[:4])
        await writer.drain()
        writer.write(request[4:])
        await writer.drain()
        self.assertEqual(decode(await self.packet(reader)), bytes.fromhex("3300000100"))
        self.assertEqual(decode(await self.packet(reader))[0], 1)
        records = self.journal.events(0, 100)
        self.assertTrue(any(e["kind"] == "rx_frame" and e["details"]["hex"] == request.hex().upper()
                            for e in records))
        self.assertTrue(any(e["kind"] == "tx_sent" for e in records))

    async def test_self_test_passes_and_does_not_change_connected_shuttle(self):
        before = self.shuttle.snapshot()
        result = await self.app.api("POST", "/api/self-test", {}, {})
        self.assertTrue(result["passed"], result)
        self.assertEqual(len(result["checks"]), 12)
        self.assertEqual(self.shuttle.snapshot(), before)
        self.assertEqual(self.journal.last_self_test(), result)
        state = await self.app.api("GET", "/api/state", {}, None)
        self.assertEqual(state["self_test"], result)
        with self.assertRaises(ControlError):
            await self.app.api("POST", "/api/self-test", {}, {"unexpected": True})

    async def test_second_client_is_rejected(self):
        first, _ = await self.client()
        await self.packet(first)
        second, _ = await self.client()
        self.assertEqual(await asyncio.wait_for(second.read(), 2), b"")

    async def test_optional_vpn_listener_absence_is_logged(self):
        config = dict(http_port=8765, allowed_origins=[],
                      optional_http_bind=["100.119.148.61"])
        with patch("simulator.ThreadingHTTPServer",
                   side_effect=OSError(errno.EADDRNOTAVAIL, "Address unavailable")):
            self.assertIsNone(open_http_listener(
                self.app, config, "100.119.148.61", set()))
            with self.assertRaises(OSError):
                open_http_listener(self.app, config, "127.0.0.1", set())
        self.assertTrue(any(e["kind"] == "listener_unavailable"
                            for e in self.journal.events(0, 100)))
        with patch("simulator.ThreadingHTTPServer",
                   side_effect=OSError(errno.EADDRINUSE, "Port occupied")):
            with self.assertRaises(OSError):
                open_http_listener(self.app, config, "100.119.148.61", set())

    async def test_workflow_exchanges_persist_and_are_not_duplicated(self):
        event = {"source": "WES", "timestamp": "09:30", "tasks": ["MOV20261008000001"],
                 "kind": "HTTP task reply", "route": "ECS", "details": {"code": 200}}
        result = dict(events=[event], sources=[], verification=None, scope="Test logs")
        with patch("simulator.read_workflow_logs", return_value=result):
            first = await self.app.api("GET", "/api/workflow", {}, None)
            second = await self.app.api("GET", "/api/workflow", {}, None)
        self.assertEqual(first["events"], [event])
        self.assertEqual(second["events"], [event])
        records = self.journal.events(0, 100)
        self.assertEqual(sum(e["kind"] == "warehouse_exchange" for e in records), 1)
        with patch("simulator.read_workflow_logs",
                   return_value=dict(events=[], sources=[], scope="Empty tail")):
            retained = await self.app.api("GET", "/api/workflow", {}, None)
        self.assertEqual(retained["events"], [event])
        with self.assertRaises(ControlError):
            await self.app.api("GET", "/api/events", {"task_only": ["invalid"]}, None)

    async def test_disconnect_during_task_faults(self):
        reader, writer = await self.client()
        await self.packet(reader)
        writer.write(task_packet())
        await writer.drain()
        await self.packet(reader)
        await self.packet(reader)
        writer.close()
        await writer.wait_closed()
        await asyncio.sleep(0.1)
        self.assertEqual(self.shuttle.state["state"], 11)
        self.assertIn("Disconnected", self.shuttle.state["last_error"])

    async def test_plc_writes_persist_deduplicate_and_export_stable_pages(self):
        event = dict(source="ECS PLC write snapshot", timestamp="2026-10-08 10:26:48.529",
                     source_offset=0, source_file="test.log",
                     details=dict(name="Hoist", address="DB1.2", value="2",
                                  success=True, result_message=None))
        logs = dict(events=[event], sources=[], timestamp="now", scope="Test snapshots")
        with patch("simulator.read_plc_write_logs", return_value=logs):
            first = await self.app.api("GET", "/api/plc-writes", {}, None)
            second = await self.app.api("GET", "/api/plc-writes", {}, None)
        self.assertEqual(first, second)
        self.assertEqual(first["total"], 1)
        self.assertEqual(first["events"][0]["details"], event["details"])
        self.journal.record_plc_write(dict(event, source_offset=100))
        page = await self.app.api("GET", "/api/plc-writes",
                                  {"through": [str(first["through"])], "limit": ["1"]}, None)
        self.assertEqual(page, first)
        empty = await self.app.api("GET", "/api/plc-writes", {
            "through": [str(first["through"])], "after": [str(first["events"][0]["id"])]}, None)
        self.assertEqual(empty["events"], [])
        self.assertEqual(empty["total"], 1)
        for query in ({"limit": ["0"]}, {"after": ["invalid"]}, {"through": ["-1"]}):
            with self.assertRaises(ControlError):
                await self.app.api("GET", "/api/plc-writes", query, None)
        with patch("simulator.read_plc_write_logs",
                   return_value=dict(logs, events=[], sources=[dict(
                       available=False, errors=["No source file"])])):
            retained = await self.app.api("GET", "/api/plc-writes", {}, None)
        self.assertEqual(retained["total"], 2)
        self.assertEqual(retained["sources"][0]["errors"], ["No source file"])

    async def test_plc_export_pages_include_more_than_table_limit(self):
        for offset in range(1001):
            self.journal.record_plc_write(dict(
                source="ECS PLC write snapshot", timestamp="2026-10-08 10:26:48.529",
                source_offset=offset, details=dict(name="Conveyor", address="DB1.2",
                                                  value="1", success=True)))
        logs = dict(events=[], sources=[], timestamp="now", scope="Test snapshots")
        with patch("simulator.read_plc_write_logs", return_value=logs):
            first = await self.app.api("GET", "/api/plc-writes", {"limit": ["1000"]}, None)
        second = await self.app.api("GET", "/api/plc-writes", {
            "limit": ["1000"], "after": [str(first["events"][-1]["id"])],
            "through": [str(first["through"])]}, None)
        self.assertEqual(first["total"], 1001)
        self.assertEqual(len(first["events"]), 1000)
        self.assertEqual(len(second["events"]), 1)
        self.assertEqual(second["events"][0]["source_offset"], 1000)

    async def test_invalid_crc_closes_connection_and_is_logged(self):
        reader, writer = await self.client()
        await self.packet(reader)
        packet = bytearray(task_packet())
        packet[-1] ^= 1
        writer.write(packet)
        await writer.drain()
        self.assertEqual(await asyncio.wait_for(reader.read(), 2), b"")
        self.assertTrue(any(e["kind"] == "protocol_error" for e in self.journal.events(0, 100)))

    async def test_http_auth_origin_and_control_validation(self):
        server = ThreadingHTTPServer(("127.0.0.1", 0),
                                     http_handler(self.app, {"http://127.0.0.1"}, set()))
        port = server.server_address[1]
        server.RequestHandlerClass = http_handler(
            self.app, {"http://127.0.0.1"}, {f"127.0.0.1:{port}"})
        thread = Thread(target=server.serve_forever, daemon=True)
        thread.start()

        def request(path="/api/state", token="test-only-token", origin="http://127.0.0.1", data=None):
            headers = {"Authorization": "Bearer " + token, "Origin": origin}
            if data is not None:
                headers["Content-Type"] = "application/json"
            req = Request(f"http://127.0.0.1:{port}" + path,
                          data=json.dumps(data).encode() if data is not None else None,
                          headers=headers)
            try:
                with urlopen(req, timeout=3) as response:
                    return response.status, json.load(response)
            except HTTPError as error:
                return error.code, json.load(error)

        try:
            code, state = await asyncio.to_thread(request)
            self.assertEqual(code, 200)
            self.assertTrue(state["simulation"])
            self.assertEqual((await asyncio.to_thread(request, token="wrong"))[0], 401)
            self.assertEqual((await asyncio.to_thread(request, origin="http://untrusted.invalid"))[0], 403)
            self.assertEqual((await asyncio.to_thread(request, path="/api/events?limit=-1"))[0], 400)
            self.assertEqual((await asyncio.to_thread(
                request, path="/api/control",
                data={"action": "disarm", "parameters": {}}))[0], 200)
            self.assertFalse(self.shuttle.state["armed"])
        finally:
            await asyncio.to_thread(server.shutdown)
            server.server_close()
            thread.join(timeout=2)


if __name__ == "__main__":
    unittest.main()
