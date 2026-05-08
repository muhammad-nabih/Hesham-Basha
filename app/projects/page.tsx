import { Navigation } from '@/components/common/Navigation'
import { Footer } from '@/components/common/Footer'
import { ProjectsPageContent } from '@/components/sections/ProjectsPageContent'
import { getAllProjects } from '@/lib/sanity-queries'

export const metadata = {
  title: 'Projects - Hesham Basha',
  description: 'View all of my design projects including campaigns, branding, and digital work.',
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <>
      <Navigation />
      <main className="pt-24">
        <ProjectsPageContent projects={projects} />
      </main>
      <Footer />
    </>
  )
}
