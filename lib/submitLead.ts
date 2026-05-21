import {
  isValidApproxSqftEstimateForStorage,
  SQFT_RANGE_OPTIONS,
} from "@/data/sqftEstimateOptions"

const PRICE_FLOOR = 250
const ROUGH_PRICE_VERSION = "v1_2026_04_floor250"
const SQFT_ADDERS: Record<string, number> = {
  under_1500: 0,
  "1500_2500": 75,
  "2501_3500": 150,
  "3501_4500": 250,
  over_4500: 400,
}

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
  approx_sqft_estimate?: string
  submission_type?: string
  page_path?: string
}

/** Row shape for `public.leads` (matches `supabase/migrations/*_create_leads.sql` and later migrations). */
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
  approx_sqft_estimate: string | null
  rough_price_estimate: number | null
  rough_price_version: string | null
  /** Same choice as `approx_sqft_estimate`, human-readable for Supabase / exports. */
  approx_sq_footage: string | null
  submission_type: string | null
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

function normalizeApproxSqftEstimate(
  raw: unknown
): { value: string } | { error: string } {
  if (raw === undefined || raw === null) {
    return { error: "Please select approximate square footage." }
  }
  if (typeof raw !== "string") {
    return { error: "Please select approximate square footage." }
  }
  const t = raw.trim()
  if (!t || !isValidApproxSqftEstimateForStorage(t)) {
    return { error: "Please select approximate square footage." }
  }
  return { value: t }
}

function approxSqFootageLabel(slug: string): string {
  const match = SQFT_RANGE_OPTIONS.find((o) => o.value === slug)
  return match?.label ?? slug
}

function normalizeSelectedOffer(raw: unknown): string | null {
  if (typeof raw !== "string") return null
  const t = raw.trim()
  if (!t || t === "none") return null
  return t
}

function computeRoughPriceEstimate(input: {
  approxSqftEstimate: string
  selectedOffer: string | null
}): { roughPriceEstimate: number; roughPriceVersion: string } {
  const sqftAdder = SQFT_ADDERS[input.approxSqftEstimate] ?? 0
  const preOffer = Math.max(PRICE_FLOOR, PRICE_FLOOR + sqftAdder)

  let offerDiscount = 0
  switch (input.selectedOffer) {
    case "first-time":
      offerDiscount = preOffer * 0.15
      break
    case "bundle":
      offerDiscount = preOffer * 0.2
      break
    case "seasonal":
      offerDiscount = preOffer * 0.1
      break
    case "referral":
      offerDiscount = 50
      break
    default:
      offerDiscount = 0
  }

  const postOffer = preOffer - offerDiscount
  const roughPriceEstimate = Math.max(
    PRICE_FLOOR,
    Math.round(postOffer * 100) / 100
  )

  return {
    roughPriceEstimate,
    roughPriceVersion: ROUGH_PRICE_VERSION,
  }
}

export function buildLeadInsertRow(
  payload: LeadPayload
): { row: LeadInsertRow } | { error: string } {
  const validationError = validate(payload)
  if (validationError) {
    return { error: validationError }
  }

  const sqft = normalizeApproxSqftEstimate(payload.approx_sqft_estimate)
  if ("error" in sqft) {
    return { error: sqft.error }
  }
  const selectedOffer = normalizeSelectedOffer(payload.selected_offer)
  const pricing = computeRoughPriceEstimate({
    approxSqftEstimate: sqft.value,
    selectedOffer,
  })

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
      selected_offer: selectedOffer,
      approx_sqft_estimate: sqft.value,
      approx_sq_footage: approxSqFootageLabel(sqft.value),
      rough_price_estimate: pricing.roughPriceEstimate,
      rough_price_version: pricing.roughPriceVersion,
      submission_type: payload.submission_type?.trim() || null,
      page_path: payload.page_path?.trim() || null,
    },
  }
}

export async function submitLeadRequest(
  payload: LeadPayload
): Promise<SubmitLeadResult> {
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
