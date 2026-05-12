'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Slide {
  src: string
  caption: string
}

interface TeamSlideshowProps {
  slides: Slide[]
  autoAdvance?: number // ms between slides, 0 to disable
}

export default function TeamSlideshow({
  slides,
  autoAdvance = 6000,
}: TeamSlideshowProps) {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return
      setIsAnimating(true)
      setCurrent(((index % slides.length) + slides.length) % slides.length)
      setTimeout(() => setIsAnimating(false), 700)
    },
    [isAnimating, slides.length]
  )

  const next = useCallback(() => goTo(current + 1), [goTo, current])
  const prev = useCallback(() => goTo(current - 1), [goTo, current])

  useEffect(() => {
    if (!autoAdvance) return
    const t = setTimeout(next, autoAdvance)
    return () => clearTimeout(t)
  }, [current, autoAdvance, next])

  if (slides.length === 0) return null

  return (
    <figure>
      <div className="relative img-zoom overflow-hidden rounded-2xl aspect-[16/9] bg-h2-light">
        {slides.map((slide, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.caption}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out"
            style={{ opacity: i === current ? 1 : 0 }}
          />
        ))}

        {slides.length > 1 && (
          <>
            {/* Prev */}
            <button
              type="button"
              onClick={prev}
              disabled={isAnimating}
              aria-label="Previous slide"
              className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-h2-navy flex items-center justify-center transition-all duration-300 disabled:opacity-50 backdrop-blur"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {/* Next */}
            <button
              type="button"
              onClick={next}
              disabled={isAnimating}
              aria-label="Next slide"
              className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-h2-navy flex items-center justify-center transition-all duration-300 disabled:opacity-50 backdrop-blur"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? 28 : 8,
                    backgroundColor:
                      i === current ? 'var(--h2-cyan)' : 'rgba(255,255,255,0.6)',
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Caption with cyan hairline */}
      <figcaption className="mt-4 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.2em] text-h2-muted min-h-[1rem]">
        <span
          className="block w-6 h-px flex-shrink-0"
          style={{ backgroundColor: 'var(--h2-cyan)' }}
        />
        <span
          key={current}
          className="transition-opacity duration-500 animate-fade-in"
        >
          {slides[current].caption}
        </span>
      </figcaption>
    </figure>
  )
}
