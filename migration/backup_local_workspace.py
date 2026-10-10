"""Create a private same-computer recovery backup without starting services."""

import datetime
import hashlib
import json
import os
from pathlib import Path
import subprocess
import uuid


HOME = Path("/home/PSA")
CONTAINERS = (
    "mysql", "redis", "ehox-ecs", "ehox-wes", "ehox-wms",
    "web-ehox-ecs-ui", "web-ehox-wes-ui", "web-ehox-wms-ui",
)


def run(args, **kwargs):
    return subprocess.run(args, check=True, **kwargs)


def main():
    if os.geteuid() != 0:
        raise SystemExit("Run with sudo; Docker and private deployment files require root.")
    os.umask(0o077)
    base = HOME / "ECS-private-backups"
    base.mkdir(mode=0o700, exist_ok=True)
    stamp = datetime.datetime.now(datetime.timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    backup = base / f"{stamp}-{uuid.uuid4().hex[:8]}"
    backup.mkdir(mode=0o700)
    uid = int(os.environ.get("SUDO_UID", "0"))
    gid = int(os.environ.get("SUDO_GID", "0"))
    try:
        metadata = json.loads(run(
            ["docker", "inspect", *CONTAINERS],
            stdout=subprocess.PIPE, text=True,
        ).stdout)
        for name in ("mysql", "redis"):
            item = next(c for c in metadata if c["Name"] == "/" + name)
            if not item["State"]["Running"]:
                raise RuntimeError(f"{name} must already be running; no services were started.")
        (backup / "containers-private.json").write_text(json.dumps(metadata, indent=2))
        image_ids = sorted({container["Image"] for container in metadata})
        images = json.loads(run(
            ["docker", "image", "inspect", *image_ids],
            stdout=subprocess.PIPE, text=True,
        ).stdout)
        image_refs = sorted({
            ref for image in images
            for ref in (image.get("RepoTags") or [image["Id"]])
            if ref != "<none>:<none>"
        })
        (backup / "images.json").write_text(json.dumps(images, indent=2))
        print("Saving local Docker runtime images (no download required)...", flush=True)
        run(["docker", "image", "save", "-o", str(backup / "docker-images.tar"), *image_refs])
        networks = sorted({
            name for container in metadata
            for name in container["NetworkSettings"]["Networks"]
        })
        (backup / "networks.json").write_text(run(
            ["docker", "network", "inspect", *networks],
            stdout=subprocess.PIPE, text=True,
        ).stdout)
        with (backup / "mysql-all.sql").open("wb") as output:
            run([
                "docker", "exec", "mysql", "sh", "-c",
                'export MYSQL_PWD="$MYSQL_ROOT_PASSWORD"; exec mysqldump -uroot '
                '--all-databases --single-transaction --routines --events --triggers '
                '--set-gtid-purged=OFF --no-tablespaces',
            ], stdout=output)

        redis = next(c for c in metadata if c["Name"] == "/redis")
        command = redis["Config"]["Cmd"] or []
        if "--requirepass" not in command:
            raise RuntimeError("Redis authentication configuration differs; review before backup.")
        password = command[command.index("--requirepass") + 1]
        remote_dump = f"/tmp/psa-backup-{uuid.uuid4().hex}.rdb"
        try:
            run([
                "docker", "exec", "-i", "redis", "sh", "-c",
                'IFS= read -r REDISCLI_AUTH; export REDISCLI_AUTH; '
                'exec redis-cli --rdb "$1"',
                "sh", remote_dump,
            ], input=password + "\n", text=True)
            run(["docker", "cp", f"redis:{remote_dump}", str(backup / "redis.rdb")])
        finally:
            run(["docker", "exec", "redis", "rm", "-f", remote_dump])

        run([
            "tar", "--exclude=data/apps/*/logs",
            "-czf", str(backup / "deployment-private.tar.gz"),
            "-C", "/", "data/apps",
        ])
        infrastructure = [
            Path("/data/1panel/apps/mysql/mysql/conf"),
            Path("/data/1panel/apps/redis/redis/conf"),
            Path("/etc/NetworkManager/system-connections"),
        ]
        for directory in infrastructure:
            if not directory.is_dir():
                raise RuntimeError(f"Required infrastructure directory missing: {directory}")
        if Path("/etc/docker").is_dir():
            infrastructure.append(Path("/etc/docker"))
        run([
            "tar", "-czf", str(backup / "infrastructure-private.tar.gz"),
            "-C", "/", *[str(path.relative_to("/")) for path in infrastructure],
        ])
        (backup / "host-network.json").write_text(run(
            ["ip", "-j", "address", "show"], stdout=subprocess.PIPE, text=True,
        ).stdout)
        run([
            "tar", "-czf", str(backup / "workspace.tar.gz"), "-C", str(HOME),
            "ecs-simulator-source", "ecs-address-override.yml",
            "Desktop/PSA-ECS.code-workspace",
            "Downloads/ecs-simulator-source.code-workspace",
            ".copilot/session-state/180f0f9a-8764-4e35-85e2-9b363700181d/files",
        ])
        editor_paths = [
            path for path in (
                HOME / ".vscode/extensions",
                HOME / ".config/Code/User/settings.json",
                HOME / ".config/Code/User/keybindings.json",
                HOME / ".config/Code/User/snippets",
            ) if path.exists()
        ]
        if editor_paths:
            run([
                "tar", "-czf", str(backup / "editor-settings.tar.gz"),
                "-C", str(HOME), *[str(path.relative_to(HOME)) for path in editor_paths],
            ])
        hashes = {}
        for file in backup.iterdir():
            if file.is_file():
                with file.open("rb") as stream:
                    hashes[file.name] = hashlib.file_digest(stream, "sha256").hexdigest()
        (backup / "COMPLETE.json").write_text(json.dumps({
            "created_utc": stamp,
            "sha256": hashes,
            "scope": (
                "Workspace, private application files, Docker runtime images and metadata, "
                "MySQL dump, Redis snapshot, infrastructure configuration and editor settings"
            ),
            "limitations": [
                "Not a VM image; host OS, Docker engine and VS Code installers are not included.",
                "Individual snapshots are not atomic across services; isolate equipment and avoid edits.",
                "Chat recovery notes are included, not a guaranteed restorable VS Code chat export.",
                "Do not restore onto a live connected shuttle system without an offline recovery plan.",
            ],
        }, indent=2))
        print(f"COMPLETE: private backup saved to {backup}")
    except Exception:
        print(f"FAILED: incomplete backup at {backup}; do not use it for recovery.", flush=True)
        raise
    finally:
        os.chown(base, uid, gid)
        os.chmod(base, 0o700)
        for file in backup.iterdir():
            if file.is_file():
                os.chmod(file, 0o600)
                os.chown(file, uid, gid)
        os.chown(backup, uid, gid)


if __name__ == "__main__":
    main()
