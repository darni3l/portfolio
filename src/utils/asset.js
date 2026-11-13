// Resolve a path inside /public so it works under any GitHub Pages base path.
export const asset = (path = '') => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
