import { NextResponse } from "next/server"
import { Resend } from "resend"

type LeadBody = {
  ga_id?: unknown
  url?: unknown
  trigger_reason?: unknown
  referrer?: unknown
  time_spent?: unknown
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
  const { ga_id, url, trigger_reason, referrer, time_spent } = body
  const safeGaId = clip(ga_id, 128)
  const safeUrl = clip(url, 2000)
  const safeTriggerReason = clip(trigger_reason, 500)
  const safeReferrer = clip(referrer, 2000)
  const safeTimeSpent = clip(time_spent, 80)
  const pagePath = new URL(safeUrl).pathname

  try {
    const { data, error } = await resend.emails.send({
      from: "Dariel <dariel@tanygrowth.com>",
      to: "legallycholo3@gmail.com",
      subject: `⚡ Lead Active on ${pagePath}`,
      html: `
        <h2 style="color: #007bff;">Lead is Active on Site</h2>
        <p>A user is currently engaging with the project.</p>
        <hr />
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Trigger:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(safeTriggerReason) || "—"}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Current Page:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;"><a href="${escapeHtml(safeUrl)}">${escapeHtml(pagePath)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Total Session Time:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(safeTimeSpent) || "—"}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Google Analytics ID:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(safeGaId) || "—"}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Referrer:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${safeReferrer ? escapeHtml(safeReferrer) : "Direct"}</td>
          </tr>
        </table>
        <br />
        <p style="background: #f8f9fa; padding: 10px; border-left: 4px solid #007bff;">
          <strong>Note:</strong> This lead has not filled out a form yet, but is showing high intent.
        </p>
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
