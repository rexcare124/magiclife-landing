// Placeholder photos from Unsplash (free license). Replace the files in /public/images to rebrand.
const img = (name: string) => `/images/${name}.jpg`;

export const images = {
  heroSkyline: img("hero-skyline"),
  heroNetwork: img("hero-network"),
  heroStudio: img("hero-studio"),
  abstract3d: img("abstract-3d"),
  gradient: img("gradient"),
  teamLaptops: img("team-laptops"),
  analytics: img("analytics"),
  dashboard: img("dashboard"),
  workspace: img("workspace"),
  office: img("office"),
  strategy: img("strategy"),
  teamHuddle: img("team-huddle"),
  teamTable: img("team-table"),
  presentation: img("presentation"),
  brainstorm: img("brainstorm"),
  creative: img("creative"),
  socialApps: img("social-apps"),
  marketingDesk: img("marketing-desk"),
  planning: img("planning"),
  techTeam: img("tech-team"),
  avatar1: img("avatar-1"),
  avatar2: img("avatar-2"),
  avatar3: img("avatar-3"),
};

export const site = {
  name: "MagicLife",
  slogan: "A Simple Side Opportunity Could Change What Comes Next.",
  tagline: "A software agency that grows with its members",
  description:
    "MagicLife is a software agency welcoming new members. No coding experience needed: earn extra income through client referrals, profit-sharing partnerships and flexible side work, all alongside your current job.",
  url: "https://magiclife.com",
  ogImage: "/brand/magiclife-og.jpg",
  email: "hello@magiclife.com",
  location: "Your street address, City, State 00000",
  socials: [
    { label: "Facebook", href: "#", icon: "facebook" },
    { label: "LinkedIn", href: "#", icon: "linkedin" },
    { label: "Instagram", href: "#", icon: "instagram" },
  ] as const,
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "Solutions", href: "/solutions" },
  { label: "Team", href: "/team" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const quickLinks = [
  { label: "Ways to earn", href: "/#services" },
  { label: "How it works", href: "/#process" },
  { label: "Our work", href: "/solutions#work" },
  { label: "Refer a client", href: "/contact?interest=client" },
];

export const memberCta = { label: "Become a member", href: "/contact" };

export const hero = {
  displayWord: "MAGIC",
  eyebrow: "Now welcoming new members",
  title: "A simple side opportunity could change what comes next",
  body: "MagicLife is a software agency that grows together with its members. Keep your current job, bring no coding experience, and earn extra income through referrals, profit-sharing and flexible side work, all under your own name.",
  cta: memberCta,
  backgrounds: [images.heroSkyline, images.heroNetwork, images.heroStudio],
  slides: [
    {
      title: "Refer and earn",
      body: "Commission on every client you bring in.",
      image: images.teamLaptops,
    },
    {
      title: "Share in our growth",
      body: "Profit-sharing partnerships with clear terms.",
      image: images.analytics,
    },
    {
      title: "Flexible side work",
      body: "Paid, non-technical tasks that fit your schedule.",
      image: images.workspace,
    },
  ],
};

export const statsIntro = {
  stat: { value: 3, suffix: "", label: "Ways to earn alongside your current job" },
  avatars: [images.avatar1, images.avatar2, images.avatar3],
  trust: "Join a growing community of members",
  title: "You don't need to write code to be part of a software agency",
  body: "Our developers build websites, apps and custom software for clients. As a member, you help the agency grow in the way that suits you best, whether that's introducing clients, partnering in our profits or taking on simple paid tasks, and you're rewarded for the value you bring. There's no need to leave your job or learn anything technical.",
};

export const featureCards = {
  media: { image: images.teamHuddle, alt: "MagicLife members and team celebrating together" },
  highlight: {
    title: "Keep your job. Add a new income.",
    body: "Membership is designed to fit around your life. Choose how involved you want to be, and earn for the clients, capital or time you contribute.",
    cta: { label: "See ways to earn", href: "#services" },
  },
  showcase: {
    image: images.office,
    title: "Real software for real clients",
  },
};

export const creamSplit = {
  first: {
    title: "Getting started is simple",
    image: images.brainstorm,
    items: [
      {
        title: "Join as a member",
        body: "Tell us a little about yourself and choose the program that fits you: referrals, partnership, side work or a mix of all three.",
      },
      {
        title: "Get set up with our team",
        body: "We walk you through how your program works, its written terms and how you get paid. No technical training required.",
      },
      {
        title: "Start earning",
        body: "Introduce clients, complete tasks or share in profits, and receive clear, regular payouts for what you contribute.",
      },
    ],
    cta: memberCta,
  },
  second: {
    title: "Transparent, honest and always in your own name",
    image: images.workspace,
    body: "We believe a side opportunity should be simple and trustworthy. Your agreements, your work and your earnings are always yours, clearly documented and free of hidden conditions.",
    bullets: [
      "Written terms for every program",
      "Clear reporting on commissions and profit shares",
      "Side work done under your own name; we never ask to use your identity or accounts",
    ],
    cta: { label: "Ask us anything", href: "/contact" },
  },
};

export const servicesTabs = {
  eyebrow: "Ways to earn with MagicLife",
  title: "Choose the side opportunity that fits your life",
  tabs: [
    {
      label: "Referrals",
      body: "Know a business that needs a website, an app or custom software? Introduce them to MagicLife. When the project goes ahead, you earn a commission. No selling skills or technical knowledge needed; our team handles the rest.",
      image: images.teamLaptops,
    },
    {
      label: "Partnership",
      body: "Become a profit-sharing partner and share in the agency's success. Every partnership comes with clear written terms, so you always know how profits are calculated and when they are paid.",
      image: images.analytics,
    },
    {
      label: "Side work",
      body: "Take on paid, non-technical tasks such as app testing, research, customer outreach or admin support. Work flexible hours, under your own name, alongside your current job.",
      image: images.workspace,
    },
  ],
  footnote: "Earnings depend on the program you choose and what you contribute.",
  cta: memberCta,
};

export const transform = {
  lines: ["Our developers turn ideas", "into software that"],
  lastLine: { before: "changes", after: "what comes next" },
  thumbs: [images.abstract3d, images.gradient],
  projects: [
    { title: "Business websites", image: images.creative },
    { title: "Mobile apps", image: images.socialApps },
    { title: "E-commerce stores", image: images.marketingDesk },
    { title: "Custom dashboards", image: images.dashboard },
    { title: "SaaS platforms", image: images.techTeam },
    { title: "Automation tools", image: images.teamLaptops },
  ],
};

export const capabilities = {
  title: "What our agency builds for clients",
  cta: { label: "Refer a client", href: "/contact?interest=client" },
  items: [
    {
      label: "Web development",
      body: "Fast, modern websites and web applications, from company sites and landing pages to complex platforms built to scale with a growing business.",
      image: images.techTeam,
    },
    {
      label: "Mobile apps",
      body: "Native and cross-platform apps for iOS and Android, designed to be simple to use and built to perform reliably for thousands of users.",
      image: images.socialApps,
    },
    {
      label: "Custom software",
      body: "Tailored tools, dashboards and integrations that automate everyday work, connect existing systems and help businesses run more efficiently.",
      image: images.dashboard,
    },
    {
      label: "UI and UX design",
      body: "Clear, attractive interfaces shaped by real user research, so every product we deliver feels intuitive from the very first click.",
      image: images.presentation,
    },
    {
      label: "Cloud and maintenance",
      body: "Secure hosting, monitoring and ongoing support that keep our clients' software fast, up to date and running smoothly long after launch.",
      image: images.planning,
    },
  ],
};

export const ctaSplit = {
  title: "Become a life-changing wizard",
  body: "Join MagicLife as a member and discover how a simple side opportunity can add real value to your life, without giving up what you do today.",
  cta: memberCta,
  image: images.teamTable,
};

export const footer = {
  title: "Ready to see what comes next?",
  body: "Reach out and our team will walk you through membership, our programs and how members are paid.",
  cta: memberCta,
  about: "MagicLife is a software agency that builds for clients and grows together with its members.",
  wordmark: "MAGICLIFE",
  credit: "All rights reserved.",
};
