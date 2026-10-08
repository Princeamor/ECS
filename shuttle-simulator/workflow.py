import json
import re
from datetime import datetime, timezone
from pathlib import Path


LOG_SOURCES = {
    "WMS": Path("/data/apps/ehox-wms/logs/ehox-admin/info.log"),
    "WES": Path("/data/apps/ehox-wes/logs/ehox-admin/info.log"),
    "ECS": Path("/data/apps/ehox-ecs/logs/chitu_log/sys-info.log"),
}
MAX_TAIL_BYTES = 1024 * 1024
TASK_ROUTE = re.compile(
    r"https?://[^\s,]+/(?:api/)?(?:wes/stockTask/(?:addTask|ecsNotice)|"
    r"wms/(?:wes/stockTaskFallback|interface/taskFallback)|taskApi/addTask)\b")
TASK_CODE = re.compile(r"\bMOV\d{14}(?:-\d+)?\b|\b\d{14}A\d{3}\b")
FIELDS = {
    "taskCode", "outTaskCode", "moveObj", "taskType", "startPos", "endPos",
    "priority", "wareId", "type", "palletCode", "palletId", "storageId",
    "storageCode", "startPosition", "endPosition", "status", "code", "msg",
}
REPORT_PATH = Path(__file__).with_name("workflow-verification.json")


def safe_fields(value):
    if not isinstance(value, dict):
        return {}
    return {key: val[:240] if isinstance(val, str) else val
            for key, val in value.items()
            if key in FIELDS and (val is None or type(val) in (str, int, float, bool))}


def parse_log(source, text):
    events, errors, pending = [], [], {}
    decoder = json.JSONDecoder()
    for line in text.splitlines():
        timestamp = re.match(r"(\d{4}-\d\d-\d\d \d\d:\d\d:\d\d[,\.]\d+|\d\d:\d\d:\d\d\.\d+)", line)
        if not timestamp or "SQL参数" in line:
            continue
        route = TASK_ROUTE.search(line)
        thread = re.search(r"\[([^\]]+)\]", line)
        thread = thread.group(1) if thread else ""
        event = dict(source=source, timestamp=timestamp.group(1), tasks=TASK_CODE.findall(line))
        if route and "sendPost - " in line:
            pending[thread] = route.group()
            event.update(kind="HTTP task request", route=route.group(), details={})
        elif "HttpUtils" in line and "recv - " in line and thread in pending:
            try:
                result = json.loads(line.split("recv - ", 1)[1])
            except json.JSONDecodeError as error:
                errors.append(f"{source}: malformed task reply at {event['timestamp']}: {error.msg}")
                pending.pop(thread, None)
                continue
            event.update(kind="HTTP task reply", route=pending.pop(thread),
                         details=safe_fields(result))
        elif route and "SysLog(" in line and "param={" in line:
            try:
                payload, _ = decoder.raw_decode(line.split("param=", 1)[1])
                response_text = line.split("responseData=", 1)[1]
                response = None if response_text.startswith("null") else decoder.raw_decode(response_text)[0]
            except (json.JSONDecodeError, IndexError) as error:
                errors.append(f"{source}: malformed structured task log at {event['timestamp']}: {error}")
                continue
            event.update(kind="Logged warehouse exchange", route=route.group(),
                         details=dict(request=safe_fields(payload),
                                      response=None if response is None else safe_fields(response)))
        elif source == "ECS" and "packMessageByte" in line and "指令集:[" in line:
            packet = re.search(r"指令集:(\[[0-9a-fA-F, ]+\])", line)
            if not packet:
                errors.append(f"ECS: unrecognized command log at {event['timestamp']}")
                continue
            event.update(kind="Shuttle command sent", route="ECS -> simulator",
                         details=dict(command_bytes=packet.group(1)))
        elif source == "ECS" and "PathSchedule" in line and "TASK_CODE=" in line:
            fields = dict(re.findall(r"\b(TASKID|TASK_CODE|DEVICE_CODE|START_NODE|END_NODE)=([A-Za-z0-9-]+)", line))
            event.update(kind="ECS path planned", route="ECS scheduler", details=fields)
        else:
            continue
        events.append(event)
    return events[-100:], errors[-10:]


def read_workflow_logs():
    events, sources = [], []
    for name, path in LOG_SOURCES.items():
        try:
            with path.open("rb") as stream:
                size = stream.seek(0, 2)
                offset = max(0, size - MAX_TAIL_BYTES)
                stream.seek(offset)
                raw = stream.read(MAX_TAIL_BYTES)
            if offset:
                raw = raw.partition(b"\n")[2]
            parsed, errors = parse_log(name, raw.decode("utf-8", errors="replace"))
            events.extend(parsed)
            sources.append(dict(source=name, available=True, truncated=bool(offset),
                                events=len(parsed), errors=errors))
        except OSError as error:
            sources.append(dict(source=name, available=False, errors=[str(error)]))
    report, report_error = None, None
    try:
        with REPORT_PATH.open(encoding="utf-8") as stream:
            report = json.load(stream)
    except (OSError, json.JSONDecodeError) as error:
        report_error = f"Verification record unavailable: {error}"
    return dict(timestamp=datetime.now(timezone.utc).isoformat(timespec="seconds"),
                sources=sources, events=events, verification=report,
                verification_error=report_error,
                scope="Read-only bounded application-log excerpts, not live database status. "
                      "Application timestamps use server local time; shuttle journal uses UTC.")
