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
