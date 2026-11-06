import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { AirflowOverlay } from '../effects/AirflowOverlay'
import { RoadBackground } from '../effects/RoadBackground'
import { BackToTop } from './BackToTop'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

/**
 * App shell: navbar, routed content, footer.
 * On navigation, scrolls to the hash target (a section of the one-page scroller)
 * or to the top when there is no hash.
 */
export function Layout() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      // Wait a frame so the destination section has been committed to the DOM.
      const frame = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView()
      })
      return () => cancelAnimationFrame(frame)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash, key])

  return (
    <div className="relative z-0 flex min-h-screen flex-col">
      <RoadBackground />
      <AirflowOverlay />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-[var(--road-content-gutter)] focus:top-4 focus:z-[100] focus:rounded focus:bg-accent-500 focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="relative z-10 flex min-h-screen w-full flex-1 flex-col px-[var(--road-content-gutter)]">
        <Navbar />
        <main id="main" className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </div>
  )
}
