"use client";

import clsx from "clsx";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const DIGITS = Array.from({ length: 10 }, (_, i) => i);

type CountUpProps = {
  value: number;
  suffix?: string;
  className?: string;
  digitClassName?: string;
};

export function CountUp({ value, suffix = "", className, digitClassName }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const digits = String(value).split("").map(Number);

  return (
    <span ref={ref} className={className} aria-label={`${value}${suffix}`}>
      <span aria-hidden className="inline-flex overflow-hidden leading-none tabular-nums">
        {digits.map((digit, index) => (
          <span key={index} className="relative inline-block h-[1em] overflow-hidden">
            <motion.span
              className="flex flex-col"
              initial={{ y: "0em" }}
              animate={{ y: inView || reduceMotion ? `-${digit}em` : "0em" }}
              transition={{
                duration: reduceMotion ? 0 : 1.6,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {DIGITS.map((d) => (
                <span key={d} className={clsx("block h-[1em]", digitClassName)}>
                  {d}
                </span>
              ))}
            </motion.span>
          </span>
        ))}
        <span className={digitClassName}>{suffix}</span>
      </span>
    </span>
  );
}
