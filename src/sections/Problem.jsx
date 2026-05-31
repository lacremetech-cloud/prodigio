import Reveal from '../components/Reveal'
import Morph from '../components/Morph'

// Section 2 — Le problème. Section claire (blanc cassé), texte noir.
// La douleur spécifique du profil.
export default function Problem({ profile }) {
  const { problem, key } = profile

  return (
    <section
      id="probleme"
      className="relative w-full bg-paper-soft px-6 py-32 text-ink sm:py-44"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <span className="text-[0.7rem] uppercase tracking-luxe text-smoke-400">
              {problem.eyebrow}
            </span>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <Morph trigger={key}>
            <h2 className="font-serif text-3xl font-light leading-tight text-ink sm:text-5xl">
              {problem.title}
            </h2>
            <p className="mt-10 max-w-2xl text-lg font-light leading-relaxed text-ink/70 sm:text-xl">
              {problem.body}
            </p>
          </Morph>
        </div>
      </div>
    </section>
  )
}
