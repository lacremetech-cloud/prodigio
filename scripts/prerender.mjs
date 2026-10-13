// ====================================================================
//  PRÉ-RENDU STATIQUE · PRODIGIO
//  Exécuté après `vite build`. Pour chaque route publique (/, /vendre,
//  /acheter), on génère un vrai fichier HTML : contenu textuel réel
//  + balises SEO propres (title, description, canonical, Open Graph…).
//  React reprend la main au chargement (createRoot().render() écrase #root).
// ====================================================================

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import { brand, buy, founders, home, properties, proof, sell, story } from '../src/data/site.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')
const SITE = 'https://www.prodigio.fr'
const OG_IMAGE = `${SITE}/og-cover.png`

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escAttr = (s = '') => esc(s).replace(/"/g, '&quot;')
const lines = (t) => (Array.isArray(t) ? t : String(t).split('\n')).map(esc).join('<br>')

/* ---------- styles inline (lisible avant CSS/JS) ---------- */
const S = {
  wrap: 'max-width:900px;margin:0 auto;padding:64px 24px 96px;color:#F3EFE8;background:#0A0A0B;font-family:Jost,system-ui,sans-serif;font-weight:300;line-height:1.7',
  brand: 'font-family:"Cormorant Garamond",Georgia,serif;letter-spacing:.38em;font-size:22px;color:#F3EFE8;text-decoration:none',
  nav: 'margin:12px 0 0;font-size:12px;letter-spacing:.22em;text-transform:uppercase',
  a: 'color:#C9AE7C;margin-right:20px',
  eyebrow: 'font-size:12px;letter-spacing:.34em;text-transform:uppercase;color:#C9AE7C;margin:56px 0 14px',
  h1: 'font-family:"Cormorant Garamond",Georgia,serif;font-weight:400;font-size:clamp(36px,6vw,64px);line-height:1.05;margin:0 0 16px',
  h2: 'font-family:"Cormorant Garamond",Georgia,serif;font-weight:400;font-size:clamp(28px,4vw,42px);line-height:1.12;margin:0 0 14px',
  h3: 'font-family:"Cormorant Garamond",Georgia,serif;font-weight:500;font-size:24px;margin:22px 0 6px',
  p: 'font-size:17px;color:rgba(243,239,232,.78);margin:0 0 14px',
}
const sec = (eyebrow, title, inner, h = 'h2') =>
  `<section>${eyebrow ? `<div style="${S.eyebrow}">${esc(eyebrow)}</div>` : ''}<${h} style="${S[h]}">${lines(title)}</${h}>${inner}</section>`
const p = (t) => `<p style="${S.p}">${esc(t)}</p>`
const h3 = (t) => `<h3 style="${S.h3}">${esc(t)}</h3>`
const shell = (inner) => `<div style="${S.wrap}">
  <header><a href="/" style="${S.brand}">${esc(brand.name)}</a>
  <nav style="${S.nav}"><a href="/vendre" style="${S.a}">Vendre</a><a href="/acheter" style="${S.a}">Acheter</a><a href="${brand.whatsapp}" style="${S.a}">WhatsApp</a></nav></header>
  ${inner}</div>`

const proofBlock = () =>
  sec(proof.eyebrow, proof.title, p(proof.context) +
    p(`${proof.before.label} : ${proof.before.items.map(([v, l]) => `${v} ${l}`).join(', ')}.`) +
    p(`${proof.after.label} : ${proof.after.items.map((s) => `${s.prefix}${s.value}${s.suffix} ${s.label}`).join(', ')}.`) +
    p(proof.citiesNote))
const storyBlock = () => sec(story.eyebrow, story.title, story.acts.map((a) => h3(a.label) + p(a.text)).join(''))
const propertyBlock = (pr) =>
  `<article>${h3(`${pr.name} · ${pr.place} · ${pr.status}`)}${p(pr.hook)}${p(pr.text)}${p(pr.facts.map(([k, v]) => `${k} : ${v}`).join(' · '))}</article>`

function homeBody() {
  const h = home.hero
  return shell(
    sec(h.eyebrow, h.lines, p(h.sub) + `<p style="${S.p}"><a href="/vendre" style="${S.a}">Je vends un bien</a><a href="/acheter" style="${S.a}">Je cherche un bien</a></p>`, 'h1') +
    sec(home.doors.eyebrow, home.doors.title,
      h3(home.doors.sell.label) + p(home.doors.sell.title.replace('\n', ' ')) + p(home.doors.sell.text) +
      h3(home.doors.buy.label) + p(home.doors.buy.title.replace('\n', ' ')) + p(home.doors.buy.text)) +
    proofBlock() +
    sec(null, `${home.manifesto.a}\n${home.manifesto.b}`, p(home.manifesto.sub)) +
    sec(home.properties.eyebrow, home.properties.title, properties.map(propertyBlock).join('')) +
    storyBlock() +
    sec(founders.eyebrow, founders.title, founders.people.map((f) => h3(`${f.name} · ${f.role}`) + p(f.text)).join('')),
  )
}

function sellBody() {
  const h = sell.hero
  return shell(
    sec(h.eyebrow, h.lines, p(h.sub), 'h1') +
    sec(sell.problem.eyebrow, sell.problem.title, p(sell.problem.text) + sell.problem.stats.map((s) => p(`${s.big} : ${s.text}`)).join('')) +
    sec(sell.method.eyebrow, sell.method.title, sell.method.steps.map((s) => h3(`${s.n}. ${s.name} : ${s.title}`) + p(s.text)).join('')) +
    proofBlock() +
    sec(sell.benefits.eyebrow, 'Ce que ça change pour vous', sell.benefits.items.map((b) => h3(b.title) + p(b.text)).join('')) +
    sec(sell.model.eyebrow, sell.model.title, sell.model.items.map((m) => h3(m.title) + p(m.text)).join('')) +
    sec(sell.comparison.eyebrow, sell.comparison.title, sell.comparison.rows.map(([l, a, b]) => p(`${l} : ${a} / PRODIGIO : ${b}`)).join('')) +
    sec(null, sell.agencies.title, p(sell.agencies.text), 'h2') +
    storyBlock() +
    sec('Questions fréquentes', 'Ce que l’on nous demande.', sell.faq.map(([q, a]) => h3(q) + p(a)).join('')) +
    sec(sell.form.eyebrow, sell.form.title, p(sell.form.text)),
  )
}

function buyBody() {
  const h = buy.hero
  return shell(
    sec(h.eyebrow, h.lines, p(h.sub), 'h1') +
    sec(buy.list.eyebrow, buy.list.title, properties.map(propertyBlock).join('')) +
    sec(buy.steps.eyebrow, buy.steps.title, buy.steps.items.map((s) => h3(s.title) + p(s.text)).join('')) +
    sec(buy.regions.eyebrow, buy.regions.title, buy.regions.items.map((r) => h3(r.name) + p(r.text)).join('')) +
    sec(buy.form.eyebrow, buy.form.title, p(buy.form.text)),
  )
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
  { file: 'index.html', url: `${SITE}/`, ...home.seo, body: homeBody() },
  { file: 'vendre.html', url: `${SITE}/vendre`, ...sell.seo, body: sellBody() },
  { file: 'acheter.html', url: `${SITE}/acheter`, ...buy.seo, body: buyBody() },
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
