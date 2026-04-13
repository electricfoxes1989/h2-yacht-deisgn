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
      'Bespoke interior architecture for superyachts \u2014 from spatial planning and material selection to custom furniture and FF&E. Our interior architects and 3D visualisers create environments that reflect each owner\u2019s personality and lifestyle.',
  },
  {
    number: '02',
    title: 'Exterior Design',
    description:
      'Complete exterior styling from profile to detail \u2014 hull lines, superstructure, and deck layouts that balance aesthetics with naval architecture. Every exterior is designed to be timeless and immediately recognisable.',
  },
]

export default function ServicesSection() {
  return (
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
  )
}
