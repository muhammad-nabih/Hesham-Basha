'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'
import { Project } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'

interface ProjectsGridProps {
  projects: Project[]
  featured?: boolean
}

// ─── Tilt card wrapper ────────────────────────────────────────────────────────
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 30 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Single project card ──────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  span,
}: {
  project: Project
  index: number
  span?: boolean
}) {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true })
  const imgSrc = project.thumbnail?.asset
    ? urlFor(project.thumbnail).width(span ? 1400 : 900).auto('format').quality(82).url()
    : '/placeholder.svg'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ delay: index * 0.08, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={span ? 'md:col-span-2' : ''}
    >
      <TiltCard>
        <Link href={`/projects/${project.slug}`} className="block group">
          {/* Image container */}
          <div
            className={`relative overflow-hidden bg-[#111] ${
              span ? 'h-[420px] md:h-[560px]' : 'h-[320px] md:h-[420px]'
            }`}
          >
            {/* Index number — top-left */}
            <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
              <span className="text-[10px] font-mono text-white/30 tracking-widest">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Project type tag — top-right */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.08 + 0.3, duration: 0.5 }}
              className="absolute top-5 right-5 z-10"
            >
              <span className="text-[9px] uppercase tracking-[0.3em] font-semibold px-3 py-1.5 bg-primary text-white">
                {project.projectType}
              </span>
            </motion.div>

            {/* Image */}
            <Image
              src={imgSrc}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Overlay — clip-path reveal from bottom */}
            <motion.div
              initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              whileHover={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-brand-black/80 backdrop-blur-[2px] flex flex-col justify-end p-7 md:p-9"
            >
              {/* Arrow */}
              <motion.span
                initial={{ x: -6, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.18, duration: 0.4 }}
                className="absolute top-7 right-7 text-primary text-2xl font-bold"
              >
                ↗
              </motion.span>

              <p className="text-[9px] uppercase tracking-[0.3em] text-primary mb-3 font-semibold">
                {project.projectType}
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3">
                {project.title}
              </h3>
              {project.shortDescription && (
                <p className="text-sm text-white/55 leading-relaxed line-clamp-2">
                  {project.shortDescription}
                </p>
              )}
            </motion.div>

            {/* Bottom gradient always visible */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          </div>

          {/* Meta below card */}
          <div className="pt-5 flex items-start justify-between gap-4 border-b border-border/40 pb-5">
            <div>
              <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                {project.title}
              </h3>
              {project.shortDescription && (
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-1">
                  {project.shortDescription}
                </p>
              )}
            </div>

            {/* Tools - hidden for now just show for me  */}
            {project.tools && project.tools.length > 0 && (
              <div className="flex gap-2 flex-wrap shrink-0">
                {project.tools.slice(0, 2).map((tool: any) => (
                  <span
                    key={tool._ref}
                    className="text-[9px] border border-border text-muted-foreground px-2.5 py-1 tracking-wide uppercase hidden"
                  >
                    {tool._ref.split('.').pop()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  )
}

// ─── Projects grid ────────────────────────────────────────────────────────────
export function ProjectsGrid({ projects, featured = false }: ProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-24 border border-dashed border-border">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          No projects yet
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 lg:gap-x-8 lg:gap-y-16">
      {projects.map((project, idx) => (
        <ProjectCard
          key={project._id}
          project={project}
          index={idx}
          // First card spans full width when featured
          span={featured && idx === 0}
        />
      ))}
    </div>
  )
}