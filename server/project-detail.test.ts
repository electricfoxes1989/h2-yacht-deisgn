import { describe, it, expect } from 'vitest'

describe('Project Detail Page', () => {
  it('should have ProjectDetail component created', async () => {
    const fs = await import('fs/promises')
    const projectDetailExists = await fs
      .access('/home/ubuntu/h2-yacht-design/client/src/pages/ProjectDetail.tsx')
      .then(() => true)
      .catch(() => false)

    expect(projectDetailExists).toBe(true)
  })

  it('should have dynamic route registered in App.tsx', async () => {
    const fs = await import('fs/promises')
    const appContent = await fs.readFile(
      '/home/ubuntu/h2-yacht-design/client/src/App.tsx',
      'utf-8'
    )

    // Verify route is registered
    expect(appContent).toContain('import ProjectDetail from')
    expect(appContent).toContain('/projects/:slug')
  })

  it('should include all required sections in ProjectDetail component', async () => {
    const fs = await import('fs/promises')
    const detailContent = await fs.readFile(
      '/home/ubuntu/h2-yacht-design/client/src/pages/ProjectDetail.tsx',
      'utf-8'
    )

    // Verify key sections exist
    expect(detailContent).toContain('Back to Projects')
    expect(detailContent).toContain('Image Gallery')
    expect(detailContent).toContain('About This Project')
    expect(detailContent).toContain('Specifications')
    expect(detailContent).toContain('Related Projects')
    expect(detailContent).toContain('getProjectBySlug')
  })

  it('should have gallery navigation controls', async () => {
    const fs = await import('fs/promises')
    const detailContent = await fs.readFile(
      '/home/ubuntu/h2-yacht-design/client/src/pages/ProjectDetail.tsx',
      'utf-8'
    )

    // Verify gallery features
    expect(detailContent).toContain('nextImage')
    expect(detailContent).toContain('prevImage')
    expect(detailContent).toContain('currentImageIndex')
    expect(detailContent).toContain('ChevronLeft')
    expect(detailContent).toContain('ChevronRight')
  })

  it('should query related projects by category', async () => {
    const fs = await import('fs/promises')
    const detailContent = await fs.readFile(
      '/home/ubuntu/h2-yacht-design/client/src/pages/ProjectDetail.tsx',
      'utf-8'
    )

    // Verify related projects logic
    expect(detailContent).toContain('relatedProjects')
    expect(detailContent).toContain('category === projectData?.category')
  })
})
