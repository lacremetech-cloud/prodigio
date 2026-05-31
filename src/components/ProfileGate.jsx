import { motion } from 'framer-motion'
import { common, profiles, profileOrder } from '../data/content'
import Photo from './Photo'
import { images } from '../data/images'

// ====================================================================
//  Écran d'accueil — sélecteur de profil (plein écran, théâtral).
//  C'est le premier contact : épuré, lent, prestigieux.
// ====================================================================
export default function ProfileGate({ onSelect }) {
  return (
    <motion.section
      key="gate"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center px-6 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Fond photographique plein écran, très assombri. */}
      <Photo
        src={images.hero.proprietaire}
        veil=""
        label="PHOTO 4K — BIEN D’EXCEPTION"
        parallax={false}
      />
      <div className="absolute inset-0 bg-ink/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink/90" />

      {/* Contenu */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        {/* Logo + baseline */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <h1 className="font-display text-4xl tracking-luxe text-paper sm:text-5xl">
            {common.brand.name}
          </h1>
          <span className="mt-4 text-[0.65rem] uppercase tracking-luxe text-smoke-400">
            {common.brand.baseline}
          </span>
        </motion.div>

        {/* Filet + accroche */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-col items-center"
        >
          <div className="h-10 w-px bg-gradient-to-b from-white/0 via-white/40 to-white/0" />
          <h2 className="mt-8 max-w-3xl font-serif text-4xl font-light leading-tight text-paper sm:text-6xl">
            {common.gate.question}
          </h2>
          <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-smoke-200/80">
            {common.gate.subtitle}
          </p>
        </motion.div>

        {/* Cartes de profil */}
        <div className="mt-16 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {profileOrder.map((key, i) => {
            const p = profiles[key]
            return (
              <motion.button
                key={key}
                onClick={() => onSelect(key)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.5 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
                className="glass group relative flex min-h-[200px] flex-col items-start justify-between
                  overflow-hidden p-7 text-left transition-all duration-700 ease-luxe
                  hover:border-white/40 hover:bg-white/[0.13]"
              >
                <span className="text-[0.6rem] uppercase tracking-wideluxe text-smoke-400">
                  0{i + 1}
                </span>

                <div className="mt-auto">
                  <h3 className="font-serif text-2xl font-light leading-tight text-paper">
                    {p.label}
                  </h3>
                  <p className="mt-3 text-xs font-light leading-relaxed text-smoke-200/70">
                    {p.gateTagline}
                  </p>
                </div>

                {/* Flèche révélée au survol */}
                <span
                  className="mt-6 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-wideluxe
                    text-paper opacity-0 transition-all duration-500 ease-luxe
                    group-hover:opacity-100"
                >
                  Entrer
                  <span className="transition-transform duration-500 ease-luxe group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Indice de bas d'écran */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.4 }}
        className="absolute bottom-8 text-[0.6rem] uppercase tracking-wideluxe text-smoke-400"
      >
        Choisissez un profil pour commencer
      </motion.span>
    </motion.section>
  )
}
