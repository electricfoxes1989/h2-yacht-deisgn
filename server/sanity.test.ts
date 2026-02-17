import { describe, it, expect } from 'vitest'

describe('Sanity Configuration', () => {
  it('should have Sanity environment variables configured', () => {
    expect(process.env.VITE_SANITY_PROJECT_ID).toBeDefined()
    expect(process.env.VITE_SANITY_PROJECT_ID).not.toBe('')
    expect(process.env.VITE_SANITY_DATASET).toBeDefined()
    expect(process.env.VITE_SANITY_DATASET).not.toBe('')
    expect(process.env.SANITY_API_TOKEN).toBeDefined()
    expect(process.env.SANITY_API_TOKEN).not.toBe('')
  })

  it('should have valid Sanity project ID format', () => {
    const projectId = process.env.VITE_SANITY_PROJECT_ID
    // Sanity project IDs are alphanumeric strings, typically 8 characters
    expect(projectId).toMatch(/^[a-z0-9]+$/i)
    expect(projectId!.length).toBeGreaterThan(5)
  })

  it('should have valid dataset name', () => {
    const dataset = process.env.VITE_SANITY_DATASET
    // Dataset names are lowercase alphanumeric with hyphens
    expect(dataset).toMatch(/^[a-z0-9-]+$/)
  })
})
