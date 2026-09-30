import { Clock, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { contact } from "@/content/pages/contact";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: contact.hero.body,
};

export default function ContactPage() {
  const details = [
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: "Location", value: site.location },
    { icon: Clock, label: "Hours", value: contact.details.hours },
  ];

  return (
    <>
      <PageHero {...contact.hero} />
      <section className="py-20 lg:py-28">
        <Container className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
          <Reveal>
            <Suspense fallback={<div className="min-h-[36rem] rounded-card border border-line bg-pearl" />}>
              <ContactForm />
            </Suspense>
          </Reveal>

          <Reveal delay={0.1} className="relative isolate flex flex-col overflow-hidden rounded-card bg-ink p-8 text-white sm:p-10">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_100%_100%,rgba(214,171,69,0.2),transparent_70%)]"
            />
            <h2 className="text-gold-gradient font-heading text-2xl sm:text-3xl">{contact.details.title}</h2>
            <ul className="mt-8 space-y-7">
              {details.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold-light">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium tracking-wide text-gold-light uppercase">{label}</p>
                    {href ? (
                      <a href={href} className="mt-1 inline-block text-white/85 transition-colors hover:text-gold-light">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-white/85">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-12 border-t border-gold/20 pt-8 lg:mt-auto">
              <p className="text-sm text-white/60">Follow us</p>
              <ul className="mt-4 flex gap-3">
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
          </Reveal>
        </Container>
      </section>
    </>
  );
}
