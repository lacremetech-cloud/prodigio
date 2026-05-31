import Photo from '../components/Photo'
import Reveal from '../components/Reveal'
import { common } from '../data/content'
import { images } from '../data/images'

// Section 7 — CTA final. Plein écran, photo feutrée, invitation au contact.
export default function FinalCTA() {
  const { finalCta } = common

  return (
    <section
      id="contact"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      <Photo src={images.finalCta} veil="veil-full" parallax />
      <div className="absolute inset-0 bg-ink/55" />
      <div className="scrim-center pointer-events-none absolute inset-0 z-[1]" />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center">
        <Reveal>
          <span className="eyebrow text-on-photo text-smoke-200">{finalCta.eyebrow}</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-on-photo mt-8 font-serif text-5xl font-light leading-tight text-paper sm:text-7xl">
            {finalCta.title}
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="text-on-photo mx-auto mt-8 max-w-xl text-base font-light leading-relaxed text-paper/90 sm:text-lg">
            {finalCta.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <a
            href="mailto:contact@prodigio.immo?subject=Prise%20de%20contact%20%E2%80%94%20PRODIGIO"
            className="btn-glass mt-12"
          >
            {finalCta.button}
            <span className="transition-transform duration-500 ease-luxe">→</span>
          </a>
        </Reveal>

        <Reveal delay={0.34}>
          <div className="mt-20 flex flex-col items-center">
            <div className="h-px w-12 bg-white/20" />
            <span className="mt-8 text-[0.65rem] uppercase tracking-luxe text-smoke-400">
              {finalCta.signature}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
