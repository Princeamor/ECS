# Online migration to a local Red Hat Enterprise Linux 10 machine

Prepared 2026-10-08. Target: **RHEL 10, x86_64**, isolated local test environment.
Source remains running. **Do not shut down, stop, restart, or reconfigure source
services to follow this guide.** Commands that start containers/services below
are for the new machine only.

## Read this first

The simulator source is on GitHub, but Git alone does not contain the current
warehouse databases, application JARs, container images, credentials, or all
uncommitted workspace edits. This guide transfers those privately as well.

- Source repository: `Princeamor/ECS`.
- Branch to clone: `shuttle-simulator-handoff-20261008`, not `main`.
- Earlier saved simulator commit: `276f379`.
- [Operational handoff](SHUTTLE_SIMULATOR_HANDOFF.md).
- [Historical investigation/runbook](PALLET_SHUTTLE_MOVE_RUNBOOK.md).
- [Source layout](SHUTTLE_SOURCE_README.md).
- [Local-only Compose template](migration/compose.rhel10.yml).

The new deployment must be isolated from real equipment and production inventory.
Two isolated copies can run, but neither may reach physical controllers. A
snapshot is a point-in-time copy, **not live synchronization**. Later work on the
source will not appear locally unless exported again.

The following is a documented migration procedure, not a claim that the new
machine has been installed or restored. Source Docker/sudo administration and
target RHEL 10 execution require operator access. No database export or target
deployment has been performed automatically.

### Short checklist

1. On the source: create the private export folder (section 2).
2. Export MySQL, Redis and simulator state online (section 3).
3. Archive current workspace files/images; make checksums (sections 4-5).
4. On the new RHEL 10 machine: copy/verify those private files, install Docker,
   clone this branch, and restore into fresh directories (sections 6-8).
5. Restore databases, then simulator, then warehouse apps (sections 9-11).
6. Validate one isolated move and keep both machines/data copies (section 12).

## 1. What must travel, and where it belongs

| Work/data | Source | How to transfer |
|---|---|---|
| Git history and committed source | `/data/apps/.git` | Clone branch; private workspace archive also preserves local Git |
| All current workspace edits, JARs, compiled UIs, icons, configuration | `/data/apps` | Private `workspace.tar.gz`; includes untracked/ignored files |
| Simulator/dashboard active installation, Abyss files | `/data/Downloads/abyssws` | Private `abyss-workspace.tar.gz` |
| Consistent simulator state/journal and rollback records | `~/.local/share/shuttle-simulator` | Online SQLite backup script, not raw live file copy |
| WMS/WES/ECS database contents and MySQL accounts | Running `mysql` container | Fresh logical SQL export |
| Redis data | Running `redis` container | Fresh online RDB export |
| DB/Redis configuration, private environment | `/data/1panel/apps/...`, `/data/apps/infrastructure.env` | Private config archive; no live DB directories |
| Runtime images | Source Docker daemon | `docker image save` |
| VS Code settings and optional conversation context | PSA home directories | Optional private editor archive |
| Access token, SSH keys | PSA home | Do not put in Git; generate a new simulator token and new target SSH key |

Do not rely on July SQL dumps, old ZIPs or an image archive merely because they
already exist. The database includes changes made through APIs: URLs, test map,
pallet/tasks, finite move limit and reservations. These are not restored by
cloning Python source.

### Permissions and privacy

All migration archives may contain passwords, business data, browser state or
private source. Keep them outside Git/web roots, owner-only, and transfer only
over approved SSH/local encrypted storage. Never upload the private package to
GitHub. Git commit contains this guide/template, not exported data.

## 2. On the source: prepare a private export folder

Run in the VM Linux terminal as PSA. Keep this terminal open: `$EXPORT` is used
throughout the source commands. Use a disk with sufficient free space, not the
small PSA home partition.

```bash
umask 077
EXPORT="/data/migration-$(date -u +%Y%m%dT%H%M%SZ)"
mkdir -m 700 "$EXPORT"
printf 'Export directory: %s\n' "$EXPORT"
df -h /data
sudo -v
sudo docker ps --format '{{.Names}} {{.Image}}'
```

If PSA cannot create the folder, an administrator must create it and assign PSA
ownership. If sudo/Docker fails, stop this procedure and obtain administrator
help. Do not change daemon permissions or disable security to bypass it.

The expected containers are `mysql`, `redis`, `ehox-ecs`, `ehox-wms`, `ehox-wes`
and the three `web-ehox-*-ui` containers. Confirm the actual names/versions:

```bash
sudo docker inspect mysql redis ehox-ecs ehox-wms ehox-wes \
  web-ehox-ecs-ui web-ehox-wms-ui web-ehox-wes-ui > "$EXPORT/container-inspect.json"
sudo docker network inspect ehox-net > "$EXPORT/network-inspect.json"
git -C /data/apps status --short > "$EXPORT/workspace-status.txt"
git -C /data/apps log -1 --format='%H %s' > "$EXPORT/source-commit.txt"
date -u --iso-8601=seconds > "$EXPORT/export-start-utc.txt"
```

`container-inspect.json` can contain secrets. It is private evidence, not a file
to share or commit. Check mounts there for any data outside paths in this guide;
include such extra volumes using the appropriate database/export procedure.

## 3. On the source: capture a recoverable point without stopping services

Prefer an operator-agreed quiet interval: do not submit new tasks, let current
test tasks finish, and record the pallet location and all three task statuses.
Services still run. Do not change database schemas/configuration or deploy files
during capture. If users keep making changes, the SQL/Redis/simulator snapshots
will represent different instants and need reconciliation before any task resumes.

### 3A. MySQL: online logical export

These commands use the existing container's `MYSQL_ROOT_PASSWORD` privately,
not a password typed into a command line. Verify it is present without printing:

```bash
sudo docker exec mysql sh -c \
  'test -n "$MYSQL_ROOT_PASSWORD" || { echo "Root password env unavailable; ask DBA for a private login file" >&2; exit 1; }'
```

If that fails, the DBA must use a private MySQL option/login file. Do not invent
credentials, print them, or put them in Git.

Inspect nontransactional **application** tables:

```bash
sudo docker exec mysql sh -c \
  'export MYSQL_PWD="$MYSQL_ROOT_PASSWORD"; exec mysql -uroot -N -B -e "SELECT TABLE_SCHEMA,TABLE_NAME,ENGINE FROM information_schema.TABLES WHERE TABLE_TYPE='\''BASE TABLE'\'' AND TABLE_SCHEMA NOT IN ('\''mysql'\'','\''sys'\'','\''information_schema'\'','\''performance_schema'\'') AND (ENGINE IS NULL OR ENGINE <> '\''InnoDB'\'');"' \
  > "$EXPORT/nontransactional-tables.tsv"
cat "$EXPORT/nontransactional-tables.tsv"
```

Expected: empty output. If non-InnoDB application tables appear, stop the export
plan and have the DBA arrange a consistent online backup; `--single-transaction`
cannot promise consistency for those tables. Do not stop services as a workaround.
DDL/account changes must not occur during this export.

```bash
if sudo docker exec mysql sh -c \
  'export MYSQL_PWD="$MYSQL_ROOT_PASSWORD"; exec mysqldump -uroot --all-databases --single-transaction --quick --routines --events --triggers --hex-blob --no-tablespaces --set-gtid-purged=OFF' \
  > "$EXPORT/mysql-all.sql.partial"; then
  test -s "$EXPORT/mysql-all.sql.partial" &&
    mv "$EXPORT/mysql-all.sql.partial" "$EXPORT/mysql-all.sql" &&
    gzip "$EXPORT/mysql-all.sql"
else
  echo "MySQL export failed. Do not use the partial file." >&2
fi
```

Check success and file size. Preserve the exact source MySQL version/image.
The all-database export includes the MySQL account/grant schema: restore only
into a fresh matching-version instance, then verify authentication and privileges.
Do not restore this into an existing database server or a different major version.
The July dumps are historical, not a substitute.

### 3B. Redis: online snapshot, no shutdown

Use `redis-cli --rdb` (a replication snapshot), not a tar copy of live Redis data
and not `SAVE`/`FLUSHALL`. A snapshot can briefly increase load/memory; ensure
capacity. An administrator must know the current Redis password privately.

In the same Bash terminal:

```bash
read -rsp 'Existing Redis password (not shown): ' REDIS_SECRET
printf '\n'
if printf '%s\n' "$REDIS_SECRET" | sudo docker exec -i redis sh -c \
  'IFS= read -r REDISCLI_AUTH; export REDISCLI_AUTH; exec redis-cli --rdb /tmp/psa-migration.rdb'; then
  sudo docker cp redis:/tmp/psa-migration.rdb "$EXPORT/redis.rdb"
  sudo chown PSA:PSA "$EXPORT/redis.rdb"
  chmod 600 "$EXPORT/redis.rdb"
else
  echo "Redis export failed. Do not continue without a verified snapshot." >&2
fi
unset REDIS_SECRET
```

Use the password from approved existing configuration; do not paste it into chat.
The path in the container is a temporary snapshot, not its active database.
`redis-cli --rdb` does not make this a cluster-wide atomically matched SQL snapshot.
Record export times and reconcile task/cache state on the new instance.

### 3C. Simulator: online SQLite backup

Run as PSA, not root:

```bash
python3 /home/PSA/Downloads/abyssws/shuttle-simulator/backup_simulator.py
```

It prints exact archive/checksum paths. Copy that newly generated pair into
`$EXPORT`, using the actual names:

```bash
cp /home/PSA/.local/share/shuttle-simulator/backups/shuttle-handoff-ACTUAL_TIMESTAMP.tar.gz "$EXPORT/"
cp /home/PSA/.local/share/shuttle-simulator/backups/shuttle-handoff-ACTUAL_TIMESTAMP.tar.gz.sha256 "$EXPORT/"
```

Replace `ACTUAL_TIMESTAMP`; do not copy the example literally. The script verifies
SQLite online backup, every file hash and archive members. No service is restarted.
If a task was in progress, the destination cannot safely auto-resume it. Stop and
reconcile task state before arming; startup clears simulator pending execution.

## 4. On the source: capture all workspace files and exact images

Do not edit source files while archiving. Logs are still changing and are excluded;
collect original logs separately if required as evidence, not recovery state.

```bash
tar --exclude='apps/ehox-ecs/logs' \
    --exclude='apps/ehox-wms/logs' \
    --exclude='apps/ehox-wes/logs' \
    -C /data -czf "$EXPORT/workspace.tar.gz" apps

tar --exclude='abyssws/log' --exclude='abyssws/shuttle-simulator/__pycache__' \
    -C /data/Downloads -czf "$EXPORT/abyss-workspace.tar.gz" abyssws

sudo tar -C /data -czf "$EXPORT/infrastructure-config.tar.gz" \
  1panel/apps/mysql/mysql/conf \
  1panel/apps/redis/redis/conf
sudo chown PSA:PSA "$EXPORT/infrastructure-config.tar.gz"
chmod 600 "$EXPORT/infrastructure-config.tar.gz"
```

`workspace.tar.gz` includes `.git`, all uncommitted UI edits/icons/JARs, env files,
Compose files, historical artifacts and the VS Code workspace definition. Git
alone did not include all of these edits. The Abyss archive includes private
management config; never publish it. Token/journal are outside these archives.

Check each tar command's exit status. If files changed during reading, repeat
during a no-edit interval; do not suppress warnings or accept partial output.
Do not archive MySQL's live `/var/lib/mysql` or Redis AOF/data files.

Save the images used by the eight containers, not just old available image ZIPs.
Run each line in this Bash terminal, and stop if any command fails:

```bash
mapfile -t IMAGE_IDS < <(sudo docker inspect \
  --format '{{.Image}}' mysql redis ehox-ecs ehox-wms ehox-wes \
  web-ehox-ecs-ui web-ehox-wms-ui web-ehox-wes-ui | sort -u)
test "${#IMAGE_IDS[@]}" -gt 0
sudo docker image save -o "$EXPORT/container-images.tar" "${IMAGE_IDS[@]}"
sudo chown PSA:PSA "$EXPORT/container-images.tar"
chmod 600 "$EXPORT/container-images.tar"
sudo docker image inspect "${IMAGE_IDS[@]}" > "$EXPORT/image-inspect.json"
```

Verify `docker inspect` succeeded before trusting the list; process substitution
does not automatically propagate its exit code. The inspect inventory in section 2
must contain all eight containers, and each distinct image there must be represented
in the saved image list. Do not continue with an incomplete image export.

Some ID-based exports have no usable repository tags. Metadata records the exact
image ID per source container. On the target, retag those exact loaded IDs to the
Compose template's image names after verifying ID/platform/version. Do not pull
an unknown replacement because a tag is absent.

### Optional: preserve VS Code conversations/settings as private working context

Git handoffs are the portable authoritative documentation. To also preserve
local session research/chat artifacts, first inspect paths and sizes. Copy only
paths that exist; do not assume this recreates account sign-in on another OS.

```bash
du -sh ~/.copilot/session-state ~/.config/Code/User ~/.config/Code/agentSessionData
tar -C "$HOME" -czf "$EXPORT/editor-context.tar.gz" \
  .copilot/session-state .config/Code/User .config/Code/agentSessionData
```

This can contain private chat, credentials and browser tokens. Transfer privately,
never Git. It is a best-effort context copy while VS Code runs, not a guaranteed
transactional editor-state backup. Review before importing; do not overwrite a
new editor profile wholesale. Do not transfer SSH private keys as part of it.
Redownload compatible editor extensions; preserve workspace settings intentionally.

Old `mysql-before-first-start` and `redis-before-first-start` directories under
`/data/1panel/apps` are historical recovery evidence, not current databases.
If you want those historical copies too, have the administrator archive those
two exact directories privately after confirming nothing writes to them.
Likewise, original application/service logs can be copied as historical evidence;
live logs can change during copying and are not transactional recovery snapshots.
Do not copy the live MySQL/Redis data directories to "include everything."

## 5. Source: checksums and secure transfer

Do not continue if any mandatory file is missing or failed:

```bash
ls -lh "$EXPORT"
gzip -t "$EXPORT/mysql-all.sql.gz" "$EXPORT/workspace.tar.gz" \
  "$EXPORT/abyss-workspace.tar.gz" "$EXPORT/infrastructure-config.tar.gz"
test -s "$EXPORT/redis.rdb"
test -s "$EXPORT/container-images.tar"
date -u --iso-8601=seconds > "$EXPORT/export-end-utc.txt"
(
  cd "$EXPORT"
  find . -maxdepth 1 -type f ! -name SHA256SUMS ! -name '*.partial' \
    -print0 | sort -z | xargs -0 sha256sum > SHA256SUMS
  sha256sum -c SHA256SUMS
)
```

Keep this source machine running. On the **new machine**, create a private
incoming folder and copy the exact export directory name over SSH:

```bash
mkdir -m 700 -p ~/migration-incoming
scp -r PSA@20.81.177.89:/data/migration-ACTUAL_TIMESTAMP ~/migration-incoming/
cd ~/migration-incoming/migration-ACTUAL_TIMESTAMP
sha256sum -c SHA256SUMS
```

Replace the directory name; reconfirm source public IP/host key. Password or
approved SSH key authentication can be used. Do not upload archives to GitHub.
Do not delete source originals after copying.

## 6. New machine only: prepare RHEL 10

Use a fresh **x86_64** target. If ARM, stop: saved x86_64 images cannot be assumed
to run. Practical starting capacity: 24 GiB RAM and disk space for image/workspace
archives, extracted DBs and growth. Confirm actual source requirements first.

```bash
cat /etc/redhat-release
uname -m
sudo dnf install git python3 tar gzip openssh-clients
```

Use an administrator-approved **Docker Engine with Compose v2** installation for
RHEL 10. Docker's [official RHEL install guide](https://docs.docker.com/engine/install/rhel/)
lists RHEL 10. On a fresh target, after confirming no conflicting container
runtime packages need a managed migration, its repository-based steps are:

```bash
sudo dnf install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/rhel/docker-ce.repo
sudo dnf install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
sudo docker version
sudo docker compose version
```

Verify the repository's GPG fingerprint against the official Docker page before
accepting the key. If the target uses a different DNF config-manager syntax,
follow the current official procedure for that target rather than guessing.
Do not remove an existing Podman/runtime installation on a used host without
administrator review. These install/start commands are **target only**.
Do not assume RHEL's `podman-docker` provides Docker Compose/runtime equivalence.
Podman migration is a separate tested adaptation, not covered by this recipe.
No guessed third-party installer or unverified `curl | sh` is required.

Create/retain user **PSA** with home `/home/PSA` so service paths match. If another
username is required, change unit paths, Python backup paths and docs consistently.
Recreate the account using the target administrator's approved procedure; do not
reuse source numeric UIDs blindly for unrelated files.

Keep SELinux enforcing and firewalld enabled. The template uses `:Z` labels on
specific dedicated bind mounts and binds all published ports to loopback.
Do not disable SELinux or expose backend/database ports to fix permissions.

Before any containers start, confirm `192.2.5.0/24` is not used by local LAN/VPN:

```bash
ip -4 route
sudo docker network ls
```

If it overlaps, choose a different bridge subnet and adjust Compose static IPs,
simulator bind/peer settings, and ECS test endpoint together. Stop and record
the revised addresses; do not run conflicting bridges.

## 7. New machine: clone instructions and restore private files

Clone to a separate reference directory first:

```bash
git clone --branch shuttle-simulator-handoff-20261008 \
  https://github.com/Princeamor/ECS.git ~/ecs-migration-reference
```

Authenticate privately if required; no old private key is needed to clone a public
repository. Set up a new target GitHub key separately if you need to push changes.

Use the verified incoming archive paths in the following commands. **Fresh target
only**: if `/data/apps`, installed simulator or database directories already have
work, stop and back them up before restoring. Do not overwrite an existing host.

```bash
sudo mkdir -p /data /data/Downloads /data/1panel
sudo tar -xzf workspace.tar.gz -C /data
sudo tar -xzf abyss-workspace.tar.gz -C /data/Downloads
sudo tar -xzf infrastructure-config.tar.gz -C /data
sudo chown -R PSA:PSA /data/apps /data/Downloads/abyssws
sudo chmod 600 /data/apps/infrastructure.env
sudo chmod 700 /data/Downloads/abyssws
```

Run from the incoming folder or use absolute paths. Inspect archive members
before extracting; accept only your trusted generated archives, never arbitrary
tar files. Source ownership differs from target: fix only these dedicated paths.

Recreate the home installation link without overwriting an existing path:

```bash
mkdir -p ~/Downloads
test ! -e ~/Downloads/abyssws && test ! -L ~/Downloads/abyssws &&
  ln -s /data/Downloads/abyssws ~/Downloads/abyssws
```

The full workspace archive is the current deployed/private copy; the Git
`shuttle-simulator/` directories are source snapshots, not an automatic deployment.
Use the latest migration template from `~/ecs-migration-reference/migration`,
since the private archive could predate a later guide commit.
Open `/data/apps/1panel.code-workspace` in VS Code to restore the two workspace roots.

## 8. New machine: load images, prepare empty database storage

```bash
sudo docker image load -i container-images.tar
sudo docker image ls --no-trunc
```

Compare private image/container inspect metadata to loaded IDs. Template expects:
`mysql:8.0.46`, `redis:7.4.10`,
`jnhub.joomladay.net/base/jre:21.0.11-jammy-dos`, and
`jnhub.joomladay.net/base/nginx:1.24.0`.
If tags are missing, `sudo docker tag EXACT_LOADED_IMAGE_ID EXPECTED_TAG`.
Only tag the verified corresponding image; the actual source runtime wins over
an assumed template version. Update local template if source image versions differ.

```bash
sudo mkdir -p /data/1panel/apps/mysql/mysql/data /data/1panel/apps/mysql/mysql/log
sudo mkdir -p /data/1panel/apps/redis/redis/data /data/1panel/apps/redis/redis/logs
```

MySQL data must be **empty** before initialization. Inspect `my.cnf` for host-only
paths, incompatible options and permission/log settings. Do not copy live source
MySQL files into it. Redis restore initially requires no old AOF files.

Copy `redis.rdb` into the new Redis data directory. In the target's copied
`redis.conf`, verify `dir /data` and `dbfilename dump.rdb` and set `appendonly no`
for initial RDB restoration. Preserve its authentication settings. If Redis ACL
files or other referenced configuration exist, transfer/review them separately.
An AOF may take precedence over the RDB; do not leave an unrelated AOF enabled.
After verifying the restored data, an administrator may re-enable AOF and verify
the background rewrite according to Redis procedures.

```bash
sudo cp redis.rdb /data/1panel/apps/redis/redis/data/dump.rdb
```

Set Redis data ownership to the UID/GID used by the **loaded Redis image**, not
PSA or an arbitrary guessed ID. Inspect with the exact image:

```bash
sudo docker run --rm --entrypoint id redis:7.4.10 redis
```

Use that reported UID/GID on its dedicated data/log directories. MySQL image
entrypoint normally prepares its dedicated data ownership; inspect errors if not.

Use the new template; do not launch original Compose files that publish services
on all interfaces or bind the source host's `/etc/hosts` into containers.
Docker DNS aliases provide `ehox-chitu-mysql`/`ehox-chitu-redis`.
Keep `/data/apps/infrastructure.env` private; its existing passwords must match
the cloned database/application config. `--env-file` is needed for Redis Compose
substitution; `env_file:` alone does not substitute `${REDIS_PASSWORD}`.

Set convenience paths in the target terminal:

```bash
COMPOSE="$HOME/ecs-migration-reference/migration/compose.rhel10.yml"
ENVFILE=/data/apps/infrastructure.env
sudo docker compose --env-file "$ENVFILE" -f "$COMPOSE" config --quiet
sudo docker compose --env-file "$ENVFILE" -f "$COMPOSE" up -d --pull never mysql redis
```

`config --quiet` avoids printing expanded passwords. Do not start Java services yet.
Do not enable MySQL event scheduler until restored scheduled events are reviewed.

## 9. New machine: import SQL and validate infrastructure

Wait until MySQL is ready; inspect privately:

```bash
sudo docker logs --tail 60 mysql
sudo docker exec mysql sh -c \
  'export MYSQL_PWD="$MYSQL_ROOT_PASSWORD"; exec mysqladmin -uroot ping'
```

Import into the **fresh matching-version** MySQL instance only. Bash pipeline
failure must be detected:

```bash
set -o pipefail
gzip -dc mysql-all.sql.gz | sudo docker exec -i mysql sh -c \
  'export MYSQL_PWD="$MYSQL_ROOT_PASSWORD"; exec mysql -uroot'
```

Stop if import reports any error. Verify restored accounts/grants as well as data;
refresh privilege tables if required by the source MySQL version's restore
procedure (`FLUSH PRIVILEGES` on the target only). Root password/account after
import may reflect the exported source accounts. Test authentication again,
and verify applications' database users/permissions.

```bash
sudo docker exec mysql sh -c \
  'export MYSQL_PWD="$MYSQL_ROOT_PASSWORD"; exec mysql -uroot -e "SHOW DATABASES;"'
```

Check JAR active profiles/database URLs privately. Use restored schema names,
not guessed new names. WMS/WES active profile is `prod-ehox`; ECS is `prod-ef013`.
Database URLs must use local Docker aliases, never source Azure endpoints.
Keep old remote host references from private metadata as evidence only.
The inspected active source profile uses `ehox_wms_auto_v1` for WMS/WES and
`ehox-ecs-v2` for ECS, both at `ehox-chitu-mysql:3306`. Confirm these two databases
and their map/task/pallet records were imported; do not use the similarly named
demo/dev schemas from other bundled profiles.

Check Redis `PING`, `DBSIZE` for each logical DB used by the applications, and
read selected expected keys using a private authenticated CLI. Do not print
passwords, copy login sessions into browsers, or flush all keys to "fix" routing.
Redis includes locks/scheduler/cache state from its own snapshot; consistency
with SQL must be reviewed, especially if captured during active work.

## 10. New machine: restore simulator state and start disarmed

Use the newly generated simulator archive. Verify its checksum, extract to a
private staging folder, and read manifest. Do not copy raw source SQLite/WAL.

```bash
mkdir -m 700 -p ~/simulator-restore-staging
tar -xzf shuttle-handoff-ACTUAL_TIMESTAMP.tar.gz -C ~/simulator-restore-staging
mkdir -m 700 -p ~/.local/share/shuttle-simulator
mkdir -p ~/.config/systemd/user
```

On this fresh target, copy `state/events.sqlite3` to
`~/.local/share/shuttle-simulator/events.sqlite3`; chmod 600. Copy the two user
units `shuttle-simulator.service` and `shuttle-local-web.service` from the staging
`systemd-user/` folder to `~/.config/systemd/user/`. Do not start the VPN Abyss
unit unless its VPN bind/management configuration has been separately reviewed.
Local web/dashboard does not need Abyss.

```bash
cp ~/simulator-restore-staging/state/events.sqlite3 \
  ~/.local/share/shuttle-simulator/events.sqlite3
chmod 600 ~/.local/share/shuttle-simulator/events.sqlite3
cp ~/simulator-restore-staging/systemd-user/shuttle-simulator.service \
  ~/simulator-restore-staging/systemd-user/shuttle-local-web.service \
  ~/.config/systemd/user/
python3 - <<'PY'
import sqlite3
from pathlib import Path
p = Path.home() / ".local/share/shuttle-simulator/events.sqlite3"
c = sqlite3.connect(p.as_uri() + "?mode=ro", uri=True)
result = c.execute("PRAGMA integrity_check").fetchone()[0]
c.close()
if result != "ok":
    raise SystemExit("Restored simulator SQLite integrity failed: " + result)
print("Restored SQLite integrity: ok")
PY
```

Check copied active Python/dashboard files agree with the manifest/source version.
The journal stores the enabled 24-node map and latest saved coordinates. A new
token will be created by service initialization; do not reuse old browser sessions.
Confirm `config.json` contains bridge host 192.2.5.1 and allowed ECS peer 192.2.5.7.
The template assigns ECS .7 explicitly so it does not depend on allocation order.

```bash
cd /home/PSA/Downloads/abyssws/shuttle-simulator
python3 -m unittest test_plc_logs test_simulator test_workflow test_backup_simulator
systemctl --user daemon-reload
systemctl --user enable --now shuttle-simulator.service shuttle-local-web.service
systemctl --user status shuttle-simulator.service shuttle-local-web.service --no-pager
```

RHEL 10's Python must pass these tests; source was Python 3.9.18 and the new
toolchain has not yet been tested. Fix any compatibility issue before arming.
Never silently ignore a failing test. Expected source suite: 56 tests.

Open `http://127.0.0.1:8080/shuttle-simulator/`, get the newly generated token in
your private terminal, connect and verify **DISARMED**, correct map/coordinates,
and restored history. `Run self-test` should pass 12/12 without touching warehouse
state. Optional browser decoder fixtures should pass 79 checks.

An administrator may approve `sudo loginctl enable-linger PSA` **on the target**
if boot/logout persistence is required. This was not enabled on the source.
The simulator requires the Docker bridge to exist at startup; after a host reboot,
verify/create the Compose network before starting the user simulator service.
The supplied units are not a full Docker/user-manager boot-order orchestrator.

## 11. New machine: start applications under isolation, then verify one move

Before starting Java services, disconnect the local machine from equipment VLANs
and block all routes to physical controller networks. Cloned DBs can contain
enabled real-device addresses; localhost web port binding alone does not prevent
outbound equipment commands. Review/disable other devices through approved means.
If this isolation cannot be demonstrated, **do not start ECS**.

```bash
sudo docker compose --env-file "$ENVFILE" -f "$COMPOSE" up -d --pull never \
  ehox-wms ehox-wes ehox-ecs web-ehox-wms-ui web-ehox-wes-ui web-ehox-ecs-ui
sudo docker compose --env-file "$ENVFILE" -f "$COMPOSE" ps
```

Read service logs for connection/profile/config errors. Use a fresh sign-in.
The restored ECS device66/A1-1 must point to 192.2.5.1:19080, not the original
172.30.30.131:80. Verify WES_URL/WMS_URL/ECS_URL and callbacks use Docker service
names. Verify PSA Show Room test map, TP001 current occupancy and finite limit100.
Never restore rollback JSONs automatically; those describe before-change settings.

| Check | Required result |
|---|---|
| Dashboard / API | Respond on local ports 8080/8765, authenticated |
| WMS UI | `http://127.0.0.1:8108/stock/view` |
| WES UI | `http://127.0.0.1:8109/stock/map` |
| ECS UI | `http://127.0.0.1:8050/X6/monitor` |
| Initial task/inventory review | No unmatched pending work from different snapshot instants |
| Arm | Explicit isolation confirmation, correct configured coordinates |
| ECS connection | Peer192.2.5.7 connects; ECS accepts status |
| One empty test relocation | Occupied source to available destination, pair1-3-2/2-3-2 |
| Completion | WMS5 / WES6 / ECS3, pallet location and simulator position agree |
| Repeated movement | Return then outward works without restart or forced completion |
| TCP export | Real RX/TX hex plus readable translation |
| PLC export | May legitimately have zero writes; conveyor/hoist are not simulated |

Observe A1-1 on second-floor ECS map. Its current-position reservation is expected;
the previous position clears on departure. Do not force-clear locks/tasks.
Test-map route is storage1-3-2 -> rail1-4-2 -> rail2-4-2 -> storage2-3-2.
ECS Java/JGraphT turning-aware A* computes the detailed route; WES dispatches work.

## 12. Preserve both copies, reconcile and record acceptance

Keep the source running and unchanged. No DNS/callback switch from source to
target is required for an independent local simulation. Do not allow the two
instances to share MySQL, Redis or equipment endpoints.

Record target hostname, versions, image IDs, imported export timestamps, test
results and local task IDs in a **private acceptance record**. Make a fresh
verified simulator backup on the target. Keep both private migration packages.
Do not delete source files/keys or run `docker compose down -v` as cleanup.

If you need changes made on the source after the snapshot, repeat exports during
a quiet interval and reconcile before importing into the target. Do not merge
live database files or copy source Redis locks over an active target.
Existing target data requires a separate restore plan, not these fresh-host steps.

## 13. What this migration does not claim to recreate

- Full RHEL OS, Azure networking, RustDesk setup, 1Panel management-server install,
  firewall policy or other users' home directories.
- Physical PLC programs, safety commissioning, conveyor/hoist simulation.
- Vendor-compiled Structured Text. The ST decoder is offline field decoding only.
- Future source changes, automatic replication or zero-downtime production cutover.
- Account tokens/passphrases. New target SSH credentials should be created locally.

The archives preserve this workspace's files, current database snapshot and
simulator work. Any extra volume/service discovered in private container metadata
must be included/reviewed before calling the migration complete.
