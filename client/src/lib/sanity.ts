import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'dhren5s2',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Query functions for projects
export async function getFeaturedProjects() {
  return await client.fetch(`
    *[_type == "project" && featured == true] | order(order asc) {
      _id,
      title,
      slug,
      shipyard,
      category,
      year,
      length,
      excerpt,
      mainImage,
      order
    }
  `)
}

export async function getAllProjects() {
  return await client.fetch(`
    *[_type == "project"] | order(year desc) {
      _id,
      title,
      slug,
      shipyard,
      category,
      year,
      length,
      excerpt,
      mainImage
    }
  `)
}

export async function getProjectBySlug(slug: string) {
  return await client.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      shipyard,
      category,
      year,
      length,
      excerpt,
      description,
      mainImage,
      gallery,
      status,
      specifications
    }`,
    { slug }
  )
}

// Query projects by category
export async function getProjectsByCategory(category: string) {
  return await client.fetch(
    `*[_type == "project" && category == $category] | order(year desc) {
      _id,
      title,
      slug,
      shipyard,
      category,
      year,
      length,
      excerpt,
      mainImage
    }`,
    { category }
  )
}

// Query functions for team
export async function getTeamMembers() {
  return await client.fetch(`
    *[_type == "team"] | order(order asc) {
      _id,
      name,
      slug,
      role,
      bio,
      image
    }
  `)
}

// Query functions for news
export async function getLatestNews(limit: number = 3) {
  return await client.fetch(
    `*[_type == "news"] | order(publishedAt desc) [0...$limit] {
      _id,
      title,
      slug,
      publishedAt,
      publication,
      excerpt,
      mainImage,
      externalUrl
    }`,
    { limit }
  )
}

export async function getAllNews() {
  return await client.fetch(`
    *[_type == "news"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      publication,
      excerpt,
      mainImage,
      externalUrl
    }
  `)
}

export async function getNewsBySlug(slug: string) {
  return await client.fetch(
    `*[_type == "news" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      publication,
      excerpt,
      content,
      mainImage,
      externalUrl
    }`,
    { slug }
  )
}
