from datetime import datetime, timedelta, timezone
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

from plc_logs import WRITE_MARKER, parse_plc_writes, read_plc_write_logs


def write_line(value="2", success="true", message="null"):
    return (f"10:26:48.529 [worker] INFO file_log - [operateLog,1] - {WRITE_MARKER}"
            f"WriteSnapshotItem[name=Hoist command, address=DB1.2, value={value}, "
            f"success={success}, resultMsg={message}]\n")


class PlcLogTests(unittest.TestCase):
    def test_write_values_and_driver_failures(self):
        events, errors = parse_plc_writes(
            write_line() + write_line("false", "false", "Connection failed, timeout"),
            "2026-10-08")
        self.assertFalse(errors)
        self.assertEqual(events[0]["timestamp"], "2026-10-08 10:26:48.529")
        self.assertEqual(events[0]["details"], dict(
            name="Hoist command", address="DB1.2", value="2",
            success=True, result_message=None))
        self.assertFalse(events[1]["details"]["success"])
        self.assertEqual(events[1]["details"]["result_message"], "Connection failed, timeout")

    def test_manual_reads_and_unrelated_logs_are_not_writes(self):
        events, errors = parse_plc_writes(
            '10:26:48.529 PLC manual read address=DB1.2 value=2 password=secret\n',
            "2026-10-08")
        self.assertEqual((events, errors), ([], []))

    def test_malformed_and_oversized_records_report_errors(self):
        events, errors = parse_plc_writes(
            f"10:26:48.529 {WRITE_MARKER}invalid\n" + write_line("x" * 4097),
            "2026-10-08")
        self.assertFalse(events)
        self.assertEqual(len(errors), 2)

    def test_offsets_distinguish_identical_writes_and_survive_tail_shift(self):
        line = write_line()
        events, _ = parse_plc_writes(line * 2, "2026-10-08")
        shifted, _ = parse_plc_writes(line, "2026-10-08", len(line.encode()))
        self.assertNotEqual(events[0]["source_offset"], events[1]["source_offset"])
        self.assertEqual(events[1], shifted[0])

    def test_fixed_dated_files_missing_source_and_bounded_tail(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            path = root / datetime.now().strftime("%Y/%m/%d") / "plc_snapshot.log"
            with patch("plc_logs.LOG_ROOT", root):
                missing = read_plc_write_logs()
                self.assertFalse(missing["sources"][0]["available"])
                self.assertIn("no writes can be confirmed", missing["sources"][0]["errors"][0])
                path.parent.mkdir(parents=True)
                prefix = "ignored\n" * 100
                path.write_text(prefix + write_line())
                with patch("plc_logs.MAX_TAIL_BYTES", len(write_line().encode()) + 10):
                    result = read_plc_write_logs()
            self.assertTrue(result["sources"][0]["truncated"])
            self.assertEqual(result["events"][0]["source_offset"], len(prefix.encode()))
            self.assertEqual(result["events"][0]["source_file"], str(path))

    def test_read_failure_is_exposed(self):
        with patch("plc_logs.LOOKBACK_DAYS", 1), \
                patch("pathlib.Path.open", side_effect=PermissionError("Permission denied")):
            result = read_plc_write_logs()
        self.assertFalse(result["sources"][0]["available"])
        self.assertIn("Permission denied", result["sources"][0]["errors"][0])

    def test_next_date_directory_covers_ecs_timezone_difference(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            tomorrow = datetime.now(timezone.utc).date() + timedelta(days=1)
            path = root / tomorrow.strftime("%Y/%m/%d") / "plc_snapshot.log"
            path.parent.mkdir(parents=True)
            path.write_text(write_line())
            with patch("plc_logs.LOG_ROOT", root):
                result = read_plc_write_logs()
        self.assertEqual(len(result["events"]), 1)
        self.assertTrue(all(source["available"] for source in result["sources"]))


if __name__ == "__main__":
    unittest.main()
