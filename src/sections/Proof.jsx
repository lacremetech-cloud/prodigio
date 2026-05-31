import { motion } from 'framer-motion'
import Photo from '../components/Photo'
import Reveal from '../components/Reveal'
import { common } from '../data/content'
import { images } from '../data/images'

// Section 4 — La preuve. Plein écran immersif sur photo, avec les chiffres.
// Le cas Chalet Mitja, commun à tous les profils.
export default function Proof() {
  const { proof } = common

  return (
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden py-32">
      <Photo
        src={images.proof}
        veil="veil-full"
        parallax
        label="PHOTO 4K — CHALET MITJA, FONT-ROMEU"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">{proof.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-7 font-serif text-4xl font-light leading-tight text-paper sm:text-6xl">
              {proof.title}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-base font-light text-smoke-200/80">
              {proof.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Bloc de chiffres en verre */}
        <Reveal delay={0.25}>
          <div className="glass-strong mt-14 inline-block w-full max-w-3xl p-8 sm:p-12">
            <span className="text-[0.7rem] uppercase tracking-luxe text-smoke-200/80">
              {proof.period}
            </span>

            <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-3">
              {proof.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    delay: 0.2 + i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="font-display text-6xl font-light leading-none text-paper sm:text-7xl">
                    {stat.value}
                  </div>
                  <div className="mt-4 text-xs font-light leading-relaxed text-smoke-200/70">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="hairline mt-10" />
            <p className="mt-6 max-w-xl text-xs font-light italic leading-relaxed text-smoke-200/60">
              {proof.footnote}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
