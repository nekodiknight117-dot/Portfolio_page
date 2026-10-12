import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface SectionHeadingProps {
  /** Small uppercase label above the title, e.g. "Projects". */
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
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      <h2 className="text-3xl sm:text-4xl">{title}</h2>
      <div aria-hidden className={cn('accent-line mt-3 h-0.5 w-12 rounded-full', centered && 'mx-auto')} />
      {description && (
        <p className={cn('mt-4 max-w-2xl text-asphalt-300', centered && 'mx-auto')}>{description}</p>
      )}
    </div>
  )
}
