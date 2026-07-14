'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

import { urlFor } from '@/lib/sanity'
import type { BlogPost } from '@/lib/sanity-queries'

// ─── Helpers (mirrors About page pattern) ────────────────────────────────────
function SplitChars({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  return (
    <span aria-label={text} className={className}>
      {text.split('').map((char, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', lineHeight: '0.95em', verticalAlign: 'top' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '108%' }}
            animate={{ y: '0%' }}
            transition={{ delay: delay + i * 0.03, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

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

function FeaturedCard({ post }: { post: BlogPost }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-surface">
          {post.coverImage && (
            <Image
              src={urlFor(post.coverImage).width(1000).height(750).url()}
              alt={post.coverImage.alt || post.title}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
          )}
        </div>
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] uppercase tracking-[0.28em] text-primary font-semibold">
              Featured
            </span>
            {post.category && (
              <>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground font-mono">
                  {CATEGORY_LABELS[post.category] || post.category}
                </span>
              </>
            )}
          </div>
          <h2 className="text-3xl lg:text-4xl font-black tracking-[-0.02em] mb-4 group-hover:text-primary transition-colors duration-200">
            {post.title}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-6">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-mono">
            <span>{formatDate(post.publishedAt)}</span>
            {post.readingTime && (
              <>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span>{post.readingTime} min read</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function PostCard({ post, idx }: { post: BlogPost; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (idx % 3) * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface mb-5">
          {post.coverImage && (
            <Image
              src={urlFor(post.coverImage).width(700).height(525).url()}
              alt={post.coverImage.alt || post.title}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
          )}
          <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/10 transition-colors duration-300" />
        </div>

        {post.category && (
          <p className="text-[10px] uppercase tracking-[0.28em] text-primary font-semibold mb-2.5">
            {CATEGORY_LABELS[post.category] || post.category}
          </p>
        )}
        <h3 className="text-xl font-bold tracking-tight mb-2.5 group-hover:text-primary transition-colors duration-200 leading-snug">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">
          <span>{formatDate(post.publishedAt)}</span>
          {post.readingTime && (
            <>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span>{post.readingTime} min read</span>
            </>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

export function BlogPageContent({ posts }: { posts: BlogPost[] }) {
  const featured = posts.find((p) => p.featured) || posts[0]
  const rest = posts.filter((p) => p._id !== featured?._id)

  return (
    <>
      {/* ── Header ───────────────────────────────────────────────────── */}
      <section className="relative bg-brand-black text-white overflow-hidden pt-32 lg:pt-40 pb-20 lg:pb-28 border-b border-white/[0.07]">
        <Grain />

        <div aria-hidden="true" className="pointer-events-none absolute right-0 bottom-0 overflow-hidden leading-none">
          <span className="text-[20vw] font-black tracking-[-0.04em] text-white/[0.03] select-none whitespace-nowrap">
            BLOG
          </span>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'left' }}
          className="absolute top-0 left-0 right-0 h-px bg-primary"
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20">
          <div style={{ overflow: 'hidden' }} className="mb-10 lg:mb-14">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-4"
            >
              <div className="w-8 h-px bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.32em] text-primary font-semibold">Writing</span>
            </motion.div>
          </div>

          <h1 className="font-black leading-[0.9] tracking-[-0.03em] mb-14 lg:mb-20">
            <div className="text-[clamp(3.5rem,9vw,8rem)] text-white/90">
              <SplitChars text="The" delay={0.1} />
            </div>
            <div className="text-[clamp(3.5rem,9vw,8rem)]">
              <SplitChars text="Blog." delay={0.25} className="text-primary" />
            </div>
          </h1>

          <div style={{ overflow: 'hidden' }} className="max-w-lg pt-10 border-t border-white/[0.07]">
            <motion.p
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="text-base lg:text-lg text-white/45 leading-relaxed"
            >
              Notes on design, branding, and the craft of visual communication.
            </motion.p>
          </div>
        </div>
      </section>

      {posts.length === 0 && (
        <section className="bg-offwhite">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 py-32 text-center">
            <p className="text-muted-foreground">No posts yet — check back soon.</p>
          </div>
        </section>
      )}

      {/* ── Featured post ────────────────────────────────────────────── */}
      {featured && (
        <section className="bg-offwhite border-b border-border">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 py-24 lg:py-32">
            <FeaturedCard post={featured} />
          </div>
        </section>
      )}

      {/* ── Post grid ────────────────────────────────────────────────── */}
      {rest.length > 0 && (
        <section className="bg-surface">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 py-24 lg:py-32">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {rest.map((post, idx) => (
                <PostCard key={post._id} post={post} idx={idx} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}