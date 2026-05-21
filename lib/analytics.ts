export interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  gclid?: string
  device?: string
}

const SESSION_KEY = 'pwx_utms'

export function captureUTMs(): void {
  if (typeof window === 'undefined') return
  if (sessionStorage.getItem(SESSION_KEY)) return // first-touch only, never overwrite
  const params = new URLSearchParams(window.location.search)
  const utms: UTMParams = {
    utm_source: params.get('utm_source') ?? undefined,
    utm_medium: params.get('utm_medium') ?? undefined,
    utm_campaign: params.get('utm_campaign') ?? undefined,
    utm_term: params.get('utm_term') ?? undefined,
    utm_content: params.get('utm_content') ?? undefined,
    gclid: params.get('gclid') ?? undefined,
    device: getDeviceTag(),
  }
  const hasData = Object.values(utms).some(Boolean)
  if (hasData) sessionStorage.setItem(SESSION_KEY, JSON.stringify(utms))
}

export function getUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {}
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as UTMParams) : {}
  } catch {
    return {}
  }
}

export function getDeviceTag(): string {
  if (typeof window === 'undefined') return 'Desktop'
  const ua = navigator.userAgent
  if (/Mobi|Android/i.test(ua)) return 'Mobile'
  if (/Tablet|iPad/i.test(ua)) return 'Tablet'
  return 'Desktop'
}
