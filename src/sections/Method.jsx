import Reveal from '../components/Reveal'
import { common } from '../data/content'

// Section 3 — La Méthode Prodigio™. Section sombre.
// Récit actif vs passif + 3 temps + phrase de résultat. Contenu commun.
export default function Method() {
  const { method } = common

  return (
    <section className="relative w-full bg-ink px-6 py-32 sm:py-44">
      <div className="mx-auto w-full max-w-6xl">
        {/* Intro */}
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">{method.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-7 font-serif text-xl font-light italic text-smoke-200/80 sm:text-2xl">
              {method.lead}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <h2 className="mt-4 font-serif text-3xl font-light leading-tight text-paper sm:text-5xl">
              {method.title}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-base font-light leading-relaxed text-smoke-200/70 sm:text-lg">
              {method.intro}
            </p>
          </Reveal>
        </div>

        {/* Les 3 temps */}
        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden border border-white/10 md:grid-cols-3">
          {method.steps.map((step, i) => (
            <Reveal
              key={step.index}
              delay={i * 0.15}
              className="group relative bg-ink p-9 transition-colors duration-700 ease-luxe hover:bg-white/[0.03] sm:p-11"
            >
              <span className="font-display text-5xl font-light text-white/15 transition-colors duration-700 group-hover:text-white/30">
                {step.index}
              </span>
              <h3 className="mt-8 font-serif text-2xl font-light leading-snug text-paper">
                {step.name}
              </h3>
              <div className="mt-5 h-px w-10 bg-white/20" />
              <p className="mt-6 text-sm font-light leading-relaxed text-smoke-200/70">
                {step.text}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Phrase de résultat */}
        <Reveal delay={0.15}>
          <div className="mt-16 flex flex-col items-center text-center">
            <span className="text-[0.7rem] uppercase tracking-luxe text-smoke-400">
              Résultat
            </span>
            <p className="mt-5 max-w-3xl font-serif text-2xl font-light leading-snug text-paper sm:text-4xl">
              Pendant que les autres attendent une visite,{' '}
              <span className="italic">vous signez.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
