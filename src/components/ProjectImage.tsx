import { urlFor } from '@/lib/sanity'

interface ProjectImageProps {
  mainImage?: any
  imageNote?: string
  isConfidential?: boolean
  title: string
  category?: string
  width?: number
  height?: number
  className?: string
  sizes?: string
}

/**
 * Displays a project image, or a styled placeholder if no image is available.
 *
 * - If mainImage exists → uses Sanity CDN
 * - If isConfidential → shows a styled "Private Project" placeholder (navy gradient)
 * - If imageNote exists → shows the note on a muted background
 * - Otherwise → shows a generic "Image coming soon" placeholder
 */
export default function ProjectImage({
  mainImage,
  imageNote,
  isConfidential,
  title,
  category,
  width = 900,
  height = 506,
  className = '',
  sizes,
}: ProjectImageProps) {
  if (mainImage) {
    const src = urlFor(mainImage).width(width).height(height).fit('crop').quality(85).url()
    return (
      <img
        src={src}
        alt={title}
        className={`w-full h-full object-cover block ${className}`}
        sizes={sizes}
      />
    )
  }

  // Confidential placeholder — elegant navy gradient with private badge
  if (isConfidential) {
    return (
      <div
        className={`w-full h-full flex items-center justify-center relative ${className}`}
        style={{
          background: 'linear-gradient(135deg, var(--h2-navy) 0%, var(--h2-navy-light) 100%)',
        }}
        aria-label={`${title} — Private project`}
      >
        <div className="text-center px-6">
          <span className="block text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[var(--h2-cyan)] mb-3">
            Private Project
          </span>
          <p className="heading-serif text-2xl md:text-3xl text-white leading-tight">
            {title}
          </p>
          <p className="text-white/40 text-xs mt-3 max-w-[18rem] mx-auto">
            Imagery withheld at the client&rsquo;s request.
          </p>
        </div>
      </div>
    )
  }

  // Image not yet available — neutral placeholder with note
  return (
    <div
      className={`w-full h-full flex items-center justify-center bg-h2-light ${className}`}
      aria-label={`${title} — Image not yet available`}
    >
      <div className="text-center px-6">
        {category && (
          <span className="block text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[var(--h2-cyan)] mb-3">
            {category.replace('-', ' ')}
          </span>
        )}
        <p className="heading-serif text-2xl md:text-3xl text-h2-navy leading-tight">
          {title}
        </p>
        <p className="text-h2-muted text-xs mt-3">
          {imageNote || 'Image not yet available'}
        </p>
      </div>
    </div>
  )
}
