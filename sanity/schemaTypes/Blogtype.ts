import { defineField, defineType } from 'sanity'


export const blogType = defineType({
  name: 'blog',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary shown on the blog list card',
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Design', value: 'design' },
          { title: 'Branding', value: 'branding' },
          { title: 'Social Media', value: 'social-media' },
          { title: 'Advertising', value: 'advertising' },
          { title: 'Behind the Scenes', value: 'behind-the-scenes' },
          { title: 'Tips & Resources', value: 'tips-resources' },
        ],
      },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      initialValue: 'Hesham Basha',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      description: 'Approximate reading time shown on the card',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Show this post highlighted at the top of the Blog page',
      initialValue: false,
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Overrides the page <title> for this post (optional)',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
    }),
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      subtitle: 'category',
      date: 'publishedAt',
    },
    prepare({ title, media, subtitle, date }) {
      const formattedDate = date ? new Date(date).toLocaleDateString() : ''
      return {
        title,
        media,
        subtitle: [subtitle, formattedDate].filter(Boolean).join(' · '),
      }
    },
  },
})