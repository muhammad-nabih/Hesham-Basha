'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'

import { BrandLogo } from '@/components/common/BrandLogo'

import { cn } from '@/lib/utils'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

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

  const linkClass = (href: string, mobile = false) => {
    const active = linkActive(href)
    if (mobile) {
      return cn(
        'uppercase tracking-widest text-xs font-semibold transition-interactive py-3 border-b border-border/60 last:border-b-0',
        active ? 'text-primary' : 'text-foreground hover:text-primary',
      )
    }
    return cn(
      'relative inline-block uppercase tracking-widest text-xs font-semibold transition-interactive py-1',
      active
        ? 'text-primary after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-primary'
        : 'text-foreground hover:text-primary',
    )
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/80 bg-offwhite/90 backdrop-blur-md supports-[backdrop-filter]:bg-offwhite/75">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <BrandLogo />

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2 -mr-2 rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                'w-6 h-0.5 bg-foreground transition-all duration-300 origin-center',
                isOpen && 'rotate-45 translate-y-2',
              )}
            />
            <span
              className={cn(
                'w-6 h-0.5 bg-foreground transition-all duration-300',
                isOpen && 'opacity-0 scale-0',
              )}
            />
            <span
              className={cn(
                'w-6 h-0.5 bg-foreground transition-all duration-300 origin-center',
                isOpen && '-rotate-45 -translate-y-2',
              )}
            />
          </button>
        </div>
      </nav>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22 }}
          className="fixed top-[65px] left-0 right-0 z-40 border-b border-border bg-offwhite md:hidden shadow-lg"
        >
          <div className="flex flex-col px-6 py-2 pb-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={linkClass(link.href, true)}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </>
  )
}
