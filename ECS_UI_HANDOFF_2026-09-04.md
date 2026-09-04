# ECS UI and Map Handoff — 2026-09-04

**Scope:** Local ECS Vue SPA at `http://localhost:8050`, served by `web-ehox-ecs-ui`; API service `ehox-ecs`.

## Current state

- The local ECS frontend is a compiled Vue SPA. Keep its original `index.html`, compiled route bundles, login flow, router, and API proxy intact.
- Static customizations belong in `web-ehox-ecs-ui/dist/static/custom/` and are loaded from `index.html` after the base application bundles.
- The active backend profile is `prod-ehox`.
- The infrastructure migration is verified: MySQL and Redis run through Docker DNS aliases `ehox-chitu-mysql` and `ehox-chitu-redis`; ECS survives reboot and initializes its MySQL datasource.
- The current working branch includes the map dictionary language fix. At this record time it is awaiting merge; verify that it is merged before expecting the map fix on `main`.

## UI work completed

### Appearance controls

`appearance-controls.js` injects an **Interface appearance** section into Layout Settings. It provides browser-local color controls for:

- Workspace
- Sidebar (left navigation and account-actions footer)
- Text
- Highlight

Selections are stored in browser local storage under `ecs-appearance-controls`. These are presentation preferences; they do not modify the backend or database.

### Layout Settings panel

The compiled Element UI drawer was unstable when launched from the sidebar because its global click-to-close listener saw the launcher click as outside the drawer. The current override:

- defers the open action until the sidebar click completes;
- reuses the original compiled switches and Save/Reset handlers;
- groups the original controls into appearance and layout-control sections;
- prevents the Element UI RTL drawer animation from translating the panel off-screen;
- centers the panel with fixed viewport positioning and `translateX(-50%)`.

The presentation rules live in `dark-neon.css`. The behavior and DOM organization live in `appearance-controls.js`.

**Important:** Earlier iterations accumulated competing grid rules. The later implementation replaces those with explicit appearance and layout-control containers. Do not reintroduce earlier drawer/grid rules or move compiled controls by positional selectors alone.

### Login, navigation, and theme work retained

- Original SPA login remains intact, including CAPTCHA, RSA password encryption, `Admin-Token`, and `/index` routing.
- English text remains a runtime overlay in `i18n-en.js`.
- The shared dark/neon theme is in `dark-neon.css`; login-only styling is in `login-black.css`.
- `theme-order.js` keeps custom styles after lazy route styles and supplies a map-grid fallback.
- Navigation labels are supplied by backend `/getRouters`; the runtime translation overlay covers commonly visible labels.

## Map node-type / icon investigation

### Symptom

Map node types and related icon behavior stopped initializing when the UI used English. The original version worked.

### Verified frontend requests

The map editor loads three dictionary requests together:

```text
GET /prod-api/system/dict/data/type/chitu_map_node_type
GET /prod-api/system/dict/data/type/chitu_map_node_status
GET /prod-api/system/dict/data/type/chitu_map_node_direction
```

It also loads map image metadata separately:

```text
POST /prod-api/business/WHMon/getImg
```

The `getImg` response was verified valid and contains the type/status icon metadata. It is not the failing dictionary response.

### Verified backend and database state

- Controller route: `SysDictDataController` at `/system/dict/data/type/{dictType}`.
- ECS uses the `prod-ehox` master datasource against `ehox-ecs-v2`; the configured replica is disabled.
- ECS has active MySQL connections to `ehox-ecs-v2` as the dedicated application user.
- `sys_dict_data` contains enabled rows for `chitu_map_node_type` and `chitu_map_node_status`.
- Redis database 5 contains populated cache keys for the node type, status, and direction dictionaries.
- Clearing only those three Redis keys and restarting ECS did not restore the dropdown while English was active.

### Confirmed cause and remediation

The frontend sends a `lang` header on every API request. With the English locale, one or more map dictionary requests return a response that does not provide `data`; the shared dictionary converter crashes during `Promise.all`, which prevents all three map dictionaries from initializing.

Switching the app locale to `ko` populated the map dictionaries. This proves the failure is locale-sensitive, not missing MySQL rows, Docker DNS, or Redis connectivity.

The pending map fix scopes `lang: ko` to only these three dictionary endpoints. The visible UI remains English because `i18n-en.js` continues translating rendered labels:

```text
chitu_map_node_type
chitu_map_node_status
chitu_map_node_direction
```

## Local deployment procedure

After merging a frontend PR:

```bash
cd /data/apps
git pull origin main
find web-ehox-ecs-ui/dist -type f -name '*.gz' -delete
sudo docker compose restart web-ehox-ecs-ui
```

Hard-refresh the browser after the update. Restart `ehox-ecs` only for backend/configuration/cache changes:

```bash
sudo docker compose restart ehox-ecs
```

## Validation checklist

1. Sign in at `http://localhost:8050/login`.
2. Open Layout Settings from the sidebar:
   - panel remains open and centered;
   - appearance controls are visible;
   - Save and Reset remain accessible.
3. Open the map editor and confirm node-type, status, and direction controls populate.
4. In browser DevTools → Network → Fetch/XHR, confirm each map dictionary request returns a JSON object with a populated `data` array.
5. Confirm map icons load from the `getImg` metadata response.

## Guardrails

- Do not replace the SPA entrypoint with standalone HTML.
- Do not expose database, Redis, browser-token, or session-cookie values in tickets or chat.
- Do not run `FLUSHDB`; only delete specifically identified Redis keys.
- Do not manually recreate dictionary data while the current records are present and enabled.
- The repo contains compiled frontend and encrypted/compiled backend artifacts. Backend service/mapper source is not available here; do not claim a backend SQL or serialization fix without runtime evidence or editable source.
