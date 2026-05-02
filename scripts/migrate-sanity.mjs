#!/usr/bin/env node
/**
 * Migrate all data from dhren5s2 (Manus org, source) to is7wt6ok (business account, target).
 *
 * Reads from dhren5s2 via public GROQ API (no auth needed since dataset is public).
 * Writes to is7wt6ok using SANITY_API_TOKEN env var (must have write permission).
 *
 * Usage: SANITY_API_TOKEN=<is7wt6ok-editor-token> node scripts/migrate-sanity.mjs
 */

import { createClient } from '@sanity/client'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { Buffer } from 'node:buffer'

const SOURCE_PROJECT = 'dhren5s2'
const TARGET_PROJECT = 'is7wt6ok'
const DATASET = 'production'

if (!process.env.SANITY_API_TOKEN) {
  console.error('❌ SANITY_API_TOKEN env var required (Editor token for is7wt6ok)')
  process.exit(1)
}

// Public read client (no auth — dataset is public)
const sourceClient = createClient({
  projectId: SOURCE_PROJECT,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Write client for target
const targetClient = createClient({
  projectId: TARGET_PROJECT,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'h2-migrate-'))
console.log(`📁 Temp dir: ${TMP}`)

// ── 1. Fetch all docs from source ──
async function fetchAllDocs() {
  console.log('\n▸ Fetching all documents from dhren5s2...')
  const docs = await sourceClient.fetch(`*[!(_id in path('drafts.**'))]`)
  console.log(`  ✅ ${docs.length} documents`)
  return docs
}

// ── 2. Find every asset reference in any doc ──
function findAssetRefs(docs) {
  const refs = new Set()
  function walk(value) {
    if (!value) return
    if (typeof value === 'object') {
      if (value._type === 'reference' && value._ref?.startsWith('image-')) {
        refs.add(value._ref)
      }
      if (value._type === 'reference' && value._ref?.startsWith('file-')) {
        refs.add(value._ref)
      }
      if (Array.isArray(value)) {
        for (const item of value) walk(item)
      } else {
        for (const key of Object.keys(value)) walk(value[key])
      }
    }
  }
  for (const doc of docs) walk(doc)
  return [...refs]
}

// Convert image-abc123-1024x768-jpg → cdn URL
function refToUrl(ref) {
  if (ref.startsWith('image-')) {
    // image-{id}-{dimensions}-{ext}
    const parts = ref.split('-')
    const ext = parts[parts.length - 1]
    const id = parts.slice(1, -2).join('-')
    const dim = parts[parts.length - 2]
    return `https://cdn.sanity.io/images/${SOURCE_PROJECT}/${DATASET}/${id}-${dim}.${ext}`
  }
  if (ref.startsWith('file-')) {
    const parts = ref.split('-')
    const ext = parts[parts.length - 1]
    const id = parts.slice(1, -1).join('-')
    return `https://cdn.sanity.io/files/${SOURCE_PROJECT}/${DATASET}/${id}.${ext}`
  }
  return null
}

// ── 3. Download asset, upload to target, return new ref ──
async function migrateAsset(oldRef, idx, total) {
  const url = refToUrl(oldRef)
  if (!url) return null
  const ext = oldRef.split('-').pop()
  const isFile = oldRef.startsWith('file-')

  try {
    const res = await fetch(url)
    if (!res.ok) {
      console.log(`  ❌ [${idx}/${total}] ${oldRef} — ${res.status}`)
      return null
    }
    const buf = Buffer.from(await res.arrayBuffer())
    const filename = `${oldRef}.${ext}`

    const uploaded = await targetClient.assets.upload(
      isFile ? 'file' : 'image',
      buf,
      { filename, contentType: res.headers.get('content-type') || undefined }
    )
    console.log(`  ✅ [${idx}/${total}] ${oldRef} → ${uploaded._id}`)
    return uploaded._id
  } catch (err) {
    console.log(`  ❌ [${idx}/${total}] ${oldRef} — ${err.message}`)
    return null
  }
}

// ── 4. Rewrite refs in docs ──
function rewriteRefs(docs, refMap) {
  function walk(value) {
    if (!value) return value
    if (Array.isArray(value)) return value.map(walk)
    if (typeof value === 'object') {
      const out = {}
      for (const key of Object.keys(value)) {
        const v = value[key]
        if (key === '_ref' && refMap[v]) {
          out[key] = refMap[v]
        } else {
          out[key] = walk(v)
        }
      }
      return out
    }
    return value
  }
  return docs.map(walk)
}

// ── 5. Upload docs to target (in batches via transactions) ──
async function uploadDocs(docs) {
  console.log(`\n▸ Uploading ${docs.length} documents to is7wt6ok...`)
  const BATCH = 25
  let done = 0
  for (let i = 0; i < docs.length; i += BATCH) {
    const batch = docs.slice(i, i + BATCH)
    const tx = targetClient.transaction()
    for (const doc of batch) {
      // Strip system fields except _id and _type
      const clean = { ...doc }
      delete clean._rev
      delete clean._createdAt
      delete clean._updatedAt
      tx.createOrReplace(clean)
    }
    try {
      await tx.commit()
      done += batch.length
      console.log(`  ✅ Batch ${Math.floor(i / BATCH) + 1}: ${done}/${docs.length}`)
    } catch (err) {
      console.log(`  ❌ Batch failed: ${err.message}`)
      // Try one by one to identify the bad doc
      for (const doc of batch) {
        try {
          await targetClient.createOrReplace(doc)
          done++
        } catch (e) {
          console.log(`     ❌ ${doc._id} — ${e.message?.slice(0, 100)}`)
        }
      }
    }
  }
  console.log(`  ✅ ${done}/${docs.length} documents uploaded`)
}

// ── Main ──
async function main() {
  console.log('═══════════════════════════════════════════════')
  console.log(`  Sanity migration: ${SOURCE_PROJECT} → ${TARGET_PROJECT}`)
  console.log('═══════════════════════════════════════════════')

  const docs = await fetchAllDocs()

  // Categorize
  const byType = docs.reduce((acc, d) => {
    acc[d._type] = (acc[d._type] || 0) + 1
    return acc
  }, {})
  console.log('  Types:', byType)

  // Migrate assets first
  const refs = findAssetRefs(docs)
  console.log(`\n▸ Migrating ${refs.length} asset references...`)
  const refMap = {}
  // Run in parallel batches to speed up
  const PARALLEL = 8
  for (let i = 0; i < refs.length; i += PARALLEL) {
    const batch = refs.slice(i, i + PARALLEL)
    const results = await Promise.all(
      batch.map((ref, j) => migrateAsset(ref, i + j + 1, refs.length))
    )
    batch.forEach((ref, j) => {
      if (results[j]) refMap[ref] = results[j]
    })
  }
  console.log(`  ✅ ${Object.keys(refMap).length}/${refs.length} assets migrated`)

  // Save refMap for debugging
  fs.writeFileSync(
    path.join(TMP, 'ref-map.json'),
    JSON.stringify(refMap, null, 2)
  )

  // Rewrite refs in docs
  console.log('\n▸ Rewriting asset references in docs...')
  const rewritten = rewriteRefs(docs, refMap)
  console.log(`  ✅ Rewrote ${docs.length} docs`)

  // Save rewritten docs for debugging
  fs.writeFileSync(
    path.join(TMP, 'docs-rewritten.json'),
    JSON.stringify(rewritten, null, 2)
  )

  // Upload to target
  await uploadDocs(rewritten)

  console.log('\n═══════════════════════════════════════════════')
  console.log('  Migration complete!')
  console.log(`  Backup data in ${TMP}`)
  console.log('═══════════════════════════════════════════════\n')
}

main().catch((err) => {
  console.error('\n❌ Fatal error:', err)
  if (err.responseBody) console.error(err.responseBody)
  process.exit(1)
})
