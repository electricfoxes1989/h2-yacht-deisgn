'use client'

import Link from 'next/link'
import ProjectImage from '@/components/ProjectImage'
import {
  ScrollReveal,
  HeroTextReveal,
  StaggerContainer,
  staggerItem,
} from '@/components/animations'
import { motion } from 'framer-motion'

interface CategoryPageLayoutProps {
  projects: any[]
  title: string
  subtitle: string
  description: string
}

export default function CategoryPageLayout({
  projects,
  title,
  subtitle,
  description,
}: CategoryPageLayoutProps) {
  return (
    <>
      {/* Hero */}
      <section className="section-dark pt-40 pb-20">
        <div className="container">
          <HeroTextReveal delay={0.1}>
            <p className="label-text mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {subtitle}
            </p>
          </HeroTextReveal>
          <HeroTextReveal delay={0.25}>
            <h1 className="heading-serif text-5xl md:text-6xl lg:text-7xl mb-6">
              {title}
            </h1>
          </HeroTextReveal>
          <HeroTextReveal delay={0.4}>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {description}
            </p>
          </HeroTextReveal>
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
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14" staggerDelay={0.1}>
              {projects.map((project: any) => (
                <motion.div key={project._id} variants={staggerItem}>
                  <Link
                    href={`/projects/${project.slug?.current}`}
                    className="group block"
                  >
                    {/* Image */}
                    <div className="img-zoom bg-h2-light overflow-hidden rounded-xl aspect-[16/9]">
                      <ProjectImage
                        mainImage={project.mainImage}
                        imageNote={project.imageNote}
                        isConfidential={project.isConfidential}
                        title={project.title}
                        category={project.category}
                      />
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
                      {project.excerpt && (
                        <p className="text-sm text-h2-body mt-3 leading-relaxed line-clamp-2">
                          {project.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark section-padding">
        <div className="container text-center">
          <ScrollReveal>
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
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
