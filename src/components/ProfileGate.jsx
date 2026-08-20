import { motion } from 'framer-motion'
import { common, profiles, profileOrder } from '../data/content'
import Photo from './Photo'
import { images } from '../data/images'

// ====================================================================
//  Écran d'accueil — sélecteur de profil (plein écran, théâtral).
//  C'est le premier contact : épuré, lent, prestigieux.
//  Pensé pour tenir en un écran sur mobile (grille 2×2 compacte),
//  tout en restant scrollable si l'appareil est très court.
// ====================================================================
export default function ProfileGate({ onSelect }) {
  return (
    <motion.section
      key="gate"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center px-5 py-12 sm:px-6 sm:py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Fond photographique plein écran, très assombri pour la lisibilité. */}
      <Photo
        src={images.hero.proprietaire}
        veil=""
        label="PHOTO 4K · BIEN D’EXCEPTION"
        parallax={false}
      />
      <div className="absolute inset-0 bg-ink/85" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/90" />

      {/* Contenu */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        {/* Logo + baseline */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <h1 className="text-on-photo font-display text-3xl tracking-luxe text-paper sm:text-5xl">
            {common.brand.name}
          </h1>
          <span className="mt-3 text-[0.6rem] uppercase tracking-luxe text-smoke-200/80 sm:mt-4 sm:text-[0.65rem]">
            {common.brand.baseline}
          </span>
        </motion.div>

        {/* Filet + accroche */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-col items-center sm:mt-14"
        >
          <div className="h-8 w-px bg-gradient-to-b from-white/0 via-white/50 to-white/0 sm:h-10" />
          <h2 className="text-on-photo mt-6 font-serif text-4xl font-light italic leading-tight text-paper sm:mt-8 sm:text-6xl">
            {common.gate.question}
          </h2>
          <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-smoke-200/90 sm:mt-6">
            {common.gate.subtitle}
          </p>
        </motion.div>

        {/* Cartes de profil — centrées, deux profils côte à côte sur desktop. */}
        <div className="mx-auto mt-9 grid w-full max-w-2xl grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2">
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
                className="group relative flex min-h-[150px] flex-col items-start justify-between
                  overflow-hidden border border-white/25 bg-white/[0.08] p-5 text-left
                  shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl
                  transition-all duration-700 ease-luxe
                  hover:border-white/50 hover:bg-white/[0.16]
                  sm:min-h-[210px] sm:p-7"
              >
                <span className="text-[0.6rem] uppercase tracking-wideluxe text-smoke-200/80">
                  0{i + 1}
                </span>

                <div className="mt-auto">
                  <h3 className="font-serif text-xl font-light leading-tight text-paper sm:text-2xl">
                    {p.label}
                  </h3>
                  <p className="mt-2 text-[0.7rem] font-light leading-relaxed text-smoke-200/85 sm:mt-3 sm:text-xs">
                    {p.gateTagline}
                  </p>
                </div>

                {/* Flèche — toujours visible sur mobile, révélée au survol sur desktop. */}
                <span
                  className="mt-4 inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-wideluxe
                    text-paper transition-all duration-500 ease-luxe
                    sm:mt-6 sm:opacity-0 sm:group-hover:opacity-100"
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

        {/* Indice — en flux (plus de chevauchement possible sur mobile). */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.4 }}
          className="mt-10 text-[0.6rem] uppercase tracking-wideluxe text-smoke-200/70"
        >
          {common.gate.hint}
        </motion.span>
      </div>
    </motion.section>
  )
}
