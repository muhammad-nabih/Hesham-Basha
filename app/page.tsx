import { Hero } from '@/components/sections/Hero'
import { Navigation } from '@/components/common/Navigation'
import { Footer } from '@/components/common/Footer'
import { HomeContent } from '@/components/sections/HomeContent'
import { getFeaturedProjects } from '@/lib/sanity-queries'

export default async function Home() {
  const featuredProjects = await getFeaturedProjects()

  return (
    <>
      <Navigation />
      <Hero />
      <HomeContent projects={featuredProjects} />
      <Footer />
    </>
  )
}
