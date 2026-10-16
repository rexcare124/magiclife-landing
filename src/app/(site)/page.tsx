import { CapabilityAccordion } from "@/components/sections/CapabilityAccordion";
import { CreamSplit } from "@/components/sections/CreamSplit";
import { CtaSplit } from "@/components/sections/CtaSplit";
import { Hero } from "@/components/sections/Hero";
import { ServicesTabs } from "@/components/sections/ServicesTabs";
import { TransformCarousel } from "@/components/sections/TransformCarousel";

export default function Home() {
  return (
    <>
      <Hero />
      <CreamSplit />
      <ServicesTabs />
      <TransformCarousel />
      <CapabilityAccordion />
      <CtaSplit />
    </>
  );
}
