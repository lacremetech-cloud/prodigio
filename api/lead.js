// ====================================================================
//  Réception des questionnaires du site (fonction serverless Vercel).
//
//  Chaque demande est déposée directement dans Prodigio OS (Supabase),
//  via les deux fonctions SQL publiques prévues pour les funnels :
//    · vendeurs  → submit_mandate_funnel  (contact + opportunité de mandat)
//    · acheteurs → submit_buyer_interest  (contact + intérêt + dossier acquéreur)
//  Ces fonctions dédoublonnent le contact par e-mail, calculent les scores,
//  tracent la preuve RGPD et ignorent un renvoi de la même clé d'idempotence.
//
//  La clé utilisée est la clé PUBLIQUE (publishable) de Supabase, la même que
//  celle de Prodigio OS côté navigateur : elle ne donne accès qu'à ces fonctions.
//  Surchargeable par PRODIGIO_OS_SUPABASE_URL / PRODIGIO_OS_SUPABASE_KEY.
// ====================================================================

const SUPABASE_URL = process.env.PRODIGIO_OS_SUPABASE_URL || 'https://wmhrpweefutwldbhllhg.supabase.co'
const SUPABASE_KEY = process.env.PRODIGIO_OS_SUPABASE_KEY || 'sb_publishable_wJ1l9a0Iz5S-U-cguQx92Q_2DFTp939'
const NOTICE_VERSION = 'site-prodigio-2026-10'

const str = (v, max = 300) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const plain = (obj, max = 300) =>
  Object.fromEntries(
    Object.entries(obj && typeof obj === 'object' ? obj : {})
      .filter(([k, v]) => typeof k === 'string' && k.length < 60 && typeof v === 'string')
      .slice(0, 20)
      .map(([k, v]) => [k, v.slice(0, max)]),
  )

async function rpc(fn, payload) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: { apikey: SUPABASE_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ payload }),
  })
  if (!r.ok) {
    // On ne journalise que le statut : une erreur Postgres peut contenir des données personnelles.
    throw new Error(`${fn} ${r.status}`)
  }
  return r.json()
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false })
  }

  let body
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  } catch {
    return res.status(400).json({ ok: false })
  }

  // Champ piège rempli : un robot. On répond comme si tout allait bien, sans rien déposer.
  if (str(body.website)) return res.status(200).json({ ok: true })

  const form = body.form === 'vendre' || body.form === 'acheter' ? body.form : null
  const contact = plain(body.contact, 320)
  const codes = plain(body.codes, 200)
  const answers = plain(body.answers, 300)
  const idempotencyKey = str(body.idempotencyKey, 120)
  const email = str(contact.email, 320)
  const phone = str(contact.telephone, 64)

  if (!form || !idempotencyKey || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phone.replace(/\D/g, '').length < 9) {
    return res.status(400).json({ ok: false, error: 'Demande incomplète' })
  }

  const campaign = plain(body.campaign, 512)
  const consent = body.consent && typeof body.consent === 'object' ? body.consent : {}
  const touch = { at: new Date().toISOString(), url: str(body.originUrl, 2048), ...campaign }

  const common = {
    idempotency_key: `site-${form}-${idempotencyKey}`,
    raw_answers: answers,
    normalized_answers: codes,
    contact_first_name: str(contact.prenom, 120),
    contact_last_name: str(contact.nom, 120),
    contact_email: email,
    contact_email_raw: email,
    contact_phone: phone,
    contact_phone_raw: phone,
    contact_preference: 'indifferent',
    consent_notice_version: NOTICE_VERSION,
    consent_notice_text: str(consent.text, 2000),
    utm_source: campaign.utm_source,
    utm_medium: campaign.utm_medium,
    utm_campaign: campaign.utm_campaign,
    utm_term: campaign.utm_term,
    utm_content: campaign.utm_content,
    fbclid: campaign.fbclid,
    gclid: campaign.gclid,
    origin_url: str(body.originUrl, 2048),
    referrer: str(body.referrer, 2048),
    first_touch: touch,
    last_touch: touch,
    user_agent: str(req.headers['user-agent'], 1024),
  }

  try {
    if (form === 'vendre') {
      const result = await rpc('submit_mandate_funnel', {
        ...common,
        variant: 'site-vendre',
        property_type: codes.property_type,
        estimated_value_band: codes.estimated_value_band,
        mandate_situation: codes.mandate_situation,
        sale_horizon: codes.sale_horizon,
        location_city: str(codes.location_city, 160),
        location_country: 'France',
        consent_given: consent.given === true,
      })
      return res.status(200).json({ ok: Boolean(result?.accepted) })
    }

    // Acheteur : le bien doit exister dans Prodigio OS avec un formulaire actif.
    // Sans slug (bien pas encore dans l'OS, « autre recherche »), on ne dépose
    // rien plutôt que de perdre la demande en silence : le site propose WhatsApp.
    const slug = str(codes.slug, 120)
    if (!slug) return res.status(200).json({ ok: true, routed: false })

    const result = await rpc('submit_buyer_interest', {
      ...common,
      slug,
      project_nature: codes.project_nature,
      budget_band: codes.budget_band,
      financing: codes.financing,
      purchase_horizon: codes.purchase_horizon,
      consent_requested: consent.mode === 'checkbox',
      consent_given: consent.mode === 'checkbox' ? consent.given === true : undefined,
    })
    return res.status(200).json({ ok: Boolean(result?.accepted) })
  } catch (e) {
    console.error('Dépôt Prodigio OS en échec', { form, error: e.message })
    return res.status(502).json({ ok: false })
  }
}
