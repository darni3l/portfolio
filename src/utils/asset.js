// Resolve a file from /public so it works under any GitHub Pages base path.
// Accepts "images/a.png", "/images/a.png" or "public/images/a.png" (the on-disk path): all give the same URL.
export const asset = (path = '') =>
  `${import.meta.env.BASE_URL}${path.replace(/^\.?\/+/, '').replace(/^public\//, '')}`
