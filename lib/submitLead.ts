export type LeadPayload = {
  full_name: string
  email: string
  phone: string
  city?: string
  state?: string
  zip?: string
  message?: string
  how_heard?: string
  selected_offer?: string
  submission_type?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  page_path?: string
}

/** Row shape for `public.leads` (matches `supabase/migrations/*_create_leads.sql`). */
export type LeadInsertRow = {
  full_name: string
  email: string
  phone: string
  city: string | null
  state: string | null
  zip: string | null
  message: string | null
  how_heard: string | null
  selected_offer: string | null
  submission_type: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  page_path: string | null
}

export type SubmitLeadResult =
  | { ok: true }
  | { ok: false; error: string; status?: number }

function validate(payload: LeadPayload): string | null {
  const required = [payload.full_name, payload.email, payload.phone]
  if (required.some((v) => typeof v !== "string" || !v.trim())) {
    return "Missing required fields."
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email ?? "")) {
    return "Invalid email."
  }
  return null
}

export function buildLeadInsertRow(
  payload: LeadPayload
): { row: LeadInsertRow } | { error: string } {
  const validationError = validate(payload)
  if (validationError) {
    return { error: validationError }
  }
  return {
    row: {
      full_name: payload.full_name.trim(),
      email: payload.email.trim(),
      phone: payload.phone.trim(),
      city: payload.city?.trim() || null,
      state: payload.state?.trim() || null,
      zip: payload.zip?.trim() || null,
      message: payload.message?.trim() || null,
      how_heard: payload.how_heard?.trim() || null,
      selected_offer: payload.selected_offer?.trim() || null,
      submission_type: payload.submission_type?.trim() || null,
      utm_source: payload.utm_source?.trim() || null,
      utm_medium: payload.utm_medium?.trim() || null,
      utm_campaign: payload.utm_campaign?.trim() || null,
      page_path: payload.page_path?.trim() || null,
    },
  }
}

export async function submitLeadRequest(
  payload: LeadPayload
): Promise<SubmitLeadResult> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  if (!url || !key) {
    return {
      ok: false,
      error: "Submission is temporarily unavailable. Please try again later.",
    }
  }

  const built = buildLeadInsertRow(payload)
  if ("error" in built) {
    return { ok: false, error: built.error }
  }

  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const data: unknown = await res.json().catch(() => ({}))
    const message =
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      typeof (data as { error: unknown }).error === "string"
        ? (data as { error: string }).error
        : "We couldn't save your request. Please try again in a moment."

    if (!res.ok) {
      console.error("[submitLead] API error", res.status, data)
      return { ok: false, error: message, status: res.status }
    }

    return { ok: true }
  } catch (e) {
    console.error("[submitLead] unexpected error", e)
    return {
      ok: false,
      error: "We couldn't save your request. Please try again in a moment.",
    }
  }
}
