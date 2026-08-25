export type VonageConfig = {
  apiKey: string
  apiSecret: string
  from: string
  to: string[] // supports multiple recipients
}

/** Returns null when Vonage SMS isn't configured, so callers can no-op instead of failing. */
export function getVonageConfig(): VonageConfig | null {
  const apiKey = process.env.VONAGE_API_KEY
  const apiSecret = process.env.VONAGE_API_SECRET
  const from = process.env.VONAGE_FROM_NUMBER

  // Support both VONAGE_TO_NUMBERS (comma-separated) and legacy VONAGE_TO_NUMBER
  const toRaw = process.env.VONAGE_TO_NUMBERS ?? process.env.VONAGE_TO_NUMBER
  const to = toRaw
    ? toRaw.split(",").map((n) => {
        let clean = n.replace(/\D/g, "")
        if (clean.length === 10) clean = "1" + clean
        return clean
      }).filter(Boolean)
    : []

  if (!apiKey || !apiSecret || !from || to.length === 0) return null
  return { apiKey, apiSecret, from, to }
}
