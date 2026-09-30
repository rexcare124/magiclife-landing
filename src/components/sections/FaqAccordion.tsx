"use client";

import clsx from "clsx";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type FaqAccordionProps = {
  eyebrow: string;
  title: string;
  items: { q: string; a: string }[];
};

export function FaqAccordion({ eyebrow, title, items }: FaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <SectionHeading className="max-w-sm">{title}</SectionHeading>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="border-t border-line">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className={clsx("border-b transition-colors", isOpen ? "border-gold" : "border-line")}>
                  <h3>
                    <button
                      type="button"
                      id={`${baseId}-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`${baseId}-a-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left font-heading text-lg sm:text-xl"
                    >
                      {item.q}
                      <span
                        className={clsx(
                          "flex size-9 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                          isOpen ? "rotate-45 bg-ink text-gold-light" : "border border-line text-ink",
                        )}
                      >
                        <Plus aria-hidden className="size-4" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`${baseId}-a-${i}`}
                    role="region"
                    aria-labelledby={`${baseId}-q-${i}`}
                    className={clsx(
                      "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-6 leading-relaxed text-muted">{item.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
