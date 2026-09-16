import AnimatedMedicalHero from './AnimatedMedicalHero.jsx'
import ParticleField from './ParticleField.jsx'

export default function PageHero({ eyebrow, title, subtitle, children, compact = false }) {
  return (
    <section className="relative overflow-hidden grad-blush-sky">
      <ParticleField className="absolute inset-0 w-full h-full" density={1.6} />
      <div className={`container-page grid md:grid-cols-2 gap-10 md:gap-8 items-center relative z-10 ${compact ? 'pt-14 pb-8 md:pt-16 md:pb-10' : 'pt-16 pb-10 md:pt-20 md:pb-14'}`}>
        <div className="relative z-10 animate-fade-up opacity-0" style={{ animationDelay: '0.05s' }}>
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl leading-[1.08] tracking-tight mb-5">
            {title}
          </h1>
          {subtitle && (
            <p className="text-navy/65 text-base md:text-lg leading-relaxed max-w-xl">{subtitle}</p>
          )}
          {children && <div className="mt-8 flex flex-wrap gap-4">{children}</div>}
        </div>
        <div className="relative z-0 md:pointer-events-none animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
          <AnimatedMedicalHero className="transform md:scale-[1.3] origin-[62%_50%]" />
        </div>
      </div>
    </section>
  )
}
