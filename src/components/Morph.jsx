import { AnimatePresence, motion } from 'framer-motion'

// Fait « fondre et glisser » son contenu chaque fois que `trigger` change
// (ici : le profil actif). Utilisé pour les textes qui s'adaptent à la cible,
// afin qu'ils ne « sautent » jamais — ils se fondent élégamment.
export default function Morph({ trigger, children, className = '', y = 14 }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={trigger}
        className={className}
        initial={{ opacity: 0, y, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -y, filter: 'blur(4px)' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
