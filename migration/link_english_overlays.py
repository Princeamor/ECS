#!/usr/bin/env python3
"""Link existing WMS/WES English overlays, preserving page and gzip backups."""
import gzip
from datetime import datetime, timezone
from pathlib import Path
import re
import shutil


def main():
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%fZ")
    tag = '<script src="/static/custom/i18n-en.js?v=7"></script>'
    plans = []
    for app in ("wms", "wes"):
        root = Path("/data/apps") / f"web-ehox-{app}-ui/dist"
        page = root / "index.html"
        overlay = root / "static/custom/i18n-en.js"
        if not overlay.is_file():
            raise SystemExit(f"Missing {overlay}; no pages changed.")
        text = page.read_text(encoding="utf-8")
        if "i18n-en.js" not in text:
            if len(re.findall(r"</body>", text, re.IGNORECASE)) != 1:
                raise SystemExit(f"Expected exactly one closing body tag in {page}; no pages changed.")
            text = re.sub(r"</body>", tag + "\n</body>", text, flags=re.IGNORECASE)
        plans.append((app, page, overlay, text))
    for app, page, overlay, text in plans:
        backup = page.with_name(page.name + ".backup-" + stamp)
        shutil.copy2(page, backup)
        page.write_text(text, encoding="utf-8")
        for asset in (page, overlay):
            compressed = asset.with_name(asset.name + ".gz")
            if compressed.exists():
                shutil.copy2(compressed, compressed.with_name(compressed.name + ".backup-" + stamp))
                temporary = compressed.with_name(compressed.name + ".new-" + stamp)
                try:
                    with asset.open("rb") as source, gzip.open(temporary, "wb") as output:
                        shutil.copyfileobj(source, output)
                    shutil.copymode(compressed, temporary)
                    temporary.replace(compressed)
                finally:
                    temporary.unlink(missing_ok=True)
        print(f"{app.upper()}: translation linked. Page backup: {backup}")
    print("No services restarted. Hard-refresh WMS and WES with Ctrl+Shift+R.")


if __name__ == "__main__":
    main()
