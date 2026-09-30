import type { Metadata } from "next";
import { AboutStory } from "@/components/sections/AboutStory";
import { CreamSplit } from "@/components/sections/CreamSplit";
import { CtaSplit } from "@/components/sections/CtaSplit";
import { IconCardGrid } from "@/components/sections/IconCardGrid";
import { StatsIntro } from "@/components/sections/StatsIntro";
import { PageHero } from "@/components/ui/PageHero";
import { about } from "@/content/pages/about";

export const metadata: Metadata = {
  title: "About Us",
  description: about.hero.body,
};

export default function AboutPage() {
  return (
    <>
      <PageHero {...about.hero} />
      <AboutStory />
      <StatsIntro />
      <IconCardGrid {...about.values} tone="dark" />
      <CreamSplit parts="trust" />
      <CtaSplit />
    </>
  );
}
