import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Reveal, { Counter, Curtain, LineReveal } from '../components/Reveal'
import { BgVideo, Img } from '../components/Media'
import LeadForm from '../components/LeadForm'
import { Link } from '../lib/router'
import { brand, founders, media, properties, proof, story } from '../data/site'

const EASE = [0.22, 1, 0.36, 1]

/* -------------------------------------------------------------------- */
/*  Étude de cas Font-Romeu : avant / après, compteurs, villes          */
/* -------------------------------------------------------------------- */
export function Proof() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 sm:py-36">
      <div className="absolute inset-0 opacity-30">
        <BgVideo video={media.v('chalet-soir')} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink" />
      <div className="wrap relative">
        <Reveal>
          <p className="eyebrow">{proof.eyebrow}</p>
        </Reveal>
        <LineReveal lines={proof.title} className="h-section mt-6 max-w-4xl text-bone" />
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-mist">{proof.context}</p>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden border border-bone/10 bg-bone/10 lg:grid-cols-[1fr_2fr]">
          <Reveal className="bg-ink/90 p-8 sm:p-10">
            <p className="text-[0.66rem] uppercase tracking-wideluxe text-mist">{proof.before.label}</p>
            <div className="mt-8 flex gap-12">
              {proof.before.items.map(([v, l]) => (
                <div key={l}>
                  <p className="font-serif text-6xl text-bone/45 line-through decoration-1 sm:text-7xl">{v}</p>
                  <p className="mt-2 text-sm text-mist">{l}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15} className="bg-ink/90 p-8 sm:p-10">
            <p className="text-[0.66rem] uppercase tracking-wideluxe text-gold">{proof.after.label}</p>
            <div className="mt-8 grid gap-10 sm:grid-cols-3">
              {proof.after.items.map((s) => (
                <div key={s.label}>
                  <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} className="whitespace-nowrap font-serif text-6xl text-gold lg:text-[4.2rem] xl:text-7xl" />
                  <p className="mt-2 text-sm text-bone/80">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <Reveal>
            <ul className="flex flex-wrap gap-x-8 gap-y-3 font-serif text-4xl text-bone sm:text-5xl" aria-label="Origine des demandes">
              {proof.cities.map((c, i) => (
                <motion.li
                  key={c}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
                  className="flex items-center gap-8"
                >
                  {c}
                  {i < proof.cities.length - 1 && <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />}
                </motion.li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-lg leading-relaxed text-bone/80">{proof.citiesNote}</p>
            <p className="mt-4 text-xs text-bone/45">{proof.footnote}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- */
/*  L'histoire en 4 actes, sur fond clair                               */
/* -------------------------------------------------------------------- */
export function Story() {
  return (
    <section className="on-light bg-bone py-28 text-ink sm:py-36">
      <div className="wrap grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow">{story.eyebrow}</p>
          </Reveal>
          <LineReveal lines={story.title} className="h-section mt-6 max-w-md" />
          <Curtain className="mt-10 hidden lg:block">
            <Img image={media.m('mitja-hero-vertical')} className="aspect-[4/5] w-full max-w-sm" sizes="400px" parallax={6} />
          </Curtain>
        </div>
        <ol className="relative">
          <span className="absolute left-[11px] top-2 h-[calc(100%-1rem)] w-px bg-ink/15" aria-hidden="true" />
          {story.acts.map((a, i) => (
            <Reveal as="li" key={a.label} delay={i * 0.05} className="relative pb-14 pl-12 last:pb-0">
              <span className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center border border-gold-deep bg-bone text-[0.6rem] text-gold-deep">
                {i + 1}
              </span>
              <p className="text-[0.66rem] uppercase tracking-wideluxe text-gold-deep">{a.label}</p>
              <p className="mt-3 font-serif text-[1.6rem] leading-snug text-ink sm:text-[1.9rem]">{a.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- */
/*  Les biens : défilement horizontal piloté par le scroll (desktop),   */
/*  glissé natif sur mobile.                                            */
/* -------------------------------------------------------------------- */
export function PropertyCard({ p, onBrochure, className = '' }) {
  return (
    <article className={`group relative overflow-hidden bg-ink-soft ${className}`}>
      <Img image={p.cover} alt={`${p.name}, ${p.place}`} className="absolute inset-0" imgClassName="transition-transform duration-[1.6s] ease-luxe group-hover:scale-[1.05]" sizes="(min-width: 1024px) 40vw, 85vw" />
      <div className="veil-card absolute inset-0" />
      <div className="absolute left-5 top-5">
        <span className={`tag backdrop-blur-md ${p.sold ? 'bg-ink/40 text-bone/80' : 'bg-ink/30 text-gold'}`}>{p.status}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <p className="text-[0.66rem] uppercase tracking-wideluxe text-bone/70">{p.place}</p>
        <h3 className="mt-2 font-serif text-4xl text-bone">{p.name}</h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-bone/80">{p.hook}</p>
        {onBrochure && !p.sold && (
          <button type="button" onClick={() => onBrochure(p)} className="mt-5 min-h-[44px] cursor-pointer text-[0.7rem] uppercase tracking-wideluxe text-gold">
            Recevoir la brochure <span aria-hidden="true">→</span>
          </button>
        )}
      </div>
    </article>
  )
}

export function PropertiesRail({ eyebrow, title, cta }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-46%'])

  const head = (
    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <LineReveal lines={title} className="h-section mt-6 text-bone" />
      </div>
      <Link to="/acheter#biens" className="btn-line self-start sm:self-auto">
        {cta} <span className="arrow">→</span>
      </Link>
    </div>
  )

  return (
    <>
      {/* Desktop : section épinglée, la rangée glisse avec le scroll. */}
      <section ref={ref} className={`relative hidden bg-ink lg:block ${reduce ? '' : 'h-[260vh]'}`}>
        <div className={`${reduce ? '' : 'sticky top-0 h-screen'} flex flex-col justify-center overflow-hidden py-24`}>
          <div className="wrap">{head}</div>
          <motion.div style={reduce ? undefined : { x }} className="mt-14 flex gap-6 pl-[max(3rem,calc((100vw-1320px)/2+3rem))]">
            {properties.map((p) => (
              <Link key={p.slug} to={`/acheter#bien-${p.slug}`} className="block shrink-0">
                <PropertyCard p={p} className="h-[62vh] w-[38vw]" />
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mobile et tablette : carrousel natif. */}
      <section className="bg-ink py-24 lg:hidden">
        <div className="wrap">{head}</div>
        <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:px-8">
          {properties.map((p) => (
            <Link key={p.slug} to={`/acheter#bien-${p.slug}`} className="block shrink-0 snap-start">
              <PropertyCard p={p} className="h-[66vh] max-h-[560px] w-[82vw] max-w-[420px]" />
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

/* -------------------------------------------------------------------- */
/*  Fondateurs                                                          */
/* -------------------------------------------------------------------- */
export function Founders() {
  return (
    <section className="bg-ink py-28 sm:py-36">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{founders.eyebrow}</p>
        </Reveal>
        <LineReveal lines={founders.title} className="h-section mt-6 max-w-3xl text-bone" />
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {founders.people.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.12} className="flex gap-6 border border-bone/10 p-6 sm:p-8">
              {f.photo ? (
                <img src={f.photo} alt={f.name} loading="lazy" className="h-32 w-24 shrink-0 object-cover sm:h-40 sm:w-32" />
              ) : (
                <span className="flex h-32 w-24 shrink-0 items-center justify-center border border-bone/15 font-serif text-4xl text-gold sm:h-40 sm:w-32" aria-hidden="true">
                  {f.name[0]}
                </span>
              )}
              <div>
                <h3 className="font-serif text-3xl text-bone">{f.name}</h3>
                <p className="mt-1 text-[0.66rem] uppercase tracking-wideluxe text-gold">{f.role}</p>
                <p className="mt-4 leading-relaxed text-mist">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- */
/*  FAQ (accordéon accessible)                                          */
/* -------------------------------------------------------------------- */
export function Faq({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <section className="on-light bg-bone py-28 text-ink sm:py-36">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Questions fréquentes</p>
          <LineReveal lines={'Ce que l’on\nnous demande.'} className="h-section mt-6" />
        </div>
        <div className="border-t border-ink/15">
          {items.map(([q, a], i) => {
            const isOpen = open === i
            return (
              <div key={q} className="border-b border-ink/15">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex min-h-[64px] w-full cursor-pointer items-center justify-between gap-6 py-5 text-left font-serif text-2xl text-ink"
                  >
                    {q}
                    <span className={`text-gold-deep transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} aria-hidden="true">
                      +
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 leading-relaxed text-ink/75">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- */
/*  Section questionnaire (ancre #eligibilite / #brochure)              */
/* -------------------------------------------------------------------- */
export function FormSection({ kind, config, prefill, image }) {
  return (
    <section id={config.id} className="relative overflow-hidden bg-ink py-28 sm:py-36">
      <div className="wrap grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <p className="eyebrow">{config.eyebrow}</p>
          </Reveal>
          <LineReveal lines={config.title} className="h-section mt-6 text-bone" />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md leading-relaxed text-mist">{config.text}</p>
            <p className="mt-8 text-sm text-bone/60">
              Vous préférez parler directement ?{' '}
              <a href={brand.whatsapp} target="_blank" rel="noopener noreferrer" className="link-underline text-gold">
                WhatsApp · {brand.phoneLabel}
              </a>
            </p>
          </Reveal>
          {image && (
            <Curtain className="mt-10 hidden lg:block">
              <Img image={image} className="aspect-[16/10] w-full" sizes="40vw" parallax={6} />
            </Curtain>
          )}
        </div>
        <Reveal delay={0.1}>
          <LeadForm kind={kind} config={config} prefill={prefill} />
        </Reveal>
      </div>
    </section>
  )
}
