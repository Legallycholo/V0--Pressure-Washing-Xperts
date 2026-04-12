import { track } from "@vercel/analytics"

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, string | number | boolean | undefined>
    ) => void
  }
}

/**
 * Fires Vercel Analytics custom event and GA4 (gtag) when present.
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

  const gaPayload: Record<string, string> = {}
  if (context.utmSource) gaPayload.utm_source = context.utmSource
  if (context.utmMedium) gaPayload.utm_medium = context.utmMedium
  if (context.utmCampaign) gaPayload.utm_campaign = context.utmCampaign
  if (context.pagePath) gaPayload.page_path = context.pagePath
  if (Object.keys(gaPayload).length > 0) {
    window.gtag?.("event", "lead_form_submit", gaPayload)
  } else {
    window.gtag?.("event", "lead_form_submit")
  }
}
