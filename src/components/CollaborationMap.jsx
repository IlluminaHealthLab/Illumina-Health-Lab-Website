import { useEffect, useMemo, useRef, useState } from 'react'
import { mapLocations as locations } from '../data/mapLocations.js'

/**
 * CollaborationMap
 * A geographically accurate world map with a glowing pin for every place
 * connected to the lab. Real country outlines are loaded from Natural Earth
 * data (the standard open real-world map dataset) and projected with the exact
 * same equirectangular formula used to place the location pins — so coastlines
 * and pins share one coordinate system and every pin lands on the correct
 * real-world spot with no manual pixel offsets. Locations live in
 * src/data/mapLocations.js.
 *
 * Robustness: geometry is tried across several permissive-CORS CDN mirrors and
 * cached (in memory for the session, and in localStorage across visits) so it
 * loads once and stays instant. If every source is unreachable the map still
 * renders the graticule, connection arcs, pins, and tooltips — the pins are
 * correctly positioned regardless, since their placement is pure projection and
 * does not depend on the coastline layer.
 */

// Equirectangular ("plate carrée") projection over the full globe.
const W = 1000
const H = 500
const project = (lng, lat) => ({ x: ((lng + 180) / 360) * W, y: ((90 - lat) / 180) * H })

// Crop to the populated band so it reads like a familiar world map instead of a
// pole-to-pole strip. Covers ~lat 78°N down to ~56°S, which comfortably
// contains every pin (northmost: Belfast 54.6°N, southmost: Wollongong 34.4°S).
const VB = { x: 115, y: 33, w: 845, h: 375 }
const HUB = project(-79.92, 43.26) // McMaster — connection-arc origin

// Real world countries as plain GeoJSON, from several permissive-CORS static
// mirrors. All three serve the same kind of Natural Earth / world.geo.json data.
const GEO_SOURCES = [
  'https://cdn.jsdelivr.net/gh/johan/world.geo.json@master/countries.geo.json',
  'https://unpkg.com/world-atlas@2/countries-110m.json', // TopoJSON (handled below)
  'https://cdn.jsdelivr.net/gh/nvkelso/natural-earth-vector@v5.1.2/geojson/ne_110m_admin_0_countries.geojson',
]

const CACHE_KEY = 'ihl-worldgeo-paths-v1'
// Module-level cache so navigating away and back doesn't refetch within a session.
let GEO_CACHE = null

// Turn one ring of [lng,lat] into an SVG subpath, breaking the line whenever it
// jumps across the antimeridian so far-eastern countries (Russia, Fiji) don't
// smear a straight streak across the whole map.
function ringToPath(ring) {
  let d = ''
  let prev = null
  let penUp = true
  for (const pt of ring) {
    const p = project(pt[0], pt[1])
    if (prev && Math.abs(p.x - prev.x) > W / 2) penUp = true
    d += penUp ? `M${p.x.toFixed(1)} ${p.y.toFixed(1)}` : ` L${p.x.toFixed(1)} ${p.y.toFixed(1)}`
    penUp = false
    prev = p
  }
  return d + 'Z'
}

function geomToPath(geom) {
  if (!geom) return ''
  const polys =
    geom.type === 'Polygon' ? [geom.coordinates] : geom.type === 'MultiPolygon' ? geom.coordinates : []
  return polys.map((poly) => poly.map(ringToPath).join('')).join('')
}

// Minimal TopoJSON decoder (arcs -> coordinates) so we can use the world-atlas
// mirror as a fallback without pulling in the topojson-client dependency.
function topoToPaths(topo) {
  const obj = topo.objects && (topo.objects.countries || Object.values(topo.objects)[0])
  if (!obj) return []
  const { scale, translate } = topo.transform || { scale: [1, 1], translate: [0, 0] }
  const decodeArc = (arc) => {
    let x = 0
    let y = 0
    return arc.map(([dx, dy]) => {
      x += dx
      y += dy
      return [x * scale[0] + translate[0], y * scale[1] + translate[1]]
    })
  }
  const arcs = topo.arcs.map(decodeArc)
  const ringCoords = (ringIdx) =>
    ringIdx.reduce((acc, i) => {
      const arc = i < 0 ? arcs[~i].slice().reverse() : arcs[i]
      return acc.concat(i < 0 ? arc : arc)
    }, [])
  const geomPaths = (g) => {
    if (g.type === 'Polygon') return [g.arcs.map(ringCoords)]
    if (g.type === 'MultiPolygon') return g.arcs.map((poly) => poly.map(ringCoords))
    return []
  }
  return (obj.geometries || [])
    .map((g) =>
      geomPaths(g)
        .map((poly) => poly.map(ringToPath).join(''))
        .join('')
    )
    .filter(Boolean)
}

function buildPathsFromData(data) {
  if (data && data.type === 'Topology') return topoToPaths(data)
  const feats = (data && data.features) || []
  return feats.map((f) => geomToPath(f.geometry)).filter(Boolean)
}

export default function CollaborationMap() {
  const [paths, setPaths] = useState(GEO_CACHE)
  const [failed, setFailed] = useState(false)
  const [active, setActive] = useState(null) // index of hovered/tapped pin
  const [reduceMotion, setReduceMotion] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduceMotion(mq.matches)
    apply()
    mq.addEventListener?.('change', apply)
    return () => mq.removeEventListener?.('change', apply)
  }, [])

  useEffect(() => {
    if (GEO_CACHE) return
    // Try a persisted copy from a previous visit first.
    try {
      const cached = window.localStorage?.getItem(CACHE_KEY)
      if (cached) {
        const arr = JSON.parse(cached)
        if (Array.isArray(arr) && arr.length) {
          GEO_CACHE = arr
          setPaths(arr)
          return
        }
      }
    } catch {
      /* ignore cache read errors */
    }

    let cancelled = false
    ;(async () => {
      for (const url of GEO_SOURCES) {
        try {
          const res = await fetch(url)
          if (!res.ok) continue
          const data = await res.json()
          const built = buildPathsFromData(data)
          if (!built.length) continue
          GEO_CACHE = built
          try {
            window.localStorage?.setItem(CACHE_KEY, JSON.stringify(built))
          } catch {
            /* storage may be full/blocked — non-fatal */
          }
          if (!cancelled) setPaths(built)
          return
        } catch {
          /* try next source */
        }
      }
      if (!cancelled) setFailed(true)
    })()
    return () => {
      cancelled = true
    }
  }, [])

  // Precompute projected pin positions once.
  const pins = useMemo(() => locations.map((loc) => ({ ...loc, ...project(loc.lng, loc.lat) })), [])

  // Dismiss an open tooltip when tapping empty map area (mobile).
  const clearActive = () => setActive(null)

  const activePin = active != null ? pins[active] : null

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden rounded-3xl border border-navy/10 bg-gradient-to-br from-[#0a1f57] via-navy to-[#0a1f57] card-shadow"
    >
      <svg
        viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
        className="w-full h-auto block"
        role="img"
        aria-label="World map showing Illumina Health Lab researchers and collaborators across six continents"
        onClick={clearActive}
      >
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="42%" r="65%">
            <stop offset="0%" stopColor="#F15B61" stopOpacity="0.14" />
            <stop offset="45%" stopColor="#1b3a86" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#071B4D" stopOpacity="0" />
          </radialGradient>
          <filter id="pinBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        <rect x={VB.x} y={VB.y} width={VB.w} height={VB.h} fill="url(#mapGlow)" />

        {/* Graticule */}
        <g stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1">
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={(i * H) / 10} x2={W} y2={(i * H) / 10} />
          ))}
          {Array.from({ length: 13 }).map((_, i) => (
            <line key={`v${i}`} x1={(i * W) / 12} y1="0" x2={(i * W) / 12} y2={H} />
          ))}
        </g>

        {/* Real country outlines (Natural Earth), same projection as the pins */}
        {paths && (
          <g
            fill="#ffffff"
            fillOpacity="0.10"
            stroke="#ffffff"
            strokeOpacity="0.16"
            strokeWidth="0.6"
            strokeLinejoin="round"
          >
            {paths.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>
        )}

        {/* Connection arcs from the McMaster home base to each location */}
        <g stroke="#F15B61" strokeOpacity="0.14" strokeWidth="1" fill="none">
          {pins.map((b, i) => {
            const mx = (HUB.x + b.x) / 2
            const my = (HUB.y + b.y) / 2 - Math.abs(b.x - HUB.x) * 0.12
            return <path key={i} d={`M${HUB.x} ${HUB.y} Q${mx} ${my} ${b.x} ${b.y}`} />
          })}
        </g>

        {/* Location pins */}
        {pins.map((loc, i) => {
          const isActive = active === i
          return (
            <g
              key={loc.name}
              transform={`translate(${loc.x} ${loc.y})`}
              className="cursor-pointer"
              tabIndex={0}
              role="button"
              aria-label={`${loc.name} — ${loc.place}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive((cur) => (cur === i ? null : cur))}
              onFocus={() => setActive(i)}
              onBlur={() => setActive((cur) => (cur === i ? null : cur))}
              onClick={(e) => {
                e.stopPropagation()
                setActive((cur) => (cur === i ? null : i))
              }}
            >
              <circle r="10" fill="#F15B61" filter="url(#pinBlur)" opacity={isActive ? 0.55 : 0.3} />
              <circle r={isActive ? 5.5 : 4} fill="#F15B61">
                {!reduceMotion && (
                  <animate
                    attributeName="opacity"
                    values="1;0.55;1"
                    dur="2.6s"
                    begin={`${(((loc.x + loc.y) % 10) * 0.15).toFixed(2)}s`}
                    repeatCount="indefinite"
                  />
                )}
              </circle>
              <circle r={isActive ? 5.5 : 4} fill="none" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="1" />
              {/* Native tooltip fallback for assistive tech / no-JS hover */}
              <title>{`${loc.name} — ${loc.place}`}</title>
            </g>
          )
        })}

        {/* Rich tooltip for the active pin (drawn last so it sits on top) */}
        {activePin && <Tooltip pin={activePin} />}

        {/* If coastlines couldn't load, note it quietly — pins are still accurate */}
        {failed && !paths && (
          <text
            x={VB.x + VB.w / 2}
            y={VB.y + 16}
            textAnchor="middle"
            fill="#ffffff"
            fillOpacity="0.4"
            fontSize="9"
            fontFamily="Inter, sans-serif"
          >
            Map outlines unavailable offline — marker positions remain accurate
          </text>
        )}
      </svg>
    </div>
  )
}

// SVG tooltip: a rounded card above the pin, clamped to stay inside the crop.
function Tooltip({ pin }) {
  const padX = 9
  const lineH = 14
  const nameLen = pin.name.length
  const placeLen = pin.place.length
  const charW = 5.6
  const boxW = Math.max(nameLen, placeLen) * charW + padX * 2
  const boxH = 34
  let bx = pin.x - boxW / 2
  bx = Math.max(VB.x + 6, Math.min(bx, VB.x + VB.w - boxW - 6))
  let by = pin.y - boxH - 12
  if (by < VB.y + 4) by = pin.y + 14 // flip below if too high
  const pointsUp = by > pin.y
  return (
    <g pointerEvents="none">
      <rect x={bx} y={by} width={boxW} height={boxH} rx="7" fill="#071B4D" stroke="#F15B61" strokeOpacity="0.6" strokeWidth="1" />
      {/* little pointer */}
      <path
        d={
          pointsUp
            ? `M${pin.x - 5} ${by} L${pin.x + 5} ${by} L${pin.x} ${by - 6} Z`
            : `M${pin.x - 5} ${by + boxH} L${pin.x + 5} ${by + boxH} L${pin.x} ${by + boxH + 6} Z`
        }
        fill="#071B4D"
      />
      <text x={bx + padX} y={by + lineH} fill="#ffffff" fontSize="10.5" fontWeight="600" fontFamily="Inter, sans-serif">
        {pin.name}
      </text>
      <text x={bx + padX} y={by + lineH + 12} fill="#F8B4B7" fontSize="9.5" fontFamily="Inter, sans-serif">
        {pin.place}
      </text>
    </g>
  )
}
