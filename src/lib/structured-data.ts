/**
 * JSON-LD structured data generators for H2 Yacht Design.
 *
 * Use:
 *   <script type="application/ld+json"
 *           dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
 *
 * Types: Organization, LocalBusiness, WebSite, Article (project), NewsArticle,
 * BreadcrumbList, FAQPage, Service.
 */

const SITE_URL = 'https://h2-yacht-design.vercel.app'
const COMPANY = 'H2 Yacht Design'
const FOUNDED = 1994

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: COMPANY,
  url: SITE_URL,
  logo: `${SITE_URL}/images/h2-logo.png`,
  founder: {
    '@type': 'Person',
    name: 'Jonny Horsfield',
    jobTitle: 'Owner & Creative Director',
  },
  foundingDate: String(FOUNDED),
  description:
    'London and Nice-based superyacht design studio founded by Jonny Horsfield. Award-winning interior and exterior design for the world\'s finest superyachts since 1994.',
  knowsAbout: [
    'Superyacht interior design',
    'Superyacht exterior design',
    'Yacht refit design',
    'Hospitality interior design',
    'Residential interior design',
    'Tender design',
  ],
  areaServed: 'Worldwide',
  sameAs: [
    'https://www.instagram.com/h2yachtdesign/',
    'https://www.linkedin.com/company/h2-yacht-design/',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '+44-208-788-5008',
      email: 'info@h2yachtdesign.com',
      availableLanguage: ['English', 'French'],
      areaServed: 'Worldwide',
    },
  ],
}

export const londonOfficeSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#london-office`,
  name: `${COMPANY} — London Studio`,
  parentOrganization: { '@id': `${SITE_URL}/#organization` },
  url: SITE_URL,
  telephone: '+44-208-788-5008',
  email: 'info@h2yachtdesign.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '8 Princeton Court, 53/55 Felsham Road',
    addressLocality: 'Putney, London',
    postalCode: 'SW15 1AZ',
    addressCountry: 'GB',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 51.4621, longitude: -0.2165 },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
}

export const niceOfficeSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#nice-office`,
  name: `${COMPANY} — Nice Studio`,
  parentOrganization: { '@id': `${SITE_URL}/#organization` },
  url: SITE_URL,
  telephone: '+33-422-328-906',
  email: 'info@h2yachtdesign.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4 Palais Jolienne, 43 Boulevard Gambetta, 5th Floor',
    addressLocality: 'Nice',
    postalCode: '06000',
    addressCountry: 'FR',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 43.7034, longitude: 7.2663 },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: COMPANY,
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en-GB',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/projects?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
}

/** Breadcrumbs JSON-LD. Pass an ordered array of {name, url}. */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}

/** Project page Article schema. Pass project doc from Sanity. */
export function projectSchema(project: any, imageUrl?: string) {
  const slug = project.slug?.current || project.slug
  const url = `${SITE_URL}/projects/${slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${url}#creativework`,
    name: project.title,
    alternateName: project.alternativeNames || undefined,
    description: project.excerpt || `${project.title} — ${project.shipyard || 'superyacht'} designed by H2 Yacht Design.`,
    url,
    image: imageUrl ? [imageUrl] : undefined,
    creator: { '@id': `${SITE_URL}/#organization` },
    dateCreated: project.year ? `${project.year}-01-01` : undefined,
    keywords: [
      project.title,
      project.shipyard,
      project.length ? `${project.length} superyacht` : undefined,
      project.category,
      'H2 Yacht Design',
      'superyacht design',
    ]
      .filter(Boolean)
      .join(', '),
    provider: { '@id': `${SITE_URL}/#organization` },
  }
}

/** News article schema. */
export function newsArticleSchema(article: any, imageUrl?: string) {
  const slug = article.slug?.current || article.slug
  const url = `${SITE_URL}/news/${slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': `${url}#article`,
    headline: article.title,
    description: article.excerpt,
    url,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    image: imageUrl ? [imageUrl] : undefined,
    publisher: {
      '@type': 'Organization',
      name: article.publication || COMPANY,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/h2-logo.png` },
    },
    author: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }
}

/** Service offerings (for /about or homepage). */
export const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Yacht Design',
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Yacht Design Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Interior Design',
          description: 'Bespoke interior architecture for superyachts — custom layouts, materials, fabrics, and detailing.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Exterior Design',
          description: 'Complete exterior styling from naval profile to deck detailing.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Refit Design',
          description: 'Specialist yacht refit projects — full or partial interior and exterior reimagining.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Hospitality & Residential Design',
          description: 'Hotels, private residences, and tenders designed with the same craft as our yachts.',
        },
      },
    ],
  },
}

/** FAQ schema (for AI-quotable Q&A blocks). */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

/** Person schema (for Jonny Horsfield team page). */
export function personSchema(person: { name: string; role?: string; bio?: string; image?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.role,
    description: person.bio,
    image: person.image,
    worksFor: { '@id': `${SITE_URL}/#organization` },
  }
}
