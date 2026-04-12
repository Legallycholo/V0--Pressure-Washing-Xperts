import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

const DEFAULT_NOTIFY_EMAIL = "growth@tanymarketing.com"

type LeadBody = {
  full_name?: string
  email?: string
  phone?: string
  city?: string
  state?: string
  zip?: string
  message?: string
  how_heard?: string
  selected_offer?: string
  submission_type?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  page_path?: string
  // Backward-compatible aliases during rollout.
  fullName?: string
  howHeard?: string
  selectedOffer?: string
  submissionType?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  pagePath?: string
}

function validate(body: LeadBody): string | null {
  const required = [body.full_name, body.email, body.phone]
  if (required.some((v) => typeof v !== "string" || !v.trim())) {
    return "Missing required fields."
  }
  if (!body.email?.includes("@")) {
    return "Invalid email."
  }
  return null
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function buildLeadEmailHtml(body: LeadBody): string {
  const row = (label: string, value: string | undefined | null) =>
    `<tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:6px 0">${escapeHtml(value?.trim() || "—")}</td></tr>`

  return `
<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;line-height:1.5;color:#111">
  <p>New lead from <strong>Pressure Washing Xperts</strong> website.</p>
  <table style="border-collapse:collapse;max-width:560px">${row("Name", body.full_name)}${row("Email", body.email)}${row("Phone", body.phone)}${row("City", body.city)}${row("State", body.state)}${row("ZIP", body.zip)}${row("How they heard", body.how_heard)}${row("Offer", body.selected_offer)}${row("Form / type", body.submission_type)}${row("Page", body.page_path)}${row("utm_source", body.utm_source)}${row("utm_medium", body.utm_medium)}${row("utm_campaign", body.utm_campaign)}</table>
  <p style="margin-top:16px"><strong>Message</strong></p>
  <p style="white-space:pre-wrap;margin:0">${escapeHtml(body.message?.trim() || "")}</p>
</body>
</html>`.trim()
}

async function sendLeadNotificationEmail(body: LeadBody): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL?.trim()
  const to = (process.env.LEAD_NOTIFICATION_EMAIL?.trim() || DEFAULT_NOTIFY_EMAIL).trim()

  if (!apiKey || !from) {
    console.error(
      "[api/leads] Skipping email: set RESEND_API_KEY and RESEND_FROM_EMAIL (verified sender in Resend)."
    )
    return
  }

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from,
    to,
    subject: "New lead: Pressure Washing Xperts",
    html: buildLeadEmailHtml(body),
  })

  if (error) {
    console.error("[api/leads] Resend failed", error)
  }
}

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl?.trim() || !serviceKey?.trim()) {
    return NextResponse.json(
      { error: "Lead capture is not configured. Please call (800)-451-7213." },
      { status: 503 }
    )
  }

  let body: LeadBody
  try {
    body = (await request.json()) as LeadBody
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  body = {
    ...body,
    full_name: body.full_name ?? body.fullName,
    how_heard: body.how_heard ?? body.howHeard,
    selected_offer: body.selected_offer ?? body.selectedOffer,
    submission_type: body.submission_type ?? body.submissionType,
    utm_source: body.utm_source ?? body.utmSource,
    utm_medium: body.utm_medium ?? body.utmMedium,
    utm_campaign: body.utm_campaign ?? body.utmCampaign,
    page_path: body.page_path ?? body.pagePath,
  }

  const err = validate(body)
  if (err) {
    return NextResponse.json({ error: err }, { status: 400 })
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const row = {
    full_name: body.full_name!.trim(),
    email: body.email!.trim(),
    phone: body.phone!.trim(),
    city: body.city?.trim() || null,
    state: body.state?.trim() || null,
    zip: body.zip?.trim() || null,
    message: body.message?.trim() || null,
    how_heard: body.how_heard?.trim() || null,
    selected_offer: body.selected_offer?.trim() || null,
    submission_type: body.submission_type?.trim() || null,
    utm_source: body.utm_source?.trim() || null,
    utm_medium: body.utm_medium?.trim() || null,
    utm_campaign: body.utm_campaign?.trim() || null,
    page_path: body.page_path?.trim() || null,
  }

  console.log("[api/leads] payload being sent:", JSON.stringify(body))
  const { error: insertError } = await supabase.from("leads").insert(row)

  if (insertError) {
    console.error("[api/leads] insert failed FULL ERROR:", JSON.stringify(insertError))
    return NextResponse.json(
      { error: "Could not save your request. Please call (800)-451-7213." },
      { status: 500 }
    )
  }

  try {
    await sendLeadNotificationEmail(body)
  } catch (e) {
    console.error("[api/leads] notification email error", e)
  }

  return NextResponse.json({ ok: true })
}
