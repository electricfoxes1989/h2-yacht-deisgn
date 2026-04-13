'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { urlFor } from '@/lib/sanity'
import { ScrollReveal, ScaleReveal } from '@/components/animations'

interface ConceptsCarouselProps {
  projects: any[]
}

export default function ConceptsCarousel({ projects }: ConceptsCarouselProps) {
  const concepts = projects.filter((p: any) => p.category === 'concepts').slice(0, 8)
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const total = concepts.length

  // Auto-advance
  useEffect(() => {
    if (total <= 1) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total)
    }, 6000)
    return () => clearInterval(timer)
  }, [total])

  if (concepts.length === 0) return null

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
              <span className="label-text text-h2-muted hidden md:block">
                {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
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
