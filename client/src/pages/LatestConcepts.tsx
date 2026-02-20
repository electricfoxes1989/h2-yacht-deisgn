import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getAllProjects, urlFor } from '@/lib/sanity'
import { Link } from 'wouter'
import {
  HeroTextReveal,
  StaggerContainer,
  staggerItem,
} from '@/components/animations'
import { motion } from 'framer-motion'

export default function LatestConcepts() {
  const [concepts, setConcepts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllProjects()
      .then((projects) => {
        const conceptProjects = projects.filter(
          (p: any) => p.category === 'Concept' || p.category === 'Latest Concepts'
        )
        setConcepts(conceptProjects)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-h2-muted">Loading concepts...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container">
          <HeroTextReveal delay={0.1}>
            <p className="text-sm text-h2-muted mb-4">Innovation</p>
          </HeroTextReveal>
          <HeroTextReveal delay={0.2}>
            <h1 className="font-semibold tracking-[-0.04em] mb-6">
              Latest concepts
            </h1>
          </HeroTextReveal>
          <HeroTextReveal delay={0.3}>
            <p className="text-lg text-h2-body max-w-3xl">
              Explore our visionary yacht design concepts, pushing the boundaries
              of luxury, performance, and innovation on the water.
            </p>
          </HeroTextReveal>
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
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
              {concepts.map((concept: any) => (
                <motion.div key={concept._id} variants={staggerItem}>
                  <Link
                    href={`/projects/${concept.slug.current}`}
                    className="group block"
                  >
                    <div className="aspect-[4/3] bg-h2-light rounded-lg mb-4 img-zoom">
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
                </motion.div>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
