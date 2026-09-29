import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ctaSplit } from "@/content/site";

export function CtaSplit() {
  return (
    <section className="bg-mist py-20 lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <Reveal className="max-w-lg">
          <SectionHeading>{ctaSplit.title}</SectionHeading>
          <p className="mt-6 leading-relaxed text-muted sm:text-lg">{ctaSplit.body}</p>
          <PillButton href={ctaSplit.cta.href} variant="navy" className="mt-8">
            {ctaSplit.cta.label}
          </PillButton>
        </Reveal>
        <Reveal delay={0.1} className="relative aspect-[4/3] overflow-hidden rounded-card lg:aspect-[9/10]">
          <Image
            src={ctaSplit.image}
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
