import { PortableTextComponents } from '@portabletext/react'
import { urlFor } from './sanity'

// Custom components for rendering Portable Text blocks
export const portableTextComponents: PortableTextComponents = {
  types: {
    // Quote block
    quote: ({ value }: any) => (
      <blockquote className="my-8 border-l-4 border-cyan-500 pl-6 pr-4 py-4 bg-gray-50">
        <p className="text-xl text-gray-800 italic mb-2">{value.text}</p>
        {value.attribution && (
          <footer className="text-sm text-gray-600">
            <cite className="not-italic font-medium">
              — {value.attribution}
              {value.role && <span className="text-gray-500">, {value.role}</span>}
            </cite>
          </footer>
        )}
      </blockquote>
    ),

    // Pull quote block
    pullQuote: ({ value }: any) => (
      <aside className="my-12 text-center">
        <p className="text-3xl font-light text-navy-900 italic max-w-3xl mx-auto leading-relaxed">
          "{value.text}"
        </p>
      </aside>
    ),

    // Image gallery block
    imageGallery: ({ value }: any) => {
      const gridClass = value.layout === 'grid-3' ? 'grid-cols-3' : 'grid-cols-2'
      
      return (
        <div className={`my-12 grid ${gridClass} gap-4`}>
          {value.images?.map((image: any, index: number) => (
            <figure key={index} className="group">
              <img
                src={urlFor(image).width(800).url()}
                alt={image.alt || ''}
                className="w-full h-auto object-cover rounded-lg transition-transform group-hover:scale-105"
              />
              {image.caption && (
                <figcaption className="mt-2 text-sm text-gray-600 text-center">
                  {image.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )
    },

    // Callout block
    callout: ({ value }: any) => {
      const typeStyles = {
        info: 'bg-blue-50 border-blue-500 text-blue-900',
        warning: 'bg-yellow-50 border-yellow-500 text-yellow-900',
        success: 'bg-green-50 border-green-500 text-green-900',
        note: 'bg-gray-50 border-gray-500 text-gray-900',
      }
      
      const style = typeStyles[value.type as keyof typeof typeStyles] || typeStyles.info
      
      return (
        <div className={`my-6 p-6 border-l-4 rounded-r ${style}`}>
          <p className="text-base leading-relaxed">{value.text}</p>
        </div>
      )
    },

    // Inline image block
    inlineImage: ({ value }: any) => {
      const widthClass = {
        full: 'w-full',
        wide: 'w-full max-w-5xl mx-auto',
        standard: 'w-full max-w-3xl mx-auto',
      }
      
      const width = widthClass[value.width as keyof typeof widthClass] || widthClass.standard
      
      return (
        <figure className={`my-8 ${width}`}>
          <img
            src={urlFor(value).width(1200).url()}
            alt={value.alt || ''}
            className="w-full h-auto rounded-lg"
          />
          {value.caption && (
            <figcaption className="mt-3 text-sm text-gray-600 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },

    // Video block
    video: ({ value }: any) => {
      const getEmbedUrl = (url: string) => {
        // YouTube
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
          const videoId = url.includes('youtu.be') 
            ? url.split('/').pop()
            : new URL(url).searchParams.get('v')
          return `https://www.youtube.com/embed/${videoId}`
        }
        // Vimeo
        if (url.includes('vimeo.com')) {
          const videoId = url.split('/').pop()
          return `https://player.vimeo.com/video/${videoId}`
        }
        return url
      }
      
      return (
        <figure className="my-8">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={getEmbedUrl(value.url)}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-sm text-gray-600 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },

  block: {
    // Heading styles
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-3xl font-light uppercase tracking-wide text-navy-900 mt-12 mb-6">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-2xl font-light uppercase tracking-wide text-navy-900 mt-10 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-xl font-light uppercase tracking-wide text-navy-900 mt-8 mb-3">
        {children}
      </h4>
    ),
    // Blockquote style
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-6 pl-6 border-l-4 border-cyan-500 italic text-lg text-gray-700">
        {children}
      </blockquote>
    ),
    // Normal paragraph
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 text-base leading-relaxed text-gray-700">
        {children}
      </p>
    ),
  },

  marks: {
    // Strong/bold text
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-navy-900">{children}</strong>
    ),
    // Emphasis/italic text
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    // Code
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">
        {children}
      </code>
    ),
    // Links
    link: ({ value, children }: { value?: { href?: string }; children?: React.ReactNode }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-cyan-500 hover:text-cyan-600 underline transition-colors"
        >
          {children}
        </a>
      )
    },
  },

  list: {
    // Bullet list
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="my-4 ml-6 list-disc space-y-2 text-gray-700">
        {children}
      </ul>
    ),
    // Numbered list
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="my-4 ml-6 list-decimal space-y-2 text-gray-700">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="pl-2">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="pl-2">{children}</li>
    ),
  },
}
