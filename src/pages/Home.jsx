import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Hero, { Ticker } from '../sections/Hero'
import { Founders, PropertiesRail, Proof, Story } from '../sections/Shared'
import Reveal, { LineReveal } from '../components/Reveal'
import { Img } from '../components/Media'
import { Link } from '../lib/router'
import { home, media } from '../data/site'

// Deux grandes portes : Vendre / Acheter. L'image s'agrandit au survol.
function Door({ to, d, index }) {
  return (
    <Reveal delay={index * 0.12}>
      <Link to={to} className="group relative block min-h-[78svh] overflow-hidden lg:min-h-[86vh]">
        <Img image={d.image} className="absolute inset-0" imgClassName="transition-transform duration-[1.8s] ease-luxe group-hover:scale-[1.06]" sizes="(min-width: 1024px) 50vw, 100vw" parallax={5} />
        <div className="veil-card absolute inset-0 transition-opacity duration-700 group-hover:opacity-90" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-12">
          <p className="text-[0.7rem] uppercase tracking-luxe text-gold">{d.label}</p>
          <h3 className="mt-4 whitespace-pre-line font-serif text-[2.2rem] leading-[1.05] text-bone sm:text-5xl">{d.title}</h3>
          <p className="mt-5 max-w-md leading-relaxed text-bone/80">{d.text}</p>
          <span className="mt-8 inline-flex min-h-[44px] items-center gap-3 border-b border-gold pb-1 text-[0.72rem] uppercase tracking-wideluxe text-bone transition-colors group-hover:text-gold">
            {d.cta} <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </Reveal>
  )
}

// Manifeste : la seconde phrase glisse depuis la droite au scroll.
function Manifesto() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const xa = useTransform(scrollYProgress, [0, 1], ['-6%', '4%'])
  const xb = useTransform(scrollYProgress, [0, 1], ['8%', '-4%'])
  const m = home.manifesto
  return (
    <section ref={ref} className="on-light overflow-hidden bg-bone py-28 text-ink sm:py-40">
      <div className="wrap">
        <motion.p style={reduce ? undefined : { x: xa }} className="font-serif text-[2.6rem] leading-none sm:text-7xl lg:text-[6.5rem]">
          {m.a}
        </motion.p>
        <motion.p style={reduce ? undefined : { x: xb }} className="mt-3 text-right font-serif text-[2.6rem] italic leading-none text-gold-deep sm:text-7xl lg:text-[6.5rem]">
          {m.b}
        </motion.p>
        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <div className="hidden lg:block">
            <Img image={media.m('verdun-vue-port')} className="aspect-[16/10] w-full" sizes="50vw" parallax={6} />
          </div>
          <Reveal className="lg:pt-10">
            <p className="max-w-lg text-lg leading-relaxed text-ink/80">{m.sub}</p>
            <p className="mt-4 text-xs text-ink/60">{m.source}</p>
            <Link to="/vendre" className="btn-line mt-10">
              Comment nous le trouvons <span className="arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const h = home.hero
  return (
    <>
      <Hero
        eyebrow={h.eyebrow}
        lines={h.lines}
        sub={h.sub}
        videos={h.videos}
        primary={{ to: '/vendre', label: 'Je vends un bien' }}
        secondary={{ to: '/acheter', label: 'Je cherche un bien' }}
      />
      <Ticker items={home.ticker} />

      <section className="bg-ink pb-6 pt-28 sm:pt-36">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">{home.doors.eyebrow}</p>
          </Reveal>
          <LineReveal lines={home.doors.title} className="h-section mt-6 text-bone" />
        </div>
        <div className="mt-14 grid gap-2 px-2 lg:grid-cols-2">
          <Door to="/vendre" d={home.doors.sell} index={0} />
          <Door to="/acheter" d={home.doors.buy} index={1} />
        </div>
      </section>

      <Proof />
      <Manifesto />
      <PropertiesRail eyebrow={home.properties.eyebrow} title={home.properties.title} cta={home.properties.cta} />
      <Story />
      <Founders />

      <section className="relative overflow-hidden bg-ink py-32 text-center sm:py-44">
        <Img image={media.m('mitja-aerial-sunset')} className="absolute inset-0 opacity-40" sizes="100vw" parallax={8} />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/50 to-ink" />
        <div className="wrap relative">
          <LineReveal lines={home.final.title} className="h-display mx-auto max-w-4xl text-bone" />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-md text-bone/80">{home.final.text}</p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/vendre#eligibilite" className="btn-gold">
                Je vends un bien <span className="arrow">→</span>
              </Link>
              <Link to="/acheter#brochure" className="btn-line">
                Je cherche un bien
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
