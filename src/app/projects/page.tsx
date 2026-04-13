import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/sanity'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ProjectsGrid from './ProjectsGrid'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Projects | H2 Yacht Design',
  description:
    'Three decades of superyacht interiors, new builds, refits, and bespoke residential projects — each one a singular expression of craft and vision.',
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="section-dark pt-40 pb-20">
        <div className="container">
          <p className="label-text mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Portfolio
          </p>
          <h1 className="heading-serif text-5xl md:text-6xl lg:text-7xl mb-6">
            Our Portfolio
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Three decades of superyacht interiors, new builds, refits, and
            bespoke residential projects — each one a singular expression of craft
            and vision.
          </p>
        </div>
      </section>

      <ProjectsGrid projects={projects} />

      <Footer />
    </div>
  )
}
