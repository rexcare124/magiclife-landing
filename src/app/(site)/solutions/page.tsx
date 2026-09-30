import type { Metadata } from "next";
import { CapabilityAccordion } from "@/components/sections/CapabilityAccordion";
import { CtaSplit } from "@/components/sections/CtaSplit";
import { IconCardGrid } from "@/components/sections/IconCardGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TransformCarousel } from "@/components/sections/TransformCarousel";
import { PageHero } from "@/components/ui/PageHero";
import { solutions } from "@/content/pages/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description: solutions.hero.body,
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero {...solutions.hero} />
      <IconCardGrid {...solutions.industries} />
      <CapabilityAccordion divider={false} className="pt-4 lg:pt-8" />
      <ProcessSteps />
      <TransformCarousel />
      <CtaSplit {...solutions.referral} />
    </>
  );
}
