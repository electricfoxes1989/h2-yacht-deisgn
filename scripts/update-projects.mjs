/**
 * Sanity Migration Script
 * Updates all H2 Yacht Design projects with:
 * 1. Correct status (completed / under-construction / concept)
 * 2. Design scope (exterior / interior / both)
 * 3. Exterior designer name (when H2 didn't do exterior)
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'dhren5s2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

// ── Category mapping from original WordPress site ──
// Maps Sanity project slugs to their correct category from h2yachtdesign.com
const categoryOverrides = {
  // These are in the "construction" category on the original site = in-build
  'bravo': 'in-build',
  'damen-seaxplorer-60': 'in-build',
  'faith': 'in-build',
  'lazzara-uhv-160': 'in-build',
  'mangusta-oceano-44-no4': 'in-build',
  'arrow': 'in-build',           // "Project Arrow" on original site
  'vard-rev-ocean': 'in-build',  // "Project REV" on original site
  'rafale': 'in-build',
  'sanlorenzo-sl52': 'in-build',
}

// ── Status mapping ──
// Derived from original site categories:
// - "construction" → under-construction
// - "concepts" → concept
// - everything else → completed
const statusByCategory = {
  'new-build': 'completed',
  'in-build': 'under-construction',
  'refit': 'completed',
  'concepts': 'concept',
  'hotel-home': 'completed',
  'tenders': 'completed',
}

// ── Design scope from CSV extraction ──
// slug → { exterior: bool, interior: bool, exteriorDesigner: string|null }
const designScopeData = {
  '100m-concept': { exterior: true, interior: true, exteriorDesigner: null },
  'al-lusail': { exterior: true, interior: true, exteriorDesigner: null },
  'al-lusail-closed-limo-tender': { exterior: true, interior: true, exteriorDesigner: null },
  'al-lusail-open-limo-tender': { exterior: true, interior: true, exteriorDesigner: null },
  'al-reem': { exterior: false, interior: true, exteriorDesigner: null },
  'andreika': { exterior: true, interior: true, exteriorDesigner: null },
  'angelique': { exterior: true, interior: true, exteriorDesigner: null },
  'arc': { exterior: true, interior: true, exteriorDesigner: null },
  'arrow-feadship-706': { exterior: true, interior: true, exteriorDesigner: null },
  'arrow': { exterior: false, interior: true, exteriorDesigner: 'Team for Design' },
  'atlas': { exterior: true, interior: true, exteriorDesigner: null },
  'bora': { exterior: true, interior: true, exteriorDesigner: null },
  'barracuda-explorer': { exterior: true, interior: true, exteriorDesigner: null },
  'barracuda-i': { exterior: true, interior: true, exteriorDesigner: null },
  'blade': { exterior: true, interior: true, exteriorDesigner: null },
  // Note: there are two "Blade" entries in Sanity — both are concepts
  'bravo': { exterior: false, interior: true, exteriorDesigner: null },
  'casa': { exterior: true, interior: true, exteriorDesigner: null },
  'central-london-apartment': { exterior: false, interior: true, exteriorDesigner: null },
  'damen-seaxplorer-60': { exterior: false, interior: true, exteriorDesigner: null },
  'danzante-bay': { exterior: true, interior: true, exteriorDesigner: null },
  'dorries-maritime': { exterior: true, interior: true, exteriorDesigner: null },
  'drako': { exterior: true, interior: true, exteriorDesigner: null },
  'dusur': { exterior: false, interior: true, exteriorDesigner: null },
  'elada': { exterior: true, interior: true, exteriorDesigner: null },
  'elara': { exterior: true, interior: true, exteriorDesigner: null },
  'faith': { exterior: false, interior: true, exteriorDesigner: 'Tim Heywood' },
  'galvas': { exterior: true, interior: false, exteriorDesigner: null },
  'giaola-lu': { exterior: true, interior: true, exteriorDesigner: null },
  'graceful': { exterior: true, interior: true, exteriorDesigner: null },
  'hotel-schloss-monchstein-castle-suites': { exterior: false, interior: true, exteriorDesigner: null },
  'hotel-schloss-monchstein-modern-rooms': { exterior: false, interior: true, exteriorDesigner: null },
  'hotel-schloss-monchstein-glass-garden': { exterior: false, interior: true, exteriorDesigner: null },
  'il-vagabondo': { exterior: true, interior: true, exteriorDesigner: null },
  'icon-yachts': { exterior: true, interior: true, exteriorDesigner: null },
  'jewels': { exterior: true, interior: true, exteriorDesigner: null },
  'lady-christina': { exterior: true, interior: false, exteriorDesigner: null },
  'lady-m': { exterior: false, interior: true, exteriorDesigner: null },
  'lazzara-uhv-160': { exterior: true, interior: true, exteriorDesigner: null },
  'leona': { exterior: true, interior: true, exteriorDesigner: null },
  'mangusta-oceano-44-no4': { exterior: false, interior: true, exteriorDesigner: 'Alberto Mancini' },
  'mars': { exterior: true, interior: true, exteriorDesigner: null },
  'mary-jean': { exterior: false, interior: true, exteriorDesigner: null },
  'maryah': { exterior: true, interior: true, exteriorDesigner: null },
  'meya-meya': { exterior: true, interior: true, exteriorDesigner: null },
  'my-go': { exterior: true, interior: true, exteriorDesigner: null },
  'nerissa': { exterior: false, interior: true, exteriorDesigner: 'Unique Yacht Design' },
  'odessa': { exterior: false, interior: true, exteriorDesigner: null },
  'odessa-ii': { exterior: false, interior: true, exteriorDesigner: null },
  'piccolo': { exterior: false, interior: true, exteriorDesigner: null },
  'pollux': { exterior: true, interior: true, exteriorDesigner: null },
  'private-residence': { exterior: false, interior: true, exteriorDesigner: null },
  'private-residential': { exterior: false, interior: true, exteriorDesigner: null },
  'project-m': { exterior: false, interior: true, exteriorDesigner: null },
  'rafale': { exterior: false, interior: true, exteriorDesigner: null },
  'raptor': { exterior: true, interior: true, exteriorDesigner: null },
  'razan': { exterior: true, interior: true, exteriorDesigner: null },
  'sanlorenzo-sl52': { exterior: false, interior: true, exteriorDesigner: null },
  'saturn': { exterior: true, interior: true, exteriorDesigner: null },
  'scout': { exterior: true, interior: true, exteriorDesigner: null },
  'sequel-p': { exterior: true, interior: true, exteriorDesigner: null },
  'stealth-explorer': { exterior: true, interior: true, exteriorDesigner: null },
  'talisman-c': { exterior: true, interior: true, exteriorDesigner: null },
  'talisman-maiton': { exterior: true, interior: true, exteriorDesigner: null },
  'tatiana': { exterior: true, interior: true, exteriorDesigner: null },
  'tee-dje': { exterior: false, interior: true, exteriorDesigner: null },
  'the-great-escape': { exterior: false, interior: true, exteriorDesigner: null },
  'transporter': { exterior: true, interior: true, exteriorDesigner: null },
  'turquoise': { exterior: false, interior: true, exteriorDesigner: null },
  'ulysses': { exterior: true, interior: true, exteriorDesigner: null },
  'va-bene': { exterior: false, interior: true, exteriorDesigner: null },
  'vard-rev-ocean': { exterior: false, interior: true, exteriorDesigner: null },
  'vento': { exterior: true, interior: true, exteriorDesigner: null },
  'vicky': { exterior: true, interior: true, exteriorDesigner: null },
  'victoria': { exterior: true, interior: true, exteriorDesigner: null },
  'victorious': { exterior: false, interior: true, exteriorDesigner: null },
  'voyage': { exterior: true, interior: true, exteriorDesigner: null },
  'zephyr': { exterior: true, interior: true, exteriorDesigner: null },
}

async function migrate() {
  console.log('Fetching all projects from Sanity...')

  const projects = await client.fetch(`
    *[_type == "project"] {
      _id,
      title,
      "slug": slug.current,
      category,
      status
    }
  `)

  console.log(`Found ${projects.length} projects\n`)

  let updated = 0
  let skipped = 0
  let errors = 0

  for (const project of projects) {
    const slug = project.slug
    const patches = {}

    // 1. Fix category if override exists
    if (categoryOverrides[slug]) {
      patches.category = categoryOverrides[slug]
    }

    // 2. Set correct status based on category
    const effectiveCategory = patches.category || project.category
    const correctStatus = statusByCategory[effectiveCategory]
    if (correctStatus && project.status !== correctStatus) {
      patches.status = correctStatus
    }

    // 3. Set design scope
    const scope = designScopeData[slug]
    if (scope) {
      const designScope = []
      if (scope.exterior) designScope.push('exterior')
      if (scope.interior) designScope.push('interior')
      patches.designScope = designScope

      if (scope.exteriorDesigner) {
        patches.exteriorDesigner = scope.exteriorDesigner
      }
    }

    // Apply patches if any
    if (Object.keys(patches).length > 0) {
      try {
        await client.patch(project._id).set(patches).commit()
        const changes = Object.entries(patches)
          .map(([k, v]) => `${k}=${Array.isArray(v) ? v.join('+') : v}`)
          .join(', ')
        console.log(`✅ ${project.title} (${slug}) → ${changes}`)
        updated++
      } catch (err) {
        console.error(`❌ ${project.title} (${slug}): ${err.message}`)
        errors++
      }
    } else {
      console.log(`⏭️  ${project.title} (${slug}) — no changes needed`)
      skipped++
    }
  }

  console.log(`\n── Done ──`)
  console.log(`Updated: ${updated}`)
  console.log(`Skipped: ${skipped}`)
  console.log(`Errors:  ${errors}`)
}

migrate().catch(console.error)
