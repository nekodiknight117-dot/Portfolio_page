import { cn } from '../../lib/cn'

interface SkillPillProps {
  name: string
  className?: string
}

/** Simple skill tag used inside category cards. */
export function SkillPill({ name, className }: SkillPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg border border-asphalt-600 bg-asphalt-900 px-3 py-1.5 text-sm font-medium text-asphalt-100',
        className,
      )}
    >
      {name}
    </span>
  )
}
