import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { Link } from 'react-router'
import { cn } from '../../lib/cn'
import { navItems } from './nav'

interface MobileMenuProps {
  open: boolean
  activeId: string | null
  onClose: () => void
}

export function MobileMenu({ open, activeId, onClose }: MobileMenuProps) {
  // Lock body scroll and close on Escape while open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 top-16 z-40 bg-asphalt-100/35 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-[var(--road-content-gutter)] top-16 z-50 border-b border-asphalt-700 bg-asphalt-900 lg:hidden"
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="container-page flex flex-col py-3">
              {navItems.map((item) => {
                const isActive = item.id === activeId
                return (
                  <li key={item.id}>
                    <Link
                      to={item.to}
                      onClick={onClose}
                      aria-current={isActive ? 'location' : undefined}
                      className={cn(
                        'flex items-center justify-between border-l-2 px-4 py-3 text-base font-medium transition-colors',
                        isActive
                          ? 'border-accent-500 bg-asphalt-700 text-asphalt-100'
                          : 'border-transparent text-asphalt-300 hover:bg-asphalt-700 hover:text-asphalt-100',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
