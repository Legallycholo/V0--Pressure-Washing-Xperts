/**
 * UTM + click-id capture for ad attribution.
 *
 * - Persists Google Ads / paid-traffic params to sessionStorage so attribution
 *   survives internal navigation (user lands on /, browses, then submits a form).
 * - First-touch wins: once a session has values stored, later page loads with
 *   missing/empty UTMs do not overwrite them. This prevents an internal click
 *   that strips query params from erasing the original ad source.
 */

export const UTM_STORAGE_KEY = "utm_params"

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const

export const CLICK_KEYS = ["gclid"] as const

type UTMKey = (typeof UTM_KEYS)[number]
type ClickKey = (typeof CLICK_KEYS)[number]

export type UTMParams = Partial<Record<UTMKey | ClickKey, string>>

const ALL_KEYS: ReadonlyArray<UTMKey | ClickKey> = [...UTM_KEYS, ...CLICK_KEYS]

function safeSessionStorage(): Storage | null {
  try {
    if (typeof window === "undefined") return null
    return window.sessionStorage
  } catch {
    return null
  }
}

function readStored(): UTMParams {
  const ss = safeSessionStorage()
  if (!ss) return {}
  try {
    const raw = ss.getItem(UTM_STORAGE_KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== "object") return {}
    const out: UTMParams = {}
    for (const k of ALL_KEYS) {
      const v = (parsed as Record<string, unknown>)[k]
      if (typeof v === "string" && v.trim()) out[k] = v.trim()
    }
    return out
  } catch {
    return {}
  }
}

function readFromUrl(): UTMParams {
  if (typeof window === "undefined") return {}
  try {
    const sp = new URLSearchParams(window.location.search)
    const out: UTMParams = {}
    for (const k of ALL_KEYS) {
      const v = sp.get(k)
      if (v && v.trim()) out[k] = v.trim()
    }
    return out
  } catch {
    return {}
  }
}

/**
 * Reads UTM + gclid from the current URL and persists to sessionStorage.
 * First-touch wins: if any value is already stored for this session, the
 * existing record is preserved (we don't overwrite source/medium/campaign).
 *
 * Safe to call on every client mount. No-op on the server.
 */
export function captureUTMs(): void {
  const ss = safeSessionStorage()
  if (!ss) return

  const existing = readStored()
  const hasExisting = Object.keys(existing).length > 0
  if (hasExisting) return

  const incoming = readFromUrl()
  if (Object.keys(incoming).length === 0) return

  try {
    ss.setItem(UTM_STORAGE_KEY, JSON.stringify(incoming))
  } catch {
    // Quota or private-mode failure: ignore — attribution is best-effort.
  }
}

/** Returns the stored UTM + click params for form payloads / analytics events. */
export function getUTMParams(): UTMParams {
  return readStored()
}

/**
 * Coarse device classification for the `leads.device` column.
 * Mirrors the visitor-tracker logic in app/layout.tsx so reporting is consistent.
 */
export function getDeviceTag(): "Mobile" | "Tablet" | "Desktop" {
  if (typeof navigator === "undefined") return "Desktop"
  const ua = navigator.userAgent || ""
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) return "Tablet"
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return "Mobile"
  return "Desktop"
}
