# Isolated shuttle source snapshot

This repository snapshot contains the locally developed Ehox shuttle simulator,
dashboard and recovery documentation. It is not a full deployed-VM backup.

- [Operational handoff](SHUTTLE_SIMULATOR_HANDOFF.md)
- [Historical move runbook](PALLET_SHUTTLE_MOVE_RUNBOOK.md)
- `shuttle-simulator/`: Python service, tests, configuration, rollback records
- `shuttle-dashboard/`: browser UI, protocol decoder/tests and offline ST example
- `shuttle-services/`: user service unit snapshots

The active installation remains at
`/home/PSA/Downloads/abyssws/shuttle-simulator` and
`/home/PSA/Downloads/abyssws/htdocs/shuttle-simulator`.
Private journal/token/backups remain under
`/home/PSA/.local/share/shuttle-simulator`, outside this repository.
Git edits do not automatically change the running service.

## Validate

```sh
cd shuttle-simulator
python3 -m unittest test_plc_logs test_simulator test_workflow test_backup_simulator
```

Browser decoder checks require loading the dashboard and its companion
`protocol-decoder-tests.js`, then calling `runProtocolDecoderTests()` in an
offline test page. The ST example must be adapted/compiled for the intended
PLC vendor; it must not be connected to actuators.

## Deploy or recover

Follow the handoff's isolation and recovery gates. Back up the existing installation,
stop the simulator only while idle, and copy reviewed source to the installation
paths above. Dashboard source maps from `shuttle-dashboard/` to
`htdocs/shuttle-simulator/`; user unit snapshots map to
`/home/PSA/.config/systemd/user/`.

Review absolute paths, bridge/peer/origin allowlists and warehouse settings on a
different host. Startup disarms feedback; do not automatically arm or resume tasks.
The backup script's default paths refer to the deployed installation, not these
repository snapshot directories.

## Exclusions

No access token, SSH key, warehouse credentials, live SQLite state, service log,
private backup archive or warehouse database dump is saved by this source snapshot.
Original application changes elsewhere in the workspace are outside its scope.
