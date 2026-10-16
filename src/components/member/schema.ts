export type Field =
  | "name"
  | "email"
  | "country"
  | "telegram"
  | "discord"
  | "whatsapp"
  | "contacts"
  | "upwork"
  | "linkedin"
  | "message";

export type MembershipValues = {
  name: string;
  email: string;
  country: string;
  telegram: string;
  discord: string;
  whatsapp: string;
  hasUpwork: boolean;
  upwork: string;
  hasLinkedin: boolean;
  linkedin: string;
  message: string;
};

export type MembershipState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<Field, string>>;
  values?: MembershipValues;
};
