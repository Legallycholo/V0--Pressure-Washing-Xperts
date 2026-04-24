import { createClient } from "@supabase/supabase-js"
import { getSupabaseServiceRoleKey, getSupabaseUrl } from "@/utils/supabase/env"

/**
 * Server-only client with elevated privileges. Never import from client components.
 * When set, lead inserts use this and bypass RLS (still validate all fields in API routes).
 */
export function createServiceRoleClient() {
  const url = getSupabaseUrl()
  const key = getSupabaseServiceRoleKey()
  if (!url || !key) return null
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
