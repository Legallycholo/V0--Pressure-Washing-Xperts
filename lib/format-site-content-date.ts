/** Human-readable label for `SITE_CONTENT_LAST_UPDATED_ISO` (YYYY-MM-DD). */
export function formatSiteContentLastUpdatedLabel(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number)
  if (!y || !m || !d) return isoDate
  const date = new Date(Date.UTC(y, m - 1, d))
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getUTCDay()]
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getUTCMonth()]
  return `${weekday} ${month} ${date.getUTCDate()} ${date.getUTCFullYear()}`
}
