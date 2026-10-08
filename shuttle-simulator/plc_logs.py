import re
from datetime import datetime, timedelta, timezone
from pathlib import Path


LOG_ROOT = Path("/data/apps/ehox-ecs/logs/chitu_log")
MAX_TAIL_BYTES = 1024 * 1024
LOOKBACK_DAYS = 30
WRITE_MARKER = "\u3010PLC\u5199\u5165\u5feb\u7167\u3011"
WRITE_RECORD = re.compile(
    r"WriteSnapshotItem\[name=(.*?), address=(.*?), value=(.*?), "
    r"success=(true|false), resultMsg=(.*)\]$")
TIMESTAMP = re.compile(r"^(\d\d:\d\d:\d\d\.\d+)\s")


def parse_plc_writes(text, log_date, start_offset=0):
    events, errors = [], []
    offset = start_offset
    for number, raw_line in enumerate(text.splitlines(keepends=True), 1):
        line_offset = offset
        offset += len(raw_line.encode("utf-8"))
        line = raw_line.rstrip("\r\n")
        if WRITE_MARKER not in line:
            continue
        stamp = TIMESTAMP.match(line)
        record = WRITE_RECORD.fullmatch(line.split(WRITE_MARKER, 1)[1].strip())
        if not stamp or not record:
            errors.append(f"Unrecognized PLC write snapshot at tail line {number}")
            continue
        name, address, value, success, message = record.groups()
        if any(len(field) > 4096 for field in (name, address, value, message)):
            errors.append(f"Oversized PLC write snapshot at tail line {number}")
            continue
        events.append(dict(
            source="ECS PLC write snapshot",
            source_offset=line_offset,
            timestamp=f"{log_date} {stamp.group(1)}",
            details=dict(name=name, address=address, value=value,
                         success=success == "true",
                         result_message=None if message == "null" else message),
        ))
    return events, errors


def read_plc_write_logs():
    today = datetime.now(timezone.utc).date()
    events, sources = [], []
    current_available = False
    for days in range(LOOKBACK_DAYS - 1, -2, -1):
        date = today - timedelta(days=days)
        path = LOG_ROOT / date.strftime("%Y/%m/%d") / "plc_snapshot.log"
        try:
            with path.open("rb") as stream:
                size = stream.seek(0, 2)
                offset = max(0, size - MAX_TAIL_BYTES)
                stream.seek(offset)
                raw = stream.read(MAX_TAIL_BYTES)
            if offset:
                partial, separator, raw = raw.partition(b"\n")
                offset += len(partial) + len(separator)
            parsed, errors = parse_plc_writes(
                raw.decode("utf-8", errors="replace"), date.isoformat(), offset)
            for event in parsed:
                event["source_file"] = str(path)
            events.extend(parsed)
            sources.append(dict(path=str(path), available=True, truncated=bool(offset),
                                events=len(parsed), errors=errors))
            if days <= 0:
                current_available = True
        except FileNotFoundError:
            continue
        except OSError as error:
            sources.append(dict(path=str(path), available=False, events=0,
                                errors=[f"Cannot read PLC snapshots: {error}"]))
    if not current_available:
        sources.append(dict(
            path=str(LOG_ROOT / today.strftime("%Y/%m/%d") / "plc_snapshot.log"),
            available=False, events=0,
            errors=["No readable current PLC snapshot file; no writes can be confirmed."]))
    return dict(
        timestamp=datetime.now(timezone.utc).isoformat(timespec="seconds"),
        sources=sources, events=events,
        scope=f"Read-only ECS PLC write snapshots from the last {LOOKBACK_DAYS} UTC dates "
              f"plus the next dated directory to cover ECS timezone differences, up to "
              f"{MAX_TAIL_BYTES} bytes per file. Collected writes are retained "
              "in the simulator journal. Values are the logged text; success is the ECS "
              "driver result, not confirmation of physical movement. No raw PLC packets "
              "or inferred equipment identities are included. Writes rejected before the "
              "driver call and asynchronously dropped ECS log entries may not appear.",
    )
