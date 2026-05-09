'use client'

import { Navigation } from '@/components/common/Navigation'
import { Footer } from '@/components/common/Footer'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// ─── Helpers ─────────────────────────────────────────────────────────────────
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

function SectionLabel({ eyebrow, title, inverted = false }: { eyebrow: string; title: string; inverted?: boolean }) {
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
          <span className="text-[10px] uppercase tracking-[0.32em] text-primary font-semibold">{eyebrow}</span>
        </motion.div>
      </div>
      <div style={{ overflow: 'hidden' }}>
        <motion.h2
          initial={{ y: '100%', opacity: 0 }}
          animate={inView ? { y: '0%', opacity: 1 } : {}}
          transition={{ delay: 0.08, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className={`text-3xl lg:text-4xl font-black tracking-[-0.02em] ${inverted ? 'text-white' : ''}`}
        >
          {title}
        </motion.h2>
      </div>
    </div>
  )
}

// ─── Grain helper ─────────────────────────────────────────────────────────────
const Grain = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 opacity-[0.035]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
      backgroundSize: '180px',
    }}
  />
)

// ─── Page ─────────────────────────────────────────────────────────────────────
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
    { name: 'Adobe Photoshop',       short: 'Ps' },
    { name: 'Adobe Illustrator',     short: 'Ai' },
    { name: 'Adobe InDesign',        short: 'Id' },
    { name: 'Adobe After Effects',   short: 'Ae' },
    { name: 'Adobe Creative Suite',  short: 'Cc' },
    { name: 'Figma',                 short: 'Fg' },
  ]

  const experience = [
    {
      year: '2022 — Present',
      title: 'Creative Designer',
      company: 'Freelance',
      description: 'Specializing in advertising campaigns, branding, and digital design for regional and international clients.',
    },
    {
      year: '2021 — 2022',
      title: 'Junior Designer',
      company: 'Design Studio',
      description: 'Worked on various design projects including campaigns, social media, and print materials.',
    },
  ]

  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' })

  return (
    <>
      <Navigation />

      <main className="pt-20">

        {/* ── Cinematic header ─────────────────────────────────────────── */}
        <section className="relative bg-brand-black text-white overflow-hidden pt-32 lg:pt-40 pb-20 lg:pb-28 border-b border-white/[0.07]">
          <Grain />

          {/* Watermark */}
          <div aria-hidden="true" className="pointer-events-none absolute right-0 bottom-0 overflow-hidden leading-none">
            <span className="text-[20vw] font-black tracking-[-0.04em] text-white/[0.03] select-none whitespace-nowrap">
              ABOUT
            </span>
          </div>

          {/* Top accent rule */}
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
                <span className="text-[10px] uppercase tracking-[0.32em] text-primary font-semibold">Profile</span>
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
                transition={{ delay: 0.85, duration: 0.5 }}
                className="shrink-0 flex items-center gap-2.5 text-[10px] uppercase tracking-[0.28em] text-white/25 font-mono"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Available for hire · Cairo, Egypt
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Bio ──────────────────────────────────────────────────────── */}
        <section className="bg-offwhite border-b border-border">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 py-24 lg:py-36">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-4">
                <SectionLabel eyebrow="Narrative" title="My Story" />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
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

              <div className="lg:col-span-8 space-y-6">
                {[
                  `I'm Hesham Basha, a creative designer based in Cairo, Egypt with over 2 years of experience creating compelling visual designs. My journey in design began with a passion for storytelling through visual communication, which has evolved into a career focused on delivering exceptional design solutions for brands.`,
                  `My work spans across advertising campaigns, brand identity development, social media design, and print materials. I specialize in transforming complex brand concepts into visually striking designs that resonate with target audiences. I take pride in understanding client visions and translating them into designs that not only look beautiful but also achieve business objectives.`,
                  `With a strong foundation in design principles and a keen eye for detail, I consistently deliver work that stands out. Whether it's a financial campaign, national holidays branding, or corporate design systems, I approach every project with the same level of dedication and creativity.`,
                ].map((para, i) => (
                  <LineReveal key={i} delay={i * 0.08}>
                    <p className="text-base lg:text-lg text-muted-foreground leading-[1.85]">{para}</p>
                  </LineReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Skills ───────────────────────────────────────────────────── */}
        <section className="bg-surface border-b border-border">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 py-24 lg:py-32">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
              <SectionLabel eyebrow="Expertise" title="Core Competencies" />
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground font-mono shrink-0 mb-12 lg:mb-16"
              >
                {String(skills.length).padStart(2, '0')} Disciplines
              </motion.p>
            </div>

            {/* Grid with hover fill */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
              {skills.map((skill, idx) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: idx * 0.04, duration: 0.5 }}
                  className="group relative bg-surface px-6 py-8 cursor-default overflow-hidden"
                >
                  {/* Orange fill on hover */}
                  <div className="absolute inset-0 bg-primary scale-y-0 origin-bottom transition-transform duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />
                  <div className="relative z-10 flex items-start gap-3">
                    <span className="text-[9px] font-mono text-muted-foreground group-hover:text-white/60 transition-colors duration-200 mt-0.5 shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-semibold text-foreground group-hover:text-white transition-colors duration-200 leading-snug">
                      {skill}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tools ────────────────────────────────────────────────────── */}
        <section className="bg-brand-black text-white border-b border-white/[0.07]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 py-24 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-4">
                <SectionLabel eyebrow="Stack" title="Tools & Software" inverted />
              </div>

              <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-px bg-white/[0.05]">
                {tools.map((tool, idx) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: idx * 0.065, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative bg-brand-black px-6 py-8 hover:bg-white/[0.03] transition-colors duration-200 cursor-default overflow-hidden"
                  >
                    {/* Monogram watermark */}
                    <span
                      aria-hidden="true"
                      className="absolute right-4 bottom-3 text-4xl font-black text-white/[0.04] group-hover:text-primary/10 transition-colors duration-300 leading-none select-none"
                    >
                      {tool.short}
                    </span>

                    <p className="text-[9px] font-mono text-white/20 mb-2.5 group-hover:text-primary transition-colors duration-200">
                      {String(idx + 1).padStart(2, '0')}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-0.5 h-7 bg-primary shrink-0" />
                      <p className="text-sm font-bold text-white/70 group-hover:text-white transition-colors duration-200 leading-snug">
                        {tool.name}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Experience ───────────────────────────────────────────────── */}
        <section className="bg-surface border-b border-border">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 py-24 lg:py-32">
            <SectionLabel eyebrow="Timeline" title="Experience" />

            <div className="divide-y divide-border">
              {experience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: idx * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-20 py-12 group"
                >
                  {/* Left: year + company */}
                  <div className="lg:col-span-3 flex items-start gap-4">
                    <span className="text-[10px] font-mono text-muted-foreground mt-1.5 shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.28em] text-primary font-semibold mb-1.5">
                        {exp.year}
                      </p>
                      <p className="text-sm font-bold text-foreground">{exp.company}</p>
                    </div>
                  </div>

                  {/* Right: role + description */}
                  <div className="lg:col-span-9 flex items-start gap-4">
                    {/* Orange dot */}
                    <div className="w-2 h-2 rounded-full bg-primary mt-2.5 shrink-0" />
                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors duration-200">
                        {exp.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="relative bg-brand-black text-white overflow-hidden">
          <Grain />

          {/* Background word */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <span className="text-[18vw] font-black tracking-[-0.04em] text-white/[0.025] select-none leading-none whitespace-nowrap">
              COLLABORATE
            </span>
          </div>

          <div ref={ctaRef} className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 py-28 lg:py-44">
            <div className="max-w-3xl">
              <div style={{ overflow: 'hidden' }} className="mb-8">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={ctaInView ? { y: '0%' } : {}}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-px bg-primary" />
                  <span className="text-[10px] uppercase tracking-[0.32em] text-primary font-semibold">Next step</span>
                </motion.div>
              </div>

              <div style={{ overflow: 'hidden' }} className="mb-10">
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
                  href="mailto:heshamahmedd293@gmail.com?subject=Let's%20Collaborate!&body=Hi%20Hesham%2C%0D%0A%0D%0AMy%20name%20is%20[Your%20Name].%20I'm%20reaching%20out%20to%20discuss%20a%20potential%20collaboration%20or%20project.%20Here%20are%20some%20details%3A%0D%0A%0D%0A---%0D%0A%0D%0AThank%20you!"
                  className="inline-flex items-center justify-center gap-3 bg-primary px-9 py-4 text-[11px] uppercase tracking-[0.28em] font-bold text-white hover:bg-white hover:text-black transition-all duration-300"
                  data-cursor="Email"
                >
                  Get in Touch
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >→</motion.span>
                </a>
                <a
                  href="/projects"
                  className="inline-flex items-center justify-center gap-3 border border-white/20 px-9 py-4 text-[11px] uppercase tracking-[0.28em] font-bold text-white/60 hover:border-primary hover:text-primary transition-all duration-300"
                  data-cursor="See Work"
                >
                  See My Work
                </a>
           
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}