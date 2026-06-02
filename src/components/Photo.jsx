import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// ====================================================================
//  Photo plein écran — placeholder 4K élégant, prêt pour les vrais visuels.
//
//  • Tant qu'aucune `src` n'est fournie (ou si l'image échoue à charger),
//    on affiche un beau dégradé sombre + l'étiquette « [PHOTO 4K] ».
//  • Pour mettre une vraie photo : passez simplement `src="..."`.
//  • Traitement cinématographique : désaturation (grayscale) + contraste,
//    pour coller à l'identité noir & blanc.
//  • `parallax` : la photo défile un peu plus lentement que le contenu.
// ====================================================================
export default function Photo({
  src,
  alt = '',
  label = 'PHOTO 4K — BIEN D’EXCEPTION',
  veil = 'veil-full', // classe de voile dégradé : 'veil-full' | 'veil-bottom' | ''
  parallax = true,
  grayscale = true, // false = couleurs naturelles (ex. portrait)
  className = '',
}) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  // Parallax : translation verticale légère pilotée par le scroll.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const showImage = src && !failed

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Dégradé de fond — toujours présent (placeholder + filet de sécurité). */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#161616] via-[#0d0d0d] to-[#000000]" />

      {/* Vraie photo (optionnelle), avec parallax et traitement N&B. */}
      {showImage && (
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={parallax ? { y, scale: 1.16 } : { scale: 1.05 }}
          className={`absolute inset-0 h-[116%] w-full object-cover
            ${grayscale ? 'grayscale contrast-[1.08] brightness-[0.92]' : ''}
            transition-opacity duration-[1600ms] ease-luxe
            ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {/* Voile dégradé pour garantir la lisibilité du texte blanc. */}
      {veil && <div className={`absolute inset-0 ${veil}`} />}

      {/* Étiquette de placeholder — discrète, disparaît dès qu'une photo charge. */}
      {!loaded && (
        <div className="absolute bottom-6 left-6 z-10">
          <span className="glass inline-block px-4 py-2 text-[0.6rem] uppercase tracking-wideluxe text-white/70">
            [ {label} ]
          </span>
        </div>
      )}
    </div>
  )
}
