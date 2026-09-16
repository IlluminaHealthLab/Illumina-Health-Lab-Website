import PageHero from '../components/PageHero.jsx'
import LogoCarousel from '../components/LogoCarousel.jsx'
import Button from '../components/Button.jsx'
import CollaborationMap from '../components/CollaborationMap.jsx'
import ParticleField from '../components/ParticleField.jsx'
import AmbientBackground from '../components/AmbientBackground.jsx'
import { logos } from '../data/logos.js'
import { publications } from '../data/publications.js'
import { presentations } from '../data/presentations.js'
import { boardMembers, seniorResearchers, coreTeam, generalMembers } from '../data/team.js'

const memberCount =
  boardMembers.length + seniorResearchers.length + coreTeam.length + generalMembers.length
const researchOutputs = publications.length + presentations.length

const stats = [
  { value: `${logos.length}+`, label: 'Partner institutions and collaborators' },
  { value: '8', label: 'Countries represented across our network' },
  { value: `${researchOutputs}`, label: 'Published papers & conference posters' },
  { value: `${memberCount}+`, label: 'Student researchers and contributors' },
]

const principles = [
  {
    title: 'Rigor over reach',
    body: 'We\u2019d rather stand behind a handful of carefully designed studies than overstate what early-stage work can prove. Every project passes a methodological review before we call it evidence.',
  },
  {
    title: 'Equity as a measure, not a mention',
    body: 'We track who our research reaches, not only what it finds. A model, a paper, or a partnership only counts as impact if it actually narrows disparities in cardiovascular care \u2014 never because we assume it will.',
  },
  {
    title: 'Impact compounds through people',
    body: 'Much of our long-term impact isn\u2019t a publication \u2014 it\u2019s the researchers who pass through the lab: the skills they build, the questions they keep asking, and the collaborations they go on to start elsewhere.',
  },
]

export default function Impact() {
  return (
    <>
      <PageHero
        eyebrow="Our Impact"
        title="Measuring what actually matters"
        subtitle="As a student-led, early-stage research collective, we're careful not to overstate our influence. This is an honest look at what we've built so far, and how we think about impact as we grow."
      />

      {/* Stats */}
      <section className="relative py-16 md:py-24 grad-sky-white overflow-hidden">
        <ParticleField className="absolute inset-0 w-full h-full" density={1.8} />
        <div className="relative z-10 container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="text-center animate-fade-up opacity-0"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <p className="font-serif text-4xl md:text-5xl text-coral mb-3">{s.value}</p>
                <p className="text-navy/60 text-sm md:text-base leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global collaboration map */}
      <section className="relative py-16 md:py-24 grad-blush-sky overflow-hidden">
        <AmbientBackground variant="blush" intensity="subtle" ekg={false} />
        <div className="relative z-10 container-page">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
            <p className="eyebrow mb-4">A Global Collective</p>
            <h2 className="text-3xl md:text-4xl mb-4">Where our researchers and collaborators are based</h2>
            <p className="text-navy/60 text-base md:text-lg leading-relaxed">
              Our contributors have worked from universities, hospitals, and health institutions across
              six continents. Hover or tap a marker to explore each location.
            </p>
          </div>
          <CollaborationMap />
        </div>
      </section>

      {/* How we think about impact */}
      <section className="relative overflow-hidden py-16 md:py-24 grad-blush-warm">
        <AmbientBackground variant="warm" intensity="normal" />
        <div className="relative z-10 container-page">
          <p className="eyebrow mb-4">How We Think About Impact</p>
          <h2 className="text-3xl md:text-4xl max-w-2xl mb-14 md:mb-16">
            Three principles shape how we define and measure progress.
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {principles.map((p) => (
              <div key={p.title} className="p-8 rounded-3xl bg-white border border-navy/10 card-shadow card-shadow-hover">
                <h3 className="font-serif text-xl md:text-2xl text-navy mb-3 leading-snug">{p.title}</h3>
                <p className="text-navy/60 text-[15px] leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reach */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-white">
        <AmbientBackground variant="plain" intensity="subtle" />
        <div className="relative z-10 container-page mb-10">
          <p className="eyebrow mb-2">Where Our Work Reaches</p>
          <h2 className="text-2xl md:text-3xl max-w-xl">
            Built alongside researchers and institutions across the globe.
          </h2>
        </div>
        <div className="relative z-10">
          <LogoCarousel />
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 md:pb-24 bg-white">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl grad-deep px-8 md:px-14 py-12 md:py-16 text-center">
            <ParticleField className="absolute inset-0 w-full h-full" density={2.2} color="255, 255, 255" linkColor="255, 255, 255" />
            <div className="relative z-10">
              <h2 className="font-serif text-2xl md:text-3xl text-white max-w-xl mx-auto mb-8 leading-snug">
                Advancing cardiovascular health is a collective effort. Explore what we're building, or help shape what comes next.
              </h2>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button to="/research" variant="secondary">
                  Explore Our Research
                </Button>
                <Button to="/get-involved" variant="coral">
                  Get Involved
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
