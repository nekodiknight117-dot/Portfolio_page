import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { profile } from '../../data/profile'
import { cn } from '../../lib/cn'
import { useActiveSection } from '../../lib/useActiveSection'
import { MobileMenu } from './MobileMenu'
import { navItems, sectionIds } from './nav'

const initials = profile.name
  .split(/\s+/)
  .map((part) => part[0])
  .join('')
  .slice(0, 2)
  .toUpperCase()

/** Which nav item should be highlighted for the current route + scroll position. */
function useActiveNavId(): string | null {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const activeSection = useActiveSection(sectionIds, onHome)
  if (onHome) return activeSection
  if (pathname.startsWith('/projects')) return 'projects'
  return null
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const activeId = useActiveNavId()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          'border-b border-asphalt-700/60 bg-asphalt-900/85 backdrop-blur-md transition-shadow',
          scrolled && 'shadow-card',
        )}
      >
        <nav className="container-page flex h-16 items-center justify-between" aria-label="Primary">
          <Link to="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500 font-display text-sm font-bold text-white">
              {initials}
            </span>
            <span className="font-display text-lg font-semibold text-asphalt-100">{profile.name}</span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = item.id === activeId
              return (
                <li key={item.id}>
                  <Link
                    to={item.to}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'relative block px-3 py-2 text-sm font-medium transition-colors',
                      isActive ? 'text-white' : 'text-asphalt-300 hover:text-white',
                      'after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-accent-500 after:transition-transform after:duration-300 after:content-[""]',
                      isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-asphalt-100 hover:bg-asphalt-800 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>
      <MobileMenu open={open} activeId={activeId} onClose={() => setOpen(false)} />
    </header>
  )
}
