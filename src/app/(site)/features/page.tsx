import type { Metadata } from "next";
import { CreamSplit } from "@/components/sections/CreamSplit";
import { CtaSplit } from "@/components/sections/CtaSplit";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { IconCardGrid } from "@/components/sections/IconCardGrid";
import { ProgramComparison } from "@/components/sections/ProgramComparison";
import { PageHero } from "@/components/ui/PageHero";
import { features } from "@/content/pages/features";

export const metadata: Metadata = {
  title: "Features",
  description: features.hero.body,
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero {...features.hero} />
      <IconCardGrid {...features.benefits} />
      <CreamSplit parts="steps" />
      <ProgramComparison />
      <FaqAccordion {...features.faq} />
      <CtaSplit />
    </>
  );
}
