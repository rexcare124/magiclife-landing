import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";

type Variant = "gold" | "light" | "dark" | "green";

const styles: Record<Variant, { pill: string; dot: string }> = {
  gold: { pill: "bg-linear-to-r from-gold-light to-gold text-ink", dot: "bg-ink text-gold-light" },
  light: { pill: "bg-white text-ink", dot: "bg-ink text-gold-light" },
  dark: { pill: "bg-ink text-white", dot: "bg-gold text-ink" },
  green: { pill: "bg-forest text-white", dot: "bg-gold text-ink" },
};

type PillButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

export function PillButton({ href, children, variant = "gold", className }: PillButtonProps) {
  const s = styles[variant];

  return (
    <a
      href={href}
      className={clsx(
        "group inline-flex items-center gap-4 rounded-full py-2 pl-5 pr-2 text-base font-medium transition-transform duration-300 hover:-translate-y-0.5 sm:pl-6",
        s.pill,
        className,
      )}
    >
      <span>{children}</span>
      <span
        className={clsx(
          "relative flex size-9 items-center justify-center overflow-hidden rounded-full",
          s.dot,
        )}
      >
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover:-translate-y-6 group-hover:translate-x-6"
        />
        <ArrowUpRight
          aria-hidden
          className="absolute size-4 -translate-x-6 translate-y-6 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
        />
      </span>
    </a>
  );
}
