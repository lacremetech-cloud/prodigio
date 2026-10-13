import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

// Apparition douce au scroll : fondu + léger glissement.
export default function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  )
}

// Titre révélé ligne par ligne, chaque ligne glissant hors d'un masque.
// `lines` : tableau de chaînes, ou chaîne avec des \n.
export function LineReveal({ lines, as = 'h2', className = '', delay = 0, immediate = false, lineClassName = '' }) {
  const reduce = useReducedMotion()
  const list = Array.isArray(lines) ? lines : String(lines).split('\n')
  const Tag = as
  const animProps = immediate
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-8% 0px' } }
  return (
    <Tag className={className}>
      <motion.span className="block" {...(reduce ? {} : animProps)}>
        {list.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.08em]">
            <motion.span
              className={`block ${lineClassName}`}
              variants={{
                hidden: { y: '105%' },
                show: { y: '0%', transition: { duration: 1.15, delay: delay + i * 0.12, ease: EASE } },
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}

// Image dévoilée comme un rideau qui se lève.
export function Curtain({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.4, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

// Compteur animé (0 → valeur) à l'entrée dans l'écran.
export function Counter({ value, prefix = '', suffix = '', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, value, {
      duration: value > 50 ? 2.2 : 1.4,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, reduce])

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {display.toLocaleString('fr-FR')}
      {suffix}
    </span>
  )
}
