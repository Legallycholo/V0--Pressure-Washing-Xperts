import { getVonageConfig } from "@/lib/vonageEnv"

const VONAGE_SMS_ENDPOINT = "https://rest.nexmo.com/sms/json"

async function sendSms(text: string) {
  const config = getVonageConfig()
  if (!config) return

  const body = new URLSearchParams({
    api_key: config.apiKey,
    api_secret: config.apiSecret,
    from: config.from,
    to: config.to,
    text,
  })

  const res = await fetch(VONAGE_SMS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  })

  const result = (await res.json()) as { messages?: Array<{ status?: string; "error-text"?: string }> }
  const failed = result.messages?.find((m) => m.status !== "0")
  if (failed) {
    throw new Error(`Vonage SMS failed: ${failed["error-text"] ?? "unknown error"}`)
  }
}

export async function sendLeadSms(params: { fullName: string; phone: string; city?: string | null }) {
  const location = params.city ? ` in ${params.city}` : ""
  await sendSms(`New quote request${location}: ${params.fullName}, ${params.phone}`)
}

export async function sendContactSms(params: { name: string; phone: string }) {
  await sendSms(`New contact message: ${params.name}, ${params.phone}`)
}
