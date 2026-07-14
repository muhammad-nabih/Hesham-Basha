import { defineField, defineType } from 'sanity'


export const contactType = defineType({
  name: 'contact',
  title: 'Contact Page',
  type: 'document',

  // Singleton — one document only, enforced in structure builder
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Label',
      type: 'string',
      initialValue: 'Get in touch',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      initialValue: "Let's Collaborate",
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number (display)',
      type: 'string',
    }),
    defineField({
      name: 'whatsappLink',
      title: 'WhatsApp Link',
      type: 'url',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Cairo, Egypt',
    }),
    defineField({
      name: 'availabilityStatus',
      title: 'Availability Status Text',
      type: 'string',
      initialValue: 'Available for hire · Cairo, Egypt',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      description: 'Optional — can reuse Footer social links instead if you prefer a single source',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({ name: 'label', title: 'Platform Name', type: 'string' }),
            defineField({ name: 'href', title: 'URL', type: 'url' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Contact Page' }
    },
  },
})