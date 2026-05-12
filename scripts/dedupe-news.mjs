#!/usr/bin/env node
/**
 * Dedupe news articles that share the same publishedAt + similar title.
 * Keeps the doc with the most data (image > body length > newest _updatedAt).
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

function norm(t = '') {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function score(doc) {
  let s = 0
  if (doc.mainImage) s += 100
  if (doc.content && doc.content.length) s += doc.content.length * 0.1
  if (doc._updatedAt) s += new Date(doc._updatedAt).getTime() / 1e10
  return s
}

async function run() {
  console.log('\n══ Dedupe news ══\n')

  const all = await client.fetch(
    `*[_type=='news']{_id, _updatedAt, title, "slug":slug.current, publishedAt, mainImage, content}`
  )

  const groups = {}
  for (const a of all) {
    const key = norm(a.title) + '|' + (a.publishedAt || '').slice(0, 10)
    ;(groups[key] = groups[key] || []).push(a)
  }

  const dupes = Object.values(groups).filter((g) => g.length > 1)
  console.log(`Found ${dupes.length} duplicate groups\n`)

  let kept = 0,
    deleted = 0
  for (const grp of dupes) {
    grp.sort((a, b) => score(b) - score(a))
    const keep = grp[0]
    const remove = grp.slice(1)
    console.log(`▸ "${keep.title.slice(0, 55)}"`)
    console.log(`  ✓ keep: ${keep._id}`)
    for (const r of remove) {
      try {
        await client.delete(r._id)
        console.log(`  ✗ del:  ${r._id}`)
        deleted++
      } catch (err) {
        console.log(`  ⚠️  failed: ${r._id} — ${err.message?.slice(0, 60)}`)
      }
    }
    kept++
  }

  console.log(`\n══ ${kept} groups deduped, ${deleted} docs deleted ══`)
}

run().catch((err) => {
  console.error('❌ Fatal:', err.message)
  process.exit(1)
})
