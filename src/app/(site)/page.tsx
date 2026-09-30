import { CapabilityAccordion } from "@/components/sections/CapabilityAccordion";
import { CreamSplit } from "@/components/sections/CreamSplit";
import { CtaSplit } from "@/components/sections/CtaSplit";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { Hero } from "@/components/sections/Hero";
import { ServicesTabs } from "@/components/sections/ServicesTabs";
import { StatsIntro } from "@/components/sections/StatsIntro";
import { TransformCarousel } from "@/components/sections/TransformCarousel";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsIntro />
      <FeatureCards />
      <CreamSplit />
      <ServicesTabs />
      <TransformCarousel />
      <CapabilityAccordion />
      <CtaSplit />
    </>
  );
}
