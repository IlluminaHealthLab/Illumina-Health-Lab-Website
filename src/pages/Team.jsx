import PageHero from '../components/PageHero.jsx'
import TeamSection from '../components/TeamSection.jsx'
import ParticleField from '../components/ParticleField.jsx'
import {
  boardMembers,
  seniorResearchers,
  coreTeam,
  generalMembers,
  webDevTeam,
} from '../data/team.js'

const icon = (path) => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-coral shrink-0">
    {path}
  </svg>
)

// Web Dev membership is shown as a small badge on whichever section a person
// already appears in (Core Team or General Members), rather than as its own
// standalone section — cleaner than a section that might only ever have 1-2
// people in it. Anyone in webDevTeam who isn't in Core Team OR General Members
// still shows up in Members as a fallback (just without the redundant badge,
// since their role already says Web Development Team).
function withWebDevBadge(list, webDev) {
  const webDevNames = new Set(webDev.map((w) => w.name))
  return list.map((m) => ({ ...m, badge: webDevNames.has(m.name) ? 'Web Development' : undefined }))
}

function buildMembers(general, webDev, alreadyListedElsewhere) {
  const merged = withWebDevBadge(general, webDev)
  const extra = webDev.filter(
    (w) => !general.some((m) => m.name === w.name) && !alreadyListedElsewhere.some((m) => m.name === w.name)
  )
  return [...merged, ...extra]
}

export default function Team() {
  const coreTeamWithBadges = withWebDevBadge(coreTeam, webDevTeam)
  const members = buildMembers(generalMembers, webDevTeam, coreTeam)

  return (
    <>
      <PageHero
        eyebrow="United by purpose. Driven by impact."
        title="Meet the Team"
        subtitle="Interdisciplinary scientists, clinicians, engineers, medical students, and changemakers advancing cardiovascular health through AI, equity, and global collaboration."
        compact
      />

      {/* Team roster — centered layout with ambient particles behind, and the
          Board + Core Team emphasized (larger cards) as the anchor of the page. */}
      <section className="relative py-6 md:py-10 grad-sky-white overflow-hidden">
        <ParticleField className="absolute inset-0 w-full h-full" density={2.0} />

        <div className="relative z-10 container-page">
          <TeamSection
            title="Board Members"
            members={boardMembers}
            featured
            icon={icon(
              <path
                d="M12 21s-7-4.35-9.5-8.5C0.7 9.2 2 5.4 5.5 4.3c2.1-0.65 4.2 0.2 5.3 1.9 1.1-1.7 3.2-2.55 5.3-1.9 3.5 1.1 4.8 4.9 3 8.2C19 16.65 12 21 12 21z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            )}
          />

          <TeamSection
            title="Core Team"
            members={coreTeamWithBadges}
            featured
            icon={icon(
              <>
                <circle cx="8.5" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="16" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2.8 19c0.6-2.9 2.7-4.8 5.2-4.8s4.6 1.9 5.2 4.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M11.3 19c0.6-2.9 2.7-4.8 5.2-4.8s4.6 1.9 5.2 4.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          />

          <TeamSection
            title="Senior Researchers & Principal Investigators"
            members={seniorResearchers}
            size="lg"
            icon={icon(
              <>
                <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 20c1-3.8 3.8-6 7-6s6 2.2 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          />

          <TeamSection
            title="Members"
            members={members}
            size="lg"
            icon={icon(
              <>
                <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 20c1-3.8 3.8-6 7-6s6 2.2 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          />
        </div>
      </section>
    </>
  )
}
