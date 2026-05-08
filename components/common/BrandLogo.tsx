import Link from 'next/link'

import { cn } from '@/lib/utils'

type BrandLogoProps = {
  className?: string
  /** Use on dark backgrounds (e.g. footer, dark hero) */
  inverted?: boolean
}

export function BrandLogo({ className, inverted = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="Home — Hesham Basha"
      className={cn(
        'group inline-flex items-center gap-2.5 font-semibold tracking-tight transition-interactive',
        inverted ? 'text-white' : 'text-foreground',
        className,
      )}
    >
      <span
        className="inline-flex size-2.5 shrink-0 rotate-45 bg-primary shadow-[0_0_0_2px] shadow-primary/35 transition-transform duration-200 group-hover:scale-110"
        aria-hidden
      />
      <span className="text-lg leading-none">
        Hesham Basha
        <span className="text-primary">.</span>
      </span>
    </Link>
  )
}
