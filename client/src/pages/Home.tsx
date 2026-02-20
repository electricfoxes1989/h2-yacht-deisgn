import { useState, useEffect, useRef } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import HeroSlideshow from '@/components/HeroSlideshow'
import { getFeaturedProjects, getAllProjects, getLatestNews, urlFor } from '@/lib/sanity'
import { Link } from 'wouter'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  ScrollReveal,
  ParallaxImage,
  StaggerContainer,
  staggerItem,
  LineReveal,
  ScaleReveal,
  AnimatedCounter,
  ParallaxSection,
} from '@/components/animations'
import { motion, useInView } from 'framer-motion'

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const numericValue = parseInt(value)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 2000
          const steps = 60
          const increment = numericValue / steps
          let current = 0
          let step = 0
          const timer = setInterval(() => {
            step++
            current = Math.min(Math.round(increment * step), numericValue)
            setCount(current)
            if (step >= steps) clearInterval(timer)
          }, duration / steps)
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasAnimated, numericValue])

  return (
    <motion.div
      ref={ref}
      className="py-12 md:py-16 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <span className="heading-serif text-4xl md:text-5xl text-white block mb-3">
        {count}{value.includes('+') ? '+' : ''}
      </span>
      <span className="label-text text-white/50">{label}</span>
    </motion.div>
  )
}

const services = [
  {
    number: '01',
    title: 'New Build',
    description:
      'From initial concept to final delivery, we design bespoke superyacht interiors and exteriors. Every project begins with a blank canvas and a conversation \u2014 understanding each owner\u2019s vision, lifestyle and aspirations.',
  },
  {
    number: '02',
    title: 'Refit',
    description:
      'Transforming existing vessels with fresh design concepts, upgraded interiors, and modernised systems. With decades of refit experience, H2 built its reputation as the refit design experts.',
  },
  {
    number: '03',
    title: 'Hotel & Home',
    description:
      'Bringing our yacht design expertise to luxury residential and hospitality projects worldwide, including private residences and boutique hotels.',
  },
  {
    number: '04',
    title: 'Tenders & Toys',
    description:
      'Designing custom tenders and support vessels that complement the mother ship in style and performance, working with leading tender builders.',
  },
]

const heroImages = [
  { id: 'hero-yt', src: '', title: 'H2 Yacht Design', subtitle: 'Showreel', youtubeId: 'EU1rw3MhYkI' },
  { id: 'hero-scout-yt', src: '', title: 'Scout', subtitle: 'Hakvoort', youtubeId: 'edIIraSLFt4', slug: 'scout' },
  { id: 'hero-01', src: '/images/hero/hero-01.jpg', title: 'Arrow', subtitle: 'Feadship' },
  { id: 'hero-lusail-yt', src: '', title: 'Al Lusail', subtitle: 'L\u00fcrssen', youtubeId: 'fmubKGBMYmQ', slug: 'jupiter' },
  { id: 'hero-06', src: '/images/hero/hero-06.jpg', title: '', subtitle: '' },
  { id: 'hero-13', src: '/images/hero/hero-13.jpg', title: 'MY GO', subtitle: 'Turquoise Yachts' },
  { id: 'hero-17', src: '/images/hero/hero-17.jpg', title: '', subtitle: '' },
]

function ConceptsSlideshow({ concepts }: { concepts: any[] }) {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const total = concepts.length

  const goTo = (index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent(index)
    setTimeout(() => setIsTransitioning(false), 600)
  }

  const prev = () => goTo((current - 1 + total) % total)
  const next = () => goTo((current + 1) % total)

  const concept = concepts[current]
  if (!concept) return null

  return (
    <section className="bg-h2-light overflow-hidden">
      <div className="container section-padding">
        {/* Header */}
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="label-text mb-3">Design Exploration</p>
              <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl">
                Concepts
              </h2>
            </div>
            <div className="flex items-center gap-4">
              {/* Slide counter */}
              <span className="label-text text-h2-muted hidden md:block">
                {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
              {/* Nav arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center text-h2-dark hover:bg-h2-dark hover:text-white hover:border-transparent transition-all duration-300"
                  aria-label="Previous concept"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center text-h2-dark hover:bg-h2-dark hover:text-white hover:border-transparent transition-all duration-300"
                  aria-label="Next concept"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Slideshow */}
        <ScaleReveal>
          <Link
            href={`/projects/${concept.slug?.current}`}
            className="group block"
          >
            <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl bg-muted">
              {concepts.map((c: any, i: number) => (
                <div
                  key={c._id}
                  className="absolute inset-0 transition-all duration-700 ease-in-out"
                  style={{
                    opacity: i === current ? 1 : 0,
                    transform: i === current ? 'scale(1)' : 'scale(1.05)',
                  }}
                >
                  {c.mainImage && (
                    <img
                      src={urlFor(c.mainImage)
                        .width(1600)
                        .height(685)
                        .fit('crop')
                        .quality(90)
                        .url()}
                      alt={c.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <div
                  className="transition-all duration-500 ease-out"
                  style={{
                    opacity: isTransitioning ? 0 : 1,
                    transform: isTransitioning ? 'translateY(12px)' : 'translateY(0)',
                  }}
                >
                  <div className="h-px w-12 bg-[var(--h2-cyan)] mb-5" />
                  <h3 className="heading-serif text-2xl md:text-4xl lg:text-5xl text-white mb-2 group-hover:text-white/90 transition-colors">
                    {concept.title}
                  </h3>
                  {concept.length && (
                    <p className="text-sm md:text-base text-white/60">{concept.length}m</p>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </ScaleReveal>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {concepts.map((_: any, i: number) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-8 bg-[var(--h2-cyan)]'
                  : 'w-1.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to concept ${i + 1}`}
            />
          ))}
        </div>

        {/* View all link - mobile */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/projects/category/concepts"
            className="inline-flex items-center gap-2 text-sm text-[var(--h2-cyan)] hover:text-[var(--h2-dark)] transition-colors group"
          >
            View all concepts
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState([])
  const [allProjects, setAllProjects] = useState<any[]>([])
  const [latestNews, setLatestNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getFeaturedProjects(), getAllProjects(), getLatestNews(3)])
      .then(([featured, all, news]) => {
        setFeaturedProjects(featured)
        setAllProjects(all)
        setLatestNews(news)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse label-text text-h2-muted">Loading...</div>
      </div>
    )
  }

  // Filter projects by category
  const newBuildProjects = allProjects
    .filter((p: any) => p.category === 'new-build')
    .slice(0, 4)
  const hotelHomeProjects = allProjects
    .filter((p: any) => p.category === 'hotel-home')
    .slice(0, 4)
  const refitProjects = allProjects
    .filter((p: any) => p.category === 'refit')
    .slice(0, 4)
  const inBuildProjects = allProjects
    .filter((p: any) => p.category === 'in-build')
    .slice(0, 2)
  const conceptProjects = allProjects
    .filter((p: any) => p.category === 'concepts')
    .slice(0, 8)
  const tenderProjects = allProjects
    .filter((p: any) => p.category === 'tenders')
    .slice(0, 4)
  const bespokeProjects = [...hotelHomeProjects, ...tenderProjects].slice(0, 4)

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* ── 1. Hero Showcase ── */}
      <HeroSlideshow
        slides={[
          ...featuredProjects,
          ...heroImages
            .filter((h) => !featuredProjects.some((fp: any) => fp._id === h.id))
            .map((h: any) => ({
              _id: h.id,
              title: h.title,
              slug: { current: h.slug || '' },
              shipyard: h.subtitle,
              imageUrl: h.src || undefined,
              youtubeId: h.youtubeId,
            })),
        ]}
      />

      {/* ── About Section ── */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 items-stretch">
            {/* Left — Image with parallax */}
            <ScaleReveal>
              <div className="relative aspect-[4/5] lg:aspect-auto overflow-hidden rounded-2xl lg:rounded-r-none bg-muted h-full">
                <ParallaxImage
                  src="/images/hero/hero-10.jpg"
                  alt="Superyacht interior by H2 Yacht Design"
                  className="h-full w-full"
                  speed={0.2}
                />
              </div>
            </ScaleReveal>

            {/* Right — Copy */}
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

      {/* ── 2. Exterior Design — 4 projects, 2×2 grid ── */}
      {newBuildProjects.length > 0 && (
        <section className="section-padding">
          <div className="container">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="label-text mb-3">Projects</p>
                  <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl">
                    Exterior Design
                  </h2>
                </div>
                <Link
                  href="/projects/category/exterior"
                  className="hidden md:inline-flex items-center gap-2 text-sm text-[var(--h2-cyan)] hover:text-[var(--h2-dark)] transition-colors group"
                >
                  View all projects
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" staggerDelay={0.12}>
              {newBuildProjects.map((project: any) => (
                <motion.div key={project._id} variants={staggerItem}>
                  <Link
                    href={`/projects/${project.slug.current}`}
                    className="group block"
                  >
                    <div className="img-zoom overflow-hidden bg-muted rounded-2xl aspect-[4/3]">
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
                    <div className="project-card-text mt-5">
                      <div className="accent-line mb-4" />
                      <h3 className="text-lg font-semibold tracking-[-0.02em] text-h2-navy group-hover:text-[var(--h2-cyan)] transition-colors duration-300">
                        {project.title}
                      </h3>
                      {project.shipyard && (
                        <p className="text-sm text-h2-muted mt-1">{project.shipyard}</p>
                      )}
                      {project.excerpt && (
                        <p className="text-sm text-h2-body mt-2 leading-relaxed line-clamp-2">
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

      {/* ── 3. Interiors — 4 projects, cream background ── */}
      {refitProjects.length > 0 && (
        <section className="section-padding bg-h2-cream">
          <div className="container">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="label-text mb-3">Interior Design</p>
                  <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl">
                    Interiors
                  </h2>
                </div>
                <Link
                  href="/projects/category/interiors"
                  className="hidden md:inline-flex items-center gap-2 text-sm text-[var(--h2-cyan)] hover:text-[var(--h2-dark)] transition-colors group"
                >
                  View all interiors
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" staggerDelay={0.12}>
              {refitProjects.map((project: any) => (
                <motion.div key={project._id} variants={staggerItem}>
                  <Link
                    href={`/projects/${project.slug.current}`}
                    className="group block"
                  >
                    <div className="img-zoom overflow-hidden bg-muted rounded-2xl aspect-[4/3]">
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
                    <div className="project-card-text mt-5">
                      <div className="accent-line mb-4" />
                      <h3 className="text-lg font-semibold tracking-[-0.02em] text-h2-navy group-hover:text-[var(--h2-cyan)] transition-colors duration-300">
                        {project.title}
                      </h3>
                      {project.shipyard && (
                        <p className="text-sm text-h2-muted mt-1">{project.shipyard}</p>
                      )}
                      {project.excerpt && (
                        <p className="text-sm text-h2-body mt-2 leading-relaxed line-clamp-2">
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

      {/* ── Stats Bar ── */}
      <section className="bg-[var(--h2-navy)]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {[
              { value: '30+', label: 'Years of Excellence' },
              { value: '200+', label: 'Completed Projects' },
              { value: '20+', label: 'Multi-Disciplinary Designers' },
            ].map((stat) => (
              <AnimatedStat key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. In Build — 2 featured projects, side by side ── */}
      {inBuildProjects.length > 0 && (
        <section className="section-dark section-padding">
          <div className="container">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="label-text mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Currently Under Construction
                  </p>
                  <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl">
                    In Build
                  </h2>
                </div>
                <Link
                  href="/projects/category/in-build"
                  className="hidden md:inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
                >
                  View all
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" staggerDelay={0.15}>
              {inBuildProjects.map((project: any) => (
                <motion.div key={project._id} variants={staggerItem}>
                  <Link
                    href={`/projects/${project.slug.current}`}
                    className="group block"
                  >
                    <div className="img-zoom overflow-hidden bg-white/5 rounded-2xl aspect-[4/3]">
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
                    <div className="project-card-text mt-5">
                      <div className="accent-line mb-4" />
                      <h3 className="text-lg font-semibold tracking-[-0.02em] text-white group-hover:text-white/80 transition-colors duration-300">
                        {project.title}
                      </h3>
                      {project.shipyard && (
                        <p className="text-sm text-white/50 mt-1">{project.shipyard}</p>
                      )}
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

      {/* ── 5. Concepts — Interactive Slideshow ── */}
      {conceptProjects.length > 0 && (
        <ConceptsSlideshow concepts={conceptProjects} />
      )}

      {/* ── 6. Bespoke Projects — cyan brand section ── */}
      {bespokeProjects.length > 0 && (
        <section className="section-padding" style={{ backgroundColor: 'var(--h2-cyan)', color: 'white' }}>
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
                    <div className="img-zoom overflow-hidden bg-white/10 rounded-2xl aspect-[4/3]">
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

      {/* ── 7. Services ── */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <ScrollReveal direction="left">
              <div>
                <p className="label-text mb-4">What We Do</p>
                <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl mb-6">
                  Our Services
                </h2>
                <p className="text-h2-body leading-relaxed max-w-lg">
                  From first sketch to final delivery, H2 provides a complete
                  design service for superyachts, tenders, and luxury residences.
                </p>
              </div>
            </ScrollReveal>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-10" staggerDelay={0.1}>
              {services.map((service) => (
                <motion.div key={service.number} variants={staggerItem}>
                  <span className="heading-serif text-3xl md:text-4xl block mb-3 text-[var(--h2-cyan)]/30">
                    {service.number}
                  </span>
                  <h3 className="text-lg font-medium mb-2 tracking-[-0.02em] text-h2-dark">
                    {service.title}
                  </h3>
                  <p className="text-sm text-h2-body leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ── 8. Quote with parallax background ── */}
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

      {/* ── 9. Offices ── */}
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
            {/* London */}
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
                  <a
                    href="tel:+442087885008"
                    className="hover:text-h2-dark transition-colors"
                  >
                    +44 (0)208 788 5008
                  </a>
                </p>
                <p className="text-h2-body mt-1">
                  <a
                    href="mailto:info@h2yachtdesign.com"
                    className="hover:text-h2-dark transition-colors"
                  >
                    info@h2yachtdesign.com
                  </a>
                </p>
              </div>
            </ScrollReveal>

            {/* Nice */}
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
                  <a
                    href="tel:+33422328906"
                    className="hover:text-h2-dark transition-colors"
                  >
                    +33 422 328 906
                  </a>
                </p>
                <p className="text-h2-body mt-1">
                  <a
                    href="mailto:info@h2yachtdesign.com"
                    className="hover:text-h2-dark transition-colors"
                  >
                    info@h2yachtdesign.com
                  </a>
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 10. Latest News ── */}
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

      {/* ── 11. CTA ── */}
      <section className="section-dark section-padding">
        <div className="container">
          <ScrollReveal direction="up">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl mb-5">Begin Your Journey</h2>
              <p className="text-lg leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Whether you&rsquo;re planning a new build, a comprehensive refit,
                or a luxury residence, our team is ready to bring your vision to
                life.
              </p>
              <Link href="/contact" className="btn-outline-light">
                Get in Touch
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}
