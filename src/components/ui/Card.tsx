import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '../../lib/cn'

interface CardProps extends ComponentPropsWithoutRef<'div'> {
  /** Adds a hover border highlight + lift. */
  interactive?: boolean
}

export function Card({ className, interactive = false, children, ...rest }: CardProps) {
  return (
    <div
      data-air-obstacle
      className={cn(
        'surface relative overflow-hidden',
        interactive &&
          'transition-all duration-300 hover:-translate-y-1 hover:border-asphalt-500 hover:shadow-glow',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
