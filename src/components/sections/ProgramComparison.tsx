import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { features } from "@/content/pages/features";

export function ProgramComparison() {
  const { eyebrow, title, columns, rows, footnote } = features.programs;

  return (
    <section className="bg-ink py-20 text-white lg:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <SectionHeading>{title}</SectionHeading>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 hidden overflow-hidden rounded-card border border-gold/25 md:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{title}</caption>
            <thead>
              <tr className="bg-charcoal">
                <th scope="col" className="w-1/4 px-6 py-5">
                  <span className="sr-only">Detail</span>
                </th>
                {columns.map((c) => (
                  <th key={c} scope="col" className="text-gold-gradient px-6 py-5 font-heading text-xl font-medium">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-gold/15 transition-colors hover:bg-charcoal/60">
                  <th scope="row" className="px-6 py-5 text-sm font-medium tracking-wide text-gold-light uppercase">
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td key={columns[i]} className="px-6 py-5 text-white/80">
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <div className="mt-12 grid gap-5 md:hidden">
          {columns.map((c, ci) => (
            <Reveal key={c} delay={ci * 0.08} className="rounded-card border border-gold/25 bg-charcoal p-6">
              <h3 className="text-gold-gradient font-heading text-2xl">{c}</h3>
              <dl className="mt-4 divide-y divide-gold/15">
                {rows.map((row) => (
                  <div key={row.label} className="flex justify-between gap-6 py-3">
                    <dt className="text-sm text-gold-light">{row.label}</dt>
                    <dd className="text-right text-sm text-white/80">{row.values[ci]}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-sm text-white/60">{footnote}</p>
      </Container>
    </section>
  );
}
