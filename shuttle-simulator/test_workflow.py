import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

from workflow import parse_log, read_workflow_logs, safe_fields


class WorkflowTests(unittest.TestCase):
    def test_task_http_reply_is_correlated_and_credentials_are_excluded(self):
        events, errors = parse_log("WES", "\n".join([
            '2026-10-08 09:30:00,001 [scheduler] HttpUtils sendPost - http://ehox-ecs:8060/api/taskApi/addTask',
            '2026-10-08 09:30:00,002 [different] HttpUtils recv - {"code":0,"token":"secret"}',
            '2026-10-08 09:30:00,003 [scheduler] HttpUtils recv - {"code":200,"msg":"ok","token":"secret"}',
        ]))
        self.assertEqual(errors, [])
        self.assertEqual(len(events), 2)
        self.assertEqual(events[-1]["details"], {"code": 200, "msg": "ok"})
        self.assertNotIn("secret", json.dumps(events))

    def test_structured_exchange_keeps_task_ids_and_not_arbitrary_fields(self):
        line = ('2026-10-08 09:30:00,001 [sys-log-1] SysLog(id=1, '
                'url=http://ehox-ecs:8060/api/taskApi/addTask, '
                'param={"outTaskCode":"MOV20261008000001-1","endPos":"2-3-2","APP_SECRET":"secret"}, '
                'responseTime=3, responseData={"code":200,"msg":"ok","data":{"token":"secret"}})')
        events, errors = parse_log("WES", line)
        self.assertFalse(errors)
        self.assertEqual(events[0]["tasks"], ["MOV20261008000001-1"])
        self.assertEqual(events[0]["details"]["request"]["endPos"], "2-3-2")
        self.assertNotIn("secret", json.dumps(events))

    def test_null_response_and_malformed_reply_are_explicit(self):
        events, errors = parse_log("WMS", "\n".join([
            '2026-10-08 09:30:00,001 [sys-log-1] SysLog(url=http://ehox-wes:8092/api/wes/stockTask/addTask, param={"type":3}, responseData=null)',
            '2026-10-08 09:30:00,002 [scheduler] HttpUtils sendPost - http://ehox-ecs:8060/api/taskApi/addTask',
            '2026-10-08 09:30:00,003 [scheduler] HttpUtils recv - invalid json',
        ]))
        self.assertIsNone(events[0]["details"]["response"])
        self.assertIn("malformed task reply", errors[0])

    def test_fixed_log_sources_missing_files_and_bounded_tail(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "test.log"
            path.write_text("discard\n" * 100 + '09:31:00.001 [car] packMessageByte 指令集:[30, 1B, 58]\n')
            report = Path(directory) / "report.json"
            report.write_text('{"summary":"historical verification"}')
            with patch("workflow.LOG_SOURCES", {"ECS": path, "WES": path.with_name("missing.log")}), \
                    patch("workflow.REPORT_PATH", report), \
                    patch("workflow.MAX_TAIL_BYTES", 150):
                result = read_workflow_logs()
            self.assertTrue(result["sources"][0]["truncated"])
            self.assertFalse(result["sources"][1]["available"])
            self.assertEqual(len(result["events"]), 1)
            self.assertEqual(result["verification"]["summary"], "historical verification")

    def test_fields_are_scalar_only(self):
        self.assertEqual(safe_fields({"code": 200, "msg": "x" * 300, "data": {"password": "secret"},
                                     "taskCode": {"nested": "secret"}}),
                         {"code": 200, "msg": "x" * 240})

    def test_actual_wms_completion_callback_is_included(self):
        events, errors = parse_log("WES", "\n".join([
            '2026-10-08 09:43:46,767 [callback] HttpUtils sendPost - http://ehox-wms:8082/api/wms/interface/taskFallback',
            '2026-10-08 09:43:47,001 [callback] HttpUtils recv - {"code":0,"msg":"Operation succeeded"}',
        ]))
        self.assertFalse(errors)
        self.assertEqual(len(events), 2)
        self.assertEqual(events[-1]["details"]["code"], 0)


if __name__ == "__main__":
    unittest.main()
