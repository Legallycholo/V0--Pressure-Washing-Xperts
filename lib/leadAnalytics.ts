import { getUTMParams } from '@/lib/analytics'

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

export function trackLeadConversion(): void {
  if (typeof window === 'undefined' || !window.gtag) return
  const utms = getUTMParams()

  // GA4 generate_lead — Google Ads imports this automatically via linked account
  window.gtag('event', 'generate_lead', {
    event_category: 'lead',
    event_label: 'quote_form',
    ...utms,
  })
}
