import { common } from '../data/content'

// ====================================================================
//  LOGO PRODIGIO — système « Sceau ».
//  Monogramme : un « P » Didone (haute graisse contrastée) dans un cercle.
//  La couleur est héritée via `currentColor` → pilotable par `text-*`.
//  La taille se règle par les classes Tailwind (w-* h-*) sur le composant.
// ====================================================================

// Monogramme seul (cercle + P). Sert de marque autonome (header, favicon…).
export function Monogram({ className = '', stroke = 2 }) {
  return (
    <svg
      viewBox="0 0 104 104"
      className={className}
      fill="none"
      aria-hidden="true"
      role="presentation"
    >
      <circle
        cx="52"
        cy="52"
        r={52 - stroke}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
      />
      <text
        x="52"
        y="55"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Playfair Display', Georgia, serif"
        fontWeight="700"
        fontSize="56"
        fill="currentColor"
      >
        P
      </text>
    </svg>
  )
}

// Lockup complet : monogramme + wordmark (+ baseline optionnelle).
// `orientation` : 'horizontal' (header) ou 'stacked' (écran d'accueil).
export function Logo({
  orientation = 'horizontal',
  baseline = true,
  monogramClass = '',
  wordmarkClass = '',
  className = '',
}) {
  const stacked = orientation === 'stacked'

  return (
    <span
      className={`flex leading-none text-paper ${
        stacked ? 'flex-col items-center text-center' : 'flex-row items-center gap-3'
      } ${className}`}
    >
      <Monogram className={`shrink-0 ${monogramClass}`} />

      <span className={`flex flex-col ${stacked ? 'items-center' : 'items-start'}`}>
        <span
          className={`font-display tracking-luxe ${
            stacked ? 'pl-[0.34em]' : ''
          } ${wordmarkClass}`}
        >
          {common.brand.name}
        </span>
        {baseline && (
          <span
            className={`uppercase tracking-wideluxe text-smoke-400 ${
              stacked
                ? 'mt-2 text-[0.6rem] sm:text-[0.65rem]'
                : 'mt-1 hidden text-[0.55rem] sm:block'
            }`}
          >
            {common.brand.baseline}
          </span>
        )}
      </span>
    </span>
  )
}
