import { site } from "@/content/site";

const EMAIL_API_URL = "https://email-server-five-tawny.vercel.app/api/v1/email/resend";

export const emailFrom = {
  email: "support@magiclife.agency",
  name: "MagicLife Agency Support",
};

export const memberNotifyEmail = "rexcare124@gmail.com";

type SendEmailInput = {
  toEmail: string;
  memberName: string;
  title: string;
  content: string;
};

async function postEmail(apiKey: string, to: string, title: string, content: string) {
  const response = await fetch(EMAIL_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey,
      fromEmail: emailFrom.email,
      fromName: emailFrom.name,
      toEmail: [to],
      title,
      content,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Email API responded ${response.status}: ${body}`);
  }
}

export async function sendEmail({ toEmail, memberName, title, content }: SendEmailInput) {
  const apiKey = process.env.EMAIL_API_KEY;
  if (!apiKey) {
    throw new Error("EMAIL_API_KEY is not set");
  }

  await postEmail(apiKey, memberNotifyEmail, title, content);
  await postEmail(apiKey, toEmail, "Your MagicLife membership is confirmed", welcomeEmail(memberName));
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function welcomeEmail(memberName: string) {
  const firstName = escapeHtml(memberName.trim().split(/\s+/)[0] || "there");
  const supportEmail = escapeHtml(site.email);
  const phone = escapeHtml(site.phone);
  const siteUrl = escapeHtml(site.url);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Your MagicLife membership is confirmed</title>
</head>
<body style="margin:0;padding:0;background:#f7f6f3;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Your membership is confirmed. A member of our team will contact you with the next step.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f6f3;margin:0;padding:0;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #dcd6c4;">
          <tr>
            <td style="background:#111111;padding:28px 32px;">
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:13px;letter-spacing:0.22em;color:#d6ab45;">MAGICLIFE</p>
              <p style="margin:10px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.3;color:#faf6ea;">Welcome to the agency.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:#111111;">
              <p style="margin:0 0 16px;">Hi ${firstName},</p>
              <p style="margin:0 0 16px;">Thank you for joining MagicLife. Your membership is confirmed.</p>
              <p style="margin:0 0 24px;">MagicLife is a software agency. Members take part through client referrals, profit-sharing partnerships, and flexible side work. No coding experience is required, and you can continue in your current job. Earnings depend on the program you choose and what you contribute.</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf6ea;border-left:3px solid #d6ab45;">
                <tr>
                  <td style="padding:16px 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#111111;">
                    <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#8a6414;">What happens next</p>
                    <p style="margin:0;">A member of our team will contact you to walk through the programs, the written terms, and how you are paid. There is nothing you need to do until you hear from us.</p>
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 0;">If you have a question before then, reply to this email or write to <a href="mailto:${supportEmail}" style="color:#8a6414;text-decoration:underline;">${supportEmail}</a>. We reply Monday to Friday.</p>
              <p style="margin:24px 0 0;">Welcome aboard,<br>The MagicLife team</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 28px;border-top:1px solid #dcd6c4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;line-height:1.6;color:#57534e;">
              MagicLife Agency<br>
              <a href="mailto:${supportEmail}" style="color:#57534e;text-decoration:underline;">${supportEmail}</a>
              · ${phone}<br>
              <a href="${siteUrl}" style="color:#57534e;text-decoration:underline;">${siteUrl.replace("https://", "")}</a>
              <p style="margin:14px 0 0;font-size:12px;line-height:1.5;color:#57534e;">You received this email because you joined MagicLife.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
