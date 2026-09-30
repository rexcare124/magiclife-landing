import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ctaSplit } from "@/content/site";

type CtaSplitProps = Partial<typeof ctaSplit>;

export function CtaSplit(props: CtaSplitProps) {
  const { title, body, cta, image } = { ...ctaSplit, ...props };

  return (
    <section className="bg-pearl py-20 lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <Reveal className="max-w-lg">
          <SectionHeading>{title}</SectionHeading>
          <p className="mt-6 leading-relaxed text-muted sm:text-lg">{body}</p>
          <PillButton href={cta.href} variant="dark" className="mt-8">
            {cta.label}
          </PillButton>
        </Reveal>
        <Reveal delay={0.1} className="relative aspect-[4/3] overflow-hidden rounded-card ring-1 ring-gold/40 lg:aspect-[9/10]">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-1000 hover:scale-105"
          />
        </Reveal>
      </Container>
    </section>
  );
}
