const icons = {
  heart: (
    <>
      <path
        d="M12 20.3s-7-4.3-9.6-8.7C0.7 8 1.8 4.8 4.8 3.8c2-0.7 4.2 0.1 5.4 1.8 1.2-1.7 3.4-2.5 5.4-1.8 3 1 4.1 4.2 2.5 7.5-2.6 4.5-9.6 8.8-9.6 8.8z"
        fill="currentColor"
        fillOpacity="0.14"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 6.3c1 0.3 1.9 1 2.6 2.1M12 8.4c1.6 2.4 1 5.7-1.2 8"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M4.3 12h3l1.2-2.3 1.8 4.2 1.2-2.3h4.4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="15.5" cy="7" r="0.7" fill="currentColor" opacity="0.6" />
      <circle cx="7" cy="15.5" r="0.6" fill="currentColor" opacity="0.5" />
    </>
  ),
  ai: (
    <>
      <path
        d="M9 4c-2.2 0-3.8 1.6-3.9 3.6-1.3 0.6-2.2 1.9-2.2 3.4 0 1.4 0.8 2.6 2 3.3-0.1 0.4-0.2 0.8-0.2 1.2 0 2.1 1.7 3.8 3.9 3.8 0.5 0 1-0.1 1.4-0.3Z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M15 4c2.2 0 3.8 1.6 3.9 3.6 1.3 0.6 2.2 1.9 2.2 3.4 0 1.4-0.8 2.6-2 3.3 0.1 0.4 0.2 0.8 0.2 1.2 0 2.1-1.7 3.8-3.9 3.8-0.5 0-1-0.1-1.4-0.3Z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M12 5v14" stroke="currentColor" strokeWidth="1.1" opacity="0.5" />
      <circle cx="8.3" cy="8.5" r="0.9" fill="currentColor" />
      <circle cx="7" cy="12.5" r="0.9" fill="currentColor" />
      <circle cx="9" cy="16" r="0.9" fill="currentColor" />
      <circle cx="15.7" cy="8.5" r="0.9" fill="currentColor" />
      <circle cx="17" cy="12.5" r="0.9" fill="currentColor" />
      <circle cx="15" cy="16" r="0.9" fill="currentColor" />
      <path
        d="M8.3 8.5L7 12.5M7 12.5L9 16M15.7 8.5L17 12.5M17 12.5L15 16"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.55"
      />
    </>
  ),
  people: (
    <>
      <circle cx="5.5" cy="9.5" r="2.1" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="7.5" r="2.6" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="18.5" cy="9.5" r="2.1" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1.8 20c0.4-2.7 2-4.5 3.7-4.5s3.1 1.4 3.5 3.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M7.6 20.3c0.5-3.4 2.3-5.6 4.4-5.6s3.9 2.2 4.4 5.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M15.3 18.9c0.4-2 2-3.4 3.5-3.4s3.3 1.8 3.7 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M4 20.6h16" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.3" />
      <ellipse cx="12" cy="12" rx="3.6" ry="8.5" stroke="currentColor" strokeWidth="1.1" opacity="0.7" />
      <path
        d="M4.8 7.7c2 1 4.6 1.5 7.2 1.5s5.2-0.5 7.2-1.5M4.8 16.3c2-1 4.6-1.5 7.2-1.5s5.2 0.5 7.2 1.5"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M3.8 12.5h3l1.1-2 1.6 3.8 1.1-1.8h9.6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="6.2" r="0.8" fill="currentColor" />
      <circle cx="17" cy="17" r="0.7" fill="currentColor" opacity="0.7" />
    </>
  ),
}

const pillars = [
  { key: 'heart', label: 'Cardiovascular Health', color: 'text-coral', ring: 'ring-coral/15' },
  { key: 'ai', label: 'AI Innovation', color: 'text-navy', ring: 'ring-navy/15' },
  { key: 'people', label: 'Equity in Action', color: 'text-amber', ring: 'ring-amber/20' },
  { key: 'globe', label: 'Global Health', color: 'text-coral', ring: 'ring-coral/15' },
]

export default function PillarCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {pillars.map((p, i) => (
        <div
          key={p.key}
          className="flex flex-col items-center text-center gap-3 md:gap-4 animate-fade-up opacity-0"
          style={{ animationDelay: `${i * 0.12}s` }}
        >
          <div className="relative w-20 h-20 md:w-24 md:h-24 grid place-items-center">
            {/* soft blurred halo lifts the icon off a busy background */}
            <div className="absolute inset-0 rounded-full bg-white/70 blur-md" />
            <div
              className={`relative w-16 h-16 md:w-[4.5rem] md:h-[4.5rem] rounded-full bg-white ring-1 ${p.ring} shadow-md shadow-navy/5 grid place-items-center ${p.color}`}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {icons[p.key]}
              </svg>
            </div>
          </div>
          <p className="font-serif text-lg md:text-xl text-navy leading-snug">{p.label}</p>
        </div>
      ))}
    </div>
  )
}
