import clsx from "clsx";

type SectionHeadingProps = {
  children: React.ReactNode;
  as?: "h2" | "h3";
  className?: string;
};

export function SectionHeading({ children, as: Tag = "h2", className }: SectionHeadingProps) {
  return (
    <Tag
      className={clsx(
        "font-heading text-3xl leading-[1.15] font-medium tracking-[0.01em] text-balance sm:text-4xl lg:text-[2.75rem]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
