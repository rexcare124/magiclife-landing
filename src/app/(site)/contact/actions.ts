"use server";

import { Resend } from "resend";
import { interests } from "@/content/pages/contact";
import { site } from "@/content/site";

type Field = "name" | "email" | "company" | "interest" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<Field, string>>;
  values?: Partial<Record<Field, string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function sendContactMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const get = (key: string) => String(formData.get(key) ?? "").trim();

  // Honeypot: real visitors never see or fill this field.
  if (get("website")) return { status: "success" };

  const values = {
    name: get("name"),
    email: get("email"),
    company: get("company"),
    interest: get("interest"),
    message: get("message"),
  };

  const errors: ContactState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please enter your name.";
  else if (values.name.length > 100) errors.name = "Name must be 100 characters or fewer.";
  if (!EMAIL_RE.test(values.email) || values.email.length > 200) errors.email = "Please enter a valid email address.";
  if (values.company.length > 120) errors.company = "Company must be 120 characters or fewer.";
  const interest = interests.find((i) => i.value === values.interest);
  if (!interest) errors.interest = "Please choose what you're interested in.";
  if (values.message.length < 10) errors.message = "Please write a little more (at least 10 characters).";
  else if (values.message.length > 5000) errors.message = "Message must be 5000 characters or fewer.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? `${site.name} <onboarding@resend.dev>`;

  const text = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Company: ${values.company || "-"}`,
    `Interest: ${interest!.label}`,
    "",
    values.message,
  ].join("\n");

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[contact] RESEND_API_KEY is not set; message not sent.\n" + text);
      return { status: "success" };
    }
    return { status: "error", message: "Our contact form is temporarily unavailable. Please email us directly.", values };
  }

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      replyTo: values.email,
      subject: `New ${interest!.label} enquiry from ${values.name}`,
      text,
    });
    if (error) throw new Error(error.message);
  } catch (err) {
    console.error("[contact] Failed to send message", err);
    return { status: "error", message: "Something went wrong sending your message. Please try again.", values };
  }

  return { status: "success" };
}
