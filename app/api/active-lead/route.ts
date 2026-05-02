import { NextResponse } from "next/server"
import { Resend } from "resend"

type LeadBody = {
  ga_id?: unknown
  url?: unknown
  trigger_reason?: unknown
  referrer?: unknown
}

function clip(v: unknown, max: number): string {
  if (typeof v !== "string") return ""
  return v.length <= max ? v : v.slice(0, max)
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("[active-lead] Missing RESEND_API_KEY")
    return NextResponse.json(
      { error: "Email notifications are not configured." },
      { status: 503 }
    )
  }

  const resend = new Resend(apiKey)

  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  if (!raw || typeof raw !== "object") {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 })
  }

  const body = raw as LeadBody
  const ga_id = clip(body.ga_id, 128)
  const url = clip(body.url, 2000)
  const trigger_reason = clip(body.trigger_reason, 500)
  const referrerRaw = clip(body.referrer, 2000)

  try {
    const { data, error } = await resend.emails.send({
      from: "Dariel <dariel@tanygrowth.com>",
      to: "legallycholo3@gmail.com",
      subject: `⚡ Activity Detected: ${trigger_reason || "user_active"}`,
      html: `
        <h2>Lead is Active on Site</h2>
        <p>A user is currently engaging with the project.</p>
        <hr />
        <ul>
          <li><strong>Trigger:</strong> ${escapeHtml(trigger_reason) || "—"}</li>
          <li><strong>Current Page:</strong> ${escapeHtml(url) || "—"}</li>
          <li><strong>Google Analytics ID:</strong> ${escapeHtml(ga_id) || "—"}</li>
          <li><strong>Referrer:</strong> ${referrerRaw ? escapeHtml(referrerRaw) : "Direct"}</li>
        </ul>
        <p><em>This lead has not filled out a form yet, but is showing high intent.</em></p>
      `,
    })

    if (error) {
      console.error("[active-lead] Resend error", error)
      return NextResponse.json({ error: "Failed to send notification." }, { status: 502 })
    }

    return NextResponse.json({ data })
  } catch (e) {
    console.error("[active-lead]", e)
    return NextResponse.json(
      { error: "Failed to send notification." },
      { status: 500 }
    )
  }
}
