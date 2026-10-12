import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface SectionHeadingProps {
  /** Small uppercase label above the title, e.g. "01 / Projects". */
  eyebrow?: string
  title: string
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <div className={cn('mb-10', centered && 'text-center', className)}>
      {eyebrow && (
        <p className="mb-2 font-display text-xs font-semibold uppercase tracking-[0.3em] text-racing-500">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl">{title}</h2>
      <div
        aria-hidden
        className={cn('racing-stripe mt-3 h-1 w-24 rounded-full', centered && 'mx-auto')}
      />
      {description && (
        <p className={cn('mt-4 max-w-2xl text-asphalt-300', centered && 'mx-auto')}>
          {description}
        </p>
      )}
    </div>
  )
}
