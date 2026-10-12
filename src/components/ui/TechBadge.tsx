import { cn } from '../../lib/cn'

interface TechBadgeProps {
  label: string
  active?: boolean
  onClick?: () => void
  className?: string
}

/** Small pill used for technologies. Becomes a toggle button when `onClick` is set. */
export function TechBadge({ label, active = false, onClick, className }: TechBadgeProps) {
  const classes = cn(
    'inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium transition-colors',
    active
      ? 'border-accent-500/60 bg-accent-500/15 text-accent-400'
      : 'border-asphalt-600 bg-asphalt-800 text-asphalt-300',
    onClick && 'cursor-pointer hover:border-asphalt-400 hover:text-asphalt-100',
    className,
  )

  if (onClick) {
    return (
      <button type="button" onClick={onClick} aria-pressed={active} className={classes}>
        {label}
      </button>
    )
  }
  return <span className={classes}>{label}</span>
}
