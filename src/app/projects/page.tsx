import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/sanity'
import ProjectsGrid from './ProjectsGrid'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Projects — Superyachts, Refits & Concepts',
  description:
    'Three decades of superyacht interiors, new builds, refits, and bespoke residential projects designed by H2 Yacht Design. Browse 90+ yachts including Scout (Hakvoort), Arrow (Feadship), Al Lusail (Lürssen), Maryah (Elefsis), and more.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projects — H2 Yacht Design',
    description: '90+ superyachts, refits, concepts and residential projects.',
    url: '/projects',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Projects', url: '/projects' },
])

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <div className="bg-white">
      <JsonLd data={breadcrumbs} />
      {/* Hero */}
      <section className="section-dark pt-40 pb-20 lg:pt-48 lg:pb-28">
        <div className="container">
          <p className="label-text mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Portfolio
          </p>
          <h1 className="heading-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6">
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
    </div>
  )
}
