import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { getSupabasePublishableKey, getSupabaseUrl } from "@/utils/supabase/env"

export const createClient = async () => {
  const supabaseUrl = getSupabaseUrl()
  const supabasePublishableKey = getSupabasePublishableKey()
  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      "Missing Supabase URL or publishable key."
    )
  }

  const cookieStore = await cookies()

  return createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // setAll can be called from a Server Component.
          // This is safe when middleware refreshes sessions.
        }
      },
    },
  })
}
