'use client'

import HeroSlideshow from '@/components/HeroSlideshow'

const heroImages = [
  { id: 'hero-scout-yt', src: '', title: 'Scout', subtitle: 'Hakvoort', youtubeId: 'edIIraSLFt4', slug: 'scout' },
  { id: 'hero-01', src: '/images/hero/hero-01.jpg', title: 'Arrow', subtitle: 'Feadship' },
  { id: 'hero-lusail-yt', src: '', title: 'Al Lusail', subtitle: 'L\u00fcrssen', youtubeId: 'fmubKGBMYmQ', slug: 'jupiter' },
  { id: 'hero-06', src: '/images/hero/hero-06.jpg', title: '', subtitle: '' },
  { id: 'hero-yt', src: '', title: '', subtitle: '', youtubeId: 'EU1rw3MhYkI' },
  { id: 'hero-13', src: '/images/hero/hero-13.jpg', title: 'MY GO', subtitle: 'Turquoise Yachts' },
  { id: 'hero-17', src: '/images/hero/hero-17.jpg', title: '', subtitle: '' },
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
