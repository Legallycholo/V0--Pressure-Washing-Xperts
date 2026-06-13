/**
 * Send a test new-lead SMS via Twilio (same template as /api/leads).
 * Run: pnpm dlx tsx --env-file=.env.local scripts/test-twilio-lead-sms.ts
 */
import { buildLeadSmsBody, sendLeadSmsNotification } from "../lib/twilioNotify"
import type { LeadPayload } from "../lib/submitLead"

const testLead: LeadPayload = {
  full_name: "John Doe",
  email: "john@example.com",
  phone: "(310) 555-1234",
  city: "Miami",
  state: "FL",
  zip: "33101",
  message: "Need driveway cleaned before the weekend",
  selected_offer: "first-time",
  approx_sqft_estimate: "under_1500",
  submission_type: "Free on-site quote",
  page_path: "/services/residential/driveways-sidewalks",
  utm_source: "google",
  utm_medium: "cpc",
  utm_campaign: "spring-2026",
  device: "Mobile",
}

async function main() {
  const body = buildLeadSmsBody(testLead, 212)
  console.log("Sending test SMS:\n")
  console.log(body)
  console.log("")

  await sendLeadSmsNotification(testLead, 212)
  console.log("SMS sent successfully to TWILIO_NOTIFY_PHONE.")
}

main().catch((err) => {
  console.error("Test SMS failed:", err.message ?? err)
  process.exit(1)
})
