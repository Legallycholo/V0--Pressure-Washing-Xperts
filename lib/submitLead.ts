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

export async function submitLeadRequest(payload: LeadPayload): Promise<SubmitLeadResult> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null
      return {
        ok: false,
        error: data?.error ?? "Something went wrong. Please call us or try again.",
        status: res.status,
      }
    }

    return { ok: true }
  } catch {
    return { ok: false, error: "Network error. Check your connection and try again." }
  }
}
