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

  /**
   * Event parameters passed to BOTH Vercel Analytics (`track`) and GA4 (`gtag`).
   * Parameter names match the GA4 event-scoped custom dimensions registered in
   * Admin → Custom definitions (utm_source, utm_medium, utm_campaign, utm_term,
   * utm_content, gclid, device, page_path).
   */
  const params: Record<string, string> = {}
  if (context.utmSource) params.utm_source = context.utmSource
  if (context.utmMedium) params.utm_medium = context.utmMedium
  if (context.utmCampaign) params.utm_campaign = context.utmCampaign
  if (context.utmTerm) params.utm_term = context.utmTerm
  if (context.utmContent) params.utm_content = context.utmContent
  if (context.gclid) params.gclid = context.gclid
  if (context.device) params.device = context.device
  if (context.pagePath) params.page_path = context.pagePath

  track("lead_form_submit", params)

  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      ...params,
      currency: "USD",
      value: 1.0,
    })

    window.gtag("event", "conversion", {
      ...params,
      send_to: GOOGLE_ADS_CONVERSION_SEND_TO,
      value: 1.0,
      currency: "USD",
    })
  }
}
