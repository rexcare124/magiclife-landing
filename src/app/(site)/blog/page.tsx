import { Feather } from "lucide-react";
import type { Metadata } from "next";
import { BlogList } from "@/components/blog/BlogList";
import { PostCard } from "@/components/blog/PostCard";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import { blog } from "@/content/pages/blog";
import { sanityFetch } from "@/sanity/lib/client";
import { CATEGORIES_QUERY, POSTS_QUERY, type Category, type PostCard as PostCardData } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Blog",
  description: blog.hero.body,
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    sanityFetch<PostCardData[]>({ query: POSTS_QUERY, fallback: [] }),
    sanityFetch<Category[]>({ query: CATEGORIES_QUERY, fallback: [] }),
  ]);

  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p._id !== featured?._id);

  return (
    <>
      <PageHero {...blog.hero} />
      <section className="py-20 lg:py-28">
        <Container>
          {featured ? (
            <>
              <Reveal>
                <PostCard post={featured} featured />
              </Reveal>
              {rest.length > 0 && (
                <div className="mt-16">
                  <BlogList posts={rest} categories={categories} />
                </div>
              )}
            </>
          ) : (
            <Reveal className="mx-auto flex max-w-xl flex-col items-center rounded-card border border-line bg-pearl px-8 py-16 text-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-ink text-gold-light ring-1 ring-gold/40">
                <Feather aria-hidden className="size-7" />
              </span>
              <h2 className="mt-6 font-heading text-3xl">{blog.empty.title}</h2>
              <p className="mt-3 text-muted">{blog.empty.body}</p>
              <PillButton href={blog.empty.cta.href} variant="dark" className="mt-8">
                {blog.empty.cta.label}
              </PillButton>
            </Reveal>
          )}
        </Container>
      </section>
    </>
  );
}
