import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { getSupabasePublishableKey, getSupabaseUrl } from "@/utils/supabase/env"

const supabaseUrl = getSupabaseUrl()
const supabasePublishableKey = getSupabasePublishableKey()

export const updateSession = async (request: NextRequest) => {
  // Fail open so a missing env var does not take down the whole site.
  if (!supabaseUrl || !supabasePublishableKey) {
    return NextResponse.next({
      request,
    })
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  try {
    const supabase = createServerClient(supabaseUrl, supabasePublishableKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    })

    // Refreshes session cookie if needed.
    await supabase.auth.getUser()
  } catch (error) {
    console.error("[middleware] Supabase session refresh failed", error)
    return NextResponse.next({
      request,
    })
  }

  return supabaseResponse
}
