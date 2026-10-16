import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { MemberButton } from "@/components/member/MemberButton";
import { Reveal } from "@/components/ui/Reveal";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { footer, nav, quickLinks, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink text-white">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_85%_100%,rgba(214,171,69,0.12),transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-28deg, transparent 0 46px, rgba(214,171,69,0.06) 46px 52px, transparent 52px 70px, rgba(214,171,69,0.1) 70px 74px)",
          maskImage: "radial-gradient(ellipse 80% 70% at 75% 40%, #000 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 75% 40%, #000 20%, transparent 75%)",
        }}
      />

      <Container className="pt-20 lg:pt-28">
        <Reveal className="grid gap-12 lg:grid-cols-2">
          <div>
            <Logo size="lg" play="inView" showSlogan className="mb-10" />
            <h2 className="font-heading text-4xl font-medium tracking-[0.01em] sm:text-5xl">{footer.title}</h2>
            <p className="mt-5 max-w-md text-white/75">{footer.body}</p>
            <MemberButton className="mt-8">{footer.cta.label}</MemberButton>
          </div>

          <div className="lg:pt-34">
            <h3 className="font-display text-lg font-bold text-gold-light">About us</h3>
            <p className="mt-3 max-w-md text-white/75">{footer.about}</p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <nav aria-label="Footer">
            <ul className="border-t border-gold/20">
              {nav.map((item) => (
                <li key={item.href} className="border-b border-gold/20">
                  <Link href={item.href} className="group flex items-center justify-between py-5 text-lg text-white/85 transition-colors hover:text-gold-light">
                    {item.label}
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 text-gold transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col justify-between gap-12">
            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-lg font-bold text-gold-light">Quick links</h3>
                <ul className="mt-4 space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-white/75 transition-colors hover:text-gold-light">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-gold-light">Contact</h3>
                <a href={`mailto:${site.email}`} className="mt-4 inline-block text-white/75 transition-colors hover:text-gold-light">
                  {site.email}
                </a>
                <a href="tel:+19286519982" className="mt-3 inline-block text-white/75 transition-colors hover:text-gold-light">
                  {site.phone}
                </a>
              </div>
            </div>
            <p
              aria-hidden
              className="text-gold-gradient font-display text-[13vw] leading-[0.9] font-black tracking-tighter select-none lg:text-[5.4vw] 2xl:text-[5.6rem]"
            >
              {footer.wordmark}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-gold/20 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/70">
            &copy; {new Date().getFullYear()} {site.name}. {footer.credit}
          </p>
          <ul className="flex gap-3">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  className="flex size-11 items-center justify-center rounded-full border border-gold/30 text-gold-light transition-colors hover:bg-gold hover:text-ink"
                >
                  <SocialIcon name={s.icon} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
