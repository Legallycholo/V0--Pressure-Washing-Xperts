import { NextResponse } from "next/server"
import { randomUUID } from "crypto"
import { Resend } from "resend"
import { buildLeadInsertRow, type LeadPayload } from "@/lib/submitLead"
import { insertInboundLead } from "@/lib/bigqueryLeads"

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
  const pagePath = payload.page_path ? escapeHtml(payload.page_path) : "—"
  await resend.emails.send({
    from: "Dariel <dariel@tanygrowth.com>",
    to: "dariel@tanygrowth.com",
    subject: `🔔 New Lead — ${payload.full_name} (${payload.phone})`,
    html: `
      <h2 style="color:#007bff;">New Quote Request</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Name</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(payload.full_name)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(payload.phone)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(payload.email)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>City / State</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml([payload.city, payload.state].filter(Boolean).join(", ") || "—")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Message</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(payload.message || "—")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Sqft Range</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(payload.approx_sqft_estimate || "—")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Rough Estimate</strong></td><td style="padding:8px;border:1px solid #ddd;">$${roughPrice}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Page</strong></td><td style="padding:8px;border:1px solid #ddd;">${pagePath}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>How Heard</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(payload.how_heard || "—")}</td></tr>
      </table>
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
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("[api/leads] BigQuery insert failed", e)
    return NextResponse.json(
      { error: "We couldn't save your request. Please try again in a moment." },
      { status: 500 }
    )
  }
}
