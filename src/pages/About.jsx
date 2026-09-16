import PageHero from '../components/PageHero.jsx'
import TeamCard from '../components/TeamCard.jsx'
import Button from '../components/Button.jsx'
import WorldMapDots from '../components/WorldMapDots.jsx'
import AmbientBackground from '../components/AmbientBackground.jsx'
import { boardMembers } from '../data/team.js'

const journey = [
  { date: 'December 2025', title: 'The idea takes shape', desc: 'The vision for Illumina Health Lab emerges from a shared commitment to cardiovascular research, global collaboration, and student-led innovation.' },
  { date: 'February 2026', title: 'Illumina Health Lab launches', desc: 'The lab formally begins as a collaborative space for students and early-career researchers to contribute to meaningful interdisciplinary scholarship.' },
  { date: 'March 2026', title: 'Our first publications', desc: 'Early projects begin reaching publication, marking the lab’s first contribution to the academic literature.' },
  { date: 'June 2026', title: 'An international team is established', desc: 'Illumina Health Lab develops into a formal international research collective, connecting collaborators across Canada, the United States, the United Kingdom, Australia, and beyond.' },
  { date: 'January 2027', title: 'Continuing to grow', desc: 'The lab enters its next chapter by expanding its research portfolio, strengthening international partnerships, and creating new opportunities for emerging researchers.' },
]

const values = [
  {
    title: 'Cardiovascular Health',
    tag: 'Better hearts. Longer lives.',
    color: 'text-coral',
    ring: 'ring-coral/15',
    icon: (
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
          d="M4.3 12h3l1.2-2.3 1.8 4.2 1.2-2.3h4.4"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    title: 'AI Innovation',
    tag: 'Intelligent tools. Real impact.',
    color: 'text-navy',
    ring: 'ring-navy/15',
    icon: (
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
      </>
    ),
  },
  {
    title: 'Health Equity & Global Collaboration',
    tag: 'Together, for everyone.',
    color: 'text-amber',
    ring: 'ring-amber/20',
    icon: (
      <>
        <circle cx="5.5" cy="9.5" r="2.1" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="12" cy="7.5" r="2.6" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="18.5" cy="9.5" r="2.1" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.3" />
        <path d="M1.8 20c0.4-2.7 2-4.5 3.7-4.5s3.1 1.4 3.5 3.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M7.6 20.3c0.5-3.4 2.3-5.6 4.4-5.6s3.9 2.2 4.4 5.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M15.3 18.9c0.4-2 2-3.4 3.5-3.4s3.3 1.8 3.7 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </>
    ),
  },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="Science. Equity. Collaboration."
        title="About Illumina Health Lab"
        subtitle="Illumina Health Lab advances cardiovascular and cardiometabolic health through interdisciplinary research at the intersection of medicine, artificial intelligence, health equity, and global collaboration."
      />

      {/* Story + Mission */}
      <section className="relative overflow-hidden py-16 md:py-24 grad-sky-white">
        <AmbientBackground variant="sky" intensity="normal" />
        <div className="relative z-10 container-page grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <p className="eyebrow mb-4">Our Story</p>
            <div className="space-y-4 text-navy/70 leading-relaxed text-[15px] md:text-base">
              <p>
                Illumina Health Lab began with a shared conviction among student researchers: that
                the most complex challenges in cardiovascular medicine cannot be understood through
                a single discipline, institution, or geographic perspective.
              </p>
              <p>
                What started as a small group of students brought together by a common interest in
                cardiovascular health has grown into an international research community of emerging
                scholars, clinicians, and collaborators. Today, our work connects individuals across
                Canada, the United States, the United Kingdom, and Australia, with a growing network
                of partnerships extending beyond these regions.
              </p>
              <p>
                Our members bring different academic backgrounds, lived experiences, and perspectives
                to a common purpose: asking meaningful questions about how cardiovascular care can
                become more intelligent, preventive, accessible, and equitable.
              </p>
              <p>
                As early-career researchers, we recognize that our greatest strength is not claiming
                to have every answer. It is our willingness to learn, collaborate, challenge
                assumptions, and build alongside people whose experiences differ from our own.
              </p>
              <p>
                Illumina Health Lab was created as a space where emerging researchers could contribute
                to serious academic work, develop their skills through mentorship and collaboration,
                and participate in research capable of shaping future conversations in cardiovascular
                medicine.
              </p>
              <p>
                What unites us is a belief that meaningful progress begins when knowledge is shared
                across borders, disciplines, and generations.
              </p>
            </div>
          </div>

          <div>
            <p className="eyebrow mb-4">Our Mission</p>
            <div className="space-y-4 text-navy/70 leading-relaxed text-[15px] md:text-base">
              <p>
                Our mission is to empower the next generation of researchers to produce rigorous,
                collaborative, and socially responsible scholarship that advances cardiovascular and
                cardiometabolic health.
              </p>
              <p>
                We aim to investigate the questions that sit between traditional disciplines: how
                artificial intelligence can support, not replace, clinical judgment; how digital
                innovation can improve care without deepening existing inequities; and how geography,
                policy, socioeconomic conditions, and access to healthcare shape cardiovascular
                outcomes.
              </p>
              <p>
                As an emerging, student-led collective, our role is not to overstate our influence,
                but to build the foundations for meaningful impact. We do this by supporting carefully
                designed research, creating opportunities for students and early-career researchers,
                connecting collaborators across institutions, and producing evidence that can
                contribute to larger clinical, academic, and policy conversations.
              </p>
              <p>
                We are committed to research that is methodologically rigorous, ethically grounded,
                and attentive to the populations most often overlooked by innovation.
              </p>
              <p>
                Our long-term ambition is to help cultivate a generation of researchers who see
                cardiovascular medicine not only as a field of clinical discovery, but as a shared
                global responsibility.
              </p>
            </div>
            <div className="mt-7">
              <Button to="/impact" variant="outline">
                Explore Our Impact
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Journey timeline */}
      <section className="relative overflow-hidden py-16 md:py-24 grad-blush-warm">
        <AmbientBackground variant="warm" intensity="normal" />
        <div className="relative z-10 container-page">
          <p className="eyebrow mb-10 md:mb-14">Our Journey</p>

          {/* Desktop timeline */}
          <div className="hidden md:block relative">
            <div className="absolute top-[7px] left-0 right-0 h-px bg-navy/15" />
            <div className="grid grid-cols-5 gap-6">
              {journey.map((j, i) => (
                <div key={j.date} className="relative pt-8">
                  <span
                    className={`absolute top-0 left-0 w-3.5 h-3.5 rounded-full border-2 ${
                      i === journey.length - 1 ? 'border-navy/30 bg-white' : 'border-coral bg-coral'
                    }`}
                  />
                  <p className="text-xs font-semibold text-navy/50 tracking-wide mb-2">{j.date}</p>
                  <h4 className="font-serif text-lg text-navy mb-2 leading-snug">{j.title}</h4>
                  <p className="text-navy/60 text-sm leading-relaxed">{j.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile timeline */}
          <div className="md:hidden space-y-8">
            {journey.map((j) => (
              <div key={j.date} className="relative pl-7">
                <span className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-coral" />
                <span className="absolute left-[5px] top-5 bottom-[-2rem] w-px bg-navy/15 last:hidden" />
                <p className="text-xs font-semibold text-navy/50 tracking-wide mb-1.5">{j.date}</p>
                <h4 className="font-serif text-lg text-navy mb-1.5">{j.title}</h4>
                <p className="text-navy/60 text-sm leading-relaxed">{j.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Stand For */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-white">
        <AmbientBackground variant="plain" intensity="subtle" />
        <div className="relative z-10 container-page">
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
            <p className="eyebrow mb-4">What We Stand For</p>
            <h2 className="text-3xl md:text-4xl">Three commitments that guide everything we do.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {values.map((v) => (
              <div
                key={v.title}
                className="flex flex-col items-center text-center gap-4 h-full p-8 md:p-10 rounded-3xl bg-white border border-navy/10 card-shadow card-shadow-hover"
              >
                <div className={`w-16 h-16 rounded-full bg-white ring-1 ${v.ring} shadow-sm grid place-items-center ${v.color}`}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {v.icon}
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-navy mb-2 leading-snug">{v.title}</h3>
                  <p className="text-navy/55">{v.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership preview */}
      <section className="relative overflow-hidden py-16 md:py-24 grad-blush-sky">
        <AmbientBackground variant="blush" intensity="normal" ekg={false} />
        <div className="relative z-10 container-page grid md:grid-cols-[1fr_1fr] gap-12">
          <div>
            <div className="flex items-center justify-between mb-8">
              <p className="eyebrow">Meet Our Leadership</p>
              <a
                href="/team"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-coral transition-colors"
              >
                View All Team
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {boardMembers.map((m, i) => (
                <TeamCard key={m.name} name={m.name} role={m.role} institution={m.institution} bio={m.bio} linkedin={m.linkedin} email={m.email} photo={m.photo} index={i} />
              ))}
            </div>
          </div>

          <div className="relative bg-white rounded-3xl p-8 md:p-10 card-shadow flex flex-col justify-between overflow-hidden min-h-[280px]">
            <WorldMapDots className="absolute inset-y-0 right-0 w-[62%] text-navy/20 pointer-events-none" />
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 500 280"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="leadershipWave" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8FB9D6" stopOpacity="0" />
                  <stop offset="45%" stopColor="#8FB9D6" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#8FB9D6" stopOpacity="0.15" />
                </linearGradient>
              </defs>
              <path
                d="M120 190 C 220 150, 300 230, 380 185 S 470 150, 500 175"
                fill="none"
                stroke="url(#leadershipWave)"
                strokeWidth="10"
              />
              <path
                d="M150 215 C 250 195, 320 250, 400 210 S 480 190, 500 205"
                fill="none"
                stroke="url(#leadershipWave)"
                strokeWidth="5"
                opacity="0.7"
              />
            </svg>
            <p className="relative text-navy/70 text-lg leading-relaxed font-serif max-w-[55%]">
              We collaborate with hospitals, universities, innovators, and communities across the
              globe to drive meaningful change.
            </p>
            <div className="relative mt-8">
              <Button to="/get-involved" variant="secondary">
                Get Involved
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
