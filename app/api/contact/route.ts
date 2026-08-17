import { NextResponse } from "next/server"
import { Resend } from "resend"
import { checkBotId } from "botid/server"
import { insertLeadToSupabase } from "@/lib/supabaseLeads"
import { sendContactSms } from "@/lib/vonageNotify"
import { businessSiteHost } from "@/data/site"

type ContactData = {
  name: string
  email: string
  phone: string
  city: string
  zip: string
  services: string
  best_time: string
  how_heard: string
  message: string
  approx_sqft: string
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function parseContactBody(body: Record<string, unknown>): { ok: true; data: ContactData } | { ok: false; error: string } {
  const str = (v: unknown, cap: number) => (typeof v === "string" ? v.trim().slice(0, cap) : "")
  
  const name = str(body.name, 120)
  const email = str(body.email, 200)
  const phone = str(body.phone, 40)
  
  if (!name || !email || !phone) {
    return { ok: false, error: "Name, email, and phone are required." }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." }
  }
  if ((phone.match(/\d/g)?.length ?? 0) < 7) {
    return { ok: false, error: "Please enter a valid phone number." }
  }

  return { 
    ok: true, 
    data: { 
      name, 
      email, 
      phone, 
      city: str(body.city, 120),
      zip: str(body.zip, 20),
      services: str(body.services, 400),
      best_time: str(body.best_time, 80),
      how_heard: str(body.how_heard, 80),
      message: str(body.message, 5000),
      approx_sqft: str(body.approx_sqft, 80),
    } 
  }
}

async function sendContactNotification(data: ContactData) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return
  const resend = new Resend(apiKey)

  const rows = [
    ["Call back on", data.phone],
    ["Best time", data.best_time],
    ["Name", data.name],
    ["Town", data.city],
    ["Zip", data.zip],
    ["Wants cleaned", data.services],
    ["Approx Sqft", data.approx_sqft],
    ["Notes", data.message],
    ["Email", data.email],
    ["Found us via", data.how_heard],
  ].filter(([, value]) => value)

  const heading = "New Callback Request"
  const locationText = data.city ? ` (${data.city})` : ""

  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#16232e">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <div style="background:#0a2540;padding:20px 24px">
      <div style="color:#ffffff;font-size:18px;font-weight:700">${heading}</div>
      <div style="color:#a3c0d8;font-size:13px;margin-top:4px">Pressure Washing Xperts · via the website</div>
    </div>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) => `<tr>
        <td style="padding:12px 24px;border-bottom:1px solid #eef2f6;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:#64748b;white-space:nowrap;vertical-align:top">${escapeHtml(label as string)}</td>
        <td style="padding:12px 24px;border-bottom:1px solid #eef2f6;font-size:15px;line-height:1.5;color:#16232e;white-space:pre-wrap">${escapeHtml(value as string)}</td>
      </tr>`,
        )
        .join("")}
    </table>
    <div style="padding:20px 24px 24px">
      <a href="tel:${escapeHtml(data.phone.replace(/[^\d+]/g, ""))}" style="display:block;background:#f0b429;color:#0a2540;font-size:16px;font-weight:700;text-align:center;text-decoration:none;padding:14px 20px;border-radius:999px">Call ${escapeHtml(data.name)} back</a>
    </div>
  </div>
</body></html>`

  const text = [`${heading}`, "", ...rows.map(([l, v]) => `${l}: ${v}`)].join("\n")

  await resend.emails.send({
    from: "Dariel <dariel@tanygrowth.com>",
    to: "pressurewashingxperts@gmail.com",
    subject: `Callback request: ${data.name}${locationText}`,
    html,
    text,
    replyTo: data.email,
  }).catch((e) => console.error("[api/contact] Resend notification failed", e))
}

export async function POST(request: Request) {
  const verification = await checkBotId()
  if (verification.isBot) {
    return NextResponse.json({ error: "Access denied." }, { status: 403 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  // Honeypot check (hidden field to trap bots)
  const b = body as Record<string, unknown>
  if (typeof b._hp === "string" && b._hp.trim()) {
    return NextResponse.json({ ok: true })
  }

  const parsed = parseContactBody(b)
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }

  const { data } = parsed

  let insertFailed = false
  try {
    await insertLeadToSupabase({
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: data.city || null,
      zip: data.zip || null,
      services: data.services || null,
      best_time: data.best_time || null,
      how_heard: data.how_heard || null,
      message: data.message || null,
      approx_sqft: data.approx_sqft || null,
    })
  } catch (e) {
    insertFailed = true
    console.error("[api/contact] Supabase insert failed", e)
  }

  // Notify the team even if the DB write failed
  await Promise.allSettled([
    sendContactNotification(data),
    sendContactSms({ name: data.name, phone: data.phone })
  ])

  if (insertFailed) {
    return NextResponse.json(
      { error: "We couldn't send your message. Please try again in a moment." },
      { status: 500 }
    )
  }
  return NextResponse.json({ ok: true })
}
