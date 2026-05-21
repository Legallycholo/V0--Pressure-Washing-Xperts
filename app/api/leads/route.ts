import { NextResponse } from "next/server"
import { Resend } from "resend"
import { buildLeadInsertRow, type LeadPayload } from "@/lib/submitLead"
import { createServiceRoleClient } from "@/utils/supabase/admin"
import { createClient } from "@/utils/supabase/server"
import { getSupabasePublishableKey, getSupabaseUrl } from "@/utils/supabase/env"

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
    to: "pressurewashingxpert@gmail.com",
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

  const url = getSupabaseUrl()
  if (!url) {
    console.error("[api/leads] Missing Supabase URL")
    return NextResponse.json(
      { error: "Submission is temporarily unavailable. Please try again later." },
      { status: 503 }
    )
  }

  const service = createServiceRoleClient()
  if (service) {
    const { error } = await service.from("leads").insert(row)
    if (error) {
      console.error("[api/leads] Supabase insert failed (service role)", error)
      return NextResponse.json(
        { error: "We couldn't save your request. Please try again in a moment." },
        { status: 500 }
      )
    }
    void sendLeadNotification(body, row.rough_price_estimate ?? 0)
    return NextResponse.json({ ok: true })
  }

  const publishable = getSupabasePublishableKey()
  if (!publishable) {
    console.error("[api/leads] Missing Supabase publishable key")
    return NextResponse.json(
      { error: "Submission is temporarily unavailable. Please try again later." },
      { status: 503 }
    )
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.from("leads").insert(row)
    if (error) {
      console.error("[api/leads] Supabase insert failed (anon)", error)
      return NextResponse.json(
        { error: "We couldn't save your request. Please try again in a moment." },
        { status: 500 }
      )
    }
    void sendLeadNotification(body, row.rough_price_estimate ?? 0)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("[api/leads] unexpected error", e)
    return NextResponse.json(
      { error: "We couldn't save your request. Please try again in a moment." },
      { status: 500 }
    )
  }
}
