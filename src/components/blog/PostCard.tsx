import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/components/blog/format";
import { urlFor } from "@/sanity/lib/image";
import type { PostCard as PostCardData } from "@/sanity/lib/queries";

type PostCardProps = {
  post: PostCardData;
  featured?: boolean;
};

export function PostCard({ post, featured = false }: PostCardProps) {
  const cover = post.coverImage ? urlFor(post.coverImage).width(featured ? 1400 : 900).height(featured ? 900 : 600).url() : null;

  return (
    <article
      className={clsx(
        "group relative flex h-full flex-col overflow-hidden rounded-card border transition-colors duration-500",
        featured
          ? "border-gold/30 bg-ink text-white hover:border-gold/70 lg:grid lg:grid-cols-[1.2fr_1fr]"
          : "border-line bg-white hover:border-gold/60",
      )}
    >
      <div className={clsx("relative overflow-hidden bg-charcoal", featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-[26rem]" : "aspect-[3/2]")}>
        {cover ? (
          <Image
            src={cover}
            alt={post.coverImage?.alt ?? ""}
            fill
            sizes={featured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div aria-hidden className="text-gold-gradient absolute inset-0 flex items-center justify-center font-display text-5xl font-black">
            ML
          </div>
        )}
      </div>

      <div className={clsx("flex flex-1 flex-col", featured ? "p-8 sm:p-10 lg:justify-center" : "p-6")}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
          {post.categories?.[0] && (
            <span className={clsx("rounded-full px-3 py-1 font-medium", featured ? "bg-gold text-ink" : "bg-ink text-gold-light")}>
              {post.categories[0].title}
            </span>
          )}
          <time dateTime={post.publishedAt} className={featured ? "text-white/60" : "text-muted"}>
            {formatDate(post.publishedAt)}
          </time>
        </div>

        <h3 className={clsx("mt-4 font-heading text-balance", featured ? "text-3xl sm:text-4xl" : "text-xl")}>
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        {post.excerpt && (
          <p className={clsx("mt-3 line-clamp-3 leading-relaxed", featured ? "text-white/75 sm:text-lg" : "text-muted")}>{post.excerpt}</p>
        )}

        <div className="mt-auto flex items-center justify-between pt-6">
          {post.author ? (
            <p className={clsx("text-sm", featured ? "text-white/70" : "text-muted")}>
              By <span className={featured ? "text-gold-light" : "text-ink"}>{post.author.name}</span>
            </p>
          ) : (
            <span />
          )}
          <span
            aria-hidden
            className={clsx(
              "flex size-10 items-center justify-center rounded-full transition-colors duration-300",
              featured ? "bg-gold text-ink" : "border border-line text-ink group-hover:border-ink group-hover:bg-ink group-hover:text-gold-light",
            )}
          >
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
