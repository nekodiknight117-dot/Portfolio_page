import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface TimelineItemProps {
  index: number
  marker?: ReactNode
  children: ReactNode
}

/**
 * Vertical "track" timeline. The spine is a dashed centre line like road
 * markings; each entry sits beside a mile-marker dot.
 */
export function Timeline({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <ol className={cn('relative ml-3 border-l-2 border-dashed border-asphalt-600 pl-8 sm:ml-6', className)}>
      {children}
    </ol>
  )
}

export function TimelineItem({ index, marker, children }: TimelineItemProps) {
  return (
    <motion.li
      className="relative pb-12 last:pb-0"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3) }}
    >
      {/* mile marker */}
      <span
        aria-hidden
        className="absolute -left-[2.5rem] top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-racing-500 bg-asphalt-900 font-display text-xs font-bold text-asphalt-100 shadow-glow-red sm:-left-[2.55rem]"
      >
        {marker ?? index + 1}
      </span>
      {children}
    </motion.li>
  )
}
