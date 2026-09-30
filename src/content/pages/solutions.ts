import { Building2, GraduationCap, HeartPulse, House, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { images } from "@/content/site";

export const solutions = {
  hero: {
    eyebrow: "Solutions",
    title: "Software that moves businesses forward",
    body: "From first website to full-scale platform, our developers design, build and support software that helps our clients grow. Every client you refer gets the same care.",
    image: images.techTeam,
  },
  industries: {
    eyebrow: "Industries we serve",
    title: "Solutions shaped around how each business works",
    items: [
      {
        icon: ShoppingBag,
        title: "Retail & e-commerce",
        body: "Online stores, inventory sync and loyalty apps that turn visitors into repeat customers.",
      },
      {
        icon: HeartPulse,
        title: "Healthcare & wellness",
        body: "Booking systems, patient portals and secure records built with privacy in mind.",
      },
      {
        icon: House,
        title: "Real estate",
        body: "Listing sites, CRM integrations and client dashboards for agents and property managers.",
      },
      {
        icon: GraduationCap,
        title: "Education",
        body: "Learning platforms, course sites and admin tools for schools and trainers.",
      },
      {
        icon: UtensilsCrossed,
        title: "Hospitality",
        body: "Online ordering, reservations and guest apps for restaurants, cafes and hotels.",
      },
      {
        icon: Building2,
        title: "Professional services",
        body: "Client portals, automated quoting and internal tools for agencies and consultancies.",
      },
    ],
  },
  process: {
    eyebrow: "How we deliver",
    title: "A clear process from idea to launch",
    steps: [
      { title: "Discover", body: "We learn the client's goals, users and constraints, and agree a clear scope and budget." },
      { title: "Design", body: "Wireframes and polished designs, tested with real users before a line of code is written." },
      { title: "Build", body: "Agile development with regular demos, so clients see progress every week." },
      { title: "Launch & support", body: "Smooth launch, then hosting, monitoring and improvements for the long run." },
    ],
  },
  referral: {
    title: "Know a business that needs software?",
    body: "Introduce them to MagicLife. When the project goes ahead, you earn a commission, and our team takes care of everything else.",
    cta: { label: "Refer a client", href: "/contact?interest=client" },
    image: images.presentation,
  },
};
