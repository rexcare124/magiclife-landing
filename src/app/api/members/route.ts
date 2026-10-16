import { NextResponse } from "next/server";
import { isCountry } from "@/content/countries";
import type { MembershipState, MembershipValues } from "@/components/member/schema";
import { escapeHtml, memberNotifyEmail, sendEmail } from "@/lib/email";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function contactError(value: string, label: string) {
  if (!value) return;
  if (value.length < 2) return `Please enter a valid ${label}.`;
  if (value.length > 120) return `${label} must be 120 characters or fewer.`;
}

function normalizeUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(withProtocol);
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    if (!url.hostname.includes(".")) return "";
    return url.toString();
  } catch {
    return "";
  }
}

function json(body: MembershipState, status = 200) {
  return NextResponse.json(body, { status });
}

function logError(label: string, err: unknown) {
  const message = err instanceof Error ? err.message : String(err);
  console.error(`${label}: ${message}`);
}

export async function POST(request: Request) {
  try {
    return await createMember(request);
  } catch (err) {
    logError("[membership] Unhandled error", err);
    return json({ status: "error", message: "We could not save your membership. Please try again." }, 500);
  }
}

async function createMember(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ status: "error", message: "Please check the form and try again." }, 400);
  }

  if (!payload || typeof payload !== "object") {
    return json({ status: "error", message: "Please check the form and try again." }, 400);
  }

  const body = payload as Record<string, unknown>;
  if (text(body.website)) return json({ status: "success" });

  const hasUpwork = body.hasUpwork === true;
  const hasLinkedin = body.hasLinkedin === true;
  const values: MembershipValues = {
    name: text(body.name),
    email: text(body.email),
    country: text(body.country),
    telegram: text(body.telegram),
    discord: text(body.discord),
    whatsapp: text(body.whatsapp),
    hasUpwork,
    upwork: hasUpwork ? text(body.upwork) : "",
    hasLinkedin,
    linkedin: hasLinkedin ? text(body.linkedin) : "",
    message: text(body.message),
  };

  const errors: MembershipState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please enter your full name.";
  else if (values.name.length > 100) errors.name = "Name must be 100 characters or fewer.";
  if (!EMAIL_RE.test(values.email) || values.email.length > 200) errors.email = "Please enter a valid email address.";
  if (!isCountry(values.country)) errors.country = "Please select your country.";
  const telegramError = contactError(values.telegram, "Telegram ID");
  const discordError = contactError(values.discord, "Discord ID");
  const whatsappError = contactError(values.whatsapp, "WhatsApp number");
  if (telegramError) errors.telegram = telegramError;
  if (discordError) errors.discord = discordError;
  if (whatsappError) errors.whatsapp = whatsappError;
  if (!values.telegram && !values.discord && !values.whatsapp) {
    errors.contacts = "Please enter at least one of Telegram, Discord, or WhatsApp.";
  }

  const upworkUrl = normalizeUrl(values.upwork);
  if (values.upwork && !upworkUrl) errors.upwork = "Please enter a valid Upwork profile link, or leave it blank.";
  const linkedinUrl = normalizeUrl(values.linkedin);
  if (values.linkedin && !linkedinUrl) errors.linkedin = "Please enter a valid LinkedIn profile link, or leave it blank.";
  if (values.message.length > 5000) errors.message = "Message must be 5000 characters or fewer.";

  if (Object.keys(errors).length > 0) {
    return json({ status: "error", message: "Please fix the highlighted fields.", errors, values }, 400);
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.error("[membership] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set.");
    return json(
      {
        status: "error",
        message: "We could not save your membership just now. Please try again in a moment.",
        values,
      },
      500,
    );
  }

  const { data, error } = await supabase
    .from("members")
    .insert({
      full_name: values.name,
      email: values.email,
      country: values.country,
      telegram_id: values.telegram || null,
      discord_id: values.discord || null,
      whatsapp: values.whatsapp || null,
      has_upwork: hasUpwork,
      upwork_url: upworkUrl || null,
      has_linkedin: hasLinkedin,
      linkedin_url: linkedinUrl || null,
      message: values.message || null,
    })
    .select("id")
    .single();

  if (error || !data) {
    logError("[membership] Failed to save member", error);
    return json({ status: "error", message: "We could not save your membership. Please try again.", values }, 500);
  }

  const upworkLine = hasUpwork ? upworkUrl || "Account, no profile link" : "No";
  const linkedinLine = hasLinkedin ? linkedinUrl || "Account, no profile link" : "No";
  const content = [
    "<p>A new member joined MagicLife.</p>",
    "<ul>",
    `<li><strong>Name:</strong> ${escapeHtml(values.name)}</li>`,
    `<li><strong>Email:</strong> ${escapeHtml(values.email)}</li>`,
    `<li><strong>Country:</strong> ${escapeHtml(values.country)}</li>`,
    `<li><strong>Telegram:</strong> ${escapeHtml(values.telegram || "—")}</li>`,
    `<li><strong>Discord:</strong> ${escapeHtml(values.discord || "—")}</li>`,
    `<li><strong>WhatsApp:</strong> ${escapeHtml(values.whatsapp || "—")}</li>`,
    `<li><strong>Upwork:</strong> ${escapeHtml(upworkLine)}</li>`,
    `<li><strong>LinkedIn:</strong> ${escapeHtml(linkedinLine)}</li>`,
    "</ul>",
    `<p>${escapeHtml(values.message || "(No message)").replaceAll("\n", "<br>")}</p>`,
  ].join("");

  if (!process.env.EMAIL_API_KEY) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[membership] EMAIL_API_KEY is not set; notification not sent.");
      return json({ status: "success" });
    }
    await supabase.from("members").delete().eq("id", data.id);
    return json(
      {
        status: "error",
        message: "We could not finish your membership just now. Please try again.",
        values,
      },
      500,
    );
  }

  try {
    await sendEmail({
      toEmail: memberNotifyEmail,
      title: `New member: ${values.name}`,
      content,
    });
  } catch (err) {
    await supabase.from("members").delete().eq("id", data.id);
    logError("[membership] Failed to send notification", err);
    return json({ status: "error", message: "We could not finish your membership. Please try again.", values }, 500);
  }

  return json({ status: "success" });
}
