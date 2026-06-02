import Reveal from '../components/Reveal'
import Morph from '../components/Morph'
import { comparisons } from '../data/content'

// Petit ✓ (Prodigio) / — (agence classique) pour les lignes binaires.
function Mark({ on }) {
  return on ? (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-label="oui">
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <span className="text-lg leading-none text-ink/25" aria-label="non">
      —
    </span>
  )
}

// Rend une valeur de cellule : booléen → ✓ / — , sinon texte.
function Cell({ value, prodigio }) {
  if (typeof value === 'boolean') return <Mark on={value} />
  return (
    <span className={prodigio ? 'text-paper' : 'text-ink/55'}>{value}</span>
  )
}

// Section 7 — Le tableau comparatif. Section claire.
// Le tableau s'adapte au profil : marketing (agence) ou immobilier (propriétaire).
// Colonne Prodigio mise en valeur (ruban sombre), agence classique en sourdine.
export default function Comparison({ profile }) {
  const comparison = comparisons[profile?.key] || comparisons.proprietaire
  const rowGrid = 'grid grid-cols-2 sm:grid-cols-[1.4fr_1fr_1.4fr]'

  return (
    <section className="relative w-full bg-paper-soft px-6 py-32 text-ink sm:py-44">
      <Morph trigger={profile?.key} className="mx-auto w-full max-w-5xl">
        <div className="max-w-2xl">
          <Reveal>
            <span className="text-[0.7rem] uppercase tracking-luxe text-smoke-400">
              {comparison.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-7 font-serif text-3xl font-light leading-tight text-ink sm:text-5xl">
              {comparison.title}
            </h2>
          </Reveal>
          {comparison.lead && (
            <Reveal delay={0.16}>
              <p className="mt-7 max-w-xl text-base font-light leading-relaxed text-ink/65">
                {comparison.lead}
              </p>
            </Reveal>
          )}
        </div>

        {/* Tableau */}
        <Reveal delay={0.15}>
          <div className="mt-14 overflow-hidden rounded-sm border border-ink/10">
            {/* En-tête */}
            <div className={`${rowGrid} text-[0.7rem] uppercase tracking-wideluxe`}>
              <div className="hidden px-6 py-5 sm:block" />
              <div className="px-5 py-5 text-smoke-400">{comparison.columns.classic}</div>
              <div className="bg-ink px-6 py-5 font-display text-base normal-case tracking-luxe text-paper">
                {comparison.columns.prodigio}
              </div>
            </div>

            {/* Lignes */}
            {comparison.rows.map((row, i) => (
              <div key={i} className={rowGrid}>
                {/* Libellé — pleine largeur sur mobile, colonne à gauche sur desktop */}
                <div className="col-span-2 border-t border-ink/10 px-6 pt-5 pb-1 text-[0.7rem] uppercase tracking-[0.15em] text-ink/40 sm:col-span-1 sm:py-5 sm:pb-5">
                  {row.label}
                </div>
                {/* Agence classique (en sourdine) */}
                <div className="flex items-center px-5 py-4 text-sm font-light sm:border-t sm:border-ink/10 sm:py-5">
                  <Cell value={row.classic} />
                </div>
                {/* Prodigio (ruban sombre, mis en valeur) */}
                <div className="flex items-center bg-ink px-6 py-4 text-sm font-normal text-paper sm:py-5">
                  <Cell value={row.prodigio} prodigio />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Morph>
    </section>
  )
}
