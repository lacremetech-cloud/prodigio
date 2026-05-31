import Reveal from '../components/Reveal'
import { common } from '../data/content'

// Section 3 — La solution Prodigio. Section sombre.
// Les 3 temps : Brand Development → Market Activation → Sales Performance.
// Contenu commun à tous les profils.
export default function Solution() {
  const { solution } = common

  return (
    <section className="relative w-full bg-ink px-6 py-32 sm:py-44">
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">{solution.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-7 font-serif text-3xl font-light leading-tight text-paper sm:text-5xl">
              {solution.title}
            </h2>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden border border-white/10 md:grid-cols-3">
          {solution.steps.map((step, i) => (
            <Reveal
              key={step.index}
              delay={i * 0.15}
              className="group relative bg-ink p-9 transition-colors duration-700 ease-luxe hover:bg-white/[0.03] sm:p-11"
            >
              <span className="font-display text-5xl font-light text-white/15 transition-colors duration-700 group-hover:text-white/30">
                {step.index}
              </span>
              <h3 className="mt-8 font-serif text-2xl font-light text-paper">
                {step.name}
              </h3>
              <div className="mt-5 h-px w-10 bg-white/20" />
              <p className="mt-6 text-sm font-light leading-relaxed text-smoke-200/70">
                {step.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
