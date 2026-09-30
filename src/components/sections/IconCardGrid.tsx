import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type IconCardGridProps = {
  eyebrow: string;
  title: string;
  items: { icon: LucideIcon; title: string; body: string }[];
  tone?: "light" | "dark";
};

export function IconCardGrid({ eyebrow, title, items, tone = "light" }: IconCardGridProps) {
  const dark = tone === "dark";

  return (
    <section className={clsx("py-20 lg:py-28", dark ? "bg-ink text-white" : "bg-white")}>
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
          <SectionHeading>{title}</SectionHeading>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title: itemTitle, body }, i) => (
            <Reveal
              key={itemTitle}
              delay={(i % 3) * 0.08}
              className={clsx(
                "group relative overflow-hidden rounded-card border p-8 transition-colors duration-500",
                dark
                  ? "border-gold/20 bg-charcoal hover:border-gold/60"
                  : "border-line bg-pearl hover:border-gold/60 hover:bg-white",
              )}
            >
              <span
                aria-hidden
                className="absolute -top-16 -right-16 size-40 rounded-full bg-gold/15 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="relative flex size-12 items-center justify-center rounded-full bg-ink text-gold-light ring-1 ring-gold/40">
                <Icon aria-hidden className="size-5" />
              </span>
              <h3 className="relative mt-6 font-heading text-xl">{itemTitle}</h3>
              <p className={clsx("relative mt-3 leading-relaxed", dark ? "text-white/70" : "text-muted")}>{body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
