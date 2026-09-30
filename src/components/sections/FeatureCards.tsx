"use client";

import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import { featureCards } from "@/content/site";

export function FeatureCards() {
  const [paused, setPaused] = useState(false);
  const { media, highlight, showcase } = featureCards;

  return (
    <section className="py-16 lg:py-20">
      <Container className="grid gap-5 md:grid-cols-2 lg:grid-cols-[1fr_1.25fr_1.25fr]">
        <Reveal className="relative min-h-[26rem] overflow-hidden rounded-card md:row-span-2 lg:row-span-1">
          <Image
            src={media.image}
            alt={media.alt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
            className="animate-kenburns object-cover"
            style={{ animationPlayState: paused ? "paused" : "running" }}
          />
          <button
            type="button"
            aria-label={paused ? "Play animation" : "Pause animation"}
            onClick={() => setPaused((p) => !p)}
            className="absolute bottom-5 left-5 flex size-12 items-center justify-center rounded-full bg-ink/40 text-gold-light backdrop-blur-md transition-colors hover:bg-ink/60"
          >
            {paused ? <Play className="size-5 fill-gold-light" /> : <Pause className="size-5 fill-gold-light" />}
          </button>
        </Reveal>

        <Reveal
          delay={0.1}
          className="flex min-h-[22rem] flex-col items-center justify-center gap-6 rounded-card border border-gold/30 bg-linear-to-br from-ink to-charcoal px-8 py-12 text-center text-white"
        >
          <h3 className="text-gold-gradient font-heading text-2xl font-medium tracking-[0.01em] sm:text-[1.75rem]">{highlight.title}</h3>
          <p className="max-w-xs leading-relaxed text-white/85">{highlight.body}</p>
          <PillButton href={highlight.cta.href}>{highlight.cta.label}</PillButton>
        </Reveal>

        <Reveal delay={0.2} className="flex flex-col gap-8 rounded-card bg-ink p-6 text-white sm:p-8">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
            <Image
              src={showcase.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 35vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <h3 className="max-w-[14ch] font-heading text-2xl font-medium tracking-[0.01em] sm:text-[1.75rem]">{showcase.title}</h3>
        </Reveal>
      </Container>
    </section>
  );
}
