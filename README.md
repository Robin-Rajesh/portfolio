# Robin Rajesh · Portfolio

Personal portfolio site: plain HTML, CSS and JavaScript with no build step.

**Live:** https://robin-rajesh.github.io/portfolio/ (once GitHub Pages is enabled)

## Structure

| Path | What it is |
|---|---|
| `index.html` | The whole site: intro, work, projects, education |
| `styles.css` | Styles; follows the system light/dark setting |
| `fx.js` | Scroll effects (skipped when the visitor prefers reduced motion) |
| `assets/Robin_Rajesh_Resume.pdf` | Downloadable résumé |
| `resume/resume.html` | Source for the résumé PDF |

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy with GitHub Pages

Settings → Pages → Source: **Deploy from a branch** → Branch: `main` / `(root)`.

## Regenerate the résumé PDF

Open `resume/resume.html` in Chrome, choose Print → Save as PDF (A4, no headers/footers), and save it as `assets/Robin_Rajesh_Resume.pdf`.

After changing `styles.css` or `fx.js`, bump the `?v=` number on their links in `index.html` so browsers don't pair the new page with a cached old file.
