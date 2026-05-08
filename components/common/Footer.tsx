'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

import { BrandLogo } from '@/components/common/BrandLogo'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { label: 'Behance', href: 'https://www.behance.net/heshambasha14', target: '_blank' },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/hesham_graphic_designer/profilecard/?igsh=MWlvNGppejZ3aTdr',
      target: '_blank',
    },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hesham-basha-4295b5318/', target: '_blank' },
  ]

  return (
    <footer id="contact" className="border-t border-white/10 bg-brand-black text-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        >
          <div>
            <BrandLogo inverted className="mb-6" />
            <p className="font-accent text-sm text-primary tracking-wide">Creative studio · Cairo</p>
            <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-xs">
              {/* Tagline placeholder — swap when final copy is ready */}
              Crafting bold visual systems for brands worldwide.
            </p>
          </div>

          <div>
            <h3 className="font-accent text-xs uppercase tracking-[0.2em] text-primary mb-4">
              Navigate
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/projects"
                  className="text-white/75 hover:text-primary transition-interactive"
                >
                  Work
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/75 hover:text-primary transition-interactive"
                >
                  About
                </Link>
              </li>
              <li>
                <a
                  href="mailto:contact@example.com"
                  className="text-white/75 hover:text-primary transition-interactive"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-accent text-xs uppercase tracking-[0.2em] text-primary mb-4">
              Social
            </h3>
            <ul className="space-y-2 text-sm">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.target as '_blank' | undefined}
                    rel="noopener noreferrer"
                    className="text-white/75 hover:text-primary transition-interactive"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="border-t border-white/10 my-12" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/55"
        >
          <p>&copy; {currentYear} Hesham Basha. All rights reserved.</p>
          <p className="text-white/45">Minimal · Bold · Precise</p>
        </motion.div>
      </div>
    </footer>
  )
}
