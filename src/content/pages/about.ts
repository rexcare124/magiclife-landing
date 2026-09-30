import { Compass, Eye, Gem, HandHeart, Scale, ShieldCheck, Sparkles, Users } from "lucide-react";
import { images, memberCta } from "@/content/site";

export const about = {
  hero: {
    eyebrow: "About us",
    title: "A software agency that grows together with its members",
    body: "MagicLife builds websites, apps and custom software for businesses, and opens the door for everyday people to share in that success without writing a single line of code.",
    image: images.office,
  },
  story: {
    eyebrow: "Our story",
    title: "Built on a simple idea: great work should reward everyone who helps it happen",
    paragraphs: [
      "MagicLife started as a small team of developers who kept meeting the same kind of people: friends, neighbours and former colleagues who knew businesses that needed software, but had no way to take part in the work.",
      "So we built one. Today our developers focus on delivering great software for clients, while our members help the agency grow through referrals, profit-sharing partnerships and flexible side work, each rewarded fairly and transparently for what they bring.",
    ],
    image: images.teamTable,
    pillars: [
      {
        icon: Compass,
        title: "Our mission",
        body: "Make a software agency something anyone can be part of, and turn simple side opportunities into real, lasting value.",
      },
      {
        icon: Eye,
        title: "Our vision",
        body: "A community where every member, client and developer grows together, openly and on fair terms.",
      },
    ],
  },
  values: {
    eyebrow: "What we stand for",
    title: "The values behind every project and partnership",
    items: [
      {
        icon: ShieldCheck,
        title: "Transparency",
        body: "Written terms, clear reporting and no hidden conditions, for members and clients alike.",
      },
      {
        icon: Users,
        title: "Community",
        body: "We grow as a team. Members, developers and clients all share in each other's success.",
      },
      {
        icon: Gem,
        title: "Craft",
        body: "We build software we're proud of: fast, reliable and designed around real people.",
      },
      {
        icon: Scale,
        title: "Fairness",
        body: "Rewards reflect the value you bring, whether that's a client, capital or your time.",
      },
      {
        icon: HandHeart,
        title: "Respect",
        body: "Your work is always done in your own name. We never ask to use your identity or accounts.",
      },
      {
        icon: Sparkles,
        title: "Flexibility",
        body: "Keep your current job. Choose how involved you want to be and change it anytime.",
      },
    ],
  },
  cta: memberCta,
};
