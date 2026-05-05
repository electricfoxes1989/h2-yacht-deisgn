import { getFeaturedProjects, getAllProjects, getLatestNews, getLatestProjects, getAllPressArticles } from '@/lib/sanity'
import HeroSection from '@/components/home/HeroSection'
import ProjectsByCategory from '@/components/home/ProjectsByCategory'
import ConceptsCarousel from '@/components/home/ConceptsCarousel'
import StatsSection from '@/components/home/StatsSection'
import ServicesSection from '@/components/home/ServicesSection'
import CTASection from '@/components/home/CTASection'

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
      <HeroSection featuredProjects={featuredProjects} />
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
