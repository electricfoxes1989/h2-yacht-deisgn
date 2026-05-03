import type { Metadata } from 'next'
import { getProjectsByCategory } from '@/lib/sanity'
import CategoryPageLayout from '@/components/CategoryPageLayout'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'In Build | H2 Yacht Design',
  description:
    'A glimpse into the projects currently taking shape at the world\'s finest shipyards, guided by H2\'s design vision.',
}

export default async function InBuildPage() {
  const projects = await getProjectsByCategory('in-build')

  return (
    <>
      <CategoryPageLayout
        projects={projects}
        title="In Build"
        subtitle="Currently Under Construction"
        description="A glimpse into the projects currently taking shape at the world's finest shipyards, guided by H2's design vision."
      />
    </>
  )
}
