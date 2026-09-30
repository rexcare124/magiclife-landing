import { Check } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { creamSplit } from "@/content/site";

export function CreamSplit() {
  const { first, second } = creamSplit;

  return (
    <section id="process" className="bg-ivory py-20 lg:py-28">
      <Container className="flex flex-col gap-20 lg:gap-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <Reveal className="order-2 lg:order-1">
            <SectionHeading className="max-w-lg">{first.title}</SectionHeading>
            <ul className="mt-10 space-y-8">
              {first.items.map((item) => (
                <li key={item.title} className="flex gap-5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-forest text-gold-light">
                    <Check aria-hidden className="size-4" />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg">{item.title}</h3>
                    <p className="mt-2 max-w-md leading-relaxed text-muted">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <PillButton href={first.cta.href} variant="green" className="mt-10">
              {first.cta.label}
            </PillButton>
          </Reveal>
          <Reveal delay={0.1} className="relative order-1 aspect-[4/3] overflow-hidden rounded-card lg:order-2 lg:aspect-[5/4]">
            <Image src={first.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </Reveal>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-4">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-card lg:aspect-[1/1]">
            <Image src={second.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </Reveal>
          <Reveal delay={0.1} className="lg:pl-8">
            <SectionHeading className="max-w-lg">{second.title}</SectionHeading>
            <hr className="my-8 border-gold/50" />
            <p className="leading-relaxed">{second.body}</p>
            <ul className="mt-6 list-disc space-y-1.5 pl-5 marker:text-gold">
              {second.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <PillButton href={second.cta.href} variant="green" className="mt-8">
              {second.cta.label}
            </PillButton>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
