import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getAllProjects, urlFor } from '@/lib/sanity'
import { Link } from 'wouter'

const categories = [
  { label: 'All', value: 'All' },
  { label: 'New Build', value: 'new-build' },
  { label: 'In Build', value: 'in-build' },
  { label: 'Concepts', value: 'concepts' },
  { label: 'Refit', value: 'refit' },
  { label: 'Hotel & Home', value: 'hotel-home' },
  { label: 'Tenders', value: 'tenders' },
]

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    getAllProjects()
      .then(setProjects)
      .finally(() => setLoading(false))
  }, [])

  const filteredProjects = projects.filter(
    (p: any) => selectedCategory === 'All' || p.category === selectedCategory
  )

  const selectedLabel = categories.find(c => c.value === selectedCategory)?.label || ''

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-h2-muted label-text">
          Loading projects...
        </div>
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

      {/* Category filter + count */}
      <section className="bg-h2-light py-8">
        <div className="container">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-5 py-2.5 text-xs font-medium uppercase tracking-[0.1em] border rounded-lg transition-all duration-300 ${
                    selectedCategory === cat.value
                      ? 'bg-h2-navy text-white border-transparent'
                      : 'bg-transparent text-h2-body border-gray-300 hover:border-gray-800 hover:text-h2-navy'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <p className="label-text text-h2-muted">
              {filteredProjects.length}{' '}
              {filteredProjects.length === 1 ? 'project' : 'projects'}
              {selectedCategory !== 'All' && (
                <span> in {selectedLabel}</span>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Project grid */}
      <section className="section-padding">
        <div className="container">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-h2-body tracking-[-0.01em]">
                No projects available yet. Add projects through Sanity Studio.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
              {filteredProjects.map((project: any) => (
                <Link
                  key={project._id}
                  href={`/projects/${project.slug?.current}`}
                  className="group block"
                >
                  {/* Image — clean zoom, no overlay */}
                  <div className="img-zoom bg-h2-light overflow-hidden rounded-xl aspect-[4/3]">
                    {project.mainImage && (
                      <img
                        src={urlFor(project.mainImage)
                          .width(900)
                          .height(675)
                          .fit('crop')
                          .quality(85)
                          .url()}
                        alt={project.title}
                        className="w-full h-full object-cover block"
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
                      <p className="text-sm text-h2-muted mt-1">
                        {project.shipyard}
                      </p>
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

      {/* CTA Section */}
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
