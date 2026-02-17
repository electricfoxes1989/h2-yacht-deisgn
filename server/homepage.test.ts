import { describe, it, expect } from 'vitest'

describe('Homepage Project Showcase', () => {
  it('should have Sanity client configured for project queries', () => {
    // Verify environment variables are set
    expect(process.env.VITE_SANITY_PROJECT_ID).toBeDefined()
    expect(process.env.VITE_SANITY_DATASET).toBeDefined()
  })

  it('should validate project showcase section exists in Home component', async () => {
    // Read the Home.tsx file to verify project showcase section
    const fs = await import('fs/promises')
    const homeContent = await fs.readFile(
      '/home/ubuntu/h2-yacht-design/client/src/pages/Home.tsx',
      'utf-8'
    )

    // Verify key elements of the project showcase
    expect(homeContent).toContain('Projects Showcase Section')
    expect(homeContent).toContain('getAllProjects')
    expect(homeContent).toContain('Featured Projects')
    expect(homeContent).toContain('View All Projects')
    expect(homeContent).toContain('allProjects.slice(0, 6)')
  })

  it('should validate Sanity query functions exist', async () => {
    const fs = await import('fs/promises')
    const sanityContent = await fs.readFile(
      '/home/ubuntu/h2-yacht-design/client/src/lib/sanity.ts',
      'utf-8'
    )

    // Verify query functions are defined
    expect(sanityContent).toContain('export async function getFeaturedProjects()')
    expect(sanityContent).toContain('export async function getAllProjects()')
    expect(sanityContent).toContain('_type == "project"')
  })
})
