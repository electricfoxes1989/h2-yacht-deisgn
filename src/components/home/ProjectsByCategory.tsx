'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { urlFor } from '@/lib/sanity'
import { motion } from 'framer-motion'
import {
  ScrollReveal,
  ParallaxImage,
  StaggerContainer,
  staggerItem,
  ScaleReveal,
  LineReveal,
  ParallaxSection,
} from '@/components/animations'

interface ProjectsByCategoryProps {
  projects: any[]
  latestNews: any[]
  latestProjectsTagged?: any[]
}

function ProjectGrid({
  projects,
  label,
  title,
  href,
  linkText,
  dark = false,
  style,
}: {
  projects: any[]
  label: string
  title: string
  href: string
  linkText: string
  dark?: boolean
  style?: React.CSSProperties
}) {
  if (projects.length === 0) return null

  const textColor = dark ? 'text-white' : 'text-h2-navy'
  const hoverColor = dark ? 'group-hover:text-white/80' : 'group-hover:text-[var(--h2-cyan)]'
  const subtitleColor = dark ? 'text-white/50' : 'text-h2-muted'
  const excerptColor = dark ? 'text-white/40' : 'text-h2-body'
  const cardBg = dark ? 'bg-white/5' : 'bg-muted'
  const linkClass = dark
    ? 'hidden md:inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group'
    : 'hidden md:inline-flex items-center gap-2 text-sm text-[var(--h2-cyan)] hover:text-[var(--h2-dark)] transition-colors group'
  const labelColor = dark ? { color: 'rgba(255,255,255,0.5)' } : undefined

  return (
    <section className={`section-padding ${dark ? 'section-dark' : ''}`} style={style}>
      <div className="container">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="label-text mb-3" style={labelColor}>{label}</p>
              <h2 className={`heading-serif text-3xl md:text-4xl lg:text-5xl ${dark ? 'text-white' : ''}`}>
                {title}
              </h2>
            </div>
            <Link href={href} className={linkClass}>
              {linkText}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" staggerDelay={0.12}>
          {projects.map((project: any) => (
            <motion.div key={project._id} variants={staggerItem}>
              <Link
                href={`/projects/${project.slug.current}`}
                className="group block"
              >
                <div className={`img-zoom overflow-hidden ${cardBg} rounded-2xl aspect-[16/9]`}>
                  {project.mainImage && (
                    <img
                      src={urlFor(project.mainImage)
                        .width(900)
                        .height(506)
                        .fit('crop')
                        .quality(85)
                        .url()}
                      alt={project.title}
                      className="w-full h-full object-cover block"
                    />
                  )}
                </div>
                <div className="project-card-text mt-5">
                  <div className="accent-line mb-4" />
                  <h3 className={`text-lg font-semibold tracking-[-0.02em] ${textColor} ${hoverColor} transition-colors duration-300`}>
                    {project.title}
                  </h3>
                  {project.shipyard && (
                    <p className={`text-sm ${subtitleColor} mt-1`}>{project.shipyard}</p>
                  )}
                  {project.excerpt && (
                    <p className={`text-sm ${excerptColor} mt-2 leading-relaxed line-clamp-2`}>
                      {project.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

const categoryLabels: Record<string, string> = {
  'new-build': 'New Build',
  'in-build': 'In Build',
  'refit': 'Refit',
  'concepts': 'Concept',
  'hotel-home': 'Hotel & Home',
  'tenders': 'Tenders',
}

export default function ProjectsByCategory({ projects, latestNews, latestProjectsTagged = [] }: ProjectsByCategoryProps) {
  // Use Sanity-tagged projects if any exist, otherwise fall back to latest 8 with images
  const latestProjects = latestProjectsTagged.length > 0
    ? latestProjectsTagged
    : projects.filter((p: any) => p.mainImage).slice(0, 8)
  const newBuildProjects = projects.filter((p: any) => p.category === 'new-build').slice(0, 4)
  const refitProjects = projects.filter((p: any) => p.category === 'refit').slice(0, 4)
  const inBuildProjects = projects.filter((p: any) => p.category === 'in-build').slice(0, 2)
  const hotelHomeProjects = projects.filter((p: any) => p.category === 'hotel-home' && p.mainImage).slice(0, 4)
  const tenderProjects = projects.filter((p: any) => p.category === 'tenders' && p.mainImage).slice(0, 4)
  const bespokeProjects = [...hotelHomeProjects, ...tenderProjects].slice(0, 4)

  return (
    <>
      {/* About Section */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 items-stretch">
            <ScaleReveal>
              <div className="relative aspect-[4/5] lg:aspect-auto overflow-hidden rounded-2xl lg:rounded-r-none bg-muted h-full">
                <ParallaxImage
                  src="/images/jonny-horsfield-model.jpg"
                  alt="Jonny Horsfield -- Owner & Creative Director of H2 Yacht Design"
                  className="h-full w-full"
                  speed={0.2}
                />
              </div>
            </ScaleReveal>

            <div className="flex flex-col justify-center py-12 lg:py-20 lg:pl-12">
              <ScrollReveal direction="right" delay={0.1}>
                <span className="label-text inline-block mb-6 text-h2-muted tracking-[0.2em]">
                  Est. 1994
                </span>
              </ScrollReveal>
              <LineReveal className="mb-8" delay={0.2} />
              <ScrollReveal direction="up" delay={0.3}>
                <div className="space-y-6 text-base leading-[1.8] text-h2-body">
                  <p>
                    Jonny Horsfield established the H2 design studio in London during 1994. In the early
                    years of the business they worked almost exclusively on yacht refit projects which gave
                    them a broad experience of working to strict time frames in different design styles with
                    varying budgets.
                  </p>
                  <p>
                    During this period H2 built an enviable reputation amongst the yacht community for being
                    the refit design experts. Word spread quickly, and before long the studio was being
                    approached for new-build interior and exterior commissions alike.
                  </p>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-sm text-[var(--h2-cyan)] hover:text-[var(--h2-dark)] transition-colors group mt-2"
                  >
                    Learn more about H2
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Projects — horizontal scroll row */}
      {latestProjects.length > 0 && (
        <section className="section-padding bg-white overflow-hidden">
          <div className="container">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="label-text mb-3">Latest</p>
                  <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl">Latest Projects</h2>
                </div>
                <Link
                  href="/projects"
                  className="hidden md:inline-flex items-center gap-2 text-sm text-[var(--h2-cyan)] hover:text-[var(--h2-dark)] transition-colors group"
                >
                  View all
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="pl-6 sm:pl-10 lg:pl-[max(2.5rem,calc((100vw-1440px)/2+4rem))]">
            <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
              {latestProjects.map((project: any) => (
                <Link
                  key={project._id}
                  href={`/projects/${project.slug.current}`}
                  className="group shrink-0 w-[320px] md:w-[380px] snap-start"
                >
                  <div className="img-zoom overflow-hidden bg-muted rounded-2xl aspect-[4/3]">
                    {project.mainImage && (
                      <img
                        src={urlFor(project.mainImage)
                          .width(760)
                          .height(570)
                          .fit('crop')
                          .quality(85)
                          .url()}
                        alt={project.title}
                        className="w-full h-full object-cover block"
                      />
                    )}
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[var(--h2-cyan)]">
                        {categoryLabels[project.category] || project.category}
                      </span>
                      {project.year && (
                        <>
                          <span className="text-h2-muted text-xs">&middot;</span>
                          <span className="text-[0.65rem] text-h2-muted">{project.year}</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-base font-semibold tracking-[-0.02em] text-h2-navy group-hover:text-[var(--h2-cyan)] transition-colors duration-300">
                      {project.title}
                    </h3>
                    {project.shipyard && (
                      <p className="text-sm text-h2-muted mt-0.5">{project.shipyard}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Build */}
      <ProjectGrid
        projects={newBuildProjects}
        label="Projects"
        title="New Build"
        href="/projects/category/new-build"
        linkText="View all projects"
      />

      {/* Refit */}
      <ProjectGrid
        projects={refitProjects}
        label="Refit Design"
        title="Refit"
        href="/projects/category/refit"
        linkText="View all refits"
      />

      {/* In Build */}
      <ProjectGrid
        projects={inBuildProjects}
        label="Currently Under Construction"
        title="In Build"
        href="/projects/category/in-build"
        linkText="View all"
        dark
      />

      {/* Bespoke Projects */}
      {bespokeProjects.length > 0 && (
        <section className="section-padding" style={{ backgroundColor: 'var(--h2-navy)', color: 'white' }}>
          <div className="container">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="label-text mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>Hotel &amp; Home &middot; Tenders</p>
                  <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl text-white">
                    Bespoke Projects
                  </h2>
                </div>
                <Link
                  href="/projects/category/bespoke"
                  className="hidden md:inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors group"
                >
                  View all
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" staggerDelay={0.12}>
              {bespokeProjects.map((project: any) => (
                <motion.div key={project._id} variants={staggerItem}>
                  <Link
                    href={`/projects/${project.slug.current}`}
                    className="group block"
                  >
                    <div className="img-zoom overflow-hidden bg-white/10 rounded-2xl aspect-[16/9]">
                      {project.mainImage && (
                        <img
                          src={urlFor(project.mainImage)
                            .width(900)
                            .height(506)
                            .fit('crop')
                            .quality(85)
                            .url()}
                          alt={project.title}
                          className="w-full h-full object-cover block"
                        />
                      )}
                    </div>
                    <div className="project-card-text mt-5">
                      <div className="accent-line mb-4" />
                      <h3 className="text-lg font-semibold tracking-[-0.02em] text-white group-hover:text-white/80 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm text-white/50 mt-1">
                        {project.category === 'hotel-home' ? 'Hotel & Home' : project.category === 'tenders' ? 'Tenders' : project.shipyard}
                      </p>
                      {project.excerpt && (
                        <p className="text-sm text-white/40 mt-2 leading-relaxed line-clamp-2">
                          {project.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Quote Section */}
      <section className="section-padding bg-h2-cream relative overflow-hidden">
        <ParallaxSection speed={0.1}>
          <div className="container">
            <ScrollReveal direction="none">
              <div className="max-w-4xl mx-auto text-center">
                <span
                  className="font-serif block text-[8rem] md:text-[10rem] leading-none select-none"
                  style={{ color: 'rgba(19, 167, 227, 0.15)' }}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <blockquote className="heading-serif text-3xl md:text-4xl lg:text-5xl -mt-16 md:-mt-20 mb-10">
                  H2 pride ourselves in not having a &lsquo;house style&rsquo;
                </blockquote>
                <div>
                  <p className="text-sm font-medium tracking-wide uppercase text-h2-dark">
                    Jonny Horsfield
                  </p>
                  <p className="text-sm text-h2-muted mt-1">
                    Owner &amp; Creative Director
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </ParallaxSection>
      </section>

      {/* Offices */}
      <section className="section-padding bg-h2-light">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="label-text mb-4">Our Studios</p>
              <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl text-h2-dark">
                London &amp; Nice
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <ScrollReveal direction="left" delay={0.1}>
              <div>
                <div className="overflow-hidden rounded-2xl mb-8 bg-muted">
                  <img
                    src="/images/h2-studio.jpg"
                    alt="H2 Yacht Design London Studio"
                    className="w-full h-auto block"
                  />
                </div>
                <h3 className="text-xl font-medium tracking-[-0.03em] text-h2-dark mb-2">
                  London
                </h3>
                <div className="h-px w-10 bg-[var(--h2-cyan)] mb-6" />
                <address className="not-italic text-h2-body leading-[1.8] space-y-0.5 mb-4">
                  <p>8 Princeton Court</p>
                  <p>53/55 Felsham Road</p>
                  <p>Putney, SW15 1AZ</p>
                  <p>London, UK</p>
                </address>
                <p className="text-h2-body">
                  <a href="tel:+442087885008" className="hover:text-h2-dark transition-colors">
                    +44 (0)208 788 5008
                  </a>
                </p>
                <p className="text-h2-body mt-1">
                  <a href="mailto:info@h2yachtdesign.com" className="hover:text-h2-dark transition-colors">
                    info@h2yachtdesign.com
                  </a>
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div>
                <div className="overflow-hidden rounded-2xl mb-8 bg-[var(--h2-navy)] flex items-center justify-center" style={{ aspectRatio: '16/10' }}>
                  <div className="text-center px-8">
                    <p className="heading-serif text-3xl md:text-4xl text-white mb-2">Nice</p>
                    <p className="text-sm text-white/50 uppercase tracking-[0.15em]">French Riviera</p>
                  </div>
                </div>
                <h3 className="text-xl font-medium tracking-[-0.03em] text-h2-dark mb-2">
                  Nice
                </h3>
                <div className="h-px w-10 bg-[var(--h2-cyan)] mb-6" />
                <address className="not-italic text-h2-body leading-[1.8] space-y-0.5 mb-4">
                  <p>4 Palais Jolienne</p>
                  <p>43 Boulevard Gambetta</p>
                  <p>5th Floor, 06000</p>
                  <p>Nice, France</p>
                </address>
                <p className="text-h2-body">
                  <a href="tel:+33422328906" className="hover:text-h2-dark transition-colors">
                    +33 422 328 906
                  </a>
                </p>
                <p className="text-h2-body mt-1">
                  <a href="mailto:info@h2yachtdesign.com" className="hover:text-h2-dark transition-colors">
                    info@h2yachtdesign.com
                  </a>
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Latest News */}
      {latestNews.length > 0 && (
        <section className="section-padding">
          <div className="container">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="label-text mb-3">Press &amp; Features</p>
                  <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl">Latest News</h2>
                </div>
                <Link
                  href="/news"
                  className="hidden md:inline-flex items-center gap-2 text-sm text-[var(--h2-cyan)] hover:text-[var(--h2-dark)] transition-colors group"
                >
                  All articles
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.12}>
              {latestNews.map((article: any) => (
                <motion.div key={article._id} variants={staggerItem}>
                  <Link
                    href={`/news/${article.slug.current}`}
                    className="group block"
                  >
                    <div className="img-zoom aspect-[4/3] overflow-hidden mb-4 bg-muted rounded-xl">
                      {article.mainImage && (
                        <img
                          src={urlFor(article.mainImage)
                            .width(600)
                            .height(450)
                            .url()}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <p className="text-sm text-h2-muted mb-2">
                      {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                    <h3 className="text-lg font-medium tracking-[-0.02em] group-hover:text-h2-cyan transition-colors">
                      {article.title}
                    </h3>
                  </Link>
                </motion.div>
              ))}
            </StaggerContainer>

            <div className="mt-12 md:hidden text-center">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-sm text-[var(--h2-cyan)] hover:text-[var(--h2-dark)] transition-colors group"
              >
                All articles
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
