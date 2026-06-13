/**
 * Send a test contact-form SMS via Twilio (same template as /api/contact).
 * Run: pnpm dlx tsx --env-file=.env.local scripts/test-twilio-contact-sms.ts
 */
import { buildContactSmsBody, sendContactSms } from "../lib/twilioNotify"

const testPayload = {
  name: "Test Contact (PWX)",
  email: "test@example.com",
  phone: "(310) 555-9999",
  message: "TEST ONLY — please ignore. Verifying contact form SMS.",
}

async function main() {
  const body = buildContactSmsBody(testPayload)
  console.log("Sending test SMS:\n")
  console.log(body)
  console.log("")

  await sendContactSms(testPayload)
  console.log("SMS sent successfully to TWILIO_TO_NUMBER.")
}

main().catch((err) => {
  console.error("Test SMS failed:", err.message ?? err)
  process.exit(1)
})
