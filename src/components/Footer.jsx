import { Link } from '../lib/router'
import { brand, zones } from '../data/site'
import { Logo } from './Header'

export default function Footer() {
  return (
    <footer className="border-t border-bone/10 bg-ink pb-10 pt-20">
      <div className="wrap">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs font-serif text-2xl leading-snug text-bone/90">
              Un bien, une marque, un acheteur.
            </p>
          </div>
          <div>
            <p className="text-[0.66rem] uppercase tracking-wideluxe text-gold">Le site</p>
            <ul className="mt-5 space-y-3 text-bone/80">
              <li><Link to="/vendre" className="link-underline">Vendre un bien</Link></li>
              <li><Link to="/acheter" className="link-underline">Acheter un bien</Link></li>
              <li><Link to="/acheter#biens" className="link-underline">Nos biens</Link></li>
              <li><a href="/systeme" className="link-underline">Le système d’acquisition</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[0.66rem] uppercase tracking-wideluxe text-gold">Nos secteurs</p>
            <ul className="mt-5 space-y-3 text-bone/80">
              {zones.map((z) => (
                <li key={z}>{z}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[0.66rem] uppercase tracking-wideluxe text-gold">Contact</p>
            <ul className="mt-5 space-y-3 text-bone/80">
              <li>
                <a href={brand.whatsapp} target="_blank" rel="noopener noreferrer" className="link-underline">
                  WhatsApp · {brand.phoneLabel}
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/prodigio.fr/" target="_blank" rel="noopener noreferrer" className="link-underline">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="hairline mt-16" />
        <div className="mt-6 flex flex-col justify-between gap-3 text-xs text-bone/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {brand.name} · {brand.baseline}</p>
          <p>Résultats passés rattachés à des biens précis, sans garantie de résultat futur. Visuels 3D non contractuels.</p>
        </div>
      </div>
    </footer>
  )
}
