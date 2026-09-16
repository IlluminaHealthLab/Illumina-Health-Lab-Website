import { useEffect, useRef } from 'react'

/**
 * ParticleField
 * A lightweight canvas of slowly drifting dots + faint connecting lines, used
 * as ambient texture behind sections. Dependency-free; respects
 * prefers-reduced-motion by rendering a single static frame.
 *
 * Props:
 *   density  – rough particles per 100k px² (default 2.4)
 *   color    – dot color (default coral)
 *   linkColor – connecting-line color
 *   className – positioning classes (usually absolute inset-0)
 */
export default function ParticleField({
  density = 2.4,
  color = '241, 91, 97', // coral rgb
  linkColor = '7, 27, 77', // navy rgb
  className = '',
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const parent = canvas.parentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let particles = []
    let raf = null
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function build() {
      const rect = parent.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(10, Math.round((w * h) / 100000 * density))
      particles = Array.from({ length: count }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.6 + 0.6,
        a: Math.random() * 0.5 + 0.25,
      }))
    }

    function draw() {
      ctx.clearRect(0, 0, w, h)
      // links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p = particles[i]
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist = Math.hypot(dx, dy)
          if (dist < 110) {
            ctx.strokeStyle = `rgba(${linkColor}, ${0.06 * (1 - dist / 110)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
      }
      // dots
      for (const p of particles) {
        ctx.fillStyle = `rgba(${color}, ${p.a})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function step() {
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      }
      draw()
      raf = requestAnimationFrame(step)
    }

    build()
    if (reduce) {
      draw()
    } else {
      step()
    }

    const onResize = () => {
      build()
      if (reduce) draw()
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [density, color, linkColor])

  return <canvas ref={canvasRef} className={`pointer-events-none ${className}`} aria-hidden="true" />
}
