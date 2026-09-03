# ECS Evening Change Log

**Recorded:** 2026-09-03 05:40 UTC  
**Scope:** ECS frontend served locally at `http://localhost:8050` and its Vercel project, `simulation-program`.

## Purpose

This is the chronological record of the UI, language, navigation, startup, Nginx, and branding work completed from 2026-09-02 through 2026-09-03. The repository contains compiled frontend output; changes were made as isolated static overrides or narrowly targeted edits to compiled assets.

## Architecture confirmed during the work

- Local ECS frontend: Docker service `web-ehox-ecs-ui`, host port `8050`.
- Nginx document root in container: `/data/webroot/dist/`.
- VM bind mount: `/data/apps/web-ehox-ecs-ui/dist` to that document root.
- SPA fallback: `/login` and other client routes serve `web-ehox-ecs-ui/dist/index.html`.
- API proxy: `/prod-api/` forwards to the ECS backend.
- Login uses the original compiled Vue application, `/prod-api/captchaImage`, `/prod-api/login`, RSA password encryption, the `Admin-Token` cookie, and client routing to `/index`.

Do not replace `index.html` with a standalone form. It prevents the original Vue router and login flow from starting.

## Chronological changes

### 2026-09-02 14:05 UTC — Runtime English overlay and visual refresh

- Added `web-ehox-ecs-ui/dist/static/custom/i18n-en.js` for runtime English translations.
- Added `web-ehox-ecs-ui/dist/static/custom/modern.css` for restrained Element UI improvements.
- Updated `web-ehox-ecs-ui/dist/index.html` to load those custom assets and changed the browser title to Warehouse Intelligent Scheduling.

### 2026-09-02 15:08 UTC — Language-switch backend error fixed

- The compiled language selector called `/common/language` without the body expected by the backend.
- Removed that request from all compiled language-switch components.
- Retained client-side locale selection, stored preference, and page reload behavior.

### 2026-09-02 16:01 UTC through 17:31 UTC — Dark-neon theme

- Added `dark-neon.css` and `neon-map.js`.
- Applied dark backgrounds, white text, and neon accents across common controls, tables, dialogs, menus, map dialogs, and preview-map components.
- Applied neon-green map grid styling, neon-blue `P` labels, and neon pink/red node treatments.
- Added a fallback green grid for map panes where an X6 grid is disabled.

### 2026-09-02 17:05 UTC — First-visit English default

- Updated the app state and Vue i18n fallback from `zh-CN` to `en-US`.
- Existing saved Chinese language preferences are migrated to English at startup.
- The header language label displays the active choice explicitly: English, Chinese, or Korean.

### 2026-09-03 03:14 UTC through 04:16 UTC — Original login theme and startup stability

- Changed the browser title to `WCS`.
- Added `login-black.css`, scoped to the original compiled Vue login selectors:
  - `.login`
  - `.login-form`
  - `.title`
  - `.login-code`
  - `.login-code-img`
  - `.el-login-footer`
- Replaced the original login image background with solid black and kept white text with neon-green, blue, and pink accents.
- Retained the original CAPTCHA, authentication, token, and `/index` routing flow.
- Added `theme-order.js` to keep override assets after lazy route CSS. Its initial document-head observer caused a startup loop; it was replaced with a one-time ordering step.

### 2026-09-03 04:35 UTC — Stale local asset fix

- Confirmed Nginx `gzip_static on` could serve a stale `.gz` asset rather than a newer bind-mounted file.
- Changed `configs/ecs-web.conf` to `gzip_static off` so local files are served directly.
- This Nginx configuration change requires a `web-ehox-ecs-ui` container restart after pulling the commit locally.

### 2026-09-03 04:44 UTC onward — Navigation labels and startup improvement

- The sidebar and top navigation are generated from backend `/getRouters` data; their labels are not all present in the compiled English locale catalog.
- Extended `i18n-en.js` with runtime translations for system management, monitoring, tools, rules, maps, tasks, devices, workflows, cache, logs, and other visible navigation labels.
- Changed authenticated startup to request `/getInfo` and `/getRouters` in parallel instead of serially. This removes one full sequential request wait.
- Removed the `sidebar.hide` guard from the sidebar-toggle mutation so the header collapse control remains usable after navigation to a leaf route.
- Changed the hard-coded overflow label from Chinese to `More menus` and styled its popup below the header.
- Top-menu behavior is intentional: parent menu entries select the sidebar section; leaf entries navigate to a route.

### 2026-09-03 05:33 UTC — Track-It branding

- Added `web-ehox-ecs-ui/dist/static/img/trak-it-logo.png`.
- Added the brand mark at the top-left of the original Vue login screen.
- Added the same mark to the application sidebar header, including its collapsed state.

## Files changed and their responsibility

| File | Role |
| --- | --- |
| `web-ehox-ecs-ui/dist/index.html` | Vue SPA entrypoint and custom asset links |
| `web-ehox-ecs-ui/dist/static/js/app.8551413c.js` | Compiled app state, locale, route guard, sidebar, and top navigation |
| `web-ehox-ecs-ui/dist/static/custom/i18n-en.js` | Runtime translations for rendered Chinese text and attributes |
| `web-ehox-ecs-ui/dist/static/custom/modern.css` | Shared Element UI modernization |
| `web-ehox-ecs-ui/dist/static/custom/dark-neon.css` | Shared dark-neon shell, map, and dropdown styling |
| `web-ehox-ecs-ui/dist/static/custom/login-black.css` | Original login screen styling and Track-It login logo |
| `web-ehox-ecs-ui/dist/static/custom/neon-map.js` | Runtime X6 map color treatment |
| `web-ehox-ecs-ui/dist/static/custom/theme-order.js` | One-time override ordering and map grid fallback hook |
| `web-ehox-ecs-ui/dist/static/img/trak-it-logo.png` | Track-It brand image |
| `configs/ecs-web.conf` | Local Nginx SPA proxy and gzip behavior |

## Local VM update procedure

After merging the intended pull request into `main`:

```bash
cd /data/apps
git pull origin main
find web-ehox-ecs-ui/dist -type f -name '*.gz' -delete
```

For changes to `configs/ecs-web.conf`, also run:

```bash
sudo docker compose restart web-ehox-ecs-ui
```

For static asset-only changes, the bind mount means an Nginx restart is not required. Hard-refresh the browser.

## Recovery and rollback

1. Never leave conflict markers in `app.8551413c.js`; it is a minified production bundle.
2. If a local Git update is conflicted, save local changes before pulling rather than editing the minified bundle manually:

```bash
cd /data/apps
git merge --abort || git rebase --abort
git stash push -u -m "local changes before ECS update"
git pull origin main
find web-ehox-ecs-ui/dist -type f -name '*.gz' -delete
```

3. To restore specific frontend assets from a known-good revision:

```bash
cd /data/apps
git restore --source=<known-good-revision> -- web-ehox-ecs-ui/dist configs/ecs-web.conf
find web-ehox-ecs-ui/dist -type f -name '*.gz' -delete
sudo docker compose restart web-ehox-ecs-ui
```

## Remaining limitations

- The runtime dictionary covers the visible navigation and common interface text, but the compiled application has many rarely visited Chinese strings. Add an exact source string and English replacement to `i18n-en.js` when one is found.
- The current static override approach is safe for the artifact-only repository, but a long-term implementation belongs in editable Vue source with a proper build pipeline.
- Post-login readiness still depends on backend response time for `/getInfo` and `/getRouters`; those requests now run concurrently.
