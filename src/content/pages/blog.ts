import { images, memberCta } from "@/content/site";

export const blog = {
  hero: {
    eyebrow: "Blog",
    title: "Insights, member stories and agency news",
    body: "Practical ideas on earning alongside your job, behind-the-scenes looks at our client work and updates from the MagicLife community.",
    image: images.planning,
  },
  empty: {
    title: "No posts yet",
    body: "Our first articles are on their way. In the meantime, find out how membership works.",
    cta: { label: "Explore features", href: "/features" },
  },
  allCategories: "All",
  related: "Keep reading",
  cta: memberCta,
};
