# ECS Project Status

## Executive summary
The repository is an artifact-based deployment snapshot for ECS, WES, and WMS. It can document and preserve the existing deployment, but it cannot reproduce the applications from source. Backend class artifacts provide a recoverable route inventory; production behavior, DTO shapes, and hardware protocols remain unverified.

## What the application does
- **ECS**: shuttle/PLC-oriented warehouse control: device inventory, map nodes, task batches and steps, warning monitoring, task API, and a dedicated WebSocket listener.
- **WMS**: warehouse administration: materials, pallets, inbound/outbound work, stock, inventory checks, customers, suppliers, and warehouse storage.
- **WES**: execution workflows: stock/move/outbound tasks, entrances, pallets, storage synchronization, and ECS-facing task operations.

## Current state and completed work
- Compiled frontends are retained: ECS uses an older Vue/Element UI bundle; WES/WMS are Vite-built Vue applications with Vue Router, Pinia, Axios, Vue I18n, and Element Plus markers.
- Extracted Spring Boot artifacts are present for ECS (Java 21 build metadata; `com.chitu.ChituApplication`), WES (Java 17; `com.ehowes.admin.AdminApplication`), and WMS (Java 17; `com.ehowms.admin.AdminApplication`).
- Controller route inventories have been recovered under `reconstruction/contracts/ecs-api.md`.
- A draft, English, monitoring-only ECS console baseline exists under `reconstruction/ecs-console`; it is not deployed and contains no equipment commands.

## Components and dependencies
| Component | Runtime listener | Frontend listener | Backing services observed |
|---|---:|---:|---|
| ECS | 8060 HTTP, 8182 WebSocket | 8050 | MySQL database `ehox-ecs-v2`, Redis database 5, PLC/device interfaces |
| WMS | 8082 HTTP under `/api` | 8108 | MySQL database `ehox_wms_auto_v1`; imported Redis/token configuration missing from artifacts |
| WES | 8092 HTTP under `/api` | 8109 | MySQL database `ehox_wms_auto_v1`; imported Redis/token configuration missing from artifacts |

## Database inventory
Two gzip-compressed MySQL 8.0.46 dumps are tracked: one for `ehox-ecs-v2`, one for `ehox_wms_auto_v1`. The recovered ECS profile selects MySQL and MyBatis/PageHelper; WES/WMS select MySQL with Druid dynamic datasource configuration. Live database topology, backup retention, and schema compatibility are unknown.

## Authentication and security observations
ECS exposes `/login`, `/getInfo`, and `/getRouters`; recovered configuration names the `Authorization` header and a token expiry. Compiled controllers show permission annotations on administrative and business routes. WES/WMS contain token/login and `PreAuthorize` markers. Exact token format, role mappings, and endpoint exemptions require runtime capture. See `AGENTS.md` for exposure and credential risks.

## Outstanding issues and known risks
1. Executable JARs and dependency libraries are absent; startup scripts reference encrypted JAR names that cannot be validated here.
2. WES/WMS import required configuration files that are absent from extracted artifacts, including security, MyBatis, logging, token, and production integration profiles.
3. Production database/cache host containers are not defined in `docker-compose.yml`.
4. Repository tracks runtime logs, database dumps, and sensitive configuration material.
5. Chinese content remains in all compiled UIs and backend message bundles; no safe translation source exists.
6. No simulator, API response fixtures, WebSocket messages, PLC protocol documentation, or end-to-end tests are available.

## Current goals and recommended next steps
1. Obtain a sanitized production configuration inventory, executable JARs, dependency libraries, and source/build provenance.
2. Stand up an isolated Ubuntu simulator with restored copies of both databases and non-production Redis.
3. Capture authenticated read-only API responses and WebSocket messages; turn them into contract fixtures.
4. Rebuild and translate views incrementally, beginning with read-only monitoring; release command workflows only after simulator acceptance testing.
5. Remove sensitive artifacts/logs from active history, rotate credentials, and establish secrets management.

## Questions requiring answers
- Which host provides MySQL and Redis, and how are their names resolved on the target network?
- What are the PLC/shuttle protocols, allowed command operations, interlocks, and emergency-stop rules?
- Which WES/WMS imported configuration files are mandatory for `prod-ehox`?
- Which exact JAR versions, checksums, and licenses run in production?
- Which URLs, users, roles, data-retention, backup, and recovery objectives are required?

## Future backlog
Source recovery; DTO and WebSocket contract fixtures; i18n catalogue; read-only device/task/alert screens; command-workflow simulator tests; secrets migration; CI build/release pipeline; monitoring and backup automation.
