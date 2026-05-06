'use client'

/**
 * Continuous horizontal marquee of yacht names + shipyards.
 * Editorial signature element seen on luxury studio sites — gives an
 * immediate sense of scale + credibility on first scroll.
 *
 * The track is duplicated and translated 0 → -50% so the loop is seamless.
 */

interface MarqueeStripProps {
  projects: any[]
}

export default function MarqueeStrip({ projects }: MarqueeStripProps) {
  // Pick a curated 15 — most prominent / well-known yachts
  const featured = projects
    .filter((p: any) => p.mainImage && p.shipyard)
    .slice(0, 15)

  if (featured.length === 0) return null

  // Duplicate so the loop reads as continuous
  const items = [...featured, ...featured]

  return (
    <section
      className="border-y border-[var(--h2-border)] bg-white py-6 md:py-8 overflow-hidden"
      aria-label="Featured yacht projects"
    >
      <div className="marquee-track flex gap-12 md:gap-20 whitespace-nowrap">
        {items.map((project, i) => (
          <span
            key={`${project._id}-${i}`}
            className="inline-flex items-baseline gap-3 md:gap-4 shrink-0"
          >
            <span className="heading-serif text-2xl md:text-3xl lg:text-4xl text-h2-navy">
              {project.title}
            </span>
            <span className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-[0.2em] text-h2-muted">
              {project.shipyard}
            </span>
            {project.length && (
              <>
                <span className="block w-1.5 h-1.5 rounded-full bg-[var(--h2-cyan)] opacity-60" />
                <span className="text-[0.7rem] md:text-[0.8rem] text-[var(--h2-cyan)] font-medium">
                  {project.length}
                </span>
              </>
            )}
            <span className="text-h2-border mx-2 md:mx-4" aria-hidden="true">
              ●
            </span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 60s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </section>
  )
}
