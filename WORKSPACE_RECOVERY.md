# Reopening the PSA workspace

Open `/home/PSA/Desktop/PSA-ECS.code-workspace` in VS Code. The previously saved
`/home/PSA/Downloads/ecs-simulator-source.code-workspace` also has the same tasks.
Both reference the existing local project; neither downloads or replaces it.

**Save Workspace is not a database backup or a complete running-session save.**
Source edits are saved with Save All. Database edits are stored in MySQL, outside
Git. Backend files and private configuration are under `/data/apps`.

## Reopen pages

Allow VS Code's automatic task prompt for **ECS: Open three web pages** to open
the pages when the workspace opens. If automatic tasks are disabled, use
**Terminal > Run Task > ECS: Open three web pages**. This opens the system
browser, not guaranteed restored VS Code integrated-browser tabs:

- [ECS monitor](http://192.2.5.20/X6/monitor)
- [WES map](http://192.2.5.5/stock/map)
- [WMS inventory](http://192.2.5.4/stock/view)

Logins may expire. WMS uses `/stock/view`, not WES's `/stock/map`.
Opening the workspace does not start containers, reset alarms or issue tasks.
Window restoration settings are hints; extension chat and browser restoration
depend on the installed VS Code/extension versions.

## Save a private recovery backup

With equipment isolated and no warehouse edits in progress, run **Terminal >
Run Task > ECS: Save private deployment backup**, or:

```bash
sudo python3 /home/PSA/ecs-simulator-source/migration/backup_local_workspace.py
```

The command does not start services. MySQL and Redis must already be running.
It writes a private directory under `/home/PSA/ECS-private-backups` containing:

- All MySQL databases, including the corrected map and migration backup tables.
- A Redis RDB snapshot.
- Deployment files, container metadata, source and uncommitted changes.
- The exact installed Docker runtime images, including their local image tags;
  Java, nginx, MySQL and Redis runtimes do not need to be downloaded again.
- MySQL/Redis configuration, Docker network metadata, saved NetworkManager
  profiles and a snapshot of the current IP addresses.
- Installed local VS Code extensions and editor settings, where present.
- Saved workspace files, the ECS address override and this session's SQL artifacts.
- A `COMPLETE.json` marker with SHA-256 hashes, only after successful completion.

These files contain credentials and private deployment data. Never upload them
to GitHub or serve them through a web root. Snapshots are per-service, not atomic
across the entire system. Actively written application logs are excluded.
This is not a bootable VM/image backup; the host OS, Docker engine and VS Code
installers, and complete chat history are not captured. Captured network
profiles do not make temporary IP aliases persistent. Saved extensions may
depend on VS Code's installed version. Docker images can be loaded offline
with `docker image load -i docker-images.tar` during an approved recovery.
Recovery must be performed offline with explicit operator approval; do not
blindly extract over a running installation.

## Conversation and current operational state

This conversation is named **Open ecs wec wms**. If the extension retains it,
select it in session history. Its current session link is
[Open ecs wec wms](agent-host-session://copilotcli/456a876d-0ead-4969-875a-9eeba9a22089).
This link is machine/extension-specific and is not a portable chat backup.

The durable technical summary is in
[SHUTTLE_SIMULATOR_HANDOFF.md](SHUTTLE_SIMULATOR_HANDOFF.md). On 2026-10-10:

- PSA's real 3x4 map was moved from floor 2 to floor 1. Storage/node IDs 37-48
  and calibrated tag data were retained. TP001's saved source is `1-3-1`.
- Migration backups are in MySQL `psa_floor1_backup_20261010`.
- Tasks `MOV20261010000005` and `MOV20261010000006` were canceled through
  normal ECS/WES callbacks. Cancellation does not reconcile physical inventory.
- Last observed A1-1 position was `{1,3,1}`, battery 83%, no assigned task,
  with **Lift Mechanical Misalignment: 5-4**. This is historical, not live status.
  No remote alarm reset, position overwrite or forced completion was performed.
- Onsite manufacturer-approved fault recovery and pallet/tag verification are
  required before another physical run.
- The `172.30.30.130/24` address on eno1 was added temporarily. It is not
  guaranteed to survive reboot. Do not interpret lost PLC connectivity as lost
  workspace data or automatically reconnect equipment.

Git contains source and documentation, not the private JARs, database contents
or running services. A Git pull is not a recovery operation.
