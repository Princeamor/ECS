# Warehouse English overlay recovery

The WMS and WES runtime Chinese-to-English overlays were previously local-only
files. They are now preserved on branch `shuttle-simulator-handoff-20261008`:

- `web-ehox-wms-ui/dist/static/custom/i18n-en.js`
- `web-ehox-wes-ui/dist/static/custom/i18n-en.js`

They translate rendered UI text. They do not patch backend JARs, database values,
equipment protocols or login logic. The source machine loads each with:

```html
<script src="/static/custom/i18n-en.js?v=7"></script>
```

The tracked WMS and WES entrypoints now include this script reference. During
the 2026-10-10 recovery, the overlays matched the mounted server image, but the
cloned entrypoints omitted the reference, leaving map legends and menu labels
untranslated. Restore the reference rather than rewriting the translation files.

On the destination, update the separate reference clone, not the dirty deployed
repository:

```bash
git -C "$HOME/ecs-simulator-source" pull --ff-only origin shuttle-simulator-handoff-20261008
```

Before installing, back up each destination `index.html` and any existing overlay.
Create each UI's `dist/static/custom` directory and copy its corresponding overlay
from the reference clone. Review the destination entrypoint. If it already loads
`/static/custom/i18n-en.js`, no entrypoint change is required; otherwise add the
script before `</body>` without changing compiled bundle links or login behavior.
Do not overwrite the destination index with the old machine's complete index.

Check Nginx `gzip_static` settings. An existing `index.html.gz` can override the
edited index when `gzip_static on`; preserve/rebuild that specific compressed
copy or disable static-gzip preference through a reviewed configuration change.
Likewise inspect an existing overlay `.gz` before relying on new JS contents.
Do not delete all compressed assets indiscriminately. Hard-refresh and verify
the overlay URL returns JavaScript, not the SPA fallback HTML, and that browser
console has no errors. Sign in and validate the screens, dropdowns and task flows.

An older ECS overlay exists at
`web-ehox-ecs-ui/dist/static/custom/i18n-en.js` in Git history. It is not currently
present in the source machine's deployed ECS folder. Do not install it blindly
into a different compiled ECS build. Review the new ECS entrypoint, existing locale
support and API dictionary behavior first. Historical ECS guidance is in
`ECS_UI_HANDOFF_2026-09-04.md`; its profile and build observations are historical.

The modified extracted WMS/WES `.properties` files elsewhere in this workspace
are not a deployed backend repair. Copying those into an `artifacts` folder does
not change an encrypted running JAR. Backend message recovery requires a separate
version-matched build/deployment procedure.
