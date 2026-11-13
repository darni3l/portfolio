import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Deployment paths (both are optional locally, the GitHub workflow sets them).
 *
 *  VITE_BASE_PATH  Where the site is served from.
 *                  Project site  (github.com/<user>/<repo>)  ->  "/<repo>/"
 *                  User/org site (<user>.github.io repo)      ->  "/"
 *  VITE_SITE_URL   Public URL, used only for absolute Open Graph URLs.
 */
const normaliseBase = (value = '/') => `/${value.replace(/^\/+|\/+$/g, '')}/`.replace('//', '/')
const base = normaliseBase(process.env.VITE_BASE_PATH || '/')
const siteUrl = (process.env.VITE_SITE_URL || '/').replace(/\/?$/, '/')

// Replaces %SITE_URL% in index.html (Vite only does this natively for VITE_* names).
const siteUrlInHtml = () => ({
  name: 'site-url-in-html',
  transformIndexHtml: { order: 'pre', handler: (html) => html.replaceAll('%SITE_URL%', siteUrl) },
})

export default defineConfig({
  base,
  plugins: [react(), siteUrlInHtml()],
})
