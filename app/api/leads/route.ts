import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

type LeadBody = {
  fullName?: string
  email?: string
  phone?: string
  city?: string
  state?: string
  zip?: string
  message?: string
  howHeard?: string
  selectedOffer?: string
  submissionType?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  pagePath?: string
}

function validate(body: LeadBody): string | null {
  const required = [
    body.fullName,
    body.email,
    body.phone,
    body.city,
    body.state,
    body.zip,
    body.message,
    body.howHeard,
  ]
  if (required.some((v) => typeof v !== "string" || !v.trim())) {
    return "Missing required fields."
  }
  if (!body.email?.includes("@")) {
    return "Invalid email."
  }
  return null
}

async function ensureLeadsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      zip TEXT NOT NULL,
      message TEXT NOT NULL,
      how_heard TEXT NOT NULL,
      selected_offer TEXT,
      submission_type TEXT,
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      page_path TEXT
    );
  `
}

export async function POST(request: Request) {
  if (!process.env.POSTGRES_URL) {
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

  const err = validate(body)
  if (err) {
    return NextResponse.json({ error: err }, { status: 400 })
  }

  try {
    await ensureLeadsTable()
    await sql`
      INSERT INTO leads (
        full_name,
        email,
        phone,
        city,
        state,
        zip,
        message,
        how_heard,
        selected_offer,
        submission_type,
        utm_source,
        utm_medium,
        utm_campaign,
        page_path
      ) VALUES (
        ${body.fullName!.trim()},
        ${body.email!.trim()},
        ${body.phone!.trim()},
        ${body.city!.trim()},
        ${body.state!.trim()},
        ${body.zip!.trim()},
        ${body.message!.trim()},
        ${body.howHeard!.trim()},
        ${body.selectedOffer?.trim() || null},
        ${body.submissionType?.trim() || null},
        ${body.utmSource?.trim() || null},
        ${body.utmMedium?.trim() || null},
        ${body.utmCampaign?.trim() || null},
        ${body.pagePath?.trim() || null}
      )
    `
  } catch (e) {
    console.error("[api/leads] insert failed", e)
    return NextResponse.json(
      { error: "Could not save your request. Please call (800)-451-7213." },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true })
}
