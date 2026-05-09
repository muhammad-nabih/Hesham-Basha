'use client'

import Image from 'next/image'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useRef, useState, useCallback, useEffect, useMemo } from 'react'
import { urlFor } from '@/lib/sanity'

// ─── Types ────────────────────────────────────────────────────────────────────
type GalleryItem = {
  image?: { asset?: any }
  alt?: string
  caption?: string
}

// ─── Seeded pseudo-random ─────────────────────────────────────────────────────
// Deterministic → identical output on server and client = no hydration mismatch
function seededRand(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

// ─── Void Particles ───────────────────────────────────────────────────────────
function VoidParticles() {
  const particles = useMemo(() => {
    const r = seededRand(42)
    return Array.from({ length: 38 }, (_, i) => ({
      id: i,
      x: r() * 100,
      y: r() * 100,
      size: r() * 1.8 + 0.5,
      duration: r() * 8 + 6,
      delay: r() * 5,
      opacity: r() * 0.22 + 0.04,
      orange: i % 4 === 0,
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.orange ? '#ff4800' : '#ffffff',
            opacity: p.opacity,
          }}
          animate={{ y: [0, -28, 0], opacity: [p.opacity, Math.min(p.opacity * 2.2, 0.5), p.opacity] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  item, index, total, onClose, onPrev, onNext,
}: {
  item: GalleryItem; index: number; total: number
  onClose: () => void; onPrev: () => void; onNext: () => void
}) {
  if (!item) return null
  const src = item.image?.asset
    ? urlFor(item.image).width(2000).auto('format').quality(90).url()
    : '/placeholder.svg'

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[9990] flex flex-col"
      style={{ background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.012) 2px,rgba(255,255,255,0.012) 4px)' }} />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-8 py-5 shrink-0"
        style={{ borderBottom: '1px solid rgba(255,72,0,0.15)' }}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ff4800] animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.35em] text-white/30">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
        {item.caption && (
          <span className="text-[10px] uppercase tracking-[0.28em] text-white/35">{item.caption}</span>
        )}
        <button onClick={onClose} data-cursor="Close"
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-white/35 hover:text-[#ff4800] transition-colors font-semibold">
          <motion.span className="inline-block" whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>✕</motion.span>
          <span>Close</span>
        </button>
      </div>

      {/* Image */}
      <div className="flex-1 relative z-10" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.div key={index}
            initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-4 lg:inset-12">
            <Image src={src} alt={item.alt || `Image ${index + 1}`} fill className="object-contain" sizes="100vw" priority />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom nav */}
      <div className="relative z-10 flex items-center justify-between px-8 py-5 shrink-0"
        style={{ borderTop: '1px solid rgba(255,72,0,0.15)' }}
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onPrev} data-cursor="Prev"
          className="text-[10px] uppercase tracking-[0.28em] text-white/35 hover:text-[#ff4800] transition-colors font-semibold">← Prev</button>
        <div className="flex gap-2 items-center">
          {Array.from({ length: total }).map((_, i) => (
            <motion.div key={i}
              animate={{ width: i === index ? 24 : 6, background: i === index ? '#ff4800' : 'rgba(255,255,255,0.2)' }}
              transition={{ duration: 0.3 }} className="h-0.5 rounded-full" />
          ))}
        </div>
        <button onClick={onNext} data-cursor="Next"
          className="text-[10px] uppercase tracking-[0.28em] text-white/35 hover:text-[#ff4800] transition-colors font-semibold">Next →</button>
      </div>
    </motion.div>
  )
}

// ─── Void Card ────────────────────────────────────────────────────────────────
function VoidCard({ item, index, position, onClick }: {
  item: GalleryItem; index: number
  position: { x: number; y: number; z: number; scale: number }
  onClick: () => void
}) {
  if (!item) return null
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const sRotX = useSpring(rotX, { stiffness: 200, damping: 30 })
  const sRotY = useSpring(rotY, { stiffness: 200, damping: 30 })

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    rotX.set(-((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * 12)
    rotY.set(((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * 12)
  }, [rotX, rotY])

  const onLeave = useCallback(() => { rotX.set(0); rotY.set(0); setHovered(false) }, [rotX, rotY])

  const src = item.image?.asset ? urlFor(item.image).width(900).auto('format').quality(85).url() : '/placeholder.svg'
  const cardW = position.scale > 1.1 ? 380 : position.scale > 0.9 ? 300 : 220
  const imgH  = position.scale > 1.1 ? 280 : position.scale > 0.9 ? 220 : 160

  return (
    <motion.div ref={cardRef} className="absolute cursor-pointer select-none"
      style={{
        width: cardW, left: `${position.x}%`, top: `${position.y}%`,
        zIndex: Math.round(position.z * 10) + 10,
        translateX: '-50%', translateY: '-50%',
        rotateY: sRotY, rotateX: sRotX,
        transformStyle: 'preserve-3d', perspective: 800,
      }}
      initial={{ opacity: 0, scale: 0.6, filter: 'blur(12px)' }}
      animate={{
        opacity: position.z > 0.4 ? 1 : 0.5,
        scale: position.scale,
        filter: position.z > 0.6 ? 'blur(0px)' : `blur(${(1 - position.z) * 2}px)`,
      }}
      transition={{ delay: index * 0.07, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: position.scale * 1.06, zIndex: 50 }}
      onMouseMove={onMove} onMouseLeave={onLeave}
      onHoverStart={() => setHovered(true)} onClick={onClick} data-cursor="View"
    >
      <div className="relative overflow-hidden" style={{
        background: '#0a0a0a',
        border: hovered ? '1px solid rgba(255,72,0,0.6)' : '1px solid rgba(255,255,255,0.07)',
        boxShadow: hovered
          ? '0 0 40px 8px rgba(255,72,0,0.2),0 30px 80px rgba(0,0,0,0.8)'
          : '0 20px 60px rgba(0,0,0,0.7)',
        transition: 'border 0.3s,box-shadow 0.3s',
      }}>
        <div style={{ height: imgH, position: 'relative' }}>
          <Image src={src} alt={item.alt || `Image ${index + 1}`} fill className="object-cover" sizes="400px" />
          <motion.div className="absolute inset-0 pointer-events-none z-10"
            style={{ background: 'linear-gradient(180deg,rgba(255,72,0,0.18) 0%,transparent 100%)' }}
            animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }} />
          {position.z < 0.5 && (
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `rgba(0,0,0,${(1 - position.z) * 0.4})` }} />
          )}
        </div>
        <div className="flex items-center justify-between px-3 py-2.5"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="text-[9px] font-mono tracking-[0.3em] text-white/30">{String(index + 1).padStart(2, '0')}</span>
          {item.caption && (
            <span className="text-[8px] uppercase tracking-[0.22em] text-white/25 truncate max-w-[120px]">{item.caption}</span>
          )}
          <motion.span className="text-[9px] font-semibold"
            animate={{ color: hovered ? '#ff4800' : 'rgba(255,255,255,0.2)' }} transition={{ duration: 0.2 }}>↗</motion.span>
        </div>
      </div>
      <div className="absolute left-0 right-0 pointer-events-none" style={{
        top: '100%', height: 60,
        background: 'linear-gradient(180deg,rgba(255,255,255,0.04) 0%,transparent 100%)',
        transform: 'scaleY(-1)', filter: 'blur(4px)',
        opacity: hovered ? 0.6 : 0.22, transition: 'opacity 0.3s',
      }} />
    </motion.div>
  )
}

// ─── Void Scene ───────────────────────────────────────────────────────────────
function VoidScene({ items, onOpenLightbox }: { items: GalleryItem[]; onOpenLightbox: (i: number) => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotY = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const rotX = useSpring(mouseY, { stiffness: 50, damping: 20 })

  const onMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 12)
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * -8)
  }, [mouseX, mouseY])

  // Deterministic positions — identical on SSR and client
  const positions = useMemo(() =>
    items.map((_, i) => {
      const r = seededRand(i * 7 + 13)
      const angle = (i / Math.max(items.length, 1)) * Math.PI * 2 + r() * 0.5
      const radius = 22 + (i % 3) * 14
      const x = 50 + Math.cos(angle) * radius + (r() - 0.5) * 8
      const y = 18 + (i * 17 + r() * 10) % 64
      const z = 0.38 + r() * 0.6
      return { x, y, z, scale: 0.65 + z * 0.68 }
    }),
    [items],
  )

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden"
      style={{ height: 'clamp(600px,90vh,1000px)', background: 'radial-gradient(ellipse at 50% 40%,#0d0d0d 0%,#000 100%)', perspective: '1200px', cursor: 'crosshair' }}
      onMouseMove={onMove} onMouseLeave={() => { mouseX.set(0); mouseY.set(0) }}>

      <VoidParticles />

      {/* Floor grid */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
        height: '35%',
        background: 'linear-gradient(rgba(255,72,0,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,72,0,0.06) 1px,transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'linear-gradient(180deg,transparent 0%,black 60%)',
        transform: 'perspective(400px) rotateX(60deg)', transformOrigin: 'bottom',
      }} />

      {/* Horizon */}
      <div className="absolute pointer-events-none" style={{
        bottom: '28%', left: '8%', right: '8%', height: 1,
        background: 'linear-gradient(90deg,transparent,rgba(255,72,0,0.3),transparent)', filter: 'blur(2px)',
      }} />

      <motion.div className="absolute inset-0" style={{ rotateY: rotY, rotateX: rotX, transformStyle: 'preserve-3d' }}>
        {items.map((item, i) => item
          ? <VoidCard key={i} item={item} index={i} position={positions[i]} onClick={() => onOpenLightbox(i)} />
          : null
        )}
      </motion.div>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,0.72) 100%)' }} />

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.8 }}>
        <span className="text-[8px] uppercase tracking-[0.28em] text-white/20">Move mouse · click to expand</span>
      </motion.div>
    </div>
  )
}

// ─── Film Strip ───────────────────────────────────────────────────────────────
function FilmStrip({ items, activeIndex, onSelect }: {
  items: GalleryItem[]; activeIndex: number | null; onSelect: (i: number) => void
}) {
  const holes = Array.from({ length: 55 })
  const holeStyle: React.CSSProperties = { width: 14, height: 8, marginRight: 14, background: 'rgba(255,255,255,0.04)', borderRadius: 2, marginTop: 2 }

  return (
    <div className="relative overflow-x-auto" style={{ background: '#050505', borderTop: '1px solid rgba(255,72,0,0.12)' }}>
      <div className="absolute top-0 left-0 right-0 h-3 flex overflow-hidden pointer-events-none">
        {holes.map((_, i) => <div key={i} className="shrink-0" style={holeStyle} />)}
      </div>

      <div className="flex gap-3 px-6 pt-6 pb-4" style={{ width: 'max-content' }}>
        {items.map((item, i) => {
          if (!item) return null
          const src = item.image?.asset ? urlFor(item.image).width(200).auto('format').quality(70).url() : '/placeholder.svg'
          const active = activeIndex === i
          return (
            <motion.button key={i} onClick={() => onSelect(i)} className="relative shrink-0 overflow-hidden"
              style={{ width: 90, height: 60, border: active ? '1px solid #ff4800' : '1px solid rgba(255,255,255,0.07)', boxShadow: active ? '0 0 12px rgba(255,72,0,0.4)' : 'none', transition: 'border 0.2s,box-shadow 0.2s' }}
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <Image src={src} alt={item.alt || `Thumb ${i + 1}`} fill className="object-cover" sizes="90px" />
              <div className="absolute inset-0" style={{ background: active ? 'rgba(255,72,0,0.15)' : 'rgba(0,0,0,0.35)', transition: 'background 0.2s' }} />
              <span className="absolute bottom-1 right-1 text-[7px] font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>{String(i + 1).padStart(2, '0')}</span>
            </motion.button>
          )
        })}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-3 flex overflow-hidden pointer-events-none">
        {holes.map((_, i) => <div key={i} className="shrink-0" style={holeStyle} />)}
      </div>
    </div>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export function ImmersiveGallery({ items }: { items: GalleryItem[] }) {
  const safeItems = (items || []).filter(Boolean)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = useCallback((i: number) => { if (safeItems[i]) setLightboxIndex(i) }, [safeItems])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevImage = useCallback(() => setLightboxIndex((i) => i === null ? null : (i - 1 + safeItems.length) % safeItems.length), [safeItems.length])
  const nextImage = useCallback(() => setLightboxIndex((i) => i === null ? null : (i + 1) % safeItems.length), [safeItems.length])

  if (safeItems.length === 0) return null

  return (
    <>
      <AnimatePresence>
        {lightboxIndex !== null && safeItems[lightboxIndex] && (
          <Lightbox item={safeItems[lightboxIndex]} index={lightboxIndex} total={safeItems.length}
            onClose={closeLightbox} onPrev={prevImage} onNext={nextImage} />
        )}
      </AnimatePresence>

      <section style={{ background: '#000' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 py-12"
          style={{ borderBottom: '1px solid rgba(255,72,0,0.1)' }}>
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: '#ff4800' }}
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                <span className="text-[10px] uppercase tracking-[0.35em] font-semibold" style={{ color: '#ff4800' }}>Gallery</span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-black tracking-[-0.03em]" style={{ color: '#f9f9f9' }}>The Void Gallery</h2>
              <p className="text-[11px] uppercase tracking-[0.28em] mt-2" style={{ color: 'rgba(255,255,255,0.2)' }}>Suspended in space — move to explore</p>
            </div>
            <span className="text-[10px] font-mono tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>
              {String(safeItems.length).padStart(2, '0')} Visuals
            </span>
          </div>
        </div>

        <VoidScene items={safeItems} onOpenLightbox={openLightbox} />
        <FilmStrip items={safeItems} activeIndex={lightboxIndex} onSelect={openLightbox} />
      </section>
    </>
  )
}