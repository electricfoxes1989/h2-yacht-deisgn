import { useEffect, useState, useRef } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getProjectBySlug, getAllProjects, urlFor } from '@/lib/sanity'
import { useRoute, Link } from 'wouter'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const categoryLabels: Record<string, string> = {
  'new-build': 'New Build',
  'in-build': 'In Build',
  refit: 'Refit',
  concepts: 'Concepts',
  'hotel-home': 'Hotel & Home',
  tenders: 'Tenders & Toys',
}

function FadeInSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  )
}

export default function ProjectDetail() {
  const [, params] = useRoute('/projects/:slug')
  const [project, setProject] = useState<any>(null)
  const [relatedProjects, setRelatedProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params?.slug) {
      setLoading(true)
      Promise.all([getProjectBySlug(params.slug), getAllProjects()])
        .then(([projectData, allProjects]) => {
          setProject(projectData)
          const related = allProjects
            .filter(
              (p: any) =>
                p.category === projectData?.category &&
                p._id !== projectData?._id,
            )
            .slice(0, 3)
          setRelatedProjects(related)
        })
        .finally(() => setLoading(false))
    }
  }, [params?.slug])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [params?.slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse label-text text-h2-muted">Loading...</div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-8">
        <h1 className="heading-serif text-4xl md:text-5xl text-h2-navy">
          Project not found
        </h1>
        <Link href="/projects">
          <button className="btn-outline">Back to projects</button>
        </Link>
      </div>
    )
  }

  const galleryImages = project.gallery || []
  const specs = project.specifications || {}
  const categoryLabel = categoryLabels[project.category] || project.category

  // Build specs list
  const specItems: { label: string; value: string }[] = []
  if (project.length) specItems.push({ label: 'Length', value: project.length })
  if (specs.loa) specItems.push({ label: 'LOA', value: specs.loa })
  if (specs.beam) specItems.push({ label: 'Beam', value: specs.beam })
  if (specs.draft) specItems.push({ label: 'Draft', value: specs.draft })
  if (specs.displacement) specItems.push({ label: 'Displacement', value: specs.displacement })
  if (specs.speed) specItems.push({ label: 'Max Speed', value: specs.speed })
  if (specs.range) specItems.push({ label: 'Range', value: specs.range })
  if (specs.guests) specItems.push({ label: 'Guests', value: specs.guests })
  if (specs.crew) specItems.push({ label: 'Crew', value: specs.crew })

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* ── Hero ── */}
      {project.mainImage && (
        <section className="relative h-[75vh] md:h-[85vh] w-full overflow-hidden">
          <img
            src={urlFor(project.mainImage).width(2400).quality(90).url()}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

          {/* Back link */}
          <div className="absolute top-28 left-0 z-20 container">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors tracking-wide"
            >
              <ArrowLeft className="h-4 w-4" />
              All Projects
            </Link>
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 pb-16 md:pb-20">
            <div className="container">
              <span className="label-text text-white/50 block mb-4 tracking-[0.2em]">
                {categoryLabel}
              </span>
              <h1 className="heading-serif text-4xl md:text-6xl lg:text-7xl text-white mb-4">
                {project.title}
              </h1>
              {project.shipyard && (
                <p className="text-lg text-white/60 tracking-wide">
                  {project.shipyard}{project.year ? ` \u2014 ${project.year}` : ''}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Project Overview ── */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
            {/* Left — Description (3 cols) */}
            <div className="lg:col-span-3">
              <FadeInSection>
                {project.excerpt && (
                  <p className="heading-serif text-2xl md:text-3xl text-h2-dark leading-[1.4] mb-10">
                    {project.excerpt}
                  </p>
                )}
                {project.description && (
                  <div className="space-y-6">
                    {project.description.map((block: any, index: number) => {
                      if (block._type === 'block') {
                        const style = block.style || 'normal'
                        const children = block.children?.map((child: any, i: number) => {
                          let text: React.ReactNode = child.text
                          if (child.marks?.includes('strong')) text = <strong key={i}>{text}</strong>
                          if (child.marks?.includes('em')) text = <em key={i}>{text}</em>
                          return text
                        })
                        if (!children?.length || (children.length === 1 && !children[0])) return null

                        if (style === 'h2')
                          return (
                            <h2 key={index} className="heading-serif text-2xl md:text-3xl text-h2-dark mt-8 mb-4">
                              {children}
                            </h2>
                          )
                        if (style === 'h3')
                          return (
                            <h3 key={index} className="text-xl font-medium text-h2-dark mt-6 mb-3 tracking-[-0.02em]">
                              {children}
                            </h3>
                          )
                        if (style === 'blockquote')
                          return (
                            <blockquote
                              key={index}
                              className="border-l-2 border-[var(--h2-cyan)] pl-6 my-8 heading-serif text-xl md:text-2xl text-h2-dark leading-[1.4]"
                            >
                              {children}
                            </blockquote>
                          )
                        return (
                          <p key={index} className="text-base md:text-lg text-h2-body leading-[1.85] tracking-[-0.01em]">
                            {children}
                          </p>
                        )
                      }
                      if (block._type === 'inlineImage' && block.asset) {
                        return (
                          <figure key={index} className="my-10">
                            <img
                              src={urlFor(block).width(1200).quality(90).url()}
                              alt={block.alt || project.title}
                              className="w-full rounded-xl"
                            />
                            {block.caption && (
                              <figcaption className="text-sm text-h2-muted mt-3">{block.caption}</figcaption>
                            )}
                          </figure>
                        )
                      }
                      if (block._type === 'quote' || block._type === 'pullQuote') {
                        return (
                          <blockquote
                            key={index}
                            className="my-12 border-l-2 border-[var(--h2-cyan)] pl-6"
                          >
                            <p className="heading-serif text-xl md:text-2xl text-h2-dark leading-[1.4]">
                              {block.text || block.quote}
                            </p>
                            {block.attribution && (
                              <cite className="block mt-3 text-sm text-h2-muted not-italic">
                                {block.attribution}
                              </cite>
                            )}
                          </blockquote>
                        )
                      }
                      return null
                    })}
                  </div>
                )}
              </FadeInSection>
            </div>

            {/* Right — Specs sidebar (2 cols) */}
            <div className="lg:col-span-2">
              <FadeInSection>
                <div className="lg:sticky lg:top-32">
                  {/* Key details card */}
                  <div className="bg-h2-light rounded-2xl p-8 md:p-10">
                    <h3 className="label-text mb-8 text-h2-muted tracking-[0.2em]">
                      Project Details
                    </h3>

                    <div className="space-y-0 divide-y divide-[var(--h2-border)]">
                      {project.shipyard && (
                        <div className="py-4 first:pt-0">
                          <span className="text-xs uppercase tracking-widest text-h2-muted block mb-1">
                            Shipyard
                          </span>
                          <span className="text-base font-medium text-h2-dark">
                            {project.shipyard}
                          </span>
                        </div>
                      )}
                      {project.year && (
                        <div className="py-4">
                          <span className="text-xs uppercase tracking-widest text-h2-muted block mb-1">
                            Year
                          </span>
                          <span className="text-base font-medium text-h2-dark">
                            {project.year}
                          </span>
                        </div>
                      )}
                      {categoryLabel && (
                        <div className="py-4">
                          <span className="text-xs uppercase tracking-widest text-h2-muted block mb-1">
                            Category
                          </span>
                          <span className="text-base font-medium text-h2-dark">
                            {categoryLabel}
                          </span>
                        </div>
                      )}
                      {project.status && (
                        <div className="py-4">
                          <span className="text-xs uppercase tracking-widest text-h2-muted block mb-1">
                            Status
                          </span>
                          <span className="text-base font-medium text-h2-dark capitalize">
                            {project.status.replace('-', ' ')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Technical specifications */}
                    {specItems.length > 0 && (
                      <>
                        <div className="h-px bg-[var(--h2-border)] my-6" />
                        <h3 className="label-text mb-6 text-h2-muted tracking-[0.2em]">
                          Specifications
                        </h3>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                          {specItems.map((spec) => (
                            <div key={spec.label}>
                              <span className="text-xs uppercase tracking-widest text-h2-muted block mb-1">
                                {spec.label}
                              </span>
                              <span className="text-base font-medium text-h2-dark">
                                {spec.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* CTA below specs */}
                  <div className="mt-6">
                    <Link
                      href="/contact"
                      className="btn-outline w-full justify-center"
                    >
                      Enquire About This Project
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      {galleryImages.length > 0 && (
        <section className="pb-20 md:pb-28">
          <div className="container">
            <FadeInSection>
              <div className="mb-12">
                <span className="label-text text-h2-muted tracking-[0.2em]">Gallery</span>
              </div>
            </FadeInSection>
          </div>

          {/* Alternating gallery layout */}
          <div className="flex flex-col gap-4">
            {galleryImages.map((image: any, index: number) => {
              // Alternate between full-width and side-by-side pairs
              const isFullWidth = index % 3 === 0
              const isPairFirst = index % 3 === 1
              const isPairSecond = index % 3 === 2

              if (isPairSecond) return null // handled by pair first

              if (isFullWidth) {
                return (
                  <FadeInSection key={index}>
                    <div className="container">
                      <div className="overflow-hidden rounded-xl">
                        <img
                          src={urlFor(image).width(2400).quality(90).url()}
                          alt={image.alt || `${project.title} - ${index + 1}`}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </FadeInSection>
                )
              }

              if (isPairFirst) {
                const nextImage = galleryImages[index + 1]
                return (
                  <FadeInSection key={index}>
                    <div className="container">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="overflow-hidden rounded-xl">
                          <img
                            src={urlFor(image).width(1200).quality(90).url()}
                            alt={image.alt || `${project.title} - ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {nextImage ? (
                          <div className="overflow-hidden rounded-xl">
                            <img
                              src={urlFor(nextImage).width(1200).quality(90).url()}
                              alt={nextImage.alt || `${project.title} - ${index + 2}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div />
                        )}
                      </div>
                    </div>
                  </FadeInSection>
                )
              }

              return null
            })}
          </div>
        </section>
      )}

      {/* ── Related Projects ── */}
      {relatedProjects.length > 0 && (
        <section className="section-padding bg-h2-light">
          <div className="container">
            <FadeInSection>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <span className="label-text block mb-3 text-h2-muted tracking-[0.2em]">
                    Explore More
                  </span>
                  <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl text-h2-dark">
                    Related Projects
                  </h2>
                </div>
                <Link
                  href="/projects"
                  className="hidden md:inline-flex items-center gap-2 text-sm text-[var(--h2-cyan)] hover:text-[var(--h2-dark)] transition-colors group"
                >
                  View all projects
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rp: any, i: number) => (
                <FadeInSection key={rp._id} className={`delay-${i * 100}`}>
                  <Link
                    href={`/projects/${rp.slug?.current}`}
                    className="group block"
                  >
                    <div className="img-zoom overflow-hidden bg-muted rounded-xl">
                      {rp.mainImage && (
                        <img
                          src={urlFor(rp.mainImage).width(800).quality(85).url()}
                          alt={rp.title}
                          className="w-full h-auto block"
                        />
                      )}
                    </div>
                    <div className="project-card-text mt-4">
                      <div className="accent-line mb-3" />
                      <h3 className="text-base font-semibold tracking-[-0.02em] text-h2-navy group-hover:text-[var(--h2-cyan)] transition-colors duration-300">
                        {rp.title}
                      </h3>
                      {rp.shipyard && (
                        <p className="text-sm text-h2-muted mt-1">{rp.shipyard}</p>
                      )}
                    </div>
                  </Link>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="section-dark section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="label-text text-white/40 block mb-5 tracking-[0.2em]">
              Start a Conversation
            </span>
            <h2 className="heading-serif text-3xl md:text-5xl lg:text-6xl text-white mb-6">
              Ready to start your project?
            </h2>
            <p className="text-base text-white/60 leading-relaxed tracking-[-0.01em] mb-10 max-w-xl mx-auto">
              Let&rsquo;s discuss how we can bring your vision to life with exceptional design and
              craftsmanship.
            </p>
            <Link href="/contact" className="btn-outline-light">
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
