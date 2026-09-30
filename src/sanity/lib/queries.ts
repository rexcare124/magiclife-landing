import type { PortableTextBlock } from "@portabletext/react";
import { defineQuery } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";

export type SanityImage = SanityImageSource & { alt?: string };

export type Category = { title: string; slug: string };

export type PostCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  featured?: boolean;
  coverImage?: SanityImage;
  author?: { name: string; role?: string; image?: SanityImage };
  categories?: Category[];
};

export type Post = PostCard & {
  body?: PortableTextBlock[];
  author?: PostCard["author"] & { bio?: string };
};

const baseFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  featured,
  coverImage,
  categories[]->{ title, "slug": slug.current }
`;

const cardFields = /* groq */ `${baseFields}, author->{ name, role, image }`;

const published = /* groq */ `_type == "post" && defined(slug.current) && publishedAt <= now()`;

export const POSTS_QUERY = defineQuery(`*[${published}] | order(publishedAt desc) { ${cardFields} }`);

export const CATEGORIES_QUERY = defineQuery(
  `*[_type == "category" && count(*[${published} && references(^._id)]) > 0] | order(title asc) { title, "slug": slug.current }`,
);

export const POST_QUERY = defineQuery(
  `*[${published} && slug.current == $slug][0] { ${baseFields}, author->{ name, role, image, bio }, body }`,
);

export const POST_SLUGS_QUERY = defineQuery(`*[${published}] { "slug": slug.current, publishedAt }`);

export const RELATED_POSTS_QUERY = defineQuery(
  `*[${published} && slug.current != $slug && count((categories[]->slug.current)[@ in $categorySlugs]) > 0] | order(publishedAt desc)[0...3] { ${cardFields} }`,
);

export const LATEST_POSTS_QUERY = defineQuery(
  `*[${published} && slug.current != $slug] | order(publishedAt desc)[0...3] { ${cardFields} }`,
);
