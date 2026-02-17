import { describe, it, expect } from 'vitest'

describe('Mobile Navigation', () => {
  it('should have mobile menu with hamburger icon', async () => {
    const fs = await import('fs/promises')
    const navContent = await fs.readFile(
      '/home/ubuntu/h2-yacht-design/client/src/components/Navigation.tsx',
      'utf-8'
    )

    // Verify mobile menu elements
    expect(navContent).toContain('mobileMenuOpen')
    expect(navContent).toContain('Menu')
    expect(navContent).toContain('X')
    expect(navContent).toContain('md:hidden')
  })

  it('should have slide-out drawer with backdrop', async () => {
    const fs = await import('fs/promises')
    const navContent = await fs.readFile(
      '/home/ubuntu/h2-yacht-design/client/src/components/Navigation.tsx',
      'utf-8'
    )

    // Verify drawer structure
    expect(navContent).toContain('Drawer')
    expect(navContent).toContain('Backdrop')
    expect(navContent).toContain('translate-x-0')
    expect(navContent).toContain('translate-x-full')
    expect(navContent).toContain('bg-black/50')
  })

  it('should have mobile dropdown menus for Yachts and Contact', async () => {
    const fs = await import('fs/promises')
    const navContent = await fs.readFile(
      '/home/ubuntu/h2-yacht-design/client/src/components/Navigation.tsx',
      'utf-8'
    )

    // Verify mobile dropdowns
    expect(navContent).toContain('mobileYachtsOpen')
    expect(navContent).toContain('mobileContactOpen')
    expect(navContent).toContain('Latest Concepts')
    expect(navContent).toContain('Under Construction')
    expect(navContent).toContain('Team')
    expect(navContent).toContain('Careers')
  })

  it('should have closeMobileMenu function', async () => {
    const fs = await import('fs/promises')
    const navContent = await fs.readFile(
      '/home/ubuntu/h2-yacht-design/client/src/components/Navigation.tsx',
      'utf-8'
    )

    // Verify close functionality
    expect(navContent).toContain('closeMobileMenu')
    expect(navContent).toContain('setMobileMenuOpen(false)')
  })

  it('should have smooth transitions and animations', async () => {
    const fs = await import('fs/promises')
    const navContent = await fs.readFile(
      '/home/ubuntu/h2-yacht-design/client/src/components/Navigation.tsx',
      'utf-8'
    )

    // Verify transitions
    expect(navContent).toContain('transition-transform')
    expect(navContent).toContain('transition-opacity')
    expect(navContent).toContain('duration-300')
  })
})
