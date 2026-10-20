# xtaka99.github.io

![site-check](https://github.com/xtaka99/xtaka99.github.io/actions/workflows/check.yml/badge.svg)

My portfolio site: **https://xtaka99.github.io**

Plain HTML, CSS and JavaScript. No framework, no build step, no trackers.
Available in **English, Portuguese and Spanish**, because I work in all three.

## How it is built

| File | Job |
|---|---|
| `index.html` | Page structure. Every piece of text carries a `data-i18n="key"` attribute |
| `css/style.css` | All styling. Colors and fonts are CSS variables at the top; dark mode follows the visitor's system setting |
| `js/translations.js` | Every text on the page in `en`, `pt` and `es`, looked up by key |
| `js/projects.js` | The project list as data. Adding a project means adding one block here, not editing HTML |
| `js/main.js` | Picks the language (`?lang=pt` in the URL, then the saved choice, then the browser language), swaps the text, renders the project list |
| `tools/check_site.py` | Fails if any language is missing a key, if the HTML uses a key with no translation, or if a project is incomplete |
| `.github/workflows/check.yml` | Runs that check on every push |

Details I cared about:

- **Accessible**: skip link, visible keyboard focus, `aria-pressed` on the language buttons, the `lang` attribute changes with the language so screen readers pronounce it correctly, and motion is disabled for visitors who ask for reduced motion
- **Safe rendering**: project data is inserted with `textContent`, never `innerHTML`
- **Works offline**: open `index.html` directly in a browser, no server needed
- **Shareable per language**: `https://xtaka99.github.io/?lang=pt` opens in Portuguese

## Editing

- Change text: edit the same key in all three languages in `js/translations.js`
- Add or update a project: edit `js/projects.js`. Use `"status": "building"` until the repo is public so the site never links to a missing page
- Then run `python tools/check_site.py` before pushing

## License

MIT
