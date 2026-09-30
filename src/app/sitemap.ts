import type { MetadataRoute } from "next";
import { nav, site } from "@/content/site";
import { sanityFetch } from "@/sanity/lib/client";
import { POST_SLUGS_QUERY } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await sanityFetch<{ slug: string; publishedAt: string }[]>({ query: POST_SLUGS_QUERY, fallback: [] });

  const pages: MetadataRoute.Sitemap = nav.map(({ href }) => ({
    url: new URL(href, site.url).toString(),
    changeFrequency: href === "/blog" ? "weekly" : "monthly",
    priority: href === "/" ? 1 : 0.8,
  }));

  const articles: MetadataRoute.Sitemap = posts.map((p) => ({
    url: new URL(`/blog/${p.slug}`, site.url).toString(),
    lastModified: p.publishedAt,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...pages, ...articles];
}
