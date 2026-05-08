'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Project } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'

interface ProjectsGridProps {
  projects: Project[]
  featured?: boolean
}

export function ProjectsGrid({ projects, featured = false }: ProjectsGridProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as any,
      },
    },
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">No projects available yet.</p>
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
    >
      {projects.map((project, idx) => (
        <motion.div
          key={project._id}
          variants={item}
          className={idx === 0 && !featured ? 'md:col-span-2' : ''}
        >
          <Link href={`/projects/${project.slug}`}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className="group cursor-pointer overflow-hidden rounded-xl border border-border/80 bg-card h-80 md:h-96 shadow-sm"
            >
              <div className="relative w-full h-full">
                <Image
                  src={
                    project.thumbnail?.asset
                      ? urlFor(project.thumbnail).width(900).auto('format').quality(75).url()
                      : '/placeholder.svg'
                  }
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />

                {/* Overlay with project info on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black/50 flex flex-col items-end justify-end p-6 md:p-8"
                >
                  <div className="text-right text-white">
                    <p className="font-accent text-xs uppercase tracking-[0.2em] text-primary mb-2">
                      {project.projectType}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold leading-tight text-white">
                      {project.title}
                    </h3>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </Link>

          {/* Project Metadata */}
          <div className="mt-4 space-y-2">
            <Link href={`/projects/${project.slug}`}>
              <h3 className="text-lg md:text-xl font-semibold transition-interactive group-hover:text-primary">
                {project.title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground">{project.shortDescription}</p>
            <div className="flex gap-3 flex-wrap pt-2">
              {project.tools?.slice(0, 3).map((tool: any) => (
                <span
                  key={tool._ref}
                  className="text-xs border border-border bg-offwhite text-muted-foreground px-3 py-1 rounded-md"
                >
                  {tool._ref.split('.').pop()}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
