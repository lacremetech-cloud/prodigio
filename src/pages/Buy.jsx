import { useState } from 'react'
import { motion } from 'framer-motion'
import Hero from '../sections/Hero'
import { FormSection } from '../sections/Shared'
import Reveal, { Curtain, LineReveal } from '../components/Reveal'
import { BgVideo, Img } from '../components/Media'
import { scrollToId } from '../lib/router'
import { buy, media, properties } from '../data/site'

const EASE = [0.22, 1, 0.36, 1]

// Fiche d'un bien : grand visuel (vidéo si disponible), galerie qui se
// déroule, texte et caractéristiques. Une fiche sur deux est inversée.
function Property({ p, index, onBrochure }) {
  const [shown, setShown] = useState(0)
  const flip = index % 2 === 1
  const visuals = [p.cover, ...p.gallery]

  return (
    <article id={`bien-${p.slug}`} className="scroll-mt-24 border-t border-bone/10 py-20 sm:py-28">
      <div className={`grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16 ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div>
          <Curtain className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[5/4]">
            {p.video && shown === 0 ? (
              <BgVideo video={p.video} />
            ) : (
              <motion.div key={shown} initial={{ opacity: 0.2, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: EASE }} className="absolute inset-0">
                <Img image={visuals[shown]} alt={`${p.name}, ${p.place}`} className="h-full w-full" sizes="(min-width: 1024px) 55vw, 100vw" />
              </motion.div>
            )}
            <span className={`tag absolute left-5 top-5 backdrop-blur-md ${p.sold ? 'bg-ink/50 text-bone' : 'bg-ink/30 text-gold'}`}>{p.status}</span>
            {p.note && <span className="absolute bottom-4 right-4 bg-ink/50 px-2 py-1 text-[0.65rem] text-bone/80 backdrop-blur-md">{p.note}</span>}
          </Curtain>
          <div className="mt-3 grid grid-cols-5 gap-2" role="group" aria-label={`Photos de ${p.name}`}>
            {visuals.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setShown(i)}
                aria-label={`Afficher la photo ${i + 1} sur ${visuals.length}`}
                aria-pressed={shown === i}
                className={`relative aspect-[4/3] cursor-pointer overflow-hidden transition-opacity duration-300 ${shown === i ? 'opacity-100 ring-1 ring-gold' : 'opacity-55 hover:opacity-100'}`}
              >
                <img src={img.srcSmall} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <Reveal>
            <p className="text-[0.7rem] uppercase tracking-luxe text-gold">
              {p.place} · {p.region}
            </p>
            <h3 className="mt-4 font-serif text-5xl leading-none text-bone sm:text-6xl">{p.name}</h3>
            <p className="mt-6 font-serif text-2xl italic leading-snug text-bone/90">{p.hook}</p>
            <p className="mt-6 leading-relaxed text-bone/75">{p.text}</p>
            <dl className="mt-8 border-t border-bone/10">
              {p.facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-bone/10 py-3.5 text-sm">
                  <dt className="uppercase tracking-wideluxe text-mist">{k}</dt>
                  <dd className="text-bone">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {p.sold ? (
                <a href="/vendre" className="btn-line">
                  Découvrir comment il a été vendu <span className="arrow">→</span>
                </a>
              ) : (
                <>
                  <button type="button" onClick={() => onBrochure(p)} className="btn-gold">
                    {buy.list.brochure} <span className="arrow">→</span>
                  </button>
                  {p.site && (
                    <a href={p.site} target="_blank" rel="noopener noreferrer" className="btn-line">
                      {buy.list.site}
                    </a>
                  )}
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  )
}

function Steps() {
  const s = buy.steps
  return (
    <section className="on-light bg-bone py-28 text-ink sm:py-36">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{s.eyebrow}</p>
        </Reveal>
        <LineReveal lines={s.title} className="h-section mt-6 max-w-3xl" />
        <ol className="mt-16 grid gap-10 md:grid-cols-3">
          {s.items.map((it, i) => (
            <Reveal as="li" key={it.n} delay={i * 0.12} className="border-t border-ink/20 pt-8">
              <p className="font-serif text-5xl text-gold-deep">{it.n}</p>
              <h3 className="mt-5 font-serif text-3xl">{it.title}</h3>
              <p className="mt-4 leading-relaxed text-ink/75">{it.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Regions() {
  const r = buy.regions
  return (
    <section className="bg-ink py-28 sm:py-36">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{r.eyebrow}</p>
        </Reveal>
        <LineReveal lines={r.title} className="h-section mt-6 max-w-3xl text-bone" />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {r.items.map((it, i) => (
            <Reveal key={it.name} delay={i * 0.12} className="group">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Img image={it.image} alt={it.name} className="absolute inset-0" imgClassName="transition-transform duration-[1.6s] ease-luxe group-hover:scale-[1.05]" sizes="(min-width: 768px) 33vw, 100vw" parallax={5} />
                <div className="veil-card absolute inset-0" />
                <h3 className="absolute bottom-6 left-6 right-6 font-serif text-3xl text-bone">{it.name}</h3>
              </div>
              <p className="mt-5 leading-relaxed text-bone/75">{it.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Buy() {
  const h = buy.hero
  const [prefill, setPrefill] = useState(null)
  const options = buy.form.steps[0].options

  // « Recevoir la brochure » : pré-sélectionne le bien et descend au questionnaire.
  const onBrochure = (p) => {
    const value = options.find((o) => o.startsWith(p.name)) || options[options.length - 1]
    setPrefill({ value })
    requestAnimationFrame(() => scrollToId(buy.form.id))
  }

  const forSale = properties.filter((p) => !p.sold)
  const sold = properties.filter((p) => p.sold)

  return (
    <>
      <Hero
        eyebrow={h.eyebrow}
        lines={h.lines}
        sub={h.sub}
        videos={[media.v('jj-piscine'), h.video, media.v('chalet-drone')]}
        primary={{ to: '/acheter#biens', label: h.cta }}
        secondary={{ to: '/acheter#brochure', label: h.secondary }}
      />

      <section id="biens" className="scroll-mt-16 bg-ink pt-28 sm:pt-36">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">{buy.list.eyebrow}</p>
          </Reveal>
          <LineReveal lines={buy.list.title} className="h-section mt-6 text-bone" />
          <div className="mt-14">
            {[...forSale, ...sold].map((p, i) => (
              <Property key={p.slug} p={p} index={i} onBrochure={onBrochure} />
            ))}
          </div>
        </div>
      </section>

      <Steps />
      <Regions />

      <section className="on-light bg-bone-deep py-20 text-ink">
        <div className="wrap flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl">{buy.search.title}</h2>
            <p className="mt-4 max-w-xl text-ink/75">{buy.search.text}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setPrefill({ value: options[options.length - 1] })
              requestAnimationFrame(() => scrollToId(buy.form.id))
            }}
            className="btn-line shrink-0 self-start lg:self-auto"
          >
            Décrire ma recherche <span className="arrow">→</span>
          </button>
        </div>
      </section>

      <FormSection kind="acheter" config={buy.form} prefill={prefill} />
    </>
  )
}
