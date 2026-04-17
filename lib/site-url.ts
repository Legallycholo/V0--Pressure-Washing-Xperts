/**
 * Canonical site origin for metadata, sitemap, and JSON-LD.
 * Set `NEXT_PUBLIC_SITE_URL` in production (no trailing slash).
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "")
  if (fromEnv) return fromEnv
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL.replace(/\/+$/, "")}`
  return "http://localhost:3000"
}

export function absoluteUrl(pathname: string): string {
  const base = getSiteUrl()
  if (!pathname || pathname === "/") return base
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`
  return `${base}${path}`
}
