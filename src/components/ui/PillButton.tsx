import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type Variant = "gold" | "light" | "dark";

const styles: Record<Variant, { pill: string; dot: string }> = {
  gold: { pill: "bg-linear-to-r from-gold-light to-gold text-ink", dot: "bg-ink text-gold-light" },
  light: { pill: "bg-white text-ink", dot: "bg-ink text-gold-light" },
  dark: { pill: "bg-ink text-white", dot: "bg-gold text-ink" },
};

type PillButtonProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  attention?: boolean;
};

export function PillButton({ href, onClick, children, variant = "gold", className, attention = false }: PillButtonProps) {
  const s = styles[variant];
  const classes = clsx(
    "group relative inline-flex items-center gap-4 overflow-hidden rounded-full py-2 pl-5 pr-2 text-base font-medium transition-transform duration-300 hover:-translate-y-0.5 sm:pl-6",
    attention && "animate-member-pulse",
    s.pill,
    className,
  );
  const inner = (
    <>
      {attention && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 animate-member-shine bg-linear-to-r from-transparent via-white/55 to-transparent"
        />
      )}
      <span className="relative">{children}</span>
      <span className={clsx("relative flex size-9 items-center justify-center overflow-hidden rounded-full", s.dot)}>
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover:-translate-y-6 group-hover:translate-x-6"
        />
        <ArrowUpRight
          aria-hidden
          className="absolute size-4 -translate-x-6 translate-y-6 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
        />
      </span>
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {inner}
      </button>
    );
  }

  const Tag = href?.startsWith("/") ? Link : "a";
  return (
    <Tag href={href ?? "#"} className={classes}>
      {inner}
    </Tag>
  );
}
