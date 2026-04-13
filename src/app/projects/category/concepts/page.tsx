import type { Metadata } from 'next'
import { getProjectsByCategory } from '@/lib/sanity'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CategoryPageLayout from '@/components/CategoryPageLayout'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Concepts | H2 Yacht Design',
  description:
    'Pushing the boundaries of yacht design through innovative concepts that explore new forms, materials, and ways of living on the water.',
}

export default async function ConceptsPage() {
  const projects = await getProjectsByCategory('concepts')

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <CategoryPageLayout
        projects={projects}
        title="Concepts"
        subtitle="Design Concepts"
        description="Pushing the boundaries of yacht design through innovative concepts that explore new forms, materials, and ways of living on the water."
      />
      <Footer />
    </div>
  )
}
