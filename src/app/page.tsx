import { getFeaturedProjects, getAllProjects, getLatestNews, getLatestProjects, getAllPressArticles } from '@/lib/sanity'
import HeroSection from '@/components/home/HeroSection'
import MarqueeStrip from '@/components/home/MarqueeStrip'
import ProjectsByCategory from '@/components/home/ProjectsByCategory'
import ConceptsCarousel from '@/components/home/ConceptsCarousel'
import StatsSection from '@/components/home/StatsSection'
import ServicesSection from '@/components/home/ServicesSection'
import CTASection from '@/components/home/CTASection'
import JsonLd from '@/components/JsonLd'
import { servicesSchema, faqSchema } from '@/lib/structured-data'

const HOME_FAQ = [
  {
    question: 'What does H2 Yacht Design do?',
    answer:
      'H2 Yacht Design is a London and Nice-based studio specialising in interior and exterior design for superyachts. Founded by Jonny Horsfield in 1994, H2 also designs hospitality interiors, private residences, and yacht tenders worldwide.',
  },
  {
    question: 'Where is H2 Yacht Design based?',
    answer:
      'H2 has two studios: London (8 Princeton Court, 53/55 Felsham Road, Putney, SW15 1AZ) and Nice (4 Palais Jolienne, 43 Boulevard Gambetta, 06000), allowing the team to be close to British furniture and fabric houses as well as the Mediterranean superyacht fleet.',
  },
  {
    question: 'Who founded H2 Yacht Design?',
    answer:
      'Jonny Horsfield established the H2 design studio in London in 1994. He remains Owner and Creative Director and leads the studio\'s creative direction across all superyacht, residential, and hospitality projects.',
  },
  {
    question: 'What types of yachts has H2 designed?',
    answer:
      'H2 has delivered interior and exterior design across new builds, refits, in-build vessels, and concepts — from the 64m Scout (Hakvoort) and 75m Arrow (Feadship) to the 123m Al Lusail (Lürssen). The studio has worked with Turquoise Yachts, Bilgin, Damen, Sanlorenzo, Heesen, Mangusta, Lürssen, and many others.',
  },
  {
    question: 'Does H2 Yacht Design have a house style?',
    answer:
      'No — H2 famously does not have a house style. Each project is fully tailored to the owner\'s vision. Owner Jonny Horsfield says: "H2 pride ourselves in not having a house style."',
  },
]

export const revalidate = 60

export default async function Home() {
  const [featuredProjects, allProjects, latestNews, latestProjectsTagged, pressArticles] = await Promise.all([
    getFeaturedProjects(),
    getAllProjects(),
    getLatestNews(3),
    getLatestProjects(),
    getAllPressArticles(6),
  ])

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={[servicesSchema, faqSchema(HOME_FAQ)]} />
      <HeroSection featuredProjects={featuredProjects} />
      <MarqueeStrip projects={allProjects} />
      <ProjectsByCategory
        projects={allProjects}
        latestNews={latestNews}
        latestProjectsTagged={latestProjectsTagged}
        pressArticles={pressArticles}
      />
      <ConceptsCarousel projects={allProjects} />
      <StatsSection />
      <ServicesSection />
      <CTASection />
    </div>
  )
}
