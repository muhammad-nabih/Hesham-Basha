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

// ─── Footer ──────────────────────────────────────────────────────────
export interface FooterNavLink {
  label: string
  href: string
}

export interface FooterSocialLink {
  label: string
  href: string
  icon?: string
}

export interface FooterData {
  _id: string
  tagline?: string
  description?: string
  navLinks?: FooterNavLink[]
  socialLinks?: FooterSocialLink[]
  whatsapp?: {
    number?: string
    link?: string
    ctaLabel?: string
  }
  contactEmail?: string
  bottomNote?: string
}

// ─── About ───────────────────────────────────────────────────────────
export interface AboutToolItem {
  name: string
  short: string
}

export interface AboutExperienceItem {
  year: string
  title: string
  company: string
  description?: string
}

export interface AboutData {
  _id: string
  eyebrow?: string
  headline?: string
  headerSubtitle?: string
  availabilityStatus?: string
  isAvailable?: boolean
  bioParagraphs?: string[]
  skills?: string[]
  tools?: AboutToolItem[]
  experience?: AboutExperienceItem[]
  ctaHeadline?: string
  ctaEmail?: string
}

// ─── Contact ─────────────────────────────────────────────────────────
export interface ContactSocialLink {
  label: string
  href: string
}

export interface ContactData {
  _id: string
  eyebrow?: string
  headline?: string
  subtitle?: string
  email: string
  phone?: string
  whatsappLink?: string
  location?: string
  availabilityStatus?: string
  socialLinks?: ContactSocialLink[]
}

// ─── Blog ────────────────────────────────────────────────────────────
export interface BlogPost {
  _id: string
  title: string
  slug: string
  coverImage: SanityImage & { alt?: string }
  excerpt: string
  category?: string
  content?: any[]
  author?: string
  publishedAt: string
  readingTime?: number
  featured?: boolean
  seoTitle?: string
  seoDescription?: string
}

const REVALIDATE_TIME = 60

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
    return await client.fetch(query, {}, {
      next: { revalidate: REVALIDATE_TIME }
    })
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
    return await client.fetch(query, {}, {
      next: { revalidate: REVALIDATE_TIME }
    })
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
    return await client.fetch(
      query,
      { slug },
      {
        next: { revalidate: REVALIDATE_TIME }
      }
    )
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
    return await client.fetch(query, {}, {
      next: { revalidate: REVALIDATE_TIME }
    })
  } catch (error) {
    console.error('Error fetching skills:', error)
    return []
  }
}

// ─── Footer ──────────────────────────────────────────────────────────
export async function getFooter(): Promise<FooterData | null> {
  const query = `*[_type == "footer"][0] {
    _id,
    tagline,
    description,
    navLinks,
    socialLinks,
    whatsapp,
    contactEmail,
    bottomNote
  }`

  try {
    return await client.fetch(query, {}, {
      next: { revalidate: REVALIDATE_TIME }
    })
  } catch (error) {
    console.error('Error fetching footer:', error)
    return null
  }
}

// ─── About ───────────────────────────────────────────────────────────
export async function getAbout(): Promise<AboutData | null> {
  const query = `*[_type == "about"][0] {
    _id,
    eyebrow,
    headline,
    headerSubtitle,
    availabilityStatus,
    isAvailable,
    bioParagraphs,
    skills,
    tools,
    experience,
    ctaHeadline,
    ctaEmail
  }`

  try {
    return await client.fetch(query, {}, {
      next: { revalidate: REVALIDATE_TIME }
    })
  } catch (error) {
    console.error('Error fetching about page:', error)
    return null
  }
}

// ─── Contact ─────────────────────────────────────────────────────────
export async function getContact(): Promise<ContactData | null> {
  const query = `*[_type == "contact"][0] {
    _id,
    eyebrow,
    headline,
    subtitle,
    email,
    phone,
    whatsappLink,
    location,
    availabilityStatus,
    socialLinks
  }`

  try {
    return await client.fetch(query, {}, {
      next: { revalidate: REVALIDATE_TIME }
    })
  } catch (error) {
    console.error('Error fetching contact page:', error)
    return null
  }
}

// ─── Blog ────────────────────────────────────────────────────────────
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    coverImage,
    excerpt,
    category,
    author,
    publishedAt,
    readingTime,
    featured
  }`

  try {
    return await client.fetch(query, {}, {
      next: { revalidate: REVALIDATE_TIME }
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getFeaturedBlogPost(): Promise<BlogPost | null> {
  const query = `*[_type == "blog" && featured == true] | order(publishedAt desc) [0] {
    _id,
    title,
    "slug": slug.current,
    coverImage,
    excerpt,
    category,
    author,
    publishedAt,
    readingTime,
    featured
  }`

  try {
    return await client.fetch(query, {}, {
      next: { revalidate: REVALIDATE_TIME }
    })
  } catch (error) {
    console.error('Error fetching featured blog post:', error)
    return null
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const query = `*[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    coverImage,
    excerpt,
    category,
    content,
    author,
    publishedAt,
    readingTime,
    featured,
    seoTitle,
    seoDescription
  }`

  try {
    return await client.fetch(
      query,
      { slug },
      {
        next: { revalidate: REVALIDATE_TIME }
      }
    )
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}