import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface TimelineItemProps {
  index: number
  marker?: ReactNode
  children: ReactNode
}

/** Vertical timeline with a subtle spine and icon markers. */
export function Timeline({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <ol className={cn('relative ml-3 border-l border-asphalt-700 pl-8 sm:ml-6', className)}>{children}</ol>
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
      <span
        aria-hidden
        className="absolute -left-[2.45rem] top-1 flex h-7 w-7 items-center justify-center rounded-full border border-asphalt-600 bg-asphalt-800 text-accent-400 sm:-left-[2.5rem]"
      >
        {marker ?? index + 1}
      </span>
      {children}
    </motion.li>
  )
}
