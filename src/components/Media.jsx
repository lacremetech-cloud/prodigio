import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

// Image responsive (2 tailles WebP), fondu à l'arrivée, parallaxe optionnelle.
export function Img({ image, alt = '', className = '', sizes = '100vw', parallax = 0, eager = false, imgClassName = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef(null)
  // Image déjà en cache : l'événement load a pu partir avant l'abonnement.
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth) setLoaded(true)
  }, [image.src])
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`])
  const useParallax = parallax > 0 && !reduce

  return (
    <div ref={ref} className={`${/\b(absolute|fixed)\b/.test(className) ? '' : 'relative'} overflow-hidden bg-ink-soft ${className}`}>
      <motion.img
        ref={imgRef}
        src={image.src}
        srcSet={`${image.srcSmall} 900w, ${image.src} 1800w`}
        sizes={sizes}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        style={useParallax ? { y, scale: 1 + parallax / 50 } : undefined}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-luxe ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  )
}

// Vidéo de fond muette en boucle : ne se lit que lorsqu'elle est visible.
// Avec « réduire les animations », on affiche seulement l'image fixe.
export function BgVideo({ video, className = '', active = true }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduce) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && active) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduce, active])

  if (reduce) {
    return <img src={video.poster} alt="" className={`h-full w-full object-cover ${className}`} />
  }
  return (
    <video
      ref={ref}
      className={`h-full w-full object-cover ${className}`}
      src={video.src}
      poster={video.poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  )
}
