import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'

interface SkillBarProps {
  /** 0-100 */
  value: number
  label: string
  className?: string
}

/** Horizontal proficiency bar that fills when scrolled into view. */
export function SkillBar({ value, label, className }: SkillBarProps) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className={cn('w-full', className)} role="img" aria-label={`${label}: ${clamped} out of 100`}>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-asphalt-100">{label}</span>
        <span className="text-xs tabular text-asphalt-400">{clamped}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-asphalt-700">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent-500 to-highlight-500"
          initial={{ width: 0 }}
          whileInView={{ width: `${clamped}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}
