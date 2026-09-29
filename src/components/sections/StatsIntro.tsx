import { Star } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { statsIntro } from "@/content/site";

export function StatsIntro() {
  return (
    <section id="about" className="border-b border-line">
      <Container className="grid lg:grid-cols-[1fr_2fr]">
        <Reveal className="flex flex-col justify-center border-line py-14 lg:border-r lg:py-24 lg:pr-12">
          <CountUp
            value={statsIntro.stat.value}
            suffix={statsIntro.stat.suffix}
            className="font-heading text-6xl font-normal tracking-tight sm:text-7xl"
          />
          <p className="mt-5 text-base">{statsIntro.stat.label}</p>

          <div className="mt-10 flex -space-x-3">
            {statsIntro.avatars.map((src, i) => (
              <div key={src} className="relative size-14 overflow-hidden rounded-full border-2 border-white sm:size-16" style={{ zIndex: 10 - i }}>
                <Image src={src} alt="" fill sizes="64px" className="object-cover" />
              </div>
            ))}
          </div>
          <p className="mt-4 flex items-center gap-2 text-base">
            <Star aria-hidden className="size-4 fill-amber-400 text-amber-400" />
            {statsIntro.trust}
          </p>
        </Reveal>

        <Reveal delay={0.15} className="flex flex-col justify-center border-t border-line py-14 lg:border-t-0 lg:py-24 lg:pl-32">
          <SectionHeading>{statsIntro.title}</SectionHeading>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{statsIntro.body}</p>
        </Reveal>
      </Container>
    </section>
  );
}
