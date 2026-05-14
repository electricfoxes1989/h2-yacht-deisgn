'use client'

import HeroSlideshow from '@/components/HeroSlideshow'

// Approved hero imagery \u2014 sourced from H2 Drive 'HERO Shots - website use only'
const heroImages = [
  { id: 'hero-arrow-aerial', src: '/images/hero/arrow-aerial.jpg', title: 'Arrow', subtitle: 'Feadship', slug: 'arrow' },
  { id: 'hero-lusail-yt', src: '', title: 'Al Lusail', subtitle: 'L\u00fcrssen', youtubeId: 'fmubKGBMYmQ', slug: 'jupiter' },
  { id: 'hero-scout-yt', src: '', title: 'Scout', subtitle: 'Hakvoort', youtubeId: 'edIIraSLFt4', slug: 'scout' },
  { id: 'hero-al-lusail-aerial', src: '/images/hero/al-lusail-aerial.jpg', title: 'Al Lusail', subtitle: 'L\u00fcrssen', slug: 'jupiter' },
  { id: 'hero-mygo-aerial', src: '/images/hero/my-go-aerial.jpg', title: 'My GO', subtitle: 'Turquoise Yachts', slug: 'go' },
  { id: 'hero-yt', src: '', title: 'H2 Yacht Design', subtitle: 'London & Nice', youtubeId: 'EU1rw3MhYkI' },
  { id: 'hero-06', src: '/images/hero/hero-06.jpg', title: 'Angelique', subtitle: 'Turquoise Yachts', slug: 'angelique' },
  { id: 'hero-17', src: '/images/hero/hero-17.jpg', title: 'Bond', subtitle: 'Bilgin Yachts', slug: 'bond' },
]

interface HeroSectionProps {
  featuredProjects: any[]
}

export default function HeroSection({ featuredProjects }: HeroSectionProps) {
  return (
    <HeroSlideshow
      slides={[
        ...featuredProjects,
        ...heroImages
          .filter((h) => !featuredProjects.some((fp: any) => fp._id === h.id))
          .map((h: any) => ({
            _id: h.id,
            title: h.title,
            slug: { current: h.slug || '' },
            shipyard: h.subtitle,
            imageUrl: h.src || undefined,
            youtubeId: h.youtubeId,
          })),
      ]}
    />
  )
}
