#!/usr/bin/env node
/**
 * Source images directly from h2yachtdesign.com for projects missing galleries.
 *
 * Reads each H2 project page, extracts <img> tags from the WP gallery,
 * downloads them, uploads to Sanity, and sets mainImage + gallery on
 * the corresponding project doc.
 *
 * Usage: SANITY_API_TOKEN=<editor> node scripts/source-images-from-h2.mjs
 */

import { createClient } from '@sanity/client'
import { Buffer } from 'node:buffer'

if (!process.env.SANITY_API_TOKEN) {
  console.error('❌ SANITY_API_TOKEN required')
  process.exit(1)
}

const client = createClient({
  projectId: 'is7wt6ok',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

// Map our Sanity slug → H2 site slug
const MAPPINGS = [
  { ours: 'after-you', h2: 'after-you' },
  { ours: 'amouaje', h2: 'sanlorenzo-sl52' },
  { ours: 'ii-vagabondo', h2: 'il-vagabondo' },
  { ours: 'kleven-107m', h2: 'kleven-107m' },
  { ours: 'sea-xplorer-hull-2', h2: 'damen-seaxplorer-60' },
]

async function fetchProjectImages(h2Slug) {
  const url = `https://www.h2yachtdesign.com/project/${h2Slug}/`
  const html = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; H2YachtDesign-Migrator/1.0)' },
  }).then((r) => r.text())

  // Pull img src from WP content + open-graph + lightbox links
  const imgs = new Set()

  // og:image
  const og = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
  if (og) imgs.add(og[1])

  // <img src=...> for WP uploads
  const re = /<img[^>]+(?:src|data-src|data-lazy-src)=["'](https:\/\/www\.h2yachtdesign\.com\/wp-content\/uploads\/[^"']+\.(?:jpg|jpeg|png|webp))["']/gi
  let m
  while ((m = re.exec(html))) {
    const u = m[1]
    // skip thumbnails (e.g. -150x150, -300x200) — prefer originals
    if (/-\d{2,4}x\d{2,4}\./.test(u)) {
      // strip the size suffix to get original
      const original = u.replace(/-\d{2,4}x\d{2,4}(\.[a-z]+)$/, '$1')
      imgs.add(original)
    } else {
      imgs.add(u)
    }
  }

  // <a href="...full-size...">
  const re2 = /<a[^>]+href=["'](https:\/\/www\.h2yachtdesign\.com\/wp-content\/uploads\/[^"']+\.(?:jpg|jpeg|png|webp))["']/gi
  while ((m = re2.exec(html))) {
    imgs.add(m[1])
  }

  // Filter out logos, headers, common noise
  return [...imgs].filter(
    (u) =>
      !/logo|header|favicon|icon-/i.test(u) &&
      !/staff-/i.test(u) &&
      !/h2-yacht-design-presentation/i.test(u)
  )
}

async function uploadToSanity(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  })
  if (!res.ok) throw new Error(`fetch ${url}: ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  const ext = url.split('.').pop().split('?')[0]
  const filename = url.split('/').pop().split('?')[0]
  const ct = res.headers.get('content-type') || `image/${ext === 'jpg' ? 'jpeg' : ext}`

  const asset = await client.assets.upload('image', buf, { filename, contentType: ct })
  return asset
}

async function main() {
  console.log('═══════════════════════════════════════════════')
  console.log('  Sourcing images from h2yachtdesign.com')
  console.log('═══════════════════════════════════════════════\n')

  for (const { ours, h2 } of MAPPINGS) {
    const doc = await client.fetch(`*[_type=='project' && slug.current==$slug][0]{_id, title, mainImage, gallery}`, { slug: ours })
    if (!doc) {
      console.log(`❌ ${ours} — not found in Sanity`)
      continue
    }
    if (doc.mainImage && (doc.gallery?.length || 0) > 0) {
      console.log(`⏭  ${doc.title} — already has imagery`)
      continue
    }

    console.log(`\n▸ ${doc.title} ← /project/${h2}/`)
    let urls
    try {
      urls = await fetchProjectImages(h2)
    } catch (err) {
      console.log(`  ❌ Could not fetch H2 page: ${err.message}`)
      continue
    }
    if (urls.length === 0) {
      console.log('  ⚠️  No images found')
      continue
    }
    console.log(`  📸 Found ${urls.length} image${urls.length === 1 ? '' : 's'}`)

    const assets = []
    for (const [i, url] of urls.entries()) {
      try {
        const asset = await uploadToSanity(url)
        assets.push(asset)
        console.log(`  ✅ [${i + 1}/${urls.length}] ${url.split('/').pop()}`)
      } catch (err) {
        console.log(`  ❌ [${i + 1}/${urls.length}] ${err.message}`)
      }
    }

    if (assets.length === 0) continue

    // mainImage = first uploaded asset, gallery = the rest (or all if only one)
    const mainImage = doc.mainImage || {
      _type: 'image',
      asset: { _type: 'reference', _ref: assets[0]._id },
    }
    const galleryStart = doc.mainImage ? 0 : 1
    const newGallery = [
      ...(doc.gallery || []),
      ...assets.slice(galleryStart).map((a) => ({
        _type: 'image',
        _key: a._id.slice(-12),
        asset: { _type: 'reference', _ref: a._id },
      })),
    ]

    await client
      .patch(doc._id)
      .set({ mainImage, gallery: newGallery })
      .commit()
    console.log(`  💾 Saved: mainImage + ${newGallery.length} gallery images`)
  }

  console.log('\n═══════════════════════════════════════════════')
  console.log('  Done')
  console.log('═══════════════════════════════════════════════\n')
}

main().catch((err) => {
  console.error('❌ Fatal:', err)
  process.exit(1)
})
