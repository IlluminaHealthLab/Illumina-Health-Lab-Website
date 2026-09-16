import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import AnimatedMedicalHero from '../components/AnimatedMedicalHero.jsx'
import WaveBand from '../components/WaveBand.jsx'
import PillarCards from '../components/PillarCards.jsx'
import LogoCarousel from '../components/LogoCarousel.jsx'
import TeamCard from '../components/TeamCard.jsx'
import ParticleField from '../components/ParticleField.jsx'
import AmbientBackground from '../components/AmbientBackground.jsx'
import { boardMembers, coreTeam, generalMembers, webDevTeam } from '../data/team.js'
import cardiologicalSocietyTelangana from '../assets/logos/cardiological-society-telangana.png'
import ijccCover from '../assets/logos/ijcc-cover-vol7-issue2.png'

// Some people belong to more than one team (e.g. a General Member who also helps run
// the Web Dev Team). Merge duplicate names into a single card and combine their roles
// so both memberships show, instead of silently keeping only the first one found.
function mergeByName(people) {
  const order = []
  const byName = new Map()
  for (const person of people) {
    const existing = byName.get(person.name)
    if (!existing) {
      byName.set(person.name, { ...person, roles: person.role ? [person.role] : [] })
      order.push(person.name)
    } else if (person.role && !existing.roles.includes(person.role)) {
      existing.roles.push(person.role)
    }
  }
  return order.map((name) => {
    const { roles, ...rest } = byName.get(name)
    return { ...rest, role: roles.join(' · ') }
  })
}

// Everyone with a real name/photo (board members first, then real — photographed —
// core/general/web-dev members). Paged on the homepage preview via the arrow controls.
// Page size is 7 (not a "clean" 6/9/12) specifically so the total splits evenly across
// pages instead of stranding a lone card by itself on a final, mostly-empty page —
// re-check this if the roster size changes enough to reintroduce a 1-person page.
const featuredPeople = mergeByName([
  ...boardMembers,
  ...coreTeam.filter((m) => m.photo),
  ...generalMembers.filter((m) => m.photo),
  ...webDevTeam.filter((m) => m.photo),
])
const PEOPLE_PAGE_SIZE = 7

export default function Home() {
  const totalPeoplePages = Math.max(1, Math.ceil(featuredPeople.length / PEOPLE_PAGE_SIZE))
  const [peoplePage, setPeoplePage] = useState(0)
  const showPeoplePager = totalPeoplePages > 1
  const goToPrevPeople = () => setPeoplePage((p) => (p - 1 + totalPeoplePages) % totalPeoplePages)
  const goToNextPeople = () => setPeoplePage((p) => (p + 1) % totalPeoplePages)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden grad-blush-sky">
        <ParticleField className="absolute inset-0 w-full h-full" density={1.6} />
        <div className="container-page pt-16 lg:pt-24 pb-10 lg:pb-20 relative z-10">
          <div className="grid lg:grid-cols-[minmax(0,560px)_1fr] gap-10 lg:gap-6 items-center">
            <div className="relative z-10 animate-fade-up opacity-0" style={{ animationDelay: '0.05s' }}>
              <p className="eyebrow mb-4">Research for a healthier tomorrow</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.4rem] leading-[1.08] tracking-tight mb-6">
                Advancing cardiovascular health through AI, equity, and global collaboration<span className="text-coral">.</span>
              </h1>
              <p className="text-navy/65 text-base md:text-lg leading-relaxed mb-9 max-w-md">
                Illumina Health Lab unites diverse minds and data to solve the world's most complex
                cardiovascular health challenges—responsibly, inclusively, and at scale.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button to="/research">Explore Our Research</Button>
                <Button to="/impact" variant="secondary" arrow={false}>
                  Our Impact
                  <span className="grid place-items-center w-6 h-6 rounded-full border border-navy/30 shrink-0">
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="translate-x-[0.5px]">
                      <path d="M3 1.8L8 5L3 8.2V1.8Z" fill="currentColor" />
                    </svg>
                  </span>
                </Button>
              </div>
            </div>

            {/* Heart + ECG artwork — static, transparent background, oversized like
                the concept: bleeds under the text and toward the right edge. z-0 and
                pointer-events-none keep the text readable and clickable. */}
            <div className="hidden lg:block relative z-0 pointer-events-none animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
              <AnimatedMedicalHero className="transform lg:scale-[1.35] origin-[58%_45%]" />
            </div>
            <div className="lg:hidden max-w-md mx-auto w-full animate-fade-in opacity-0" style={{ animationDelay: '0.15s' }}>
              <AnimatedMedicalHero />
            </div>
          </div>

          {/* Circular scroll-down cue, bottom-right like the concept */}
          <button
            type="button"
            onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
            aria-label="Scroll to next section"
            className="hidden lg:grid place-items-center absolute bottom-8 right-10 z-20 w-11 h-11 rounded-full bg-white/80 backdrop-blur border border-navy/10 text-navy/70 card-shadow hover:text-coral hover:border-coral/30 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3.5V12.5M8 12.5L4 8.5M8 12.5L12 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Wave band + pillars — the image fills this block's own height, which is driven
            by the pillar content itself, so it can never overlap the buttons above. */}
        <div className="relative z-10">
          <div className="hidden md:block absolute inset-0">
            <WaveBand className="w-full h-full" />
          </div>
          <div className="relative container-page py-10 md:py-14">
            <PillarCards />
          </div>
        </div>
      </section>

      {/* Logo carousel */}
      <section className="relative overflow-hidden py-14 md:py-20 grad-blush-warm">
        <AmbientBackground variant="warm" intensity="subtle" />
        <div className="relative z-10 container-page mb-8">
          <p className="eyebrow mb-2 text-center md:text-left">Our Collaborators</p>
          <h2 className="text-2xl md:text-3xl">Trusted by institutions worldwide</h2>
        </div>
        <div className="relative z-10">
          <LogoCarousel />
        </div>
      </section>

      {/* Preview cards */}
      <section className="relative overflow-hidden py-14 md:py-20 grad-sky-white">
        <AmbientBackground variant="sky" intensity="normal" />
        <div className="relative z-10 container-page grid md:grid-cols-2 gap-8">
          {/* Meet Our People */}
          <div className="bg-white rounded-3xl p-8 md:p-10 card-shadow">
            <div className="flex items-center justify-between mb-8">
              <p className="eyebrow">Meet Our People</p>
              <Link
                to="/team"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-coral transition-colors"
              >
                View Our Team
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${peoplePage * 100}%)` }}
              >
                {Array.from({ length: totalPeoplePages }).map((_, pageIdx) => (
                  <div key={pageIdx} className="grid grid-cols-3 gap-x-6 gap-y-8 w-full shrink-0">
                    {featuredPeople
                      .slice(pageIdx * PEOPLE_PAGE_SIZE, pageIdx * PEOPLE_PAGE_SIZE + PEOPLE_PAGE_SIZE)
                      .map((m, i) => (
                        <TeamCard
                          key={m.name}
                          name={m.name}
                          role={m.role}
                          institution={m.institution}
                          bio={m.bio}
                          linkedin={m.linkedin}
                          email={m.email}
                          photo={m.photo}
                          index={i}
                        />
                      ))}
                  </div>
                ))}
              </div>
            </div>

            {showPeoplePager && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  type="button"
                  onClick={goToPrevPeople}
                  aria-label="Show previous people"
                  className="grid place-items-center w-9 h-9 rounded-full border border-navy/15 text-navy hover:border-navy/40 hover:bg-navy/[0.03] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.5 8H3.5M3.5 8L7.5 4M3.5 8L7.5 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPeoplePages }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPeoplePage(i)}
                      aria-label={`Show people page ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        i === peoplePage ? 'w-5 bg-navy' : 'w-1.5 bg-navy/20 hover:bg-navy/35'
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={goToNextPeople}
                  aria-label="Show more people"
                  className="grid place-items-center w-9 h-9 rounded-full border border-navy/15 text-navy hover:border-navy/40 hover:bg-navy/[0.03] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Featured Publication */}
          <div className="grad-deep rounded-3xl p-8 md:p-10 text-white flex flex-col justify-between">
            <div>
              <p className="text-coral text-xs md:text-sm font-semibold tracking-[0.18em] uppercase mb-6">
                Featured Publication
              </p>
              <div className="flex gap-5 mb-7">
                <img
                  src={ijccCover}
                  alt="Indian Journal of Clinical Cardiology, Volume 7 Issue 2, June 2026 cover"
                  className="w-24 md:w-28 aspect-[271/360] object-cover rounded-xl shadow-lg shadow-black/30 border border-white/10 shrink-0"
                />
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2.5 mb-2">
                    <img
                      src={cardiologicalSocietyTelangana}
                      alt=""
                      aria-hidden="true"
                      className="w-7 h-7 object-contain rounded-full border border-white/15 bg-white shrink-0"
                    />
                  </div>
                  <p className="text-white/50 text-xs font-medium tracking-wide uppercase leading-relaxed">
                    Indian Journal of Clinical Cardiology
                    <br />
                    Vol. 7, Issue 2
                    <br />
                    Published Dec 23, 2025
                  </p>
                </div>
              </div>
              <h3 className="font-serif text-xl md:text-2xl leading-snug mb-4 text-white">
                Structural Delay Burden as a Social Determinant of ACS Outcomes: A Missing Variable
                for Sri Lanka's National Registry.
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Illamperuma, Abbasian &amp; Ashar — proposing a structural delay burden score to
                capture how social and geographic barriers shape acute coronary syndrome outcomes.
              </p>
            </div>
            <a
              href="https://doi.org/10.1177/26324636251408203"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 hover:text-coral transition-colors"
            >
              Read Publication
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
