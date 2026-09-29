import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { footer, nav, quickLinks, site } from "@/content/site";

export function Footer() {
  return (
    <footer id="contact" className="relative isolate overflow-hidden bg-ink text-white">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-28deg, transparent 0 46px, rgba(255,255,255,0.05) 46px 52px, transparent 52px 70px, rgba(255,255,255,0.09) 70px 74px)",
          maskImage: "radial-gradient(ellipse 80% 70% at 75% 40%, #000 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 75% 40%, #000 20%, transparent 75%)",
        }}
      />

      <Container className="pt-20 lg:pt-28">
        <Reveal className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-4xl font-medium tracking-[0.01em] sm:text-5xl">{footer.title}</h2>
            <p className="mt-5 max-w-md text-white/75">{footer.body}</p>
            <PillButton href={footer.cta.href} className="mt-8">
              {footer.cta.label}
            </PillButton>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="font-display text-lg font-bold">About us</h3>
              <p className="mt-3 text-white/75">{footer.about}</p>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">Location</h3>
              <p className="mt-3 text-white/75">{site.location}</p>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <nav aria-label="Footer">
            <ul className="border-t border-white/15">
              {nav.map((item) => (
                <li key={item.href} className="border-b border-white/15">
                  <a href={item.href} className="group flex items-center justify-between py-5 text-lg text-white/85 transition-colors hover:text-white">
                    {item.label}
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col justify-between gap-12">
            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-lg font-bold">Quick links</h3>
                <ul className="mt-4 space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-white/75 transition-colors hover:text-white">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold">Email</h3>
                <a href={`mailto:${site.email}`} className="mt-4 inline-block text-white/75 transition-colors hover:text-white">
                  {site.email}
                </a>
              </div>
            </div>
            <p
              aria-hidden
              className="font-display text-[17vw] leading-[0.85] font-black tracking-tighter select-none lg:text-[7.5vw] 2xl:text-[7.5rem]"
            >
              {footer.wordmark}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/15 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/70">
            &copy; {new Date().getFullYear()} {site.name}. {footer.credit}
          </p>
          <ul className="flex gap-3">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  className="flex size-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white hover:text-ink"
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
