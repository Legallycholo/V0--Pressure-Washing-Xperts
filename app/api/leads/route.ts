import { NextResponse } from "next/server"
import {
  buildLeadInsertRow,
  type LeadInsertRow,
  type LeadPayload,
} from "@/lib/submitLead"
import { createServiceRoleClient } from "@/utils/supabase/admin"
import { createClient } from "@/utils/supabase/server"
import { getSupabasePublishableKey, getSupabaseUrl } from "@/utils/supabase/env"

function isMissingLeadColumnError(error: {
  code?: string | null
  message?: string | null
} | null): boolean {
  if (!error) return false
  if (error.code !== "PGRST204") return false
  const message = error.message ?? ""
  return (
    message.includes("approx_sqft_estimate") ||
    message.includes("rough_price_estimate") ||
    message.includes("rough_price_version")
  )
}

function legacyLeadRow(row: LeadInsertRow) {
  const {
    approx_sqft_estimate: _approxSqftEstimate,
    rough_price_estimate: _roughPriceEstimate,
    rough_price_version: _roughPriceVersion,
    ...legacy
  } = row
  return legacy
}

function isLeadPayload(body: unknown): body is LeadPayload {
  if (!body || typeof body !== "object") return false
  const o = body as Record<string, unknown>
  return (
    typeof o.full_name === "string" &&
    typeof o.email === "string" &&
    typeof o.phone === "string"
  )
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  if (!isLeadPayload(body)) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
  }

  const built = buildLeadInsertRow(body)
  if ("error" in built) {
    return NextResponse.json({ error: built.error }, { status: 400 })
  }

  const { row } = built

  const url = getSupabaseUrl()
  if (!url) {
    console.error("[api/leads] Missing Supabase URL")
    return NextResponse.json(
      { error: "Submission is temporarily unavailable. Please try again later." },
      { status: 503 }
    )
  }

  const service = createServiceRoleClient()
  if (service) {
    const { error } = await service.from("leads").insert(row)
    if (error) {
      if (isMissingLeadColumnError(error)) {
        const retry = await service.from("leads").insert(legacyLeadRow(row))
        if (!retry.error) {
          return NextResponse.json({ ok: true })
        }
      }
      console.error("[api/leads] Supabase insert failed (service role)", error)
      return NextResponse.json(
        { error: "We couldn't save your request. Please try again in a moment." },
        { status: 500 }
      )
    }
    return NextResponse.json({ ok: true })
  }

  const publishable = getSupabasePublishableKey()
  if (!publishable) {
    console.error("[api/leads] Missing Supabase publishable key")
    return NextResponse.json(
      { error: "Submission is temporarily unavailable. Please try again later." },
      { status: 503 }
    )
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.from("leads").insert(row)
    if (error) {
      if (isMissingLeadColumnError(error)) {
        const retry = await supabase.from("leads").insert(legacyLeadRow(row))
        if (!retry.error) {
          return NextResponse.json({ ok: true })
        }
      }
      console.error("[api/leads] Supabase insert failed (anon)", error)
      return NextResponse.json(
        { error: "We couldn't save your request. Please try again in a moment." },
        { status: 500 }
      )
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("[api/leads] unexpected error", e)
    return NextResponse.json(
      { error: "We couldn't save your request. Please try again in a moment." },
      { status: 500 }
    )
  }
}
