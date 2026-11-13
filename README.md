# Daniel Ogundero: portfolio

React + Vite single-page site with light and dark themes, deployed to GitHub Pages.
All content is in `src/data/`. All colours are in `src/styles/tokens.css`.


Requires Node 20 or newer (tested on Node 22).

## Edit content 

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

## Theme

Light values sit on `:root`, dark values on `[data-theme="dark"]` in `tokens.css`.
A tiny inline script in `index.html` sets the theme before first paint. If you change
`--color-bg` in either theme, update the two matching hex values in that script as well.
The toggle offers Light, Dark and System; the choice is stored in `localStorage` (key `theme`).

