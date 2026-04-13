import type { Metadata } from 'next'
import { getProjectsByCategory } from '@/lib/sanity'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CategoryPageLayout from '@/components/CategoryPageLayout'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Interiors | H2 Yacht Design',
  description:
    'Crafting extraordinary interior spaces for superyachts, from comprehensive refits to bespoke new build interiors that reflect each owner\'s unique vision.',
}

export default async function InteriorsPage() {
  const projects = await getProjectsByCategory('refit')

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <CategoryPageLayout
        projects={projects}
        title="Interiors"
        subtitle="Interior Design"
        description="Crafting extraordinary interior spaces for superyachts, from comprehensive refits to bespoke new build interiors that reflect each owner's unique vision."
      />
      <Footer />
    </div>
  )
}
