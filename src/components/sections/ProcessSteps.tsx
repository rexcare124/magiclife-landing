import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { solutions } from "@/content/pages/solutions";

export function ProcessSteps() {
  const { eyebrow, title, steps } = solutions.process;

  return (
    <section className="bg-ivory py-20 lg:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <SectionHeading>{title}</SectionHeading>
        </Reveal>

        <div className="relative mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <span aria-hidden className="absolute top-6 right-0 left-0 hidden h-px bg-linear-to-r from-gold/0 via-gold/60 to-gold/0 lg:block" />
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1} className="relative">
              <span className="relative flex size-12 items-center justify-center rounded-full bg-ink font-display text-lg font-bold text-gold-light ring-4 ring-ivory">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-heading text-xl">{step.title}</h3>
              <p className="mt-3 max-w-xs leading-relaxed text-muted">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
