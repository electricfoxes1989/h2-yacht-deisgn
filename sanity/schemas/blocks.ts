import { defineType, defineField } from 'sanity'

// Custom quote block for attributed quotes
export const quoteBlock = defineType({
  name: 'quote',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Quote Text',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution',
      type: 'string',
      description: 'Person or source of the quote',
    }),
    defineField({
      name: 'role',
      title: 'Role/Title',
      type: 'string',
      description: 'Title or role of the person quoted',
    }),
  ],
  preview: {
    select: {
      text: 'text',
      attribution: 'attribution',
    },
    prepare({ text, attribution }) {
      return {
        title: text,
        subtitle: attribution ? `— ${attribution}` : 'Quote',
      }
    },
  },
})

// Pull quote block for highlighting key statements
export const pullQuoteBlock = defineType({
  name: 'pullQuote',
  title: 'Pull Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Pull Quote Text',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      text: 'text',
    },
    prepare({ text }) {
      return {
        title: text,
        subtitle: 'Pull Quote',
      }
    },
  },
})

// Image gallery block for multiple images
export const imageGalleryBlock = defineType({
  name: 'imageGallery',
  title: 'Image Gallery',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      validation: Rule => Rule.required().min(2).max(12),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid (2 columns)', value: 'grid-2' },
          { title: 'Grid (3 columns)', value: 'grid-3' },
          { title: 'Carousel', value: 'carousel' },
        ],
        layout: 'radio',
      },
      initialValue: 'grid-2',
    }),
  ],
  preview: {
    select: {
      images: 'images',
      layout: 'layout',
    },
    prepare({ images, layout }) {
      return {
        title: `Image Gallery (${images?.length || 0} images)`,
        subtitle: layout || 'Grid',
      }
    },
  },
})

// Callout block for important information
export const calloutBlock = defineType({
  name: 'callout',
  title: 'Callout',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Callout Text',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Info', value: 'info' },
          { title: 'Warning', value: 'warning' },
          { title: 'Success', value: 'success' },
          { title: 'Note', value: 'note' },
        ],
        layout: 'radio',
      },
      initialValue: 'info',
    }),
  ],
  preview: {
    select: {
      text: 'text',
      type: 'type',
    },
    prepare({ text, type }) {
      return {
        title: text,
        subtitle: `Callout (${type})`,
      }
    },
  },
})

// Inline image block with caption
export const inlineImageBlock = defineType({
  name: 'inlineImage',
  title: 'Inline Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption',
    }),
    defineField({
      name: 'width',
      title: 'Width',
      type: 'string',
      options: {
        list: [
          { title: 'Full width', value: 'full' },
          { title: 'Wide', value: 'wide' },
          { title: 'Standard', value: 'standard' },
        ],
        layout: 'radio',
      },
      initialValue: 'standard',
    }),
  ],
})

// Video embed block
export const videoBlock = defineType({
  name: 'video',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube, Vimeo, or direct video URL',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      url: 'url',
      caption: 'caption',
    },
    prepare({ url, caption }) {
      return {
        title: caption || 'Video',
        subtitle: url,
      }
    },
  },
})
