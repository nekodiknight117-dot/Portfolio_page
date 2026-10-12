import { animate, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/cn'

interface StatCounterProps {
  value: number
  suffix?: string
  label: string
  className?: string
}

/** Animated statistic: counts up from 0 to `value` when scrolled into view. */
export function StatCounter({ value, suffix, label, className }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <div ref={ref} className={cn('flex flex-col items-center text-center', className)}>
      <p className="font-display text-4xl font-bold tabular text-asphalt-100 sm:text-5xl">
        {display.toLocaleString('en-US')}
        {suffix && <span className="text-accent-400">{suffix}</span>}
      </p>
      <p className="mt-2 text-sm text-asphalt-300">{label}</p>
    </div>
  )
}
