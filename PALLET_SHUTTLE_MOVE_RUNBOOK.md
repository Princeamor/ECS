# Pallet Shuttle Move Runbook

For the consolidated current handoff, backup scope and recovery procedure, see
[SHUTTLE_SIMULATOR_HANDOFF.md](SHUTTLE_SIMULATOR_HANDOFF.md). Historical states
and earlier test counts below are retained as evidence, not live status.

**Prepared:** 2026-10-06 (UTC)  
**Scope:** Existing Ehox WMS/WES/ECS deployment on `psa-Virtual-Machine`  
**Status:** Isolated software relocation verified on 2026-10-08. No physical
equipment was controlled; physical commissioning remains unverified.

## Isolated software-test simulator (2026-10-08)

The operator confirmed that the test environment is isolated from physical
equipment and production inventory. A separate shuttle simulator is installed
alongside Abyss; this does not remove any physical commissioning requirements
below. The simulator itself does not edit warehouse databases or ECS endpoints.
With explicit operator approval, the isolated ECS test device `66` (`A1-1`)
was redirected to the simulator using the authenticated ECS device-management
API. Its original connection settings are recorded in
[ecs-device-66-before-simulation.json](../Downloads/abyssws/shuttle-simulator/ecs-device-66-before-simulation.json).

**Verified on 2026-10-08:** user services respond; 46 targeted protocol
and network tests pass; ECS connects from `192.2.5.7` and sends valid binary
heartbeats; ECS's `getCarInfo` API accepts simulated status for `A1-1` at
`(2,4,2)`, battery 90%, ready state `0`, and no error. The authenticated
dashboard displays the same state and a continuously advancing message
journal. A real WMS-to-WES-to-ECS same-floor relocation completed through
simulated shuttle feedback and the normal warehouse completion callbacks.

### Verified warehouse task workflow

The isolated test pallet `TP001` moved from `1-3-2` to `2-3-2`.
WMS task `7` / `MOV20261008000001` finished with status `5`; WES instruction
`37` / `MOV20261008000001-1` finished with status `6`; ECS task `383` /
`20261008091715A001` finished with status `3`. All three recorded completion
at server-local `2026-10-08 09:31:04`. Protocol batches `7000` and `7100`
executed; the shuttle finished at `(2,3,2)`, ready, pallet sensor empty.
No force-completion endpoint or direct warehouse SQL update was used.

A fresh return relocation also passed **without any manual retry or simulator
command rejection**: WMS task `8` / `MOV20261008000002`, WES instruction `38`
/ `MOV20261008000002-1`, ECS task `384` / `20261008094335A002`; all finished
at server-local `2026-10-08 09:43:47`. TP001 is now back at `1-3-2`, the
shuttle is ready at `(1,3,2)`, and `2-3-2` is available. WMS pallet move count
is 5 against the operator-approved test limit of 100.

Integration repairs, applied through authenticated management APIs with
operator approval, were:

- `WES_URL=http://ehox-wes:8092/api`
- `WMS_URL=http://ehox-wms:8082/api`
- `ECS_URL=http://ehox-ecs:8060`
- ECS `admin.api.wmsUrl.TaskRequest=http://ehox-wes:8092`
- Registered TP001 at ECS source node 15, aligned source/destination storage
  types to `B00`, and removed duplicate destination node 20 (retaining 19).
- Connected exactly the test route
  `C-1-3-2 <-> C-1-4-2 <-> C-2-4-2 <-> C-2-3-2`.
  The active graph builder's persisted direction flags use up/down for X
  and left/right for Y; the configured main-track direction remains X.
- Fixed 16-bit instruction ID handling and matching concurrent `0x40` path
  refinements. A refinement can update the active movement's speed opcode
  only when task, direction, and absolute target agree. Different paths
  remain explicit errors. Used normal ECS step retry after rejected batches,
  not forced completion.
- Raised `PALLET_CAN_MOVE_TIMES` from 4 to 100 with explicit operator approval
  for repeat isolated testing; the application still enforces the finite limit.

Original URL/limit settings and map nodes are backed up outside the web root:
[workflow-urls-before-simulation.json](../Downloads/abyssws/shuttle-simulator/workflow-urls-before-simulation.json)
and [ecs-test-map-before-workflow.json](../Downloads/abyssws/shuttle-simulator/ecs-test-map-before-workflow.json).
The historical verification record is
[workflow-verification.json](../Downloads/abyssws/shuttle-simulator/workflow-verification.json).
Do not restore map/stock settings while a warehouse task is running.

**Inventory display caveat:** WMS marks the original source available and
the destination occupied, and ECS removes the source pallet and registers it
at the destination. However, WMS `getStoragePalletList` also retains a stale
`palletId=1` on the now-available source. Do not interpret that visual-list
field alone as current occupancy or manually mark a task complete to hide it.
After the fresh return test, WMS correctly reports the occupied source
`39` / TP001 and available destination `43` / null pallet ID. The earlier
stale-field observation is retained here as a diagnostic caveat.

Use the dashboard's **Enter a WMS relocation** link, select **PSA Show Room**
and the second floor, then select the occupied pallet and an available
destination in the configured pair. Submit once and follow its `MOV...` code
in WMS tasks, WES instructions, and ECS tasks using the provided links.
The dashboard does not store warehouse credentials or submit warehouse tasks.

Authenticated `GET /api/workflow` exposes sanitized task request/reply and
ECS command/path observations from fixed WMS/WES/ECS log files, reading at
most 1 MiB per source. Missing files and malformed exchanges are reported.
The page polls every five seconds; observations collected while it is
connected are deduplicated and retained as `warehouse_exchange` events in
the persistent journal. These bounded excerpts are not a complete replacement
for the applications' original logs or a live database status feed.
Download the workflow JSON snapshot and full binary JSONL journal separately.
For shuttle TCP traffic alone, use **Download shuttle TCP log** in **Message
journal**. This JSONL export includes all retained incoming chunks/CRC-valid
frames, outgoing attempts/completed socket writes, heartbeats, connection events
and protocol errors at a fixed journal cursor, regardless of the task-focused
checkbox. Its first line describes coverage and directions: `rx_*` is ECS to
simulator; `tx_*` is simulator to ECS. Chunk/frame records and attempt/sent
records can describe the same bytes, not separate commands. A completed local
socket write does not prove remote acceptance. This is application TCP payload
logging, not a packet capture with TCP/IP headers or a conveyor/hoist PLC trace.

TCP exports additionally contain a read-only `translation` field for complete
received frames, rejected command frames and outgoing frames. This includes
message type, direction, task and shuttle numbers, 16-bit instruction IDs,
operation meaning, absolute movement targets and protocol speed group. Status
translations include position, battery, task progress and error fields.
Unknown types/operations are explicit; malformed headers, lengths and CRCs
are not guessed. Raw receive chunks may be partial/coalesced and are not
translated as individual commands. Original hex remains unchanged.

**Download offline Structured Text decoder** provides
`shuttle-offline-decoder.st`, an IEC 61131-3 example function block that takes
one complete byte-array frame and a direction flag and decodes its fields.
It checks frame length and CRC before decoding. `Valid` only describes the
decode result, not safe motion, remote acceptance or task completion. The
example has no sockets, actuator outputs, PLC writes or safety logic.
It is not recovered controller source. Vendor syntax/import adaptation and
compilation are required; no PLC-vendor compiler is available on this VM, so
the ST example is not vendor-compiled or qualified for equipment control.
The downloadable file includes exact heartbeat and X-movement test vectors.
The companion browser decoder regression fixtures are in
`../Downloads/abyssws/htdocs/shuttle-simulator/protocol-decoder-tests.js`.
The default task-focused journal view hides routine heartbeats/socket writes;
turn it off to inspect all traffic. Full exports always include every event.

The dashboard includes **Run self-test**, verified with **12/12 passing checks**.
It creates a separate shuttle and temporary localhost TCP listener, using a
temporary database and virtual clock. It checks initial status layout, CRC,
fragmented heartbeat acknowledgements, moving/completed task feedback,
deduplication, pause/resume, fault recovery, rejection of corrupt/unsupported
messages, and bidirectional logging. It never sends test commands to ECS or
changes the ECS-connected shuttle. The pass/fail report is stored as a
`self_test_result` event in the persistent journal and shown after reconnecting.
It is not proof of WMS/WES/ECS end-to-end task completion.

- Dashboard: `http://100.119.148.61/shuttle-simulator/`, served by Abyss over
  the existing VPN. The Abyss management console binds only to `127.0.0.1:9999`.
- Simulated equipment TCP endpoint, reachable from the current ECS container:
  `192.2.5.1:19080`. This is **binary TCP**, not an HTTP page or WebSocket.
  An additional localhost listener supports simulator-only tests.
- Dashboard API: `100.119.148.61:8765` and `127.0.0.1:8765`, requiring the
  token in `~/.local/share/shuttle-simulator/access-token`. Read this token in
  your own terminal; do not publish it, private credentials, or packet logs.
- Persistent simulator state and exchange journal:
  `~/.local/share/shuttle-simulator/events.sqlite3`, outside the web root.
  The dashboard downloads a complete journal snapshot as JSONL. Raw incoming
  chunks, validated frames, outgoing attempts/writes, UTC timestamps, peers,
  controls, transitions, and errors are recorded. Socket-write completion
  does not prove that ECS accepted a response.
- Implementation:
  [simulator.py](../Downloads/abyssws/shuttle-simulator/simulator.py);
  bindings/peer allowlist:
  [config.json](../Downloads/abyssws/shuttle-simulator/config.json).
  The current allowed peers are localhost and ECS container `192.2.5.7`;
  update the allowlist deliberately if Docker reallocates that address.

The simulator's framing is derived from the **active** ECS JAR's
`CarMessageClientDecoder`, `CarControllerServiceImpl`, `CarTaskCommandEnum`,
`LocationUtils`, and `CRCUtils`: `55 AA`, a one-byte length including itself,
binary payload, and big-endian CRC-16/CCITT-FALSE. Status `0x01` contains the
24-byte length/body expected by the ECS parser. Supported incoming messages
are heartbeat `0x33`, task/path commands `0x30`/`0x40`, position synchronization
`0x90`, and recovery/pause/resume/cancel/floor/alignment functions
`0x35`-`0x39` and `0x3C`. Acknowledgements echo the message type, transaction
number, and configured shuttle number with result byte zero. This result byte
is a simulator convention; the inspected acknowledgement handler parses it
but does not validate it.

Supported task instructions are pallet lift/lower/calibration, track changes,
and absolute grid-coordinate movement (`0x01`-`0x16`). Direction A/B changes
Y; C/D changes X. Every intermediate grid node must exist in the explicitly
configured test map. Instructions progress on a configurable timer and status
reports preserve packet task numbers and a one-byte completed-instruction
count. Full 16-bit instruction IDs are retained in the journal. Duplicate
protection applies to the current/latest accepted execution, including its
completion retries. Accepting a validated different task expires the previous
execution's fingerprints. ECS reuses protocol task numbers and identical
packets for repeated warehouse moves; session-wide caching incorrectly
suppressed a later round trip. Rejected tasks do not expire duplicate protection.

### Repeated moves and map lock indicators

On 2026-10-08 the duplicate-cache correction allowed the previously stuck
ECS task `387` / `20261008101225A005` / `MOV20261008000005-1` to complete
normally at server-local `10:21:03`, with the shuttle ready at `(2,3,2)`.
No warehouse completion status was forced.
The return task `MOV20261008000006` (ECS 388 / WES 42 / WMS 12)
then completed at `10:22:20`, followed by identical repeat
`MOV20261008000007` (ECS 389 / WES 43 / WMS 13) at `10:22:59`.
All three layers reported completed status; the identical outward protocol
batch was accepted again after the return batch, without restarting between
those moves. The shuttle is now ready at `(2,3,2)`.

The active ECS reservation mapper deliberately excludes the shuttle's current
position when releasing a completed step's destination reservation:
`node_code != carPos`. A lock under the parked shuttle can therefore remain
after completion as an occupancy reservation, not a stuck task. The reservation
at `C-1-3-2` for completed task A004 cleared when the shuttle moved to
`C-2-3-2`; only its current-location reservation remained. Do not manually
delete that reservation or reset every completed task. Check task completion,
ready status, and reservation ownership before diagnosing an orphan lock.

This is **not** a complete hardware emulator: map download `0xF0`-`0xF5`,
servo/radio responses, displacement instructions, charging, and device-clock
commands are not implemented. Unsupported/invalid commands are not
acknowledged as successful. They are logged; armed feedback enters a
synthetic fault. PLC-controlled conveyors/lifts, electrical signals, route
interlocks, and safety logic are not emulated. WMS/WES workflows requiring
those other devices can still block.

### Simulator-only setup and verification

1. Sign into the dashboard using the local token. Configure the numeric
   shuttle number to match the ECS test device `A1-N`; confirm the expected
   protocol mode byte. Enter its initial XYZ and the enabled nodes from the
   isolated ECS test map. Do not silently substitute the SQL seed for the
   live test map.
2. Back up the isolated ECS device's IP, port, enablement, and offline settings.
   Change only that test device to `192.2.5.1:19080` through the authorized
   ECS device-management interface. Do not impersonate the old IP with routes,
   NAT, or hosts-file edits.
3. Confirm isolation in the dashboard and arm simulated feedback. Verify a
   TCP session appears and the ECS UI reports the same shuttle/coordinates.
   A TCP connection alone is insufficient: check that ECS accepts status and
   updates its real-time state, rather than generating parser/CRC errors.
4. Use only test pallets/tasks. Compare WMS, WES, and ECS task identifiers,
   acknowledgements, simulated progression, and final locations. Export the
   journal. Test fault, pause/resume, disconnect, and restart cases as well.
5. Disarm and restore the backed-up ECS settings before ending the test or
   connecting real equipment. Never reconcile real stock from simulated status.

User services are `shuttle-simulator.service` and `abyss-shuttle-web.service`.
Use `systemctl --user status`, `restart`, or `stop` with those unit names.
Service startup always disarms feedback and does not resume unfinished work;
a disconnect during a task faults it. Recovery leaves unfinished work paused.
Units enabled for the user start at user-manager startup. For unattended boot
and persistence after logout, an administrator must approve/enable lingering
for user `PSA`; this is not enabled automatically.

### Remote access without Tailscale

The additional `shuttle-local-web.service` serves the dashboard on
`127.0.0.1:8080` only. It does not expose a new public web listener. The
simulator API also listens on localhost; its VPN API binding is optional
when that address is absent, with an explicit warning and journal event.
Restart the simulator after restoring the VPN if its API listener was skipped.
Restart always disarms simulation; re-arm deliberately while idle.

On the **remote computer**, use the existing working SSH public hostname/IP
and SSH credentials, replacing `YOUR_SSH_HOST` below:

```sh
ssh -N -o ExitOnForwardFailure=yes -o ServerAliveInterval=30 \
  -L 127.0.0.1:8080:127.0.0.1:8080 \
  -L 127.0.0.1:8765:127.0.0.1:8765 \
  -L 127.0.0.1:8108:127.0.0.1:8108 \
  -L 127.0.0.1:8109:127.0.0.1:8109 \
  -L 127.0.0.1:8050:127.0.0.1:8050 PSA@YOUR_SSH_HOST
```

Keep SSH running and browse to
`http://127.0.0.1:8080/shuttle-simulator/` on the remote computer.
Use API URL `http://127.0.0.1:8765` and the simulator token. The page rewrites
warehouse links to loopback when loaded on loopback, so those three forwarded
warehouse ports use the same encrypted tunnel. Their sign-ins remain separate.
Host SSH must already be reachable through the cloud/network firewall;
`172.16.0.4` is a private address, not a public SSH destination.
No public dashboard/API/equipment port forwarding was configured.
Verify SSH host keys and use the existing approved SSH key/authentication.

Through RustDesk, the browser running on the VM can use the same loopback
page/API URLs directly without an SSH tunnel.

Run targeted tests without contacting ECS or warehouse databases:

```sh
python3 -m unittest discover \
  -s /home/PSA/Downloads/abyssws/shuttle-simulator \
  -p 'test_*.py' -v
```

## Important safety gate

Do not try to move a physical pallet shuttle from this VM until the equipment owner
has confirmed the correct controller IP, protocol, route, PLC mode, map, and
interlocks. Confirm the aisle is clear, emergency stops and guarding work, and the
equipment is in the approved operating mode. Start with the site-approved
commissioning procedure and an empty test move; keep an operator at the local
emergency stop.

The current evidence shows that the ECS car client cannot reach its configured
remote endpoint. A task submitted before communications and map validation could
be rejected, left queued, or have an uncertain physical outcome. Do not retry a
timed-out move blindly.

## Which system to use

For the UI-based pallet relocation flow evidenced in the current WMS bundle, use
**WMS** to select the source pallet and destination storage location. The active
WMS visual-inventory code confirms the move and submits
`POST /api/wms/stockTask/palletMove` with the selected pallet, source storage
record, and destination storage record.

Use **WES** to inspect the resulting relocation work and its movement
instructions/statuses. Its UI includes a Move Command table backed by
`/api/wes/stockTaskStep/moveStepPage` and a status-update action. Do not use a
status/force action to represent a physical move unless the controller has
actually reported that state and the site procedure authorizes reconciliation.

**ECS** is the equipment-control service, not the operator's normal task-entry
screen. The inspected configuration selects the `plcServiceImpl` adapter under
the `prod-ef013` profile. ECS logs show an outbound `CarNettyTcpClient` trying
to contact a remote device. The available files do not prove that a WMS task
currently reaches that physical adapter end-to-end; validate this integration
with the vendor/site controls engineer before operating.

### Operator sequence (after all blockers below are cleared)

1. Open WMS at `http://<VM-address>:8108` and sign in with an authorized
   operator account.
2. Open **Inventory Management → Visual Inventory**. Confirm the selected
   warehouse, floor, pallet code, and source location match the physical system.
3. Use the on-screen pallet-move workflow: select the pallet/source, select its
   destination, review the confirmation, and submit once.
4. Record the WMS task/response identifier and verify the task appears in WMS.
   Do not resubmit on a timeout until the task state and physical state have
   been checked.
5. In WES at `http://<VM-address>:8109`, inspect **WES Task → Relocation Task /
   Move Command** (the exact menu captions may differ by account permissions).
   Confirm the task, instruction, source, destination, and reported status.
6. Confirm the shuttle's actual location/status from the approved equipment
   interface and local indicator before declaring completion.

If the intended use is a WES-created move rather than a WMS visual move, first
confirm that workflow with the integrator. A WES API endpoint for creating a
move task exists in the compiled UI, but the current WMS visual-inventory route
uses the WMS `palletMove` endpoint. Do not substitute one flow for the other
without confirming how this installation dispatches to ECS.

## Service routing and ports

The current host publishes these service ports. The port before the colon is
the VM/host port; the port after it is the container port.

| Purpose | VM URL / port | Container route |
|---|---|---|
| WMS operator UI | `http://<VM-address>:8108` | Nginx `80`; `/api/` proxies to `ehox-wms:8082` |
| WMS backend | `http://<VM-address>:8082` | WMS Spring service |
| WES operator UI | `http://<VM-address>:8109` | Nginx `80`; `/api/` proxies to `ehox-wes:8092` |
| WES backend | `http://<VM-address>:8092` | WES Spring service |
| ECS operator UI | `http://<VM-address>:8050` | Nginx `80`; API prefix `/prod-api` proxies to ECS `8060` |
| ECS backend | `http://<VM-address>:8060/` | ECS Spring service; the UI gateway strips `/prod-api/` before proxying |
| ECS WebSocket | `http://<VM-address>:8050/ws-api/` is the configured Nginx gateway path | Proxies to ECS `8182`; no listener was found on `8182` during this check |
| JVM debug port | `5005` published by Compose | Not a movement/control interface; restrict/disable for normal operation |

The WES UI's `/websocket/` route proxies to WES `8092/api/websocket/`. ECS
Nginx separately exposes `/ws-api/` through its UI port `8050` and proxies it to
ECS `8182`; the route exists in Nginx, but the ECS WebSocket listener was not
running during this check.

Inside the Compose network, services use Docker DNS names such as
`ehox-wms`, `ehox-wes`, and `ehox-ecs`; those names are not the IPs a physical
shuttle should use. Do not configure the shuttle with the UI ports `8050`,
`8108`, or `8109` unless its vendor protocol explicitly requires an HTTP user
interface (none of the inspected evidence indicates that).

### Current VM routing

At inspection time, the VM had `eth0 = 172.16.0.4/24`, a default gateway of
`172.16.0.1`, and no IPv4 address on `eth1`. There was no specific route shown
for the ECS log endpoint `172.30.30.131`; the kernel selected the default
gateway via `eth0`.

The Compose bridge is configured as `192.2.5.0/24` (host bridge address
`192.2.5.1`). This is not an RFC1918 private range. If the equipment/site LAN
uses `192.2.5.0/24`, Docker's connected route can capture that traffic; have the
network administrator check for overlap before connecting the equipment. Do not
change the bridge or add static routes without an approved network plan.

## Controller and shuttle network values

The ECS logs repeatedly identify the car-client remote endpoint as
`172.30.30.131:80` and report connection timeouts. This is the only controller-
like address confirmed by current evidence; its precise role and ownership
still need confirmation from the equipment integrator.

The VM's non-actuating TCP connection check to `172.30.30.131:80` timed out.
The ECS error log continued recording timeouts at approximately 15-second
intervals, with the latest observed entry at `07:33:55` on the VM's local
log clock on 2026-10-07. Historical ECS logs also contain timeouts to
`192.168.10.21:8080`; its role is unknown and it must not be assumed to be the
shuttle endpoint.

Before entering any equipment values, obtain and document from the integrator:

- Shuttle/controller IP, subnet mask, and default gateway.
- Which device initiates the connection and which protocol is used (the logs
  identify a TCP client to port 80, but do not establish the HTTP/API contract).
- Required source interface/VLAN, firewall ACLs, NAT behavior, and return route.
- Whether the controller must connect to ECS or ECS must connect to the
  controller; confirm any WebSocket host/port and path from the vendor.
- Required ECS-side device/controller registration values, credentials, and
  keepalive/heartbeat expectations. Do not place credentials in this runbook.
- Whether `192.168.10.21:8080` is still required and what component owns it.

Do not invent an equipment IP, repurpose the VM's eth1, or change a production
route by trial and error. The deployment owner must arrange a routable,
non-overlapping equipment network and confirm both forward and return paths.

## Map and command data

The WMS visual move operation supplies `palletId`, `startStorageId`, and
`endStorageId` (the map view uses a `storageId` field for the source). These are
database record IDs selected by the UI, not coordinates or values to guess and
type manually.

ECS also uses the `chitu_map_node` map, whose schema includes node code,
coordinates (`x`, `y`, `z`), node enabled/disabled state, travel-direction
flags, pallet code, simulation/normal module code, and chain-wait state.
Coordinates and direction flags must agree with the real shuttle aisles and
handoff points. Only the equipment integrator should validate or change this
map; do not enable nodes or alter direction flags to force a route.

The checked-in `chitu_map_nodeEF013.sql` is a **seed/export file**, not proof of
the current live database contents. It contains 24 rows: all 12 `z=1` rows have
`node_status=0` (disabled); on `z=2`, 8 are enabled and 4 disabled. If this seed
is the active map, a route on floor 1 is blocked and portions of floor 2 may
also be unavailable. Read the live ECS map through the approved UI/database
read-only process and compare it with the as-built layout before any test.

## Confirmed blockers and conditional risks

### Confirmed movement blockers

1. **ECS cannot reach its configured car endpoint.** Current ECS logs report
   repeated TCP timeouts to `172.30.30.131:80`. A host-side TCP check also
   timed out. This prevents relying on ECS to communicate with that endpoint.
2. **The VM has no verified route to the device network.** Its only IPv4
   interface is `172.16.0.4/24` on `eth0`; traffic to `172.30.30.131` is sent
   to default gateway `172.16.0.1`, with no successful connection. The site
   network owner must establish the correct route/VLAN/firewall path and
   validate return traffic before movement.

### Conditional blockers to resolve before operation

3. **ECS WebSocket backend is not listening.** ECS `application.yml` configures
   `0.0.0.0:8182`, and ECS Nginx has a `/ws-api/` proxy through port `8050`;
   however, the VM had no listener on `8182` and a local TCP connection was
   refused. If the shuttle/vendor protocol requires this WebSocket, it is
   unavailable as deployed. Confirm the protocol and have the deployment owner
   enable the listener only after confirming that the application actually
   starts it. Publishing `8182` directly is not necessarily required because
   the configured Nginx gateway already proxies to it.
4. **Live map state is unknown.** The seed file disables every `z=1` node and
   four `z=2` nodes. If those rows are loaded as-is, routes crossing disabled
   nodes will fail. Verify the live map, node directions, module mode, and
   shuttle coordinates.
5. **Potential Docker/equipment subnet overlap.** The Docker bridge is
   `192.2.5.0/24`; resolve any overlap with the site's equipment network before
   connecting it.
6. **Secondary endpoint not identified.** Historical ECS logs time out to
   `192.168.10.21:8080`. Confirm whether it is still used, and its intended
   function and network path.

These checks do **not** prove the PLC is in the correct mode, the safety
interlocks are clear, the shuttle is registered/online, or that the live map
matches the physical warehouse. Those need on-site confirmation.

## Safe pre-move verification checklist

Complete this checklist with the integrator/network owner; it is not an
instruction to issue a movement command:

- [ ] Equipment owner confirms the shuttle/controller IP, mask, gateway,
      protocol, and the expected ECS connection direction.
- [ ] Site network owner confirms VM NIC/VLAN assignment, ACLs, return path,
      and no overlap with Docker `192.2.5.0/24`.
- [ ] Non-actuating route/TCP reachability check succeeds from the ECS
      container's network namespace to the integrator-confirmed endpoint.
- [ ] ECS logs show the expected client/session connected, without repeated
      connection timeouts.
- [ ] If required by the vendor, the correct ECS WebSocket listener is running
      and reachable from the designated network; do not infer this from the
      configured `8182` value alone.
- [ ] The live ECS map is validated against the actual floor, lanes,
      directions, transfer stations, node enablement, and module mode.
- [ ] WMS pallet/location records match the physical pallet and location.
- [ ] Local operator verifies clear aisle, interlocks, guarding, E-stop, and
      approved manual/automatic mode.
- [ ] Integrator approves one controlled test move and a recovery/stop plan.
- [ ] After the test, WMS task, WES instruction, ECS/device report, and physical
      location all agree before another move is submitted.

Useful read-only diagnostics after the network owner approves the target:

```sh
ip -brief -4 addr
ip route get <integrator-confirmed-controller-ip>
```

Test only the approved TCP destination and port using a connection check; do not
send HTTP POSTs, WebSocket messages, raw socket payloads, or vendor commands as
a connectivity test. A successful TCP handshake only proves network
reachability, not that movement is safe or that a command will be interpreted
correctly.

## Downloading conveyor and hoist PLC write logs

Open `http://127.0.0.1:8080/shuttle-simulator/`, connect with the local simulator
token, and select **Download PLC write log** in the **Conveyor / hoist PLC writes
(read-only)** section. Reload the page after deployment if the section is missing.
The authenticated `GET /api/plc-writes` API also provides paginated records.

The active ECS `PlcReadWriteUtils.Write` methods already call
`recordWriteSnapshot` after single or batch driver writes. `EhoUtils.operateLog`
routes these to `ehox-ecs/logs/chitu_log/YYYY/MM/DD/plc_snapshot.log`, independently
of the shuttle command logs. The collector reads only these fixed dated files;
it does not connect to a PLC or change ECS equipment configuration.

Every five seconds while the simulator service runs, including when the browser
is closed, it reads up to 1 MiB per snapshot file for the last 30 UTC dates, also checking
the next dated directory because ECS log time can differ from host UTC, and
retains parsed writes in the existing SQLite journal. File path and
byte offset distinguish repeated identical writes. The JSONL download starts
with source/coverage metadata, followed by every retained PLC write at a fixed
snapshot cursor, not just the table's first 1,000 records. The full simulator
journal also includes these as `plc_write` events.

Records contain local timestamp, tag name, PLC address, logged value text,
driver success/failure and driver result message; capture timestamps are UTC.
The underlying ECS record does not include PLC identity or a conveyor/hoist
device code, so the collector does not invent equipment associations.
Driver success does not confirm physical movement. This is not raw packet
capture. Writes rejected before the driver call, entries dropped by ECS's
non-blocking asynchronous logger, and entries outside the bounded collection
window may be absent. Missing/unreadable sources, malformed records and source
truncation are explicitly displayed and included in the download.

At initial deployment there were no PLC snapshot files on this VM. An empty
download contains coverage metadata and means **no recorded PLC writes**, not
that PLC communication succeeded. No equipment commands are issued to create
sample records. Collection persists across simulator restarts; it runs only
while the user service is running.

## Evidence references

- `docker-compose.yml`: exposed host ports, containers, and Docker subnet.
- `configs/wms-web.conf`, `configs/wes-web.conf`, `configs/ecs-web.conf`:
  reverse-proxy routes.
- `ehox-ecs/startup.sh`: active profile `prod-ef013`.
- ECS JAR `application-prod-ef013.yml`: `plcServiceImpl` adapter selection.
- ECS JAR `application.yml`: configured WebSocket listener `0.0.0.0:8182`.
- `ehox-ecs/logs/chitu_log/sys-error*.log`: current repeated car-client TCP
  timeout to `172.30.30.131:80`.
- `chitu_map_nodeEF013.sql`: seed map only; not verified as live database state.
- Current WMS compiled visual-inventory module: posts the selected move through
  `/api/wms/stockTask/palletMove`.
- Current WES compiled Move Command module: lists WES move-step instructions
  and has a status-update control.
