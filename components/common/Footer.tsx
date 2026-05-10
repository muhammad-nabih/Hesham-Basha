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
                  href="mailto:contact@heshambasha.com"
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

        {/* ── WhatsApp CTA row ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12"
        >
          <a
            href="https://wa.me/201092796730"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full border border-white/10 hover:border-[#25D366]/50 rounded-sm px-6 py-5 transition-interactive"
            style={{ background: 'rgba(37,211,102,0.0)', transition: 'background 0.3s ease, border-color 0.3s ease' }}
            onMouseOver={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.background = 'rgba(37,211,102,0.05)'
            }}
            onMouseOut={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.background = 'rgba(37,211,102,0.0)'
            }}
          >
            <div className="flex items-center gap-4">
              {/* WhatsApp Icon */}
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
                style={{ background: 'rgba(37,211,102,0.12)', border: '1.5px solid rgba(37,211,102,0.4)' }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="#25D366"
                  width="18"
                  height="18"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white group-hover:text-[#25D366] transition-colors duration-300">
                  Chat on WhatsApp
                </p>
                <p className="text-xs text-white/45 mt-0.5 tracking-wide">+20 10 92796730</p>
              </div>
            </div>
            <span
              className="text-[10px] uppercase tracking-[0.28em] text-white/30 group-hover:text-[#25D366]/60 transition-colors duration-300 hidden sm:block"
              aria-hidden="true"
            >
              Open chat →
            </span>
          </a>
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