import type { Metadata, Viewport } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Toaster } from 'sonner'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import {
  organizationSchema,
  websiteSchema,
  londonOfficeSchema,
  niceOfficeSchema,
} from '@/lib/structured-data'
import './globals.css'

const SITE_URL = 'https://h2-yacht-design.vercel.app'
const TITLE_DEFAULT = 'H2 Yacht Design — Award-Winning Superyacht Design Studio'
const DESCRIPTION =
  'H2 Yacht Design is a London and Nice-based superyacht design studio founded by Jonny Horsfield in 1994. Award-winning interior and exterior design for the world\'s finest superyachts.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: '%s | H2 Yacht Design',
  },
  description: DESCRIPTION,
  applicationName: 'H2 Yacht Design',
  authors: [{ name: 'H2 Yacht Design', url: SITE_URL }],
  creator: 'H2 Yacht Design',
  publisher: 'H2 Yacht Design',
  category: 'Yacht Design',
  keywords: [
    'superyacht design',
    'yacht interior design',
    'yacht exterior design',
    'Jonny Horsfield',
    'H2 Yacht Design',
    'London yacht designer',
    'Nice yacht designer',
    'luxury yacht studio',
    'yacht refit design',
    'superyacht interiors',
    'bespoke yacht design',
    'Mediterranean yacht design',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'H2 Yacht Design',
    locale: 'en_GB',
    url: SITE_URL,
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    images: [
      {
        url: '/images/jeff-brown-footer.jpg',
        width: 1920,
        height: 1080,
        alt: 'Superyacht designed by H2 Yacht Design',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    images: ['/images/jeff-brown-footer.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
  formatDetection: {
    email: false,
    telephone: false,
  },
  other: {
    'theme-color': '#142331',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#142331' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB">
      <head>
        {/* Global JSON-LD: Organization, Website, both office LocalBusinesses */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organizationSchema,
              websiteSchema,
              londonOfficeSchema,
              niceOfficeSchema,
            ]),
          }}
        />
      </head>
      <body>
        <Navigation />
        {children}
        <Footer />
        <Toaster position="bottom-right" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
