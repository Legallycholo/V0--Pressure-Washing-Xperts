import { track } from "@vercel/analytics"

/** Reuses the conversion ID already wired on app/thank-you/layout.tsx so both
 * the redirect path and the inline (modal/hero) success path report the same
 * Google Ads conversion. */
const GOOGLE_ADS_CONVERSION_SEND_TO = "AW-18151841356/dGq1CMSB5KocEMy8vM9D"

export type LeadAnalyticsContext = {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
  gclid?: string
  device?: string
  pagePath?: string
}

/**
 * Fires Vercel Analytics + GA4 `generate_lead` + Google Ads `conversion` for
 * a successful lead submission. Safe to call from any client form handler.
 *
 * The `conversion` fire is the same `send_to` used by app/thank-you/layout.tsx
 * so inline success paths (Hero / non-redirect modal) are still attributed.
 */
export function trackLeadFormSubmit(context: LeadAnalyticsContext) {
  if (typeof window === "undefined") return

  const data: Record<string, string> = {}
  if (context.utmSource) data.utm_source = context.utmSource
  if (context.utmMedium) data.utm_medium = context.utmMedium
  if (context.utmCampaign) data.utm_campaign = context.utmCampaign
  if (context.utmTerm) data.utm_term = context.utmTerm
  if (context.utmContent) data.utm_content = context.utmContent
  if (context.gclid) data.gclid = context.gclid
  if (context.device) data.device = context.device
  if (context.pagePath) data.page_path = context.pagePath

  track("lead_form_submit", data)

  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      event_callback: function () {
        console.log("Google Ads: Lead tracked successfully")
      },
    })

    window.gtag("event", "conversion", {
      send_to: GOOGLE_ADS_CONVERSION_SEND_TO,
      value: 1.0,
      currency: "USD",
    })
  }
}
