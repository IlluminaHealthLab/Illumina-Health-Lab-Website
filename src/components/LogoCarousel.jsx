import { logos } from '../data/logos.js'

export default function LogoCarousel() {
  // Duplicate the list so the marquee can loop seamlessly at -50%.
  const track = [...logos, ...logos]

  return (
    <div className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-28 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-28 bg-gradient-to-l from-white to-transparent z-10" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {track.map((logo, i) => (
          <div
            key={i}
            className="flex items-center justify-center shrink-0 h-[120px] md:h-[140px] mx-3 rounded-2xl border border-navy/10 bg-white card-shadow px-9"
          >
            <img
              src={logo.src}
              alt={logo.name}
              title={logo.name}
              className="h-14 md:h-16 w-auto max-w-[220px] object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
