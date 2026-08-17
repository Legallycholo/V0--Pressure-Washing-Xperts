import { createClient } from "@supabase/supabase-js"
import { createServiceRoleClient } from "@/utils/supabase/admin"
import { getSupabasePublishableKey, getSupabaseUrl } from "@/utils/supabase/env"

export type SupabaseContactRow = {
  name: string
  email: string
  phone: string
  city: string | null
  zip: string | null
  services: string | null
  best_time: string | null
  how_heard: string | null
  message: string | null
  approx_sqft: string | null
}

/** Prefers the service role; falls back to the anon key. */
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

export async function insertLeadToSupabase(row: SupabaseContactRow) {
  const client = createLeadsClient()
  if (!client) throw new Error("Supabase client is not configured")
  const { error } = await client.from("pressure contacts").insert(row)
  if (error) throw error
}
