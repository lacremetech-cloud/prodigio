import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { common, profiles, profileOrder } from '../data/content'

// ====================================================================
//  Header discret — logo PRODIGIO + sélecteur de profil compact.
//  Permet de changer de cible sans revenir à l'écran d'accueil.
//  Devient « verre » dès que l'on scrolle un peu.
// ====================================================================
export default function Header({ activeProfile, onChangeProfile, onBackToGate }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const current = profiles[activeProfile]

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-luxe
        ${
          scrolled
            ? 'border-b border-white/10 bg-ink/70 py-3 backdrop-blur-xl'
            : 'bg-transparent py-5'
        }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
        {/* Logo — ramène à l'écran d'accueil */}
        <button
          onClick={onBackToGate}
          className="group flex flex-col items-start leading-none"
          aria-label="Revenir à l'écran d'accueil"
        >
          <span className="font-display text-lg tracking-luxe text-paper">
            {common.brand.name}
          </span>
          <span className="mt-1 hidden text-[0.55rem] uppercase tracking-wideluxe text-smoke-400 sm:block">
            {common.brand.baseline}
          </span>
        </button>

        {/* Sélecteur de profil compact */}
        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="glass flex items-center gap-3 px-5 py-2.5 text-[0.65rem] uppercase
              tracking-wideluxe text-paper transition-all duration-500 ease-luxe
              hover:border-white/40 hover:bg-white/[0.14]"
          >
            <span className="text-smoke-400">Profil —</span>
            <span>{current?.short}</span>
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-smoke-200"
            >
              ⌄
            </motion.span>
          </button>

          <AnimatePresence>
            {open && (
              <>
                {/* Zone de clic pour fermer */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-0 z-50 mt-3 w-60 overflow-hidden border border-white/15 bg-ink/85 p-2 backdrop-blur-2xl"
                >
                  {profileOrder.map((key) => {
                    const p = profiles[key]
                    const active = key === activeProfile
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          onChangeProfile(key)
                          setOpen(false)
                        }}
                        className={`flex w-full items-center justify-between px-4 py-3 text-left
                          text-sm font-light transition-colors duration-300
                          ${active ? 'text-paper' : 'text-smoke-200/70 hover:text-paper'}`}
                      >
                        <span>{p.label}</span>
                        {active && <span className="text-[0.6rem]">●</span>}
                      </button>
                    )
                  })}

                  <div className="hairline my-1" />

                  <button
                    onClick={() => {
                      onBackToGate()
                      setOpen(false)
                    }}
                    className="w-full px-4 py-3 text-left text-[0.65rem] uppercase
                      tracking-wideluxe text-smoke-400 transition-colors duration-300 hover:text-paper"
                  >
                    ← Revenir à l’accueil
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  )
}
