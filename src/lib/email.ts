const EMAIL_API_URL = "https://email-server-five-tawny.vercel.app/api/v1/email/resend";

export const emailFrom = {
  email: "support@magiclife.agency",
  name: "MagicLife Agency Support",
};

export const memberNotifyEmail = "rexcare124@gmail.com";

type SendEmailInput = {
  toEmail: string;
  title: string;
  content: string;
};

export async function sendEmail({ toEmail, title, content }: SendEmailInput) {
  const apiKey = process.env.EMAIL_API_KEY;
  if (!apiKey) {
    throw new Error("EMAIL_API_KEY is not set");
  }

  const response = await fetch(EMAIL_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey,
      fromEmail: emailFrom.email,
      fromName: emailFrom.name,
      toEmail: [memberNotifyEmail, toEmail],
      title,
      content,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Email API responded ${response.status}: ${body}`);
  }
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
