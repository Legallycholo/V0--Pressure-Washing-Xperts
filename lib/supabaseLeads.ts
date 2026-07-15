import { createServiceRoleClient } from "@/utils/supabase/admin"
import type { LeadInsertRow } from "@/lib/submitLead"

export type SupabaseLeadRow = LeadInsertRow & {
  submission_source: "website-form" | "ai-agent-chat"
  desired_timeline?: string | null
}

export async function insertLeadToSupabase(row: SupabaseLeadRow) {
  const client = createServiceRoleClient()
  if (!client) throw new Error("Supabase service role client is not configured")
  const { error } = await client.from("leads").insert(row)
  if (error) throw error
}
