"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { PillButton } from "@/components/ui/PillButton";
import { hero } from "@/content/site";

const INTERVAL_MS = 6000;
const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = hero.slides.length;

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + count) % count), [count]);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setInterval(() => go(1), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, go, index]);

  const slide = hero.slides[index];

  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 -z-10">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease }}
          >
            <Image
              src={hero.backgrounds[index % hero.backgrounds.length]}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-linear-to-b from-ink/70 via-forest/45 to-ink/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_18%,rgba(214,171,69,0.22),transparent_70%)]" />
        <div className="absolute inset-0 grid grid-cols-4" aria-hidden>
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="border-r border-gold/15 last:border-r-0" />
          ))}
        </div>
      </div>

      <motion.p
        aria-hidden
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease }}
        className="pointer-events-none absolute inset-x-0 top-10 text-center font-display text-[19vw] leading-none font-black tracking-tight text-transparent select-none sm:top-14 lg:text-[15rem] xl:text-[17rem]"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(244,217,138,0.95) 0%, rgba(214,171,69,0.55) 45%, rgba(214,171,69,0.04) 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        {hero.displayWord}
      </motion.p>

      <Container className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-end gap-10 pt-[36vw] pb-10 sm:pt-72 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:pb-14">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mb-4 flex items-center gap-2 text-sm font-medium text-gold-light sm:text-base"
          >
            <Sparkles aria-hidden className="size-4" />
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
            className="font-heading text-4xl leading-[1.1] font-normal text-balance sm:text-5xl lg:text-6xl"
          >
            {hero.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease }}
            className="mt-8 flex flex-col gap-6"
          >
            <PillButton href={hero.cta.href} className="self-start">
              {hero.cta.label}
            </PillButton>
            <p className="max-w-md text-sm leading-relaxed text-white/80 sm:text-base">{hero.body}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease }}
          className="w-full max-w-sm shrink-0 self-center rounded-[28px] border border-gold/40 bg-forest/35 p-6 backdrop-blur-xl sm:self-end lg:max-w-md"
          aria-roledescription="carousel"
          aria-label="Highlights"
        >
          <div className="relative min-h-[18rem] overflow-hidden sm:min-h-[20rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease }}
                aria-live={paused ? "polite" : "off"}
              >
                <h2 className="font-display text-xl font-bold tracking-wide text-gold-light sm:text-2xl">{slide.title}</h2>
                <p className="mt-1 text-sm text-white/85 sm:text-base">{slide.body}</p>
                <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-2xl">
                  <Image src={slide.image} alt={slide.title} fill sizes="(min-width: 1024px) 420px, 90vw" className="object-cover" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="flex gap-1.5">
              {hero.slides.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-8 bg-gold" : "w-1.5 bg-white/40"}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <HeroControl label={paused ? "Play slideshow" : "Pause slideshow"} onClick={() => setPaused((p) => !p)}>
                {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
              </HeroControl>
              <HeroControl label="Previous slide" onClick={() => go(-1)}>
                <ChevronLeft className="size-5" />
              </HeroControl>
              <HeroControl label="Next slide" onClick={() => go(1)}>
                <ChevronRight className="size-5" />
              </HeroControl>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function HeroControl({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-10 items-center justify-center rounded-full border border-gold/50 text-gold-light transition-colors hover:bg-gold hover:text-ink"
    >
      {children}
    </button>
  );
}
