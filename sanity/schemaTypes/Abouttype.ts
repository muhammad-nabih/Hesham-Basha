import { defineField, defineType } from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  // Singleton — one document only, enforced in structure builder
  groups: [
    { name: 'header', title: 'Header' },
    { name: 'bio', title: 'Bio' },
    { name: 'skills', title: 'Skills & Tools' },
    { name: 'experience', title: 'Experience' },
  ],
  fields: [
    // ── Header ─────────────────────────────
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Label',
      type: 'string',
      group: 'header',
      initialValue: 'Profile',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      group: 'header',
      description: 'e.g. "About Me." — rendered with split-character animation',
      initialValue: 'About Me.',
    }),
    defineField({
      name: 'headerSubtitle',
      title: 'Header Subtitle',
      type: 'text',
      rows: 2,
      group: 'header',
      initialValue:
        'A passionate creative designer with a focus on crafting meaningful visual experiences for brands worldwide.',
    }),
    defineField({
      name: 'availabilityStatus',
      title: 'Availability Status Text',
      type: 'string',
      group: 'header',
      description: 'e.g. "Available for hire · Cairo, Egypt"',
      initialValue: 'Available for hire · Cairo, Egypt',
    }),
    defineField({
      name: 'isAvailable',
      title: 'Currently Available for Hire?',
      type: 'boolean',
      group: 'header',
      initialValue: true,
    }),

    // ── Bio ─────────────────────────────
    defineField({
      name: 'bioParagraphs',
      title: 'Bio Paragraphs',
      type: 'array',
      group: 'bio',
      of: [{ type: 'text', rows: 4 }],
      description: 'Each item renders as a separate reveal-animated paragraph',
      validation: (Rule) => Rule.required().min(1),
    }),

    // ── Skills ─────────────────────────────
    defineField({
      name: 'skills',
      title: 'Core Competencies',
      type: 'array',
      group: 'skills',
      of: [{ type: 'string' }],
      description: 'e.g. "Campaign Design", "Art Direction"',
    }),
    defineField({
      name: 'tools',
      title: 'Tools & Software',
      type: 'array',
      group: 'skills',
      of: [
        {
          type: 'object',
          name: 'tool',
          fields: [
            defineField({ name: 'name', title: 'Tool Name', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({
              name: 'short',
              title: 'Short Label / Monogram',
              type: 'string',
              description: 'e.g. "Ps" for Photoshop, "Ai" for Illustrator',
              validation: (Rule) => Rule.required().max(4),
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'short' },
          },
        },
      ],
    }),

    // ── Experience ─────────────────────────────
    defineField({
      name: 'experience',
      title: 'Experience Timeline',
      type: 'array',
      group: 'experience',
      of: [
        {
          type: 'object',
          name: 'experienceItem',
          fields: [
            defineField({
              name: 'year',
              title: 'Date Range',
              type: 'string',
              description: 'e.g. "March 2025 — Present"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Job Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'company',
              title: 'Company',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'company', description: 'year' },
            prepare({ title, subtitle, description }) {
              return {
                title,
                subtitle: [subtitle, description].filter(Boolean).join(' · '),
              }
            },
          },
        },
      ],
    }),

    // ── CTA ─────────────────────────────
    defineField({
      name: 'ctaHeadline',
      title: 'CTA Headline',
      type: 'string',
      initialValue: 'Ready to Collaborate?',
    }),
    defineField({
      name: 'ctaEmail',
      title: 'CTA Email',
      type: 'string',
      initialValue: 'heshamahmedd293@gmail.com',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About Page' }
    },
  },
})