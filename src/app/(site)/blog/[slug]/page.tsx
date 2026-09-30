import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/components/blog/format";
import { PostBody } from "@/components/blog/PostBody";
import { PostCard } from "@/components/blog/PostCard";
import { CtaSplit } from "@/components/sections/CtaSplit";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blog } from "@/content/pages/blog";
import { sanityFetch } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  LATEST_POSTS_QUERY,
  POST_QUERY,
  POST_SLUGS_QUERY,
  RELATED_POSTS_QUERY,
  type Post,
  type PostCard as PostCardData,
} from "@/sanity/lib/queries";

const getPost = (slug: string) => sanityFetch<Post | null>({ query: POST_QUERY, params: { slug }, fallback: null });

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({ query: POST_SLUGS_QUERY, fallback: [] });
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const image = post.coverImage ? urlFor(post.coverImage).width(1200).height(630).url() : undefined;
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : undefined,
      images: image ? [{ url: image, width: 1200, height: 630, alt: post.coverImage?.alt ?? post.title }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const categorySlugs = post.categories?.map((c) => c.slug) ?? [];
  let related = categorySlugs.length
    ? await sanityFetch<PostCardData[]>({ query: RELATED_POSTS_QUERY, params: { slug, categorySlugs }, fallback: [] })
    : [];
  if (related.length === 0) {
    related = await sanityFetch<PostCardData[]>({ query: LATEST_POSTS_QUERY, params: { slug }, fallback: [] });
  }

  const cover = post.coverImage ? urlFor(post.coverImage).width(1800).height(1000).url() : null;
  const avatar = post.author?.image ? urlFor(post.author.image).width(96).height(96).url() : null;

  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden bg-ink text-white">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_60%_at_80%_0%,rgba(214,171,69,0.22),transparent_70%)]"
          />
          <Container className="pt-16 pb-40 sm:pt-20 lg:pb-52">
            <Reveal className="mx-auto max-w-3xl text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-gold-light"
              >
                <ArrowLeft aria-hidden className="size-4" />
                Back to blog
              </Link>
              {post.categories && post.categories.length > 0 && (
                <div className="mt-8 flex flex-wrap justify-center gap-2">
                  {post.categories.map((c) => (
                    <span key={c.slug} className="rounded-full bg-gold px-3 py-1 text-sm font-medium text-ink">
                      {c.title}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="mt-6 font-heading text-4xl leading-[1.1] font-normal text-balance sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>
              {post.excerpt && <p className="mx-auto mt-6 max-w-2xl text-white/75 sm:text-lg">{post.excerpt}</p>}
              <div className="mt-8 flex items-center justify-center gap-4 text-sm text-white/70">
                {post.author && (
                  <span className="flex items-center gap-3">
                    {avatar && (
                      <span className="relative size-10 overflow-hidden rounded-full ring-2 ring-gold">
                        <Image src={avatar} alt="" fill sizes="40px" className="object-cover" />
                      </span>
                    )}
                    <span className="text-gold-light">{post.author.name}</span>
                  </span>
                )}
                <span aria-hidden className="size-1 rounded-full bg-gold" />
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </div>
            </Reveal>
          </Container>
        </header>

        <Container className="relative -mt-28 lg:-mt-40">
          {cover && (
            <Reveal className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-card ring-1 ring-gold/40">
              <Image src={cover} alt={post.coverImage?.alt ?? ""} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
            </Reveal>
          )}
          <div className={cover ? "mx-auto max-w-3xl py-16 lg:py-20" : "mx-auto max-w-3xl pt-36 pb-16 lg:pt-48 lg:pb-20"}>
            {post.body && <PostBody value={post.body} />}

            {post.author && (
              <aside className="mt-16 flex gap-5 rounded-card border border-line bg-pearl p-6 sm:p-8">
                {avatar && (
                  <span className="relative size-16 shrink-0 overflow-hidden rounded-full ring-2 ring-gold">
                    <Image src={avatar} alt="" fill sizes="64px" className="object-cover" />
                  </span>
                )}
                <div>
                  <p className="text-sm font-medium tracking-wide text-gold-deep uppercase">Written by</p>
                  <p className="mt-1 font-heading text-xl">{post.author.name}</p>
                  {post.author.role && <p className="text-sm text-muted">{post.author.role}</p>}
                  {post.author.bio && <p className="mt-3 leading-relaxed text-muted">{post.author.bio}</p>}
                </div>
              </aside>
            )}
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section className="border-t border-line bg-ivory py-20 lg:py-24">
          <Container>
            <Reveal>
              <Eyebrow>{blog.related}</Eyebrow>
              <SectionHeading>More from the MagicLife blog</SectionHeading>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p._id} delay={i * 0.08}>
                  <PostCard post={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaSplit />
    </>
  );
}
