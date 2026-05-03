import type { Metadata } from 'next'
import { getProjectsByCategory } from '@/lib/sanity'
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
    <>
      <CategoryPageLayout
        projects={projects}
        title="Interiors"
        subtitle="Interior Design"
        description="Crafting extraordinary interior spaces for superyachts, from comprehensive refits to bespoke new build interiors that reflect each owner's unique vision."
      />
    </>
  )
}
