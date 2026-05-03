import type { Metadata } from 'next'
import { getProjectsByCategory } from '@/lib/sanity'
import CategoryPageLayout from '@/components/CategoryPageLayout'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Exterior Design | H2 Yacht Design',
  description:
    'From initial concept to final delivery, H2 designs bespoke superyacht exteriors that balance bold aesthetics with technical precision.',
}

export default async function ExteriorDesignPage() {
  const projects = await getProjectsByCategory('new-build')

  return (
    <>
      <CategoryPageLayout
        projects={projects}
        title="Exterior Design"
        subtitle="New Build"
        description="From initial concept to final delivery, H2 designs bespoke superyacht exteriors that balance bold aesthetics with technical precision."
      />
    </>
  )
}
