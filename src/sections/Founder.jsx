import Photo from '../components/Photo'
import Reveal from '../components/Reveal'
import { common } from '../data/content'
import { images } from '../data/images'

// Section « Votre contact » — présentation de Victor Razeyre, le fondateur.
// Portrait à gauche (placeholder à remplacer), récit + CTA WhatsApp à droite.
export default function Founder() {
  const f = common.founder

  return (
    <section className="relative w-full bg-ink px-6 py-32 sm:py-44">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Portrait */}
        <Reveal className="lg:col-span-5">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden border border-white/10 lg:max-w-none">
            <Photo
              src={images.victor}
              veil=""
              parallax
              grayscale={false}
              label="PORTRAIT · VICTOR RAZEYRE"
            />
          </div>
        </Reveal>

        {/* Texte */}
        <div className="lg:col-span-7">
          <Reveal>
            <span className="eyebrow">{f.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-serif text-4xl font-light leading-tight text-paper sm:text-6xl">
              {f.name}
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-4 text-[0.7rem] uppercase tracking-wideluxe text-smoke-400">
              {f.role}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-smoke-200/75 sm:text-lg">
              {f.bio}
            </p>
          </Reveal>
          {f.quote && (
            <Reveal delay={0.26}>
              <p className="mt-9 max-w-xl border-l border-white/25 pl-6 font-serif text-xl font-light italic leading-snug text-paper sm:text-2xl">
                {f.quote}
              </p>
            </Reveal>
          )}
          <Reveal delay={0.32}>
            <a
              href={common.contact.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass mt-10"
            >
              {f.cta}
              <span className="transition-transform duration-500 ease-luxe">→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
