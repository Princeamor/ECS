# ECS UI Change Log — 2026-09-03

**Record created:** 2026-09-03 17:06 UTC  
**Applies to:** ECS UI at `http://localhost:8050`  
**Service:** `web-ehox-ecs-ui`

## Architecture confirmed

- The UI is a compiled Vue SPA served by Nginx.
- The host directory `/data/apps/web-ehox-ecs-ui/dist` is bind-mounted to `/data/webroot/dist` inside the `web-ehox-ecs-ui` container.
- `/login` falls back to `index.html`; do not replace it with standalone HTML because it loads the login runtime, CAPTCHA, RSA password encryption, token handling, and `/index` redirect.
- The active ECS Nginx configuration is `configs/ecs-web.conf`. It sets `gzip_static off`, but remove any legacy `*.gz` files after static updates to eliminate stale-asset risk.

## Completed changes

### Login and shared visual theme

Existing custom assets were retained and used instead of modifying the compiled Vue bundles:

| Asset | Role |
| --- | --- |
| `web-ehox-ecs-ui/dist/static/custom/dark-neon.css` | Dark/neon shared styling, maps, layout drawer styling |
| `web-ehox-ecs-ui/dist/static/custom/modern.css` | Element UI refinements |
| `web-ehox-ecs-ui/dist/static/custom/login-black.css` | Login-only black/neon styling |
| `web-ehox-ecs-ui/dist/static/custom/theme-order.js` | Ensures custom stylesheets are ordered last and adds map-grid fallback |
| `web-ehox-ecs-ui/dist/static/custom/i18n-en.js` | Runtime English translation overlay |
| `web-ehox-ecs-ui/dist/static/custom/appearance-controls.js` | Layout Settings appearance controls and runtime label styling |

### English sidebar labels

Added to `i18n-en.js`:

| Chinese label | English label |
| --- | --- |
| `实时监控` | `Real-time monitoring` |
| `任务列表` | `Task list` |

The underlying English resource file also maps these labels to `Real-time Monitoring` and `Task List`; the runtime overlay uses the casing above.

### Layout Settings readability

The Layout Settings drawer is rendered from the compiled application bundle. The setting labels beside the toggle switches are direct `<span>` children of `.drawer-item`, including Top Navigation, Tags View, Fixed Header, Sidebar Logo, and Dynamic Title.

Initial CSS rules aimed at `.drawer-container .drawer-item` and scoped component selectors were merged but did **not** visibly change the labels on the reported server. A later correction was merged in PR #25:

- `appearance-controls.js` now finds `.drawer-container .drawer-item > span`, drawer titles, and section titles when the drawer is rendered.
- It writes inline, `!important` styles: white text, full opacity, 17px bold font, and a black contrast shadow.
- This direct runtime approach is the current intended fix for the unreadable toggle labels.

**Status at record time:** the user reported no visible change after PR #25. The latest screenshot also lacked the newly added appearance-controls section. That indicates the running browser/server was not serving the updated `appearance-controls.js`, rather than proving the direct label selector failed.

### Appearance controls and hover text

`appearance-controls.js` adds an **Interface appearance** section at the top of Layout Settings with three browser-local controls:

1. Background color
2. Text color
3. Highlight color

Selections are stored in local storage under `ecs-appearance-controls` and applied through CSS variables.

Hover text was disabled in two ways:

- Native `title` attributes are removed when elements load.
- Element UI tooltip popovers are hidden with `.el-tooltip__popper { display: none !important; }`.

## Git history and merge status

The following commits were created on 2026-09-03 and merged through pull requests:

| Time (UTC) | Change |
| --- | --- |
| 15:32 | Translated `实时监控` to `Real-time monitoring` |
| 15:34 | Translated `任务列表` to `Task list` |
| 15:38 | Added initial Layout Settings readability CSS |
| 15:45 | Added stronger compiled-selector Layout Settings CSS |
| 15:50 | Added appearance controls and hover-text suppression |
| 16:23 | Added direct runtime styling for Layout Settings switch labels |

PR #24 and PR #25 were merged. The server must pull the current `main` branch for these changes to be present.

## Server deployment procedure

Run on the ECS host after a merge:

```bash
cd /data/apps
git pull origin main
find web-ehox-ecs-ui/dist -type f -name '*.gz' -delete
sudo docker compose restart web-ehox-ecs-ui
```

If Docker reports permission denied for `/var/run/docker.sock`, use `sudo` as shown. Do not accidentally concatenate commands (for example, `docker compose pscd` is invalid; use `sudo docker compose ps`).

## Required verification after deployment

Run these checks **on the ECS host** after `git pull`:

```bash
cd /data/apps
grep -n "forceLayoutLabels" web-ehox-ecs-ui/dist/static/custom/appearance-controls.js
grep -n "appearance-controls.js" web-ehox-ecs-ui/dist/index.html
sudo docker compose ps
```

Expected result:

- Both `grep` commands print a matching line.
- `web-ehox-ecs-ui` is running.

Then open `http://localhost:8050/login?redirect=%2Findex`, sign in, open Layout Settings, and confirm:

- **Interface appearance** appears at the top of the drawer.
- The five switch labels are white and readable.
- The three color controls appear.
- Hover tooltips do not appear.

If either `grep` command finds nothing, stop changing CSS: the server checkout does not contain the merged version or the container mount is not using `/data/apps/web-ehox-ecs-ui/dist`.

## Useful troubleshooting

### Old UI appears until browser refresh

Clear legacy precompressed files and hard-refresh:

```bash
find /data/apps/web-ehox-ecs-ui/dist -type f -name '*.gz' -delete
```

The current config uses `gzip_static off`, but the repository previously contained `index.html.gz`; deleting old precompressed copies remains a safe deployment step.

### Confirm the container sees the expected files

```bash
sudo docker compose exec web-ehox-ecs-ui sh -c 'grep -n "appearance-controls.js" /data/webroot/dist/index.html && grep -n "forceLayoutLabels" /data/webroot/dist/static/custom/appearance-controls.js'
```

If this does not return matches while the host-side checks do, recreate only the UI container:

```bash
sudo docker compose up -d --force-recreate web-ehox-ecs-ui
```

## Guardrails for later work

- Keep compiled SPA bundles intact unless no custom-asset solution exists.
- Put new overrides in `dist/static/custom/` and explicitly load them from `dist/index.html`.
- Preserve the `/login` SPA entrypoint.
- Delete `*.gz` static copies after each deployed static UI change.
- Verify the exact host and container assets with `grep` before concluding a CSS or JavaScript change failed.
