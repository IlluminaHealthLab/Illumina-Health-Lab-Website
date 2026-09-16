import { useState } from 'react'
import { publications } from '../data/publications.js'

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
    <path d="M16 16L12.5 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function PublicationList() {
  const [query, setQuery] = useState('')

  const filtered = publications.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <button className="inline-flex items-center gap-2 text-navy font-medium text-sm border border-navy/15 rounded-full px-4 py-2.5 hover:border-navy/35 transition-colors">
          All Publications
          <ChevronIcon />
        </button>

        <div className="relative w-full sm:w-72">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40">
            <SearchIcon />
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search publications"
            className="w-full rounded-full border border-navy/15 pl-10 pr-4 py-2.5 text-sm text-navy placeholder:text-navy/35 focus:outline-none focus:border-coral/60 transition-colors"
          />
        </div>
      </div>

      <div className="mt-6">
        {filtered.length === 0 && (
          <p className="text-navy/50 py-10 text-center">No publications match your search yet.</p>
        )}
        {filtered.map((p, i) => {
          const Row = p.link ? 'a' : 'div'
          return (
            <Row
              key={i}
              {...(p.link ? { href: p.link, target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 py-6 thin-divider first:border-t-0 group"
            >
              <div className="flex gap-4 max-w-2xl">
                {p.cover && (
                  <img
                    src={p.cover}
                    alt=""
                    aria-hidden="true"
                    className="w-12 md:w-14 aspect-[271/360] object-cover rounded-md shadow-sm border border-navy/10 shrink-0"
                  />
                )}
                <div>
                  <h3
                    className={`font-serif text-lg md:text-xl text-navy leading-snug transition-colors ${
                      p.link ? 'group-hover:text-coral cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    {p.title}
                  </h3>
                  {(p.authors || p.date) && (
                    <p className="text-navy/45 text-xs md:text-sm mt-1.5">
                      {p.authors}
                      {p.authors && p.date ? ' · ' : ''}
                      {p.date}
                    </p>
                  )}
                </div>
              </div>
              <span className="flex items-center gap-2.5 shrink-0">
                {p.journalLogo && (
                  <img
                    src={p.journalLogo}
                    alt=""
                    aria-hidden="true"
                    className="w-7 h-7 md:w-8 md:h-8 object-contain rounded-full border border-navy/10 bg-white shrink-0"
                  />
                )}
                <span className="text-navy/40 font-serif italic text-sm md:text-base">{p.journal}</span>
              </span>
            </Row>
          )
        })}
      </div>
    </div>
  )
}
