import { BadgeCheck, Clock, Code2, FileText, LineChart, Wallet } from "lucide-react";
import { images, memberCta } from "@/content/site";

export const features = {
  hero: {
    eyebrow: "Features",
    title: "Everything you need to earn alongside your current job",
    body: "Membership is designed to be simple, flexible and transparent. Here's what you get when you join MagicLife.",
    image: images.workspace,
  },
  benefits: {
    eyebrow: "Membership benefits",
    title: "Built around your life, not the other way round",
    items: [
      {
        icon: Code2,
        title: "No coding required",
        body: "Our developers handle every technical detail. You bring connections, capital or time.",
      },
      {
        icon: Clock,
        title: "Flexible hours",
        body: "Work when it suits you. Every program fits around a full-time job.",
      },
      {
        icon: FileText,
        title: "Written terms",
        body: "Every program comes with a clear written agreement before you start.",
      },
      {
        icon: Wallet,
        title: "Transparent payouts",
        body: "Regular, documented payments with a clear breakdown of every commission and share.",
      },
      {
        icon: LineChart,
        title: "Clear reporting",
        body: "See the status of your referrals, tasks and profit shares at any time.",
      },
      {
        icon: BadgeCheck,
        title: "Your own name",
        body: "All work is done under your own name. We never ask to use your identity or accounts.",
      },
    ],
  },
  programs: {
    eyebrow: "Compare programs",
    title: "Three ways to earn. Pick one, or mix them.",
    columns: ["Referrals", "Partnership", "Side work"],
    rows: [
      { label: "Best for", values: ["People with a strong network", "Members who want to invest", "Anyone with a few spare hours"] },
      { label: "How you earn", values: ["Commission per client project", "Share of agency profits", "Paid per task or hour"] },
      { label: "Time commitment", values: ["Minimal", "None after setup", "Flexible, you choose"] },
      { label: "Experience needed", values: ["None", "None", "None, we train you"] },
      { label: "Payouts", values: ["When the client pays", "Quarterly", "Monthly"] },
    ],
    footnote: "Earnings depend on the program you choose and what you contribute.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions members often ask",
    items: [
      {
        q: "Do I need any technical skills?",
        a: "No. Our developers do all the technical work. Referrals and partnerships need no skills at all, and side work tasks such as testing or research come with simple guidance.",
      },
      {
        q: "Can I keep my current job?",
        a: "Yes. Every program is designed as a side opportunity that fits around full-time work.",
      },
      {
        q: "How and when am I paid?",
        a: "Referral commissions are paid once the client pays, partnership profits are shared quarterly and side work is paid monthly. You receive a clear statement every time.",
      },
      {
        q: "Is there a fee to join?",
        a: "There is no fee to become a member or to join the referral and side work programs. Partnership terms are explained in writing before you commit to anything.",
      },
      {
        q: "Can I join more than one program?",
        a: "Absolutely. Many members start with referrals and add side work or a partnership later.",
      },
      {
        q: "Will you ever use my name or accounts?",
        a: "Never. Any work you do is under your own name, and we never ask for access to your personal identity or accounts.",
      },
    ],
  },
  cta: memberCta,
};
