import clsx from "clsx";

type EyebrowProps = {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

export function Eyebrow({ children, tone = "light", className }: EyebrowProps) {
  return (
    <p
      className={clsx(
        "mb-4 flex items-center gap-3 text-sm font-medium tracking-wide uppercase",
        tone === "dark" ? "text-gold-light" : "text-gold-deep",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 bg-gold" />
      {children}
    </p>
  );
}
