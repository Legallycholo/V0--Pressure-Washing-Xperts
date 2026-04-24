function nonEmpty(value: string | undefined): string | null {
  const trimmed = value?.trim()
  return trimmed ? trimmed : null
}

export function getSupabaseUrl(): string | null {
  return nonEmpty(process.env.NEXT_PUBLIC_SUPABASE_URL) ?? nonEmpty(process.env.SUPABASE_URL)
}

/**
 * Supports both modern publishable keys and legacy anon keys.
 * NEXT_PUBLIC_* names are available to browser bundles.
 */
export function getSupabasePublishableKey(): string | null {
  return (
    nonEmpty(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) ??
    nonEmpty(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) ??
    nonEmpty(process.env.SUPABASE_ANON_KEY)
  )
}

export function getSupabaseServiceRoleKey(): string | null {
  return nonEmpty(process.env.SUPABASE_SERVICE_ROLE_KEY)
}
