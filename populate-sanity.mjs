import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config()

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Sample yacht projects
const projects = [
  {
    _type: 'project',
    title: 'Oceanus 85',
    slug: { _type: 'slug', current: 'oceanus-85' },
    category: 'Latest Concepts',
    shipyard: 'Feadship',
    year: '2026',
    length: '85m',
    beam: '14.5m',
    draft: '3.8m',
    guests: '12',
    crew: '18',
    excerpt: 'A revolutionary concept combining sustainable propulsion with timeless elegance. Oceanus 85 represents the future of superyacht design.',
    description: `The Oceanus 85 is a groundbreaking concept that pushes the boundaries of sustainable luxury. Featuring hybrid propulsion, solar panels integrated into the superstructure, and advanced hull design for maximum efficiency.

The interior showcases contemporary minimalism with natural materials, floor-to-ceiling windows, and flexible living spaces that adapt to the owner's lifestyle. The beach club opens to create a seamless connection with the sea.`,
    featured: true,

    gallery: []
  },
  {
    _type: 'project',
    title: 'Aurora Refit',
    slug: { _type: 'slug', current: 'aurora-refit' },
    category: 'Under Construction',
    shipyard: 'Lürssen',
    year: '2025',
    length: '110m',
    beam: '17.2m',
    draft: '4.2m',
    guests: '16',
    crew: '28',
    excerpt: 'Complete interior transformation of a classic 110m superyacht, blending heritage with contemporary luxury.',
    description: `Aurora undergoes a comprehensive refit, preserving her classic exterior lines whilst completely reimagining the interior spaces. The project focuses on creating light-filled, contemporary environments that honour the yacht's heritage.

New technical systems, updated crew areas, and a redesigned owner's deck ensure Aurora meets modern standards whilst maintaining her timeless appeal.`,
    featured: true,

    gallery: []
  },
  {
    _type: 'project',
    title: 'Meridian Explorer',
    slug: { _type: 'slug', current: 'meridian-explorer' },
    category: 'Latest Concepts',
    shipyard: 'Amels',
    year: '2027',
    length: '75m',
    beam: '13.8m',
    draft: '3.5m',
    guests: '10',
    crew: '16',
    excerpt: 'An ice-class explorer yacht designed for global adventures without compromising on luxury or style.',
    description: `Meridian Explorer combines expedition capability with refined luxury. Ice-class hull, extended range, and advanced navigation systems enable worldwide cruising.

The design features a helicopter deck, dive centre, and spacious tender garage. Interior spaces emphasise comfort and functionality for extended voyages.`,
    featured: true,

    gallery: []
  },
  {
    _type: 'project',
    title: 'Serenity 60',
    slug: { _type: 'slug', current: 'serenity-60' },
    category: 'New Build',
    shipyard: 'Benetti',
    year: '2025',
    length: '60m',
    beam: '11.5m',
    draft: '3.2m',
    guests: '12',
    crew: '14',
    excerpt: 'A perfectly proportioned 60-metre yacht featuring elegant lines and sophisticated interior design.',
    description: `Serenity 60 embodies timeless yacht design with contemporary touches. Clean exterior lines, generous deck spaces, and thoughtfully planned interior layouts create an exceptional cruising experience.

The owner's suite spans the entire main deck forward, whilst guest cabins on the lower deck offer privacy and comfort. The sundeck features a spa pool and al fresco dining.`,
    featured: false,

    gallery: []
  },
  {
    _type: 'project',
    title: 'Velocity 50',
    slug: { _type: 'slug', current: 'velocity-50' },
    category: 'Latest Concepts',
    shipyard: 'Heesen',
    year: '2026',
    length: '50m',
    beam: '9.2m',
    draft: '2.8m',
    guests: '10',
    crew: '10',
    excerpt: 'A high-performance aluminium yacht combining speed with elegant design and efficient operation.',
    description: `Velocity 50 is designed for owners who value performance without sacrificing style. Lightweight aluminium construction and powerful propulsion deliver impressive speeds.

The interior features a contemporary aesthetic with carbon fibre details and technical finishes. Large windows flood spaces with natural light.`,
    featured: false,

    gallery: []
  },
  {
    _type: 'project',
    title: 'Tranquility Refit',
    slug: { _type: 'slug', current: 'tranquility-refit' },
    category: 'Under Construction',
    shipyard: 'Oceanco',
    year: '2025',
    length: '90m',
    beam: '15.5m',
    draft: '3.9m',
    guests: '14',
    crew: '22',
    excerpt: 'Comprehensive technical and aesthetic upgrade for a 90-metre superyacht, enhancing performance and luxury.',
    description: `Tranquility's refit programme addresses both technical systems and interior aesthetics. New propulsion, updated navigation, and enhanced efficiency systems ensure optimal performance.

Interior redesign creates flowing spaces with natural materials, bespoke furniture, and integrated technology. The beach club expands to include a spa and wellness area.`,
    featured: false,

    gallery: []
  }
]

// Sample team members
const teamMembers = [
  {
    _type: 'teamMember',
    name: 'James Harrison',
    role: 'Founder & Design Director',
    bio: 'With over 25 years of experience in superyacht design, James founded H2 Yacht Design to create vessels that combine innovation with timeless elegance. His portfolio includes some of the world\'s most iconic superyachts.',
    email: 'james@h2yachtdesign.com',

  },
  {
    _type: 'teamMember',
    name: 'Sophie Laurent',
    role: 'Lead Naval Architect',
    bio: 'Sophie brings technical excellence and innovative thinking to every project. Her expertise in hydrodynamics and structural engineering ensures optimal performance and safety.',
    email: 'sophie@h2yachtdesign.com',

  },
  {
    _type: 'teamMember',
    name: 'Marcus Chen',
    role: 'Senior Interior Designer',
    bio: 'Marcus specialises in creating bespoke interiors that reflect each owner\'s unique vision. His attention to detail and understanding of luxury living define his work.',
    email: 'marcus@h2yachtdesign.com',

  },
  {
    _type: 'teamMember',
    name: 'Isabella Romano',
    role: 'Project Manager',
    bio: 'Isabella coordinates complex yacht projects from concept to delivery, ensuring seamless collaboration between designers, shipyards, and clients.',
    email: 'isabella@h2yachtdesign.com',

  }
]

// Sample news articles
const newsArticles = [
  {
    _type: 'news',
    title: 'H2 Yacht Design Unveils Oceanus 85 Concept',
    slug: { _type: 'slug', current: 'oceanus-85-concept-unveiled' },
    publishedAt: new Date('2026-01-15').toISOString(),
    excerpt: 'Our latest concept yacht combines sustainable propulsion with timeless design, setting new standards for the industry.',
    content: `H2 Yacht Design is proud to unveil the Oceanus 85, a revolutionary concept that reimagines sustainable luxury on the water. This 85-metre superyacht features hybrid propulsion, solar integration, and advanced hull design.

The concept has already generated significant interest from environmentally conscious owners who refuse to compromise on style or performance. The Oceanus 85 demonstrates that sustainability and luxury can coexist beautifully.

"We believe the future of yachting lies in responsible design that respects our oceans whilst delivering exceptional experiences," says James Harrison, Founder and Design Director.`,

  },
  {
    _type: 'news',
    title: 'Aurora Refit Project Progresses on Schedule',
    slug: { _type: 'slug', current: 'aurora-refit-progress' },
    publishedAt: new Date('2025-12-10').toISOString(),
    excerpt: 'The comprehensive refit of the 110m Aurora is proceeding smoothly, with interior installation now underway.',
    content: `The Aurora refit project has reached a significant milestone with the completion of structural work and the commencement of interior installation. The project, undertaken in collaboration with Lürssen, represents one of the most comprehensive refits in recent years.

The design team has worked closely with the owner to create contemporary spaces that honour the yacht's heritage. New technical systems ensure Aurora will meet modern standards for decades to come.

Completion is scheduled for summer 2025, with sea trials planned for early autumn.`,

  },
  {
    _type: 'news',
    title: 'H2 Yacht Design Expands Nice Office',
    slug: { _type: 'slug', current: 'nice-office-expansion' },
    publishedAt: new Date('2025-11-20').toISOString(),
    excerpt: 'Growing demand for our services has led to the expansion of our Nice office, adding new design and engineering capabilities.',
    content: `H2 Yacht Design announces the expansion of its Nice office, reflecting the studio's continued growth and increasing project portfolio. The expanded facility includes additional design studios, engineering workspaces, and a dedicated client presentation area.

The Nice office now houses a team of 15 professionals, complementing our London headquarters. This expansion strengthens our presence in the Mediterranean and enhances our ability to collaborate with European shipyards.

"The Mediterranean remains central to the superyacht industry, and our expanded Nice presence ensures we can serve our clients effectively," notes Sophie Laurent, Lead Naval Architect.`,

  }
]

async function populateSanity() {
  try {
    console.log('Starting Sanity population...')
    console.log(`Project ID: ${process.env.VITE_SANITY_PROJECT_ID}`)
    console.log(`Dataset: ${process.env.VITE_SANITY_DATASET}`)

    // Create projects
    console.log('\nCreating yacht projects...')
    for (const project of projects) {
      const result = await client.create(project)
      console.log(`✓ Created project: ${project.title}`)
    }

    // Create team members
    console.log('\nCreating team members...')
    for (const member of teamMembers) {
      const result = await client.create(member)
      console.log(`✓ Created team member: ${member.name}`)
    }

    // Create news articles
    console.log('\nCreating news articles...')
    for (const article of newsArticles) {
      const result = await client.create(article)
      console.log(`✓ Created news article: ${article.title}`)
    }

    console.log('\n✅ Sanity population complete!')
    console.log('\nNote: Image placeholders need to be replaced with actual images in Sanity Studio.')
    console.log('You can access Sanity Studio by running: pnpm sanity dev')
  } catch (error) {
    console.error('Error populating Sanity:', error)
    process.exit(1)
  }
}

populateSanity()
