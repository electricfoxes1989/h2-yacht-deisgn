import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'dhren5s2',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

async function run() {
  console.log('\n══ H2 Yacht Design — Project Data Fixes ══\n')

  // ── 1. MERGE: Angelique + Vento ──
  console.log('1. MERGING Angelique + Vento...')
  const vento = await client.fetch(`*[_type == 'project' && slug.current == 'vento'][0]`)
  const angelique = await client.fetch(`*[_type == 'project' && slug.current == 'angelique'][0]`)

  if (angelique && vento) {
    // Add "Vento" and "Project Vento" as alt names to Angelique
    const existingAlts = angelique.alternativeNames || []
    const newAlts = [...new Set([...existingAlts, 'Vento', 'Project Vento'])]

    // Merge gallery images (Vento's after Angelique's)
    const mergedGallery = [
      ...(angelique.gallery || []),
      ...(vento.gallery || []).filter(vImg =>
        !(angelique.gallery || []).some(aImg => aImg.asset?._ref === vImg.asset?._ref)
      ),
    ]

    // Keep the richer description (Angelique has 5 blocks, Vento has some too)
    // Angelique's description is more detailed, keep it

    await client
      .patch(angelique._id)
      .set({
        alternativeNames: newAlts,
        gallery: mergedGallery,
      })
      .commit()

    // Delete Vento
    await client.delete(vento._id)
    console.log(`   ✅ Merged Vento into Angelique (alt names: ${newAlts.join(', ')}), deleted Vento doc`)
  } else {
    console.log('   ⚠️  Could not find both Angelique and Vento')
  }

  // ── 2. MERGE: Mangusta Oceano 44 No4 + The Great Escape ──
  console.log('\n2. MERGING Mangusta Oceano 44 No4 + The Great Escape...')
  const mangusta = await client.fetch(`*[_type == 'project' && title == 'Mangusta Oceano 44 No4'][0]`)
  const greatEscape = await client.fetch(`*[_type == 'project' && slug.current == 'the-great-escape'][0]`)

  if (mangusta && greatEscape) {
    // Keep The Great Escape as primary, add Mangusta Oceano 44 No4 as alt name
    const existingAlts = greatEscape.alternativeNames || []
    const newAlts = [...new Set([...existingAlts, 'Mangusta Oceano 44 No4', 'Oceano 44 Hull 4'])]

    // Merge galleries
    const mergedGallery = [
      ...(greatEscape.gallery || []),
      ...(mangusta.gallery || []).filter(mImg =>
        !(greatEscape.gallery || []).some(gImg => gImg.asset?._ref === mImg.asset?._ref)
      ),
    ]

    // Use Mangusta's description if Great Escape's is weaker, or merge
    // Keep whichever is richer — use the one with more content
    const geDesc = greatEscape.description || []
    const mDesc = mangusta.description || []
    const bestDesc = mDesc.length > geDesc.length ? mDesc : geDesc

    // Fix the length to correct 44.47m
    await client
      .patch(greatEscape._id)
      .set({
        alternativeNames: newAlts,
        gallery: mergedGallery,
        description: bestDesc,
        length: '44.47m',
        specifications: {
          ...(greatEscape.specifications || {}),
          loa: '44.47m',
        },
      })
      .commit()

    // Delete Mangusta duplicate
    await client.delete(mangusta._id)
    console.log(`   ✅ Merged Mangusta into The Great Escape (alt names: ${newAlts.join(', ')}), fixed length to 44.47m, deleted Mangusta doc`)
  } else {
    console.log('   ⚠️  Could not find both Mangusta and The Great Escape')
  }

  // ── 3. FIX DATA ERRORS ──
  console.log('\n3. FIXING confirmed data errors...\n')

  const fixes = [
    {
      slug: 'maryah',
      label: 'Maryah',
      changes: {
        length: '125m',
        alternativeNames: ['Project 120', 'Project Czar'],
        specifications: { loa: '125m', beam: '17.00m' },
      },
    },
    {
      slug: 'graceful',
      label: 'Graceful',
      changes: {
        length: '82m',
        specifications: { loa: '82m', beam: '15.00m' },
      },
    },
    {
      slug: 'talisman-c',
      label: 'Talisman C',
      changes: {
        length: '70.6m',
        specifications: { loa: '70.6m', beam: '12.00m' },
      },
    },
    {
      slug: 'bond',
      label: 'Bond — year fix',
      changes: {
        year: 2029,
      },
    },
    {
      slug: 'faith',
      label: 'Faith — year + length fix',
      changes: {
        year: 2028,
        length: '88m',
        specifications: { loa: '88m', beam: '13.5m' },
      },
    },
    {
      // Samar — H2 did exterior, not interior
      slug: 'samar',
      label: 'Samar — scope fix (exterior not interior)',
      changes: {
        designScope: ['exterior'],
      },
    },
    {
      // Pegaso — H2 did exterior, not interior
      slug: 'pegaso',
      label: 'Pegaso/Naia — scope fix (exterior not interior)',
      changes: {
        designScope: ['exterior'],
        length: '73.6m',
        year: 2011,
      },
    },
    {
      // Victorious — new-build not refit
      slug: 'victorious',
      label: 'Victorious — category fix (new-build not refit)',
      changes: {
        category: 'new-build',
      },
    },
    {
      // Ulysses — delivered 2016 not 2015
      slug: 'ulysses',
      label: 'Ulysses — year fix (delivered 2016)',
      changes: {
        year: 2016,
      },
    },
    {
      // Tatiana — delivered 2021 not 2020
      slug: 'tatiana',
      label: 'Tatiana — year fix (delivered 2021)',
      changes: {
        year: 2021,
      },
    },
  ]

  for (const fix of fixes) {
    const project = await client.fetch(
      `*[_type == 'project' && slug.current == $slug][0] { _id, specifications }`,
      { slug: fix.slug }
    )

    if (!project) {
      console.log(`   ❌ ${fix.label} — not found (slug: ${fix.slug})`)
      continue
    }

    // Merge specifications if both exist
    const changes = { ...fix.changes }
    if (changes.specifications && project.specifications) {
      changes.specifications = { ...project.specifications, ...changes.specifications }
    }

    await client.patch(project._id).set(changes).commit()
    console.log(`   ✅ ${fix.label}`)
  }

  console.log('\n══ All fixes applied ══\n')
}

run().catch(console.error)
