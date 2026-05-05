import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Contact — London & Nice Studios',
  description:
    'Contact H2 Yacht Design at info@h2yachtdesign.com. London studio +44 (0)208 788 5008 or Nice studio +33 422 328 906. We design superyachts worldwide.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact H2 Yacht Design',
    description: 'Two studios — London & Nice. Get in touch to discuss a new yacht, refit, or residential project.',
    url: '/contact',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Contact', url: '/contact' },
])

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbs} />
      {children}
    </>
  )
}
