'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface ImageRevealProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
}

export function ImageReveal({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  sizes,
}: ImageRevealProps) {
  const safeSrc = src && src.trim().length > 0 ? src : '/placeholder.svg'
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })
  const shouldShow = priority || inView

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      animate={shouldShow ? { clipPath: 'inset(0% 0% 0% 0%)' } : {}}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
      className={`overflow-hidden ${className}`}
    >
      {/* Scan-line overlay that wipes across on reveal */}
      <motion.div
        initial={{ y: '0%', opacity: 1 }}
        animate={shouldShow ? { y: '-100%', opacity: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-10 bg-primary pointer-events-none"
      />

      {fill ? (
        <Image
          src={safeSrc}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          priority={priority}
        />
      ) : (
        <Image
          src={safeSrc}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-cover"
          priority={priority}
        />
      )}
    </motion.div>
  )
}