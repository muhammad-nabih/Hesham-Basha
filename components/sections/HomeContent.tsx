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
      <section className="border-t border-border bg-surface">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.55 }}
            className="mb-16"
          >
            <p className="font-accent text-xs uppercase tracking-[0.28em] text-primary mb-4">
              Portfolio
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
              Featured Work
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              A selection of recent projects showcasing campaigns, branding, and digital design.
            </p>
          </motion.div>

          <ProjectsGrid projects={projects} featured />
        </div>
      </section>

      <section className="border-t border-border bg-offwhite py-20 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.55 }}
          >
            <p className="font-accent text-xs uppercase tracking-[0.28em] text-primary mb-4">
              Collaboration
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-balance">
              Let&apos;s Create Something Extraordinary Together
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Interested in collaborating? I&apos;d love to hear about your project and discuss how
              I can help bring your vision to life.
            </p>
            <a
              href="mailto:contact@example.com"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm uppercase tracking-widest font-semibold text-white shadow-sm transition-interactive hover:bg-brand-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
