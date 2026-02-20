import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'shipyard',
      title: 'Shipyard',
      type: 'string',
      description: 'Shipyard or builder name',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'New Build', value: 'new-build' },
          { title: 'In Build', value: 'in-build' },
          { title: 'Refit', value: 'refit' },
          { title: 'Concepts', value: 'concepts' },
          { title: 'Hotel & Home', value: 'hotel-home' },
          { title: 'Tenders', value: 'tenders' },
        ],
      },
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      description: 'Year completed',
    }),
    defineField({
      name: 'length',
      title: 'Length',
      type: 'string',
      description: 'Yacht length (e.g., "65m")',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short description for project cards',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        { 
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        { type: 'inlineImage' },
        { type: 'quote' },
        { type: 'pullQuote' },
        { type: 'imageGallery' },
        { type: 'callout' },
        { type: 'video' },
      ],
      description: 'Full project description with rich content',
    }),
    defineField({
      name: 'heroVideoId',
      title: 'Hero Video (YouTube ID)',
      type: 'string',
      description: 'YouTube video ID for hero section (e.g., "dQw4w9WgXcQ"). Replaces hero image when set.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
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
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
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
          ],
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show in homepage slideshow',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in slideshow (lower numbers first)',
      initialValue: 0,
    }),
    defineField({
      name: 'designScope',
      title: 'Design Scope',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Exterior Design', value: 'exterior' },
          { title: 'Interior Design', value: 'interior' },
        ],
      },
      description: 'What H2 designed — select one or both',
    }),
    defineField({
      name: 'exteriorDesigner',
      title: 'Exterior Designer',
      type: 'string',
      description: 'If exterior was by another studio (e.g., "Unique Yacht Design")',
      hidden: ({ parent }: any) => parent?.designScope?.includes('exterior'),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Concept', value: 'concept' },
          { title: 'Under Construction', value: 'under-construction' },
          { title: 'Completed', value: 'completed' },
        ],
      },
      initialValue: 'completed',
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'object',
      fields: [
        { name: 'loa', title: 'LOA (Length Overall)', type: 'string' },
        { name: 'beam', title: 'Beam', type: 'string' },
        { name: 'draft', title: 'Draft', type: 'string' },
        { name: 'displacement', title: 'Displacement', type: 'string' },
        { name: 'guests', title: 'Guest Capacity', type: 'string' },
        { name: 'crew', title: 'Crew', type: 'string' },
        { name: 'speed', title: 'Max Speed', type: 'string' },
        { name: 'range', title: 'Range', type: 'string' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      shipyard: 'shipyard',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, shipyard } = selection
      return {
        ...selection,
        subtitle: shipyard ? `${shipyard}` : 'No shipyard',
      }
    },
  },
})
