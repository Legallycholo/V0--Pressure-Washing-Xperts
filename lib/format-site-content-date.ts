/** Human-readable label for `SITE_CONTENT_LAST_UPDATED_ISO` (YYYY-MM-DD). */
export function formatSiteContentLastUpdatedLabel(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number)
  if (!y || !m || !d) return isoDate
  const date = new Date(Date.UTC(y, m - 1, d))
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
}
