import type { Metadata } from 'next'
import { getProjectsByCategory } from '@/lib/sanity'
import CategoryPageLayout from '@/components/CategoryPageLayout'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Bespoke Projects | H2 Yacht Design',
  description:
    'Bringing our yacht design expertise beyond the water — private homes, boutique hospitality and custom tenders.',
}

export default async function BespokePage() {
  const [hotelHome, tenders] = await Promise.all([
    getProjectsByCategory('hotel-home'),
    getProjectsByCategory('tenders'),
  ])

  // Sort: projects with images first, then placeholders
  const projects = [...hotelHome, ...tenders].sort(
    (a, b) => (b.mainImage ? 1 : 0) - (a.mainImage ? 1 : 0)
  )

  return (
    <CategoryPageLayout
      projects={projects}
      title="Bespoke Projects"
      subtitle="Hotel &amp; Home &middot; Tenders &amp; Toys"
      description="Bringing our yacht design expertise beyond the water — private homes, boutique hospitality and custom tenders."
    />
  )
}
