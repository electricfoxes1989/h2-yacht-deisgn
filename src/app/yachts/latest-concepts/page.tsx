import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllProjects, urlFor } from '@/lib/sanity'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Latest Concepts | H2 Yacht Design',
  description:
    'Explore our visionary yacht design concepts, pushing the boundaries of luxury, performance, and innovation on the water.',
}

export default async function LatestConceptsPage() {
  const allProjects = await getAllProjects()
  const concepts = allProjects.filter(
    (p: any) => p.category === 'Concept' || p.category === 'Latest Concepts' || p.category === 'concepts'
  )

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container">
          <p className="text-sm text-h2-muted mb-4">Innovation</p>
          <h1 className="font-semibold tracking-[-0.04em] mb-6">
            Latest concepts
          </h1>
          <p className="text-lg text-h2-body max-w-3xl">
            Explore our visionary yacht design concepts, pushing the boundaries
            of luxury, performance, and innovation on the water.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding">
        <div className="container">
          {concepts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-h2-body">No concept projects available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {concepts.map((concept: any) => (
                <Link
                  key={concept._id}
                  href={`/projects/${concept.slug?.current}`}
                  className="group block"
                >
                  <div className="aspect-[16/9] bg-h2-light rounded-lg mb-4 img-zoom">
                    {concept.mainImage && (
                      <img
                        src={urlFor(concept.mainImage).width(800).quality(85).url()}
                        alt={concept.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold tracking-[-0.02em] group-hover:text-h2-cyan transition-colors mb-1">
                    {concept.title}
                  </h3>
                  {concept.shipyard && (
                    <p className="text-sm text-h2-muted">{concept.shipyard}</p>
                  )}
                  {concept.excerpt && (
                    <p className="text-sm text-h2-body mt-2 leading-relaxed line-clamp-2">
                      {concept.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
