# PSA ECS / WES / WMS: overnight session record

**Recorded:** 2026-10-10, approximately 02:00 local Central time.  
**Computer:** current Linux computer, user PSA.  
**Workspace:** `/home/PSA/ecs-simulator-source`.  
**Repository:** Princeamor/ECS, branch `shuttle-simulator-handoff-20261008`.  
**Scope:** this overnight conversation, including restoration, physical shuttle
connectivity, UI repairs, map correction, task cancellations and backup setup.

This document records verified observations and operator-reported physical
conditions separately. It is not equipment commissioning approval. No passwords,
tokens or private environment values are reproduced.

## 1. Executive summary

- Restored the downloaded Ehox deployment and its databases from the original
  server image; the original image was mounted read-only.
- Recovered Docker ECS/WES/WMS access, corrected ECS addressing and repaired the
  WES task-delivery and ECS cancellation-callback URLs.
- Restored English overlays and fixed unreadable ECS table colors.
- Established network connectivity to the real shuttle PLC at
  `172.30.30.131:8080` through the Moxa wireless connection.
- Corrected the restored two-floor map to the physical single-floor PSA showroom.
  The real 3x4 layout, IDs, node types, tag counts and direction data were retained.
- The operator reported two physically successful moves. Neither recorded
  software completion; unfinished tasks were subsequently canceled normally.
- Later WMS relocation requests failed because ECS could not resolve TP001's
  starting pallet location. WMS and ECS pallet/inventory records are inconsistent.
- Identified ECS task type 3, Empty Shuttle Dispatch, as distinct from WMS pallet
  relocation. No movement task was submitted by the assistant.
- Created local saved-workspace/reopen support and a private dependency-backup
  script. **A real successful backup run has not been verified in this session.**

## 2. Addresses, ports and routes

### Current working application addresses

| Component | Current address/port | Notes |
|---|---|---|
| ECS UI | `http://192.2.5.20/` | Monitor: `/X6/monitor`; tasks: `/business/task` |
| ECS backend | `192.2.5.21:8060` | Docker name `ehox-ecs` |
| ECS WebSocket | backend port `8182` | UI proxy `/ws-api/` |
| WES UI | `http://192.2.5.5/` | Map: `/stock/map` |
| WES backend | Docker name `ehox-wes`, port `8092` | Application context `/api` |
| WMS UI | `http://192.2.5.4/` | Inventory: `/stock/view`; tasks: `/task/move` |
| WMS backend | Docker name `ehox-wms`, port `8082` | Application context `/api` |
| MySQL | Docker network `192.2.5.9:3306` | Alias `ehox-chitu-mysql` |
| Redis | Docker network `192.2.5.8:6379` | Alias `ehox-chitu-redis` |
| Shuttle PLC | `172.30.30.131:8080` | TCP connection and acknowledgments observed |

The actual WES/WMS backend IPs were not freshly verified after restoration.
Use Docker service names for integrations, not guessed fixed backend IPs.

Docker network: `ehox-net`, subnet `192.2.5.0/24`, gateway `192.2.5.1`,
bridge observed as `br-4fb588c5188c`. This is not an RFC1918 private subnet;
it was preserved rather than changed during recovery.

### ECS address and port-conflict repair

- ECS initially had no effective Docker network connection and could not resolve
  `ehox-chitu-mysql`.
- Host TCP port 8060 was occupied by Java PID 1968 in
  `Ignition-Gateway.service`, working directory `/usr/local/bin/ignition`.
- The operator explicitly stopped and disabled that Ignition service.
- An earlier ports-only override was superseded by
  `/home/PSA/ecs-address-override.yml`.
- The persistent override assigns ECS backend `.21` and ECS UI `.20`, and uses
  `ports: !reset []` for both. Thus those ECS services use Docker IP access rather
  than the base template's host-published ports.
- Only ECS/backend UI were selectively recreated; the entire network was not
  recreated.

Retain the override when administering ECS:

```bash
sudo docker compose -p apps --env-file /data/apps/infrastructure.env \
  -f /home/PSA/ecs-simulator-source/migration/compose.rhel10.yml \
  -f /home/PSA/ecs-address-override.yml ...
```

The base [Compose template](migration/compose.rhel10.yml) contains different
fixed UI addresses: ECS `.2`, WMS `.5`, WES `.6`, plus loopback publications
8050, 8108 and 8109. Those are **template values, not the current live UI
addresses above**. Do not apply the whole template blindly: its WMS/WES
addresses can conflict with the current deployment.

Base backend host publications are loopback 8060/8082/8092; MySQL/Redis use
loopback 3306/6379. The ECS override removes its publication. Other current
container publications should be verified with privileged Docker inspection.

### Application proxies

- ECS UI `/prod-api/` proxies to `ehox-ecs:8060`.
- ECS UI `/ws-api/` proxies to ECS WebSocket port 8182.
- WES and WMS UI `/api/` proxies reach their respective 8092/8082 backends.
- After restarting backends, WMS/WES UI proxies returned 502 and captcha images
  disappeared. The operator reloaded nginx:

```bash
sudo docker exec web-ehox-wms-ui nginx -s reload
sudo docker exec web-ehox-wes-ui nginx -s reload
```

Both captcha images then loaded and both applications were accessible.
An assistant navigation to WMS `/stock/map` caused a 404; the correct WMS
inventory route is `/stock/view`. WES still uses `/stock/map`.

## 3. Deployment and database restoration

- Temporary Python UI servers on 8050/8109/8108 initially loaded static login
  screens without working APIs/captcha; they were stopped.
- Existing Docker mounts referenced empty `/data/apps` and infrastructure
  directories, so services could not start.
- Located `/home/PSA/Downloads/PSA Server.raw` and its `.vhdx` counterpart.
- The operator mounted the raw image read-only:

```bash
sudo mount -t ext4 -o loop,ro,noload,offset=1128267776 \
  "/home/PSA/Downloads/PSA Server.raw" /mnt/psaserver
```

- The operator restored app JARs, UI files, private configuration, MySQL and Redis
  data from the image. The original image was not modified.
- Empty directories mistakenly created at file mount paths were removed with
  targeted `rmdir`, then replaced by actual configuration files.
- MySQL was recreated selectively after a timezone destination/mount problem.
  MySQL 8.0.46 became ready; Redis 7.4.10 restored 116 keys.
- Current runtime images include custom JRE 21 and nginx 1.24.0 images.
- Git does not contain the full runnable/private deployment. `/data/apps` and
  `/data/1panel/apps/...` are separate from the repository.
- Docker administration requires operator sudo; the assistant does not have
  passwordless privileged Docker access.

## 4. Host networking and Moxa/PLC connection

Observed installation:

- Router: `192.168.50.1`.
- Server eno1: `192.168.50.2/24`.
- Server eno2: `192.168.1.157/24`.
- Moxa wireless device: `192.168.50.3`, identified by the operator as 1161C.
- PLC: `172.30.30.131`, operator believed its mask was `/24`.
- Router identified as NETGEAR RAX41v2; an earlier suggestion to configure a
  separate secondary LAN subnet on it was corrected.

A temporary host route via `192.168.50.1` was tried, but the router did not route
to the PLC subnet. The operator instead added an address on eno1:

```bash
sudo ip addr add 172.30.30.130/24 dev eno1
sudo ip route del 172.30.30.131/32 via 192.168.50.1 dev eno1
```

Verified:

- Direct route through eno1 using source `172.30.30.130`.
- Host ping succeeded with 0% loss; PLC ARP MAC `04:83:08:d4:a8:67`.
- Ping from Redis's network namespace succeeded with 0% loss.
- Existing Docker MASQUERADE covered `192.2.5.0/24`; no additional NAT rule added.
- ECS connected to PLC TCP 8080 and received valid acknowledgments/telemetry.

**The additional eno1 IP is temporary and was not persisted in NetworkManager.**
It may disappear on reboot. Restoring a workspace does not restore that IP.
Exact Moxa firmware/bridge-clone settings were not conclusively documented.

## 5. Integration URL changes

### Persistently changed and verified

| Database/table | Record | Before | After |
|---|---|---|---|
| `ehox_wms_auto_v1.sys_param` | id 10, `ECS_URL` | `http://192.168.1.159:8060` | `http://ehox-ecs:8060` |
| `ehox-ecs-v2.sys_config` | id 138, `admin.api.wmsUrl.TaskRequest` | `http://192.168.1.159:8109` | `http://ehox-wes:8092` |

The first repair stopped WES sending tasks to the old machine address.
The callback repair fixed ECS status notifications to:
`http://ehox-wes:8092/api/wes/stockTask/ecsNotice`.

For task `MOV20261010000004-1`, the failed cancellation notification was found
in ECS logs and replayed once through the normal callback after WES restarted:

```json
{"outTaskCode":"MOV20261010000004-1","moveObj":"TP001","taskStatus":"5"}
```

The callback succeeded and WMS cancellation was verified. Later ECS
cancellations propagated normally without manual replay.

### Other recorded endpoints: not changed this session

- `sys_param` id 6 `WES_URL`: recorded old
  `http://192.168.1.159:8109/api`; intended Docker form
  `http://ehox-wes:8092/api`.
- `sys_param` id 9 `WMS_URL`: recorded old
  `http://192.168.1.159:8108/api`; intended Docker form
  `http://ehox-wms:8082/api`.

Their present values must be queried before any correction. Historical simulator
handoffs contain other URL repairs; do not assume those survived image restore.

## 6. UI and English overlay repairs

Tracked source edits were also applied to the corresponding deployed assets:

- [ECS dark-neon.css](web-ehox-ecs-ui/dist/static/custom/dark-neon.css):
  dark table/header/row/hover/fixed/empty/pagination surfaces restored legible
  text. White text on light surfaces had made the vehicle appear absent.
  Measured default contrast: headers 17.08:1, rows 18.42:1.
- [WES entrypoint](web-ehox-wes-ui/dist/index.html) and
  [WMS entrypoint](web-ehox-wms-ui/dist/index.html):
  restored `/static/custom/i18n-en.js?v=7` references.
  Dictionaries already matched the original image; the script references were
  missing. The dictionaries were not rewritten.
- Related records updated in [translation recovery](TRANSLATION_RECOVERY.md)
  and [ECS UI changelog](ECS_UI_CHANGELOG_2026-09-03.md).
- Backups of the deployed entrypoints were retained in session artifacts.
- Disabled vehicle Edit controls were not bypassed.

Validation: `git diff --check`, editor diagnostics for touched assets, live labels
and CSS contrast. No commits were made during this session.

## 7. Single-floor showroom map correction

The operator clarified that the showroom has **no second floor**, and confirmed
that the layout displayed under Floor 2 was the real physical layout.

Before:

- WMS warehouse 1 had placeholder floor-1 IDs 25-36 and real floor-2 IDs 37-48.
- Both floors overlapped in X1-3/Y1-4.
- ECS had matching placeholder and real nodes.
- Additional WMS records with warehouse ID 10 existed; they were not touched.

Migration was performed with WMS/WES/ECS stopped and equipment isolated:

- WMS warehouse 1 IDs 25-36 soft-deleted, not merged.
- Real storage IDs 37-48 retained; floor changed 2 -> 1.
- Storage code/name suffix changed to `-1`; roadway suffix changed where needed.
- Active WMS stock and stock-relation codes/floors updated using retained IDs.
- Placeholder ECS nodes 25-36 removed after backup.
- Real ECS IDs 37-48 retained; `z=1`, codes `C-X-Y-1`.
- Live ECS config id 102 `business.map.manage.control` set `max_z=1`.
- X/Y, node types/statuses, pallet data, movement direction flags and tag counts
  were verified unchanged.
- Historical tasks, stock logs, video records and other warehouses were not
  rewritten to make history look like floor 1.

Calibration handling:

- The first guarded migration failed and rolled back because A1-1 had floor-2
  distance entries.
- Audit showed conflicting floor-1/floor-2 distances and multiple car names.
  The ECS distance lookup can match orb-state/X/Y/Z without checking car name.
- The operator explicitly confirmed onsite verification of floor-2 calibration.
- The revised migration backed up the distance table, removed conflicting
  floor-1 entries within X1-3/Y1-4, and moved the 15 verified floor-2 entries in
  that grid to floor 1 without changing distance values or car names.
- Calibration outside the 3x4 grid was left untouched.
- This retained old calibration outside the live map; it is not a claim that all
  calibration in the database belongs to this showroom.

Verified commit output:
`COMMITTED: showroom is Floor 1; tag data preserved`.

Migration backup database: **`psa_floor1_backup_20261010`**, containing:
`ecs_callback`, `showroom_storage`, `showroom_stock`, `showroom_relations`,
`showroom_nodes`, `showroom_map_config`, `showroom_distances`.

After restart all three live maps showed only floor 1 and the 3x4 layout.
WMS also has a Warehouse Outside tab; that is not a second floor.
The corrected retained storage slots are:

| ID | Code | Function observed from ECS node type |
|---|---|---|
| 37 | `1-1-1` | B02 |
| 38 | `1-2-1` | B04 |
| 39 | `1-3-1` | B00 storage, original TP001 source |
| 40 | `1-4-1` | B01 rail |
| 41 | `2-1-1` | B05 disabled/non-route |
| 42 | `2-2-1` | B05 disabled/non-route |
| 43 | `2-3-1` | B00 storage, intended destination |
| 44 | `2-4-1` | B01 rail |
| 45 | `3-1-1` | B05 disabled/non-route |
| 46 | `3-2-1` | B05 disabled/non-route |
| 47 | `3-3-1` | B06 |
| 48 | `3-4-1` | B01 rail |

Do not change node types or calibration as a shortcut to fix pallet inventory.

## 8. Task attempts, successful physical reports and cancellation

Local host timezone: America/Chicago, **CDT UTC-5** on 2026-10-10.
Application timestamps were UTC+8, 13 hours ahead. The WES JDBC URL explicitly
used `serverTimezone=GMT%2B8`. No timezone correction was applied.

| Task suffix | Local creation | Local execution start | Outcome |
|---|---|---|---|
| `000004` | 00:27:10 | none | Delivered after URL repair; ECS failed with Trolley not found on floor 2; canceled |
| `000005` | 00:50:11 | **00:50:16** | Operator reported physical success at **00:54:47**; canceled 00:55:35 |
| `000006` | 00:56:21 | **00:56:25** | Operator reported physical success at **00:58:36**; canceled 00:59:00 |
| `000007` | 01:00:30 | 01:03:17 | Executing but no completion recorded; canceled 01:15:48 |
| `000008` | 01:16:13 | none | Starting position does not exist; revoked |
| `000009` | 01:19:08 | none | Pending/rejected; revoked |
| `000010` | 01:28:03 | none | Pending/rejected; revoked |
| `000011` | 01:42:42 | none | Waiting to be issued; revoked at about 02:04 via standard WMS revoke before the test-pallet registration (section 9A) |

Full task codes use prefix `MOV20261010`; e.g. `MOV20261010000005`.
The two operator-reported successes are physical reports, not database-completed
tasks. Their exact arrival times were not captured; report times above are the
times the operator told the assistant.

Latest older failed task `MOV20261010000003` and previous attempts were canceled
before the map migration. Historical September tasks were left untouched.

Cancellation methods:

- ECS Task List Cancel + confirmation for already dispatched tasks.
- Standard WMS `revokeMoveTask` for pending undispatched tasks.
- WMS rejected normal revoke of an already dispatched task, so ECS cancellation
  was used, not forced completion.
- WES terminal step status 8 was observed after ECS cancellation; parent WMS
  task status 7/move status 9, and `waitSendList=[]`.

No task-history deletion, forced completion, motion command, remote alarm reset
or position overwrite was performed by the assistant.

## 9. Current pallet-storage and position problems

### Confirmed software mismatch

WMS tasks and the migrated stock record identify TP001's source as storage
**39 / `1-3-1`**. Later authenticated ECS node queries showed:

- node 39 / `C-1-3-1`: `palletCode=""`.
- node 43 / `C-2-3-1`: `palletCode=""`.
- No TP001 registration returned in the 12-node map query.

WES relocation submission was observed as:

```json
{"endPos":"2-3-1","moveObj":"TP001",
 "outTaskCode":"MOV20261010000008-1","priority":0,"taskType":4}
```

It omitted explicit startPos. ECS returned code 500:
**`起始位置不存在` = Starting position does not exist**.
This proves ECS failed source resolution, not that a physical tag was absent.
A fictitious pallet registration must not be used merely to trigger motion.

Last WMS slot query:

- `1-3-1`: Pending Outbound, detail API `palletId=null`.
- `2-3-1`: Pending Inbound, detail API `palletId=null`.
- Task `MOV20261010000011`: waiting to be issued.

The detail API null field alone is not authoritative inventory evidence:
stock, active stock relations, pallet master and node registration must be
queried together.

### Physical reports changed during troubleshooting

The operator variously reported a pallet in source storage, then on the shuttle,
then removed/no physical pallet, and finally placed back in source storage.
**Latest explicit pallet confirmation:** TP001 physically in `1-3-1`, off the
shuttle, at approximately 01:48.

Latest explicit shuttle confirmation: physically `2-3-1` at approximately 01:48.
After refresh ECS still displayed `{1,3,1}`, Ready, battery 82%.
That mismatch remains unresolved. Do not overwrite ECS position to match a
statement without tracing controller telemetry.

### Equipment alarm and other errors

- At approximately 00:59, ECS showed
  **Lift Mechanical Misalignment: 5-4**, state Alarm.
- Subsequent observations showed Ready with blank Error Info; the assistant
  did not clear that alarm. It is not evidence of qualified physical safety.
- Task Error(0) is a scheduler/task display, not proof that all interlocks pass.
- Repeated protocol acknowledgments were logged at ERROR level, but corresponding
  info logs said command synchronization succeeded. Log severity alone does not
  turn those acknowledgments into a motion failure.
- WES scheduler logging throws a ServletRequestAttributes-null error because
  request logging assumes an HTTP request on a scheduled thread. It was not fixed
  and was not identified as the pallet-source cause.
- ECS monitor emitted JavaScript `Cannot read properties of undefined
  (reading 'imgUrl')` during some observations. It was not fixed; investigate
  separately when tracing whether the display is stale.

## 9A. Artificial test pallet registration (2026-10-10, about 02:05 local)

The operator confirmed there is **no physical pallet**, and asked for a software
test pallet so the shuttle's movement can be tested. Existing pallet **TP001**
was used as that artificial pallet; no duplicate pallet was created.
**This is software-only test data.** A real shuttle may run a pickup/lift cycle
with nothing on it. The operator was onsite and had declared the equipment safe.

What was found before the change:

- WMS: `1-3-1` (storage ID 39) already held TP001 through active stock and
  stock-relation records. They were migrated to floor 1 in section 7.
- ECS: node 39 / `C-1-3-1` had **`palletCode` empty**; no node held TP001.
  This is why ECS rejected relocations with "Starting position does not exist".
- Task `MOV20261010000011` was still waiting to be issued.

Changes made, in this order:

1. **Revoked `MOV20261010000011`** with the standard WMS revoke. It was revoked
   first so registering the pallet could not trigger an unexpected dispatch.
2. **Saved a backup** of ECS node 39 to the session artifact
   `ecs-node-39-before-test-pallet.json`.
3. **Registered TP001 on ECS node 39** by sending the node's full existing record
   with only `palletCode` changed from `""` to `"TP001"`, through the
   authenticated ECS node API (`PUT /prod-api/business/node`, the same call the
   ECS node editor makes). The API returned code 200.
   No SQL was used. Coordinates, node type, direction flags and counts were unchanged.

Verified afterwards:

- ECS node 39 / `C-1-3-1`, `x=1, y=3, z=1`, type `B00`: `palletCode=TP001`.
  TP001 appears on no other node.
- WMS slot `1-3-1`: Occupied. Slot `2-3-1`: Available.
- WMS, ECS and WES queues: no unfinished tasks.

Not changed: WMS stock/relation rows, pallet master data, calibration, the map,
the shuttle position, controller state.

**Shuttle offline at the time (about 02:03):**

- ECS log: `Failed to connect to server 172.30.30.131:8080 ... No route to host`.
- The ECS monitor listed no vehicles.
- The host could not ping the Moxa (`192.168.50.3`) or the PLC (`172.30.30.131`).
  The router (`192.168.50.1`) responded, and eno1 still had both
  `192.168.50.2/24` and `172.30.30.130/24`. The fault is on the Moxa, PLC or
  wireless side, not on the server.
- ECS retries every 5 seconds and should reconnect without a restart once the
  Moxa and PLC answer.
- No movement task was created, so nothing moved.

### Reset procedure for the next test session

Use this to return to the starting state for a TP001 relocation test.

1. **Confirm the shuttle is online.** From the host, `ping -c 3 172.30.30.131`
   should reply, and the ECS monitor should list A1-1 with a position and state.
   If not, check Moxa/PLC power and Wi-Fi first. Do not continue.
2. **Confirm the real shuttle position** onsite and compare it with the ECS
   monitor. Last time ECS showed `{1,3,1}` while the operator reported `2-3-1`.
   Resolve any mismatch with the manufacturer's local procedure. Do not overwrite
   the position or the calibration.
3. **Check there are no unfinished tasks.** WMS Relocation Task, ECS Task List
   (ECS `/business/task`) and the WES queue should all be empty. Cancel any
   leftover task through the normal UI first. Never force-complete.
4. **Check the pallet registration.** TP001 must be on exactly one ECS node,
   and WMS must agree:
   - Start state: TP001 at `1-3-1` (ECS node 39 `C-1-3-1`); `2-3-1` (node 43
     `C-2-3-1`) empty.
   - Return state, if TP001 was moved to `2-3-1`: ECS should hold TP001 on node
     43, with node 39 empty. Reverse it only if WMS shows the same.
5. **If ECS lost the registration** (the usual symptom is "Starting position
   does not exist"): cancel pending tasks, then set `palletCode` to `TP001` on
   the node matching the WMS slot, using the ECS node edit with the full existing
   record. Clear it on the node TP001 left, so it is on one node only. Save the
   node record first, and only do this with the shuttle idle.
6. **Start the test** in WMS: Inventory Management > Visual Inventory > select
   the occupied slot > Relocation > pick the empty target slot. Submit it once.
7. **Watch it end to end.** ECS should accept it (no "Trolley not found" and no
   "Starting position does not exist"), the shuttle should move, and the task
   should reach Complete in ECS, WES and WMS. If the shuttle moves but no
   completion is recorded (as happened tonight), cancel it normally and record it
   as a workflow failure. Do not force-complete.

**Still unknown:** why ECS cleared TP001 from node 39 after tonight's moves
without recording completion, and how WMS and ECS fall out of step.

## 10. Plan to resolve pallet storage correctly

This is pending work, not an applied reset.

1. **Freeze dispatch and establish one physical truth.**
   Keep equipment isolated and stop submitting new duplicate tasks. Confirm
   TP001 identity, physical source location, whether it is off the shuttle,
   actual shuttle location, and load sensor feedback. Record a timestamp.
   Last reports say pallet `1-3-1`, shuttle `2-3-1`; reverify before edits.
2. **Cancel the remaining pending task through the standard workflow.**
   Requery all active tasks. Last pending record was `MOV20261010000011`.
   Revoke it if still pending; if dispatched, follow the normal cancellation
   path while equipment is safely isolated. Preserve history, never force-complete.
   Confirm WMS tasks, WES steps and ECS tasks are terminal, with no waiting queue.
3. **Take and verify a private backup before inventory correction.**
   Run the backup described below. Require a COMPLETE marker and verify hashes.
   Retain the existing pre-map migration backups.
4. **Read all relevant records together.**
   Query WMS pallet master for TP001, stock, active stock relations, source and
   destination storage rows, active task items/steps, and ECS nodes.
   Include IDs, codes, floor, del_flag, version, quantities, frozen/reserved
   quantities, status, pallet identity and timestamps. Do not output credentials.
   The prior audit found multiple active source stock relations; determine
   whether they are valid or duplicate before any update.
5. **Resolve the shuttle telemetry mismatch independently.**
   Compare fresh PLC-reported coordinates, ECS backend car state, WebSocket
   messages and browser rendering. Check time/freshness and node existence.
   Use manufacturer-approved local correction if the controller coordinates
   are wrong. If backend is correct but browser stale, fix the UI/cache cause.
   Do not change map calibration or force stored coordinates.
6. **Identify the supported inventory-registration/removal workflow.**
   Inspect packaged controller/service mappings and UI behavior before use.
   Pallet Adjustment `/stock/resetPallet` transfers item quantities between
   pallets; it was not verified as storage-assignment clearing.
   Pallet Management `/base/container` Delete removes pallet master data and
   may reject stock-linked pallets; do not bypass its validation.
7. **Apply only the physically correct reconciliation.**
   If TP001 is confirmed in source storage, restore its source registration and
   valid stock relationship through the supported administrative workflow,
   with source occupied and destination available only if physically verified.
   If TP001 is absent, use audited inventory removal rather than invent occupancy.
   If on the shuttle, use the vendor's loaded-shuttle recovery workflow instead.
   Coordinate WMS and ECS changes; do not mark all locations empty.
8. **If no supported administrative API exists, escalate before SQL.**
   Obtain vendor/schema-specific guidance and explicit scope approval.
   Any SQL repair needs complete-row backups, dispatch stopped, a transaction,
   guarded IDs/versions, rollback on unexpected counts and consistency checks.
   Do not blanket-delete stock/task/history tables.
9. **Verify readiness without issuing motion.**
   Fresh reads must agree on pallet identity, source/destination occupancy,
   coordinates and task queues. Confirm no duplicated active relations or
   orphan references. Refresh all interfaces and verify the actual output.
10. **Operator conducts the appropriate test.**
    With a real stored pallet, use normal WMS relocation after reconciliation.
    For an empty shuttle, use the confirmed ECS empty-dispatch workflow instead.
    Capture task acceptance, controller progress, completion notification and
    WMS/ECS inventory updates. A physical arrival without software completion
    is an unresolved workflow failure, not a reason to force-complete.

## 11. Identified task types and workflow distinction

Authenticated ECS dictionary `chitu_task_type` returned:

| Value | Installed Chinese label | Meaning |
|---|---|---|
| 1 | 托盘入库 | Pallet inbound |
| 2 | 托盘出库 | Pallet outbound |
| 3 | 空车调度 | Empty Shuttle Dispatch |
| 4 | 同层移库 | Same-floor pallet relocation |
| 5 | 空车换层 | Empty shuttle floor change |
| 6 | 载货不放货调度 | Loaded dispatch without unloading |

ECS Task Management > Task List > Add exposes these types.
Compiled form logic explicitly asks for a vehicle identifier for type 3;
other task types use the pallet/tray placeholder.
Type 6 was identified by label only; its implementation/recovery suitability
was not verified. No task form was submitted.

WMS Visual Inventory relocation is a pallet-stock operation, not a confirmed
empty-travel test. No supported WMS/WES empty-dispatch integration was verified.

## 12. Local workspace and dependency backup setup

Created or updated:

- `/home/PSA/Desktop/PSA-ECS.code-workspace`.
- Existing `/home/PSA/Downloads/ecs-simulator-source.code-workspace`.
- [WORKSPACE_RECOVERY.md](WORKSPACE_RECOVERY.md).
- [backup_local_workspace.py](migration/backup_local_workspace.py).

Both workspaces reference this local repository. They request window restoration
and hot exit, and have:

- Browser-only automatic folder-open task (requires VS Code approval) opening
  ECS monitor, WES map and WMS inventory in the system browser.
- Explicit sudo private-backup task. It is not automatically run on Save Workspace.
- No automatic backend startup, motion command or alarm reset.

Backup command:

```bash
sudo python3 /home/PSA/ecs-simulator-source/migration/backup_local_workspace.py
```

Destination: `/home/PSA/ECS-private-backups/<UTC timestamp>-<unique suffix>/`.
Requires MySQL/Redis already running; never starts services.
Scope:

- Workspace/source including uncommitted edits and `.git`.
- Private `/data/apps` application files and configs, excluding active app logs.
- All MySQL databases through a logical dump with routines/events/triggers.
- Redis RDB snapshot.
- Exact local Docker images, image metadata and network/container metadata.
- MySQL/Redis conf, saved NetworkManager profiles and current IP snapshot.
- Local VS Code extensions/settings where present.
- Saved workspaces, ECS address override and this session's SQL artifacts.
- SHA-256 manifest `COMPLETE.json` only after all steps succeed.

Backup directories use mode 700 and files 600; artifacts contain credentials.
Do not publish or commit them. This is a dependency/application backup, not a
whole-computer image. Linux, Docker-engine and VS Code installers are not
included. Individual service snapshots are not atomic across all services.
Exact editor chat restoration is not guaranteed.

Validation performed with mocked subprocess calls: workspace JSON/folder
references, Python syntax, backup flow, image inclusion, manifest hashes and
private permissions. **No real backup COMPLETE output was provided by the
operator, so actual backup completion is unverified.**

## 13. Session files, changes and limitations

Session artifact directory:
`/home/PSA/.copilot/session-state/180f0f9a-8764-4e35-85e2-9b363700181d/files/`.

Artifacts include:

- `ecs-docker-only.yml` (superseded).
- `wes-index-before-translation.html`, `wms-index-before-translation.html`.
- `showroom-map-audit.sql`.
- `showroom-callback-repair.sql`.
- `showroom-distance-audit.sql`.
- `showroom-calibration-audit.sql`.
- `showroom-floor1-migration.sql` (successfully applied; **do not rerun**).
- `ecs-node-39-before-test-pallet.json` (ECS node 39 before TP001 was registered).

Existing handoff updated:
[SHUTTLE_SIMULATOR_HANDOFF.md](SHUTTLE_SIMULATOR_HANDOFF.md), with the physical
single-floor correction and warnings that older simulator snapshots are historical.

Before this new document, Git showed six modified tracked files plus the new
workspace-recovery document and backup script. All remain uncommitted.
No Git pull was performed; pulling Git would not recover private apps/database
changes. No broad directory deletion or original-image modification occurred.

Important logs:

- ECS: `/data/apps/ehox-ecs/logs/chitu_log/sys-info.log`,
  `sys-error.log`.
- WES: `/data/apps/ehox-wes/logs/ehox-admin/info.log`, `error.log`.
- WMS: `/data/apps/ehox-wms/logs/ehox-admin/info.log`, `error.log`.

Read large logs with bounded time/range filters. Application times are UTC+8
unless corrected later; subtract 13 hours for this night's local CDT timestamps.

## 14. Outstanding work checklist

- [x] Cancel task `MOV20261010000011` (done about 02:04; section 9A).
- [x] Register artificial test pallet TP001 on ECS node 39 / `C-1-3-1`, now
      consistent with WMS (section 9A). Retest once the shuttle is online.
- [ ] Bring the shuttle back online (Moxa `192.168.50.3` and PLC
      `172.30.30.131` unreachable at about 02:03).
- [ ] Resolve physical shuttle `2-3-1` versus reported `{1,3,1}` mismatch.
- [ ] Find why ECS clears the pallet registration after a move that never
      records completion.
- [ ] Capture a genuine successful workflow completion, not just physical movement.
- [ ] Run and verify the private dependency backup.
- [ ] Persist the additional eno1 address after a reviewed NetworkManager plan.
- [ ] Review remaining stale WES_URL/WMS_URL values with empty queues.
- [ ] Review timezone settings across JDBC/apps without rewriting history.
- [ ] Investigate scheduler logging null-request error and monitor imgUrl error
      separately, based on their impact.
- [ ] Decide whether to commit the source/documentation changes; no commit yet.

**Current values in this document are timestamped observations, not a live
readiness certificate. Requery before making operational changes.**
