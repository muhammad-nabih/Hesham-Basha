'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PortableText, type PortableTextComponents } from '@portabletext/react'

import { urlFor } from '@/lib/sanity'
import type { BlogPost } from '@/lib/sanity-queries'

const Grain = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 opacity-[0.035]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
      backgroundSize: '180px',
    }}
  />
)

const CATEGORY_LABELS: Record<string, string> = {
  design: 'Design',
  branding: 'Branding',
  'social-media': 'Social Media',
  advertising: 'Advertising',
  'behind-the-scenes': 'Behind the Scenes',
  'tips-resources': 'Tips & Resources',
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base lg:text-lg text-muted-foreground leading-[1.85] mb-6">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl lg:text-3xl font-black tracking-[-0.02em] mt-14 mb-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl lg:text-2xl font-bold tracking-tight mt-10 mb-4">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-primary pl-6 my-8 text-lg italic text-foreground/80">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-4 hover:text-brand-primary-hover transition-interactive"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
  },
  types: {
    image: ({ value }) => (
      <figure className="my-10">
        <div className="relative aspect-[16/10] overflow-hidden bg-surface">
          <Image
            src={urlFor(value).width(1200).height(750).url()}
            alt={value.alt || ''}
            fill
            className="object-cover"
          />
        </div>
        {value.caption && (
          <figcaption className="text-sm text-muted-foreground mt-3 text-center">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-muted-foreground">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-muted-foreground">{children}</ol>
    ),
  },
}

export function BlogPostContent({ post }: { post: BlogPost }) {
  return (
    <>
      {/* ── Header ───────────────────────────────────────────────────── */}
      <section className="relative bg-brand-black text-white overflow-hidden pt-24 lg:pt-32 pb-16 lg:pb-20 border-b border-white/[0.07]">
        <Grain />

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'left' }}
          className="absolute top-0 left-0 right-0 h-px bg-primary"
        />

        <div className="relative z-10 max-w-[900px] mx-auto px-6 lg:px-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-white/40 hover:text-primary transition-colors duration-200 mb-10"
            >
              ← Back to Blog
            </Link>

            <div className="flex items-center gap-3 mb-6">
              {post.category && (
                <span className="text-[10px] uppercase tracking-[0.28em] text-primary font-semibold">
                  {CATEGORY_LABELS[post.category] || post.category}
                </span>
              )}
            </div>

            <h1 className="text-4xl lg:text-6xl font-black tracking-[-0.03em] leading-[1.02] mb-8">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-white/40 font-mono pt-6 border-t border-white/[0.07]">
              {post.author && <span>{post.author}</span>}
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>{formatDate(post.publishedAt)}</span>
              {post.readingTime && (
                <>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span>{post.readingTime} min read</span>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Cover image ──────────────────────────────────────────────── */}
      {post.coverImage && (
        <section className="bg-offwhite">
          <div className="max-w-[1100px] mx-auto px-6 lg:px-0 -mt-1">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={urlFor(post.coverImage).width(1400).height(788).url()}
                alt={post.coverImage.alt || post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* ── Content ──────────────────────────────────────────────────── */}
      <section className="bg-offwhite">
        <div className="max-w-[760px] mx-auto px-6 lg:px-0 py-20 lg:py-28">
          {post.content && <PortableText value={post.content} components={portableTextComponents} />}
        </div>
      </section>

      {/* ── CTA back to blog ─────────────────────────────────────────── */}
      <section className="bg-surface border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 py-16 lg:py-20 flex items-center justify-between flex-wrap gap-6">
          <p className="text-sm text-muted-foreground">Thanks for reading.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] font-bold text-foreground hover:text-primary transition-colors duration-200"
          >
            More Posts →
          </Link>
        </div>
      </section>
    </>
  )
}