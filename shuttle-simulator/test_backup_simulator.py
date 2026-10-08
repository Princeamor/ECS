import contextlib
import hashlib
import io
import json
from pathlib import Path
import sqlite3
import tarfile
import tempfile
import unittest
from unittest.mock import patch

import backup_simulator


class BackupTests(unittest.TestCase):
    def test_archive_includes_committed_wal_and_excludes_token(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            install, data, units, documents = [root / name for name in
                                                ("install", "data", "units", "documents")]
            for folder in (install / "shuttle-simulator",
                           install / "htdocs/shuttle-simulator", data, units, documents):
                folder.mkdir(parents=True)
            (install / "shuttle-simulator/simulator.py").write_text("source fixture\n")
            (install / "htdocs/shuttle-simulator/index.html").write_text("dashboard fixture\n")
            (data / "access-token").write_text("must-not-be-archived")
            for name in ("shuttle-simulator.service", "shuttle-local-web.service",
                         "abyss-shuttle-web.service"):
                (units / name).write_text("unit fixture\n")
            for name in ("SHUTTLE_SIMULATOR_HANDOFF.md", "PALLET_SHUTTLE_MOVE_RUNBOOK.md"):
                (documents / name).write_text("document fixture\n")
            source = sqlite3.connect(data / "events.sqlite3")
            source.executescript("""
                PRAGMA journal_mode=WAL;
                CREATE TABLE events(id INTEGER PRIMARY KEY, kind TEXT);
                CREATE TABLE saved_state(id INTEGER PRIMARY KEY, data TEXT);
                INSERT INTO events VALUES(1, 'rx_frame');
                INSERT INTO saved_state VALUES(1, '{"x":2,"armed":true}');
            """)
            source.commit()
            try:
                with patch.multiple(backup_simulator, INSTALL=install, DATA=data, UNITS=units,
                                    DOCUMENTS=documents, BACKUPS=data / "backups"), \
                        contextlib.redirect_stdout(io.StringIO()) as output:
                    backup_simulator.main()
                result = json.loads(output.getvalue())
                archive = Path(result["archive"])
                self.assertEqual(archive.stat().st_mode & 0o777, 0o600)
                self.assertEqual((data / "backups").stat().st_mode & 0o777, 0o700)
                expected_hash = Path(result["checksum"]).read_text().split()[0]
                self.assertEqual(hashlib.sha256(archive.read_bytes()).hexdigest(), expected_hash)
                with tarfile.open(archive, "r:gz") as bundle:
                    names = bundle.getnames()
                    self.assertFalse(any("access-token" in name for name in names))
                    manifest = json.load(bundle.extractfile("manifest.json"))
                    self.assertEqual(manifest["journal_cursor"], 1)
                    self.assertEqual(manifest["saved_state"]["x"], 2)
                    self.assertEqual(manifest["event_counts"], {"rx_frame": 1})
                    restored_path = root / "restored.sqlite3"
                    restored_path.write_bytes(bundle.extractfile("state/events.sqlite3").read())
                restored = sqlite3.connect(restored_path)
                try:
                    self.assertEqual(restored.execute("PRAGMA integrity_check").fetchone()[0], "ok")
                    self.assertEqual(restored.execute("SELECT COUNT(*) FROM events").fetchone()[0], 1)
                finally:
                    restored.close()
            finally:
                source.close()


if __name__ == "__main__":
    unittest.main()
