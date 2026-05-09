'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

import { ProjectsGrid } from './ProjectsGrid'
import type { Project } from '@/lib/sanity-queries'

interface HomeContentProps {
  projects: Project[]
}

// ─── Animated section heading ─────────────────────────────────────────────────
function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const textAlign = align === 'center' ? 'text-center' : 'text-left'
  const maxW = align === 'center' ? 'mx-auto' : ''

  return (
    <div ref={ref} className={textAlign}>
      {/* Eyebrow */}
      <div className="overflow-hidden mb-4">
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={inView ? { y: '0%', opacity: 1 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'left' }}
            className={`w-6 h-px bg-primary ${align === 'center' ? 'hidden' : 'block'}`}
          />
          <span className="text-[10px] uppercase tracking-[0.32em] text-primary font-semibold">
            {eyebrow}
          </span>
        </motion.div>
      </div>

      {/* Title — line by line */}
      <div className="overflow-hidden mb-6">
        <motion.h2
          initial={{ y: '100%', opacity: 0 }}
          animate={inView ? { y: '0%', opacity: 1 } : {}}
          transition={{ delay: 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`text-4xl lg:text-[3.5rem] xl:text-[4rem] font-bold tracking-[-0.02em] leading-[1.05] text-balance ${maxW}`}
        >
          {title}
        </motion.h2>
      </div>

      {/* Description */}
      {description && (
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: '100%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : {}}
            transition={{ delay: 0.18, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className={`text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl ${maxW}`}
          >
            {description}
          </motion.p>
        </div>
      )}
    </div>
  )
}

// ─── Animated divider ─────────────────────────────────────────────────────────
function AnimatedDivider() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="relative h-px w-full overflow-hidden">
      <div className="absolute inset-0 bg-border" />
      <motion.div
        initial={{ x: '-100%' }}
        animate={inView ? { x: '100%' } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-primary"
      />
    </div>
  )
}

// ─── HomeContent ─────────────────────────────────────────────────────────────
export function HomeContent({ projects }: HomeContentProps) {
  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' })

  return (
    <>
      {/* ── Featured Work ─────────────────────────────────────────────────── */}
      <section className="bg-surface">
        <AnimatedDivider />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 py-24 lg:py-36">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 lg:mb-24">
            <SectionHeading
              eyebrow="Portfolio"
              title="Featured Work"
              description="A selection of recent projects showcasing campaigns, branding, and digital design."
            />

            {/* "All work" link */}
            <motion.a
              href="/projects"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group hidden md:inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground hover:text-primary transition-colors duration-200 shrink-0 pb-1"
            >
              View All
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-primary"
              >
                →
              </motion.span>
            </motion.a>
          </div>

          <ProjectsGrid projects={projects} featured />

          {/* Mobile "view all" */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 flex justify-center md:hidden"
          >
            <a
              href="/projects"
              className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold border border-border px-8 py-4 hover:border-primary hover:text-primary transition-all duration-250"
            >
              View All Projects →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── CTA / Contact ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-black text-white">
        <AnimatedDivider />

        {/* Large background text */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        >
          <span
            className="text-[18vw] font-black tracking-[-0.04em] text-white/[0.025] select-none leading-none whitespace-nowrap"
          >
            TOGETHER
          </span>
        </div>

        {/* Grain overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '180px',
          }}
        />

        <div
          ref={ctaRef}
          className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 py-28 lg:py-44"
        >
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="overflow-hidden mb-8">
              <motion.div
                initial={{ y: '100%' }}
                animate={ctaInView ? { y: '0%' } : {}}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-px bg-primary" />
                <span className="text-[10px] uppercase tracking-[0.32em] text-primary font-semibold">
                  Collaboration
                </span>
              </motion.div>
            </div>

            {/* Headline */}
            <div className="overflow-hidden mb-10">
              <motion.h2
                initial={{ y: '100%', opacity: 0 }}
                animate={ctaInView ? { y: '0%', opacity: 1 } : {}}
                transition={{ delay: 0.08, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl lg:text-[5rem] xl:text-[6rem] font-black tracking-[-0.03em] leading-[0.92] text-white text-balance"
              >
                Let&apos;s Create{' '}
                <span className="text-primary italic">Something</span>
                <br className="hidden lg:block" /> Extraordinary
              </motion.h2>
            </div>

            {/* Body + CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16"
            >
              <p className="text-base lg:text-lg text-white/45 leading-relaxed max-w-lg">
                Interested in collaborating? I&apos;d love to hear about your project and discuss
                how I can help bring your vision to life.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 lg:shrink-0">
                <a
                  href="mailto:contact@example.com"
                  className="group inline-flex items-center justify-center gap-3 bg-primary px-9 py-4 text-[11px] uppercase tracking-[0.28em] font-bold text-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  Get in Touch
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    →
                  </motion.span>
                </a>
                <a
                  href="/projects"
                  className="inline-flex items-center justify-center gap-3 border border-white/20 px-9 py-4 text-[11px] uppercase tracking-[0.28em] font-bold text-white/60 hover:border-primary hover:text-primary transition-all duration-300"
                >
                  See My Work
                </a>
              </div>
            </motion.div>
          </div>

          {/* Bottom decorative row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={ctaInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-20 lg:mt-28 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-6">
              {['Behance', 'Instagram', 'LinkedIn'].map((s) => (
                <span
                  key={s}
                  className="text-[9px] uppercase tracking-[0.28em] text-white/25 hover:text-primary transition-colors duration-200 cursor-pointer"
                >
                  {s}
                </span>
              ))}
            </div>
            <span className="text-[9px] uppercase tracking-[0.28em] text-white/20 font-mono">
              Available for freelance
            </span>
          </motion.div>
        </div>
      </section>
    </>
  )
}