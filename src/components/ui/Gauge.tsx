import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '../../lib/cn'

interface GaugeProps {
  /** 0-100 */
  value: number
  label: string
  size?: number
  className?: string
}

const START_ANGLE = -210 // degrees, 0 = 3 o'clock, clockwise positive (SVG)
const SWEEP = 240

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = (angleDeg * Math.PI) / 180
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
}

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const s = polar(cx, cy, r, startDeg)
  const e = polar(cx, cy, r, endDeg)
  const large = endDeg - startDeg > 180 ? 1 : 0
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`
}

/**
 * Speedometer-style gauge. The arc sweeps 240 degrees from bottom-left to
 * bottom-right, with a needle that rotates to the value when scrolled into view.
 */
export function Gauge({ value, label, size = 140, className }: GaugeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const clamped = Math.max(0, Math.min(100, value))
  const cx = 50
  const cy = 54
  const r = 40
  const endAngle = START_ANGLE + SWEEP
  const track = arcPath(cx, cy, r, START_ANGLE, endAngle)
  const needleAngle = START_ANGLE + (SWEEP * clamped) / 100
  const ticks = Array.from({ length: 13 }, (_, i) => START_ANGLE + (SWEEP * i) / 12)
  const danger = clamped >= 85

  return (
    <div
      ref={ref}
      className={cn('flex flex-col items-center', className)}
      style={{ width: size }}
      role="img"
      aria-label={`${label}: ${clamped} out of 100`}
    >
      <svg viewBox="0 0 100 92" width={size} height={size * 0.92} className="overflow-visible">
        {/* track */}
        <path d={track} fill="none" stroke="var(--color-asphalt-700)" strokeWidth={7} strokeLinecap="round" />
        {/* fill */}
        <motion.path
          d={track}
          fill="none"
          stroke={danger ? 'var(--color-racing-500)' : 'var(--color-amber-glow-500)'}
          strokeWidth={7}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: clamped / 100 } : { pathLength: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: danger ? 'drop-shadow(0 0 4px rgb(225 6 0 / 0.7))' : 'drop-shadow(0 0 3px rgb(245 166 35 / 0.6))' }}
        />
        {/* ticks */}
        {ticks.map((t, i) => {
          const major = i % 3 === 0
          const outer = polar(cx, cy, r + 6, t)
          const inner = polar(cx, cy, r + (major ? 2 : 4), t)
          return (
            <line
              key={t}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke={major ? 'var(--color-asphalt-200)' : 'var(--color-asphalt-500)'}
              strokeWidth={major ? 1.5 : 1}
              strokeLinecap="round"
            />
          )
        })}
        {/* needle */}
        <motion.g
          initial={{ rotate: START_ANGLE + 90 }}
          animate={{ rotate: inView ? needleAngle + 90 : START_ANGLE + 90 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: `${cx}px`, originY: `${cy}px` }}
        >
          <line
            x1={cx}
            y1={cy}
            x2={cx}
            y2={cy - r + 3}
            stroke="var(--color-racing-400)"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </motion.g>
        <circle cx={cx} cy={cy} r={4} fill="var(--color-asphalt-100)" />
        <circle cx={cx} cy={cy} r={2} fill="var(--color-racing-500)" />
        {/* value */}
        <text
          x={cx}
          y={cy + 24}
          textAnchor="middle"
          className="fill-asphalt-100 font-display tabular"
          style={{ fontSize: 16, fontWeight: 700 }}
        >
          {clamped}
        </text>
      </svg>
      <span className="mt-1 text-center font-display text-sm font-semibold uppercase tracking-wider text-asphalt-200">
        {label}
      </span>
    </div>
  )
}
