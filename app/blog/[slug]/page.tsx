import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { Navigation } from '@/components/common/Navigation'
import { Footer } from '@/components/common/Footer'
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/sanity-queries'
import { BlogPostContent } from '../BlogPostContent'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) return {}

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Navigation />
      <main className="pt-20">
        <BlogPostContent post={post} />
      </main>
      <Footer />
    </>
  )
}