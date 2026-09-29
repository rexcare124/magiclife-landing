"use client";

import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import Image from "next/image";
import { useId, useState } from "react";
import { Container } from "@/components/ui/Container";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { servicesTabs } from "@/content/site";

export function ServicesTabs() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tab = servicesTabs.tabs[active];

  return (
    <section id="services" className="py-20 lg:py-28">
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="mb-4 text-sm font-medium tracking-wide text-muted uppercase">{servicesTabs.eyebrow}</p>
            <SectionHeading className="max-w-xl">{servicesTabs.title}</SectionHeading>
          </div>
          <div className="flex flex-col gap-6 lg:items-end lg:text-right">
            <p className="max-w-sm text-muted">{servicesTabs.footnote}</p>
            <PillButton href={servicesTabs.cta.href} variant="dark">
              {servicesTabs.cta.label}
            </PillButton>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal delay={0.1} className="flex flex-col">
            <div role="tablist" aria-label="Services" className="flex flex-col border-t border-line">
              {servicesTabs.tabs.map((t, i) => (
                <button
                  key={t.label}
                  id={`${baseId}-tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={i === active}
                  aria-controls={`${baseId}-panel`}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={clsx(
                    "group flex items-center justify-between border-b border-line py-6 text-left font-heading text-2xl transition-colors sm:text-3xl",
                    i === active ? "text-ink" : "text-ink/35 hover:text-ink/70",
                  )}
                >
                  {t.label}
                  <span className="font-sans text-sm tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                </button>
              ))}
            </div>
            <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${active}`} className="mt-8 min-h-28">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="max-w-lg leading-relaxed text-muted"
                >
                  {tab.body}
                </motion.p>
              </AnimatePresence>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="relative aspect-[4/3] overflow-hidden rounded-card bg-mist">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image src={tab.image} alt={tab.label} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
