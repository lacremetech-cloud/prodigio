import { motion } from 'framer-motion'
import Photo from '../components/Photo'
import Morph from '../components/Morph'
import { images } from '../data/images'

// Section 1 — Hero plein écran. Accroche principale adaptée au profil.
export default function Hero({ profile, onContact }) {
  const { hero, key } = profile
  // Le titre peut contenir un saut de ligne volontaire (\n) → deux lignes.
  const titleLines = hero.title.split('\n')

  return (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden">
      <Photo src={images.hero[key]} veil="veil-full" parallax />
      {/* Voile central : renforce le contraste du texte au milieu de l'écran. */}
      <div className="scrim-center pointer-events-none absolute inset-0 z-[1]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 text-center">
        <Morph trigger={key} className="flex flex-col items-center">
          <span className="eyebrow text-on-photo text-smoke-200">{hero.eyebrow}</span>

          <h1 className="text-on-photo mt-8 font-serif text-5xl font-light leading-[1.04] text-paper sm:text-7xl lg:text-[5rem]">
            {titleLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="text-on-photo mx-auto mt-9 max-w-2xl text-base font-light leading-relaxed text-paper/95 sm:text-lg">
            {hero.subtitle}
          </p>
        </Morph>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center"
        >
          <button onClick={onContact} className="btn-glass">
            Prendre contact
            <span className="transition-transform duration-500 ease-luxe">→</span>
          </button>
          <a
            href="#probleme"
            className="text-[0.65rem] uppercase tracking-wideluxe text-smoke-200/70
              transition-colors duration-500 hover:text-paper"
          >
            {hero.cta}
          </a>
        </motion.div>
      </div>

      {/* Indicateur de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0.3, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="h-12 w-px bg-gradient-to-b from-white/0 via-white/60 to-white/0" />
      </motion.div>
    </section>
  )
}
