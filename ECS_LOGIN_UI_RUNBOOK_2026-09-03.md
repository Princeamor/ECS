# ECS Login UI Runbook

**Last verified:** 2026-09-03  
**Applies to:** `web-ehox-ecs-ui` served locally at `http://localhost:8050/login`

## What serves the login page

The login UI is a Vue single-page application (SPA), not a standalone HTML form.

- Docker service: `web-ehox-ecs-ui`
- Host port: `8050`
- Nginx document root in the container: `/data/webroot/dist/`
- Host directory mounted into that root: `/data/apps/web-ehox-ecs-ui/dist`
- Nginx fallback: `try_files $uri $uri/ /index.html`

Therefore `/login` is served by the SPA entrypoint at:

```text
/data/apps/web-ehox-ecs-ui/dist/index.html
```

Do not replace that entrypoint with a standalone login form. It loads the compiled Vue runtime, router, CAPTCHA flow, RSA password encryption, authentication token handling, and redirect to `/index`.

## Login architecture

| Responsibility | Location |
| --- | --- |
| SPA entrypoint and static asset links | `web-ehox-ecs-ui/dist/index.html` |
| Main application/runtime bundle | `web-ehox-ecs-ui/dist/static/js/app.8551413c.js` |
| Lazy login route bundle | `web-ehox-ecs-ui/dist/static/js/chunk-006bdd0c.2a461daf.js` |
| Lazy login route stylesheet | `web-ehox-ecs-ui/dist/static/css/chunk-006bdd0c.a7ad41fa.css` |
| Original login background image | `web-ehox-ecs-ui/dist/static/img/login-background.2784b848.jpg` |
| Nginx SPA/API routing | `configs/ecs-web.conf` |

The login code obtains the CAPTCHA from `/prod-api/captchaImage`, posts credentials to `/prod-api/login`, stores the returned token in the `Admin-Token` cookie, and routes to `/index`.

## Safe UI customization

Keep the original compiled bundles intact. Add stylesheets under `web-ehox-ecs-ui/dist/static/custom/` and link them from `index.html` after the base CSS links.

Current custom assets:

| File | Purpose |
| --- | --- |
| `dark-neon.css` | Shared dark/neon palette and map styling |
| `modern.css` | Shared Element UI styling refinements |
| `login-black.css` | Login-specific black background and neon form overlay |
| `theme-order.js` | One-time theme ordering and map fallback-grid hook |
| `neon-map.js` | X6 map color treatment |
| `i18n-en.js` | Runtime English text overlay |

### Verified login selectors

The compiled login route uses these selectors:

```css
.login
.login-form
.title
.login-code
.login-code-img
.el-login-footer
```

Use `login-black.css` for login-only changes. Its current behavior is:

- Solid black login background; the original photo is disabled with `background-image: none !important`.
- White login text.
- Dark form panel with neon-green border, blue inputs/button, and pink CAPTCHA border.
- No authentication or routing JavaScript is replaced.

## Language and browser title

- The browser title in `index.html` is `WCS`.
- The main bundle defaults first-time visitors to `en-US`.
- Existing saved `zh-CN` preferences are migrated to English by the bundle startup fallback.

If changing language behavior, do not restore the old call to `/common/language` without sending the JSON body expected by the backend. The safe deployed behavior is client-side language selection.

## Static gzip cache rule

Nginx has `gzip_static on`. When a sibling `*.gz` file exists, Nginx can serve it instead of the edited asset. This caused the old Chinese login page to remain visible after `index.html` was edited.

After any local static update, remove precompressed copies:

```bash
find /data/apps/web-ehox-ecs-ui/dist -type f -name '*.gz' -delete
```

No Nginx restart is required for normal bind-mounted file changes. Use a hard refresh in the browser.

## Local update workflow

1. Merge the intended pull request into `main`.
2. On the VM, update only after confirming there are no local edits that must be retained:

   ```bash
   cd /data/apps
   git pull origin main
   find web-ehox-ecs-ui/dist -type f -name '*.gz' -delete
   ```

3. Open `http://localhost:8050/login` and hard-refresh.
4. If the SPA stays on the loader, verify the entrypoint and base bundles are present:

   ```bash
   curl -s http://localhost:8050/login | grep -oE '/static/js/[^ <]+'
   curl -I http://localhost:8050/static/js/app.8551413c.js
   curl -I http://localhost:8050/static/js/chunk-libs.2b6479cf.js
   ```

## Rollback

To revert only the visual override while preserving the original login application:

```bash
cd /data/apps
# Restore the entrypoint and custom assets from the desired Git revision.
git restore --source=<known-good-revision> -- web-ehox-ecs-ui/dist/index.html web-ehox-ecs-ui/dist/static/custom
find web-ehox-ecs-ui/dist -type f -name '*.gz' -delete
```

Never substitute a test or static-only document for `index.html` in production. Restore the original SPA entrypoint before troubleshooting the login flow.
