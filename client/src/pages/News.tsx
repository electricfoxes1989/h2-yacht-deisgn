import { useEffect, useState } from "react"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { getAllNews, urlFor } from "@/lib/sanity"
import { Link } from "wouter"
import {
  ScrollReveal,
  HeroTextReveal,
  StaggerContainer,
  staggerItem,
  ScaleReveal,
} from "@/components/animations"
import { motion } from "framer-motion"

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default function News() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllNews()
      .then(setNews)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-h2-muted label-text">Loading news...</div>
      </div>
    )
  }

  const featured = news.length > 0 ? (news[0] as any) : null
  const remaining = news.length > 1 ? news.slice(1) : []

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="section-dark pt-40 pb-20">
        <div className="container">
          <HeroTextReveal delay={0.1}>
            <p className="label-text mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Press & Features
            </p>
          </HeroTextReveal>
          <HeroTextReveal delay={0.25}>
            <h1 className="heading-serif text-5xl md:text-6xl lg:text-7xl mb-6">
              News
            </h1>
          </HeroTextReveal>
          <HeroTextReveal delay={0.4}>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Latest press, features and updates from the studio
            </p>
          </HeroTextReveal>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="section-padding">
          <div className="container">
            <ScaleReveal>
              {(() => {
                const href = featured.externalUrl
                  ? featured.externalUrl
                  : `/news/${featured.slug?.current}`
                const isExternal = !!featured.externalUrl

                const card = (
                  <div className="group relative">
                    <div className="img-zoom aspect-[16/9] bg-h2-light relative">
                      {featured.mainImage && (
                        <img
                          src={urlFor(featured.mainImage).width(1600).height(900).quality(85).url()}
                          alt={featured.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      {/* Dark gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      {/* Text overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10">
                        <div className="flex items-center gap-4 mb-4">
                          {featured.publishedAt && (
                            <span className="label-text text-white/60">
                              {formatDate(featured.publishedAt)}
                            </span>
                          )}
                          {featured.publication && (
                            <>
                              <span className="w-px h-3 bg-white/30" />
                              <span className="label-text text-white/60">
                                {featured.publication}
                              </span>
                            </>
                          )}
                        </div>
                        <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl text-white">
                          {featured.title}
                        </h2>
                      </div>
                    </div>
                  </div>
                )

                if (isExternal) {
                  return (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
                      {card}
                    </a>
                  )
                }

                return (
                  <Link href={href} className="block">
                    {card}
                  </Link>
                )
              })()}
            </ScaleReveal>
          </div>
        </section>
      )}

      {/* Remaining Articles Grid */}
      {remaining.length > 0 && (
        <section className="section-padding pt-0">
          <div className="container">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14" staggerDelay={0.1}>
              {remaining.map((article: any) => {
                const href = article.externalUrl
                  ? article.externalUrl
                  : `/news/${article.slug?.current}`
                const isExternal = !!article.externalUrl

                const card = (
                  <div className="group">
                    <div className="img-zoom aspect-[4/3] bg-h2-light mb-5">
                      {article.mainImage && (
                        <img
                          src={urlFor(article.mainImage).width(800).height(600).quality(85).url()}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <p className="label-text text-h2-muted mb-3">
                      {article.publishedAt && formatDate(article.publishedAt)}
                    </p>
                    <h3 className="text-lg font-semibold tracking-[-0.02em] text-h2-navy group-hover:text-h2-cyan transition-colors duration-300 leading-snug">
                      {article.title}
                    </h3>
                    {article.publication && (
                      <p className="text-sm text-h2-muted mt-2">
                        {article.publication}
                      </p>
                    )}
                  </div>
                )

                if (isExternal) {
                  return (
                    <motion.div key={article._id} variants={staggerItem}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        {card}
                      </a>
                    </motion.div>
                  )
                }

                return (
                  <motion.div key={article._id} variants={staggerItem}>
                    <Link href={href} className="block">
                      {card}
                    </Link>
                  </motion.div>
                )
              })}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Empty State */}
      {news.length === 0 && (
        <section className="section-padding">
          <div className="container text-center py-20">
            <p className="text-h2-body tracking-[-0.01em]">
              No news articles available yet. Check back soon.
            </p>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-dark section-padding">
        <div className="container text-center">
          <ScrollReveal>
            <p className="label-text mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Begin a Conversation
            </p>
            <h2 className="heading-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Get in Touch
            </h2>
            <p className="text-lg leading-relaxed max-w-xl mx-auto mb-10" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Interested in working together or have a press enquiry? We would love to hear from you.
            </p>
            <Link href="/contact" className="btn-outline-light">
              Get in Touch
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}
