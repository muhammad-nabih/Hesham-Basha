'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { ProjectsGrid } from './ProjectsGrid'
import type { Project } from '@/lib/sanity-queries'

interface ProjectsPageContentProps {
  projects: Project[]
}

// ─── Char split for the hero headline ────────────────────────────────────────
function SplitChars({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  return (
    <span aria-label={text} className={className}>
      {text.split('').map((char, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', lineHeight: '0.95em', verticalAlign: 'top' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '108%' }}
            animate={{ y: '0%' }}
            transition={{ delay: delay + i * 0.032, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function CounterStat({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="text-3xl lg:text-4xl font-black text-white/ tracking-tight">{value}</p>
      <p className="text-[10px] uppercase tracking-[0.28em] text-white/35 mt-1.5">{label}</p>
    </motion.div>
  )
}

// ─── Projects page content ────────────────────────────────────────────────────
export function ProjectsPageContent({ projects }: ProjectsPageContentProps) {
  const total = projects.length

  return (
    <>
      {/* ── Cinematic page header ──────────────────────────────────────── */}
      <section className="relative bg-brand-black text-white overflow-hidden border-b border-white/[0.07] pt-32 lg:pt-40 pb-20 lg:pb-28">
        {/* Grain */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '180px',
          }}
        />

        {/* Background text */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-0 overflow-hidden leading-none"
        >
          <span className="text-[22vw] font-black tracking-[-0.04em] text-white/[0.03] select-none whitespace-nowrap">
            WORK
          </span>
        </div>

        {/* Horizontal rule animated */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'left' }}
          className="absolute top-0 left-0 right-0 h-px bg-primary"
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20">
          {/* Eyebrow */}
          <div className="overflow-hidden mb-10 lg:mb-14">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-4"
            >
              <div className="w-8 h-px bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.32em] text-primary font-semibold">
                Archive
              </span>
            </motion.div>
          </div>

          {/* Headline */}
          <h1 className="font-black leading-[0.9] tracking-[-0.03em] mb-12 lg:mb-16">
            <div className="text-[clamp(3rem,8.5vw,7.5rem)] text-white/90">
              <SplitChars text="All" delay={0.1}  />
            </div>
            <div className="text-[clamp(3rem,8.5vw,7.5rem)]">
              <SplitChars text="Projects" delay={0.22} className="text-primary" />
            </div>
          </h1>

          {/* Bottom row: description + stats */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pt-10 border-t border-white/[0.07]">
            {/* Description */}
            <div className="overflow-hidden max-w-lg">
              <motion.p
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="text-base lg:text-lg text-white/45 leading-relaxed"
              >
                A comprehensive showcase of design work across branding, digital, and motion —
                crafted for brands that dare to be different.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.5 }}
              className="flex gap-10 shrink-0"
            >
              <CounterStat value={`${total}`} label="Projects" />
              <CounterStat value="3+" label="Years" />
              <CounterStat value="30+" label="Clients" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Projects grid ─────────────────────────────────────────────────── */}
      <section className="bg-surface">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 py-24 lg:py-36">
          {/* Section label row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-between mb-16 pb-6 border-b border-border/60"
          >
            <div className="flex items-center gap-3">
              <div className="w-4 h-px bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground font-semibold">
                Showing all
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground font-mono">
              {String(total).padStart(2, '0')} Works
            </span>
          </motion.div>

          <ProjectsGrid projects={projects} />
        </div>
      </section>

      {/* ── Bottom CTA strip ──────────────────────────────────────────────── */}
      <section className="bg-brand-black border-t border-white/[0.07] py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-semibold mb-2">
              Next step
            </p>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              Ready to start a project?
            </h2>
          </div>

          <a
            href="mailto:contact@example.com"
            className="shrink-0 inline-flex items-center gap-3 bg-primary px-9 py-4 text-[11px] uppercase tracking-[0.28em] font-bold text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Get in Touch →
          </a>
        </motion.div>
      </section>
    </>
  )
}