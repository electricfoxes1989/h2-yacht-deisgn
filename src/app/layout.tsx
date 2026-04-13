import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Toaster } from 'sonner'
import './globals.css'

// Note: Akkurat font files (Lineto) not yet available locally.
// When .woff2 files are added to /public/fonts/, uncomment localFont below.
// import localFont from 'next/font/local'
// const akkurat = localFont({
//   src: [
//     { path: '../../public/fonts/lineto-akkurat-light.woff2', weight: '300', style: 'normal' },
//     { path: '../../public/fonts/lineto-akkurat-regular.woff2', weight: '400', style: 'normal' },
//     { path: '../../public/fonts/lineto-akkurat-bold.woff2', weight: '700', style: 'normal' },
//   ],
//   variable: '--font-akkurat',
//   display: 'swap',
//   fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
// })

export const metadata: Metadata = {
  title: {
    default: 'H2 Yacht Design',
    template: '%s | H2 Yacht Design',
  },
  description: 'London and Nice-based superyacht design studio founded by Jonny Horsfield. Interior and exterior design for the world\'s finest superyachts.',
  metadataBase: new URL('https://h2-yacht-design.vercel.app'),
  openGraph: {
    type: 'website',
    siteName: 'H2 Yacht Design',
    locale: 'en_GB',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
