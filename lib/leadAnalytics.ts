import { track } from "@vercel/analytics"

/**
 * Fires Vercel Analytics custom event for lead form submissions and GA4
 * `generate_lead` via gtag when the tag is loaded.
 * Property values must be primitives for Vercel Analytics.
 */
export function trackLeadFormSubmit(context: {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  pagePath?: string
}) {
  if (typeof window === "undefined") return

  const data: Record<string, string> = {}
  if (context.utmSource) data.utm_source = context.utmSource
  if (context.utmMedium) data.utm_medium = context.utmMedium
  if (context.utmCampaign) data.utm_campaign = context.utmCampaign
  if (context.pagePath) data.page_path = context.pagePath

  track("lead_form_submit", data)

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "generate_lead", {
      event_callback: function () {
        console.log("Google Ads: Lead tracked successfully")
      },
    })
  }
}
