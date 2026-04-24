import { createBrowserClient } from "@supabase/ssr"
import { getSupabasePublishableKey, getSupabaseUrl } from "@/utils/supabase/env"

export const createClient = () => {
  const supabaseUrl = getSupabaseUrl()
  const supabasePublishableKey = getSupabasePublishableKey()
  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      "Missing Supabase URL or publishable key."
    )
  }
  return createBrowserClient(supabaseUrl, supabasePublishableKey)
}
