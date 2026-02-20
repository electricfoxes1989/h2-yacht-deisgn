import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'dhren5s2',
  dataset: 'production',
  token: 'skzyLgtxrwgmjrfNDoBd6u0hWz96swXwa1qLj8WL1nVbJdgTns418Ymuti3ZwcPJUPmnMRY4QZ7R9kDHV',
  useCdn: false,
  apiVersion: '2024-01-01',
})

const results = await client.fetch(`*[_type=='project'] | order(title asc) {
  title,
  'slug': slug.current,
  'hasDesc': defined(description) && count(description) > 0,
  'blockCount': count(description),
  excerpt
}`)

const withDesc = results.filter(r => r.hasDesc)
const withoutDesc = results.filter(r => !r.hasDesc)

console.log('=== Projects WITH descriptions ===')
console.log(`Count: ${withDesc.length}`)
withDesc.forEach(r => {
  const ex = (r.excerpt || '').slice(0, 60)
  console.log(`  ✅ ${r.title} — ${r.blockCount} blocks, excerpt: "${ex}..."`)
})

console.log()
console.log('=== Projects WITHOUT descriptions ===')
console.log(`Count: ${withoutDesc.length}`)
withoutDesc.forEach(r => console.log(`  ⬜ ${r.title} (${r.slug})`))
