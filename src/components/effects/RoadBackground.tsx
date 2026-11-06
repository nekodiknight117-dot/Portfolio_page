import { useEffect, useRef } from 'react'

const BG = '#f4f5f7'
const ROAD = '#e8eaee'
const EDGE = 'rgba(18, 21, 26, 0.2)'
const DASH = 'rgba(55, 65, 81, 0.45)'
const SPEED = 250
const DPR_CAP = 1.5
/** Keep in sync with --road-edge-inset in index.css */
const EDGE_INSET = 0.04

function startRoad(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let reduced = motion.matches
  let raf = 0
  let offset = 0
  let last = performance.now()
  let running = true

  const onMotion = () => {
    reduced = motion.matches
    if (reduced) draw(performance.now())
  }
  motion.addEventListener('change', onMotion)

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)
    const w = window.innerWidth
    const h = window.innerHeight
    canvas.width = Math.floor(w * dpr)
    canvas.height = Math.floor(h * dpr)
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    draw(performance.now())
  }

  function draw(now: number) {
    const w = window.innerWidth
    const h = window.innerHeight
    const dt = Math.min((now - last) / 1000, 0.05)
    last = now
    if (!reduced) offset += dt * SPEED

    ctx.fillStyle = BG
    ctx.fillRect(0, 0, w, h)

    const cx = w / 2

    ctx.fillStyle = ROAD
    ctx.fillRect(0, 0, w, h)

    const laneMid = cx
    const leftEdge = w * EDGE_INSET
    const rightEdge = w * (1 - EDGE_INSET)

    ctx.strokeStyle = EDGE
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.moveTo(leftEdge, 0)
    ctx.lineTo(leftEdge, h)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(rightEdge, 0)
    ctx.lineTo(rightEdge, h)
    ctx.stroke()

    const dash = 28
    const gap = 22
    const period = dash + gap
    ctx.strokeStyle = DASH
    ctx.lineWidth = 2
    ctx.beginPath()

    // Offset is subtracted so markings travel down the screen (camera moving forward).
    let drawing = false
    const step = 2
    for (let y = 0; y <= h; y += step) {
      const world = y - offset
      const phase = ((world % period) + period) % period
      const on = phase < dash
      if (on && !drawing) {
        ctx.moveTo(laneMid, y)
        drawing = true
      } else if (on && drawing) {
        ctx.lineTo(laneMid, y)
      } else if (!on && drawing) {
        drawing = false
      }
    }
    ctx.stroke()

    const leftFade = ctx.createLinearGradient(0, 0, w * 0.08, 0)
    leftFade.addColorStop(0, BG)
    leftFade.addColorStop(1, 'rgba(244, 245, 247, 0)')
    ctx.fillStyle = leftFade
    ctx.fillRect(0, 0, w * 0.12, h)

    const rightFade = ctx.createLinearGradient(w, 0, w * 0.92, 0)
    rightFade.addColorStop(0, BG)
    rightFade.addColorStop(1, 'rgba(244, 245, 247, 0)')
    ctx.fillStyle = rightFade
    ctx.fillRect(w * 0.88, 0, w * 0.12, h)

    const topGlow = ctx.createRadialGradient(cx, -h * 0.15, 0, cx, -h * 0.15, h * 0.7)
    topGlow.addColorStop(0, 'rgba(255, 255, 255, 0.55)')
    topGlow.addColorStop(1, 'rgba(255, 255, 255, 0)')
    ctx.fillStyle = topGlow
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = 'rgba(244, 245, 247, 0.42)'
    ctx.fillRect(0, 0, w, h)
  }

  function loop(now: number) {
    if (!running) return
    draw(now)
    if (!reduced) raf = requestAnimationFrame(loop)
  }

  function onVisibility() {
    if (document.hidden) {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
      return
    }
    last = performance.now()
    if (!reduced && !raf) raf = requestAnimationFrame(loop)
  }

  resize()
  if (!reduced) raf = requestAnimationFrame(loop)

  window.addEventListener('resize', resize)
  document.addEventListener('visibilitychange', onVisibility)
  return () => {
    running = false
    if (raf) cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
    document.removeEventListener('visibilitychange', onVisibility)
    motion.removeEventListener('change', onMotion)
  }
}

/**
 * Fixed bird’s-eye two-lane road that scrolls as if the camera is traveling on it.
 * No cars or headlights — just pavement and lane paint in the site palette.
 */
export function RoadBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    return startRoad(canvas, ctx)
  }, [])

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-0" />
}
