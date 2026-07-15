import { createClient } from "@supabase/supabase-js"
import { createServiceRoleClient } from "@/utils/supabase/admin"
import { getSupabasePublishableKey, getSupabaseUrl } from "@/utils/supabase/env"
import type { LeadInsertRow } from "@/lib/submitLead"

export type SupabaseLeadRow = LeadInsertRow & {
  submission_source: "website-form" | "ai-agent-chat"
  desired_timeline?: string | null
}

/** Prefers the service role; falls back to the anon key (RLS allows anon inserts on leads). */
function createLeadsClient() {
  const serviceClient = createServiceRoleClient()
  if (serviceClient) return serviceClient
  const url = getSupabaseUrl()
  const key = getSupabasePublishableKey()
  if (!url || !key) return null
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

export async function insertLeadToSupabase(row: SupabaseLeadRow) {
  const client = createLeadsClient()
  if (!client) throw new Error("Supabase client is not configured")
  const { error } = await client.from("leads").insert(row)
  if (error) throw error
}
