'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'

import { BrandLogo } from '@/components/common/BrandLogo'
import { cn } from '@/lib/utils'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)
  const pathname = usePathname()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const diff = latest - lastScrollY.current
    setScrolled(latest > 40)
    // Hide nav on scroll down, show on scroll up
    if (latest > 120) {
      setHidden(diff > 0)
    } else {
      setHidden(false)
    }
    lastScrollY.current = latest
  })

  const navLinks = [
    { label: 'Work', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '#contact' },
  ]

  const linkActive = (href: string) => {
    if (href.startsWith('#')) return false
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <>
      <motion.nav
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-white/[0.08] bg-brand-black/90 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 py-4 flex items-center justify-between gap-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <BrandLogo inverted />
          </motion.div>

          {/* Desktop links */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:flex items-center gap-10"
          >
            {navLinks.map((link, i) => {
              const active = linkActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative group text-[10px] uppercase tracking-[0.28em] font-semibold transition-colors duration-200 py-1',
                    active ? 'text-primary' : 'text-white/60 hover:text-white',
                  )}
                >
                  {link.label}
                  {/* Underline */}
                  <span
                    className={cn(
                      'absolute -bottom-0.5 left-0 h-px bg-primary transition-all duration-300',
                      active ? 'w-full' : 'w-0 group-hover:w-full',
                    )}
                  />
                </Link>
              )
            })}
          </motion.div>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block"
          >
            <a
              href="mailto:contact@example.com"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] font-bold px-5 py-2.5 border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-250"
            >
              Hire Me
            </a>
          </motion.div>

          {/* Mobile burger */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2 -mr-2"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.28 }}
              className="w-6 h-0.5 bg-white block"
            />
            <motion.span
              animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.22 }}
              className="w-6 h-0.5 bg-white block"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.28 }}
              className="w-6 h-0.5 bg-white block"
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-brand-black flex flex-col px-6 pt-28 pb-12 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between py-5 border-b border-white/[0.07] text-4xl font-bold text-white hover:text-primary transition-colors duration-200 group"
                  >
                    {link.label}
                    <span className="text-lg text-white/20 group-hover:text-primary transition-colors duration-200">
                      →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="mt-auto"
            >
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/25">
                Creative Studio · Cairo
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}