"use client";

import clsx from "clsx";
import { useState } from "react";
import { LogoMark } from "@/components/ui/LogoMark";
import { site } from "@/content/site";

type LogoProps = {
  className?: string;
  size?: "sm" | "lg";
  play?: "mount" | "inView";
  showSlogan?: boolean;
};

export function Logo({ className, size = "sm", play = "mount", showSlogan = false }: LogoProps) {
  const lg = size === "lg";
  // Bumping the key remounts the mark, which replays its draw-in animation.
  const [replay, setReplay] = useState(0);

  return (
    <span
      className={clsx("inline-flex items-center", lg ? "gap-4 sm:gap-5" : "gap-2.5", className)}
      onMouseEnter={() => setReplay((n) => n + 1)}
    >
      <LogoMark key={replay} play={play} className={clsx("shrink-0", lg ? "size-20 sm:size-24" : "size-10 sm:size-11")} />
      <span className="flex flex-col">
        <span
          className={clsx(
            "text-gold-gradient font-heading font-medium tracking-[0.02em] whitespace-nowrap",
            lg ? "text-4xl sm:text-5xl" : "text-xl sm:text-2xl",
          )}
        >
          {site.name}
        </span>
        {showSlogan && <span className="mt-1.5 max-w-xs text-sm leading-snug text-white/70">{site.slogan}</span>}
      </span>
    </span>
  );
}
