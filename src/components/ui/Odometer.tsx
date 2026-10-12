import { animate, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/cn'

interface OdometerProps {
  value: number
  suffix?: string
  label: string
  className?: string
}

/**
 * Odometer-style counter: rolls up from 0 to `value` when scrolled into view,
 * rendered in a zero-padded monospaced "mechanical" style.
 */
export function Odometer({ value, suffix, label, className }: OdometerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  const digits = String(value).length
  const padded = String(display).padStart(digits, '0')

  return (
    <div ref={ref} className={cn('flex flex-col items-center text-center', className)}>
      <div className="flex items-baseline gap-1">
        <span
          className="inline-flex gap-0.5 rounded-md border border-asphalt-600 bg-asphalt-950 px-2 py-1 font-display text-3xl font-bold tabular text-amber-glow-400 text-glow-amber sm:text-4xl"
          aria-label={`${value}${suffix ?? ''}`}
        >
          {padded.split('').map((d, i) => (
            <span key={i} className="inline-block w-[0.7em] text-center">
              {d}
            </span>
          ))}
        </span>
        {suffix && (
          <span className="font-display text-2xl font-bold text-racing-500">{suffix}</span>
        )}
      </div>
      <span className="mt-2 font-display text-xs font-semibold uppercase tracking-[0.2em] text-asphalt-300">
        {label}
      </span>
    </div>
  )
}
