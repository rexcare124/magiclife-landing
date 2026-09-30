import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  body?: string;
  image?: string;
  children?: React.ReactNode;
  className?: string;
};

export function PageHero({ eyebrow, title, body, image, children, className }: PageHeroProps) {
  return (
    <section className={clsx("relative isolate overflow-hidden bg-ink text-white", className)}>
      {image && (
        <div aria-hidden className="absolute inset-0 -z-20">
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-linear-to-b from-ink/80 via-ink/70 to-ink" />
        </div>
      )}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_60%_at_80%_0%,rgba(214,171,69,0.22),transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-28deg, transparent 0 46px, rgba(214,171,69,0.05) 46px 52px, transparent 52px 70px, rgba(214,171,69,0.08) 70px 74px)",
          maskImage: "radial-gradient(ellipse 70% 80% at 85% 20%, #000 15%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 80% at 85% 20%, #000 15%, transparent 70%)",
        }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 grid grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="border-r border-gold/10 last:border-r-0" />
        ))}
      </div>

      <Container className="pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24">
        <Reveal className="max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="transition-colors hover:text-gold-light">
              Home
            </Link>
            <span aria-hidden className="text-gold/60">
              /
            </span>
            <span aria-current="page" className="text-gold-light">
              {eyebrow}
            </span>
          </nav>
          <h1 className="font-heading text-4xl leading-[1.1] font-normal text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {body && <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{body}</p>}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </Container>
      <div aria-hidden className="h-px bg-linear-to-r from-transparent via-gold/60 to-transparent" />
    </section>
  );
}
