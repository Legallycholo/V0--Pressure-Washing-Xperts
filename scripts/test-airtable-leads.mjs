/**
 * Read-only check: Airtable base/table from .env.local respond.
 * Run: node --env-file=.env.local scripts/test-airtable-leads.mjs
 */

const key = process.env.AIRTABLE_API_KEY?.trim()
const base = process.env.AIRTABLE_BASE_ID?.trim()
const table = process.env.AIRTABLE_TABLE_NAME?.trim()

if (!key || !base || !table) {
  console.error(
    "Missing AIRTABLE_API_KEY, AIRTABLE_BASE_ID, or AIRTABLE_TABLE_NAME (use --env-file=.env.local)"
  )
  process.exit(1)
}

const url = `https://api.airtable.com/v0/${base}/${encodeURIComponent(table)}?maxRecords=5`

const res = await fetch(url, { headers: { Authorization: `Bearer ${key}` } })
const body = await res.text()

if (!res.ok) {
  console.error("Airtable API error", res.status, body.slice(0, 400))
  process.exit(1)
}

let data
try {
  data = JSON.parse(body)
} catch {
  console.error("Invalid JSON from Airtable")
  process.exit(1)
}

const n = data.records?.length ?? 0
console.log("Airtable connection OK.")
console.log("  Base:", base)
console.log("  Table:", table)
console.log("  Records returned (max 5):", n)
if (n > 0 && data.records[0].fields) {
  console.log("  Field names on first row:", Object.keys(data.records[0].fields).join(", "))
}
