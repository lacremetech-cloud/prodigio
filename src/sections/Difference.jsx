import { motion } from 'framer-motion'
import Photo from '../components/Photo'
import Reveal from '../components/Reveal'
import Morph from '../components/Morph'
import { common } from '../data/content'
import { images } from '../data/images'

// Section 6 — La différence Prodigio. Section sombre sur photo.
// Contenu commun, légèrement teinté par l'accent du profil.
export default function Difference({ profile }) {
  const { difference } = common
  const { key, differenceAccent } = profile

  return (
    <section className="relative w-full overflow-hidden py-32 sm:py-44">
      <Photo src={images.difference} veil="veil-full" parallax />
      <div className="absolute inset-0 bg-ink/70" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="max-w-3xl">
          <Reveal>
            <span className="eyebrow">{difference.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-7 font-serif text-4xl font-light leading-tight text-paper sm:text-6xl">
              {difference.title}
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-8 text-base font-light leading-relaxed text-smoke-200/75 sm:text-lg">
              {difference.body}
            </p>
          </Reveal>
        </div>

        {/* Trois piliers */}
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {difference.pillars.map((pillar, i) => (
            <Reveal key={pillar.name} delay={i * 0.12}>
              <div className="glass h-full p-8 transition-all duration-700 ease-luxe hover:bg-white/[0.12]">
                <span className="font-display text-2xl font-light text-paper">
                  {pillar.name}
                </span>
                <div className="mt-4 h-px w-8 bg-white/25" />
                <p className="mt-5 text-sm font-light leading-relaxed text-smoke-200/70">
                  {pillar.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Clôture commune + accent propre au profil */}
        <Reveal delay={0.2}>
          <p className="mt-16 max-w-3xl font-serif text-2xl font-light leading-snug text-paper sm:text-3xl">
            {difference.closing}
          </p>
        </Reveal>

        <Morph trigger={key}>
          <div className="mt-10 flex items-start gap-5 border-l border-white/25 pl-6">
            <p className="max-w-2xl text-base font-light italic leading-relaxed text-smoke-200/85 sm:text-lg">
              « {differenceAccent} »
            </p>
          </div>
        </Morph>
      </div>
    </section>
  )
}
