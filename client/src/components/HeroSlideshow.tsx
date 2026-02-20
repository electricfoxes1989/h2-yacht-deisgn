import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { urlFor } from '@/lib/sanity'
import { Link } from 'wouter'

interface Slide {
  _id: string
  title: string
  slug: { current: string }
  shipyard?: string
  mainImage?: any
  imageUrl?: string
  videoUrl?: string
  youtubeId?: string
}

interface HeroSlideshowProps {
  slides: Slide[]
}

export default function HeroSlideshow({ slides }: HeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [previousIndex, setPreviousIndex] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  // Track which YouTube slides have been "activated" (lazy load)
  const [loadedYT, setLoadedYT] = useState<Set<number>>(new Set([0]))
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const SLIDE_DURATION = 7000

  const goTo = useCallback(
    (next: number) => {
      if (isAnimating || next === currentIndex) return
      setIsAnimating(true)
      setPreviousIndex(currentIndex)
      setCurrentIndex(next)
      // Mark the next slide's YouTube as loaded
      setLoadedYT((prev) => {
        const copy = new Set(prev)
        copy.add(next)
        return copy
      })
      setTimeout(() => {
        setPreviousIndex(null)
        setIsAnimating(false)
      }, 1200)
    },
    [currentIndex, isAnimating],
  )

  const goToNext = useCallback(() => {
    goTo((currentIndex + 1) % slides.length)
  }, [currentIndex, slides.length, goTo])

  const goToPrevious = useCallback(() => {
    goTo((currentIndex - 1 + slides.length) % slides.length)
  }, [currentIndex, slides.length, goTo])

  // Auto-advance (longer for YouTube videos)
  useEffect(() => {
    if (slides.length <= 1) return
    const duration = slides[currentIndex]?.youtubeId ? 15000 : SLIDE_DURATION
    timerRef.current = setTimeout(goToNext, duration)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [currentIndex, slides.length, goToNext])

  // Preload next slide's YouTube iframe 2s before transition
  useEffect(() => {
    if (slides.length <= 1) return
    const nextIndex = (currentIndex + 1) % slides.length
    const nextSlide = slides[nextIndex]
    if (nextSlide?.youtubeId && !loadedYT.has(nextIndex)) {
      const preloadDelay = slides[currentIndex]?.youtubeId ? 12000 : 4000
      const timer = setTimeout(() => {
        setLoadedYT((prev) => {
          const copy = new Set(prev)
          copy.add(nextIndex)
          return copy
        })
      }, preloadDelay)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, slides, loadedYT])

  if (!slides || slides.length === 0) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <p className="text-white/50">No featured projects available</p>
      </div>
    )
  }

  const padIndex = (i: number) => String(i + 1).padStart(2, '0')

  const renderSlide = (slide: Slide, index: number, isCurrent: boolean) => {
    const imageUrl = slide.imageUrl
      ? slide.imageUrl
      : slide.mainImage
        ? urlFor(slide.mainImage).width(1920).quality(90).url()
        : undefined

    const shouldLoadYT = slide.youtubeId && loadedYT.has(index)

    return (
      <div
        key={slide._id + '-' + index}
        className="absolute inset-0"
        style={{
          opacity: isCurrent ? 1 : 0,
          transition: 'opacity 1.2s ease-in-out',
          zIndex: isCurrent ? 2 : 1,
        }}
      >
        {/* YouTube (lazy), Video, or Image */}
        {slide.youtubeId ? (
          shouldLoadYT ? (
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${slide.youtubeId}?autoplay=${isCurrent ? 1 : 0}&mute=1&loop=1&playlist=${slide.youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&iv_load_policy=3&disablekb=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none border-0"
                style={{
                  border: 'none',
                  width: 'max(177.78vh, 100vw)',
                  height: 'max(56.25vw, 100vh)',
                }}
                title={slide.title}
              />
            </div>
          ) : (
            /* Placeholder while YouTube loads — shows thumbnail */
            <div
              className="absolute inset-0 w-full h-full bg-black"
              style={{
                backgroundImage: `url(https://img.youtube.com/vi/${slide.youtubeId}/maxresdefault.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          )
        ) : slide.videoUrl ? (
          <video
            src={slide.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : imageUrl ? (
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              animation: isCurrent ? 'kenBurns 7s ease-out forwards' : 'none',
            }}
          />
        ) : null}
      </div>
    )
  }

  const currentSlide = slides[currentIndex]

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Ken Burns keyframes */}
      <style>{`
        @keyframes kenBurns {
          from { transform: scale(1); }
          to   { transform: scale(1.08); }
        }
      `}</style>

      {/* Slides layer */}
      {previousIndex !== null && renderSlide(slides[previousIndex], previousIndex, false)}
      {renderSlide(currentSlide, currentIndex, true)}

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)',
        }}
      />

      {/* Content: bottom-left */}
      <div className="relative z-10 h-full flex items-end">
        <div className="container pb-24 md:pb-28">
          <div
            key={currentSlide._id}
            className="max-w-3xl animate-slide-in"
          >
            <h1 className="heading-serif text-4xl md:text-6xl lg:text-7xl text-white mb-3">
              {currentSlide.title}
            </h1>
            {currentSlide.shipyard && (
              <p
                className="text-xs md:text-sm uppercase tracking-[0.2em] mb-5"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                {currentSlide.shipyard}
              </p>
            )}
            {currentSlide.slug?.current && (
              <Link
                href={`/projects/${currentSlide.slug.current}`}
                className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors group"
              >
                View Project
                <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Slide counter: bottom-right */}
      <div className="absolute bottom-24 md:bottom-28 right-6 md:right-12 z-10 text-white/70 text-sm tracking-widest">
        {padIndex(currentIndex)}{' '}
        <span className="text-white/40">/</span>{' '}
        {padIndex(slides.length - 1)}
      </div>

      {/* Navigation arrows: center-right */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        <button
          onClick={goToPrevious}
          disabled={isAnimating}
          className="h-10 w-10 rounded-full border border-white/30 hover:border-white/70 flex items-center justify-center transition-all disabled:opacity-30 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4 text-white" />
        </button>
        <button
          onClick={goToNext}
          disabled={isAnimating}
          className="h-10 w-10 rounded-full border border-white/30 hover:border-white/70 flex items-center justify-center transition-all disabled:opacity-30 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4 text-white" />
        </button>
      </div>
    </div>
  )
}
