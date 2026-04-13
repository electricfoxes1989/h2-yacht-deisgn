import type { MetadataRoute } from 'next'
import { getAllProjects, getAllNews } from '@/lib/sanity'

const BASE_URL = 'https://h2-yacht-design.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, news] = await Promise.all([
    getAllProjects(),
    getAllNews(),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/news`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/team`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact/careers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/projects/category/exterior`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/projects/category/interiors`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/projects/category/concepts`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/projects/category/in-build`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/projects/category/bespoke`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ]

  const projectPages: MetadataRoute.Sitemap = projects.map((project: any) => ({
    url: `${BASE_URL}/projects/${project.slug?.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const newsPages: MetadataRoute.Sitemap = news
    .filter((article: any) => article.slug?.current && !article.externalUrl)
    .map((article: any) => ({
      url: `${BASE_URL}/news/${article.slug.current}`,
      lastModified: article.publishedAt ? new Date(article.publishedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  return [...staticPages, ...projectPages, ...newsPages]
}
