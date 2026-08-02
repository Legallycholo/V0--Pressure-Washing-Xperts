import { NextResponse } from "next/server"
import { Resend } from "resend"
import { checkBotId } from "botid/server"
import { insertLeadToSupabase } from "@/lib/supabaseLeads"
import { sendContactSms } from "@/lib/vonageNotify"
import { businessSiteHost } from "@/data/site"

type ContactBody = {
  name?: unknown
  email?: unknown
  phone?: unknown
  message?: unknown
}

type ContactData = { name: string; email: string; phone: string; message: string }

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function validateContactBody(body: ContactBody): { ok: true; data: ContactData } | { ok: false; error: string } {
  const name = typeof body.name === "string" ? body.name.trim() : ""
  const email = typeof body.email === "string" ? body.email.trim() : ""
  const phone = typeof body.phone === "string" ? body.phone.trim() : ""
  const message = typeof body.message === "string" ? body.message.trim() : ""

  if (!name || !email || !phone || !message) {
    return { ok: false, error: "All fields are required." }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." }
  }

  return { ok: true, data: { name, email, phone, message } }
}

async function sendContactNotification(data: ContactData) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return
  const resend = new Resend(apiKey)

  await resend.emails.send({
    from: "Dariel <dariel@tanygrowth.com>",
    to: "pressurewashingxperts@gmail.com",
    subject: `🔔 New Contact Message: ${data.name} (${data.phone})`,
    html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#0a2540;padding:28px 32px;">
            <p style="margin:0 0 4px 0;font-size:12px;font-weight:600;letter-spacing:1px;color:#f0b429;text-transform:uppercase;">Pressure Washing Xperts</p>
            <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;">New Contact Message</h1>
            <p style="margin:6px 0 0 0;font-size:13px;color:#8899aa;">${new Date().toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "full", timeStyle: "short" })} ET</p>
          </td>
        </tr>

        <!-- Contact info -->
        <tr>
          <td style="padding:28px 32px 0;">
            <p style="margin:0 0 16px 0;font-size:11px;font-weight:700;letter-spacing:1px;color:#8899aa;text-transform:uppercase;">Contact</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-bottom:12px;">
                  <p style="margin:0;font-size:20px;font-weight:700;color:#0a2540;">${escapeHtml(data.name)}</p>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom:8px;">
                  <a href="tel:${escapeHtml(data.phone)}" style="font-size:16px;color:#0a72f5;text-decoration:none;font-weight:600;">📞 ${escapeHtml(data.phone)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom:8px;">
                  <a href="mailto:${escapeHtml(data.email)}" style="font-size:14px;color:#0a72f5;text-decoration:none;">✉️ ${escapeHtml(data.email)}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:20px 32px 0;"><hr style="border:none;border-top:1px solid #eef0f3;margin:0;" /></td></tr>

        <!-- Message -->
        <tr>
          <td style="padding:20px 32px 28px;">
            <p style="margin:0 0 12px 0;font-size:11px;font-weight:700;letter-spacing:1px;color:#8899aa;text-transform:uppercase;">Message</p>
            <p style="margin:0;font-size:14px;color:#0a2540;">${escapeHtml(data.message)}</p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f4f6f8;padding:16px 32px;border-top:1px solid #eef0f3;">
            <p style="margin:0;font-size:11px;color:#aabbcc;text-align:center;">Pressure Washing Xperts · ${businessSiteHost}</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
    `,
  }).catch((e) => console.error("[api/contact] Resend notification failed", e))
}

export async function POST(request: Request) {
  const verification = await checkBotId()
  if (verification.isBot) {
    return NextResponse.json({ error: "Access denied." }, { status: 403 })
  }

  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  if (!raw || typeof raw !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  const validated = validateContactBody(raw as ContactBody)
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 })
  }

  const { data } = validated

  let insertFailed = false
  try {
    await insertLeadToSupabase({
      full_name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      city: null,
      state: null,
      zip: null,
      how_heard: null,
      selected_offer: null,
      approx_sqft_estimate: null,
      rough_price_estimate: null,
      rough_price_version: null,
      approx_sq_footage: null,
      submission_type: "contact-form",
      page_path: null,
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_term: null,
      utm_content: null,
      gclid: null,
      device: null,
      submission_source: "website-form",
    })
  } catch (e) {
    insertFailed = true
    console.error("[api/contact] Supabase insert failed", e)
  }

  // Notify the team even if the DB write failed, so no message gets missed.
  void sendContactNotification(data)
  void sendContactSms({ name: data.name, phone: data.phone }).catch((e) =>
    console.error("[api/contact] Vonage SMS notification failed", e)
  )

  if (insertFailed) {
    return NextResponse.json(
      { error: "We couldn't send your message. Please try again in a moment." },
      { status: 500 }
    )
  }
  return NextResponse.json({ ok: true })
}
