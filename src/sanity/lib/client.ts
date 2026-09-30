import { createClient, type QueryParams } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";

export const client = createClient({
  projectId: isSanityConfigured ? projectId : "missing-project-id",
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN,
});

export const POSTS_TAG = "post";

export async function sanityFetch<T>({
  query,
  params = {},
  fallback,
  revalidate = 3600,
}: {
  query: string;
  params?: QueryParams;
  fallback: T;
  revalidate?: number;
}): Promise<T> {
  if (!isSanityConfigured) return fallback;

  try {
    const data = await client.fetch<T>(query, params, { next: { revalidate, tags: [POSTS_TAG] } });
    return data ?? fallback;
  } catch (err) {
    console.error("[sanity] Query failed", err);
    return fallback;
  }
}
