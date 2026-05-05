import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'is7wt6ok',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// ── Project queries ──

export async function getFeaturedProjects() {
  return await client.fetch(`
    *[_type == "project" && featured == true && !(hidden == true)] | order(order asc) {
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
    *[_type == "project" && !(hidden == true)] | order(defined(year) desc, year desc, title asc) {
      _id,
      title,
      slug,
      shipyard,
      category,
      year,
      length,
      excerpt,
      mainImage,
      designScope,
      imageNote,
      isConfidential,
      "interiorImage": gallery[0]
    }
  `)
}

export async function getProjectBySlug(slug: string) {
  return await client.fetch(
    `*[_type == "project" && slug.current == $slug && !(hidden == true)][0] {
      _id,
      title,
      slug,
      shipyard,
      category,
      year,
      length,
      excerpt,
      description,
      heroVideoId,
      mainImage,
      gallery,
      status,
      designScope,
      exteriorDesigner,
      alternativeNames,
      specifications,
      imageNote,
      isConfidential,
      pressArticles
    }`,
    { slug }
  )
}

export async function getProjectsByCategory(category: string) {
  return await client.fetch(
    `*[_type == "project" && category == $category && !(hidden == true)] | order(defined(year) desc, year desc, title asc) {
      _id,
      title,
      slug,
      shipyard,
      category,
      year,
      length,
      excerpt,
      mainImage,
      imageNote,
      isConfidential
    }`,
    { category }
  )
}

/**
 * Aggregate press articles across all visible projects, newest first.
 * Each entry includes the parent yacht's title and slug for linking back.
 */
export async function getAllPressArticles(limit: number = 6) {
  return await client.fetch(
    `*[_type == "project" && !(hidden == true) && defined(pressArticles)] {
      title,
      slug,
      "articles": pressArticles[]{
        _key,
        title,
        publication,
        url,
        date,
        imageUrl
      }
    }[]{
      "yachtTitle": title,
      "yachtSlug": slug.current,
      articles
    }`
  ).then((projects: any[]) => {
    // Flatten + sort by date desc + take top N
    const all: any[] = []
    for (const p of projects) {
      for (const a of p.articles || []) {
        all.push({ ...a, yachtTitle: p.yachtTitle, yachtSlug: p.yachtSlug })
      }
    }
    return all
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
      .slice(0, limit)
  })
}

export async function getLatestProjects() {
  return await client.fetch(`
    *[_type == "project" && showInLatest == true && defined(mainImage)] | order(defined(year) desc, year desc, title asc) {
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

// ── Team queries ──

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

// ── News queries ──

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
