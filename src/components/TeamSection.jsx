import TeamCard from './TeamCard.jsx'

/**
 * TeamSection
 *
 * Plain, minimal section: a left-aligned heading (icon + title) with a thin
 * rule trailing off to the right edge, then the roster as a centered,
 * wrapping row below — so a group of 2 people and a group of 20 both center
 * as a true cluster instead of left-aligning inside a grid track.
 *
 * Card size forms a hierarchy across the page: Core Team / Board ("featured")
 * largest; Senior Researchers/PIs, Members, and Web Dev Team all share the
 * same ("lg") size below that — no colored panels or accent borders, just
 * scale.
 */
export default function TeamSection({ icon, title, members, size = 'md', featured = false }) {
  if (!members || members.length === 0) return null

  return (
    <div className="relative py-5 md:py-6">
      <div className="flex items-center gap-2.5 mb-5 md:mb-6">
        {icon}
        <h3 className={`font-serif text-navy whitespace-nowrap ${featured ? 'text-lg md:text-xl' : 'text-base md:text-lg'}`}>
          {title}
        </h3>
        <div className="flex-1 h-px bg-navy/10 ml-1" />
      </div>

      <div
        className={`flex flex-wrap justify-center ${
          featured ? 'gap-x-8 gap-y-7' : size === 'lg' ? 'gap-x-7 gap-y-6' : 'gap-x-6 md:gap-x-8 gap-y-7'
        }`}
      >
        {members.map((m, i) => (
          <div
            key={m.name + i}
            className={featured ? 'w-28 sm:w-32' : size === 'lg' ? 'w-24 sm:w-28' : 'w-24 sm:w-28'}
          >
            <TeamCard
              name={m.name}
              role={m.role}
              institution={m.institution}
              bio={m.bio}
              linkedin={m.linkedin}
              email={m.email}
              photo={m.photo}
              size={featured ? 'lg' : size}
              featured={featured}
              index={i}
              badge={m.badge}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
