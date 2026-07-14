import { defineField, defineType } from 'sanity'

export const footerType = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  // icon: DocumentIcon, // Removed due to missing import or definition
  // Singleton — one document only, enforced in structure builder (see instructions below)
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'e.g. "Creative studio · Cairo"',
      initialValue: 'Creative studio · Cairo',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      initialValue: 'Crafting bold visual systems for brands worldwide.',
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigate Links',
      type: 'array',
      description: 'Links shown under the "Navigate" column',
      of: [
        {
          type: 'object',
          name: 'navLink',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'href', title: 'URL / Path', type: 'string', validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      description: 'Links shown under the "Social" column',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'label',
              title: 'Platform Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon Key',
              type: 'string',
              description:
                'Optional key to map to an icon component in code, e.g. "behance", "instagram", "linkedin"',
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        },
      ],
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'object',
      fields: [
        defineField({
          name: 'number',
          title: 'Phone Number (display)',
          type: 'string',
          description: 'e.g. +20 10 92796730',
        }),
        defineField({
          name: 'link',
          title: 'wa.me Link',
          type: 'url',
          description: 'e.g. https://wa.me/201092796730',
        }),
        defineField({
          name: 'ctaLabel',
          title: 'CTA Label',
          type: 'string',
          initialValue: 'Chat on WhatsApp',
        }),
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'contact@heshambasha.com',
    }),
    defineField({
      name: 'bottomNote',
      title: 'Bottom Note',
      type: 'string',
      description: 'e.g. "Minimal · Bold · Precise"',
      initialValue: 'Minimal · Bold · Precise',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Footer Settings' }
    },
  },
})