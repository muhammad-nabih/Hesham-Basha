import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Noto_Naskh_Arabic } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-bricolage',
  display: 'swap',
})

const notoArabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#f9f9f9' }],
}

export const metadata: Metadata = {
  title: 'Hesham Basha - Creative Designer',
  description:
    'Premium creative studio showcasing award-winning design work. Campaigns, branding, social media, and print design from Cairo, Egypt.',
  keywords: 'designer, creative, branding, campaign design, graphic design, Egypt',
  authors: [{ name: 'Hesham Basha' }],
  creator: 'Hesham Basha',
  openGraph: {
    title: 'Hesham Basha - Creative Designer',
    description: 'Premium creative studio showcasing award-winning design work.',
    url: 'https://hesham-basha.com',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hesham Basha Creative Designer',
      },
    ],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${notoArabic.variable}`}>
      <body className="min-h-dvh bg-background text-foreground antialiased">{children}</body>
      {process.env.NODE_ENV === 'production' && <Analytics />}
    </html>
  )
}
