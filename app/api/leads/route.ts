import { NextResponse } from "next/server"
import { randomUUID } from "crypto"
import { Resend } from "resend"
import { buildLeadInsertRow, type LeadPayload } from "@/lib/submitLead"
import { insertInboundLead } from "@/lib/bigqueryLeads"
import { businessSiteHost } from "@/data/site"
import { sendLeadSms } from "@/lib/twilioNotify"

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

async function sendLeadNotification(payload: LeadPayload, roughPrice: number) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return
  const resend = new Resend(apiKey)

  const location = [payload.city, payload.state, payload.zip].filter(Boolean).join(", ") || "—"
  const source = payload.utm_source
    ? `${escapeHtml(payload.utm_source)}${payload.utm_medium ? ` / ${escapeHtml(payload.utm_medium)}` : ""}${payload.utm_campaign ? ` — ${escapeHtml(payload.utm_campaign)}` : ""}`
    : payload.how_heard
      ? escapeHtml(payload.how_heard)
      : "Direct"

  await resend.emails.send({
    from: "Dariel <dariel@tanygrowth.com>",
    to: "pressurewashingxperts@gmail.com",
    subject: `🔔 New Lead — ${payload.full_name} in ${payload.city || "Unknown"} (${payload.phone})`,
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
            <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;">New Quote Request</h1>
            <p style="margin:6px 0 0 0;font-size:13px;color:#8899aa;">${new Date().toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "full", timeStyle: "short" })} ET</p>
          </td>
        </tr>

        <!-- Price estimate banner -->
        <tr>
          <td style="background:#f0b429;padding:14px 32px;">
            <p style="margin:0;font-size:13px;font-weight:600;color:#0a2540;">Rough Estimate &nbsp;·&nbsp; <span style="font-size:20px;">$${roughPrice}</span></p>
          </td>
        </tr>

        <!-- Contact info -->
        <tr>
          <td style="padding:28px 32px 0;">
            <p style="margin:0 0 16px 0;font-size:11px;font-weight:700;letter-spacing:1px;color:#8899aa;text-transform:uppercase;">Contact</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-bottom:12px;">
                  <p style="margin:0;font-size:20px;font-weight:700;color:#0a2540;">${escapeHtml(payload.full_name)}</p>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom:8px;">
                  <a href="tel:${escapeHtml(payload.phone)}" style="font-size:16px;color:#0a72f5;text-decoration:none;font-weight:600;">📞 ${escapeHtml(payload.phone)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom:8px;">
                  <a href="mailto:${escapeHtml(payload.email)}" style="font-size:14px;color:#0a72f5;text-decoration:none;">✉️ ${escapeHtml(payload.email)}</a>
                </td>
              </tr>
              <tr>
                <td>
                  <p style="margin:0;font-size:14px;color:#445566;">📍 ${escapeHtml(location)}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:20px 32px 0;"><hr style="border:none;border-top:1px solid #eef0f3;margin:0;" /></td></tr>

        <!-- Project details -->
        <tr>
          <td style="padding:20px 32px 0;">
            <p style="margin:0 0 12px 0;font-size:11px;font-weight:700;letter-spacing:1px;color:#8899aa;text-transform:uppercase;">Project Details</p>
            <table width="100%" cellpadding="0" cellspacing="6">
              <tr>
                <td style="font-size:13px;color:#667788;width:40%;padding:4px 0;">Sqft estimate</td>
                <td style="font-size:13px;color:#0a2540;font-weight:600;">${escapeHtml(payload.approx_sqft_estimate || "—")}</td>
              </tr>
              <tr>
                <td style="font-size:13px;color:#667788;padding:4px 0;vertical-align:top;">Description</td>
                <td style="font-size:13px;color:#0a2540;font-weight:600;">${escapeHtml(payload.message || "—")}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:20px 32px 0;"><hr style="border:none;border-top:1px solid #eef0f3;margin:0;" /></td></tr>

        <!-- Source -->
        <tr>
          <td style="padding:20px 32px 28px;">
            <p style="margin:0 0 12px 0;font-size:11px;font-weight:700;letter-spacing:1px;color:#8899aa;text-transform:uppercase;">Lead Source</p>
            <table width="100%" cellpadding="0" cellspacing="6">
              <tr>
                <td style="font-size:13px;color:#667788;width:40%;padding:4px 0;">Source</td>
                <td style="font-size:13px;color:#0a2540;font-weight:600;">${source}</td>
              </tr>
              <tr>
                <td style="font-size:13px;color:#667788;padding:4px 0;">Device</td>
                <td style="font-size:13px;color:#0a2540;font-weight:600;">${escapeHtml(payload.device || "—")}</td>
              </tr>
              <tr>
                <td style="font-size:13px;color:#667788;padding:4px 0;">Page</td>
                <td style="font-size:13px;color:#0a2540;font-weight:600;">${payload.page_path ? escapeHtml(payload.page_path) : "—"}</td>
              </tr>
            </table>
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
  }).catch((e) => console.error("[api/leads] Resend notification failed", e))
}

function isLeadPayload(body: unknown): body is LeadPayload {
  if (!body || typeof body !== "object") return false
  const o = body as Record<string, unknown>
  return (
    typeof o.full_name === "string" &&
    typeof o.email === "string" &&
    typeof o.phone === "string"
  )
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  if (!isLeadPayload(body)) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
  }

  const built = buildLeadInsertRow(body)
  if ("error" in built) {
    return NextResponse.json({ error: built.error }, { status: 400 })
  }

  const { row } = built
  try {
    await insertInboundLead({
      lead_id: randomUUID(),
      created_at: new Date().toISOString(),
      submission_source: "website-form",
      submission_type: row.submission_type,
      full_name: row.full_name,
      phone: row.phone,
      email: row.email,
      city: row.city,
      state: row.state ?? "GA",
      zip: row.zip,
      approx_sqft_estimate: row.approx_sqft_estimate,
      how_heard: row.how_heard,
      service_request: row.message,
      page_path: row.page_path,
      utm_source: row.utm_source,
      utm_medium: row.utm_medium,
      utm_campaign: row.utm_campaign,
      utm_term: row.utm_term,
      utm_content: row.utm_content,
      gclid: row.gclid,
      device: row.device,
    })

    void sendLeadNotification(body, row.rough_price_estimate ?? 0)
    void sendLeadSms({
      full_name: row.full_name,
      email: row.email,
      phone: row.phone,
      city: row.city,
      state: row.state,
      zip: row.zip,
      message: row.message,
      selected_offer: row.selected_offer,
      approx_sqft_estimate: row.approx_sqft_estimate,
      rough_price_estimate: row.rough_price_estimate,
    }).catch((e) => console.error("[api/leads] Twilio SMS failed", e))
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("[api/leads] BigQuery insert failed", e)
    return NextResponse.json(
      { error: "We couldn't save your request. Please try again in a moment." },
      { status: 500 }
    )
  }
}
