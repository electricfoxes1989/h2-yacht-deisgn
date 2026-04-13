import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'London and Nice-based superyacht design studio founded by Jonny Horsfield in 1994. Over 30 years of award-winning interior and exterior yacht design.',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
