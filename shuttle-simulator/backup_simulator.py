#!/usr/bin/python3
"""Create a private, verified simulator backup without stopping equipment sessions."""
import hashlib
import json
import os
from pathlib import Path
import shutil
import sqlite3
import tarfile
import tempfile
from datetime import datetime, timezone


INSTALL = Path("/home/PSA/Downloads/abyssws")
DATA = Path("/home/PSA/.local/share/shuttle-simulator")
UNITS = Path("/home/PSA/.config/systemd/user")
DOCUMENTS = Path("/data/apps")
BACKUPS = DATA / "backups"


def sha256(path):
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def main():
    os.umask(0o077)
    BACKUPS.mkdir(mode=0o700, parents=True, exist_ok=True)
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%fZ")
    archive = BACKUPS / f"shuttle-handoff-{stamp}.tar.gz"
    partial = archive.with_suffix(".partial")
    with tempfile.TemporaryDirectory(prefix=".backup-stage-", dir=BACKUPS) as temporary:
        stage = Path(temporary)
        for name in ("shuttle-simulator", "htdocs/shuttle-simulator"):
            shutil.copytree(INSTALL / name, stage / name,
                            ignore=shutil.ignore_patterns("__pycache__", "*.pyc"))
        (stage / "systemd-user").mkdir()
        for name in ("shuttle-simulator.service", "shuttle-local-web.service",
                     "abyss-shuttle-web.service"):
            shutil.copy2(UNITS / name, stage / "systemd-user" / name)
        (stage / "documents").mkdir()
        for name in ("SHUTTLE_SIMULATOR_HANDOFF.md", "PALLET_SHUTTLE_MOVE_RUNBOOK.md"):
            shutil.copy2(DOCUMENTS / name, stage / "documents" / name)
        (stage / "state").mkdir()
        source = sqlite3.connect((DATA / "events.sqlite3").as_uri() + "?mode=ro", uri=True)
        destination = sqlite3.connect(stage / "state/events.sqlite3")
        try:
            source.backup(destination, pages=256, sleep=0.05)
            integrity = destination.execute("PRAGMA integrity_check").fetchone()[0]
            if integrity != "ok":
                raise RuntimeError(f"SQLite backup integrity failed: {integrity}")
            cursor = destination.execute("SELECT COALESCE(MAX(id),0) FROM events").fetchone()[0]
            saved = destination.execute("SELECT data FROM saved_state WHERE id=1").fetchone()
            saved_state = json.loads(saved[0]) if saved else None
            counts = dict(destination.execute(
                "SELECT kind,COUNT(*) FROM events GROUP BY kind").fetchall())
        finally:
            destination.close()
            source.close()
        files = {
            str(path.relative_to(stage)): dict(bytes=path.stat().st_size, sha256=sha256(path))
            for path in sorted(stage.rglob("*")) if path.is_file()
        }
        manifest = dict(
            created_utc=datetime.now(timezone.utc).isoformat(),
            scope="Simulator source, dashboard, user service units, handoff/runbook, "
                  "prior rollback records and a consistent SQLite online backup.",
            excluded=["access-token", "SSH keys", "warehouse credentials",
                      "warehouse databases", "warehouse application JARs/images",
                      "original application logs", "Abyss binary/configuration",
                      "OS and cloud configuration", "service.log"],
            journal_cursor=cursor, event_counts=counts, saved_state=saved_state,
            sqlite_integrity=integrity, files=files,
            restore_warning="Restore only into an isolated environment. Startup disarms feedback "
                            "and does not resume pending tasks. Warehouse DBs must be backed up "
                            "and reconciled separately. Do not blindly restore old inventory state.",
        )
        (stage / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
        try:
            with tarfile.open(partial, "w:gz") as bundle:
                for path in sorted(stage.rglob("*")):
                    if path.is_file():
                        bundle.add(path, arcname=str(path.relative_to(stage)), recursive=False)
            with tarfile.open(partial, "r:gz") as bundle:
                members = {member.name: member for member in bundle.getmembers()}
                if set(members) != set(files) | {"manifest.json"}:
                    raise RuntimeError("Backup archive membership verification failed")
                for name, expected in files.items():
                    stream = bundle.extractfile(members[name])
                    digest = hashlib.sha256()
                    size = 0
                    with stream:
                        for block in iter(lambda: stream.read(1024 * 1024), b""):
                            digest.update(block)
                            size += len(block)
                    if digest.hexdigest() != expected["sha256"] or size != expected["bytes"]:
                        raise RuntimeError(f"Backup member verification failed: {name}")
            partial.rename(archive)
        finally:
            if partial.exists():
                partial.unlink()
    checksum = archive.with_name(archive.name + ".sha256")
    checksum.write_text(f"{sha256(archive)}  {archive.name}\n")
    print(json.dumps(dict(archive=str(archive), checksum=str(checksum),
                          files=len(files), bytes=archive.stat().st_size,
                          journal_cursor=cursor, sqlite_integrity=integrity,
                          archive_members_verified=True), indent=2))


if __name__ == "__main__":
    main()
