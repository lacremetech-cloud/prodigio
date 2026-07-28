import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import ProfileGate from './components/ProfileGate'
import Header from './components/Header'
import Hero from './sections/Hero'
import Problem from './sections/Problem'
import Manifesto from './sections/Manifesto'
import Method from './sections/Method'
import Proof from './sections/Proof'
import Model from './sections/Model'
import WhyUs from './sections/WhyUs'
import Comparison from './sections/Comparison'
import Founder from './sections/Founder'
import FinalCTA from './sections/FinalCTA'

import { profiles } from './data/content'

// Déduit le profil actif depuis l'URL : /agence, /proprietaire…
// Retourne null (écran d'accueil) si le chemin ne correspond à aucun profil.
function profileFromPath() {
  const key = window.location.pathname.replace(/^\/+|\/+$/g, '')
  return key && profiles[key] ? key : null
}

export default function App() {
  // `activeProfile` à null = écran d'accueil. Initialisé depuis l'URL
  // (permet le lien direct vers /agence ou /proprietaire).
  const [activeProfile, setActiveProfile] = useState(() => profileFromPath())

  // Navigue vers un profil et met l'URL à jour (lien partageable + bouton retour).
  const goToProfile = useCallback((key, { scroll = false } = {}) => {
    setActiveProfile(key)
    if (window.location.pathname !== `/${key}`) {
      window.history.pushState({}, '', `/${key}`)
    }
    if (scroll) window.scrollTo({ top: 0 })
  }, [])

  // Depuis l'écran d'accueil → on entre dans le site (et on remonte en haut).
  const handleSelect = useCallback((key) => goToProfile(key, { scroll: true }), [goToProfile])

  // Depuis le header → on change de page sans casser le défilement (morph en place).
  const handleChangeProfile = useCallback((key) => goToProfile(key), [goToProfile])

  // Retour à l'écran d'accueil.
  const handleBackToGate = useCallback(() => {
    setActiveProfile(null)
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/')
    }
    window.scrollTo({ top: 0 })
  }, [])

  // Synchronise l'état avec les boutons précédent/suivant du navigateur.
  useEffect(() => {
    const onPop = () => setActiveProfile(profileFromPath())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // Met à jour le titre et les balises SEO à chaque changement de page (les
  // valeurs doivent rester alignées sur le pré-rendu — scripts/prerender.mjs).
  useEffect(() => {
    const site = 'https://www.prodigio.fr'
    const seo = {
      gate: {
        title: 'PRODIGIO — Immobilier d’exception',
        description:
          'PRODIGIO transforme chaque bien d’exception en marque : branding, acquisition ciblée et accompagnement jusqu’à la vente. On ne met pas votre bien en vente, on le vend.',
        path: '/',
      },
      agence: {
        title: 'Agences immobilières de luxe : la machine d’acquisition — PRODIGIO',
        description: profiles.agence.hero.subtitle,
        path: '/agence',
      },
      proprietaire: {
        title: 'Vendre un bien d’exception, avec discrétion — PRODIGIO',
        description: profiles.proprietaire.hero.subtitle,
        path: '/proprietaire',
      },
    }
    const s = (activeProfile && seo[activeProfile]) || seo.gate
    const url = site + s.path
    document.title = s.title
    const set = (selector, attr, value) => {
      const el = document.head.querySelector(selector)
      if (el) el.setAttribute(attr, value)
    }
    set('meta[name="description"]', 'content', s.description)
    set('link[rel="canonical"]', 'href', url)
    set('meta[property="og:title"]', 'content', s.title)
    set('meta[property="og:description"]', 'content', s.description)
    set('meta[property="og:url"]', 'content', url)
    set('meta[name="twitter:title"]', 'content', s.title)
    set('meta[name="twitter:description"]', 'content', s.description)
  }, [activeProfile])

  const profile = activeProfile ? profiles[activeProfile] : null

  return (
    <div className="relative min-h-[100svh] bg-ink">
      <AnimatePresence mode="wait">
        {!profile ? (
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

            <Hero profile={profile} />
            <Problem profile={profile} />
            <Manifesto />
            <Method />
            <Proof />
            <Model profile={profile} />
            <WhyUs profile={profile} />
            <Comparison profile={profile} />
            <Founder />
            <FinalCTA />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
