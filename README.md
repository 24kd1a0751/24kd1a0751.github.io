# Meghanadh Potupureddi – Portfolio

Static website (HTML, CSS, JavaScript). No build step, no dependencies.

## Run locally
**Quickest:** double-click `index.html`.

**Local server (recommended):**
```
cd portfolio
python -m http.server 8000
```
Open http://localhost:8000

## Things to edit
- LinkedIn: open `script.js` and paste your profile URL into `LINKEDIN_URL`.
- Project GitHub buttons: add them in `index.html` inside each `.project-body` once you have repository URLs.
- Photo: replace `assets/images/my-photo.jpg` (keep the file name).

## Notes
- Fonts (Sora, Inter) load from Google Fonts; the site falls back to system fonts when offline.
- The contact form opens the visitor's email app (mailto). For direct delivery, connect a form service such as Formspree or Web3Forms.
- Deploy free on GitHub Pages, Netlify or Vercel by uploading this folder.
