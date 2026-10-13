import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { scrollToEl, scrollToTop } from './smooth'

// Routeur minimal (History API) : /, /vendre, /acheter.
// Les anciennes URLs (/agence, /proprietaire) sont redirigées côté Vercel.
export const ROUTES = ['/', '/vendre', '/acheter']

const normalize = (p) => {
  const clean = '/' + p.replace(/^\/+|\/+$/g, '')
  return ROUTES.includes(clean) ? clean : '/'
}

const RouterContext = createContext({ path: '/', navigate: () => {} })

export function RouterProvider({ children }) {
  const [path, setPath] = useState(() => normalize(window.location.pathname))

  const navigate = useCallback((to) => {
    const [p, hash] = to.split('#')
    const target = normalize(p || window.location.pathname)
    if (target !== normalize(window.location.pathname) || hash) {
      window.history.pushState({}, '', target + (hash ? `#${hash}` : ''))
    }
    setPath(target)
    if (hash) {
      // Laisse React monter la page avant de défiler vers l'ancre.
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(hash)))
    } else {
      scrollToTop()
    }
  }, [])

  useEffect(() => {
    const onPop = () => setPath(normalize(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>
}

export const useRouter = () => useContext(RouterContext)

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) scrollToEl(el)
}

// Lien interne : clic intercepté, URL réelle conservée pour le SEO et le clic molette.
export function Link({ to, children, className = '', onClick, ...rest }) {
  const { navigate, path } = useRouter()
  const current = to.split('#')[0] === path && !to.includes('#')
  return (
    <a
      href={to}
      aria-current={current ? 'page' : undefined}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        onClick?.(e)
        navigate(to)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
