import { getUTMParams } from '@/lib/analytics'

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

export function trackLeadConversion(): void {
  if (typeof window === 'undefined' || !window.gtag) return
  const utms = getUTMParams()

  // GA4 key event — import this in Google Ads as a conversion
  window.gtag('event', 'generate_lead', {
    event_category: 'lead',
    event_label: 'quote_form',
    ...utms,
  })

  // Google Ads — fires against the account tag; add conversion label once created in Google Ads
  window.gtag('event', 'conversion', {
    send_to: 'AW-18151841356',
  })
}
