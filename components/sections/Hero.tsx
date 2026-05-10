'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef, useState, useCallback } from 'react'

// ─── Split text character by character ──────────────────────────────────────
function SplitChars({
  text,
  delay = 0,
  className,
}: {
  text: string
  delay?: number
  className?: string
}) {
  return (
    <span aria-label={text} className={className}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', lineHeight: '0.95em', verticalAlign: 'top' }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '105%' }}
            animate={{ y: '0%' }}
            transition={{
              delay: delay + i * 0.038,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// ─── Line reveal wrapper ─────────────────────────────────────────────────────
function LineReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ delay, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// ─── Magnetic button ─────────────────────────────────────────────────────────
function MagneticButton({
  href,
  children,
  variant = 'primary',
}: {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'outline'
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 350, damping: 25 })
  const springY = useSpring(y, { stiffness: 350, damping: 25 })

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect()
      if (!rect) return
      x.set((e.clientX - rect.left - rect.width / 2) * 0.3)
      y.set((e.clientY - rect.top - rect.height / 2) * 0.3)
    },
    [x, y],
  )

  const handleLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  const base =
    'group relative inline-flex items-center justify-center gap-3 px-9 py-4 text-[11px] uppercase tracking-[0.28em] font-bold transition-colors duration-300 select-none cursor-pointer overflow-hidden'
  const styles = {
    primary: `${base} bg-primary text-white hover:bg-white hover:text-black`,
    outline: `${base} border border-white/25 text-white/70 hover:border-primary hover:text-primary`,
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      className={styles[variant]}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  )
}

// ─── Marquee ─────────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  'Brand Identity',
  'Visual Design',
  'Motion Graphics',
  'UI/UX Design',
  'Typography',
  'Art Direction',
  'Logo Design',
  'Campaign Design',
]

function MarqueeTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-flex"
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-5 px-6">
            <span className="text-[10px] uppercase tracking-[0.32em] text-white/35 font-medium">
              {item}
            </span>
            <span className="text-primary text-[8px]">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Brand Visual ─────────────────────────────────────────────────────────────
function HeroBrandVisual() {
  return (
    <div className="relative w-full h-full">
      {/* Subtle background grid */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 480 580"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="hb-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#ffffff" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="480" height="580" fill="url(#hb-grid)" opacity="0.08" />
      </svg>

      <svg
        className="relative w-full h-full"
        viewBox="0 0 480 580"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* ── Large orange slab ── */}
        <motion.rect
          x="48"
          y="48"
          width="288"
          height="336"
          fill="#ff4800"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.55, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: '192px 384px' }}
        />

        {/* ── Inner black window ── */}
        <motion.rect
          x="80"
          y="82"
          width="220"
          height="268"
          fill="#0a0a0a"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
        />

        {/* ── HB monogram ── */}
        <motion.text
          x="190"
          y="262"
          textAnchor="middle"
          fontFamily="'Bricolage Grotesque', sans-serif"
          fontSize="130"
          fontWeight="900"
          fill="#ff4800"
          letterSpacing="-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          HB
        </motion.text>

        {/* ── Right circle ring ── */}
        <motion.circle
          cx="390"
          cy="110"
          r="66"
          fill="none"
          stroke="#ff4800"
          strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: '390px 110px' }}
        />
        <motion.circle
          cx="390"
          cy="110"
          r="44"
          fill="#ff4800"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.12 }}
          transition={{ delay: 0.85, duration: 0.75 }}
          style={{ transformOrigin: '390px 110px' }}
        />
        <motion.circle
          cx="390"
          cy="110"
          r="6"
          fill="#ff4800"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.0, duration: 0.4 }}
          style={{ transformOrigin: '390px 110px' }}
        />

        {/* ── Bottom horizontal rule ── */}
        <motion.rect
          x="48"
          y="414"
          width="384"
          height="3"
          fill="#ff4800"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.0, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: '48px 415px' }}
        />

        {/* ── Small square clusters ── */}
        <motion.rect
          x="48"
          y="424"
          width="18"
          height="18"
          fill="#ff4800"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.15, duration: 0.35 }}
          style={{ transformOrigin: '57px 433px' }}
        />
        <motion.rect
          x="72"
          y="424"
          width="18"
          height="18"
          fill="none"
          stroke="#ff4800"
          strokeWidth="1.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.22, duration: 0.35 }}
          style={{ transformOrigin: '81px 433px' }}
        />
        <motion.rect
          x="414"
          y="424"
          width="18"
          height="18"
          fill="#ff4800"
          opacity={0.4}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.28, duration: 0.35 }}
          style={{ transformOrigin: '423px 433px' }}
        />

        {/* ── Corner registration marks ── */}
        {[
          { x1: 48, y1: 58, x2: 70, y2: 58, x3: 48, y3: 58, x4: 48, y4: 80 },
          { x1: 336, y1: 58, x2: 314, y2: 58, x3: 336, y3: 58, x4: 336, y4: 80 },
          { x1: 48, y1: 384, x2: 70, y2: 384, x3: 48, y3: 384, x4: 48, y4: 362 },
          { x1: 336, y1: 384, x2: 314, y2: 384, x3: 336, y3: 384, x4: 336, y4: 362 },
        ].map((m, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.06, duration: 0.4 }}
          >
            <line x1={m.x1} y1={m.y1} x2={m.x2} y2={m.y2} stroke="#ff4800" strokeWidth="1.5" />
            <line x1={m.x3} y1={m.y3} x2={m.x4} y2={m.y4} stroke="#ff4800" strokeWidth="1.5" />
          </motion.g>
        ))}

        {/* ── Diagonal accent ── */}
        <motion.line
          x1="370"
          y1="200"
          x2="435"
          y2="390"
          stroke="#ff4800"
          strokeWidth="1"
          strokeDasharray="4 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ delay: 1.2, duration: 1.0 }}
        />

        {/* ── Studio label ── */}
        <motion.text
          x="192"
          y="530"
          textAnchor="middle"
          fontFamily="monospace"
          fontSize="9"
          fill="#ffffff"
          letterSpacing="7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          CREATIVE STUDIO · CAIRO
        </motion.text>

        {/* ── Scan-line animation across slab ── */}
        <motion.rect
          x="48"
          y="48"
          width="288"
          height="2"
          fill="white"
          opacity={0.15}
          initial={{ y: 48 }}
          animate={{ y: [48, 384, 48] }}
          transition={{ delay: 1.8, duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>

      {/* Pulsing dot */}
      <motion.div
        className="absolute top-6 right-6 w-2.5 h-2.5 rounded-full bg-primary"
        animate={{ scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating mini label */}
      <motion.div
        className="absolute bottom-14 right-0 flex items-center gap-2"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">Portfolio 2025</span>
      </motion.div>
    </div>
  )
}

// ─── Cursor glow ──────────────────────────────────────────────────────────────
function CursorGlow() {
  const cursorX = useMotionValue(-200)
  const cursorY = useMotionValue(-200)
  const springX = useSpring(cursorX, { stiffness: 80, damping: 20 })
  const springY = useSpring(cursorY, { stiffness: 80, damping: 20 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: 'radial-gradient(600px circle at var(--cx) var(--cy), rgba(255,72,0,0.06), transparent 60%)',
      }}
    >
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgba(255,72,0,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function Hero() {
  const stats = [
    { value: '50+', label: 'Projects' },
    { value: '2+', label: 'Years' },
    { value: '20+', label: 'Clients' },
  ]

  return (
    <section className="relative min-h-screen flex flex-col bg-brand-black text-white overflow-hidden border-b border-white/10">
      {/* Cursor ambient glow */}
      <CursorGlow />

      {/* Grain texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
        }}
      />

      {/* Main content */}
      <div className="relative z-20 flex flex-col lg:flex-row flex-1 max-w-[1400px] mx-auto w-full px-6 lg:px-16 xl:px-20 pt-28 lg:pt-36 pb-12 gap-10 lg:gap-6">
        {/* ── Left: text ── */}
        <div className="flex flex-col justify-center lg:w-[54%]">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 mb-10 lg:mb-14"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left' }}
              className="w-10 h-px bg-primary"
            />
            <span className="font-accent text-[10px] uppercase tracking-[0.32em] text-primary">
              Creative Studio · Cairo
            </span>
          </motion.div>

          {/* Headline — char by char */}
          <h1 className="mb-8 lg:mb-12 font-bold leading-[0.9] tracking-[-0.025em]">
            <div className="text-[clamp(3.5rem,9vw,8rem)] mb-1">
              <SplitChars text="Hesham" delay={0.2} />
            </div>
            <div className="text-[clamp(3.5rem,9vw,8rem)] text-primary">
              <SplitChars text="Basha" delay={0.36} />
            </div>
          </h1>

          {/* Tagline */}
          <div className="mb-10 lg:mb-14">
            <LineReveal delay={0.9}>
              <p className="text-base lg:text-lg text-white/55 max-w-[420px] leading-[1.75]">
                Crafting bold visual systems and meaningful brand identities that leave a lasting impression on brands worldwide.
              </p>
            </LineReveal>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4 mb-14 lg:mb-20"
          >
            <MagneticButton href="/projects" variant="primary">
              View My Work
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block"
              >
                →
              </motion.span>
            </MagneticButton>
            <MagneticButton href="/about" variant="outline">
              About Me
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25, duration: 0.6 }}
            className="flex gap-10 pt-8 border-t border-white/[0.08]"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.35 + i * 0.1, duration: 0.55 }}
              >
                <p className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">{s.value}</p>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/35 mt-1.5">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: brand visual ── */}
        <div className="lg:w-[46%] flex items-center justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ delay: 0.42, duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[460px] aspect-[4/5]"
          >
            <HeroBrandVisual />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="relative z-20 hidden lg:flex flex-col items-center gap-2 pb-8"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-[0.35em] text-white/30">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Marquee ticker bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.55, duration: 0.5 }}
        className="relative z-20 border-t border-white/[0.07] py-3.5"
      >
        <MarqueeTicker />
      </motion.div>
    </section>
  )
}