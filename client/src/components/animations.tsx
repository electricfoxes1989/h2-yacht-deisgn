import { motion, useScroll, useTransform, useInView, type Variants } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

/* ─────────────────────────────────────────────
   1. Page Transition Wrapper
   Wraps each page with a smooth fade + slide-up
   ───────────────────────────────────────────── */
const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
}

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   2. Scroll Reveal – fade + slide from direction
   ───────────────────────────────────────────── */
interface ScrollRevealProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  delay?: number
  duration?: number
  distance?: number
  once?: boolean
  threshold?: number
}

export function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.7,
  distance = 40,
  once = true,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })

  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  }

  const offset = directionMap[direction]

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...offset }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   3. Stagger Children – container that staggers
   its direct motion children into view
   ───────────────────────────────────────────── */
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  once?: boolean
  threshold?: number
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  once = true,
  threshold = 0.1,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

/* ─────────────────────────────────────────────
   4. Parallax Image – moves slower than scroll
   for a depth effect on hero / banner images
   ───────────────────────────────────────────── */
interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  speed?: number   // 0 = no parallax, 0.5 = half-speed (default), 1 = full freeze
  overlay?: ReactNode
  aspectRatio?: string
}

export function ParallaxImage({
  src,
  alt,
  className = '',
  speed = 0.3,
  overlay,
  aspectRatio,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Translate range: the image shifts by ±(speed * 100)px
  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100])

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="w-full h-[120%] object-cover absolute top-[-10%] left-0"
      />
      {overlay}
    </div>
  )
}

/* ─────────────────────────────────────────────
   5. Parallax Section – shifts a section's
   content at a different scroll speed
   ───────────────────────────────────────────── */
interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  speed?: number
}

export function ParallaxSection({
  children,
  className = '',
  speed = 0.15,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [speed * -60, speed * 60])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   6. Counter Animation – number counting up
   (replaces the IntersectionObserver version)
   ───────────────────────────────────────────── */
interface AnimatedCounterProps {
  value: string
  label: string
  className?: string
}

export function AnimatedCounter({ value, label, className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const numericValue = parseInt(value)

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.span
        className="heading-serif text-4xl md:text-5xl text-white block mb-3"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {isInView ? numericValue : 0}{value.includes('+') ? '+' : ''}
      </motion.span>
      <span className="label-text text-white/50">{label}</span>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   7. Hero Text Reveal – staggers in hero text
   lines with a luxurious feel
   ───────────────────────────────────────────── */
export function HeroTextReveal({
  children,
  className = '',
  delay = 0.2,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   8. Scale Reveal – subtle scale-in for images
   ───────────────────────────────────────────── */
export function ScaleReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   9. Line Reveal – a horizontal line that
   draws itself in from left
   ───────────────────────────────────────────── */
export function LineReveal({
  className = '',
  color = 'var(--h2-cyan)',
  width = '4rem',
  delay = 0,
}: {
  className?: string
  color?: string
  width?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ height: '1px', backgroundColor: color }}
      initial={{ width: 0 }}
      animate={isInView ? { width } : { width: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    />
  )
}
