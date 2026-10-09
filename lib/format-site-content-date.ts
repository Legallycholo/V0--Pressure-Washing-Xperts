/** Human-readable label for `SITE_CONTENT_LAST_UPDATED_ISO` (YYYY-MM-DD). */
export function formatSiteContentLastUpdatedLabel(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number)
  if (!y || !m || !d) return isoDate
  const date = new Date(Date.UTC(y, m - 1, d))
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getUTCMonth()]
  return `${month} ${date.getUTCDate()}, ${date.getUTCFullYear()}`
}
