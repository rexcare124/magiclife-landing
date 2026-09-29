"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { PillButton } from "@/components/ui/PillButton";
import { footer, nav, site } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-ink text-white">
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" className="font-heading text-lg font-medium tracking-[0.18em] whitespace-nowrap uppercase sm:text-xl">
          {site.shortName}
          <span className="text-white/50"> Agency</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-white/75 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <PillButton href="#contact" className="py-1.5! text-sm">
              Get in touch
            </PillButton>
          </div>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
            className="relative flex size-10 flex-col items-end justify-center gap-1.5 lg:hidden"
          >
            <span className="h-px w-6 bg-white" />
            <span className="h-px w-6 bg-white" />
            <span className="h-px w-4 bg-white" />
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink"
          >
            <Container className="flex h-16 shrink-0 items-center justify-between">
              <span className="font-heading text-lg font-medium tracking-[0.18em] whitespace-nowrap uppercase sm:text-xl">
                {site.shortName}
                <span className="text-white/50"> Agency</span>
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex size-10 items-center justify-center"
              >
                <X className="size-6" />
              </button>
            </Container>

            <Container className="flex flex-1 flex-col justify-between py-10">
              <ul className="divide-y divide-white/15 border-y border-white/15">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.5 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between py-5 font-heading text-3xl sm:text-4xl"
                    >
                      {item.label}
                      <ArrowUpRight className="size-6 text-white/60 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="flex flex-col gap-6 pt-10 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-1 text-white/70">
                  <p>{site.email}</p>
                  <p>{site.location}</p>
                </div>
                <PillButton href={footer.cta.href} className="self-start">
                  {footer.cta.label}
                </PillButton>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
