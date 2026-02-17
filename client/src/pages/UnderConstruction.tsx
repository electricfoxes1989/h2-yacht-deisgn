import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getAllProjects, urlFor } from '@/lib/sanity'
import { Link } from 'wouter'

export default function UnderConstruction() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllProjects()
      .then((allProjects) => {
        const constructionProjects = allProjects.filter(
          (p: any) =>
            p.category === 'Under Construction' ||
            p.status === 'Under Construction'
        )
        setProjects(constructionProjects)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-h2-muted">Loading projects...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container">
          <p className="text-sm text-h2-muted mb-4">In progress</p>
          <h1 className="font-semibold tracking-[-0.04em] mb-6">
            Under construction
          </h1>
          <p className="text-lg text-h2-body max-w-3xl">
            Follow the journey of our current yacht projects as they transform
            from concept to reality.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding">
        <div className="container">
          {projects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-h2-body">
                No projects under construction yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project: any) => (
                <Link
                  key={project._id}
                  href={`/projects/${project.slug.current}`}
                  className="group block"
                >
                  <div className="aspect-[4/3] bg-h2-light rounded-lg mb-4 img-zoom relative">
                    {project.mainImage && (
                      <img
                        src={urlFor(project.mainImage).width(800).quality(85).url()}
                        alt={project.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                    <div className="absolute top-3 right-3 tag text-xs">
                      In progress
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold tracking-[-0.02em] group-hover:text-h2-cyan transition-colors mb-1">
                    {project.title}
                  </h3>
                  {project.shipyard && (
                    <p className="text-sm text-h2-muted">{project.shipyard}</p>
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
