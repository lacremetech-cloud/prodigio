import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Link, useRouter } from '../lib/router'
import { lockScroll } from '../lib/smooth'
import { brand } from '../data/site'

const EASE = [0.22, 1, 0.36, 1]
const NAV = [
  { to: '/vendre', label: 'Vendre' },
  { to: '/acheter', label: 'Acheter' },
  { to: '/acheter#biens', label: 'Nos biens' },
]

export function Logo({ className = '' }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <img src="/media/p-blanc.png" alt="" width="20" height="25" className="h-[25px] w-auto" />
      <span className="font-serif text-[1.15rem] tracking-luxe text-bone">{brand.name}</span>
    </span>
  )
}

// En-tête : transparent sur le hero, verre sombre ensuite ; se masque quand
// on descend et réapparaît dès qu'on remonte.
export default function Header() {
  const { path } = useRouter()
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setSolid(y > 60)
    setHidden(y > 400 && y > prev && !open)
  })

  useEffect(() => {
    lockScroll(open)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => setOpen(false), [path])

  const cta =
    path === '/acheter'
      ? { to: '/acheter#brochure', label: 'Recevoir une brochure' }
      : { to: '/vendre#eligibilite', label: 'Vendre avec PRODIGIO' }

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.45, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid || open ? 'border-b border-bone/10 bg-ink/80 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="wrap flex h-[72px] items-center justify-between">
          <Link to="/" aria-label="PRODIGIO, accueil" className="min-h-[44px] content-center">
            <Logo />
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center gap-9 md:flex">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className="link-underline py-2 text-[0.72rem] uppercase tracking-wideluxe text-bone/85 hover:text-bone">
                {n.label}
              </Link>
            ))}
            <Link to={cta.to} className="btn-line min-h-[44px] px-5">
              {cta.label}
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="relative flex h-11 w-11 cursor-pointer items-center justify-center md:hidden"
          >
            <span className={`absolute h-px w-6 bg-bone transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-[4px]'}`} />
            <span className={`absolute h-px w-6 bg-bone transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-[4px]'}`} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            className="fixed inset-0 z-40 flex flex-col bg-ink px-5 pb-10 pt-28 md:hidden"
          >
            <nav aria-label="Navigation mobile" className="flex flex-col">
              {[{ to: '/', label: 'Accueil' }, ...NAV].map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.05 + i * 0.06, ease: EASE }}
                  className="border-b border-bone/10"
                >
                  <Link to={n.to} className="block py-5 font-serif text-4xl text-bone">
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-auto flex flex-col gap-3">
              <Link to={cta.to} className="btn-gold">
                {cta.label} <span className="arrow">→</span>
              </Link>
              <a href={brand.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-line">
                WhatsApp · {brand.phoneLabel}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
