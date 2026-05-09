#!/usr/bin/env node
/**
 * Populate the Bond project page with full description and specs.
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

const description = [
  {
    _type: 'block',
    _key: 'para1',
    style: 'normal',
    markDefs: [],
    children: [{
      _type: 'span',
      _key: 'p1s',
      text: 'Project Bond is the new 82-metre flagship of Bilgin Yachts — a long-range tri-deck motor yacht commissioned by serial American owner John Staluppi. Sold at the 2026 Palm Beach International Boat Show, Bond marks Staluppi’s largest yacht to date and the eighteenth in a personal fleet famously named after James Bond films.',
      marks: [],
    }],
  },
  {
    _type: 'block',
    _key: 'para2',
    style: 'normal',
    markDefs: [],
    children: [{
      _type: 'span',
      _key: 'p2s',
      text: 'H2 Yacht Design is leading the interior architecture, working closely with the owner and his wife Jeanette to translate her vision for the onboard atmosphere into spaces of refined comfort and quiet glamour. The interior balances Floridian warmth with the precision of a long-range explorer — a deliberate response to a brief shaped by years of living, cruising and entertaining at sea.',
      marks: [],
    }],
  },
  {
    _type: 'block',
    _key: 'para3',
    style: 'normal',
    markDefs: [],
    children: [{
      _type: 'span',
      _key: 'p3s',
      text: 'Naval architecture and exterior styling are by Emrecan Özgün of Unique Yacht Design. The profile evolves Bilgin’s 80-metre 263 platform with expansive floor-to-ceiling glazing, modern exterior lines and a deliberate emphasis on volume, light and long-range capability.',
      marks: [],
    }],
  },
  {
    _type: 'block',
    _key: 'h-tech',
    style: 'h3',
    markDefs: [],
    children: [{
      _type: 'span',
      _key: 'htech-s',
      text: 'Engineered for two coasts',
      marks: [],
    }],
  },
  {
    _type: 'block',
    _key: 'para4',
    style: 'normal',
    markDefs: [],
    children: [{
      _type: 'span',
      _key: 'p4s',
      text: 'A signature feature is Bond’s minimal 3.6-metre draught — engineered specifically for the American market to unlock shallower harbours along the Eastern Seaboard, the Bahamas and the Florida Keys, without compromising worldwide cruising. Twin MTU 16V 4000 M73 main engines deliver a top speed of 17.5 knots, a 15-knot cruise and a transatlantic-capable 5,000 nautical mile range.',
      marks: [],
    }],
  },
  {
    _type: 'block',
    _key: 'para5',
    style: 'normal',
    markDefs: [],
    children: [{
      _type: 'span',
      _key: 'p5s',
      text: 'At 2,150 gross tonnes on an 82 × 13 metre footprint, Bond is the largest superyacht ever sold by Bilgin Yachts. Construction is underway at the Bilgin yard in Tuzla, with delivery expected in 2029.',
      marks: [],
    }],
  },
]

async function run() {
  const id = 'pkZsRkD6vYHTCIx0Y2BnN4'
  await client
    .patch(id)
    .set({
      description,
      status: 'under-construction',
      exteriorDesigner: 'Unique Yacht Design',
      designScope: ['interior'],
      specifications: {
        loa: '82m',
        beam: '13m',
        draft: '3.6m',
        guests: '12',
        maxSpeed: '17.5kts',
        range: '5,000nm',
        grossTonnage: '2,150 GT',
      },
    })
    .commit()
  console.log('✅ Updated Bond project — description, specs, status')
}

run().catch((err) => {
  console.error('❌', err.message)
  process.exit(1)
})
