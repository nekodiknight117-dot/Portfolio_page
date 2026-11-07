import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

interface SectionProps {
  /** Anchor id matching `navItems` so the navbar can link to and track it. */
  id: string
  className?: string
  children: ReactNode
}

/** One block of the single-page scroller: anchored, offset for the sticky navbar. */
export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn('scroll-mt-16', className)}>
      <div className="container-page py-20 lg:py-28">{children}</div>
    </section>
  )
}
