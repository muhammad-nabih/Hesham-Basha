'use client'

import { Navigation } from '@/components/common/Navigation'
import { Footer } from '@/components/common/Footer'
import { motion } from 'framer-motion'

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
      year: '2022-Present',
      title: 'Creative Designer',
      company: 'Freelance',
      description: 'Specializing in advertising campaigns, branding, and digital design for regional and international clients.',
    },
    {
      year: '2021-2022',
      title: 'Junior Designer',
      company: 'Design Studio',
      description: 'Worked on various design projects including campaigns, social media, and print materials.',
    },
  ]

  return (
    <>
      <Navigation />

      <main className="pt-24">
        {/* Page Header */}
        <section className="border-b border-white/10 bg-brand-black text-white py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-accent text-xs uppercase tracking-[0.28em] text-primary mb-5">
                Profile
              </p>
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance text-white">
                About Me
              </h1>
              <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
                A passionate creative designer with a focus on crafting meaningful visual experiences
                for brands worldwide.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Bio Section */}
        <section className="py-16 lg:py-20 border-b border-border bg-offwhite">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-accent text-xs uppercase tracking-[0.28em] text-primary mb-3">
                Narrative
              </p>
              <h2 className="text-3xl font-bold tracking-tight mb-6">My Story</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I&apos;m Hesham Basha, a creative designer based in Cairo, Egypt with over 2 years of experience
                  creating compelling visual designs. My journey in design began with a passion for storytelling
                  through visual communication, which has evolved into a career focused on delivering exceptional
                  design solutions for brands.
                </p>
                <p>
                  My work spans across advertising campaigns, brand identity development, social media design, and
                  print materials. I specialize in transforming complex brand concepts into visually striking designs
                  that resonate with target audiences. I take pride in understanding client visions and translating
                  them into designs that not only look beautiful but also achieve business objectives.
                </p>
                <p>
                  With a strong foundation in design principles and a keen eye for detail, I consistently deliver
                  work that stands out. Whether it&apos;s a financial campaign, national holidays branding, or corporate
                  design systems, I approach every project with the same level of dedication and creativity.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-16 lg:py-20 border-b border-border bg-surface">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <p className="font-accent text-xs uppercase tracking-[0.28em] text-primary mb-3">
                Expertise
              </p>
              <h2 className="text-3xl font-bold tracking-tight">Core Competencies</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.map((skill, idx) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  className="rounded-xl border border-border/90 bg-offwhite p-4 text-sm text-center font-medium shadow-sm transition-interactive hover:border-primary/40"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-16 lg:py-20 border-b border-border bg-offwhite">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <p className="font-accent text-xs uppercase tracking-[0.28em] text-primary mb-3">
                Stack
              </p>
              <h2 className="text-3xl font-bold tracking-tight">Tools & Software</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {tools.map((tool, idx) => (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  className="rounded-xl border border-border bg-card p-4 text-sm text-center font-medium transition-interactive hover:border-primary/50 hover:bg-offwhite"
                >
                  {tool}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-16 lg:py-20 border-b border-border bg-surface">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <p className="font-accent text-xs uppercase tracking-[0.28em] text-primary mb-3">
                Timeline
              </p>
              <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
            </motion.div>

            <div className="space-y-12">
              {experience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="border-l-2 border-primary pl-6"
                >
                  <p className="font-accent text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    {exp.year}
                  </p>
                  <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
                  <p className="text-sm font-medium text-primary mb-3">{exp.company}</p>
                  <p className="text-muted-foreground">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-brand-black text-white border-t border-white/10">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-accent text-xs uppercase tracking-[0.28em] text-primary mb-4">
                Next step
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6 text-balance">
                Ready to Collaborate?
              </h2>
              <p className="text-lg text-white/70 mb-10 leading-relaxed">
                Let&apos;s work together on your next project. Reach out and let&apos;s create
                something amazing.
              </p>
              <a
                href="mailto:contact@example.com"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3.5 text-sm uppercase tracking-widest font-semibold text-white shadow-sm transition-interactive hover:bg-brand-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
