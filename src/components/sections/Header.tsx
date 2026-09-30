"use client";

import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { PillButton } from "@/components/ui/PillButton";
import { footer, memberCta, nav, site } from "@/content/site";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-ink text-white">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" aria-label={`${site.name} home`}>
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 xl:flex">
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "relative py-1 text-sm transition-colors hover:text-gold-light",
                  active
                    ? "text-gold-light after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-gold"
                    : "text-white/75",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden xl:block">
            <PillButton href={memberCta.href} className="py-1.5! text-sm">
              {memberCta.label}
            </PillButton>
          </div>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
            className="relative flex size-10 flex-col items-end justify-center gap-1.5 xl:hidden"
          >
            <span className="h-px w-6 bg-gold-light" />
            <span className="h-px w-6 bg-gold-light" />
            <span className="h-px w-4 bg-gold-light" />
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
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-linear-to-b from-ink via-ink to-charcoal"
          >
            <Container className="flex h-16 shrink-0 items-center justify-between">
              <Logo />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex size-10 items-center justify-center text-gold-light"
              >
                <X className="size-6" />
              </button>
            </Container>

            <Container className="flex flex-1 flex-col justify-between py-10">
              <ul className="divide-y divide-gold/20 border-y border-gold/20">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.5 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      className={clsx(
                        "group flex items-center justify-between py-5 font-heading text-3xl transition-colors hover:text-gold-light sm:text-4xl",
                        isActive(pathname, item.href) && "text-gold-light",
                      )}
                    >
                      {item.label}
                      <ArrowUpRight className="size-6 text-gold/70 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold-light" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="flex flex-col gap-6 pt-10 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-1 text-white/70">
                  <p>{site.email}</p>
                  <p>{site.location}</p>
                </div>
                <div onClick={() => setOpen(false)} className="self-start">
                  <PillButton href={footer.cta.href}>{footer.cta.label}</PillButton>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
