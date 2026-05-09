'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────
interface AuraOrb {
  id: number
  x: number
  y: number
  size: number
  hue: number   // slight hue variation around orange #ff4800
  delay: number
}

interface CursorState {
  hovering: boolean
  clicking: boolean
  label: string
}

// ─── Brand palette ─────────────────────────────────────────────────────────────
// Primary: #ff4800  |  Dark: #000000  |  Light: #f9f9f9 / #e7e7e3
const AURA_COLORS = [
  'rgba(255, 72,   0, 0.55)', // #ff4800 core
  'rgba(255, 100, 20, 0.40)', // warm orange
  'rgba(255, 140, 40, 0.28)', // amber tint
  'rgba(255,  52,  0, 0.35)', // deep orange
  'rgba(255, 72,   0, 0.18)', // ghost
]

// ─── Ghost Dot – extracted so hooks are NOT inside .map() ─────────────────────
interface GhostDotProps {
  mouseX: ReturnType<typeof useMotionValue<number>>
  mouseY: ReturnType<typeof useMotionValue<number>>
  stiffness: number
  damping: number
  size: number
  opacity: number
  visible: boolean
}

function GhostDot({ mouseX, mouseY, stiffness, damping, size, opacity, visible }: GhostDotProps) {
  const gx = useSpring(mouseX, { stiffness, damping })
  const gy = useSpring(mouseY, { stiffness, damping })
  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9997] rounded-full"
      style={{
        x: gx,
        y: gy,
        translateX: '-50%',
        translateY: '-50%',
        width: size,
        height: size,
        opacity: visible ? opacity : 0,
        background: '#ff4800',
      }}
    />
  )
}

// ─── Aura Orb – fading glow blob that spawns on move ─────────────────────────
function AuraOrb({ x, y, size, hue }: { x: number; y: number; size: number; hue: number }) {
  // hue offset maps to a slight color variation
  const alpha = 0.3 + Math.random() * 0.25
  const color = `hsla(${17 + hue}, 100%, 50%, ${alpha})`
  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 rounded-full z-[9996]"
      style={{
        x: x - size / 2,
        y: y - size / 2,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(6px)',
      }}
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 0, scale: 1.8 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    />
  )
}

// ─── Main Cursor ──────────────────────────────────────────────────────────────
export function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [cursorState, setCursorState] = useState<CursorState>({
    hovering: false,
    clicking: false,
    label: '',
  })
  const [auraOrbs, setAuraOrbs] = useState<AuraOrb[]>([])
  const [visible, setVisible] = useState(false)

  const orbIdRef = useRef(0)
  const lastOrbTime = useRef(0)

  // ── Motion values ───────────────────────────────────────────────────────────
  const mouseX = useMotionValue(-300)
  const mouseY = useMotionValue(-300)

  // Dot: snappy
  const dotX = useSpring(mouseX, { stiffness: 900, damping: 45, mass: 0.3 })
  const dotY = useSpring(mouseY, { stiffness: 900, damping: 45, mass: 0.3 })

  // Ring: lags
  const ringX = useSpring(mouseX, { stiffness: 160, damping: 28, mass: 0.8 })
  const ringY = useSpring(mouseY, { stiffness: 160, damping: 28, mass: 0.8 })

  // ── Spawn aura orb ──────────────────────────────────────────────────────────
  const spawnOrb = useCallback((x: number, y: number) => {
    const now = Date.now()
    if (now - lastOrbTime.current < 40) return // ~25fps throttle
    lastOrbTime.current = now

    const id = orbIdRef.current++
    const size = Math.random() * 32 + 20       // 20–52px glow blob
    const hue = (Math.random() - 0.5) * 30     // ±15° hue shift around orange
    const offset = () => (Math.random() - 0.5) * 10

    setAuraOrbs((prev) => [
      ...prev.slice(-24),
      { id, x: x + offset(), y: y + offset(), size, hue, delay: 0 },
    ])

    setTimeout(() => {
      setAuraOrbs((prev) => prev.filter((o) => o.id !== id))
    }, 950)
  }, [])

  // ── Mouse events ────────────────────────────────────────────────────────────
  useEffect(() => {
    setMounted(true)

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
      spawnOrb(e.clientX, e.clientY)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)
    const onDown  = () => setCursorState((s) => ({ ...s, clicking: true }))
    const onUp    = () => setCursorState((s) => ({ ...s, clicking: false }))

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor]',
      )
      if (interactive) {
        const label = (interactive as HTMLElement).dataset.cursor || ''
        setCursorState((s) => ({ ...s, hovering: true, label }))
      } else {
        setCursorState((s) => ({ ...s, hovering: false, label: '' }))
      }
    }

    window.addEventListener('mousemove',  onMove,  { passive: true })
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('mouseenter', onEnter)
    window.addEventListener('mousedown',  onDown)
    window.addEventListener('mouseup',    onUp)
    window.addEventListener('mouseover',  onOver,  { passive: true })

    return () => {
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mousedown',  onDown)
      window.removeEventListener('mouseup',    onUp)
      window.removeEventListener('mouseover',  onOver)
    }
  }, [mouseX, mouseY, spawnOrb, visible])

  if (!mounted) return null

  const { hovering, clicking, label } = cursorState
  const ringSize = hovering ? 58 : 38
  const dotSize  = clicking ? 4 : hovering ? 6 : 8

  // Ghost trail config – extracted so hooks live in <GhostDot> component, not .map()
  const ghostConfig = [
    { stiffness: 420, damping: 36, size: 5, opacity: 0.38 },
    { stiffness: 260, damping: 30, size: 3.5, opacity: 0.22 },
    { stiffness: 150, damping: 25, size: 2.5, opacity: 0.12 },
  ]

  return (
    <>
      {/* Hide default OS cursor */}
      <style>{`* { cursor: none !important; }`}</style>

      {/* ── Aura orbs (glow trail) ── */}
      <AnimatePresence>
        {auraOrbs.map((orb) => (
          <AuraOrb key={orb.id} x={orb.x} y={orb.y} size={orb.size} hue={orb.hue} />
        ))}
      </AnimatePresence>

      {/* ── Follower ring ── */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: visible ? 1 : 0,
          width: ringSize,
          height: ringSize,
        }}
        transition={{
          opacity: { duration: 0.3 },
          width:  { type: 'spring', stiffness: 300, damping: 30 },
          height: { type: 'spring', stiffness: 300, damping: 30 },
        }}
      >
        {/* Ring border */}
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          animate={{
            borderColor: hovering ? '#ff4800' : 'rgba(255,72,0,0.45)',
            scale: clicking ? 0.8 : 1,
            boxShadow: hovering
              ? '0 0 18px 4px rgba(255,72,0,0.35)'
              : '0 0 8px 1px rgba(255,72,0,0.15)',
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Orange fill on hover */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,72,0,0.18) 0%, transparent 80%)' }}
          animate={{ opacity: hovering ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />

        {/* Label */}
        <AnimatePresence>
          {hovering && label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="text-[8px] uppercase tracking-[0.2em] font-bold whitespace-nowrap"
              style={{ color: '#ff4800' }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Inner dot ── */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          background: '#ff4800',
          boxShadow: '0 0 10px 3px rgba(255,72,0,0.6)',
        }}
        animate={{
          opacity: visible ? 1 : 0,
          width: dotSize,
          height: dotSize,
        }}
        transition={{
          opacity: { duration: 0.3 },
          width:  { type: 'spring', stiffness: 600, damping: 30 },
          height: { type: 'spring', stiffness: 600, damping: 30 },
        }}
      />

      {/* ── Ghost trail dots – hooks live INSIDE <GhostDot>, NOT in .map() ── */}
      {ghostConfig.map((g, i) => (
        <GhostDot
          key={i}
          mouseX={mouseX}
          mouseY={mouseY}
          stiffness={g.stiffness}
          damping={g.damping}
          size={g.size}
          opacity={g.opacity}
          visible={visible}
        />
      ))}
    </>
  )
}