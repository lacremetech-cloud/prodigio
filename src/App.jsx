import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import ProfileGate from './components/ProfileGate'
import Header from './components/Header'
import Hero from './sections/Hero'
import Problem from './sections/Problem'
import Solution from './sections/Solution'
import Proof from './sections/Proof'
import Model from './sections/Model'
import Difference from './sections/Difference'
import FinalCTA from './sections/FinalCTA'

import { profiles } from './data/content'

export default function App() {
  // `activeProfile` à null = on affiche l'écran d'accueil (sélecteur de profil).
  const [activeProfile, setActiveProfile] = useState(null)

  // Sélection d'un profil depuis l'écran d'accueil → on entre dans le site.
  const handleSelect = useCallback((key) => {
    setActiveProfile(key)
    window.scrollTo({ top: 0 })
  }, [])

  // Changement de profil depuis le header (le site reste affiché).
  const handleChangeProfile = useCallback((key) => {
    setActiveProfile(key)
  }, [])

  // Retour à l'écran d'accueil.
  const handleBackToGate = useCallback(() => {
    setActiveProfile(null)
    window.scrollTo({ top: 0 })
  }, [])

  // Défilement doux vers la section contact.
  const scrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const profile = activeProfile ? profiles[activeProfile] : null

  return (
    <div className="relative min-h-[100svh] bg-ink">
      <AnimatePresence mode="wait">
        {!activeProfile ? (
          <ProfileGate key="gate" onSelect={handleSelect} />
        ) : (
          <motion.main
            key="site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Header
              activeProfile={activeProfile}
              onChangeProfile={handleChangeProfile}
              onBackToGate={handleBackToGate}
            />

            <Hero profile={profile} onContact={scrollToContact} />
            <Problem profile={profile} />
            <Solution />
            <Proof />
            <Model profile={profile} />
            <Difference profile={profile} />
            <FinalCTA />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
