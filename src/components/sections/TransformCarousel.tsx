"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { transform } from "@/content/site";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const INTERVAL_MS = 4000;
const ease = [0.22, 1, 0.36, 1] as const;

function relativeOffset(index: number, active: number, count: number) {
  const half = Math.floor(count / 2);
  return ((index - active + count + half) % count) - half;
}

export function TransformCarousel() {
  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const count = transform.projects.length;

  const go = useCallback((dir: 1 | -1) => setActive((a) => (a + dir + count) % count), [count]);

  useEffect(() => {
    if (reduceMotion || hovering) return;
    const id = window.setInterval(() => go(1), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, hovering, go, active]);

  const maxVisible = isDesktop ? 2 : 0;
  const rotation = reduceMotion ? 0 : 38;

  return (
    <section id="work" className="overflow-hidden bg-charcoal py-20 text-white lg:py-28">
      <Container>
        <Reveal>
          <p className="mx-auto max-w-3xl text-center font-heading text-3xl leading-[1.25] sm:text-4xl lg:text-5xl">
            {transform.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="text-gold-gradient flex flex-wrap items-center justify-center gap-x-4">
              {transform.lastLine.before}
              <span className="inline-flex -space-x-3" aria-hidden>
                {transform.thumbs.map((src) => (
                  <span key={src} className="relative inline-block size-12 overflow-hidden rounded-full border-2 border-gold sm:size-14">
                    <Image src={src} alt="" fill sizes="56px" className="object-cover" />
                  </span>
                ))}
              </span>
              {transform.lastLine.after}
            </span>
          </p>
        </Reveal>
      </Container>

      <div
        className="relative mt-16 h-[15rem] sm:h-[18rem] lg:h-[22rem]"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        aria-roledescription="carousel"
        aria-label="Selected projects"
      >
        {transform.projects.map((project, i) => {
          const offset = relativeOffset(i, active, count);
          const abs = Math.abs(offset);
          const visible = abs <= maxVisible;

          return (
            <div
              key={project.title}
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              style={{ perspective: "1400px", zIndex: 10 - abs }}
            >
              <motion.button
                type="button"
                tabIndex={offset === 0 ? -1 : visible ? 0 : -1}
                aria-hidden={!visible}
                aria-label={offset === 0 ? project.title : `Show ${project.title}`}
                onClick={() => setActive(i)}
                className="pointer-events-auto relative aspect-[16/10] w-[78vw] max-w-[26rem] overflow-hidden rounded-3xl md:w-[34vw]"
                initial={false}
                animate={{
                  x: `${offset * (abs === 2 ? 70 : 105)}%`,
                  rotateY: offset === 0 ? 0 : offset < 0 ? rotation : -rotation,
                  scale: abs === 0 ? 1 : abs === 1 ? 0.78 : 0.62,
                  opacity: visible ? (abs === 2 ? 0.7 : 1) : 0,
                }}
                transition={{ duration: 0.9, ease }}
              >
                <Image src={project.image} alt={project.title} fill sizes="(min-width: 768px) 34vw, 78vw" className="object-cover" />
                <span className="absolute inset-0 bg-ink/10 ring-1 ring-gold/30 ring-inset rounded-3xl" />
              </motion.button>
            </div>
          );
        })}
      </div>

      <Container className="mt-10 flex items-center justify-center gap-6">
        <CarouselButton label="Previous project" onClick={() => go(-1)}>
          <ChevronLeft className="size-5" />
        </CarouselButton>
        <div className="min-w-44 text-center" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="font-heading text-lg text-gold-light"
            >
              {transform.projects[active].title}
            </motion.p>
          </AnimatePresence>
        </div>
        <CarouselButton label="Next project" onClick={() => go(1)}>
          <ChevronRight className="size-5" />
        </CarouselButton>
      </Container>
    </section>
  );
}

function CarouselButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-11 items-center justify-center rounded-full border border-gold/50 text-gold-light transition-colors hover:bg-gold hover:text-ink"
    >
      {children}
    </button>
  );
}
