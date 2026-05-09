import { Navigation } from '@/components/common/Navigation'
import { Footer } from '@/components/common/Footer'
import { getProjectBySlug, getAllProjects } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import { ProjectDetailClient } from '@/components/sections/ProjectDetailClient'

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return { title: 'Project Not Found' }
  const heroImageUrl = project.heroImage?.asset
    ? urlFor(project.heroImage).width(1200).auto('format').quality(80).url()
    : null
  return {
    title: `${project.title} — Hesham Basha`,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: heroImageUrl ? [heroImageUrl] : [],
    },
  }
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  const allProjects = await getAllProjects()
  const currentIndex = allProjects.findIndex((p) => p.slug === slug)
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0]
  const prevProject =
    currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1]

  const heroImageSrc = project.heroImage?.asset
    ? urlFor(project.heroImage).width(1800).auto('format').quality(85).url()
    : '/placeholder.svg'

  return (
    <>
      <Navigation />
      <main>
        <ProjectDetailClient
          project={project}
          heroImageSrc={heroImageSrc}
          nextProject={nextProject}
          prevProject={prevProject}
          currentIndex={currentIndex}
          totalProjects={allProjects.length}
        />
      </main>
      <Footer />
    </>
  )
}