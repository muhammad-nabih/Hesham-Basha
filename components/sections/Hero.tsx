'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function Hero() {
  const words = ['Creative', 'Designer']
  const tagline = 'Crafting meaningful visual experiences for brands worldwide'

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        // `framer-motion`'s TS types for `ease` don't like the cubic-bezier `number[]` form
        // in `variants` for this project configuration. Cast to keep the intended curve.
        ease: [0.33, 0.66, 0.66, 1] as any,
      },
    },
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-8 pt-20 pb-20">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-5xl w-full"
      >
        {/* Main Heading */}
        <div className="mb-8 lg:mb-12">
          <motion.div variants={item} className="flex flex-col">
            <span className="text-sm lg:text-base uppercase tracking-widest text-muted-foreground mb-4 block">
              Welcome to my creative studio
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-balance">
              {words.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3 + i * 0.2,
                    duration: 0.8,
                    ease: [0.33, 0.66, 0.66, 1] as any,
                  }}
                  className="block"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="text-lg lg:text-xl text-muted-foreground mb-12 lg:mb-16 max-w-2xl leading-relaxed text-pretty"
        >
          {tagline}
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 text-sm uppercase tracking-wider font-semibold hover:opacity-80 transition-opacity"
          >
            View My Work
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center border border-foreground text-foreground px-8 py-4 text-sm uppercase tracking-wider font-semibold hover:bg-foreground hover:text-background transition-all"
          >
            Learn About Me
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.2,
          duration: 0.8,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
          <svg
            className="w-5 h-5 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
