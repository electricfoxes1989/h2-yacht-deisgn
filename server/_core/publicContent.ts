import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

export async function fetchFeaturedProjects() {
  return sanityClient.fetch(
    `*[_type == "project" && featured == true] | order(order asc) {
      _id,
      title,
      slug,
      shipyard,
      category,
      year,
      length,
      excerpt,
      mainImage,
      order
    }`
  );
}

export async function fetchAllProjects() {
  return sanityClient.fetch(
    `*[_type == "project"] | order(year desc) {
      _id,
      title,
      slug,
      shipyard,
      category,
      year,
      length,
      excerpt,
      mainImage
    }`
  );
}

export async function fetchProjectBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      shipyard,
      category,
      year,
      length,
      excerpt,
      description,
      mainImage,
      gallery
    }`,
    { slug }
  );
}

export async function fetchLatestNews(limit: number = 3) {
  return sanityClient.fetch(
    `*[_type == "news"] | order(publishedAt desc) [0...$limit] {
      _id,
      title,
      slug,
      publishedAt,
      publication,
      excerpt,
      mainImage,
      externalUrl
    }`,
    { limit }
  );
}

export async function fetchAllNews() {
  return sanityClient.fetch(
    `*[_type == "news"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      publication,
      excerpt,
      mainImage,
      externalUrl
    }`
  );
}

export async function fetchNewsBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type == "news" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      publication,
      excerpt,
      content,
      mainImage,
      externalUrl
    }`,
    { slug }
  );
}
