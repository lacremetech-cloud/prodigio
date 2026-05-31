import Photo from '../components/Photo'
import Reveal from '../components/Reveal'
import Morph from '../components/Morph'
import { common } from '../data/content'
import { images } from '../data/images'

// Section 6 — Pourquoi nous. Section sombre sur photo.
// Les 4 raisons « Parce que… » (commun) + l'accent propre au profil.
export default function WhyUs({ profile }) {
  const { why } = common
  const { key, differenceAccent } = profile

  return (
    <section className="relative w-full overflow-hidden py-32 sm:py-44">
      <Photo src={images.why} veil="veil-full" parallax />
      <div className="absolute inset-0 bg-ink/72" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="max-w-3xl">
          <Reveal>
            <span className="eyebrow text-on-photo text-smoke-200">{why.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-on-photo mt-7 font-serif text-4xl font-light leading-tight text-paper sm:text-6xl">
              {why.title}
            </h2>
          </Reveal>
        </div>

        {/* 4 raisons en grille 2×2 */}
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
          {why.reasons.map((reason, i) => (
            <Reveal key={i} delay={(i % 2) * 0.12}>
              <div className="glass h-full p-8 transition-all duration-700 ease-luxe hover:bg-white/[0.12] sm:p-10">
                <span className="font-display text-3xl font-light text-white/15">
                  0{i + 1}
                </span>
                <h3 className="mt-5 font-serif text-xl font-light leading-snug text-paper sm:text-2xl">
                  {reason.title}
                </h3>
                <div className="mt-5 h-px w-10 bg-white/20" />
                <p className="mt-6 text-sm font-light leading-relaxed text-smoke-200/75">
                  {reason.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Accent propre au profil */}
        <Morph trigger={key}>
          <div className="mt-14 flex items-start gap-5 border-l border-white/25 pl-6">
            <p className="text-on-photo max-w-2xl font-serif text-xl font-light italic leading-snug text-paper/90 sm:text-2xl">
              « {differenceAccent} »
            </p>
          </div>
        </Morph>
      </div>
    </section>
  )
}
