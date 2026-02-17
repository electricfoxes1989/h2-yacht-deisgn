import { describe, it, expect } from 'vitest'
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config()

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID!,
  dataset: process.env.VITE_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

describe('Sanity Content Population', () => {
  it('should have yacht projects in Sanity', async () => {
    const projects = await client.fetch('*[_type == "project"]')
    expect(projects.length).toBeGreaterThan(0)
    expect(projects.length).toBe(6)
  })

  it('should have featured projects', async () => {
    const featuredProjects = await client.fetch('*[_type == "project" && featured == true]')
    expect(featuredProjects.length).toBeGreaterThan(0)
  })

  it('should have projects with correct categories', async () => {
    const concepts = await client.fetch('*[_type == "project" && category == "Latest Concepts"]')
    const underConstruction = await client.fetch('*[_type == "project" && category == "Under Construction"]')
    
    expect(concepts.length).toBeGreaterThan(0)
    expect(underConstruction.length).toBeGreaterThan(0)
  })

  it('should have team members in Sanity', async () => {
    const teamMembers = await client.fetch('*[_type == "teamMember"]')
    expect(teamMembers.length).toBeGreaterThan(0)
    expect(teamMembers.length).toBe(4)
  })

  it('should have news articles in Sanity', async () => {
    const news = await client.fetch('*[_type == "news"]')
    expect(news.length).toBeGreaterThan(0)
    expect(news.length).toBe(3)
  })

  it('should have projects with required fields', async () => {
    const projects = await client.fetch('*[_type == "project"][0]')
    expect(projects).toHaveProperty('title')
    expect(projects).toHaveProperty('slug')
    expect(projects).toHaveProperty('category')
    expect(projects).toHaveProperty('shipyard')
    expect(projects).toHaveProperty('excerpt')
  })
})
