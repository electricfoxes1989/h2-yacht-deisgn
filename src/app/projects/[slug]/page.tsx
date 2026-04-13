import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProjectBySlug, getAllProjects, urlFor } from '@/lib/sanity'
import ProjectDetailClient from './ProjectDetailClient'

export const revalidate = 60

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects
    .filter((p: any) => p.slug?.current)
    .map((p: any) => ({ slug: p.slug.current }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return { title: 'Project Not Found | H2 Yacht Design' }
  }

  return {
    title: `${project.title} | H2 Yacht Design`,
    description: project.excerpt || `${project.title} — a project by H2 Yacht Design.`,
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getAllProjects(),
  ])

  if (!project) {
    notFound()
  }

  const relatedProjects = allProjects
    .filter(
      (p: any) =>
        p.category === project.category && p._id !== project._id
    )
    .slice(0, 3)

  return (
    <ProjectDetailClient project={project} relatedProjects={relatedProjects} />
  )
}
