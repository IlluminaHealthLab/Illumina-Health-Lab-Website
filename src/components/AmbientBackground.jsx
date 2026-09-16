import { useId, useMemo } from 'react'

/**
 * AmbientBackground
 * A lightweight, dependency-free ambient layer for section backgrounds — soft
 * gradient orbs, a glowing ECG trace, gradient-faded wave contours, and a
 * scattered "data mesh" of nodes (dots, rings, plus-ticks) joined by faint
 * constellation links. Pure CSS + SVG (no canvas), so it's cheap enough to drop
 * behind many sections at once.
 *
 * It's purely decorative: absolutely positioned to fill its (relative) parent,
 * pointer-events-none, aria-hidden, and every animation carries
 * `motion-reduce:animate-none` so it goes still for users who prefer reduced
 * motion. A radial mask keeps the detail out of the central reading column so it
 * frames the content instead of crossing the text. Place it as the first child
 * of a `relative overflow-hidden` section and give the real content a higher
 * stacking context (e.g. `relative z-10`).
 *
 * Props:
 *   variant   – palette + layout seed: 'blush' | 'sky' | 'warm' | 'plain' | 'dark'
 *   intensity – 'subtle' | 'normal' | 'rich' (how many nodes / how strong)
 *   ekg       – show the drifting ECG trace (default true)
 *   className – extra positioning classes
 */

const PALETTES = {
  // rgb triples
  blush: { orbA: '241, 91, 97', orbB: '143, 185, 214', ekg: '241, 91, 97', wave: '7, 27, 77', node: '241, 91, 97', node2: '143, 185, 214' },
  sky: { orbA: '143, 185, 214', orbB: '241, 91, 97', ekg: '62, 110, 150', wave: '7, 27, 77', node: '62, 110, 150', node2: '241, 91, 97' },
  warm: { orbA: '241, 91, 97', orbB: '244, 162, 120', ekg: '241, 91, 97', wave: '120, 60, 70', node: '241, 91, 97', node2: '244, 162, 120' },
  plain: { orbA: '241, 91, 97', orbB: '143, 185, 214', ekg: '241, 91, 97', wave: '7, 27, 77', node: '241, 91, 97', node2: '143, 185, 214' },
  dark: { orbA: '241, 91, 97', orbB: '99, 130, 200', ekg: '255, 255, 255', wave: '255, 255, 255', node: '255, 255, 255', node2: '241, 91, 97' },
}

// Orb placements per variant (position + size in %, and which palette color).
const ORBS = {
  blush: [
    { x: -8, y: -12, s: 50, c: 'orbA', o: 0.34, anim: 'pulse-soft' },
    { x: 82, y: 60, s: 44, c: 'orbB', o: 0.30, anim: 'float' },
  ],
  sky: [
    { x: 78, y: -18, s: 52, c: 'orbA', o: 0.36, anim: 'pulse-soft' },
    { x: -10, y: 55, s: 42, c: 'orbB', o: 0.28, anim: 'float' },
  ],
  warm: [
    { x: 88, y: -10, s: 46, c: 'orbA', o: 0.32, anim: 'float' },
    { x: -12, y: 40, s: 48, c: 'orbB', o: 0.30, anim: 'pulse-soft' },
  ],
  plain: [
    { x: 90, y: 8, s: 40, c: 'orbA', o: 0.22, anim: 'float' },
    { x: -8, y: 62, s: 38, c: 'orbB', o: 0.20, anim: 'pulse-soft' },
  ],
  dark: [
    { x: -6, y: -14, s: 52, c: 'orbA', o: 0.42, anim: 'pulse-soft' },
    { x: 80, y: 55, s: 48, c: 'orbB', o: 0.34, anim: 'float' },
  ],
}

// A pool of decorative nodes (percentages). `t` = type: dot | ring | plus.
const NODE_POOL = [
  { x: 12, y: 22, t: 'dot', r: 3, d: '0s' },
  { x: 24, y: 68, t: 'ring', r: 7, d: '1.2s' },
  { x: 38, y: 16, t: 'plus', r: 6, d: '0.6s' },
  { x: 52, y: 78, t: 'dot', r: 2.5, d: '1.8s' },
  { x: 63, y: 30, t: 'ring', r: 6, d: '0.3s' },
  { x: 74, y: 70, t: 'plus', r: 5, d: '2.1s' },
  { x: 86, y: 24, t: 'dot', r: 3, d: '0.9s' },
  { x: 92, y: 58, t: 'ring', r: 6, d: '1.5s' },
  { x: 6, y: 48, t: 'plus', r: 5, d: '2.4s' },
  { x: 44, y: 44, t: 'dot', r: 2, d: '1s' },
  { x: 30, y: 40, t: 'dot', r: 2.2, d: '0.4s' },
  { x: 68, y: 52, t: 'dot', r: 2.4, d: '1.7s' },
  { x: 18, y: 84, t: 'dot', r: 2, d: '0.7s' },
  { x: 82, y: 88, t: 'plus', r: 5, d: '1.3s' },
]

const NODE_COUNT = { subtle: 8, normal: 12, rich: 14 }

// How close two nodes must be (in % of the section box) to be linked by a faint
// constellation line — small enough that links stay local near the edges.
const LINK_DIST = 27

// Literal class strings so Tailwind's JIT reliably generates them (it can't see
// dynamically interpolated class names).
const ANIM_CLASS = { 'pulse-soft': 'animate-pulse-soft', float: 'animate-float' }

// One tile of a smooth PQRST ECG trace on a 0..200 x 0..40 canvas, baseline y=20.
const ekgBeat = (o) =>
  `L${o + 14} 20 L${o + 18} 15 L${o + 22} 20 L${o + 27} 20 ` +
  `L${o + 30} 26 L${o + 34} 3 L${o + 38} 32 L${o + 41} 20 ` +
  `L${o + 47} 20 L${o + 52} 12 L${o + 58} 20 L${o + 100} 20`
const EKG_TILE = `M0 20 ${ekgBeat(0)} ${ekgBeat(100)}`

function EkgTile({ rgb }) {
  return (
    <svg viewBox="0 0 200 40" preserveAspectRatio="none" className="h-full w-1/2 shrink-0" aria-hidden="true">
      {/* soft glow underlay */}
      <path
        d={EKG_TILE}
        fill="none"
        stroke={`rgb(${rgb})`}
        strokeOpacity="0.20"
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        style={{ filter: 'blur(1.6px)' }}
      />
      {/* crisp trace */}
      <path
        d={EKG_TILE}
        fill="none"
        stroke={`rgb(${rgb})`}
        strokeOpacity="0.48"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export default function AmbientBackground({ variant = 'blush', intensity = 'normal', ekg = true, className = '' }) {
  const pal = PALETTES[variant] || PALETTES.blush
  const orbs = ORBS[variant] || ORBS.blush
  const uid = useId().replace(/[:]/g, '')
  const nodes = useMemo(() => NODE_POOL.slice(0, NODE_COUNT[intensity] ?? 10), [intensity])

  // Precompute faint links between nearby nodes (the "data mesh").
  const links = useMemo(() => {
    const out = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const dist = Math.hypot(dx, dy)
        if (dist < LINK_DIST) out.push({ a: nodes[i], b: nodes[j], f: 1 - dist / LINK_DIST })
      }
    }
    return out
  }, [nodes])

  // Vertical band for the drifting ECG line, nudged per variant so it doesn't
  // always sit dead-center.
  const ekgTop = variant === 'sky' ? '32%' : variant === 'warm' ? '68%' : '54%'

  // Keep the ambience out of the central reading zone: fully transparent through
  // the middle, fading in toward the edges/corners so it frames the content
  // instead of crossing the text.
  const safeZoneMask =
    'radial-gradient(ellipse farthest-corner at 50% 50%, transparent 0%, transparent 43%, rgba(0,0,0,0.55) 63%, #000 82%)'

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
      style={{ maskImage: safeZoneMask, WebkitMaskImage: safeZoneMask }}
    >
      {/* Soft gradient orbs */}
      {orbs.map((orb, i) => (
        <div
          key={`orb-${i}`}
          className={`absolute rounded-full blur-3xl ${ANIM_CLASS[orb.anim]} motion-reduce:animate-none`}
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.s}%`,
            paddingBottom: `${orb.s}%`,
            height: 0,
            background: `radial-gradient(circle at 50% 50%, rgba(${pal[orb.c]}, ${orb.o}) 0%, rgba(${pal[orb.c]}, 0) 70%)`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}

      {/* Flowing wave contours with gradient-faded ends */}
      <svg
        className="absolute inset-0 w-full h-full animate-wave-drift motion-reduce:animate-none"
        viewBox="0 0 1000 500"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`wgA-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={`rgb(${pal.wave})`} stopOpacity="0" />
            <stop offset="0.5" stopColor={`rgb(${pal.wave})`} stopOpacity="0.28" />
            <stop offset="1" stopColor={`rgb(${pal.wave})`} stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`wgB-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={`rgb(${pal.node})`} stopOpacity="0" />
            <stop offset="0.5" stopColor={`rgb(${pal.node})`} stopOpacity="0.24" />
            <stop offset="1" stopColor={`rgb(${pal.node})`} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M-50 300 C 200 250, 350 360, 550 300 S 900 240, 1050 320" fill="none" stroke={`url(#wgA-${uid})`} strokeWidth="2.6" />
        <path d="M-50 360 C 220 410, 380 320, 560 370 S 880 420, 1050 350" fill="none" stroke={`url(#wgB-${uid})`} strokeWidth="2" />
        <path d="M-50 240 C 240 210, 360 285, 540 250 S 860 205, 1050 260" fill="none" stroke={`url(#wgA-${uid})`} strokeWidth="1.6" opacity="0.95" />
      </svg>

      {/* Constellation links between nearby nodes */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {links.map((l, i) => (
          <line
            key={`l-${i}`}
            x1={l.a.x}
            y1={l.a.y}
            x2={l.b.x}
            y2={l.b.y}
            stroke={`rgb(${pal.node})`}
            strokeOpacity={(0.34 * l.f).toFixed(3)}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* Drifting ECG trace */}
      {ekg && (
        <div className="absolute left-0 w-full h-[9%] overflow-hidden" style={{ top: ekgTop }}>
          <div className="flex h-full w-[200%] animate-ecg-scroll motion-reduce:animate-none will-change-transform">
            <EkgTile rgb={pal.ekg} />
            <EkgTile rgb={pal.ekg} />
          </div>
        </div>
      )}

      {/* Scattered data nodes (centered on their coordinate) */}
      {nodes.map((n, i) => {
        const rgb = i % 3 === 0 ? pal.node2 : pal.node
        const common = {
          left: `${n.x}%`,
          top: `${n.y}%`,
          marginLeft: -n.r,
          marginTop: -n.r,
          animationDelay: n.d,
        }
        if (n.t === 'dot') {
          // alternate a gentle twinkle (pulse-soft) with drift (float)
          const anim = i % 2 === 0 ? 'animate-float' : 'animate-pulse-soft'
          return (
            <span
              key={`n-${i}`}
              className={`absolute rounded-full ${anim} motion-reduce:animate-none`}
              style={{
                ...common,
                width: n.r * 2,
                height: n.r * 2,
                background: `rgb(${rgb})`,
                opacity: 0.85,
                boxShadow: `0 0 ${n.r * 3.2}px rgba(${rgb}, 0.75)`,
              }}
            />
          )
        }
        if (n.t === 'ring') {
          return (
            <span
              key={`n-${i}`}
              className="absolute rounded-full animate-pulse-soft motion-reduce:animate-none"
              style={{ ...common, width: n.r * 2, height: n.r * 2, border: `1.5px solid rgb(${rgb})`, opacity: 0.68, boxShadow: `0 0 ${n.r * 2}px rgba(${rgb}, 0.35)` }}
            />
          )
        }
        // plus / cross tick
        return (
          <span
            key={`n-${i}`}
            className="absolute animate-float motion-reduce:animate-none"
            style={{ ...common, width: n.r * 2, height: n.r * 2, opacity: 0.62 }}
          >
            <span className="absolute left-1/2 top-0 -translate-x-1/2 h-full" style={{ width: 1.5, background: `rgb(${rgb})` }} />
            <span className="absolute top-1/2 left-0 -translate-y-1/2 w-full" style={{ height: 1.5, background: `rgb(${rgb})` }} />
          </span>
        )
      })}
    </div>
  )
}
