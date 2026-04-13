import { createClient } from "@supabase/supabase-js"

/**
 * Server-only client with elevated privileges. Never import from client components.
 * When set, lead inserts use this and bypass RLS (still validate all fields in API routes).
 */
export function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!url || !key) return null
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
