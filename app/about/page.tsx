'use client'

import { Navigation } from '@/components/common/Navigation'
import { Footer } from '@/components/common/Footer'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// ─── Reusable line reveal ────────────────────────────────────────────────────
function LineReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref} style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={inView ? { y: '0%', opacity: 1 } : {}}
        transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// ─── Char split ──────────────────────────────────────────────────────────────
function SplitChars({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  return (
    <span aria-label={text} className={className}>
      {text.split('').map((char, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', lineHeight: '0.95em', verticalAlign: 'top' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '108%' }}
            animate={{ y: '0%' }}
            transition={{ delay: delay + i * 0.03, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// ─── Section eyebrow + title ─────────────────────────────────────────────────
function SectionLabel({ eyebrow, title }: { eyebrow: string; title: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref} className="mb-12 lg:mb-16">
      <div style={{ overflow: 'hidden' }} className="mb-4">
        <motion.div
          initial={{ y: '100%' }}
          animate={inView ? { y: '0%' } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'left' }}
            className="w-6 h-px bg-primary"
          />
          <span className="text-[10px] uppercase tracking-[0.32em] text-primary font-semibold">
            {eyebrow}
          </span>
        </motion.div>
      </div>
      <div style={{ overflow: 'hidden' }}>
        <motion.h2
          initial={{ y: '100%', opacity: 0 }}
          animate={inView ? { y: '0%', opacity: 1 } : {}}
          transition={{ delay: 0.08, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl lg:text-4xl font-black tracking-[-0.02em]"
        >
          {title}
        </motion.h2>
      </div>
    </div>
  )
}

// ─── About page ──────────────────────────────────────────────────────────────
export default function AboutPage() {
  const skills = [
    'Campaign Design',
    'Brand Identity',
    'Social Media Design',
    'Print Design',
    'Visual Communication',
    'Digital Design',
    'Advertising',
    'UX/UI Design',
  ]

  const tools = [
    'Adobe Creative Suite',
    'Photoshop',
    'Illustrator',
    'InDesign',
    'After Effects',
    'Figma',
  ]

  const experience = [
    {
      year: '2022–Present',
      title: 'Creative Designer',
      company: 'Freelance',
      description:
        'Specializing in advertising campaigns, branding, and digital design for regional and international clients.',
    },
    {
      year: '2021–2022',
      title: 'Junior Designer',
      company: 'Design Studio',
      description:
        'Worked on various design projects including campaigns, social media, and print materials.',
    },
  ]

  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' })

  return (
    <>
      <Navigation />

      <main className="pt-20">
        {/* ── Cinematic page header ───────────────────────────────────────── */}
        <section className="relative bg-brand-black text-white overflow-hidden pt-32 lg:pt-40 pb-20 lg:pb-28 border-b border-white/[0.07]">
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

          {/* Background watermark */}
          <div aria-hidden="true" className="pointer-events-none absolute right-0 bottom-0 overflow-hidden leading-none">
            <span className="text-[20vw] font-black tracking-[-0.04em] text-white/[0.03] select-none whitespace-nowrap">
              ABOUT
            </span>
          </div>

          {/* Top accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'left' }}
            className="absolute top-0 left-0 right-0 h-px bg-primary"
          />

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20">
            {/* Eyebrow */}
            <div style={{ overflow: 'hidden' }} className="mb-10 lg:mb-14">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4"
              >
                <div className="w-8 h-px bg-primary" />
                <span className="text-[10px] uppercase tracking-[0.32em] text-primary font-semibold">
                  Profile
                </span>
              </motion.div>
            </div>

            {/* Headline */}
            <h1 className="font-black leading-[0.9] tracking-[-0.03em] mb-14 lg:mb-20">
              <div className="text-[clamp(3.5rem,9vw,8rem)]">
                <SplitChars text="About" delay={0.1} />
              </div>
              <div className="text-[clamp(3.5rem,9vw,8rem)]">
                <SplitChars text="Me." delay={0.25} className="text-primary" />
              </div>
            </h1>

            {/* Bottom row */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-10 border-t border-white/[0.07]">
              <div style={{ overflow: 'hidden' }} className="max-w-lg">
                <motion.p
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ delay: 0.65, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  className="text-base lg:text-lg text-white/45 leading-relaxed"
                >
                  A passionate creative designer with a focus on crafting meaningful visual experiences for brands worldwide.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="shrink-0 text-[10px] uppercase tracking-[0.28em] text-white/20 font-mono"
              >
                Cairo, Egypt
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Bio / My Story ──────────────────────────────────────────────── */}
        <section className="bg-offwhite border-b border-border">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 py-24 lg:py-36">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              {/* Left label */}
              <div className="lg:col-span-4">
                <SectionLabel eyebrow="Narrative" title="My Story" />

                {/* Availability badge */}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.55 }}
                  className="inline-flex items-center gap-2.5 border border-primary/40 px-4 py-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] uppercase tracking-[0.28em] text-primary font-semibold">
                    Available for hire
                  </span>
                </motion.div>
              </div>

              {/* Right bio */}
              <div className="lg:col-span-8 space-y-6">
                {[
                  `I'm Hesham Basha, a creative designer based in Cairo, Egypt with over 2 years of experience creating compelling visual designs. My journey in design began with a passion for storytelling through visual communication, which has evolved into a career focused on delivering exceptional design solutions for brands.`,
                  `My work spans across advertising campaigns, brand identity development, social media design, and print materials. I specialize in transforming complex brand concepts into visually striking designs that resonate with target audiences. I take pride in understanding client visions and translating them into designs that not only look beautiful but also achieve business objectives.`,
                  `With a strong foundation in design principles and a keen eye for detail, I consistently deliver work that stands out. Whether it's a financial campaign, national holidays branding, or corporate design systems, I approach every project with the same level of dedication and creativity.`,
                ].map((para, i) => (
                  <LineReveal key={i} delay={i * 0.08}>
                    <p className="text-base lg:text-lg text-muted-foreground leading-[1.8]">
                      {para}
                    </p>
                  </LineReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Skills ──────────────────────────────────────────────────────── */}
        <section className="bg-surface border-b border-border">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 py-24 lg:py-32">
            <SectionLabel eyebrow="Expertise" title="Core Competencies" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
              {skills.map((skill, idx) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: idx * 0.04, duration: 0.5 }}
                  className="group relative bg-surface px-6 py-7 cursor-default overflow-hidden"
                >
                  {/* Hover fill */}
                  <div className="absolute inset-0 bg-primary scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100" />
                  <div className="relative z-10 flex items-center gap-3">
                    <span className="text-[10px] font-mono text-muted-foreground group-hover:text-white/60 transition-colors duration-200">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-semibold text-foreground group-hover:text-white transition-colors duration-200">
                      {skill}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tools ───────────────────────────────────────────────────────── */}
        <section className="bg-brand-black text-white border-b border-white/[0.07]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 py-24 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-4">
                <div className="mb-4" style={{ overflow: 'hidden' }}>
                  <motion.div
                    initial={{ y: '100%' }}
                    whileInView={{ y: '0%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-px bg-primary" />
                    <span className="text-[10px] uppercase tracking-[0.32em] text-primary font-semibold">
                      Stack
                    </span>
                  </motion.div>
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <motion.h2
                    initial={{ y: '100%', opacity: 0 }}
                    whileInView={{ y: '0%', opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    className="text-3xl lg:text-4xl font-black tracking-[-0.02em] text-white"
                  >
                    Tools &amp; Software
                  </motion.h2>
                </div>
              </div>

              <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                {tools.map((tool, idx) => (
                  <motion.div
                    key={tool}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: idx * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="group border border-white/[0.08] px-5 py-5 hover:border-primary transition-colors duration-300 cursor-default"
                  >
                    <p className="text-[9px] font-mono text-white/20 mb-2 group-hover:text-primary transition-colors duration-200">
                      {String(idx + 1).padStart(2, '0')}
                    </p>
                    <p className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors duration-200">
                      {tool}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Experience ──────────────────────────────────────────────────── */}
        <section className="bg-surface border-b border-border">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 py-24 lg:py-32">
            <SectionLabel eyebrow="Timeline" title="Experience" />

            <div className="space-y-0 divide-y divide-border">
              {experience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: idx * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-20 py-10 group"
                >
                  {/* Year + index */}
                  <div className="lg:col-span-3 flex items-start gap-4">
                    <span className="text-[10px] font-mono text-muted-foreground mt-1">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.28em] text-primary font-semibold mb-1">
                        {exp.year}
                      </p>
                      <p className="text-sm font-bold text-foreground">{exp.company}</p>
                    </div>
                  </div>

                  {/* Title + desc */}
                  <div className="lg:col-span-9">
                    <h3 className="text-xl lg:text-2xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors duration-200">
                      {exp.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <section className="relative bg-brand-black text-white overflow-hidden">
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
            className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 py-28 lg:py-40"
          >
            <div className="overflow-hidden mb-8">
              <motion.div
                initial={{ y: '100%' }}
                animate={ctaInView ? { y: '0%' } : {}}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-px bg-primary" />
                <span className="text-[10px] uppercase tracking-[0.32em] text-primary font-semibold">
                  Next step
                </span>
              </motion.div>
            </div>

            <div className="overflow-hidden mb-10">
              <motion.h2
                initial={{ y: '100%', opacity: 0 }}
                animate={ctaInView ? { y: '0%', opacity: 1 } : {}}
                transition={{ delay: 0.08, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl lg:text-[5rem] font-black tracking-[-0.03em] leading-[0.92]"
              >
                Ready to{' '}
                <span className="text-primary italic">Collaborate</span>?
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.28, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="mailto:contact@example.com"
                className="inline-flex items-center justify-center gap-3 bg-primary px-9 py-4 text-[11px] uppercase tracking-[0.28em] font-bold text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                Get in Touch →
              </a>
              <a
                href="/projects"
                className="inline-flex items-center justify-center gap-3 border border-white/20 px-9 py-4 text-[11px] uppercase tracking-[0.28em] font-bold text-white/60 hover:border-primary hover:text-primary transition-all duration-300"
              >
                See My Work
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}