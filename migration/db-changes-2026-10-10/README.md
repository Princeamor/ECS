# Database and map changes, 2026-10-10

These are the scripts and records behind tonight's map and database changes.
They document what was applied to **this** installation. They are not a
general upgrade path, and **none of them should be rerun** without review: each
was written against the exact rows found that night and aborts if the data
differs.

All were run by the operator with the services stopped (except where noted),
using the container's own MySQL root environment, so no password is stored here.
Databases: `ehox_wms_auto_v1` (WMS/WES) and `ehox-ecs-v2` (ECS).
Full narrative: [SESSION_HANDOFF_2026-10-10.md](../../SESSION_HANDOFF_2026-10-10.md).

## Order applied

| # | File | Kind | Result |
|---|---|---|---|
| 0 | `00-ecs-url-repair.sql` | Change | `sys_param` id 10 `ECS_URL` set to `http://ehox-ecs:8060`; 1 row updated |
| 1 | `showroom-map-audit.sql` | Read-only | Showed the two overlapping floor layouts and stock links |
| 2 | `showroom-callback-repair.sql` | Change | ECS config id 138 callback set to `http://ehox-wes:8092`; old row backed up |
| 3 | `showroom-distance-audit.sql` | Read-only | Found floor-specific distance (calibration) rows |
| 4 | `showroom-calibration-audit.sql` | Read-only | Showed conflicting floor 1 / floor 2 calibration |
| 5 | `showroom-floor1-migration.sql` | Change | Moved the real 3x4 layout to floor 1; committed |
| 6 | ECS node edit (no SQL) | Change | TP001 registered on node 39; see below |

## The single-floor map migration (`showroom-floor1-migration.sql`)

The restored data had a placeholder floor 1 and the real layout stored as
floor 2. The migration, run in one transaction with guards:

- Soft-deleted the placeholder WMS storage rows (ids 25-36) and deleted their
  ECS nodes. The real rows (ids 37-48) were kept and changed from floor 2 to
  floor 1, with codes, names and roadway suffixes updated to match.
- Updated the live WMS stock and stock-relation rows to the new codes and floor.
- Moved the 15 verified calibration rows in X1-3 / Y1-4 from floor 2 to floor 1,
  removing the conflicting floor-1 rows. Distances were not changed.
- Set the ECS map limit `business.map.manage.control` to `max_z = 1`.
- Backed everything up first into the MySQL database `psa_floor1_backup_20261010`.

It first failed and rolled back on the calibration guard, then was revised after
the operator confirmed the floor-2 calibration was verified onsite, and applied
successfully. The file here is the revised version that was applied. Historical
tasks, other warehouses and calibration outside the 3x4 grid were not changed.

## Artificial test pallet (`ecs-node-39-before-test-pallet.json`)

Not SQL. After the migration ECS node 39 (`C-1-3-1`) had no pallet registered,
so relocations failed with "Starting position does not exist". TP001 was
registered as the test pallet by sending ECS node 39's full existing record,
unchanged except `palletCode` set to `TP001`, to the ECS node API
(`PUT /prod-api/business/node`), the same call the ECS node editor makes. The
JSON file is the node as it was before that change.

## Not included

No database dump is committed, because dumps contain credentials and private
data. Use `migration/backup_local_workspace.py` for a private local backup.
