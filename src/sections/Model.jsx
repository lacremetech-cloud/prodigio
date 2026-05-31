import Reveal from '../components/Reveal'
import Morph from '../components/Morph'

// Section 5 — Le modèle. Section claire. Comment on travaille avec ce profil :
// ce qu'il apporte / ce qu'on apporte / la rémunération.
export default function Model({ profile }) {
  const { model, key } = profile

  return (
    <section className="relative w-full bg-paper px-6 py-32 text-ink sm:py-44">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          {/* Colonne titre */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="text-[0.7rem] uppercase tracking-luxe text-smoke-400">
                {model.eyebrow}
              </span>
            </Reveal>
            <Morph trigger={key}>
              <h2 className="mt-7 font-serif text-3xl font-light leading-tight text-ink sm:text-5xl">
                {model.title}
              </h2>
              <p className="mt-8 max-w-md text-base font-light leading-relaxed text-ink/65">
                {model.body}
              </p>
            </Morph>
          </div>

          {/* Colonne points clés */}
          <div className="lg:col-span-7">
            <Morph trigger={key} className="flex flex-col">
              {model.points.map((point, i) => (
                <div
                  key={point.label}
                  className={`grid grid-cols-1 gap-2 py-7 sm:grid-cols-12 sm:gap-8 ${
                    i !== 0 ? 'border-t border-ink/10' : ''
                  }`}
                >
                  <div className="sm:col-span-4">
                    <span className="text-[0.65rem] uppercase tracking-wideluxe text-smoke-400">
                      {point.label}
                    </span>
                  </div>
                  <div className="sm:col-span-8">
                    <p className="font-serif text-xl font-light leading-snug text-ink sm:text-2xl">
                      {point.value}
                    </p>
                  </div>
                </div>
              ))}
            </Morph>
          </div>
        </div>
      </div>
    </section>
  )
}
