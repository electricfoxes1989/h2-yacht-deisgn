'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

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

const stats = [
  { value: '2', label: 'Studios' },
  { value: '20+', label: 'Designers' },
  { value: '30+', label: 'Years Experience' },
]

export default function StatsSection() {
  return (
    <section className="bg-[var(--h2-navy)]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  )
}
