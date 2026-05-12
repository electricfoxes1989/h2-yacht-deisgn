#!/usr/bin/env node
/**
 * Backfill mainImage on news articles that have an externalUrl
 * but no image. Fetches og:image from the source URL and uploads
 * to Sanity.
 *
 * Usage: SANITY_API_TOKEN=<editor> node scripts/backfill-news-images.mjs
 */
import { createClient } from '@sanity/client'
import { Buffer } from 'node:buffer'

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

async function fetchOgImage(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml',
      },
      signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) return null
    const html = await res.text()
    const m =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i) ||
      html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i)
    if (!m) return null
    let img = m[1]
      .replace(/&amp;/g, '&')
      .replace(/&#x2F;/g, '/')
      .replace(/&#39;/g, "'")
    if (img.startsWith('//')) img = 'https:' + img
    else if (img.startsWith('/')) {
      const u = new URL(url)
      img = `${u.origin}${img}`
    }
    return img
  } catch (err) {
    return null
  }
}

async function uploadAsset(imageUrl) {
  const res = await fetch(imageUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
    signal: AbortSignal.timeout(20000),
  })
  if (!res.ok) throw new Error(`fetch ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  const ext = (imageUrl.split('?')[0].split('.').pop() || 'jpg').toLowerCase().slice(0, 4)
  const filename = `news-${Date.now()}.${ext}`
  return client.assets.upload('image', buf, {
    filename,
    contentType: res.headers.get('content-type') || 'image/jpeg',
  })
}

async function run() {
  console.log('\n══ Backfill news images ══\n')

  const articles = await client.fetch(
    `*[_type=='news' && !defined(mainImage) && defined(externalUrl)] | order(publishedAt desc){_id, title, externalUrl}`
  )

  console.log(`Found ${articles.length} articles missing images\n`)

  let ok = 0, fail = 0
  for (const a of articles) {
    const og = await fetchOgImage(a.externalUrl)
    if (!og) {
      console.log(`  ❌ ${a.title.slice(0, 50)} — no og:image`)
      fail++
      continue
    }
    try {
      const asset = await uploadAsset(og)
      await client
        .patch(a._id)
        .set({ mainImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } })
        .commit()
      console.log(`  ✅ ${a.title.slice(0, 60)}`)
      ok++
    } catch (err) {
      console.log(`  ⚠️  ${a.title.slice(0, 50)} — ${err.message}`)
      fail++
    }
  }

  console.log(`\n══ ${ok} updated, ${fail} failed ══`)
}

run().catch((err) => {
  console.error('❌ Fatal:', err.message)
  process.exit(1)
})
