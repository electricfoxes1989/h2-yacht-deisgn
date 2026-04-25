#!/usr/bin/env node
/**
 * H2 Yacht Design — Content Sync Script
 *
 * Aligns Sanity content with the current public h2yachtdesign.com site:
 *   1. Hides old refits (1995-2005) that aren't on the current website
 *   2. Marks confidential residences (private villas, penthouses, hotels)
 *   3. Adds image notes for projects pending press imagery
 *   4. Adds Jonny Horsfield as the team's only public member
 *   5. Applies fact-check fixes (Maryah, Graceful, Bond, Faith etc.)
 *   6. Merges duplicates: Vento → Angelique, Mangusta Oceano 44 No4 → The Great Escape
 *
 * Usage:  SANITY_API_TOKEN="<editor-token>" node scripts/sync-content.mjs
 *
 * Token requirements: Editor or higher on Sanity project `dhren5s2`
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'dhren5s2',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

if (!process.env.SANITY_API_TOKEN) {
  console.error('❌ Set SANITY_API_TOKEN env var (Editor token from manage.sanity.io)')
  process.exit(1)
}

// Slugs of older refits NOT on the current h2yachtdesign.com site
const HIDE_SLUGS = [
  'esmeralda', 'odysseus', 'printemps', 'be-happy', 'sokar', 'ra-ta-ta',
  'istros', 'cheetah-moon', 'shandor', 'tigre-d-or', 'lady-mimi', 'lady-m-ii',
  'fica-fria', 'element', 'atlantic-goose', 'tacanuya', 'baraka', 'philosophy',
  'serenity-ii', 'm-t-time', 'kena-marie', 'lady-carola', 'sarha', 'cocobean',
  'hh-hamad',
]

// Confidential residences — show styled placeholder, never need an image
const CONFIDENTIAL_SLUGS = [
  'mallorca-villa', 'north-london-pool', 'thailand-mansion',
  'private-villa-switzerland', 'nyc-penthouse', 'private-residence',
  'central-london-apartment', 'the-elms',
]

// Projects that ARE on h2yachtdesign.com but missing imagery — add a note
const IMAGE_NOTE_SLUGS = {
  'samar': 'Press imagery pending',
  'pegaso': 'Press imagery pending',
  'quasar': 'Press imagery pending',
  'monte-cristo': 'Press imagery pending',
  'enigma': 'Press imagery pending',
  'vandik': 'Press imagery pending',
  'amouaje': 'Press imagery pending',
}

// Fact-check fixes (from earlier audit)
const DATA_FIXES = [
  {
    slug: 'maryah',
    label: 'Maryah — length + alt name',
    set: { length: '125m', alternativeNames: ['Project 120', 'Project Czar'] },
    setSpec: { loa: '125m', beam: '17.00m' },
  },
  {
    slug: 'graceful',
    label: 'Graceful — length',
    set: { length: '82m' },
    setSpec: { loa: '82m', beam: '15.00m' },
  },
  {
    slug: 'talisman-c',
    label: 'Talisman C — length',
    set: { length: '70.6m' },
    setSpec: { loa: '70.6m', beam: '12.00m' },
  },
  {
    slug: 'bond',
    label: 'Bond — year',
    set: { year: 2029 },
  },
  {
    slug: 'faith',
    label: 'Faith — year + length',
    set: { year: 2028, length: '88m' },
    setSpec: { loa: '88m', beam: '13.5m' },
  },
  {
    slug: 'samar',
    label: 'Samar — scope (exterior)',
    set: { designScope: ['exterior'] },
  },
  {
    slug: 'pegaso',
    label: 'Pegaso/Naia — scope, length, year',
    set: { designScope: ['exterior'], length: '73.6m', year: 2011 },
  },
  {
    slug: 'victorious',
    label: 'Victorious — category (new-build)',
    set: { category: 'new-build' },
  },
  {
    slug: 'ulysses',
    label: 'Ulysses — year (delivered 2016)',
    set: { year: 2016 },
  },
  {
    slug: 'tatiana',
    label: 'Tatiana — year (delivered 2021)',
    set: { year: 2021 },
  },
]

async function getDoc(slug) {
  return client.fetch(`*[_type=='project' && slug.current==$slug][0]`, { slug })
}

async function patchDoc(id, set) {
  return client.patch(id).set(set).commit()
}

async function run() {
  console.log('\n══ H2 Yacht Design — Sync Content ══\n')

  // ── 1. MERGE: Angelique ← Vento ──
  console.log('▸ Merging Vento into Angelique...')
  const angelique = await getDoc('angelique')
  const vento = await getDoc('vento')
  if (angelique && vento) {
    const alts = [...new Set([...(angelique.alternativeNames || []), 'Vento', 'Project Vento'])]
    const gallery = [
      ...(angelique.gallery || []),
      ...(vento.gallery || []).filter(v =>
        !(angelique.gallery || []).some(a => a.asset?._ref === v.asset?._ref)
      ),
    ]
    await patchDoc(angelique._id, { alternativeNames: alts, gallery })
    await client.delete(vento._id)
    console.log('  ✅ Done')
  } else {
    console.log('  ⏭  Already merged or missing')
  }

  // ── 2. MERGE: The Great Escape ← Mangusta Oceano 44 No4 ──
  console.log('▸ Merging Mangusta Oceano 44 No4 into The Great Escape...')
  const mangusta = await client.fetch(`*[_type=='project' && title=='Mangusta Oceano 44 No4'][0]`)
  const escape = await getDoc('the-great-escape')
  if (mangusta && escape) {
    const alts = [...new Set([...(escape.alternativeNames || []), 'Mangusta Oceano 44 No4', 'Oceano 44 Hull 4'])]
    const gallery = [
      ...(escape.gallery || []),
      ...(mangusta.gallery || []).filter(m =>
        !(escape.gallery || []).some(g => g.asset?._ref === m.asset?._ref)
      ),
    ]
    const desc = (mangusta.description?.length || 0) > (escape.description?.length || 0)
      ? mangusta.description
      : escape.description
    await patchDoc(escape._id, {
      alternativeNames: alts,
      gallery,
      description: desc,
      length: '44.47m',
      specifications: { ...(escape.specifications || {}), loa: '44.47m' },
    })
    await client.delete(mangusta._id)
    console.log('  ✅ Done — fixed length to 44.47m')
  } else {
    console.log('  ⏭  Already merged or missing')
  }

  // ── 3. HIDE old refits ──
  console.log(`\n▸ Hiding ${HIDE_SLUGS.length} older projects...`)
  for (const slug of HIDE_SLUGS) {
    const doc = await getDoc(slug)
    if (doc) {
      await patchDoc(doc._id, { hidden: true })
      console.log(`  ✅ ${doc.title}`)
    }
  }

  // ── 4. MARK confidential residences ──
  console.log(`\n▸ Marking ${CONFIDENTIAL_SLUGS.length} residences as confidential...`)
  for (const slug of CONFIDENTIAL_SLUGS) {
    const doc = await getDoc(slug)
    if (doc) {
      await patchDoc(doc._id, { isConfidential: true })
      console.log(`  ✅ ${doc.title}`)
    }
  }

  // ── 5. ADD image notes ──
  console.log(`\n▸ Adding image notes for ${Object.keys(IMAGE_NOTE_SLUGS).length} projects...`)
  for (const [slug, note] of Object.entries(IMAGE_NOTE_SLUGS)) {
    const doc = await getDoc(slug)
    if (doc && !doc.mainImage) {
      await patchDoc(doc._id, { imageNote: note })
      console.log(`  ✅ ${doc.title}`)
    }
  }

  // ── 6. APPLY fact-check fixes ──
  console.log(`\n▸ Applying ${DATA_FIXES.length} data fixes...`)
  for (const fix of DATA_FIXES) {
    const doc = await getDoc(fix.slug)
    if (!doc) {
      console.log(`  ❌ ${fix.label} — not found`)
      continue
    }
    const set = { ...fix.set }
    if (fix.setSpec) {
      set.specifications = { ...(doc.specifications || {}), ...fix.setSpec }
    }
    await patchDoc(doc._id, set)
    console.log(`  ✅ ${fix.label}`)
  }

  // ── 7. ADD Jonny Horsfield as team member ──
  console.log('\n▸ Adding Jonny Horsfield to team...')
  const existing = await client.fetch(`*[_type=='team' && slug.current=='jonny-horsfield'][0]`)
  if (existing) {
    console.log('  ⏭  Already exists')
  } else {
    await client.create({
      _type: 'team',
      _id: 'team-jonny-horsfield',
      name: 'Jonny Horsfield',
      slug: { _type: 'slug', current: 'jonny-horsfield' },
      role: 'Owner & Creative Director',
      bio: [
        {
          _type: 'block',
          _key: 'bio1',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: 'bio1s',
              text: 'Jonny Horsfield established the H2 design studio in London during 1994. In the early years the studio worked almost exclusively on yacht refits, building an enviable reputation as the refit design experts before being approached for new-build interior and exterior commissions alike.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'bio2',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: 'bio2s',
              text: 'Three decades on, Jonny continues to lead H2\u2019s creative direction across superyachts, jets and residences from studios in London and Nice.',
              marks: [],
            },
          ],
        },
      ],
      order: 0,
    })
    console.log('  ✅ Created')
  }

  console.log('\n══ Sync complete ══\n')
}

run().catch(err => {
  console.error('\n❌ Error:', err.message)
  if (err.responseBody) console.error(err.responseBody)
  process.exit(1)
})
