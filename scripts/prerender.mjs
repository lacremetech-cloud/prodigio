// ====================================================================
//  PRÉ-RENDU STATIQUE — PRODIGIO
//  Exécuté après `vite build`. Pour chaque route publique (/, /agence,
//  /proprietaire), on génère un vrai fichier HTML : contenu textuel réel
//  + balises SEO propres (title, description, canonical, Open Graph…).
//
//  But : les robots d'indexation, les aperçus de lien et les navigateurs
//  sans JavaScript voient une page COMPLÈTE, plus jamais un spinner vide.
//  React reprend la main au chargement et remplace ce contenu par la
//  version interactive (createRoot().render() écrase #root).
// ====================================================================

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import { common, profiles, comparisons } from '../src/data/content.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')
const SITE = 'https://www.prodigio.fr'
const OG_IMAGE = `${SITE}/og-cover.png`

/* ---------- échappement ---------- */
const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escAttr = (s = '') => esc(s).replace(/"/g, '&quot;')
const nl2br = (s = '') => esc(s).replace(/\n/g, '<br>')

/* ---------- styles inline (rendu correct avant CSS/JS) ---------- */
const S = {
  wrap: 'max-width:900px;margin:0 auto;padding:64px 24px 96px;color:#EDEDEC;font-family:Jost,system-ui,-apple-system,sans-serif;font-weight:300;line-height:1.7',
  brand: 'text-align:center;font-family:"Cormorant Garamond",Georgia,serif;letter-spacing:.42em;text-indent:.42em;text-transform:uppercase;font-size:26px;color:#EDEDEC',
  baseline: 'text-align:center;font-size:11px;letter-spacing:.36em;text-transform:uppercase;color:rgba(237,237,236,.5);margin-top:8px',
  eyebrow: 'font-size:12px;letter-spacing:.34em;text-transform:uppercase;color:#C9AE7C;margin:56px 0 14px',
  h1: 'font-family:"Cormorant Garamond",Georgia,serif;font-weight:400;font-size:clamp(34px,6vw,64px);line-height:1.08;margin:0 0 16px',
  h2: 'font-family:"Cormorant Garamond",Georgia,serif;font-weight:400;font-size:clamp(26px,4vw,42px);line-height:1.15;margin:0 0 14px',
  h3: 'font-family:"Cormorant Garamond",Georgia,serif;font-weight:500;font-size:22px;color:#EDEDEC;margin:0 0 6px',
  lead: 'font-size:20px;color:rgba(237,237,236,.75);margin:0 0 12px',
  p: 'font-size:17px;color:rgba(237,237,236,.72);margin:0 0 14px',
  gold: 'color:#C9AE7C',
}

const section = (inner) => `<section style="margin:0 0 8px">${inner}</section>`
const eyebrow = (t) => (t ? `<div style="${S.eyebrow}">${esc(t)}</div>` : '')

/* ---------- rendu des blocs communs ---------- */
function methodBlock() {
  const m = common.method
  const steps = m.steps
    .map(
      (s) =>
        `<div style="margin:0 0 18px"><h3 style="${S.h3}"><span style="${S.gold}">${esc(
          s.index,
        )}</span> ${esc(s.name)}</h3><p style="${S.p}">${esc(s.text)}</p></div>`,
    )
    .join('')
  return section(
    `${eyebrow(m.eyebrow)}<h2 style="${S.h2}">${esc(m.title)}</h2><p style="${S.lead}">${esc(
      m.lead,
    )}</p><p style="${S.p}">${esc(m.intro)}</p>${steps}<p style="${S.p}"><em style="${
      S.gold
    }">${esc(m.result)}</em></p>`,
  )
}

function proofBlock() {
  const p = common.proof
  const stats = p.stats
    .map(
      (s) =>
        `<li style="margin:0 0 6px"><strong style="font-family:'Cormorant Garamond',Georgia,serif;font-size:28px;${S.gold}">${esc(
          s.value,
        )}</strong> — ${esc(s.label)}</li>`,
    )
    .join('')
  return section(
    `${eyebrow(p.eyebrow)}<h2 style="${S.h2}">${esc(p.title)}</h2><p style="${S.lead}">${esc(
      p.subtitle,
    )}</p><p style="${S.p}"><em style="${S.gold}">${esc(
      p.period,
    )}</em></p><ul style="list-style:none;padding:0;margin:0 0 14px">${stats}</ul><p style="${
      S.p
    }">${esc(p.footnote)}</p>`,
  )
}

function whyBlock() {
  const w = common.why
  const reasons = w.reasons
    .map(
      (r) =>
        `<div style="margin:0 0 18px"><h3 style="${S.h3}">${esc(r.title)}</h3><p style="${
          S.p
        }">${esc(r.text)}</p></div>`,
    )
    .join('')
  return section(`${eyebrow(w.eyebrow)}<h2 style="${S.h2}">${esc(w.title)}</h2>${reasons}`)
}

function comparisonBlock(key) {
  const c = comparisons[key]
  if (!c) return ''
  const cell = (v) => (v === true ? 'Oui' : v === false ? 'Non' : esc(v))
  const rows = c.rows
    .map(
      (r) =>
        `<tr><th scope="row" style="text-align:left;font-weight:400;padding:8px 12px 8px 0;color:rgba(237,237,236,.6);border-top:1px solid rgba(255,255,255,.08)">${esc(
          r.label,
        )}</th><td style="padding:8px 12px;color:rgba(237,237,236,.72);border-top:1px solid rgba(255,255,255,.08)">${cell(
          r.classic,
        )}</td><td style="padding:8px 12px;color:#C9AE7C;border-top:1px solid rgba(255,255,255,.08)">${cell(
          r.prodigio,
        )}</td></tr>`,
    )
    .join('')
  return section(
    `${eyebrow(c.eyebrow)}<h2 style="${S.h2}">${esc(c.title)}</h2><p style="${S.lead}">${esc(
      c.lead,
    )}</p><table style="width:100%;border-collapse:collapse;font-size:15px"><thead><tr><th></th><th scope="col" style="text-align:left;padding:0 12px 8px 0;color:rgba(237,237,236,.6)">${esc(
      c.columns.classic,
    )}</th><th scope="col" style="text-align:left;padding:0 12px 8px;${S.gold}">${esc(
      c.columns.prodigio,
    )}</th></tr></thead><tbody>${rows}</tbody></table>`,
  )
}

function founderBlock() {
  const f = common.founder
  return section(
    `${eyebrow(f.eyebrow)}<h2 style="${S.h2}">${esc(f.name)}</h2><p style="${S.lead}">${esc(
      f.role,
    )}</p><p style="${S.p}">${esc(f.bio)}</p><p style="${S.p}"><em style="${S.gold}">${esc(
      f.quote,
    )}</em></p>`,
  )
}

function ctaBlock() {
  const c = common.finalCta
  return section(
    `${eyebrow(c.eyebrow)}<h2 style="${S.h2}">${esc(c.title)}</h2><p style="${S.lead}">${esc(
      c.subtitle,
    )}</p><p style="${S.p}"><a href="${escAttr(common.contact.url)}" style="${
      S.gold
    };text-decoration:none">${esc(c.button)} →</a></p><p style="${S.baseline}">${esc(
      c.signature,
    )}</p>`,
  )
}

function manifestoBlock() {
  const m = common.manifesto
  return section(
    `<h2 style="${S.h2}">${esc(m.line1)}<br><em style="${S.gold}">${esc(
      m.line2,
    )}</em></h2><p style="${S.lead}">${esc(m.sub)}</p>`,
  )
}

/* ---------- rendu d'une page profil ---------- */
function profileBody(key) {
  const pr = profiles[key]
  const hero = pr.hero
  const problem = pr.problem
  const model = pr.model
  const modelPoints = model.points
    .map(
      (pt) =>
        `<li style="margin:0 0 6px"><strong style="${S.gold}">${esc(
          pt.label,
        )}</strong> — ${esc(pt.value)}</li>`,
    )
    .join('')

  return `<div style="${S.wrap}">
    <header><div style="${S.brand}">${esc(common.brand.name)}</div><div style="${
    S.baseline
  }">${esc(common.brand.baseline)}</div></header>
    ${section(
      `${eyebrow(hero.eyebrow)}<h1 style="${S.h1}">${nl2br(hero.title)}</h1><p style="${
        S.lead
      }">${esc(hero.subtitle)}</p>`,
    )}
    ${section(
      `${eyebrow(problem.eyebrow)}<h2 style="${S.h2}">${esc(problem.title)}</h2><p style="${
        S.p
      }">${esc(problem.body)}</p>`,
    )}
    ${manifestoBlock()}
    ${methodBlock()}
    ${proofBlock()}
    ${whyBlock()}
    ${section(
      `${eyebrow(model.eyebrow)}<h2 style="${S.h2}">${esc(model.title)}</h2><p style="${
        S.p
      }">${esc(model.body)}</p><ul style="list-style:none;padding:0;margin:0 0 8px">${modelPoints}</ul><p style="${
        S.p
      }">${esc(pr.differenceAccent)}</p>`,
    )}
    ${comparisonBlock(key)}
    ${founderBlock()}
    ${ctaBlock()}
  </div>`
}

/* ---------- rendu de l'écran d'accueil ---------- */
function gateBody() {
  const g = common.gate
  const cards = ['agence', 'proprietaire']
    .map((key) => {
      const pr = profiles[key]
      return `<div style="margin:0 0 18px"><h3 style="${S.h3}"><a href="/${key}" style="color:#EDEDEC;text-decoration:none">${esc(
        pr.label,
      )}</a></h3><p style="${S.p}"><em style="${S.gold}">${esc(
        pr.gateTagline,
      )}</em> ${esc(pr.hero.subtitle)}</p></div>`
    })
    .join('')

  return `<div style="${S.wrap}">
    <header><div style="${S.brand}">${esc(common.brand.name)}</div><div style="${
    S.baseline
  }">${esc(common.brand.baseline)}</div></header>
    ${section(
      `<h1 style="${S.h1}">${esc(g.question)}</h1><p style="${S.lead}">${esc(
        g.subtitle,
      )}</p>${cards}`,
    )}
    ${manifestoBlock()}
    ${section(
      `${eyebrow(common.method.eyebrow)}<h2 style="${S.h2}">${esc(
        common.method.title,
      )}</h2><p style="${S.p}">${esc(common.method.intro)}</p>`,
    )}
    ${proofBlock()}
    ${ctaBlock()}
  </div>`
}

/* ---------- injection SEO dans le <head> ---------- */
function setMeta(html, { title, description, url }) {
  const metaName = (n, c) => `<meta name="${n}" content="${escAttr(c)}" />`
  const metaProp = (p, c) => `<meta property="${p}" content="${escAttr(c)}" />`
  const replacements = [
    [/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`],
    [/<meta\s+name="description"[\s\S]*?\/>/, metaName('description', description)],
    [/<link\s+rel="canonical"[\s\S]*?\/>/, `<link rel="canonical" href="${escAttr(url)}" />`],
    [/<meta\s+property="og:title"[\s\S]*?\/>/, metaProp('og:title', title)],
    [/<meta\s+property="og:description"[\s\S]*?\/>/, metaProp('og:description', description)],
    [/<meta\s+property="og:url"[\s\S]*?\/>/, metaProp('og:url', url)],
    [/<meta\s+property="og:image"[\s\S]*?\/>/, metaProp('og:image', OG_IMAGE)],
    [/<meta\s+name="twitter:title"[\s\S]*?\/>/, metaName('twitter:title', title)],
    [/<meta\s+name="twitter:description"[\s\S]*?\/>/, metaName('twitter:description', description)],
    [/<meta\s+name="twitter:image"[\s\S]*?\/>/, metaName('twitter:image', OG_IMAGE)],
  ]
  for (const [re, out] of replacements) {
    if (!re.test(html)) throw new Error(`Balise SEO introuvable dans le template : ${re}`)
    html = html.replace(re, out)
  }
  return html
}

function setBody(html, bodyHtml) {
  const re = /<!-- PRERENDER_BODY_START -->[\s\S]*?<!-- PRERENDER_BODY_END -->/
  if (!re.test(html)) throw new Error('Marqueurs PRERENDER_BODY introuvables dans le template')
  return html.replace(
    re,
    `<!-- PRERENDER_BODY_START -->${bodyHtml}<!-- PRERENDER_BODY_END -->`,
  )
}

/* ---------- pages à générer ---------- */
const PAGES = [
  {
    file: 'index.html',
    url: `${SITE}/`,
    title: 'PRODIGIO — Immobilier d’exception',
    description:
      'PRODIGIO transforme chaque bien d’exception en marque : branding, acquisition ciblée et accompagnement jusqu’à la vente. On ne met pas votre bien en vente, on le vend.',
    body: gateBody(),
  },
  {
    file: 'agence.html',
    url: `${SITE}/agence`,
    title: 'Agences immobilières de luxe : la machine d’acquisition — PRODIGIO',
    description: profiles.agence.hero.subtitle,
    body: profileBody('agence'),
  },
  {
    file: 'proprietaire.html',
    url: `${SITE}/proprietaire`,
    title: 'Vendre votre bien d’exception avec Prodigio',
    description: profiles.proprietaire.hero.subtitle,
    body: profileBody('proprietaire'),
  },
]

/* ---------- exécution ---------- */
const template = await readFile(join(DIST, 'index.html'), 'utf8')

for (const page of PAGES) {
  let html = setMeta(template, page)
  html = setBody(html, page.body)
  await writeFile(join(DIST, page.file), html, 'utf8')
  console.log(`✓ pré-rendu : ${page.file}  (${page.url})`)
}

console.log(`\n${PAGES.length} pages pré-rendues dans dist/.`)
