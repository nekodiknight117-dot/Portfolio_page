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
    'inline-flex items-center rounded border px-2.5 py-1 font-display text-xs font-semibold uppercase tracking-wider transition-colors',
    active
      ? 'border-racing-500 bg-racing-500/15 text-racing-400'
      : 'border-asphalt-600 bg-asphalt-800 text-asphalt-300',
    onClick && 'cursor-pointer hover:border-racing-500 hover:text-asphalt-100',
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
