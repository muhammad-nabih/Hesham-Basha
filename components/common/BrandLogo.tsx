import Image from 'next/image'
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
        'group inline-flex items-center transition-interactive',
        inverted ? 'brightness-0 invert' : '',
        className,
      )}
    >
      <Image
        src="/main-logo.png"
        alt="Hesham Basha"
        width={60}
        height={60}
        className="object-contain transition-transform duration-200 group-hover:scale-105"
        priority
      />
    </Link>
  )
}