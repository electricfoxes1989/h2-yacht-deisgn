import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema, faqSchema } from '@/lib/structured-data'

const ABOUT_FAQ = [
  {
    question: 'When was H2 Yacht Design founded?',
    answer:
      'H2 Yacht Design was established by Jonny Horsfield in London in 1994. Over 30 years on, the studio has delivered interior and exterior design for many of the world\'s most distinguished superyachts.',
  },
  {
    question: 'What does H2\'s design process look like?',
    answer:
      'Interior projects move through a defined process: GA room plan, reference images and mood boards, concept sketches, white 3D model, fabric and materials boards, finished renderings, schedules, production drawings, art works and accessories. Exterior projects follow concept, computer 3D model, 3D rendering, exterior deck areas, exterior fabrics and furniture, and on-site supervision of construction.',
  },
  {
    question: 'Why does H2 have a Nice studio?',
    answer:
      'H2 opened the Nice studio to be on the doorstep of the Mediterranean superyacht fleet, allowing the team to meet owners, attend launches, and visit yards across the Côte d\'Azur, Italy, and Monaco.',
  },
]

export const metadata: Metadata = {
  title: 'About — Studio, History & Process',
  description:
    'H2 Yacht Design has been a London-based superyacht design studio since 1994, founded by Jonny Horsfield. Now with a Mediterranean studio in Nice, the team designs interior and exterior across new builds, refits, and concepts.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About H2 Yacht Design',
    description: 'Award-winning superyacht studio with 30+ years of expertise — London & Nice.',
    url: '/about',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
])

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[breadcrumbs, faqSchema(ABOUT_FAQ)]} />
      {children}
    </>
  )
}
