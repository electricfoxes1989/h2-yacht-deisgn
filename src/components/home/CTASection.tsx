'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/animations'

export default function CTASection() {
  return (
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
  )
}
