# ECS Operator Guide

## Purpose
ECS is a warehouse control deployment containing an equipment-control service (ECS), a warehouse execution service (WES), and a warehouse management service (WMS). The recovered ECS contract includes shuttle-device, PLC, map, task, warning, and warehouse-monitor operations.

## Architecture
```text
Browser
  ├─ ECS UI :8050 ── /prod-api → ECS :8060; /ws-api → ECS :8182
  ├─ WMS UI :8108 ── /api → WMS :8082; /websocket → WMS :8082/api/websocket/
  └─ WES UI :8109 ── /api → WES :8092; /websocket → WES :8092/api/websocket/
                         │
                    MySQL 8 + Redis + site equipment/PLC interfaces
```
All services share the Docker bridge network `ehox-net`. The production topology expects service names for upstream resolution and external database/cache hosts not declared in this Compose file.

## Repository structure
- `docker-compose.yml`: six-container deployment topology.
- `configs/`: Nginx proxy configuration; `redis.conf` is not mounted by the current Compose file.
- `ehox-{ecs,wes,wms}/`: startup scripts; ECS also contains runtime logs and uploaded device icons.
- `web-ehox-*-ui/dist/`: compiled production frontends, not editable source.
- `artifacts/{ecs,wes,wms}/`: extracted Spring Boot classes/resources and manifest metadata.
- `*.sql.gz`: MySQL 8.0.46 database dumps.
- `reconstruction/`: isolated, monitoring-only ECS frontend baseline and recovered API-route inventory.

## Runtime and build
There are no backend source trees, frontend source projects, Maven/Gradle files, Node lockfiles, or reproducible build pipelines. Run the preserved artifacts with Docker Compose only after deployment prerequisites are met. The reconstruction console can be syntax-tested with `node --check` and `node --test reconstruction/ecs-console/test/*.test.mjs`; it is not integrated into the production Compose topology.

## Coding and change rules
1. Do not change controller contracts, database schemas, PLC command semantics, map data, or WebSocket schemas without a simulator-backed test.
2. Preserve the legacy proxy routes: ECS `/prod-api/` and `/ws-api/`; WES/WMS `/api/` and `/websocket/`.
3. Treat compiled `dist` files and `artifacts` as evidence; regenerate only from recovered source with a validated build process.
4. Keep credentials, database dumps, logs, uploads, and generated output out of future commits.
5. Create a backup and record artifact hashes before upgrades; roll back the complete service set if a hardware integration test fails.

## Security and operational warnings
- Committed extracted production profiles and Redis configuration contain credentials and default management-console credentials. Do not copy them into issues, documentation, or new commits; rotate exposed credentials before any networked deployment.
- Current Nginx listeners have no TLS/authentication layer. Restrict exposure at the host/firewall/reverse-proxy boundary.
- ECS enables Swagger and a Druid management endpoint in its recovered profile; WES/WMS profiles also enable Druid. Disable or restrict them before production exposure.
- ECS has PLC-write, task, map, device enablement/offline, recovery, and restart routes. The reconstructed UI intentionally omits them.

## AI assistant instructions
Read `PROJECT_STATUS.md` and `DEPLOYMENT.md` first. Work from a branch and a reviewable pull request. Document only observed facts; label missing configuration, DTO schemas, and equipment protocols as unknown. Update all three root documents when architecture or deployment knowledge changes. Never apply database migrations or exercise physical-equipment endpoints from an unverified environment.

## Lessons learned
The JAR manifests name Spring Boot entry points, but the repository lacks executable JARs and their dependency libraries. Controller annotations reconstruct route paths but do not prove request/response schemas or runtime behavior. The deployment is artifact-based, so simulator traffic capture and original build sources remain required for a safe functional reconstruction.
