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
  name: "WCJ Agency",
  shortName: "WCJ",
  tagline: "Marketing that moves brands forward",
  description:
    "WCJ Agency is a full-service marketing studio blending strategy, creative and performance to build brands people remember.",
  url: "https://wcjagency.com",
  ogImage: images.heroStudio,
  email: "hello@wcjagency.com",
  location: "Your street address, City, State 00000",
  socials: [
    { label: "Facebook", href: "#", icon: "facebook" },
    { label: "LinkedIn", href: "#", icon: "linkedin" },
    { label: "Instagram", href: "#", icon: "instagram" },
  ] as const,
};

export const nav = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const quickLinks = [
  { label: "Portfolio", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Services", href: "#services" },
];

export const hero = {
  displayWord: "GROWTH",
  eyebrow: "Built for measurable growth",
  title: "Marketing that moves modern brands",
  body: "We push brands forward through sharp strategy and bold creative. Every campaign tells a story shaped by insight, detail and purpose.",
  cta: { label: "Get started", href: "#contact" },
  backgrounds: [images.heroSkyline, images.heroNetwork, images.heroStudio],
  slides: [
    {
      title: "Strategy in every move",
      body: "Planned with data, built to perform.",
      image: images.analytics,
    },
    {
      title: "Story meets performance",
      body: "Where bold creative drives real results.",
      image: images.creative,
    },
    {
      title: "Brands built for tomorrow",
      body: "Identities designed for how people buy now.",
      image: images.socialApps,
    },
  ],
};

export const statsIntro = {
  stat: { value: 50, suffix: "%", label: "Average lift in qualified leads" },
  avatars: [images.avatar1, images.avatar2, images.avatar3],
  trust: "Trusted by 200+ growing brands",
  title: "We build campaigns that blend creativity, clarity and results",
  body: "We craft marketing that balances strategy, storytelling and performance, creating campaigns that connect, convert and keep people coming back. Creative driven by insight, detail and a deep understanding of your audience.",
};

export const featureCards = {
  media: { image: images.teamHuddle, alt: "WCJ team collaborating" },
  highlight: {
    title: "Campaigns that stand out",
    body: "Our integrated campaigns are designed to deliver maximum reach while lowering your cost to acquire every new customer.",
    cta: { label: "Discover more", href: "#services" },
  },
  showcase: {
    image: images.office,
    title: "Award-worthy brand launches",
  },
};

export const creamSplit = {
  first: {
    title: "Deep audience research and planning for real impact",
    image: images.brainstorm,
    items: [
      {
        title: "Brand and market audits",
        body: "We assess your positioning, competitors and channels to find the clearest path to growth.",
      },
      {
        title: "Customer journey mapping",
        body: "We map every touchpoint to remove friction, sharpen messaging and turn attention into action.",
      },
    ],
    cta: { label: "Discover more", href: "#services" },
  },
  second: {
    title: "Performance campaigns with every dollar working harder",
    image: images.workspace,
    body: "Our work balances creativity and precision, delivering thoughtfully crafted campaigns that respond to your market, elevate your brand and stand as lasting proof of what great marketing can do.",
    bullets: [
      "Paid social and search advertising",
      "Content and SEO programs",
      "Conversion-focused web design",
    ],
    cta: { label: "Explore more", href: "#work" },
  },
};

export const servicesTabs = {
  eyebrow: "Designed for lasting impact",
  title: "Full-service marketing strategy and execution",
  tabs: [
    {
      label: "Strategy",
      body: "We turn goals into a clear growth plan. By pairing market insight with sharp positioning, we help you focus budget where it drives the biggest return.",
      image: images.strategy,
    },
    {
      label: "Creative",
      body: "We build distinctive brand worlds and campaigns, combining striking design, confident copy and a deep understanding of what makes people stop scrolling.",
      image: images.creative,
    },
    {
      label: "Performance",
      body: "From launch to scale, we run and optimise campaigns across every channel, delivering marketing that is measurable, efficient and built to grow.",
      image: images.dashboard,
    },
  ],
  footnote: "Marketing focused on clarity, consistency and leaving a lasting impression.",
  cta: { label: "Discover work", href: "#work" },
};

export const transform = {
  lines: ["We transform ideas", "into campaigns that"],
  lastLine: { before: "connect", after: "with people" },
  thumbs: [images.abstract3d, images.gradient],
  projects: [
    { title: "Brand refresh", image: images.creative },
    { title: "Launch campaign", image: images.teamLaptops },
    { title: "Social growth", image: images.socialApps },
    { title: "Web experience", image: images.techTeam },
    { title: "Content engine", image: images.marketingDesk },
    { title: "Growth analytics", image: images.analytics },
  ],
};

export const capabilities = {
  title: "Growth capabilities that scale with you",
  cta: { label: "Our projects", href: "#work" },
  items: [
    {
      label: "Brand strategy",
      body: "We blend market foresight and careful positioning to deliver a brand platform that aligns your team, sharpens your message and gives every campaign a confident foundation.",
      image: images.planning,
    },
    {
      label: "Creative campaigns",
      body: "We merge big ideas with precise craft to create campaigns that capture attention, elevate how your brand is seen and breathe new life into every channel.",
      image: images.presentation,
    },
    {
      label: "Paid media",
      body: "We unite data-driven targeting with creative testing to build paid programs that reach the right people, lower acquisition costs and scale profitably.",
      image: images.dashboard,
    },
    {
      label: "Content and social",
      body: "We pair editorial thinking with platform know-how to create content that builds community, earns attention and keeps your brand part of the conversation.",
      image: images.socialApps,
    },
    {
      label: "Web and conversion",
      body: "We bring together bold design and rigorous testing to build websites and landing pages that load fast, tell your story and turn visitors into customers.",
      image: images.techTeam,
    },
  ],
};

export const ctaSplit = {
  title: "Building brands people love to choose",
  body: "From first idea to final report, we work closely with our clients to bring their vision to life, delivering marketing that is focused, measurable and beautifully made.",
  cta: { label: "View projects", href: "#work" },
  image: images.teamTable,
};

export const footer = {
  title: "Stay connected with us",
  body: "Reach out to explore how our team can grow your next campaign.",
  cta: { label: "Get in touch", href: `mailto:${site.email}` },
  about: "We build purposeful brands that blend strategy with craft.",
  wordmark: "AGENCY",
  credit: "Designed and built for WCJ Agency",
};
