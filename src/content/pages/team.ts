import { images, memberCta } from "@/content/site";

const photo = (n: number) => `/images/team/member-${n}.jpg`;

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: { label: "LinkedIn" | "Instagram" | "Facebook"; href: string }[];
};

export const team = {
  hero: {
    eyebrow: "Team",
    title: "The people who make the magic happen",
    body: "Developers, designers and member success specialists working together to deliver great software for clients and real opportunities for members.",
    image: images.teamHuddle,
  },
  leadership: {
    eyebrow: "Leadership",
    title: "Guiding the agency and its members",
    members: [
      {
        name: "Xinrou Li",
        role: "Founder & CEO",
        bio: "Started MagicLife to open software work up to everyone. Leads strategy, partnerships and member growth.",
        image: photo(9),
        socials: [{ label: "LinkedIn", href: "#" }],
      },
      {
        name: "Sophie Laurent",
        role: "Chief Operating Officer",
        bio: "Keeps projects, payouts and member programs running smoothly, with clear terms at every step.",
        image: photo(10),
        socials: [{ label: "LinkedIn", href: "#" }],
      },
      {
        name: "David Alejerous",
        role: "Chief Technology Officer",
        bio: "Twenty years of shipping software. Oversees engineering quality across every client project.",
        image: photo(5),
        socials: [{ label: "LinkedIn", href: "#" }],
      },
    ] satisfies TeamMember[],
  },
  crew: {
    eyebrow: "Our team",
    title: "Builders, designers and member champions",
    members: [
      {
        name: "Baldino Aguilar",
        role: "Lead Developer",
        bio: "Architects web platforms and APIs for our fastest-growing clients.",
        image: photo(1),
        socials: [{ label: "LinkedIn", href: "#" }],
      },
      {
        name: "Elena Rossi",
        role: "Member Success Lead",
        bio: "Helps every new member find the program that fits their life.",
        image: photo(2),
        socials: [
          { label: "LinkedIn", href: "#" },
          { label: "Instagram", href: "#" },
        ],
      },
      {
        name: "Adrian Cruz",
        role: "Mobile Engineer",
        bio: "Builds iOS and Android apps that thousands of people use every day.",
        image: photo(3),
        socials: [{ label: "LinkedIn", href: "#" }],
      },
      {
        name: "Clara Nielsen",
        role: "UI/UX Designer",
        bio: "Turns user research into clear, beautiful interfaces.",
        image: photo(4),
        socials: [
          { label: "LinkedIn", href: "#" },
          { label: "Instagram", href: "#" },
        ],
      },
      {
        name: "Maya Petrov",
        role: "Partnerships Manager",
        bio: "Works with profit-sharing partners and keeps reporting crystal clear.",
        image: photo(6),
        socials: [{ label: "LinkedIn", href: "#" }],
      },
      {
        name: "Lucas Grant",
        role: "Full-stack Developer",
        bio: "Ships dashboards, integrations and automation tools end to end.",
        image: photo(7),
        socials: [{ label: "LinkedIn", href: "#" }],
      },
      {
        name: "Nora Evans",
        role: "Project Manager",
        bio: "Keeps client projects on time and members in the loop.",
        image: photo(8),
        socials: [
          { label: "LinkedIn", href: "#" },
          { label: "Facebook", href: "#" },
        ],
      },
    ] satisfies TeamMember[],
  },
  join: {
    title: "Want to be part of the team?",
    body: "You don't need to be a developer to join MagicLife. Become a member and grow with us, alongside your current job.",
    cta: memberCta,
    image: images.teamLaptops,
  },
};
