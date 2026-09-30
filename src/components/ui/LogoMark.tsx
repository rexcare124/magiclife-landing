"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useId, useRef } from "react";

const ease = [0.65, 0, 0.35, 1] as const;

const RING_S = 0.9;
const ROAD_START = 0.8;
const ROAD_S = 1.4;
const STAR_START = ROAD_START + ROAD_S - 0.05;

const STAR_D = "M51.8 17.5 Q52.5 34.3 68 35 Q52.5 35.7 51.8 52.5 Q51.1 35.7 35.6 35 Q51.1 34.3 51.8 17.5 Z";
const ROAD_TIP = { x: 58.5, y: 43 };
const STAR_CENTER = { x: 51.8, y: 35 };

const ring: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: RING_S, ease } },
};

const road: Variants = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1, transition: { delay: ROAD_START, duration: ROAD_S, ease: [0.45, 0, 0.2, 1] } },
};

const trail: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: [0, 1, 1],
    opacity: [0, 1, 0],
    transition: { delay: STAR_START, duration: 0.9, times: [0, 0.45, 1], ease: "easeOut" },
  },
};

const star: Variants = {
  hidden: { x: ROAD_TIP.x - STAR_CENTER.x, y: ROAD_TIP.y - STAR_CENTER.y, scale: 0.1, opacity: 0, rotate: -45 },
  visible: {
    x: [ROAD_TIP.x - STAR_CENTER.x, -0.6, 0],
    y: [ROAD_TIP.y - STAR_CENTER.y, -4, 0],
    scale: [0.1, 1.2, 1],
    opacity: [0, 1, 1],
    rotate: [-45, 8, 0],
    transition: { delay: STAR_START, duration: 1, times: [0, 0.55, 1], ease: "easeOut" },
  },
};

const flash: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: [0, 1.8, 1],
    opacity: [0, 1, 0.75],
    transition: { delay: STAR_START + 0.45, duration: 0.9, ease: "easeOut" },
  },
};

const SPARKS = [
  { x: -13, y: -9 },
  { x: 14, y: -11 },
  { x: -10, y: 10 },
  { x: 16, y: 6 },
];

const spark: Variants = {
  hidden: { x: 0, y: 0, opacity: 0, scale: 0 },
  visible: (i: number) => ({
    x: SPARKS[i].x,
    y: SPARKS[i].y,
    opacity: [0, 1, 0],
    scale: [0, 1, 0.4],
    transition: { delay: STAR_START + 0.5, duration: 0.9, ease: "easeOut" },
  }),
};

type LogoMarkProps = {
  className?: string;
  /** "mount" plays immediately; "inView" waits until the mark scrolls into view. */
  play?: "mount" | "inView";
};

export function LogoMark({ className, play = "mount" }: LogoMarkProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const shouldPlay = play === "mount" || inView;

  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 100 100"
      aria-hidden
      className={className}
      initial={reduceMotion ? false : "hidden"}
      animate={shouldPlay ? "visible" : "hidden"}
    >
      <defs>
        <linearGradient id={`${id}-ring`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbe7b0" />
          <stop offset="0.45" stopColor="#d6ab45" />
          <stop offset="1" stopColor="#8a6414" />
        </linearGradient>
        <linearGradient id={`${id}-road`} x1="0.2" y1="1" x2="0.7" y2="0.3">
          <stop offset="0" stopColor="#b8893a" />
          <stop offset="0.6" stopColor="#e6c27a" />
          <stop offset="1" stopColor="#fbe7b0" />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor="#fff4d2" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#f4d98a" stopOpacity="0.4" />
          <stop offset="1" stopColor="#f4d98a" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id={`${id}-trail`}
          gradientUnits="userSpaceOnUse"
          x1={ROAD_TIP.x}
          y1={ROAD_TIP.y}
          x2={STAR_CENTER.x}
          y2={STAR_CENTER.y - 6}
        >
          <stop offset="0" stopColor="#f4d98a" stopOpacity="0" />
          <stop offset="1" stopColor="#fff4d2" />
        </linearGradient>
        <clipPath id={`${id}-inside`}>
          <circle cx="50" cy="50" r="45.2" />
        </clipPath>
        <mask id={`${id}-reveal`} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
          <motion.path
            d="M22 104 C27 82, 39 69, 49.5 61.5 C57.5 56, 62.5 50.5, 58.5 42"
            fill="none"
            stroke="#fff"
            strokeWidth="26"
            strokeLinecap="round"
            variants={road}
          />
        </mask>
      </defs>

      <motion.circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke={`url(#${id}-ring)`}
        strokeWidth="1.8"
        transform="rotate(-90 50 50)"
        variants={ring}
      />

      <g clipPath={`url(#${id}-inside)`}>
        <g mask={`url(#${id}-reveal)`} fill={`url(#${id}-road)`}>
          <path d="M6 90 C18 74, 32 66, 45 59.5 C53 55.5, 57.5 50, 56.5 43 C59 44.5, 60.2 47, 59.4 49.6 C56.5 56, 48 61, 40.5 66 C33.5 71, 30 80, 30.5 98 L6 98 Z" />
          <path d="M33.5 98 C33 83, 36.5 74, 43.5 68.5 C51 62.5, 59.5 57.5, 61.2 50.5 C61.8 47.5, 60.5 45, 58 43 C62.5 44.5, 66.2 48.5, 65.6 54 C65 60, 57.5 64, 50.5 69 C44 73.5, 42.5 82, 46.5 98 Z" />
        </g>
      </g>

      <motion.path
        d={`M${ROAD_TIP.x} ${ROAD_TIP.y} Q${STAR_CENTER.x + 3} ${STAR_CENTER.y + 2}, ${STAR_CENTER.x} ${STAR_CENTER.y - 6}`}
        fill="none"
        stroke={`url(#${id}-trail)`}
        strokeWidth="1.6"
        strokeLinecap="round"
        variants={trail}
      />

      <motion.circle cx={STAR_CENTER.x} cy={STAR_CENTER.y} r="14" fill={`url(#${id}-glow)`} variants={flash} />

      {SPARKS.map((_, i) => (
        <motion.circle key={i} cx={STAR_CENTER.x} cy={STAR_CENTER.y} r="0.9" fill="#fff4d2" custom={i} variants={spark} />
      ))}

      <motion.path d={STAR_D} fill="#fff1c8" variants={star} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </motion.svg>
  );
}
