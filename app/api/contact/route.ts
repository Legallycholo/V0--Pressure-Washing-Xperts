import { NextResponse } from "next/server"
import { getTwilioConfig } from "@/lib/twilioEnv"
import { sendContactSms } from "@/lib/twilioNotify"

type ContactBody = {
  name?: unknown
  email?: unknown
  phone?: unknown
  message?: unknown
}

function validateContactBody(body: ContactBody): { ok: true; data: { name: string; email: string; phone: string; message: string } } | { ok: false; error: string } {
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

export async function POST(request: Request) {
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

  const config = getTwilioConfig()
  if (!config?.toNumber) {
    console.error("[api/contact] Missing Twilio configuration")
    return NextResponse.json(
      { error: "Contact notifications are not configured." },
      { status: 503 }
    )
  }

  try {
    await sendContactSms(validated.data)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("[api/contact] Twilio SMS failed", e)
    return NextResponse.json(
      { error: "We couldn't send your message. Please try again in a moment." },
      { status: 502 }
    )
  }
}
