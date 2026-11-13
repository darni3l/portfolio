# Daniel Ogundero: portfolio

React + Vite single-page site with light and dark themes, deployed to GitHub Pages.
All content is in `src/data/`. All colours are in `src/styles/tokens.css`.

## Run locally

```bash
npm install
npm run dev            # http://localhost:5173
npm run build          # production build in dist/
npm run preview        # serve the build
npm run check:contrast # WCAG AA check for both themes
```

Requires Node 20 or newer (tested on Node 22).

## Edit content (no component code needed)

| To change | Edit |
| --- | --- |
| Name, title, intro, "Next" card, photo | `src/data/profile.js` |
| Email, LinkedIn, GitHub, CV link | `src/data/links.js` |
| Projects (text, tools, results, links, figures) | `src/data/projects.js` |
| Bench experience | `src/data/experience.js` |
| Skills (grouped by evidence level) | `src/data/skills.js` |
| Education and languages | `src/data/education.js` |
| Section titles and nav labels | `src/data/site.js` |
| Palette, type scale, spacing | `src/styles/tokens.css` |
| Page title, SEO description, social card tags | `index.html` |

## Assets to add

| File | Notes |
| --- | --- |
| `public/assets/cv.pdf` | Currently a **placeholder PDF**. Replace it, keep the name. |
| `public/images/projects/case-01.png` (`-02`, `-03`) | 1600 x 900 px, PNG or SVG. Then set `src`, `alt` and optional `darkSrc` in `projects.js`. Until then a labelled placeholder is shown. |
| `public/images/og-card.png` | 1200 x 630 px social preview. A text-only one is included. |
| `public/images/profile.jpg` (optional) | Then set `photo` in `profile.js`. |

## Theme

Light values sit on `:root`, dark values on `[data-theme="dark"]` in `tokens.css`.
A tiny inline script in `index.html` sets the theme before first paint. If you change
`--color-bg` in either theme, update the two matching hex values in that script as well.
The toggle offers Light, Dark and System; the choice is stored in `localStorage` (key `theme`).

## Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Initial commit: portfolio"
git branch -M main
git remote add origin https://github.com/darni3l/portfolio.git
git push -u origin main
```

Then on GitHub: **Settings, Pages, Source: GitHub Actions**. Every push to `main` builds and deploys.

- The workflow sets the base path from the repository name automatically
  (`/<repo>/` for project sites, `/` for a repository named `<user>.github.io`).
- To build manually for a project site: `VITE_BASE_PATH=/portfolio/ VITE_SITE_URL=https://darni3l.github.io/portfolio/ npm run build`.
- Using a custom domain: set `VITE_BASE_PATH=/` and `VITE_SITE_URL` to your domain in the workflow.
