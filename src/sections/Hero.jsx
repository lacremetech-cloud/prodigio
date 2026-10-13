import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { BgVideo } from '../components/Media'
import { LineReveal } from '../components/Reveal'
import { Link } from '../lib/router'

const EASE = [0.22, 1, 0.36, 1]

// Hero plein écran : une ou plusieurs vidéos en fondu enchaîné,
// titre révélé ligne par ligne, léger zoom et assombrissement au scroll.
export default function Hero({ eyebrow, lines, sub, videos, primary, secondary, children }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  useEffect(() => {
    if (videos.length < 2 || reduce) return
    const t = setInterval(() => setIndex((i) => (i + 1) % videos.length), 7000)
    return () => clearInterval(t)
  }, [videos.length, reduce])

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { scale }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          >
            <BgVideo video={videos[index]} />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="veil-hero absolute inset-0" />

      <motion.div style={reduce ? undefined : { y: textY, opacity: fade }} className="wrap relative z-10 pb-20 pt-36 sm:pb-24">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
        >
          {eyebrow}
        </motion.p>
        <LineReveal as="h1" lines={lines} immediate delay={0.35} className="h-display text-shadow mt-6 max-w-5xl text-bone" />
        <motion.p
          className="mt-7 max-w-xl text-[1.06rem] leading-relaxed text-bone/85 sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: EASE }}
        >
          {sub}
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: EASE }}
        >
          {primary && (
            <Link to={primary.to} className="btn-gold">
              {primary.label} <span className="arrow">→</span>
            </Link>
          )}
          {secondary && (
            <Link to={secondary.to} className="btn-line">
              {secondary.label}
            </Link>
          )}
        </motion.div>
        {children}
      </motion.div>

      {/* Indicateur de défilement */}
      <div className="absolute bottom-8 right-5 z-10 hidden flex-col items-center gap-3 sm:right-8 sm:flex lg:right-12" aria-hidden="true">
        <span className="text-[0.6rem] uppercase tracking-luxe text-bone/60 [writing-mode:vertical-rl]">Défiler</span>
        <span className="relative h-10 w-px overflow-hidden bg-bone/25">
          <span className="absolute left-0 top-0 h-3 w-px animate-scroll-dot bg-gold" />
        </span>
      </div>

      {videos.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 gap-2 sm:flex" aria-hidden="true">
          {videos.map((_, i) => (
            <span key={i} className={`h-px w-8 transition-colors duration-700 ${i === index ? 'bg-gold' : 'bg-bone/30'}`} />
          ))}
        </div>
      )}
    </section>
  )
}

// Bandeau défilant (biens, preuves) sous le hero.
export function Ticker({ items }) {
  const row = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-bone/10 bg-ink py-5" aria-label={items.join(', ')}>
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap" aria-hidden="true">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12 text-[0.72rem] uppercase tracking-wideluxe text-bone/70">
            {t}
            <span className="h-1 w-1 rotate-45 bg-gold" />
          </span>
        ))}
      </div>
    </div>
  )
}
