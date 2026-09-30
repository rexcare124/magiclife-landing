import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about } from "@/content/pages/about";

export function AboutStory() {
  const { story } = about;

  return (
    <section className="py-20 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-card">
            <Image src={story.image} alt="The MagicLife team working together" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div
            aria-hidden
            className="absolute -right-4 -bottom-4 -z-10 h-2/3 w-2/3 rounded-card border border-gold/50 sm:-right-6 sm:-bottom-6"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <Eyebrow>{story.eyebrow}</Eyebrow>
          <SectionHeading>{story.title}</SectionHeading>
          <div className="mt-8 space-y-5 leading-relaxed text-muted sm:text-lg">
            {story.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {story.pillars.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-card border border-gold/30 bg-ink p-6 text-white">
                <Icon aria-hidden className="size-6 text-gold-light" />
                <h3 className="text-gold-gradient mt-4 font-heading text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
