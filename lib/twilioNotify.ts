import twilio from "twilio"
import { SQFT_RANGE_OPTIONS } from "@/data/sqftEstimateOptions"
import type { LeadPayload } from "@/lib/submitLead"
import { getTwilioConfig } from "@/lib/twilioEnv"

function inferServiceLabel(pagePath?: string): string {
  const path = pagePath?.toLowerCase() ?? ""
  if (path.includes("/services/commercial") || path.includes("/commercial")) {
    return "Commercial"
  }
  if (path.includes("/services/residential") || path.includes("/residential")) {
    return "Residential"
  }
  return "General"
}

function formatSqftEstimate(slug?: string): string {
  if (!slug?.trim()) return "—"
  const match = SQFT_RANGE_OPTIONS.find((o) => o.value === slug)
  const label = match?.label ?? slug
  return `~${label.replace(/\s*sq\s*ft/i, " sqft")}`
}

function formatLocation(payload: LeadPayload): string {
  const cityState = [payload.city, payload.state].filter(Boolean).join(", ")
  const zip = payload.zip?.trim()
  if (cityState && zip) return `${cityState} ${zip}`
  return cityState || zip || "—"
}

function formatSource(payload: LeadPayload): string {
  if (payload.utm_source?.trim()) {
    const source = payload.utm_source.trim()
    const medium = payload.utm_medium?.trim()
    const campaign = payload.utm_campaign?.trim()
    const channel = medium ? `${source}/${medium}` : source
    return campaign ? `${channel} — ${campaign}` : channel
  }
  if (payload.how_heard?.trim()) return payload.how_heard.trim()
  return "Direct"
}

function formatOffer(selectedOffer?: string): string {
  const offer = selectedOffer?.trim()
  if (!offer || offer === "none") return "none"
  return offer
}

function formatEstimate(roughPrice: number): string {
  const rounded = Math.round(roughPrice)
  return `$${rounded}`
}

function formatDevice(device?: string): string {
  const tag = device?.trim()
  return tag ? tag.toLowerCase() : "unknown"
}

export function buildLeadSmsBody(payload: LeadPayload, roughPrice: number): string {
  const lines = [
    "PWX New Lead",
    `${payload.full_name.trim()} | ${payload.phone.trim()}`,
    payload.email.trim(),
    `Service: ${inferServiceLabel(payload.page_path)}`,
    `Offer: ${formatOffer(payload.selected_offer)}`,
    `${formatLocation(payload)} | ${formatSqftEstimate(payload.approx_sqft_estimate)}`,
    `Est: ${formatEstimate(roughPrice)} | ${formatDevice(payload.device)}`,
    `Source: ${formatSource(payload)}`,
  ]

  const note = payload.message?.trim()
  if (note) {
    lines.push(`Note: ${note.slice(0, 200)}`)
  }

  return lines.join("\n")
}

/** Fire-and-forget SMS to TWILIO_NOTIFY_PHONE when Twilio is fully configured. */
export async function sendLeadSmsNotification(
  payload: LeadPayload,
  roughPrice: number
): Promise<void> {
  const config = getTwilioConfig()
  if (!config?.notifyPhone) return

  const client = twilio(config.accountSid, config.authToken)
  await client.messages.create({
    from: config.fromNumber,
    to: config.notifyPhone,
    body: buildLeadSmsBody(payload, roughPrice),
  })
}
