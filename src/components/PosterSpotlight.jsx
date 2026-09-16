import { useEffect, useState } from 'react'
import { presentations } from '../data/presentations.js'

/**
 * PosterSpotlight
 * Showcases accepted conference posters/presentations. Each poster's image is
 * the centerpiece (click to open a full-screen, zoomable lightbox), alongside
 * its title, venue, authors, and a link to download the original PDF. Data
 * lives in src/data/presentations.js.
 */

const ExpandIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2v8m0 0L5 7m3 3l3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

function Lightbox({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/85 backdrop-blur-sm p-4 md:p-8 animate-fade-up"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} — full poster`}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close poster"
        className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
      >
        <CloseIcon />
      </button>
      <div
        className="flex items-center justify-center w-full h-full max-w-[96vw] max-h-[92vh] rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.full}
          alt={`Full research poster: ${item.title}`}
          className="block max-w-full max-h-[92vh] w-auto h-auto object-contain"
        />
      </div>
    </div>
  )
}

export default function PosterSpotlight() {
  const [active, setActive] = useState(null)

  if (!presentations.length) return null

  return (
    <div>
      <div className="mb-8 md:mb-10">
        <p className="eyebrow mb-3">Conference Presentations</p>
        <h2 className="text-2xl md:text-3xl max-w-xl">
          Sharing our work with the wider research community.
        </h2>
      </div>

      <div className="space-y-8">
        {presentations.map((item) => (
          <article
            key={item.id}
            className="grid md:grid-cols-[1.15fr_1fr] gap-6 md:gap-9 items-center p-5 md:p-7 rounded-3xl bg-white border border-navy/10 card-shadow card-shadow-hover"
          >
            {/* Poster image — click to enlarge */}
            <button
              onClick={() => setActive(item)}
              className="group relative block w-full overflow-hidden rounded-2xl border border-navy/10 bg-navy/5 cursor-zoom-in"
              aria-label={`Enlarge poster: ${item.title}`}
            >
              <img
                src={item.preview}
                alt={`Research poster: ${item.title}`}
                className="block w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <span className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors" />
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-navy/80 text-white text-xs font-medium px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExpandIcon />
                Click to enlarge
              </span>
            </button>

            {/* Details */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-coral/12 text-coral text-xs font-semibold px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral" />
                  {item.status}
                </span>
                <span className="rounded-full bg-navy/5 text-navy/60 text-xs font-medium px-3 py-1">
                  {item.type}
                </span>
              </div>

              <h3 className="font-serif text-xl md:text-2xl text-navy leading-snug mb-3">{item.title}</h3>

              <p className="text-navy font-medium text-sm md:text-[15px]">{item.venue}</p>
              <p className="text-navy/45 text-xs md:text-sm mt-1">{item.authors}</p>
              {item.affiliations && (
                <p className="text-navy/40 text-xs mt-1 leading-relaxed">{item.affiliations}</p>
              )}

              {item.summary && (
                <p className="text-navy/60 text-sm leading-relaxed mt-4">{item.summary}</p>
              )}

              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  onClick={() => setActive(item)}
                  className="inline-flex items-center gap-2 rounded-full bg-navy text-white text-sm font-semibold px-5 py-2.5 hover:bg-navy/90 transition-colors"
                >
                  <ExpandIcon />
                  View full poster
                </button>
                <a
                  href={item.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-navy/15 text-navy text-sm font-semibold px-5 py-2.5 hover:border-navy/35 transition-colors"
                >
                  <DownloadIcon />
                  Download PDF
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {active && <Lightbox item={active} onClose={() => setActive(null)} />}
    </div>
  )
}
