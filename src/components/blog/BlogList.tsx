"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PostCard } from "@/components/blog/PostCard";
import { blog } from "@/content/pages/blog";
import type { Category, PostCard as PostCardData } from "@/sanity/lib/queries";

type BlogListProps = {
  posts: PostCardData[];
  categories: Category[];
};

export function BlogList({ posts, categories }: BlogListProps) {
  const [active, setActive] = useState<string | null>(null);
  const visible = active ? posts.filter((p) => p.categories?.some((c) => c.slug === active)) : posts;

  return (
    <div>
      {categories.length > 0 && (
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {[{ title: blog.allCategories, slug: null as string | null }, ...categories].map((c) => {
            const selected = active === c.slug;
            return (
              <button
                key={c.slug ?? "all"}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(c.slug)}
                className={clsx(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  selected ? "border-ink bg-ink text-gold-light" : "border-line text-ink/70 hover:border-gold hover:text-ink",
                )}
              >
                {c.title}
              </button>
            );
          })}
        </div>
      )}

      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((post) => (
            <motion.div
              key={post._id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
