import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProjectBySlug, getAllProjects, urlFor } from '@/lib/sanity'
import { projectSchema, breadcrumbSchema } from '@/lib/structured-data'
import ProjectDetailClient from './ProjectDetailClient'

const SITE_URL = 'https://h2-yacht-design.vercel.app'

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
    return { title: 'Project Not Found' }
  }

  const ogImage = project.mainImage
    ? urlFor(project.mainImage).width(1200).height(630).fit('crop').quality(85).url()
    : '/images/jeff-brown-footer.jpg'

  const description =
    project.excerpt ||
    [
      project.title,
      project.shipyard ? `built by ${project.shipyard}` : null,
      project.length ? `(${project.length})` : null,
      '— interior and exterior design by H2 Yacht Design.',
    ]
      .filter(Boolean)
      .join(' ')

  const canonical = `/projects/${slug}`

  return {
    title: project.title,
    description,
    keywords: [
      project.title,
      project.shipyard,
      project.length ? `${project.length} superyacht` : null,
      project.category,
      'H2 Yacht Design',
      'superyacht interior design',
      'superyacht exterior design',
    ].filter(Boolean) as string[],
    alternates: { canonical },
    openGraph: {
      type: 'article',
      title: `${project.title} — H2 Yacht Design`,
      description,
      url: canonical,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — H2 Yacht Design`,
      description,
      images: [ogImage],
    },
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

  // JSON-LD schemas
  const ogImage = project.mainImage
    ? urlFor(project.mainImage).width(1200).height(630).fit('crop').quality(85).url()
    : undefined
  const projectLD = projectSchema(project, ogImage)
  const breadcrumbsLD = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Projects', url: '/projects' },
    { name: project.title, url: `/projects/${slug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([projectLD, breadcrumbsLD]),
        }}
      />
      <ProjectDetailClient project={project} relatedProjects={relatedProjects} />
    </>
  )
}
