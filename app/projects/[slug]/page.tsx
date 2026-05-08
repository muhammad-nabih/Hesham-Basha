import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from '@/components/common/Navigation'
import { Footer } from '@/components/common/Footer'
import { ImageReveal } from '@/components/common/ImageReveal'
import { getProjectBySlug, getAllProjects } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import { notFound } from 'next/navigation'

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  const heroImageUrl = project.heroImage?.asset
    ? urlFor(project.heroImage).width(1200).auto('format').quality(80).url()
    : null

  return {
    title: `${project.title} - Hesham Basha`,
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

  if (!project) {
    notFound()
  }

  const allProjects = await getAllProjects()
  const currentIndex = allProjects.findIndex((p) => p.slug === slug)
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0]
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1]
  const heroImageSrc = project.heroImage?.asset
    ? urlFor(project.heroImage).width(1600).auto('format').quality(80).url()
    : '/placeholder.svg'

  return (
    <>
      <Navigation />

      <main className="pt-20">
        {/* Hero Image */}
        <ImageReveal
          src={heroImageSrc}
          alt={project.title}
          fill
          className="w-full h-96 lg:h-[600px] relative"
          priority
          sizes="100vw"
        />

        {/* Project Content */}
        <article className="border-t border-border">
          {/* Header Section */}
          <section className="py-16 lg:py-20 border-b border-border">
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
              <div>
                <p className="font-accent text-xs uppercase tracking-[0.22em] text-primary mb-4">
                  {project.projectType}
                </p>
                <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  {project.title}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {project.shortDescription}
                </p>

                {/* Metadata */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Year
                    </p>
                    <p className="text-lg font-semibold">{project.year}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Type
                    </p>
                    <p className="text-lg font-semibold capitalize">{project.projectType}</p>
                  </div>
                  {project.tools && project.tools.length > 0 && (
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                        Tools
                      </p>
                      <p className="text-lg font-semibold">
                        {project.tools.length} {project.tools.length === 1 ? 'tool' : 'tools'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Description Section */}
          <section className="py-16 lg:py-20 border-b border-border">
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Project Overview</h2>
                <div className="max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {project.fullDescription}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <section className="py-16 lg:py-20 border-b border-border">
              <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="mb-12">
                  <h2 className="text-3xl font-bold tracking-tight">Project Gallery</h2>
                </div>

                <div className="space-y-8 lg:space-y-12">
                  {project.galleryImages.map((item, idx) => (
                    <div key={idx}>
                      <div className="relative w-full h-96 lg:h-[500px] overflow-hidden rounded-xl border border-border bg-card">
                        {item.image?.asset ? (
                          <Image
                            src={urlFor(item.image).width(1400).auto('format').quality(80).url()}
                            alt={item.alt || `Gallery image ${idx + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 85vw"
                          />
                        ) : null}
                      </div>
                      {item.caption && (
                        <p className="text-sm text-muted-foreground mt-4 text-center">
                          {item.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Navigation Section */}
          <section className="py-16 lg:py-20 border-t border-border">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {prevProject && (
                  <Link href={`/projects/${prevProject.slug}`}>
                    <div className="group cursor-pointer">
                      <p className="font-accent text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 transition-interactive group-hover:text-primary">
                        Previous Project
                      </p>
                      <h3 className="text-xl font-semibold transition-interactive group-hover:text-primary">
                        {prevProject.title}
                      </h3>
                    </div>
                  </Link>
                )}

                {nextProject && (
                  <Link href={`/projects/${nextProject.slug}`} className="md:text-right">
                    <div className="group cursor-pointer">
                      <p className="font-accent text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 transition-interactive group-hover:text-primary">
                        Next Project
                      </p>
                      <h3 className="text-xl font-semibold transition-interactive group-hover:text-primary">
                        {nextProject.title}
                      </h3>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </>
  )
}
