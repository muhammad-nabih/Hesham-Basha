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
        <section className="border-b border-border py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
                About Me
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                A passionate creative designer with a focus on crafting meaningful visual experiences for brands worldwide.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Bio Section */}
        <section className="py-16 lg:py-20 border-b border-border">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
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
        <section className="py-16 lg:py-20 border-b border-border">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
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
                  className="bg-muted p-4 rounded-none text-sm text-center font-medium"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-16 lg:py-20 border-b border-border">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
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
                  className="border border-border p-4 rounded-none text-sm text-center font-medium hover:bg-muted transition-colors"
                >
                  {tool}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-16 lg:py-20 border-b border-border">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
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
                  className="border-l-2 border-muted pl-6"
                >
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    {exp.year}
                  </p>
                  <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
                  <p className="text-sm text-accent mb-3">{exp.company}</p>
                  <p className="text-muted-foreground">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
                Ready to Collaborate?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let&apos;s work together on your next project. Reach out and let&apos;s create something amazing.
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
      </main>

      <Footer />
    </>
  )
}
