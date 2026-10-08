# Ehox isolated shuttle simulator: handoff and recovery

Prepared 2026-10-08 UTC for PSA. This is an operational handoff, not physical
equipment commissioning approval. The companion historical
[move runbook](PALLET_SHUTTLE_MOVE_RUNBOOK.md) contains earlier investigations;
this handoff supersedes its old test counts and historical location statements.

## 1. Executive summary and boundaries

The warehouse software is Ehox WMS/WES/ECS, implemented in Java/Spring Boot,
not Ignition. A Python standard-library simulator implements the externally
visible binary TCP shuttle interface. An HTML/JavaScript dashboard provides
controls, diagnostics and authenticated log downloads.

The user explicitly approved an isolated deployment with no physical equipment
or production inventory connected. Simulated feedback can still advance
warehouse tasks and change test inventory. Never connect this simulator to a
production warehouse, force-complete tasks to hide errors, or use its offline
decoder to actuate equipment.

Completed capabilities:

- Real WMS -> WES -> ECS -> simulated shuttle -> normal completion callbacks.
- Same-floor empty pallet relocation, including outward/return/repeated moves.
- CRC-valid heartbeat, acknowledgement and status feedback.
- Persistent raw TCP journal, task observations, and downloaded readable decoding.
- Conveyor/hoist PLC write snapshot collection and download, if ECS creates logs.
- Offline Structured Text field decoder, not a controller or safety program.
- Localhost dashboard/API and remote encrypted SSH-tunnel access.

Not implemented/verified: real shuttle controller model or language, physical
motion/safety I/O, conveyor or hoist simulation, cross-floor workflows, full
warehouse disaster recovery, unattended boot, or vendor compilation of ST.

## 2. Snapshot at handoff

Read-only check at approximately 2026-10-08 04:17 UTC:

| Item | Observed |
|---|---|
| Simulator | Armed, state 0 (Ready), no pending commands |
| Reported shuttle | A1-1 at **X1/Y3/floor 2** |
| Protocol transaction/task | 7000; completed-instruction count 9 |
| ECS connection | Peer 192.2.5.7 connected |
| Journal cursor | Approximately 77363; continuously increasing |
| Retained conveyor/hoist PLC writes | 0; no readable current snapshot file |
| Simulator/local web/VPN Abyss services | Active and enabled |
| PSA user lingering | **No** |

This is not a current warehouse inventory query. Additional operator moves
occurred after earlier verification at X2/Y3/floor 2. Always inspect live WMS
occupancy, WES instruction and ECS task before choosing the next destination.
The backup manifest contains its own consistent journal cursor and saved state.

## 3. Host, software and locations

- Linux RHEL 9.4; PSA user; Python 3.9.18; Git 2.43.5.
- Current host referred to as PSA-Server-RedHat; Azure private IP 172.16.0.4.
- User-supplied Azure public SSH IP: 20.81.177.89. Reconfirm before remote access.
- Warehouse repository: `/data/apps`; `/data/1panel` is not its Git root.
- Simulator installation: `/home/PSA/Downloads/abyssws/shuttle-simulator`.
- Dashboard: `/home/PSA/Downloads/abyssws/htdocs/shuttle-simulator`.
- `/home/PSA/Downloads/abyssws` resolves to `/data/Downloads/abyssws`.
- Private state: `/home/PSA/.local/share/shuttle-simulator`.
- Units: `/home/PSA/.config/systemd/user`.
- No third-party Python dependencies are required.

Source inventory:

| File | Responsibility |
|---|---|
| `simulator.py` | Binary TCP, state engine, HTTP auth/control, journal |
| `workflow.py` | Bounded sanitized WMS/WES/ECS application-log parsing |
| `plc_logs.py` | Dated PLC write snapshot collection |
| `config.json` | Listener/peer/origin allowlists |
| `test_simulator.py`, `test_workflow.py`, `test_plc_logs.py` | 55 Python regression tests |
| `test_backup_simulator.py` | Backup/WAL recovery regression |
| `index.html`, `app.js`, `style.css` | Dashboard and export controls |
| `protocol-decoder.js` | Read-only binary-frame translation |
| `protocol-decoder-tests.js` | 79 browser decoder checks |
| `shuttle-offline-decoder.st` | Offline IEC 61131-3 example |
| `backup_simulator.py` | Verified source/config/journal backup |

## 4. Architecture, endpoints and pathfinding

```text
Browser -> WMS palletMove -> WES addTask -> ECS addTask
                                             |
                               map graph + turning-aware A*
                                             |
                                  binary TCP command frames
                                             |
                                      shuttle simulator
                                             |
                               ACK/status -> ECS -> WES -> WMS
```

WES organizes movement tasks and their start/destination. For the tested
relocation, detailed routing occurs in ECS's Java `chitu-brain` library:
JGraphT directed weighted graphs, `FindPathExecutor`,
`AStarShortestPathWithTurning`, and `DistanceHeuristic`. The graph comes from
map nodes, allowed directional connections, weights and path constraints.
Hex is a byte representation, not the pathfinding language or Structured Text.

| Hop | Endpoint |
|---|---|
| Browser -> WMS | POST `/api/wms/stockTask/palletMove` |
| WMS -> WES | POST `http://ehox-wes:8092/api/wes/stockTask/addTask` |
| WES -> ECS | POST `http://ehox-ecs:8060/api/taskApi/addTask` |
| ECS -> simulator | Binary TCP `192.2.5.1:19080` |
| ECS callback base | `http://ehox-wes:8092` |
| WES -> WMS completion | POST `http://ehox-wms:8082/api/wms/interface/taskFallback` |

| Browser service | Local URL |
|---|---|
| Simulator dashboard | `http://127.0.0.1:8080/shuttle-simulator/` |
| Simulator API | `http://127.0.0.1:8765` |
| WMS inventory | `http://127.0.0.1:8108/stock/view` |
| WMS tasks | `http://127.0.0.1:8108/task/move` |
| WES map | `http://127.0.0.1:8109/stock/map` |
| WES instructions | `http://127.0.0.1:8109/middle/moveCommand` |
| ECS monitor | `http://127.0.0.1:8050/X6/monitor` |
| ECS tasks | `http://127.0.0.1:8050/business/task` |

ECS frontend proxies its backend with `/prod-api`. Docker ECS peer is
192.2.5.7; bridge host is 192.2.5.1. These addresses must be revalidated on
a rebuilt host. TCP listeners are localhost and bridge only. API requires
Bearer authentication plus allowed Host/Origin checks. Former VPN IP
100.119.148.61 is optional for API binding; Tailscale is disabled. Restore
VPN then restart deliberately if that listener is required.

## 5. Browser access and authentication

On the VM through RustDesk, open the local URLs directly in Firefox or another
browser. No tunnel is needed. Sign into warehouse applications separately.
In a private terminal, obtain the simulator token:

```sh
cat ~/.local/share/shuttle-simulator/access-token
```

Paste only the resulting token into the dashboard; do not paste the command.
The token is kept in page memory, not browser storage. Never put it into this
handoff, Git, screenshots or shared logs. Reloading the page requires reconnecting.

On a separate Windows computer, keep this PowerShell command running:

```powershell
ssh -N -o ExitOnForwardFailure=yes -o ServerAliveInterval=30 -L 127.0.0.1:8080:127.0.0.1:8080 -L 127.0.0.1:8765:127.0.0.1:8765 -L 127.0.0.1:8108:127.0.0.1:8108 -L 127.0.0.1:8109:127.0.0.1:8109 -L 127.0.0.1:8050:127.0.0.1:8050 PSA@20.81.177.89
```

Verify the SSH host key using an approved source and use existing credentials.
172.16.0.4 is private, not the public remote SSH destination. Do not open
public dashboard/API/equipment ports. External tunnel connectivity depends on
the user's network and is not independently verified here.

## 6. Moving and observing the shuttle

1. Confirm continued isolation, services and ECS connection.
2. Connect dashboard. If disarmed after restart, confirm isolation and arm.
3. In WMS visual inventory select **PSA Show Room**, warehouse 1, second floor.
4. Inspect occupied TP001 location; use only the pair `1-3-2` <-> `2-3-2`.
5. Select occupied pallet, relocation action and available destination. Submit once.
6. Watch A1-1 in ECS monitor, second-floor tab `2层`.
7. Follow the new MOV task in WMS, WES and ECS. Check completion in every layer,
   inventory occupancy and reported final coordinates before submitting again.
8. Export workflow/TCP evidence if waiting or failing; do not blindly retry.

Allowed rail route:

```text
C-1-3-2 <-> C-1-4-2 <-> C-2-4-2 <-> C-2-3-2
```

There is no direct storage-to-storage edge just because coordinates are adjacent.
Simulator coordinate allowlist is X1..3/Y1..4/Z1..2 (24 coordinates), but this
is not permission to invent additional ECS paths.

The lock under the parked shuttle is intentional ECS occupancy protection.
Reservation release excludes its current node; the previous lock clears on
departure. Do not force-unlock a parked location or manually reset completed tasks.

## 7. Approved isolated configuration changes and rollback evidence

- Device 66/A1-1 original endpoint 172.30.30.131:80; test endpoint 192.2.5.1:19080.
- Fixed WES_URL, WMS_URL, ECS_URL and ECS completion callback.
- Registered TP001, removed duplicate node 20, retained destination node 19.
- Storage nodes 15 and 19 changed to B00. Main rail nodes 16 and 21 are B01.
- Test flags: node15 rightD=1; node16 down=1,leftD=1;
  node21 up=1,leftD=1; node19 rightD=1; other directions 0.
- Active graph mapping uses up/down for X and left/right for Y despite the
  configured main-track direction X. Do not "correct" this without tracing the code.
- WMS source storage 39 and destination storage 43; pallet TP001/id1.
- User-approved finite relocation limit increased from 4 to 100.
- No direct warehouse SQL writes or forced task completions were used.

Rollback records are in the simulator directory and included in the backup:
`ecs-device-66-before-simulation.json`, `workflow-urls-before-simulation.json`,
`ecs-test-map-before-workflow.json`. These are before-change records, not full
warehouse backups. Restore only through approved management interfaces, while
idle, after reconciling current tasks/inventory. The removed node is not recreated
by restoring source files.

Historical verification: MOV20261008000001/00002 and 00005/00006/00007 completed
end-to-end; latest documented A007 was ECS389/WES43/WMS13, statuses 3/6/5.
`workflow-verification.json` retains nested older observations; its historical
fields must not be treated as a live database status.

## 8. Protocol and simulator behavior

- Frame magic 55 AA; length byte includes itself; total size is length + 4.
- Maximum length byte 120; big-endian CRC16/CCITT-FALSE, init FFFF, polynomial 1021.
- ECS command prefix: type, uint16 transaction/task, shuttle byte.
- 30: instruction batch; 40: one path instruction. Each has uint16 ID/op/content.
- Instruction IDs must be nonzero and unique within a batch.
- 33 heartbeat parameter 10; replies echo task/shuttle with result byte 0.
- 01 status reports XYZ, SOC, mode, state, alignment, task, completed count,
  sensors and errors. Completed count is NOT the full instruction ID.
- 35 recover; 36 pause; 37 resume; 38 cancel; 39 floor; 3C alignment; 90 XYZ sync.
- Ops 1 lift; 2 lower; 3/4 track; 5 calibration+lift; 6 calibration.
- Ops 07..16: four speed groups, each ordered +Y,-Y,+X,-X; content is absolute target.
  No physical velocity is established for these speed groups.
- Matching in-flight path refinements can change movement speed opcode only;
  task/direction/target must agree and shuttle must not be paused/faulted.
- Unsupported servo/radio/map/charging/time functions are rejected, not simulated.
- Startup always disarms and clears pending execution. No unfinished auto-resume.
- Disconnect during work faults; recovery leaves unfinished work paused until resume.
- Duplicate protection covers current/latest execution and retries, then clears
  only after a different valid task is accepted. This fixes repeat round trips.
  Immediately identical new-task bytes cannot be distinguished from a retry.

Exact examples:

```text
55AA06330000010A7903          heartbeat, transaction 0, shuttle 1
55AA09401B58011B581502B4DD    task 7000, ID7000, op15, move +X to X2
```

## 9. Logs and downloads

| Download | Meaning |
|---|---|
| Workflow snapshot | Retained bounded sanitized application exchanges, not live DB state |
| Shuttle TCP log | All retained TCP events, with complete-frame translations and original hex |
| Full JSONL journal | All event kinds, including task/control/errors/PLC observations |
| PLC write log | ECS register/tag write snapshots plus explicit source/coverage metadata |
| Offline ST decoder | Field decoder example; no network or actuator outputs |

`rx_*` means ECS -> simulator; `tx_*` means simulator -> ECS.
`rx_chunk` can be partial or coalesced. `rx_frame` is a validated full frame.
`tx_attempt`/`tx_sent` can describe the same outgoing bytes. A completed socket
write is not proof of ECS acceptance; ACK is not proof of task completion.
Task-focused checkbox affects only the table, not full exports. Table is bounded;
downloads page through a fixed journal cursor.

Original sources:

- WMS `/data/apps/ehox-wms/logs/ehox-admin/info.log`.
- WES `/data/apps/ehox-wes/logs/ehox-admin/info.log`.
- ECS `/data/apps/ehox-ecs/logs/chitu_log/sys-info.log`.
- PLC `/data/apps/ehox-ecs/logs/chitu_log/YYYY/MM/DD/plc_snapshot.log`.
- Private simulator `events.sqlite3` and `service.log` in its data directory.

Workflow tails are up to 1 MiB/source and collected through dashboard/API polling.
PLC collector runs every five seconds while the service runs, even when browser
is closed; reads up to 1 MiB/file for 30 UTC dates plus the next dated directory
to cover ECS timezone differences. Parsed writes persist, deduplicated by
source/offset/content. Driver success is not proof of physical movement.
ECS logs may omit pre-driver rejections or asynchronously dropped records.
No conveyor/hoist PLC records exist at handoff, and that is not a download failure.
Shuttle commands use a different binary interface and do not appear in that log.

Structured Text is a PLC language; hex is just byte notation. The offline ST
decoder is not recovered vendor source and is not vendor-compiled. Adapt and
test it with the intended vendor toolchain without actuator connections.

## 10. Service management and verification

```sh
systemctl --user status shuttle-simulator.service shuttle-local-web.service --no-pager
systemctl --user is-enabled shuttle-simulator.service shuttle-local-web.service
journalctl --user -u shuttle-simulator.service -n 50 --no-pager
```

Simulator output is also appended to private `service.log`.
Only restart while idle and after assessing warehouse tasks:

```sh
systemctl --user restart shuttle-simulator.service
```

Restart disarms. Reconnect dashboard, confirm settings/isolation, arm explicitly,
and wait for ECS to reconnect. Do not "fix" missing TCP connection by changing real
equipment routes. VPN Abyss uses relative `-c abyss.conf` from its installation;
the local web service does not require Abyss.

All units are enabled; PSA lingering is **not enabled**, so boot/logout survival
is not guaranteed. An administrator may approve lingering separately; this
handoff does not enable it or claim unattended recovery.

Regression command, isolated from warehouse writes:

```sh
cd /home/PSA/Downloads/abyssws/shuttle-simulator
python3 -m unittest test_plc_logs test_simulator test_workflow test_backup_simulator
```

Verified at handoff: **56/56 Python tests passed**, including the backup/WAL
recovery regression. Dashboard isolated
self-test: **12/12**, using temporary state/listener, not the connected shuttle.
Browser decoder: **79 checks passed**. In a disposable browser test page loading
the dashboard, load `protocol-decoder-tests.js` and call
`runProtocolDecoderTests()`; do not paste untrusted console code or tokens.
Real logged heartbeat/status were decoded, and multi-page TCP/PLC export shapes
were verified using offline browser fixtures. ST has no vendor compiler validation.

## 11. Backup creation, contents and limitations

Run as PSA:

```sh
python3 /home/PSA/Downloads/abyssws/shuttle-simulator/backup_simulator.py
```

Backups go to the private directory:
`/home/PSA/.local/share/shuttle-simulator/backups`.
Output names are timestamped `shuttle-handoff-<UTC timestamp>.tar.gz` and
matching `.tar.gz.sha256`. The script does not stop the simulator or send commands.
It uses SQLite online backup, so the journal includes committed WAL data consistently.
It checks SQLite integrity, then re-reads every archive member against SHA256/size.

Archive layout:

```text
documents/SHUTTLE_SIMULATOR_HANDOFF.md
documents/PALLET_SHUTTLE_MOVE_RUNBOOK.md
shuttle-simulator/                 Python, config, tests, rollback JSONs, backup script
htdocs/shuttle-simulator/          dashboard, JS decoder/tests, ST example
systemd-user/                     the three user units
state/events.sqlite3              consistent journal + saved simulator configuration
manifest.json                    file hashes, scope, exclusions, state, journal counts
```

Excluded deliberately: access token, SSH keys/passwords, warehouse credentials,
warehouse MySQL/Redis databases, application JARs/images, original application
logs, Abyss binary/config (may contain management credentials), OS/cloud config
and simulator service.log. This is a simulator recovery backup, **not a complete
VM/warehouse backup**. Matching WMS/WES/ECS database backups and image/config
recovery must be arranged separately by the authorized administrator.

Archive contains operational data and rollback records: keep it private.
The backup on this VM is vulnerable to VM/disk loss; copy archive and checksum
to an approved secure off-host destination. No off-host copy was performed.
No automatic backup schedule or deletion/retention job was configured.

Verify after transferring, from the directory holding both files:

```sh
sha256sum -c shuttle-handoff-<timestamp>.tar.gz.sha256
tar -tzf shuttle-handoff-<timestamp>.tar.gz
```

Use the exact generated filename rather than the placeholder.

## 12. Recovery procedure

1. Obtain administrator/operator approval and confirm an isolated host/network.
   Reconcile warehouse tasks and inventory with any separate database recovery.
   Restoring journal history cannot restore warehouse inventory.
2. Verify checksum and inspect archive membership. Extract only a trusted archive
   to a new private staging directory, not directly over a live installation.
   All generated archive members are relative regular files.
3. Read manifest; verify individual member hashes. Run SQLite integrity check.
4. Stop simulator/local web services only while idle. Preserve existing files and
   any current database before replacing anything; do not delete unbacked-up state.
5. Restore `shuttle-simulator` and `htdocs/shuttle-simulator` into the documented
   installation; restore units into PSA's user unit directory. On a new host,
   adjust absolute paths and revalidate bridge/peer/origin allowlists first.
6. Restore `state/events.sqlite3` to the private data directory only with service
   stopped. An existing `-wal`/`-shm` must not be mixed with the restored database;
   preserve/move the entire old state set elsewhere after all connections close.
7. Retain the existing private token, or on a rebuilt host let service initialization
   create a new token. Tokens were not included in the archive. Ensure PSA ownership,
   private directory permissions and database/token access.
8. Run Python regressions from restored source. Reload user units:
   `systemctl --user daemon-reload`. Enable/start simulator and local web as approved.
   Restore Abyss separately only if needed; its binary/config were excluded.
9. Check state **disarmed**, restored coordinates/allowlist and no automatic task
   resume. Check API/dashboard response and journal persistence. Sign in normally.
10. Inspect the isolated ECS device endpoint and warehouse integration settings
    through authorized interfaces. Do not blindly replay rollback JSONs.
11. Confirm isolation and explicitly arm only when idle and reconciled. Verify
    ECS TCP connection and accepted status; perform one approved empty test move,
    then verify all three warehouse layers before resuming testing.

## 13. Troubleshooting and remaining risks

| Symptom | Check/action |
|---|---|
| Dashboard NOT CONNECTED | Enter token and connect; API port/tunnel 8765 must be reachable |
| Old/missing controls | Reload page (Ctrl+F5) and reconnect |
| No ECS TCP session | Disarmed startup, peer IP, bridge listener, authorized device endpoint |
| Current node shows lock | Expected parked occupancy; verify task and departure, do not force-unlock |
| Repeated move stalls | Check latest source installed; prior whole-session dedup bug is fixed |
| Ready simulator but warehouse task waiting | Correlate task IDs, callbacks and inventory; no forced completion |
| PLC download total 0 | No PLC snapshots recorded; shuttle TCP has its own download |
| CRC/layout decoding error | Preserve hex; inspect direction/frame boundaries/version, do not guess |
| ERROR heartbeat log | ECS logs some valid ACKs at ERROR; inspect actual parser/state, not level alone |
| WMS stale palletId on available source | Compare occupancy/task/pallet records; do not rely on one UI field |
| Cannot reach former VPN URL | Use loopback/RustDesk or approved SSH tunnel; Tailscale disabled |
| Service stops on logout/reboot | PSA lingering disabled; administrator decision required |

Git identity was configured as Princeamor; repository remote is
`https://github.com/Princeamor/ECS.git`. SSH GitHub authentication was not
verified. This deployment has unrelated existing changes; do not bulk revert,
commit credentials or claim all changes are committed. No commit is made by this
handoff creation step. The archive and checksum are the recovery artifacts.

### Git source snapshot

The Git save requested after handoff copies simulator sources/config/test rollback
records into `shuttle-simulator/`, dashboard files into `shuttle-dashboard/`, and
the three unit files into `shuttle-services/` in the warehouse repository.
These are source snapshots, not the active installation paths; updates there
do not automatically deploy. Live state, tokens, private backup archives,
credentials and unrelated warehouse application changes are excluded.
See [source snapshot instructions](SHUTTLE_SOURCE_README.md) for deployment paths.

Future work requires explicit scope: conveyor/hoist simulation, vendor ST compile,
physical commissioning, warehouse database backup, off-host backup storage,
retention scheduling and unattended-service persistence.
