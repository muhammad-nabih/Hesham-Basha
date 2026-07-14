import { Navigation } from '@/components/common/Navigation'
import { Footer } from '@/components/common/Footer'
import { getAbout } from '@/lib/sanity-queries'
import { AboutPageContent } from '@/app/about/AboutPageContent'

// Fallback content — used if the About singleton hasn't been filled in Sanity yet
const FALLBACK = {
  eyebrow: 'Profile',
  headline: 'About Me.',
  headerSubtitle:
    'A passionate creative designer with a focus on crafting meaningful visual experiences for brands worldwide.',
  availabilityStatus: 'Available for hire · Cairo, Egypt',
  isAvailable: true,
  bioParagraphs: [
    `I'm Hesham Basha, a creative designer based in Cairo, Egypt with over 2 years of experience creating compelling visual designs. My journey in design began with a passion for storytelling through visual communication, which has evolved into a career focused on delivering exceptional design solutions for brands.`,
    `My work spans across advertising campaigns, brand identity development, social media design, and print materials. I specialize in transforming complex brand concepts into visually striking designs that resonate with target audiences. I take pride in understanding client visions and translating them into designs that not only look beautiful but also achieve business objectives.`,
    `With a strong foundation in design principles and a keen eye for detail, I consistently deliver work that stands out. Whether it's a financial campaign, national holidays branding, or corporate design systems, I approach every project with the same level of dedication and creativity.`,
  ],
  skills: [
    'Campaign Design',
    'Advertising Visuals',
    'Social Media Design',
    'Visual Communication',
    'Creative Concepts',
    'Art Direction',
    'Ad Creative Design',
    'Creative Strategy',
  ],
  tools: [
    { name: 'Adobe Photoshop', short: 'Ps' },
    { name: 'Adobe Illustrator', short: 'Ai' },
  ],
  experience: [
    {
      year: 'March 2025 — Present',
      title: 'Graphic Designer',
      company: 'Elframawey Agency',
      description:
        'Developed and executed campaign-based advertising visuals for 10+ brands across UAE and Saudi markets, aligning with brand identity and marketing objectives. Developed visual concepts aligned with campaign direction and branding while supporting brand identity development with consistent visual output.',
    },
    {
      year: 'July 2024 — February 2025',
      title: 'Graphic Designer',
      company: 'Point Company',
      description:
        'Designed engaging and visually appealing social media visuals tailored to different audiences and platforms across multiple brands. Created marketing-focused designs aligned with campaign goals and brand style while assisting in print-ready production materials.',
    },
    {
      year: 'March 2024 — June 2024',
      title: 'Graphic Designer',
      company: 'Freelancer',
      description:
        'Designed tailored visual content for clients across different industries, adapting to various styles and brand requirements. Managed multiple projects while maintaining timely delivery and worked directly with clients to translate their needs into effective visual designs.',
    },
  ],
  ctaHeadline: 'Ready to Collaborate?',
  ctaEmail: 'heshamahmedd293@gmail.com',
}

export default async function AboutPage() {
  const aboutData = await getAbout()

  const data = {
    eyebrow: aboutData?.eyebrow || FALLBACK.eyebrow,
    headline: aboutData?.headline || FALLBACK.headline,
    headerSubtitle: aboutData?.headerSubtitle || FALLBACK.headerSubtitle,
    availabilityStatus: aboutData?.availabilityStatus || FALLBACK.availabilityStatus,
    isAvailable: aboutData?.isAvailable ?? FALLBACK.isAvailable,
    bioParagraphs: aboutData?.bioParagraphs?.length ? aboutData.bioParagraphs : FALLBACK.bioParagraphs,
    skills: aboutData?.skills?.length ? aboutData.skills : FALLBACK.skills,
    tools: aboutData?.tools?.length ? aboutData.tools : FALLBACK.tools,
    experience: aboutData?.experience?.length ? aboutData.experience : FALLBACK.experience,
    ctaHeadline: aboutData?.ctaHeadline || FALLBACK.ctaHeadline,
    ctaEmail: aboutData?.ctaEmail || FALLBACK.ctaEmail,
  }

  return (
    <>
      <Navigation />
      <main className="pt-20">
        <AboutPageContent data={data} />
      </main>
      <Footer />
    </>
  )
}