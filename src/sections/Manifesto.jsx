import Photo from '../components/Photo'
import Reveal from '../components/Reveal'
import { common } from '../data/content'
import { images } from '../data/images'

// Bande manifeste — déclaration de positionnement, plein écran, cinématographique.
// « Prodigio ne met pas votre bien en vente. Prodigio le vend. »
export default function Manifesto() {
  const { manifesto } = common

  return (
    <section className="relative flex min-h-[78svh] w-full items-center justify-center overflow-hidden py-28">
      <Photo src={images.manifesto} veil="veil-full" parallax />
      <div className="absolute inset-0 bg-ink/60" />
      <div className="scrim-center pointer-events-none absolute inset-0 z-[1]" />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center">
        <Reveal>
          <p className="text-on-photo font-serif text-3xl font-light leading-[1.12] text-paper/80 sm:text-5xl">
            {manifesto.line1}
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="text-on-photo mt-2 font-serif text-4xl font-normal italic leading-[1.1] text-paper sm:text-6xl">
            {manifesto.line2}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mx-auto mt-10 h-px w-12 bg-white/30" />
          <p className="text-on-photo mx-auto mt-8 max-w-xl text-sm font-light uppercase leading-relaxed tracking-wideluxe text-smoke-200/85 sm:text-[0.8rem]">
            {manifesto.sub}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
