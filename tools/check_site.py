"""Quality check for the site. Run with:  python tools/check_site.py

Catches the mistakes that are easy to make when editing a three-language site:
  - a text key that exists in English but is missing in Portuguese or Spanish
  - a data-i18n="..." in index.html that has no translation
  - a project missing a summary in one language, or with an unknown status

GitHub Actions runs this on every push (see .github/workflows/check.yml).
Exit code 0 = all good, 1 = problems found.
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LANGUAGES = ["en", "pt", "es"]
STATUSES = {"live", "building", "planned"}


def load_js_data(path: Path):
    """The data files are 'window.NAME = <JSON>;'. Cut out the JSON and parse it."""
    text = path.read_text(encoding="utf-8")
    start = text.index("=", text.index("window.")) + 1
    body = text[start:].strip().rstrip(";")
    return json.loads(body)


def main() -> int:
    problems: list[str] = []

    try:
        translations = load_js_data(ROOT / "js" / "translations.js")
        projects = load_js_data(ROOT / "js" / "projects.js")
    except (ValueError, OSError) as err:
        print(f"FAIL: could not read the data files: {err}")
        print("Hint: look for a missing quote or a comma after the last item in a list.")
        return 1

    # 1. every language has exactly the same keys, none empty
    reference = set(translations["en"])
    for lang in LANGUAGES:
        keys = set(translations.get(lang, {}))
        for key in sorted(reference - keys):
            problems.append(f"translations: '{key}' is missing in '{lang}'")
        for key in sorted(keys - reference):
            problems.append(f"translations: '{key}' exists in '{lang}' but not in 'en'")
        for key, value in translations.get(lang, {}).items():
            if not str(value).strip():
                problems.append(f"translations: '{key}' is empty in '{lang}'")

    # 2. every data-i18n key used in the HTML exists
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    for key in sorted(set(re.findall(r'data-i18n="([^"]+)"', html))):
        if key not in reference:
            problems.append(f"index.html uses data-i18n=\"{key}\" but it has no translation")

    # 3. projects are complete
    seen = set()
    for project in projects:
        name = project.get("repo", "<no repo name>")
        if name in seen:
            problems.append(f"projects: '{name}' is listed twice")
        seen.add(name)
        if project.get("status") not in STATUSES:
            problems.append(f"projects: '{name}' has unknown status {project.get('status')!r}")
        if not project.get("stack"):
            problems.append(f"projects: '{name}' has no stack")
        for lang in LANGUAGES:
            if not project.get("summary", {}).get(lang, "").strip():
                problems.append(f"projects: '{name}' has no '{lang}' summary")

    if problems:
        print(f"FAIL: {len(problems)} problem(s)")
        for p in problems:
            print("  -", p)
        return 1

    print(f"OK: {len(reference)} text keys x {len(LANGUAGES)} languages, "
          f"{len(projects)} projects")
    return 0


if __name__ == "__main__":
    sys.exit(main())
