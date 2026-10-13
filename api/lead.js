// ====================================================================
//  Réception des questionnaires (fonction serverless Vercel).
//
//  Transmet chaque demande au webhook défini dans la variable
//  d'environnement LEADS_WEBHOOK_URL (Make, Zapier, Google Apps Script,
//  ActiveCampaign…). Sans webhook configuré, renvoie 503 : le site
//  propose alors au visiteur d'envoyer ses réponses par WhatsApp.
// ====================================================================

const MAX_LEN = 500

const clean = (obj) =>
  Object.fromEntries(
    Object.entries(obj || {})
      .filter(([k, v]) => typeof k === 'string' && k.length < 40 && ['string', 'number', 'boolean'].includes(typeof v))
      .map(([k, v]) => [k, String(v).slice(0, MAX_LEN)]),
  )

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false })
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  const form = body.form === 'vendre' ? 'vendre' : body.form === 'acheter' ? 'acheter' : null
  const answers = clean(body.answers)

  if (!form || !answers.email || !answers.telephone) {
    return res.status(400).json({ ok: false, error: 'Demande incomplète' })
  }

  const webhook = process.env.LEADS_WEBHOOK_URL
  if (!webhook) {
    return res.status(503).json({ ok: false, error: 'Webhook non configuré' })
  }

  const lead = {
    form,
    ...answers,
    page: String(body.page || '').slice(0, 100),
    ...clean(body.campaign),
    receivedAt: new Date().toISOString(),
  }

  try {
    const r = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    })
    if (!r.ok) throw new Error(`Webhook ${r.status}`)
    return res.status(200).json({ ok: true })
  } catch (e) {
    console.error('lead webhook error', e)
    return res.status(502).json({ ok: false })
  }
}
