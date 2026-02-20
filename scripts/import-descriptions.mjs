#!/usr/bin/env node
/**
 * import-descriptions.mjs
 *
 * Extracts project descriptions from the WordPress static HTML export
 * and patches each matching Sanity project document with:
 *   - description  (Portable Text blocks)
 *   - excerpt      (plain text, first ~200 chars)
 *
 * Usage:
 *   node scripts/import-descriptions.mjs --dry-run   # preview only
 *   node scripts/import-descriptions.mjs              # execute migration
 */

import { createClient } from '@sanity/client'
import { readFileSync, existsSync, readdirSync } from 'fs'
import { resolve, join } from 'path'
import { randomUUID } from 'crypto'

// ── Config ───────────────────────────────────────────────────────────
const DRY_RUN = process.argv.includes('--dry-run')
const VERBOSE = process.argv.includes('--verbose')

const SITE_DIR = resolve(import.meta.dirname, '../../site/project')

const client = createClient({
  projectId: 'dhren5s2',
  dataset: 'production',
  token:
    'skzyLgtxrwgmjrfNDoBd6u0hWz96swXwa1qLj8WL1nVbJdgTns418Ymuti3ZwcPJUPmnMRY4QZ7R9kDHV',
  useCdn: false,
  apiVersion: '2024-01-01',
})

// ── HTML helpers ─────────────────────────────────────────────────────

/**
 * Extract all <p> content from within `.hero-overlay article`
 * and `.image-text-4col` blocks. Skips empty paragraphs and
 * boilerplate elements (nav, footer, specs).
 */
function extractParagraphs(html) {
  const paragraphs = []

  // 1. Hero article paragraphs
  const heroMatch = html.match(
    /<div class="hero-overlay">\s*<article>([\s\S]*?)<\/article>/
  )
  if (heroMatch) {
    const articleHtml = heroMatch[1]
    // Extract all <p> tags (may span multiple lines)
    const pTags = articleHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/g) || []
    for (const pTag of pTags) {
      const text = cleanHtml(pTag)
      if (text && text.length > 5) {
        paragraphs.push(text)
      }
    }
  }

  // 2. image-text-4col paragraphs (e.g. Scout, hotel projects)
  const textColRegex =
    /<div class="image-text-4col">\s*([\s\S]*?)<\/div>/g
  let colMatch
  while ((colMatch = textColRegex.exec(html)) !== null) {
    const colHtml = colMatch[1]
    const pTags = colHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/g) || []
    for (const pTag of pTags) {
      const text = cleanHtml(pTag)
      if (text && text.length > 5) {
        paragraphs.push(text)
      }
    }
  }

  return paragraphs
}

/**
 * Strip HTML tags and decode common entities.
 */
function cleanHtml(html) {
  return html
    .replace(/<[^>]+>/g, '') // strip tags
    .replace(/&#8217;/g, '\u2019') // right single quote
    .replace(/&#8216;/g, '\u2018') // left single quote
    .replace(/&#8220;/g, '\u201C') // left double quote
    .replace(/&#8221;/g, '\u201D') // right double quote
    .replace(/&#8211;/g, '\u2013') // en-dash
    .replace(/&#8212;/g, '\u2014') // em-dash
    .replace(/&#8242;/g, '\u2032') // prime (feet)
    .replace(/&#8243;/g, '\u2033') // double prime (inches)
    .replace(/&#\d+;/g, (m) => {  // catch-all numeric entities
      const code = parseInt(m.slice(2, -1), 10)
      return String.fromCharCode(code)
    })
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ') // collapse whitespace
    .trim()
}

// ── Sanity Portable Text helpers ─────────────────────────────────────

function makeKey() {
  return randomUUID().replace(/-/g, '').slice(0, 12)
}

/**
 * Convert an array of plain-text paragraphs into Sanity Portable Text
 * block array.
 */
function toPortableText(paragraphs) {
  return paragraphs.map((text) => ({
    _type: 'block',
    _key: makeKey(),
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: makeKey(),
        text,
        marks: [],
      },
    ],
  }))
}

/**
 * Generate a short excerpt from the first paragraph (~200 chars,
 * trimmed at a word boundary).
 */
function makeExcerpt(paragraphs, maxLen = 200) {
  if (paragraphs.length === 0) return ''
  const first = paragraphs[0]
  if (first.length <= maxLen) return first
  const trimmed = first.slice(0, maxLen)
  const lastSpace = trimmed.lastIndexOf(' ')
  return (lastSpace > 0 ? trimmed.slice(0, lastSpace) : trimmed) + '…'
}

// ── Main ─────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n${'═'.repeat(60)}`)
  console.log(`  H2 Yacht Design — Import Project Descriptions`)
  console.log(`  Mode: ${DRY_RUN ? '🔍 DRY RUN (no writes)' : '✏️  LIVE (will patch Sanity)'}`)
  console.log(`${'═'.repeat(60)}\n`)

  // 1. Fetch all Sanity projects
  const sanityProjects = await client.fetch(
    `*[_type == "project"] { _id, title, "slug": slug.current, "hasDesc": defined(description) && count(description) > 0 }`
  )
  console.log(`📦 Sanity projects found: ${sanityProjects.length}`)

  // Build slug → project map
  const slugMap = new Map()
  for (const p of sanityProjects) {
    if (p.slug) slugMap.set(p.slug, p)
  }

  // 2. Read HTML directories
  const htmlDirs = readdirSync(SITE_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  console.log(`📂 HTML project folders found: ${htmlDirs.length}\n`)

  let matched = 0
  let skippedNoText = 0
  let skippedNoMatch = 0
  let skippedAlreadyHasDesc = 0
  let updated = 0
  let errors = 0

  const results = []

  for (const slug of htmlDirs) {
    const htmlPath = join(SITE_DIR, slug, 'index.html')
    if (!existsSync(htmlPath)) {
      if (VERBOSE) console.log(`  ⚠  ${slug}: no index.html`)
      continue
    }

    const html = readFileSync(htmlPath, 'utf-8')
    const paragraphs = extractParagraphs(html)

    // Look up in Sanity
    const sanityProject = slugMap.get(slug)

    if (!sanityProject) {
      skippedNoMatch++
      if (VERBOSE) console.log(`  ❌ ${slug}: no Sanity match`)
      results.push({ slug, status: 'no-match' })
      continue
    }

    matched++

    if (paragraphs.length === 0) {
      skippedNoText++
      if (VERBOSE) console.log(`  ⬜ ${slug}: no text found in HTML`)
      results.push({
        slug,
        status: 'no-text',
        sanityTitle: sanityProject.title,
      })
      continue
    }

    if (sanityProject.hasDesc) {
      skippedAlreadyHasDesc++
      if (VERBOSE)
        console.log(`  ✅ ${slug}: already has description — skipping`)
      results.push({
        slug,
        status: 'already-has-desc',
        sanityTitle: sanityProject.title,
      })
      continue
    }

    const description = toPortableText(paragraphs)
    const excerpt = makeExcerpt(paragraphs)

    console.log(
      `  📝 ${slug} → ${paragraphs.length} paragraph(s), excerpt: "${excerpt.slice(0, 80)}…"`
    )

    if (!DRY_RUN) {
      try {
        await client
          .patch(sanityProject._id)
          .set({ description, excerpt })
          .commit()
        updated++
        results.push({
          slug,
          status: 'updated',
          paragraphs: paragraphs.length,
          sanityTitle: sanityProject.title,
        })
      } catch (err) {
        errors++
        console.error(`  ‼️  ${slug}: patch failed — ${err.message}`)
        results.push({ slug, status: 'error', error: err.message })
      }
    } else {
      updated++ // count as "would update" in dry-run
      results.push({
        slug,
        status: 'would-update',
        paragraphs: paragraphs.length,
        excerpt: excerpt.slice(0, 100),
        sanityTitle: sanityProject.title,
      })
    }
  }

  // ── Summary ──────────────────────────────────────────────────────
  console.log(`\n${'─'.repeat(60)}`)
  console.log(`  Summary`)
  console.log(`${'─'.repeat(60)}`)
  console.log(`  Sanity projects:           ${sanityProjects.length}`)
  console.log(`  HTML folders:              ${htmlDirs.length}`)
  console.log(`  Matched slug → Sanity:     ${matched}`)
  console.log(`  Had text to import:        ${updated}`)
  console.log(`  Skipped (no text in HTML): ${skippedNoText}`)
  console.log(`  Skipped (already has desc):${skippedAlreadyHasDesc}`)
  console.log(`  No Sanity match:           ${skippedNoMatch}`)
  if (!DRY_RUN) {
    console.log(`  Successfully patched:      ${updated}`)
    console.log(`  Errors:                    ${errors}`)
  }
  console.log(`${'─'.repeat(60)}\n`)

  // List unmatched slugs for debugging
  if (skippedNoMatch > 0) {
    console.log('Unmatched HTML slugs (no Sanity project found):')
    results
      .filter((r) => r.status === 'no-match')
      .forEach((r) => console.log(`  - ${r.slug}`))
    console.log()
  }

  // List projects with no text
  if (skippedNoText > 0 && VERBOSE) {
    console.log('Projects matched but with no extractable text:')
    results
      .filter((r) => r.status === 'no-text')
      .forEach((r) =>
        console.log(`  - ${r.slug} (Sanity: "${r.sanityTitle}")`)
      )
    console.log()
  }
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
