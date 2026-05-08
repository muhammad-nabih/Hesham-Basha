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

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const shouldShow = priority || inView

  const variants = {
    hidden: {
      opacity: 0,
      clipPath: 'inset(0 100% 0 0)',
    },
    visible: {
      opacity: 1,
      clipPath: 'inset(0 0 0 0)',
      transition: {
        duration: 1,
        ease: [0.33, 0.66, 0.66, 1],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={shouldShow ? 'visible' : 'hidden'}
      variants={variants}
      className={`overflow-hidden ${className}`}
    >
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
