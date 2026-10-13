import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { brand, contactStep } from '../data/site'

const EASE = [0.22, 1, 0.36, 1]

// Paramètres de campagne (utm_*, fbclid) mémorisés pour la session,
// pour savoir quelle publicité a amené chaque demande.
function campaignParams() {
  try {
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'fbclid']
    const url = new URLSearchParams(window.location.search)
    const saved = JSON.parse(sessionStorage.getItem('prodigio_utm') || '{}')
    keys.forEach((k) => url.get(k) && (saved[k] = url.get(k)))
    sessionStorage.setItem('prodigio_utm', JSON.stringify(saved))
    return saved
  } catch {
    return {}
  }
}

// Option : chaîne simple, ou paire [libellé affiché, code Prodigio OS].
const asOption = (o) => (Array.isArray(o) ? { label: o[0], code: o[1] } : { label: o, code: o })

function whatsappLink(kind, answers) {
  const lines = Object.entries(answers)
    .filter(([k]) => !['email', 'telephone'].includes(k))
    .map(([k, v]) => `${k} : ${v}`)
  const intro = kind === 'vendre' ? 'Bonjour Victor, je souhaite vendre un bien.' : 'Bonjour Victor, je cherche un bien.'
  return `${brand.whatsapp}?text=${encodeURIComponent([intro, ...lines].join('\n'))}`
}

// Questionnaire en plusieurs étapes : une question par écran, avance au clic,
// puis coordonnées. Envoi vers /api/lead, qui dépose la demande dans Prodigio OS.
// Repli WhatsApp si l'envoi échoue ou si le bien n'est pas encore dans l'OS.
export default function LeadForm({ kind, config, prefill }) {
  const steps = config.steps
  const total = steps.length + 1
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({}) // libellés affichés
  const [codes, setCodes] = useState({}) // codes Prodigio OS
  const [honeypot, setHoneypot] = useState('')
  // Clé d'idempotence : un double clic ou un renvoi ne crée jamais deux dossiers.
  const [idempotencyKey] = useState(() =>
    typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  )
  const [contact, setContact] = useState({ prenom: '', nom: '', telephone: '', email: '' })
  const [touched, setTouched] = useState({})
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | done | error | manual
  const consentMode = config.consent?.mode || 'checkbox'
  const headingRef = useRef(null)
  const uid = useId()

  // Pré-sélection d'un bien (bouton « Recevoir la brochure » d'une fiche).
  useEffect(() => {
    if (!prefill) return
    const first = steps[0]
    const opt = first.options.map(asOption).find((o) => o.label === prefill.value)
    setAnswers((a) => ({ ...a, [first.name]: prefill.value }))
    setCodes((c) => ({ ...c, [first.name]: opt ? opt.code : '' }))
    setStep(1)
  }, [prefill, steps])

  const current = steps[step]
  const isContact = step === steps.length

  const choose = (name, opt) => {
    setAnswers((a) => ({ ...a, [name]: opt.label }))
    setCodes((c) => ({ ...c, [name]: opt.code }))
    setStep((s) => s + 1)
  }

  const errors = {
    prenom: !contact.prenom.trim() && 'Indiquez votre prénom.',
    nom: !contact.nom.trim() && 'Indiquez votre nom.',
    telephone: contact.telephone.replace(/\D/g, '').length < 9 && 'Indiquez un numéro de téléphone valide.',
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email) && 'Indiquez une adresse email valide (ex. nom@domaine.fr).',
  }
  const consentOk = consentMode !== 'checkbox' || consent
  const hasErrors = Object.values(errors).some(Boolean) || !consentOk

  async function submit(e) {
    e.preventDefault()
    setTouched({ prenom: true, nom: true, telephone: true, email: true, consent: true })
    if (hasErrors) {
      const firstInvalid = contactStep.fields.find((f) => errors[f.name])
      document.getElementById(`${uid}-${firstInvalid ? firstInvalid.name : 'consent'}`)?.focus()
      return
    }
    setStatus('sending')
    const payload = {
      form: kind,
      idempotencyKey,
      answers,
      codes,
      contact,
      consent: { mode: consentMode, given: consentMode === 'checkbox' ? consent : null, text: config.consent?.text || '' },
      campaign: campaignParams(),
      originUrl: window.location.href,
      referrer: document.referrer || '',
      website: honeypot,
    }
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.routed === false) {
        setStatus('manual')
        return
      }
      if (!res.ok) throw new Error(String(res.status))
      window.fbq?.('track', 'Lead', { content_name: kind })
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  useEffect(() => {
    if (step > 0 || status !== 'idle') headingRef.current?.focus()
  }, [step, status])

  if (status === 'done' || status === 'error' || status === 'manual') {
    const ok = status === 'done'
    const manual = status === 'manual'
    return (
      <div className="border border-bone/15 bg-ink-soft p-7 sm:p-10" role="status" aria-live="polite">
        <p ref={headingRef} tabIndex={-1} className="font-serif text-3xl leading-tight text-bone sm:text-4xl">
          {ok ? config.success.title : manual ? 'Merci. Victor vous répond directement.' : 'L’envoi n’a pas abouti.'}
        </p>
        <p className="mt-4 max-w-md leading-relaxed text-mist">
          {ok
            ? config.success.text
            : manual
              ? 'Pour ce bien, les dossiers sont transmis à la main. Vos réponses sont prêtes : envoyez-les en un clic à Victor sur WhatsApp.'
              : 'Votre connexion ou notre serveur a refusé l’envoi. Vos réponses sont prêtes : envoyez-les en un clic à Victor sur WhatsApp.'}
        </p>
        <a href={whatsappLink(kind, { ...answers, prenom: contact.prenom })} target="_blank" rel="noopener noreferrer" className="btn-gold mt-8">
          Écrire à Victor sur WhatsApp <span className="arrow">→</span>
        </a>
      </div>
    )
  }

  return (
    <div className="border border-bone/15 bg-ink-soft p-6 sm:p-10">
      {/* Progression */}
      <div className="flex items-center justify-between text-[0.66rem] uppercase tracking-wideluxe text-mist">
        <span>
          Question {Math.min(step + 1, total)} / {total}
        </span>
        {step > 0 && (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="min-h-[44px] cursor-pointer px-2 text-bone/80 hover:text-gold">
            ← Retour
          </button>
        )}
      </div>
      <div className="mt-3 h-px w-full bg-bone/15" aria-hidden="true">
        <motion.div className="h-px bg-gold" animate={{ width: `${(step / total) * 100}%` }} transition={{ duration: 0.5, ease: EASE }} />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="mt-8"
        >
          {!isContact && current.options && (
            <fieldset>
              <legend ref={headingRef} tabIndex={-1} className="font-serif text-[1.75rem] leading-tight text-bone outline-none sm:text-3xl">
                {current.q}
              </legend>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {current.options.map(asOption).map((opt) => {
                  const selected = answers[current.name] === opt.label
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => choose(current.name, opt)}
                      aria-pressed={selected}
                      className={`group flex min-h-[60px] cursor-pointer items-center justify-between gap-4 border px-5 py-4 text-left text-[0.98rem] transition-colors duration-200 ${
                        selected ? 'border-gold bg-gold/10 text-bone' : 'border-bone/20 text-bone/90 hover:border-gold/70 hover:bg-bone/[0.03]'
                      }`}
                    >
                      {opt.label}
                      <span className="text-gold opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden="true">
                        →
                      </span>
                    </button>
                  )
                })}
              </div>
            </fieldset>
          )}

          {!isContact && current.input && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if ((answers[current.name] || '').trim()) setStep((s) => s + 1)
              }}
            >
              <label ref={headingRef} tabIndex={-1} htmlFor={`${uid}-${current.name}`} className="block font-serif text-[1.75rem] leading-tight text-bone outline-none sm:text-3xl">
                {current.q}
              </label>
              <input
                id={`${uid}-${current.name}`}
                type={current.input.type}
                autoComplete={current.input.autoComplete}
                placeholder={current.input.placeholder}
                value={answers[current.name] || ''}
                onChange={(e) => {
                  setAnswers((a) => ({ ...a, [current.name]: e.target.value }))
                  setCodes((c) => ({ ...c, [current.name]: e.target.value }))
                }}
                className="mt-7 min-h-[56px] w-full border-b border-bone/30 bg-transparent px-1 text-lg text-bone placeholder:text-bone/40 focus:border-gold focus:outline-none"
              />
              <button type="submit" className="btn-gold mt-8" disabled={!(answers[current.name] || '').trim()}>
                Continuer <span className="arrow">→</span>
              </button>
            </form>
          )}

          {isContact && (
            <form onSubmit={submit} noValidate className="relative">
              <p ref={headingRef} tabIndex={-1} className="font-serif text-[1.75rem] leading-tight text-bone outline-none sm:text-3xl">
                {contactStep.q}
              </p>
              <div className="mt-7 grid gap-x-6 gap-y-5 sm:grid-cols-2">
                {contactStep.fields.map((f) => {
                  const err = touched[f.name] && errors[f.name]
                  return (
                    <div key={f.name}>
                      <label htmlFor={`${uid}-${f.name}`} className="block text-[0.66rem] uppercase tracking-wideluxe text-mist">
                        {f.label} <span aria-hidden="true" className="text-gold">*</span>
                      </label>
                      <input
                        id={`${uid}-${f.name}`}
                        name={f.name}
                        type={f.type}
                        autoComplete={f.autoComplete}
                        inputMode={f.type === 'tel' ? 'tel' : undefined}
                        required
                        aria-invalid={Boolean(err)}
                        aria-describedby={err ? `${uid}-${f.name}-err` : undefined}
                        value={contact[f.name]}
                        onChange={(e) => setContact((c) => ({ ...c, [f.name]: e.target.value }))}
                        onBlur={() => setTouched((t) => ({ ...t, [f.name]: true }))}
                        className={`mt-2 min-h-[52px] w-full border-b bg-transparent px-1 text-[1.05rem] text-bone focus:outline-none ${
                          err ? 'border-[#E0866B]' : 'border-bone/30 focus:border-gold'
                        }`}
                      />
                      {err && (
                        <p id={`${uid}-${f.name}-err`} role="alert" className="mt-2 text-sm text-[#E0866B]">
                          {err}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
              {/* Champ piège invisible : seuls les robots le remplissent. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>
                  Site web
                  <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                </label>
              </div>
              {consentMode === 'checkbox' ? (
                <>
                  <label htmlFor={`${uid}-consent`} className="mt-7 flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-mist">
                    <input
                      id={`${uid}-consent`}
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-[#C9AE7C]"
                    />
                    {config.consent.text}
                  </label>
                  {touched.consent && !consent && (
                    <p role="alert" className="mt-2 text-sm text-[#E0866B]">
                      Cochez la case pour que nous puissions vous recontacter.
                    </p>
                  )}
                </>
              ) : (
                <p className="mt-7 text-sm leading-relaxed text-mist">{config.consent?.text}</p>
              )}
              <button type="submit" className="btn-gold mt-8 w-full sm:w-auto" disabled={status === 'sending'}>
                {status === 'sending' ? 'Envoi en cours…' : config.submit}
                {status !== 'sending' && <span className="arrow">→</span>}
              </button>
            </form>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
