import PageHero from '../components/PageHero.jsx'
import Button from '../components/Button.jsx'
import AmbientBackground from '../components/AmbientBackground.jsx'

const icon = (path) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {path}
  </svg>
)

const sections = [
  {
    title: 'Student Researchers',
    color: 'text-coral bg-coral/10',
    icon: icon(
      <path
        d="M12 4L2 8.5L12 13L22 8.5L12 4Z M6 10.5V16C6 16 8.5 18.5 12 18.5C15.5 18.5 18 16 18 16V10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    ),
    body: 'Students interested in contributing to research projects in cardiometabolic health, health equity, artificial intelligence in medicine, and digital health policy are encouraged to reach out. Opportunities may include literature reviews, data analysis, and collaborative manuscript preparation.',
  },
  {
    title: 'Research Collaborations',
    color: 'text-navy bg-skyblue',
    icon: icon(
      <>
        <circle cx="8.5" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2.8 19c0.6-2.9 2.7-4.8 5.2-4.8s4.6 1.9 5.2 4.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11.3 19c0.6-2.9 2.7-4.8 5.2-4.8s4.6 1.9 5.2 4.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
    body: 'We collaborate with investigators across institutions internationally. Researchers interested in joint projects, cross-institutional studies, or methodological collaborations are welcome to connect.',
  },
  {
    title: 'Mentorship & Training',
    color: 'text-amber bg-amber/10',
    icon: icon(
      <>
        <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 20c1-3.8 3.8-6 7-6s6 2.2 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M17.5 4.5L19 6L22 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    body: 'Illumina Health Lab supports mentorship for students and early-career researchers interested in academic medicine, health systems research, and interdisciplinary health innovation.',
  },
  {
    title: 'Contact',
    color: 'text-coral bg-blush',
    icon: icon(
      <>
        <rect x="2.5" y="5" width="19" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3.5 6.5L12 13L20.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    body: (
      <>
        For collaboration opportunities or to learn more about joining Illumina Health Lab:
        <br />
        <a
          href="mailto:illuminahealthresearch@gmail.com"
          className="font-semibold text-navy hover:text-coral transition-colors"
        >
          illuminahealthresearch@gmail.com
        </a>
      </>
    ),
  },
]

export default function GetInvolved() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Get Involved"
        subtitle="Join a community advancing cardiovascular health through medicine, artificial intelligence, and global health equity."
        compact
      />

      <section className="relative overflow-hidden py-10 md:py-16 grad-sky-white">
        <AmbientBackground variant="sky" intensity="normal" />
        <div className="relative z-10 container-page">
          <div className="max-w-4xl mx-auto">
            {sections.map((s) => (
              <div
                key={s.title}
                className="flex flex-col sm:flex-row sm:items-start gap-5 md:gap-8 py-8 thin-divider first:border-t-0"
              >
                <div className={`shrink-0 w-14 h-14 rounded-full grid place-items-center ${s.color}`}>
                  {s.icon}
                </div>
                <div className="sm:w-52 shrink-0">
                  <h3 className="font-serif text-xl md:text-2xl text-navy">{s.title}</h3>
                </div>
                <p className="text-navy/65 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button href="mailto:illuminahealthresearch@gmail.com" variant="secondary">
              Start a Conversation
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
