'use client'

import { motion } from 'framer-motion'
import { ProjectsGrid } from './ProjectsGrid'
import type { Project } from '@/lib/sanity-queries'

interface HomeContentProps {
  projects: Project[]
}

export function HomeContent({ projects }: HomeContentProps) {
  return (
    <>
      {/* Featured Projects Section */}
      <section className="bg-background border-t border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Featured Work</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A selection of recent projects showcasing campaigns, branding, and digital design.
            </p>
          </motion.div>

          <ProjectsGrid projects={projects} featured />
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border py-20 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-balance">
              Let&apos;s Create Something Extraordinary Together
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Interested in collaborating? I&apos;d love to hear about your project and discuss how I can help bring your vision to life.
            </p>
            <a
              href="mailto:contact@example.com"
              className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 text-sm uppercase tracking-wider font-semibold hover:opacity-80 transition-opacity"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
