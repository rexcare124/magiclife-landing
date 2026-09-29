import { CapabilityAccordion } from "@/components/sections/CapabilityAccordion";
import { CreamSplit } from "@/components/sections/CreamSplit";
import { CtaSplit } from "@/components/sections/CtaSplit";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { ServicesTabs } from "@/components/sections/ServicesTabs";
import { StatsIntro } from "@/components/sections/StatsIntro";
import { TransformCarousel } from "@/components/sections/TransformCarousel";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsIntro />
        <FeatureCards />
        <CreamSplit />
        <ServicesTabs />
        <TransformCarousel />
        <CapabilityAccordion />
        <CtaSplit />
      </main>
      <Footer />
    </>
  );
}
