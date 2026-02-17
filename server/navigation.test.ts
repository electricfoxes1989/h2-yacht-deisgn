import { describe, it, expect } from 'vitest'

describe('Navigation Structure', () => {
  it('should have updated Navigation component with dropdowns', async () => {
    const fs = await import('fs/promises')
    const navContent = await fs.readFile(
      '/home/ubuntu/h2-yacht-design/client/src/components/Navigation.tsx',
      'utf-8'
    )

    // Verify dropdown structure
    expect(navContent).toContain('Yachts')
    expect(navContent).toContain('Contact')
    expect(navContent).toContain('ChevronDown')
    expect(navContent).toContain('Latest Concepts')
    expect(navContent).toContain('Under Construction')
    expect(navContent).toContain('Team')
    expect(navContent).toContain('Careers')
  })

  it('should have created Latest Concepts page', async () => {
    const fs = await import('fs/promises')
    const pageExists = await fs
      .access('/home/ubuntu/h2-yacht-design/client/src/pages/LatestConcepts.tsx')
      .then(() => true)
      .catch(() => false)

    expect(pageExists).toBe(true)
  })

  it('should have created Under Construction page', async () => {
    const fs = await import('fs/promises')
    const pageExists = await fs
      .access('/home/ubuntu/h2-yacht-design/client/src/pages/UnderConstruction.tsx')
      .then(() => true)
      .catch(() => false)

    expect(pageExists).toBe(true)
  })

  it('should have created Careers page', async () => {
    const fs = await import('fs/promises')
    const pageExists = await fs
      .access('/home/ubuntu/h2-yacht-design/client/src/pages/Careers.tsx')
      .then(() => true)
      .catch(() => false)

    expect(pageExists).toBe(true)
  })

  it('should have registered all new routes in App.tsx', async () => {
    const fs = await import('fs/promises')
    const appContent = await fs.readFile(
      '/home/ubuntu/h2-yacht-design/client/src/App.tsx',
      'utf-8'
    )

    // Verify routes are registered
    expect(appContent).toContain('/yachts/latest-concepts')
    expect(appContent).toContain('/yachts/under-construction')
    expect(appContent).toContain('/contact/team')
    expect(appContent).toContain('/contact/careers')
    expect(appContent).toContain('import LatestConcepts')
    expect(appContent).toContain('import UnderConstruction')
    expect(appContent).toContain('import Careers')
  })
})
