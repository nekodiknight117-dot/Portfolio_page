import { useEffect, useRef } from 'react'

const DPR_CAP = 1.5
const COUNT = 200
const FALL = 250
const TRAIL_GAP = 4
/** Short streak — reads as a particle, not a ribbon. */
const TRAIL_MAX = 7
const VIEW_PAD = 80
/** How far above the page the spawn queue stretches. */
const SPAWN_QUEUE = 900
const MIST = ['150,156,164', '130,136,144', '110,116,124']
const MIST_ALPHA = 0.12

interface Wisp {
  x: number
  y: number
  vx: number
  vy: number
  trail: number[]
  phase: number
  width: number
  rgb: string
}

/** Keep in sync with RoadBackground / --road-edge-inset */
const EDGE_INSET = 0.04

function pageSize() {
  const doc = document.documentElement
  return {
    // Use viewport width only — scrollWidth can widen if something overflows.
    w: window.innerWidth,
    h: Math.max(window.innerHeight, doc.scrollHeight),
  }
}

function roadBounds(pageW: number) {
  const pad = Math.max(20, pageW * EDGE_INSET + 14)
  return { left: pad, right: pageW - pad }
}

function restyle(s: Wisp) {
  s.vx = (Math.random() - 0.5) * 22
  s.vy = FALL * (0.85 + Math.random() * 0.3)
  s.phase = Math.random() * Math.PI * 2
  s.width = 1.1 + Math.random() * 1.6
  s.rgb = MIST[Math.floor(Math.random() * MIST.length)] ?? MIST[0]!
}

/** Always enter from above the top of the page, between the road borders. */
function spawnFromTop(s: Wisp, pageW: number, headY = -24 - Math.random() * SPAWN_QUEUE) {
  restyle(s)
  const { left, right } = roadBounds(pageW)
  s.x = left + Math.random() * Math.max(1, right - left)
  s.y = Math.min(headY, -12)
  s.trail.length = 0
  for (let i = TRAIL_MAX; i >= 0; i--) {
    s.trail.push(
      s.x + Math.sin(s.phase + i * 0.4) * 1.5,
      s.y - i * TRAIL_GAP,
    )
  }
}

function pushTrail(s: Wisp) {
  const n = s.trail.length
  if (n >= 2) {
    const dx = s.x - s.trail[n - 2]!
    const dy = s.y - s.trail[n - 1]!
    if (dx * dx + dy * dy < TRAIL_GAP * TRAIL_GAP) return
  }
  s.trail.push(s.x, s.y)
  const cap = TRAIL_MAX * 2
  if (s.trail.length > cap) s.trail.splice(0, s.trail.length - cap)
}

function strokeParticle(
  ctx: CanvasRenderingContext2D,
  trail: number[],
  rgb: string,
  width: number,
  ox: number,
  oy: number,
) {
  const pts = trail.length / 2
  if (pts < 2) return
  ctx.strokeStyle = `rgb(${rgb})`
  ctx.lineWidth = width
  ctx.beginPath()
  ctx.moveTo(trail[0]! - ox, trail[1]! - oy)
  for (let i = 1; i < pts; i++) {
    ctx.lineTo(trail[i * 2]! - ox, trail[i * 2 + 1]! - oy)
  }
  ctx.stroke()

  // Soft head so it reads as a speck of mist.
  const hx = trail[trail.length - 2]! - ox
  const hy = trail[trail.length - 1]! - oy
  ctx.fillStyle = `rgb(${rgb})`
  ctx.beginPath()
  ctx.arc(hx, hy, width * 0.9, 0, Math.PI * 2)
  ctx.fill()
}

function startAirflow(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const wisps: Wisp[] = []
  const layer = document.createElement('canvas')
  const offscreen = layer.getContext('2d')
  if (!offscreen) return () => {}
  // Rebind so nested closures keep a definite (non-null) context reference.
  const layerCtx: CanvasRenderingContext2D = offscreen
  let raf = 0
  let last = performance.now()
  let running = true
  let sx = window.scrollX
  let sy = window.scrollY
  let dpr = 1

  function sizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)
    const w = window.innerWidth
    const h = window.innerHeight
    const bw = Math.floor(w * dpr)
    const bh = Math.floor(h * dpr)
    canvas.width = bw
    canvas.height = bh
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    layer.width = bw
    layer.height = bh
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    layerCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  function seed() {
    const { w: pageW, h: pageH } = pageSize()
    wisps.length = 0
    // Queue particles above the page so they stream in continuously from the top.
    const queue = Math.max(SPAWN_QUEUE, pageH * 0.85)
    for (let i = 0; i < COUNT; i++) {
      const s: Wisp = {
        x: 0,
        y: 0,
        vx: 0,
        vy: FALL,
        trail: [],
        phase: 0,
        width: 1.5,
        rgb: MIST[0]!,
      }
      const headY = -20 - ((i + Math.random()) / COUNT) * queue
      spawnFromTop(s, pageW, headY)
      wisps.push(s)
    }
  }

  function onScroll() {
    sx = window.scrollX
    sy = window.scrollY
  }

  function tick(now: number) {
    if (!running) return
    const dt = Math.min((now - last) / 1000, 0.05)
    last = now
    const w = window.innerWidth
    const h = window.innerHeight
    sx = window.scrollX
    sy = window.scrollY
    const { w: pageW, h: pageH } = pageSize()

    for (const s of wisps) {
      s.vx += Math.sin(s.phase + now * 0.002) * 28 * dt
      s.vx += Math.sin(s.y * 0.03 + s.phase) * 16 * dt
      s.x += s.vx * dt
      s.y += s.vy * dt
      s.vy += (FALL - s.vy) * Math.min(1, dt * 2)
      s.vx *= Math.pow(0.4, dt)
      s.vx = Math.max(-110, Math.min(110, s.vx))
      s.vy = Math.max(FALL * 0.7, Math.min(FALL * 1.25, s.vy))
    }

    layerCtx.clearRect(0, 0, w, h)
    layerCtx.lineCap = 'round'
    layerCtx.lineJoin = 'round'

    for (const s of wisps) {
      const { left, right } = roadBounds(pageW)
      const finished = s.y > pageH + VIEW_PAD || s.x < left - 40 || s.x > right + 40
      // Recycle only at the top so generation stays a continuous top-down stream.
      if (finished) spawnFromTop(s, pageW, -24 - Math.random() * 140)
      else pushTrail(s)

      if (s.trail.length < 2) continue
      strokeParticle(layerCtx, s.trail, s.rgb, s.width, sx, sy)
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.globalAlpha = MIST_ALPHA
    ctx.drawImage(layer, 0, 0)
    ctx.globalAlpha = 1
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    raf = requestAnimationFrame(tick)
  }

  function onVisibility() {
    if (document.hidden) {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
      return
    }
    last = performance.now()
    if (!raf) raf = requestAnimationFrame(tick)
  }

  sizeCanvas()
  seed()
  raf = requestAnimationFrame(tick)
  window.addEventListener('resize', sizeCanvas)
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('visibilitychange', onVisibility)
  return () => {
    running = false
    if (raf) cancelAnimationFrame(raf)
    window.removeEventListener('resize', sizeCanvas)
    window.removeEventListener('scroll', onScroll)
    document.removeEventListener('visibilitychange', onVisibility)
  }
}

/** Soft mist particles that drift under the page content. */
export function AirflowOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    return startAirflow(canvas, ctx)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1]"
    />
  )
}
