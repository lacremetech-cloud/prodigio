import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Hero from '../sections/Hero'
import { Faq, FormSection, Proof, Story } from '../sections/Shared'
import Reveal, { Curtain, LineReveal } from '../components/Reveal'
import { Img } from '../components/Media'
import { media, sell } from '../data/site'

const EASE = [0.22, 1, 0.36, 1]

function Problem() {
  const p = sell.problem
  return (
    <section className="on-light bg-bone py-28 text-ink sm:py-36">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <Reveal>
              <p className="eyebrow">{p.eyebrow}</p>
            </Reveal>
            <LineReveal lines={p.title} className="h-section mt-6" />
          </div>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-ink/80">{p.text}</p>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-px border border-ink/10 bg-ink/10 md:grid-cols-3">
          {p.stats.map((s, i) => (
            <Reveal key={s.big} delay={i * 0.1} className="flex flex-col bg-bone p-8 sm:p-10">
              <p className="font-serif text-5xl text-gold-deep sm:text-6xl">{s.big}</p>
              <p className="mt-5 leading-relaxed text-ink/80">{s.text}</p>
              {s.source && <p className="mt-auto pt-6 text-xs text-ink/55">Source : {s.source}</p>}
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mx-auto mt-20 max-w-3xl text-center font-serif text-3xl italic leading-snug text-ink sm:text-4xl">{p.social}</p>
        </Reveal>
      </div>
    </section>
  )
}

// Méthode : colonne de texte qui défile, image épinglée qui change à chaque étape.
function Method() {
  const m = sell.method
  const [active, setActive] = useState(0)
  return (
    <section id="methode" className="bg-ink py-28 sm:py-36">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{m.eyebrow}</p>
        </Reveal>
        <LineReveal lines={m.title} className="h-section mt-6 max-w-3xl text-bone" />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative hidden lg:block">
            <div className="sticky top-24 h-[calc(100vh-8rem)]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Img image={m.steps[active].image} className="h-full w-full" sizes="50vw" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-6 left-6 font-serif text-8xl text-bone/90 text-shadow">{m.steps[active].n}</div>
            </div>
          </div>

          <div>
            {m.steps.map((s, i) => (
              <motion.article
                key={s.n}
                onViewportEnter={() => setActive(i)}
                viewport={{ amount: 0.6 }}
                className="flex min-h-[auto] flex-col justify-center border-t border-bone/10 py-12 lg:min-h-[80vh]"
              >
                <Curtain className="mb-8 lg:hidden">
                  <Img image={s.image} className="aspect-[4/3] w-full" sizes="100vw" />
                </Curtain>
                <Reveal>
                  <p className="text-[0.7rem] uppercase tracking-luxe text-gold">
                    {s.n} · {s.name}
                  </p>
                  <h3 className="mt-5 font-serif text-4xl leading-tight text-bone sm:text-5xl">{s.title}</h3>
                  <p className="mt-6 leading-relaxed text-bone/75">{s.text}</p>
                  <ul className="mt-8 space-y-3">
                    {s.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-4 text-bone/90">
                        <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden="true" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Benefits() {
  const b = sell.benefits
  return (
    <section className="relative overflow-hidden bg-ink py-28 sm:py-36">
      <Img image={media.m('verdun-terrasse')} className="absolute inset-0 opacity-35" sizes="100vw" parallax={8} />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
      <div className="wrap relative">
        <Reveal>
          <p className="eyebrow">{b.eyebrow}</p>
        </Reveal>
        <div className="mt-14 grid gap-12 md:grid-cols-3">
          {b.items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.12}>
              <span className="block h-px w-12 bg-gold" aria-hidden="true" />
              <h3 className="mt-6 font-serif text-4xl text-bone">{it.title}</h3>
              <p className="mt-4 leading-relaxed text-bone/80">{it.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Model() {
  const m = sell.model
  return (
    <section className="on-light bg-bone py-28 text-ink sm:py-36">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{m.eyebrow}</p>
        </Reveal>
        <LineReveal lines={m.title} className="h-section mt-6 max-w-4xl" />
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {m.items.map((it, i) => (
            <Reveal key={it.k} delay={i * 0.12} className="border-t border-ink/20 pt-8">
              <p className="font-serif text-2xl text-gold-deep">{it.k}</p>
              <h3 className="mt-4 font-serif text-3xl">{it.title}</h3>
              <p className="mt-4 leading-relaxed text-ink/75">{it.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Comparison() {
  const c = sell.comparison
  return (
    <section className="bg-ink py-28 sm:py-36">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{c.eyebrow}</p>
        </Reveal>
        <LineReveal lines={c.title} className="h-section mt-6 text-bone" />
        <Reveal delay={0.1} className="mt-14">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Comparaison entre une agence classique et PRODIGIO</caption>
            <thead>
              <tr className="border-b border-bone/15 text-[0.66rem] uppercase tracking-wideluxe">
                <th scope="col" className="hidden py-4 pr-6 font-normal text-mist md:table-cell">
                  <span className="sr-only">Critère</span>
                </th>
                <th scope="col" className="py-4 pr-4 font-normal text-mist">{c.columns[0]}</th>
                <th scope="col" className="py-4 font-normal text-gold">{c.columns[1]}</th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map(([label, a, b]) => (
                <tr key={label} className="border-b border-bone/10 align-top">
                  <th scope="row" className="hidden py-6 pr-6 font-serif text-xl font-normal text-bone md:table-cell">{label}</th>
                  <td className="py-6 pr-4 text-mist">
                    <span className="mb-1 block text-[0.62rem] uppercase tracking-wideluxe text-bone/50 md:hidden">{label}</span>
                    {a}
                  </td>
                  <td className="py-6 text-bone">
                    <span className="mb-1 block text-[0.62rem] uppercase tracking-wideluxe text-transparent md:hidden" aria-hidden="true">.</span>
                    {b}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <Reveal className="mt-16 grid gap-6 border border-gold/30 p-8 sm:p-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <h3 className="font-serif text-3xl text-bone">{sell.agencies.title}</h3>
          <p className="leading-relaxed text-bone/75">{sell.agencies.text}</p>
        </Reveal>
      </div>
    </section>
  )
}

export default function Sell() {
  const h = sell.hero
  return (
    <>
      <Hero
        eyebrow={h.eyebrow}
        lines={h.lines}
        sub={h.sub}
        videos={[h.video]}
        primary={{ to: '/vendre#eligibilite', label: h.cta }}
        secondary={{ to: '/vendre#methode', label: h.secondary }}
      />
      <Problem />
      <Method />
      <Proof />
      <Benefits />
      <Model />
      <Comparison />
      <Story />
      <Faq items={sell.faq} />
      <FormSection kind="vendre" config={sell.form} />
    </>
  )
}
