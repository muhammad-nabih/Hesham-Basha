'use client'

import { motion } from 'framer-motion'
import { ProjectsGrid } from './ProjectsGrid'
import type { Project } from '@/lib/sanity-queries'

interface ProjectsPageContentProps {
  projects: Project[]
}

export function ProjectsPageContent({ projects }: ProjectsPageContentProps) {
  return (
    <>
      {/* Page Header */}
      <section className="border-b border-border py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-4">All Projects</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A comprehensive showcase of my design work across various industries and mediums.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <ProjectsGrid projects={projects} />
        </div>
      </section>
    </>
  )
}
