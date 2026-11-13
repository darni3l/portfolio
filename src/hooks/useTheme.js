import { useCallback, useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'theme'
const VALID = ['light', 'dark', 'system']

const readPreference = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return VALID.includes(stored) ? stored : 'system'
  } catch {
    return 'system'
  }
}

const resolve = (preference, systemDark) =>
  preference === 'system' ? (systemDark ? 'dark' : 'light') : preference

/**
 * Theme state: 'light' | 'dark' | 'system'.
 * The inline script in index.html sets the first value before paint; this hook
 * keeps it in sync afterwards, persists the choice and updates <meta theme-color>.
 */
export function useTheme() {
  const [preference, setPreference] = useState(readPreference)
  const [resolved, setResolved] = useState(
    () => document.documentElement.dataset.theme || 'light',
  )
  const hasMounted = useRef(false)

  useEffect(() => {
    const root = document.documentElement
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    let timer

    const apply = () => {
      const next = resolve(preference, media.matches)
      if (hasMounted.current && root.dataset.theme !== next) {
        root.classList.add('theme-transition')
        window.clearTimeout(timer)
        timer = window.setTimeout(() => root.classList.remove('theme-transition'), 250)
      }
      root.dataset.theme = next
      root.style.colorScheme = next
      setResolved(next)

      const meta = document.querySelector('meta[name="theme-color"]')
      const bg = getComputedStyle(root).getPropertyValue('--color-bg').trim()
      if (meta && bg) meta.setAttribute('content', bg)
    }

    apply()
    hasMounted.current = true

    if (preference === 'system') {
      media.addEventListener('change', apply)
      return () => {
        media.removeEventListener('change', apply)
        window.clearTimeout(timer)
      }
    }
    return () => window.clearTimeout(timer)
  }, [preference])

  // Keep several open tabs consistent.
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === STORAGE_KEY) setPreference(readPreference())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const choose = useCallback((value) => {
    if (!VALID.includes(value)) return
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* storage unavailable (private mode): the choice still applies for this visit */
    }
    setPreference(value)
  }, [])

  return { preference, resolved, choose }
}
