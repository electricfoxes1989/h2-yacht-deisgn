import { describe, it, expect } from 'vitest'
import { schemaTypes } from '../sanity/schemas'

describe('Sanity Schema Enhancements', () => {
  it('should include all custom block types', () => {
    const blockNames = schemaTypes.map(schema => schema.name)
    
    expect(blockNames).toContain('quote')
    expect(blockNames).toContain('pullQuote')
    expect(blockNames).toContain('imageGallery')
    expect(blockNames).toContain('callout')
    expect(blockNames).toContain('inlineImage')
    expect(blockNames).toContain('video')
  })

  it('should have quote block with required fields', () => {
    const quoteBlock = schemaTypes.find(schema => schema.name === 'quote')
    
    expect(quoteBlock).toBeDefined()
    expect(quoteBlock?.type).toBe('object')
    expect(quoteBlock?.fields).toBeDefined()
    
    const fieldNames = quoteBlock?.fields?.map((field: any) => field.name)
    expect(fieldNames).toContain('text')
    expect(fieldNames).toContain('attribution')
    expect(fieldNames).toContain('role')
  })

  it('should have imageGallery block with layout options', () => {
    const galleryBlock = schemaTypes.find(schema => schema.name === 'imageGallery')
    
    expect(galleryBlock).toBeDefined()
    expect(galleryBlock?.type).toBe('object')
    
    const layoutField = galleryBlock?.fields?.find((field: any) => field.name === 'layout')
    expect(layoutField).toBeDefined()
    expect(layoutField?.options?.list).toBeDefined()
    expect(layoutField?.options?.list?.length).toBeGreaterThan(0)
  })

  it('should have callout block with type options', () => {
    const calloutBlock = schemaTypes.find(schema => schema.name === 'callout')
    
    expect(calloutBlock).toBeDefined()
    expect(calloutBlock?.type).toBe('object')
    
    const typeField = calloutBlock?.fields?.find((field: any) => field.name === 'type')
    expect(typeField).toBeDefined()
    expect(typeField?.options?.list).toBeDefined()
    
    const typeValues = typeField?.options?.list?.map((item: any) => item.value)
    expect(typeValues).toContain('info')
    expect(typeValues).toContain('warning')
    expect(typeValues).toContain('success')
    expect(typeValues).toContain('note')
  })

  it('should have inlineImage block with width options', () => {
    const inlineImageBlock = schemaTypes.find(schema => schema.name === 'inlineImage')
    
    expect(inlineImageBlock).toBeDefined()
    expect(inlineImageBlock?.type).toBe('image')
    
    const widthField = inlineImageBlock?.fields?.find((field: any) => field.name === 'width')
    expect(widthField).toBeDefined()
    expect(widthField?.options?.list).toBeDefined()
    
    const widthValues = widthField?.options?.list?.map((item: any) => item.value)
    expect(widthValues).toContain('full')
    expect(widthValues).toContain('wide')
    expect(widthValues).toContain('standard')
  })

  it('should have video block with url field', () => {
    const videoBlock = schemaTypes.find(schema => schema.name === 'video')
    
    expect(videoBlock).toBeDefined()
    expect(videoBlock?.type).toBe('object')
    
    const urlField = videoBlock?.fields?.find((field: any) => field.name === 'url')
    expect(urlField).toBeDefined()
    expect(urlField?.type).toBe('url')
  })

  it('should have enhanced project schema with specifications', () => {
    const projectSchema = schemaTypes.find(schema => schema.name === 'project')
    
    expect(projectSchema).toBeDefined()
    
    const specsField = projectSchema?.fields?.find((field: any) => field.name === 'specifications')
    expect(specsField).toBeDefined()
    expect(specsField?.type).toBe('object')
    
    const specsFieldNames = specsField?.fields?.map((field: any) => field.name)
    expect(specsFieldNames).toContain('loa')
    expect(specsFieldNames).toContain('beam')
    expect(specsFieldNames).toContain('draft')
    expect(specsFieldNames).toContain('guests')
    expect(specsFieldNames).toContain('crew')
  })

  it('should have enhanced project schema with status field', () => {
    const projectSchema = schemaTypes.find(schema => schema.name === 'project')
    
    const statusField = projectSchema?.fields?.find((field: any) => field.name === 'status')
    expect(statusField).toBeDefined()
    expect(statusField?.type).toBe('string')
    
    const statusValues = statusField?.options?.list?.map((item: any) => item.value)
    expect(statusValues).toContain('concept')
    expect(statusValues).toContain('under-construction')
    expect(statusValues).toContain('completed')
  })
})
