import { client, urlFor } from '@/lib/sanity'
import AboutContent from './AboutContent'

export const revalidate = 60

async function getFeaturedNewsForAbout() {
  // 3 most recent news articles that have images
  const items = await client.fetch(
    `*[_type=='news' && defined(mainImage)] | order(publishedAt desc)[0...3]{
      _id,
      title,
      slug,
      publishedAt,
      externalUrl,
      mainImage
    }`
  )
  return items.map((a: any) => ({
    ...a,
    mainImageUrl: a.mainImage
      ? urlFor(a.mainImage).width(900).height(506).fit('crop').quality(85).url()
      : undefined,
  }))
}

export default async function AboutPage() {
  const featuredNews = await getFeaturedNewsForAbout()
  return <AboutContent featuredNews={featuredNews} />
}
