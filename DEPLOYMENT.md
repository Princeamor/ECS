# ECS Deployment Runbook

## Scope and evidence
This runbook documents the artifact deployment described by `docker-compose.yml`, startup scripts, Nginx files, extracted Spring configuration, and MySQL dump headers. It does not certify a production deployment: executable JARs, `BOOT-INF/lib`, equipment protocols, and some WES/WMS imported configuration files are absent. Do not use this runbook to connect to physical shuttles until a simulator acceptance test is complete.

## Infrastructure requirements
- Ubuntu host with Docker Engine and Docker Compose v2.
- Capacity implied by Compose limits: 2 vCPU/4.5 GiB each for ECS, WMS, WES; 0.5 vCPU/500 MiB each for three Nginx UIs. Reserve host headroom for Docker, database/cache clients, logs, and file uploads.
- Persistent host directory layout expected by Compose: `/data/apps/configs`, `/data/apps/ehox-ecs`, `/data/apps/ehox-wes`, `/data/apps/ehox-wms`, and `/data/apps/web-ehox-{ecs,wes,wms}-ui/dist`.
- Private network access and DNS/host resolution for the database and Redis hosts named in the active profiles. Their containers are not in Compose.
- Firewall policy permitting only intended operator access to UI ports 8050, 8108, and 8109. Do not expose backend ports 8060, 8082, 8092, 8182 or debug port 5005 publicly.

## Component inventory
| Service | Image | Host ports | Required mounted content |
|---|---|---|---|
| `ehox-ecs` | JRE 21.0.11 Jammy image | 8060, 5005 | encrypted ECS JAR, `startup.sh`, logs, uploads, active config |
| `web-ehox-ecs-ui` | Nginx 1.24 | 8050 | ECS static `dist`; ECS Nginx config |
| `ehox-wms` | JRE 21.0.11 Jammy image | 8082 | encrypted WMS JAR, `startup.sh`, active config/uploads/logs |
| `web-ehox-wms-ui` | Nginx 1.24 | 8108 | WMS static `dist`; WMS Nginx config |
| `ehox-wes` | JRE 21.0.11 Jammy image | 8092 | encrypted WES JAR, `startup.sh`, active config/uploads/logs |
| `web-ehox-wes-ui` | Nginx 1.24 | 8109 | WES static `dist`; WES Nginx config |

## Configuration and environment inventory
The startup scripts pass `--spring.profiles.active=prod-ehox`; preserve that profile unless a tested replacement is supplied. The scripts set ZGC, container-memory sizing, 256 MiB initial heap, 4 GiB maximum heap, and a 1 MiB thread stack.

No shell environment variables are read by the tracked Compose file or startup scripts. Configuration is file-based. ECS recovered resources include `application.yml` and `application-prod-ehox.yml`; WES/WMS active profiles import additional `configs/...` files that are not present in the extracted artifacts. Required production values include database endpoint/schema/account, Redis endpoint/database/account, token/security settings, log path, upload path, external object/mail/SMS/search/notification integrations where enabled, and equipment network endpoints. Keep these in protected host files or a secrets system, never Git.

## Database and external dependencies
- MySQL 8.0.46 dump evidence exists for `ehox-ecs-v2` and `ehox_wms_auto_v1`.
- ECS connects to MySQL and Redis; its profile selects a PLC service implementation and opens a WebSocket listener on 8182.
- WMS and WES use MySQL/Druid and import Redis/token configurations; their profile names optional mail, Aliyun, MinIO, Elasticsearch, and DingTalk configuration families. Imports prove configuration expectations, not that every integration is enabled in production.
- Do not import the tracked dumps into production. Restore them only to an isolated simulator after checksum, version, and retention review.

## Installation and startup
1. Obtain signed/hashed copies of the three production JARs and their matching configuration directories. Verify the JAR names match each `startup.sh` reference.
2. Create the `/data/apps` layout and copy static UIs, startup scripts, Nginx configuration, JARs, and protected runtime configuration. Preserve ownership/permissions required by the container user.
3. Configure private DNS or explicit host mappings for external MySQL/Redis/equipment endpoints. Do not depend on a development `/etc/hosts` file without documenting it.
4. Validate locally: `docker compose config`; inspect that every host mount and Compose config source exists.
5. On an isolated network, start the full dependency set: `docker compose up -d`. Check `docker compose ps`, then inspect each service log. Confirm read-only login, navigation, UI asset delivery, and monitoring APIs before enabling equipment communications.

## Build and deployment procedures
There is no reproducible build procedure in the repository. Current deployment is a controlled artifact release:
1. Build or acquire JARs and static UI bundles from a verified source outside this repository.
2. Record version, SHA-256, build provenance, and compatibility with database schema/configuration.
3. Deploy first to a simulator, preserving production configuration as read-only input.
4. Replace one complete versioned release directory; update a `current` symlink or equivalent atomic host-level reference; then restart the affected service(s).
5. Treat ECS/WES/WMS as a coordinated release when their task APIs or schemas change.

## Upgrade, backup, and rollback
**Before upgrade:** capture container image/JAR/UI hashes, Compose/config copies (protected), database backup verification, Redis backup/flush policy, upload directories, device icons/map data, and a successful read-only acceptance test.

**Upgrade:** stop only the affected service after confirming compatible APIs and simulator results. Do not overwrite `/opt/apps/logs`, upload profiles, map data, database data, or unreviewed production configuration. Restart ECS when its JAR/profile changes; restart WMS/WES when their JAR/profile changes; restart the corresponding Nginx UI after static asset/config changes.

**Rollback:** stop the affected service(s), restore the prior versioned JAR/UI/config bundle, restart, and execute the same read-only checks. If a migration occurred, use an explicitly tested database rollback or restore path; never assume an application rollback reverses database changes.

## Troubleshooting and monitoring
- Use `docker compose ps` and `docker compose logs <service>`; ECS logs are configured under `/opt/apps/logs/chitu_log`, while WES/WMS log locations depend on missing imported logger configuration.
- Check the Nginx proxy path before debugging UI failures: ECS routes `/prod-api/` to 8060 and `/ws-api/` to 8182; WMS/WES route `/api/` and `/websocket/` to their backend services.
- Monitor container restarts, CPU/memory, disk space for logs/uploads, MySQL connection saturation/slow queries, Redis availability/memory, HTTP error rates, WebSocket disconnects, task exceptions, device connection state, and PLC command failures.
- Restrict or disable Swagger/Druid management surfaces; rotate currently exposed credentials before the host has network reachability.

## Files that must not be overwritten
- External protected configuration imports and production profile overrides.
- Database and Redis data.
- Upload directories, equipment icons, map/generated binary data, and runtime logs pending retention/export.
- Any site-specific `/etc/hosts`, firewall, reverse-proxy, certificates, or equipment-network configuration.
