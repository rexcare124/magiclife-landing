import { images } from "@/content/site";

export const interests = [
  { value: "referral", label: "Referrals" },
  { value: "partnership", label: "Partnership" },
  { value: "side-work", label: "Side work" },
  { value: "client", label: "Client project / referral" },
  { value: "other", label: "Something else" },
] as const;

export type Interest = (typeof interests)[number]["value"];

export const contact = {
  hero: {
    eyebrow: "Contact us",
    title: "Let's talk about what comes next",
    body: "Whether you want to become a member, refer a client or start a project, our team will get back to you within one business day.",
    image: images.marketingDesk,
  },
  form: {
    title: "Send us a message",
    body: "Tell us a little about yourself and what you're interested in.",
    success: {
      title: "Thank you, your message is on its way",
      body: "We've received your message and will reply within one business day.",
    },
  },
  details: {
    title: "Other ways to reach us",
    hours: "Monday to Friday, 9:00 to 18:00",
  },
};
