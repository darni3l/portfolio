import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently crossing the upper part of the viewport.
 * `topId` is the page top (hero): when it is active, no nav link is highlighted.
 */
export function useActiveSection(ids, topId = 'top') {
  const [active, setActive] = useState(null)
  const key = ids.join('|')

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined
    const elements = [topId, ...ids].map((id) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id === topId ? null : entry.target.id)
        })
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, topId])

  return active
}
