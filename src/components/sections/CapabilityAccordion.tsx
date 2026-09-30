"use client";

import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import Image from "next/image";
import { useId, useState } from "react";
import { Container } from "@/components/ui/Container";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { capabilities } from "@/content/site";

export function CapabilityAccordion({ className, divider = true }: { className?: string; divider?: boolean }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const item = capabilities.items[active];

  return (
    <section className={clsx("bg-ink pb-20 text-white lg:pb-28", className)}>
      <Container>
        <div className={clsx("pt-16 lg:pt-20", divider && "border-t border-gold/20")}>
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading className="max-w-md">{capabilities.title}</SectionHeading>
            <PillButton href={capabilities.cta.href} className="self-start sm:self-auto">
              {capabilities.cta.label}
            </PillButton>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-4">
            <Reveal delay={0.1} className="order-2 lg:order-1 lg:pr-4">
              <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${active}`}>
                <div className="relative aspect-[7/5] overflow-hidden rounded-card">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={active}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image src={item.image} alt={item.label} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="mt-10 min-h-28">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={active}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35 }}
                      className="max-w-lg leading-relaxed text-white/90"
                    >
                      {item.body}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="order-1 lg:order-2">
              <div role="tablist" aria-label="Capabilities" aria-orientation="vertical" className="border-t border-gold/20">
                {capabilities.items.map((c, i) => (
                  <button
                    key={c.label}
                    id={`${baseId}-tab-${i}`}
                    role="tab"
                    type="button"
                    aria-selected={i === active}
                    aria-controls={`${baseId}-panel`}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={clsx(
                      "relative flex w-full items-center justify-between gap-6 border-b border-gold/20 px-5 py-5 text-left font-display text-xl font-bold transition-colors duration-300 sm:text-2xl",
                      i === active ? "text-gold-light" : "text-white/45 hover:text-white/75",
                    )}
                  >
                    {i === active && (
                      <motion.span
                        layoutId={`${baseId}-highlight`}
                        className="absolute inset-0 border-l-2 border-gold bg-charcoal-soft"
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                    <span className="relative">{c.label}</span>
                    <span className="relative tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
