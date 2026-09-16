import PageHero from '../components/PageHero.jsx'
import PublicationList from '../components/PublicationList.jsx'
import PosterSpotlight from '../components/PosterSpotlight.jsx'
import AmbientBackground from '../components/AmbientBackground.jsx'

export default function Publications() {
  return (
    <>
      <PageHero
        eyebrow="Our Research"
        title="Publications"
        subtitle="Advancing cardiovascular health through AI, equity, and global collaboration."
        compact
      />

      {/* Accepted conference posters / presentations */}
      <section className="relative overflow-hidden py-12 md:py-16 grad-blush-sky">
        <AmbientBackground variant="blush" intensity="normal" />
        <div className="relative z-10 container-page">
          <PosterSpotlight />
        </div>
      </section>

      {/* Journal publications */}
      <section className="relative overflow-hidden py-10 md:py-16 grad-blush-warm">
        <AmbientBackground variant="warm" intensity="subtle" />
        <div className="relative z-10 container-page">
          <div className="mb-8 md:mb-10">
            <p className="eyebrow mb-3">Journal Articles</p>
            <h2 className="text-2xl md:text-3xl max-w-xl">Peer-reviewed research and publications.</h2>
          </div>
          <PublicationList />
        </div>
      </section>
    </>
  )
}
