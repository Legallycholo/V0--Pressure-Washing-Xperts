import { BigQuery } from "@google-cloud/bigquery"

let cachedClient: BigQuery | null = null

export type InboundLeadRow = {
  lead_id: string
  created_at: string
  submission_source: "website-form" | "ai-agent-chat"
  submission_type?: string | null
  full_name?: string | null
  phone?: string | null
  email?: string | null
  city?: string | null
  state?: string | null
  zip?: string | null
  approx_sqft_estimate?: string | null
  how_heard?: string | null
  desired_timeline?: string | null
  service_request?: string | null
  page_path?: string | null
  conversation_id?: string | null
}

function getCredentials() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!raw) return undefined
  try {
    return JSON.parse(raw) as Record<string, unknown>
  } catch (error) {
    console.error("[bigqueryLeads] Invalid GOOGLE_SERVICE_ACCOUNT_JSON", error)
    return undefined
  }
}

function getBigQueryClient() {
  if (cachedClient) return cachedClient
  cachedClient = new BigQuery({
    projectId: process.env.GOOGLE_CLOUD_PROJECT,
    credentials: getCredentials(),
  })
  return cachedClient
}

function requiredEnv(name: string) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required env var: ${name}`)
  return value
}

export async function insertInboundLead(row: InboundLeadRow) {
  const dataset = requiredEnv("GOOGLE_LEADS_DATASET")
  const table = requiredEnv("GOOGLE_LEADS_TABLE")
  const client = getBigQueryClient()
  await client.dataset(dataset).table(table).insert([row])
}
