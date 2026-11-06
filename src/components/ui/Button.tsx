import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-display font-semibold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary: 'bg-accent-500 text-white hover:bg-accent-400 hover:shadow-glow active:bg-accent-600',
  secondary:
    'border border-asphalt-600 bg-asphalt-800 text-asphalt-100 hover:border-asphalt-400 hover:bg-asphalt-700 hover:text-asphalt-100',
  ghost: 'text-asphalt-200 hover:text-asphalt-100 hover:bg-asphalt-700',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-xs',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-7 text-base',
}

interface StyleProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

function classesFor({ variant = 'primary', size = 'md', className }: StyleProps) {
  return cn(base, variants[variant], sizes[size], className)
}

/** Native button. */
export function Button({
  variant,
  size,
  className,
  children,
  ...rest
}: StyleProps & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>) {
  return (
    <button className={classesFor({ variant, size, className, children })} {...rest}>
      {children}
    </button>
  )
}

/** Internal navigation styled as a button. */
export function LinkButton({
  to,
  variant,
  size,
  className,
  children,
}: StyleProps & { to: string }) {
  return (
    <Link to={to} className={classesFor({ variant, size, className, children })}>
      {children}
    </Link>
  )
}

/** External link styled as a button. Opens in a new tab by default. */
export function AnchorButton({
  href,
  variant,
  size,
  className,
  children,
  ...rest
}: StyleProps &
  Omit<ComponentPropsWithoutRef<'a'>, 'className' | 'children' | 'href'> & { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classesFor({ variant, size, className, children })}
      {...rest}
    >
      {children}
    </a>
  )
}
