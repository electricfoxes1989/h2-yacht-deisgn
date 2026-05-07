#!/usr/bin/env node
/**
 * Scrape h2yachtdesign.com project pages for missing specs and update Sanity.
 *
 * Usage: SANITY_API_TOKEN=<editor> node scripts/scrape-h2-specs.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'is7wt6ok',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

if (!process.env.SANITY_API_TOKEN) {
  console.error('❌ SANITY_API_TOKEN required')
  process.exit(1)
}

// Map our Sanity slug → H2's slug on h2yachtdesign.com
// Try multiple H2 slugs per yacht (h2yachtdesign.com uses inconsistent naming)
const TARGETS = [
  { ourSlug: 'after-you',          h2Slugs: ['after-you'] },
  { ourSlug: 'amouaje',            h2Slugs: ['amouaje', 'sanlorenzo-sl52', 'amouage'] },
  { ourSlug: 'bond',               h2Slugs: ['bond', 'project-bond', 'bilgin-bond'] },
  { ourSlug: 'ii-vagabondo',       h2Slugs: ['il-vagabondo', 'ii-vagabondo', 'vagabondo'] },
  { ourSlug: 'sea-xplorer-hull-2', h2Slugs: ['damen-seaxplorer-60', 'sea-xplorer-hull-2', 'sea-xplorer-60', 'seaxplorer-60'] },
  // Also fill specs for projects with partial coverage
  { ourSlug: 'angelique',          h2Slugs: ['angelique', 'vento'] },
  { ourSlug: 'faith',              h2Slugs: ['faith'] },
  { ourSlug: 'rafale-81m',         h2Slugs: ['rafale-81m', 'rafale'] },
]

function decode(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&#x2F;/g, '/')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .trim()
}

async function fetchSpecsForSlugs(slugs) {
  for (const s of slugs) {
    const result = await tryFetch(s)
    if (result) return result
  }
  return null
}

async function tryFetch(h2Slug) {
  for (const path of [`project/${h2Slug}`, `projects/${h2Slug}`]) {
    const url = `https://www.h2yachtdesign.com/${path}/`
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
        signal: AbortSignal.timeout(15000),
      })
      if (!res.ok) continue
      const html = await res.text()
      // Match each spec-item block individually so empty <p></p> doesn't
      // grab the next sibling block's value.
      const blockRe = /<header[^>]*>([^<]+)<\/header>\s*<p[^>]*>([^<]*)<\/p>/g
      const specs = {}
      let m
      while ((m = blockRe.exec(html)) !== null) {
        const label = decode(m[1]).toLowerCase()
        const value = decode(m[2])
        if (!value) continue // skip empty fields
        if (label.includes('builder') || label.includes('shipyard')) specs.shipyard = value
        else if (label === 'loa' || label.includes('length')) specs.loa = value
        else if (label === 'beam') specs.beam = value
        else if (label === 'guests') specs.guests = value
        else if (label === 'crew') specs.crew = value
        else if (label === 'speed' || label.includes('max speed')) specs.maxSpeed = value
        else if (label === 'year' || label.includes('delivered')) specs.year = parseInt(value) || value
        else if (label.includes('range')) specs.range = value
        else if (label.includes('draft') || label.includes('draught')) specs.draft = value
      }
      if (Object.keys(specs).length > 0) return { url, specs }
    } catch (err) { /* try next */ }
  }
  return null
}

async function run() {
  console.log('\n══ Scrape H2 specs → Sanity ══\n')

  for (const t of TARGETS) {
    const doc = await client.fetch(
      `*[_type=='project' && slug.current==$slug][0]{_id, title, year, length, shipyard, specifications}`,
      { slug: t.ourSlug }
    )
    if (!doc) {
      console.log(`❌ ${t.label || t.ourSlug} — not in Sanity`)
      continue
    }

    console.log(`\n▸ ${doc.title} (slug: ${t.ourSlug})`)
    const result = await fetchSpecsForSlugs(t.h2Slugs)
    if (!result) {
      console.log(`  ❌ Couldn't fetch from h2yachtdesign.com`)
      continue
    }
    console.log(`  ✓ Fetched ${result.url}`)

    const found = result.specs
    const update = {}
    const newSpecs = { ...(doc.specifications || {}) }

    if (found.shipyard && !doc.shipyard) update.shipyard = found.shipyard
    if (found.year && !doc.year) update.year = typeof found.year === 'number' ? found.year : parseInt(String(found.year)) || undefined
    if (found.loa && !doc.length) update.length = found.loa

    for (const k of ['loa', 'beam', 'guests', 'crew', 'maxSpeed', 'range', 'draft']) {
      if (found[k] && !newSpecs[k]) newSpecs[k] = String(found[k])
    }

    if (Object.keys(newSpecs).length > 0 && JSON.stringify(newSpecs) !== JSON.stringify(doc.specifications || {})) {
      update.specifications = newSpecs
    }

    if (Object.keys(update).length === 0) {
      console.log(`  ⏭  Nothing to add (all already present)`)
      continue
    }

    await client.patch(doc._id).set(update).commit()
    const summary = []
    if (update.shipyard) summary.push(`shipyard=${update.shipyard}`)
    if (update.year) summary.push(`year=${update.year}`)
    if (update.length) summary.push(`length=${update.length}`)
    if (update.specifications) {
      const newKeys = Object.keys(update.specifications).filter(
        (k) => !(doc.specifications || {})[k]
      )
      if (newKeys.length) summary.push(`specs=[${newKeys.join(',')}]`)
    }
    console.log(`  ✅ Updated: ${summary.join(', ')}`)
  }

  console.log('\n══ Done ══\n')
}

run().catch((err) => {
  console.error('❌', err.message)
  process.exit(1)
})
