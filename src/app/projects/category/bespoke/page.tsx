import type { Metadata } from 'next'
import { getProjectsByCategory } from '@/lib/sanity'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CategoryPageLayout from '@/components/CategoryPageLayout'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Bespoke Projects | H2 Yacht Design',
  description:
    'Bringing our yacht design expertise beyond the water — luxury residential interiors, boutique hospitality projects, and custom tenders.',
}

export default async function BespokePage() {
  const [hotelHome, tenders] = await Promise.all([
    getProjectsByCategory('hotel-home'),
    getProjectsByCategory('tenders'),
  ])

  const projects = [...hotelHome, ...tenders]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <CategoryPageLayout
        projects={projects}
        title="Bespoke Projects"
        subtitle="Hotel &amp; Home &middot; Tenders"
        description="Bringing our yacht design expertise beyond the water — luxury residential interiors, boutique hospitality projects, and custom tenders."
      />
      <Footer />
    </div>
  )
}
