import type { FooterSocialLink } from '@/lib/sanity-queries'

export function FooterSocials({ links }: { links: FooterSocialLink[] }) {
  return (
    <ul className="space-y-2 text-sm">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/75 hover:text-primary transition-interactive"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  )
}