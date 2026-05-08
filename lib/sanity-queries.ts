import { client } from './sanity'

interface SanityImage {
  asset?: {
    _ref?: string
    _id?: string
  }
}

export interface Project {
  _id: string
  title: string
  slug: string
  thumbnail: SanityImage
  heroImage: SanityImage
  shortDescription: string
  fullDescription: string
  galleryImages: Array<{
    image: SanityImage
    caption?: string
    alt?: string
  }>
  projectType: string
  year: number
  tools: Array<{ _ref: string }>
  featured: boolean
  orderRank: number
}

export interface Skill {
  _id: string
  title: string
  slug: string
}

export async function getAllProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(orderRank asc) {
    _id,
    title,
    "slug": slug.current,
    thumbnail,
    heroImage,
    shortDescription,
    fullDescription,
    "galleryImages": galleryImages[] {
      image,
      caption,
      alt
    },
    projectType,
    year,
    tools,
    featured,
    orderRank
  }`

  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const query = `*[_type == "project" && featured == true] | order(orderRank asc) {
    _id,
    title,
    "slug": slug.current,
    thumbnail,
    heroImage,
    shortDescription,
    fullDescription,
    "galleryImages": galleryImages[] {
      image,
      caption,
      alt
    },
    projectType,
    year,
    tools,
    featured,
    orderRank
  }`

  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    thumbnail,
    heroImage,
    shortDescription,
    fullDescription,
    "galleryImages": galleryImages[] {
      image,
      caption,
      alt
    },
    projectType,
    year,
    tools,
    featured,
    orderRank
  }`

  try {
    return await client.fetch(query, { slug })
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export async function getSkills(): Promise<Skill[]> {
  const query = `*[_type == "skill"] {
    _id,
    title,
    "slug": slug.current
  }`

  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching skills:', error)
    return []
  }
}
