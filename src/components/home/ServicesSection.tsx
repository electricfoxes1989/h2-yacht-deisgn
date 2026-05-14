'use client'

import { motion } from 'framer-motion'
import {
  ScrollReveal,
  StaggerContainer,
  staggerItem,
} from '@/components/animations'

const services = [
  {
    number: '01',
    title: 'Interior Design',
    description:
      'Bespoke interior architecture for superyachts — from spatial planning and material selection to custom furniture and FF&E. Our interior architects and 3D visualisers create environments that reflect each owner’s personality and lifestyle.',
  },
  {
    number: '02',
    title: 'Exterior Design',
    description:
      'Complete exterior styling from profile to detail — hull lines, superstructure, and deck layouts that balance aesthetics with naval architecture. Every exterior is designed to be timeless and immediately recognisable.',
  },
]

export default function ServicesSection() {
  return (
    <section className="section-padding">
      <div className="container">
        {/* Header */}
        <ScrollReveal>
          <div className="max-w-2xl mb-12 md:mb-16">
            <p className="eyebrow mb-4">Disciplines</p>
            <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl mb-6">
              What We Design
            </h2>
            <p className="text-h2-body leading-relaxed">
              From first sketch to final delivery, H2 provides a complete
              design service for superyachts, tenders, and luxury residences.
            </p>
          </div>
        </ScrollReveal>

        {/* Two-column: image + services list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Feature image */}
          <ScrollReveal direction="left">
            <figure className="img-zoom relative aspect-[16/9] overflow-hidden rounded-2xl bg-h2-light">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/h2-materials-library.jpg"
                alt="H2 Yacht Design materials library — fabric and leather samples in the London studio"
                className="w-full h-full object-cover"
              />
            </figure>
          </ScrollReveal>

          {/* Services list */}
          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-12 lg:pt-4"
            staggerDelay={0.1}
          >
            {services.map((service) => (
              <motion.div key={service.number} variants={staggerItem}>
                <span className="heading-serif text-3xl md:text-4xl block mb-3 text-[var(--h2-cyan)]/30">
                  {service.number}
                </span>
                <h3 className="text-lg font-medium mb-2 tracking-[-0.02em] text-h2-dark">
                  {service.title}
                </h3>
                <p className="text-sm text-h2-body leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
