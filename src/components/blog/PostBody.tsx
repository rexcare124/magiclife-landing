import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/queries";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-6 leading-relaxed text-ink/85 sm:text-lg">{children}</p>,
    h2: ({ children }) => <h2 className="mt-14 font-heading text-3xl font-medium sm:text-4xl">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-10 font-heading text-2xl font-medium">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="mt-10 border-l-2 border-gold bg-pearl py-5 pr-6 pl-6 font-heading text-xl leading-relaxed italic sm:text-2xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-6 list-disc space-y-2 pl-6 marker:text-gold sm:text-lg">{children}</ul>,
    number: ({ children }) => <ol className="mt-6 list-decimal space-y-2 pl-6 marker:text-gold-deep sm:text-lg">{children}</ol>,
  },
  marks: {
    code: ({ children }) => <code className="rounded bg-pearl px-1.5 py-0.5 font-mono text-[0.9em]">{children}</code>,
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="font-medium text-gold-deep underline decoration-gold/50 underline-offset-4 transition-colors hover:text-ink"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: SanityImage & { caption?: string } }) => (
      <figure className="mt-10">
        <div className="relative aspect-[16/10] overflow-hidden rounded-card">
          <Image
            src={urlFor(value).width(1400).url()}
            alt={value.alt ?? ""}
            fill
            sizes="(min-width: 768px) 720px, 100vw"
            className="object-cover"
          />
        </div>
        {value.caption && <figcaption className="mt-3 text-center text-sm text-muted">{value.caption}</figcaption>}
      </figure>
    ),
  },
};

export function PostBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
