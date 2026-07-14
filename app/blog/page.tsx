import Link from 'next/link'
import Image from 'next/image'

import { Navigation } from '@/components/common/Navigation'
import { Footer } from '@/components/common/Footer'
import { getAllBlogPosts } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import { BlogPageContent } from './Blogpagecontent '


export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return (
    <>
      <Navigation />
      <main className="pt-20">
        <BlogPageContent posts={posts} />
      </main>
      <Footer />
    </>
  )
}