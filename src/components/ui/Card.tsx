import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '../../lib/cn'

interface CardProps extends ComponentPropsWithoutRef<'div'> {
  /** Adds a red hover border + lift. */
  interactive?: boolean
}

export function Card({ className, interactive = false, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'surface relative overflow-hidden',
        interactive &&
          'transition-all duration-300 hover:-translate-y-1 hover:border-racing-500/70 hover:shadow-glow-red',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
