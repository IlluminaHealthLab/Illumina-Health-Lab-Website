/**
 * WaveBand
 * A wide decorative strip of flowing red/blue data waves with small ECG ticks
 * and floating particles — used behind the pillar row. Pure SVG (vector), so
 * it stays crisp at any width instead of pixelating like a raster crop would.
 */
const PARTICLES = [
  [60, 20, 2.2, '0s'], [140, 55, 1.8, '1.1s'], [230, 15, 2, '0.6s'],
  [340, 45, 1.6, '1.6s'], [470, 10, 2.4, '0.3s'], [560, 50, 1.8, '2s'],
  [660, 20, 2, '0.9s'], [760, 40, 2.2, '1.4s'], [860, 15, 1.8, '0.5s'],
  [940, 55, 2, '1.8s'], [1000, 25, 1.6, '1s'], [20, 60, 1.6, '2.2s'],
]

const TICKS = [
  [40, 60], [80, 60], [120, 60], [340, 60], [380, 60], [420, 60],
  [620, 60], [660, 60], [700, 60], [880, 60], [920, 60], [960, 60],
]

export default function WaveBand({ className = '' }) {
  return (
    <div className={`relative w-full aspect-[1018/145] ${className}`}>
      <svg
        viewBox="0 0 1018 145"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="none"
        role="img"
        aria-label="Decorative flowing data waves"
      >
        <defs>
          <linearGradient id="bandRed" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F15B61" stopOpacity="0" />
            <stop offset="50%" stopColor="#F15B61" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F15B61" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="bandBlue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3E6E96" stopOpacity="0" />
            <stop offset="50%" stopColor="#3E6E96" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#3E6E96" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="bandWhite" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* faint vertical ticks, like a data readout */}
        <g opacity="0.35" stroke="#F15B61" strokeWidth="1">
          {TICKS.map(([x], i) => (
            <line key={i} x1={x} y1="10" x2={x} y2="46" opacity={0.3 + (i % 3) * 0.15} />
          ))}
        </g>

        {/* layered flowing waves */}
        <g className="animate-wave-drift" style={{ transformOrigin: '500px 70px' }}>
          <path d="M0 60 C 160 20, 320 100, 500 60 S 820 20, 1018 70" fill="none" stroke="url(#bandBlue)" strokeWidth="20" opacity="0.55" />
          <path d="M0 90 C 180 130, 340 60, 520 95 S 840 130, 1018 85" fill="none" stroke="url(#bandRed)" strokeWidth="12" opacity="0.5" />
        </g>
        <g className="animate-wave-drift" style={{ animationDelay: '2s', transformOrigin: '500px 100px' }}>
          <path d="M0 110 C 180 80, 360 130, 540 100 S 840 75, 1018 115" fill="none" stroke="url(#bandBlue)" strokeWidth="8" opacity="0.35" />
        </g>

        {/* small ECG blips riding the waves */}
        <path
          d="M0 65 L90 65 L100 65 L106 50 L112 80 L120 40 L128 65 L280 65 L288 65 L294 50 L300 80 L308 65 L640 65 L648 65 L654 45 L660 85 L668 65 L1018 65"
          fill="none"
          stroke="url(#bandWhite)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />
        <path
          d="M0 65 L90 65 L100 65 L106 50 L112 80 L120 40 L128 65 L280 65 L288 65 L294 50 L300 80 L308 65 L640 65 L648 65 L654 45 L660 85 L668 65 L1018 65"
          fill="none"
          stroke="#F15B61"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />

        {/* floating particles */}
        {PARTICLES.map(([cx, cy, r, delay], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill={i % 2 === 0 ? '#F15B61' : '#8FB9D6'}
            opacity="0.5"
            className="animate-float"
            style={{ animationDelay: delay }}
          />
        ))}
      </svg>
    </div>
  )
}
