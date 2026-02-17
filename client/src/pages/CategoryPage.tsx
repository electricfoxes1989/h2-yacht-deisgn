import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getProjectsByCategory, urlFor } from '@/lib/sanity'
import { Link } from 'wouter'
import { ArrowRight } from 'lucide-react'

interface CategoryPageProps {
  category: string | string[]
  title: string
  subtitle: string
  description: string
}

export default function CategoryPage({ category, title, subtitle, description }: CategoryPageProps) {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cats = Array.isArray(category) ? category : [category]
    Promise.all(cats.map(c => getProjectsByCategory(c)))
      .then(results => {
        setProjects(results.flat())
      })
      .finally(() => setLoading(false))
  }, [category])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-h2-muted label-text">Loading projects...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="section-dark pt-40 pb-20">
        <div className="container">
          <p className="label-text mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {subtitle}
          </p>
          <h1 className="heading-serif text-5xl md:text-6xl lg:text-7xl mb-6">
            {title}
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {description}
          </p>
        </div>
      </section>

      {/* Project grid */}
      <section className="section-padding">
        <div className="container">
          {projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-h2-body tracking-[-0.01em]">
                No projects available yet in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
              {projects.map((project: any) => (
                <Link
                  key={project._id}
                  href={`/projects/${project.slug?.current}`}
                  className="group block"
                >
                  {/* Image — clean zoom, no overlay */}
                  <div className="img-zoom bg-h2-light overflow-hidden rounded-xl">
                    {project.mainImage && (
                      <img
                        src={urlFor(project.mainImage)
                          .width(900)
                          .quality(85)
                          .url()}
                        alt={project.title}
                        className="w-full h-auto block"
                      />
                    )}
                  </div>

                  {/* Info below image */}
                  <div className="project-card-text mt-5">
                    <div className="accent-line mb-4" />
                    <h3 className="text-lg font-semibold tracking-[-0.02em] text-h2-navy group-hover:text-[var(--h2-cyan)] transition-colors duration-300">
                      {project.title}
                    </h3>
                    {project.shipyard && (
                      <p className="text-sm text-h2-muted mt-1">{project.shipyard}</p>
                    )}
                    {(project.year || project.length) && (
                      <div className="flex items-center gap-4 mt-2">
                        {project.year && (
                          <span className="label-text text-h2-muted">{project.year}</span>
                        )}
                        {project.year && project.length && (
                          <span className="w-px h-3 bg-gray-300" />
                        )}
                        {project.length && (
                          <span className="label-text text-h2-muted">{project.length}m</span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark section-padding">
        <div className="container text-center">
          <p className="label-text mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Begin a Conversation
          </p>
          <h2 className="heading-serif text-4xl md:text-5xl lg:text-6xl mb-6">
            Start Your Project
          </h2>
          <p className="text-lg leading-relaxed max-w-xl mx-auto mb-10" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Every vessel begins with a vision. Let us bring yours to life with
            design that is as considered as it is captivating.
          </p>
          <Link href="/contact" className="btn-outline-light">
            Get in Touch
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
