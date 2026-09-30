import type { Metadata } from "next";
import { CtaSplit } from "@/components/sections/CtaSplit";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { PageHero } from "@/components/ui/PageHero";
import { team } from "@/content/pages/team";

export const metadata: Metadata = {
  title: "Team",
  description: team.hero.body,
};

export default function TeamPage() {
  return (
    <>
      <PageHero {...team.hero} />
      <TeamGrid {...team.leadership} variant="featured" />
      <TeamGrid {...team.crew} />
      <CtaSplit {...team.join} />
    </>
  );
}
