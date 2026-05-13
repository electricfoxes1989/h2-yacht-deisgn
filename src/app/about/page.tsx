import { client, urlFor } from '@/lib/sanity'
import AboutContent from './AboutContent'

export const revalidate = 60

async function getFeaturedNewsForAbout() {
  // Curated 'history & milestones' articles — slugs handpicked to
  // showcase H2's voice (philosophy, milestones, big-picture pieces).
  // If a slug isn't found, the slot is filled with the next-best
  // article having an image.
  const milestoneSlugs = [
    '5-rules-of-yacht-design', // 5 Rules of Yacht Design (2016)
    'h2-celebrate-25-years-monaco-yacht-show', // 25 Years (2019)
    'inside-largest-yacht-rev-ocean', // REV Ocean (2025)
    'design-insight-why-70-80m-is-the-sweet-spot',
    'the-art-of-superyacht-design',
    'celebrating-20-years-of-ocean-independence',
  ]
  const items = await client.fetch(
    `*[_type=='news' && slug.current in $slugs && defined(mainImage)]{
      _id,
      title,
      slug,
      publishedAt,
      externalUrl,
      mainImage
    }`,
    { slugs: milestoneSlugs }
  )
  // Sort by the order in milestoneSlugs (preserve curation order)
  items.sort((a: any, b: any) => {
    const ai = milestoneSlugs.indexOf(a.slug?.current)
    const bi = milestoneSlugs.indexOf(b.slug?.current)
    return ai - bi
  })
  const top3 = items.slice(0, 3)
  // Fallback if fewer than 3 matched
  if (top3.length < 3) {
    const extra = await client.fetch(
      `*[_type=='news' && defined(mainImage) && !(slug.current in $slugs)] | order(publishedAt desc)[0...${3 - top3.length}]{
        _id, title, slug, publishedAt, externalUrl, mainImage
      }`,
      { slugs: milestoneSlugs }
    )
    top3.push(...extra)
  }
  return top3.map((a: any) => ({
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
