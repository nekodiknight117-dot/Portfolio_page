import { Gauge, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { profile } from '../../data/profile'
import { cn } from '../../lib/cn'
import { RacingStripe } from '../ui/RacingStripe'
import { MobileMenu } from './MobileMenu'
import { navItems } from './nav'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // The mobile drawer closes itself on link click (see MobileMenu); the logo
  // link also closes it via onClick below.
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
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-racing-500 text-white shadow-glow-red transition-transform group-hover:rotate-12">
              <Gauge size={20} strokeWidth={2.5} />
            </span>
            <span className="font-display text-xl font-bold uppercase tracking-wider text-asphalt-100">
              {profile.name}
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'relative block px-3 py-2 font-display text-sm font-semibold uppercase tracking-wider transition-colors',
                      isActive ? 'text-white' : 'text-asphalt-300 hover:text-white',
                      'after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-racing-500 after:transition-transform after:duration-300 after:content-[""]',
                      isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
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
      <RacingStripe className="h-[3px]" />
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  )
}
