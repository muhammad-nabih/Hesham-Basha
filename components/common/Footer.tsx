'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Footer() {
  
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { label: 'Behance', href: 'https://www.behance.net/heshambasha14', target: '_blank' },
    { label: 'Instagram', href: 'https://www.instagram.com/hesham_graphic_designer/profilecard/?igsh=MWlvNGppejZ3aTdr', target: '_blank' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hesham-basha-4295b5318/', target: '_blank' },
  ]

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        >
          {/* About */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-semibold mb-4">About</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Creative designer based in Cairo, Egypt. Specializing in advertising campaigns, branding, and digital design.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a href="mailto:contact@example.com" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-semibold mb-4">Social</h3>
            <ul className="space-y-2 text-sm">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.target as '_blank' | undefined}
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-border my-12"></div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground"
        >
          <p>&copy; {currentYear} Hesham Basha. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Crafted with attention to detail</p>
        </motion.div>
      </div>
    </footer>
  )
}
