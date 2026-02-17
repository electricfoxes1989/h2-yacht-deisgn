import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'dhren5s2',
  dataset: 'production',
  token: 'skzyLgtxrwgmjrfNDoBd6u0hWz96swXwa1qLj8WL1nVbJdgTns418Ymuti3ZwcPJUPmnMRY4QZ7R9kDHV',
  useCdn: false,
  apiVersion: '2024-01-01',
})

// In Build projects from the live h2yachtdesign.com/projects/construction/
const inBuildNames = [
  'arrow',
  'rev ocean',
  'vard',
  'damen',
  'seaxplorer',
  'faith',
  'mangusta',
  'sanlorenzo',
  'bravo',
  'lazzara',
  'rafale',
]

async function main() {
  // Get all projects
  const allProjects = await client.fetch(`*[_type == "project"] { _id, title, category }`)
  console.log(`Total projects: ${allProjects.length}`)

  // Find matches
  const toUpdate = allProjects.filter(p => {
    const titleLower = p.title.toLowerCase()
    return inBuildNames.some(name => titleLower.includes(name))
  })

  console.log(`\nFound ${toUpdate.length} projects to re-tag as in-build:`)
  toUpdate.forEach(p => console.log(`  - ${p.title} (current: ${p.category})`))

  // Update each
  for (const project of toUpdate) {
    await client.patch(project._id).set({ category: 'in-build' }).commit()
    console.log(`✓ Updated: ${project.title} → in-build`)
  }

  // Verify
  const inBuild = await client.fetch(`*[_type == "project" && category == "in-build"] { title }`)
  console.log(`\nTotal in-build projects now: ${inBuild.length}`)
  inBuild.forEach(p => console.log(`  - ${p.title}`))
}

main().catch(console.error)
