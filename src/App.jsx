import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Sell from './pages/Sell'
import Buy from './pages/Buy'
import { RouterProvider, scrollToId, useRouter } from './lib/router'
import { initSmoothScroll } from './lib/smooth'
import { buy, home, sell } from './data/site'

const SITE = 'https://www.prodigio.fr'
const PAGES = {
  '/': { Component: Home, seo: home.seo },
  '/vendre': { Component: Sell, seo: sell.seo },
  '/acheter': { Component: Buy, seo: buy.seo },
}

// Titre et balises de partage à jour à chaque page (alignés sur scripts/prerender.mjs).
function useSeo(path) {
  useEffect(() => {
    const { seo } = PAGES[path]
    const url = SITE + (path === '/' ? '/' : path)
    document.title = seo.title
    const set = (sel, attr, val) => document.head.querySelector(sel)?.setAttribute(attr, val)
    set('meta[name="description"]', 'content', seo.description)
    set('link[rel="canonical"]', 'href', url)
    set('meta[property="og:title"]', 'content', seo.title)
    set('meta[property="og:description"]', 'content', seo.description)
    set('meta[property="og:url"]', 'content', url)
    set('meta[name="twitter:title"]', 'content', seo.title)
    set('meta[name="twitter:description"]', 'content', seo.description)
  }, [path])
}

function Pages() {
  const { path } = useRouter()
  const { Component } = PAGES[path]
  useSeo(path)

  // Arrivée directe sur une ancre (/vendre#eligibilite depuis une publicité).
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id) setTimeout(() => scrollToId(id), 600)
  }, [])

  return (
    <>
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-gold focus:px-4 focus:py-3 focus:text-ink">
        Aller au contenu
      </a>
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          id="contenu"
          key={path}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Component />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  )
}

export default function App() {
  useEffect(() => initSmoothScroll(), [])
  return (
    <RouterProvider>
      <Pages />
    </RouterProvider>
  )
}
