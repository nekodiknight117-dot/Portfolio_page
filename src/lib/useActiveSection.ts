import { useEffect, useState } from 'react'

/** Vertical offset (px) below the top of the viewport at which a section counts as "current". */
const ACTIVATION_OFFSET = 120

/**
 * Tracks which of the given section ids is currently in view while scrolling.
 * Returns the id of the last section whose top has passed the activation line,
 * or the final id when the page is scrolled to the bottom.
 */
export function useActiveSection(ids: readonly string[], enabled = true): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return

    let frame = 0
    const update = () => {
      frame = 0
      const doc = document.documentElement
      const atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 2
      if (atBottom) {
        setActive(ids[ids.length - 1] ?? null)
        return
      }
      let current: string | null = ids[0] ?? null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= ACTIVATION_OFFSET) current = id
      }
      setActive(current)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ids, enabled])

  return enabled ? active : null
}
