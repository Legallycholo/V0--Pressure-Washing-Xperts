export type VonageConfig = {
  apiKey: string
  apiSecret: string
  from: string
  to: string
}

/** Returns null when Vonage SMS isn't configured, so callers can no-op instead of failing. */
export function getVonageConfig(): VonageConfig | null {
  const apiKey = process.env.VONAGE_API_KEY
  const apiSecret = process.env.VONAGE_API_SECRET
  const from = process.env.VONAGE_FROM_NUMBER
  const to = process.env.VONAGE_TO_NUMBER

  if (!apiKey || !apiSecret || !from || !to) return null
  return { apiKey, apiSecret, from, to }
}
