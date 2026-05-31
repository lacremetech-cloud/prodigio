import { motion } from 'framer-motion'

// Apparition douce au scroll : fade + léger translate, jamais brusque.
// `delay` permet d'échelonner plusieurs éléments (effet « stagger »).
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
  once = true,
  as = 'div',
}) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-12% 0px -12% 0px' }}
      transition={{
        duration: 1.1,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  )
}
