import { createClient } from "@/utils/supabase/client"

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

export type SubmitLeadResult =
  | { ok: true }
  | { ok: false; error: string; status?: number }

function validate(payload: LeadPayload): string | null {
  const required = [payload.full_name, payload.email, payload.phone]
  if (required.some((v) => typeof v !== "string" || !v.trim())) {
    return "Missing required fields."
  }
  if (!payload.email?.includes("@")) {
    return "Invalid email."
  }
  return null
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

  const validationError = validate(payload)
  if (validationError) {
    return { ok: false, error: validationError }
  }

  const row = {
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
  }

  try {
    const supabase = createClient()
    const { error } = await supabase.from("leads").insert(row)
    if (error) {
      console.error("[submitLead] Supabase insert failed", error)
      return {
        ok: false,
        error: "We couldn't save your request. Please try again in a moment.",
      }
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
