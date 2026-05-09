'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { ProjectsGrid } from './ProjectsGrid'
import type { Project } from '@/lib/sanity-queries'

interface HomeContentProps {
  projects: Project[]
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

// ─── Ticker tape — scrolling brand text ──────────────────────────────────────
function Ticker({ text, reverse = false }: { text: string; reverse?: boolean }) {
  const items = Array.from({ length: 6 }, () => text)
  return (
    <div className="overflow-hidden py-4" style={{ borderTop: '1px solid rgba(255,72,0,0.12)', borderBottom: '1px solid rgba(255,72,0,0.12)' }}>
      <motion.div
        className="flex whitespace-nowrap gap-0"
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
      >
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="text-[11px] uppercase tracking-[0.38em] font-bold px-8"
              style={{ color: i % 4 === 0 ? '#ff4800' : 'rgba(0,0,0,0.18)' }}>
              {t}
            </span>
            <span style={{ color: '#ff4800', opacity: 0.3 }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Featured Work — editorial layout with large index numbers ────────────────
function FeaturedWork({ projects }: { projects: Project[] }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-[#f9f9f9]">
      <AnimatedDivider />

      {/* Section masthead */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 pt-20 pb-0">
        <div ref={ref} className="flex items-end justify-between border-b border-black/8 pb-10">

          {/* Left: label + huge title */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="w-6 h-px bg-[#ff4800]" />
              <span className="text-[10px] uppercase tracking-[0.38em] text-[#ff4800] font-bold">Portfolio</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '110%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{ delay: 0.06, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2.8rem,6vw,5.5rem)] font-black tracking-[-0.035em] leading-[0.9] text-black"
              >
                Featured
                <br />
                <span className="text-[#ff4800] italic">Work.</span>
              </motion.h2>
            </div>
          </div>

          {/* Right: meta info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:flex flex-col items-end gap-4 pb-2"
          >
            <span className="text-[9px] font-mono tracking-[0.35em] text-black/25 uppercase">
              {String(projects.length).padStart(2, '0')} Projects
            </span>

            <a
              href="/projects"
              className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-black/40 hover:text-[#ff4800] transition-colors duration-200"
            >
              View All
              <motion.span
                className="inline-block text-[#ff4800]"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Projects grid */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 py-16 lg:py-24">
        <ProjectsGrid projects={projects} featured />
      </div>

      {/* Mobile CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 pb-16 flex justify-center md:hidden"
      >
        <a href="/projects"
          className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold border border-black/20 px-8 py-4 hover:border-[#ff4800] hover:text-[#ff4800] transition-all duration-250">
          View All Projects →
        </a>
      </motion.div>
    </section>
  )
}

// ─── Stats strip ──────────────────────────────────────────────────────────────
function StatsStrip() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const stats = [
    { value: '3+', label: 'Years Experience' },
    { value: '80+', label: 'Projects Delivered' },
    { value: '100%', label: 'Passion Driven' },
    { value: '∞', label: 'Ideas Generated' },
  ]

  return (
    <section className="bg-black" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start px-8 py-8 first:pl-0"
              style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
            >
              <span className="text-[clamp(2.4rem,4vw,3.5rem)] font-black tracking-[-0.04em] leading-none text-white mb-2">
                {s.value}
              </span>
              <span className="text-[9px] uppercase tracking-[0.32em] text-white/25 font-medium">{s.label}</span>
              {i === 0 && (
                <motion.div
                  className="w-6 h-0.5 mt-4"
                  style={{ background: '#ff4800' }}
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA / Contact ────────────────────────────────────────────────────────────
function CtaSection() {
  const ctaRef = useRef(null)
  const inView = useInView(ctaRef, { once: true, margin: '-80px' })

  return (
    <section className="relative overflow-hidden bg-black text-white">
      <AnimatedDivider />

      {/* Background type */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <span className="text-[18vw] font-black tracking-[-0.04em] text-white/[0.025] select-none leading-none whitespace-nowrap">
          TOGETHER
        </span>
      </div>

      {/* Grain */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', backgroundSize: '180px',
        }} />

      <div ref={ctaRef} className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 py-28 lg:py-44">
        <div className="max-w-4xl">

          <div className="overflow-hidden mb-8">
            <motion.div initial={{ y: '100%' }} animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="flex items-center gap-3">
              <div className="w-6 h-px bg-[#ff4800]" />
              <span className="text-[10px] uppercase tracking-[0.32em] text-[#ff4800] font-semibold">Collaboration</span>
            </motion.div>
          </div>

          <div className="overflow-hidden mb-10">
            <motion.h2 initial={{ y: '100%', opacity: 0 }} animate={inView ? { y: '0%', opacity: 1 } : {}}
              transition={{ delay: 0.08, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl lg:text-[5rem] xl:text-[6rem] font-black tracking-[-0.03em] leading-[0.92] text-white text-balance">
              Let&apos;s Create{' '}
              <span className="text-[#ff4800] italic">Something</span>
              <br className="hidden lg:block" /> Extraordinary
            </motion.h2>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16">
            <p className="text-base lg:text-lg text-white/40 leading-relaxed max-w-lg">
              Interested in collaborating? I&apos;d love to hear about your project and discuss
              how I can help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 lg:shrink-0">
              <a href="mailto:heshamahmedd293@gmail.com"
                className="group inline-flex items-center justify-center gap-3 bg-[#ff4800] px-9 py-4 text-[11px] uppercase tracking-[0.28em] font-bold text-white hover:bg-white hover:text-black transition-all duration-300">
                Get in Touch
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>→</motion.span>
              </a>
              <a href="/projects"
                className="inline-flex items-center justify-center gap-3 border border-white/20 px-9 py-4 text-[11px] uppercase tracking-[0.28em] font-bold text-white/60 hover:border-[#ff4800] hover:text-[#ff4800] transition-all duration-300">
                See My Work
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-20 lg:mt-28 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            {['Behance', 'Instagram', 'LinkedIn'].map((s) => (
              <span key={s} className="text-[9px] uppercase tracking-[0.28em] text-white/25 hover:text-[#ff4800] transition-colors duration-200 cursor-pointer">{s}</span>
            ))}
          </div>
          <span className="text-[9px] uppercase tracking-[0.28em] text-white/20 font-mono">Available for freelance</span>
        </motion.div>
      </div>
    </section>
  )
}

// ─── HomeContent ──────────────────────────────────────────────────────────────
export function HomeContent({ projects }: HomeContentProps) {
  return (
    <>
      {/* Ticker above portfolio */}
      <Ticker text="Branding · Campaign · Visual Identity · Motion · Digital" />

      {/* Featured Work — new editorial layout */}
      <FeaturedWork projects={projects} />

      {/* Stats strip */}
      <StatsStrip />

      {/* Reversed ticker between sections */}
      <Ticker text="Photography · Art Direction · Typography · Strategy · Design" reverse />

      {/* CTA */}
      <CtaSection />
    </>
  )
}