/**
 * AnimatedMedicalHero
 * Static heart + waves artwork (transparent WebP) with:
 *  - a subtle CSS heartbeat localized to just the heart (see below)
 *  - a clean vector ECG line scrolling smoothly across the artwork.
 * No GIF — pure CSS/SVG. Keyframes live in index.css so they always apply.
 *
 * Localized heartbeat: the artwork is one flattened image (heart + waves +
 * background), so we can't scale the heart on its own directly. Instead we
 * render the image twice — a static base, plus an identical copy on top that's
 * masked to a soft ellipse over the heart and given the heartbeat. At rest the
 * overlay is pixel-identical to the base (invisible); when it pulses, only the
 * masked heart region appears to move while the waves, background, and outer
 * edges stay perfectly still. HEART_ORIGIN must match the mask center so the
 * heart scales in place.
 */
import heartArt from '../assets/hero-heart-static.webp'

// Center of the heart within the artwork (measured from the image). Used for
// both the mask center and the pulse transform-origin so they stay in sync.
const HEART_CX = '60.5%'
const HEART_CY = '40%'
// Soft ellipse over the heart: opaque core, fading to transparent before it
// reaches the prominent lower-left waves.
const HEART_MASK = `radial-gradient(ellipse 22.5% 31% at ${HEART_CX} ${HEART_CY}, #000 62%, transparent 100%)`

// Two clean PQRST beats per tile; starts and ends on the baseline (y=62), so
// two copies side by side loop seamlessly.
const beat = (o) =>
  `L${o + 8} 62 L${o + 11} 55 L${o + 14} 62 L${o + 17} 62 ` +
  `L${o + 19} 67 L${o + 22} 16 L${o + 25} 75 L${o + 27} 62 ` +
  `L${o + 31} 62 L${o + 35} 51 L${o + 39} 62 L${o + 50} 62`
const ECG_PATH = `M0 62 ${beat(0)} ${beat(50)}`

function EcgWave({ className = '' }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path
        d={ECG_PATH}
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeOpacity="0.32"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={{ filter: 'blur(1.2px)' }}
      />
      <path
        d={ECG_PATH}
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export default function AnimatedMedicalHero({ className = '' }) {
  return (
    <div className={`relative ${className}`}>
      {/* Static base — the full scene, never moves */}
      <img
        src={heartArt}
        alt="Illustration of a heart with an ECG trace and flowing data waves"
        className="block w-full h-auto"
        draggable="false"
      />
      {/* Pulse overlay — identical image masked to the heart; only this beats */}
      <img
        src={heartArt}
        alt=""
        aria-hidden="true"
        draggable="false"
        className="absolute inset-0 w-full h-auto animate-heart-pulse will-change-transform pointer-events-none"
        style={{
          transformOrigin: `${HEART_CX} ${HEART_CY}`,
          maskImage: HEART_MASK,
          WebkitMaskImage: HEART_MASK,
        }}
      />
      {/* ECG overlay */}
      <div
        className="absolute overflow-hidden pointer-events-none"
        style={{ left: '60%', top: '36%', width: '40%', height: '25%' }}
      >
        <div className="flex h-full w-[200%] animate-ecg-scroll will-change-transform">
          <EcgWave className="w-1/2 h-full shrink-0" />
          <EcgWave className="w-1/2 h-full shrink-0" />
        </div>
      </div>
    </div>
  )
}
