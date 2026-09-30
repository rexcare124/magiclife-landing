import clsx from "clsx";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialIcon } from "@/components/ui/SocialIcon";
import type { TeamMember } from "@/content/pages/team";

type TeamGridProps = {
  eyebrow: string;
  title: string;
  members: TeamMember[];
  variant?: "featured" | "compact";
};

export function TeamGrid({ eyebrow, title, members, variant = "compact" }: TeamGridProps) {
  const featured = variant === "featured";

  return (
    <section className={clsx("py-20 lg:py-28", featured ? "bg-ink text-white" : "bg-white")}>
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow tone={featured ? "dark" : "light"}>{eyebrow}</Eyebrow>
          <SectionHeading>{title}</SectionHeading>
        </Reveal>

        <div
          className={clsx(
            "mt-14 grid gap-5",
            featured ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4",
          )}
        >
          {members.map((m, i) => (
            <Reveal key={m.name} delay={(i % 4) * 0.08}>
              <article className="group relative aspect-[4/5] overflow-hidden rounded-card bg-charcoal ring-1 ring-gold/20 transition-shadow duration-500 hover:ring-gold/70">
                <Image
                  src={m.image}
                  alt={`${m.name}, ${m.role}`}
                  fill
                  sizes={featured ? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
                  className="object-cover grayscale-[35%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/30 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <p className="text-sm font-medium tracking-wide text-gold-light uppercase">{m.role}</p>
                  <h3 className={clsx("mt-1 font-heading", featured ? "text-2xl" : "text-xl")}>{m.name}</h3>
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="pt-3 text-sm leading-relaxed text-white/80">{m.bio}</p>
                      <ul className="flex gap-2 pt-4">
                        {m.socials.map((s) => (
                          <li key={s.label}>
                            <a
                              href={s.href}
                              aria-label={`${m.name} on ${s.label}`}
                              className="flex size-9 items-center justify-center rounded-full border border-gold/40 text-gold-light transition-colors hover:bg-gold hover:text-ink"
                            >
                              <SocialIcon name={s.label.toLowerCase() as Lowercase<typeof s.label>} className="size-3.5" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
