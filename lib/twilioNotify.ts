import twilio from "twilio"
import { getTwilioConfig } from "@/lib/twilioEnv"

export type ContactSmsPayload = {
  name: string
  email: string
  phone: string
  message: string
}

export function buildContactSmsBody(payload: ContactSmsPayload): string {
  const message = payload.message.trim().slice(0, 300)
  return [
    "PWX Contact Form",
    payload.name.trim(),
    payload.email.trim(),
    payload.phone.trim(),
    `Message: ${message}`,
  ].join("\n")
}

export async function sendContactSms(payload: ContactSmsPayload): Promise<void> {
  const config = getTwilioConfig()
  if (!config?.toNumber) {
    throw new Error("Twilio SMS is not configured (missing TWILIO_TO_NUMBER).")
  }

  const client = twilio(config.accountSid, config.authToken)
  await client.messages.create({
    from: config.fromNumber,
    to: config.toNumber,
    body: buildContactSmsBody(payload),
  })
}

export type LeadSmsPayload = {
  full_name: string
  email: string
  phone: string
  city?: string | null
  state?: string | null
  zip?: string | null
  message?: string | null
  selected_offer?: string | null
  approx_sqft_estimate?: string | null
  rough_price_estimate?: number | null
}

export function buildLeadSmsBody(payload: LeadSmsPayload): string {
  const location = [payload.city, payload.state, payload.zip].filter(Boolean).join(", ")
  const parts = [
    "PWX New Lead",
    payload.full_name,
    payload.phone,
    payload.email,
  ]
  if (location) parts.push(`Location: ${location}`)
  if (payload.selected_offer && payload.selected_offer !== "none") {
    parts.push(`Offer: ${payload.selected_offer}`)
  }
  if (payload.approx_sqft_estimate) {
    parts.push(`Sqft: ${payload.approx_sqft_estimate}`)
  }
  if (payload.rough_price_estimate) {
    parts.push(`Est: $${payload.rough_price_estimate}`)
  }
  if (payload.message) {
    parts.push(`Note: ${payload.message.trim().slice(0, 200)}`)
  }
  return parts.join("\n")
}

export async function sendLeadSms(payload: LeadSmsPayload): Promise<void> {
  const config = getTwilioConfig()
  if (!config?.toNumber) {
    throw new Error("Twilio SMS is not configured (missing TWILIO_TO_NUMBER).")
  }

  const client = twilio(config.accountSid, config.authToken)
  await client.messages.create({
    from: config.fromNumber,
    to: config.toNumber,
    body: buildLeadSmsBody(payload),
  })
}
