import { getUTMParams } from '@/lib/analytics'

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

export function trackLeadConversion(): void {
  if (typeof window === 'undefined' || !window.gtag) return
  const utms = getUTMParams()

  // GA4 key event — imported into Google Ads as the active "generate_lead" conversion
  window.gtag('event', 'generate_lead', {
    event_category: 'lead',
    event_label: 'callback_form',
    ...utms,
  })
}
