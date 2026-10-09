export type ChrisChatStep =
  | "service"
  | "name"
  | "phone"
  | "email"
  | "city"
  | "zip"
  | "sqft"
  | "complete"

export type ChatLeadPayload = {
  name: string
  phone: string
  email: string
  city: string
  zip: string
  services: string
  approx_sqft: string
  best_time: string
  how_heard: string
  message: string
}

type ChrisLeadDraft = Partial<
  Pick<
    ChatLeadPayload,
    "name" | "phone" | "email" | "city" | "zip" | "services" | "approx_sqft"
  >
>

export type LocalChrisState = {
  step: ChrisChatStep
  lead: ChrisLeadDraft
  submitted?: boolean
}

export type LocalChrisResult = {
  reply: string
  state: LocalChrisState
  lead?: ChatLeadPayload
}

const MAX_FIELD_LENGTH = 500
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const SERVICE_WORDS =
  /\b(pressure|power|soft\s*wash|driveway|sidewalk|house|home|siding|roof|gutter|patio|deck|fence|window|storefront|building|parking|garage|fleet|apartment|commercial|residential|concrete|brick|stone|masonry|curb|upholstery|rv)\b/i

function clean(value: unknown, max = MAX_FIELD_LENGTH): string {
  return typeof value === "string" ? value.trim().slice(0, max) : ""
}

function initialState(): LocalChrisState {
  return { step: "service", lead: {} }
}

function sanitizeState(value: unknown): LocalChrisState {
  if (!value || typeof value !== "object") return initialState()

  const raw = value as Record<string, unknown>
  const allowedSteps: ChrisChatStep[] = [
    "service",
    "name",
    "phone",
    "email",
    "city",
    "zip",
    "sqft",
    "complete",
  ]
  const step = allowedSteps.includes(raw.step as ChrisChatStep)
    ? (raw.step as ChrisChatStep)
    : "service"
  const rawLead =
    raw.lead && typeof raw.lead === "object"
      ? (raw.lead as Record<string, unknown>)
      : {}

  const lead: ChrisLeadDraft = {}
  const fields: (keyof ChrisLeadDraft)[] = [
    "name",
    "phone",
    "email",
    "city",
    "zip",
    "services",
    "approx_sqft",
  ]
  for (const field of fields) {
    const value = clean(rawLead[field])
    if (value) lead[field] = value
  }

  return { step, lead, submitted: raw.submitted === true }
}

function withUpdate(
  state: LocalChrisState,
  step: ChrisChatStep,
  update: ChrisLeadDraft,
): LocalChrisState {
  return { step, lead: { ...state.lead, ...update } }
}

function serviceAnswer(message: string): string | null {
  const normalized = message.toLowerCase()

  if (/\b(price|pricing|cost|how much|estimate)\b/.test(normalized)) {
    return "We provide a free in-person quote so the price matches the size and condition. Driveways often start around $150–$250, but the team will confirm the exact price."
  }
  if (/\b(service|what do you (do|clean)|offer)\b/.test(normalized)) {
    return "We clean houses and siding, driveways, sidewalks, roofs, gutters, patios, decks, fences, windows, and commercial properties."
  }
  if (/\b(area|where|location|serve|coverage)\b/.test(normalized)) {
    return "We’re based in Metro Atlanta and quote jobs throughout Georgia."
  }
  if (/\b(insured|licensed|insurance)\b/.test(normalized)) {
    return "Yes—we’re licensed and insured."
  }
  if (/\b(hour|open|available|schedule)\b/.test(normalized)) {
    return "We’re available Monday through Saturday, 7 AM–7 PM ET."
  }
  if (/\b(discount|special|deal|coupon|promo|offer)\b/.test(normalized)) {
    return "We offer 15% off for first-time customers and 20% off when you book 2 or more services in the same visit."
  }
  if (/\b(ai|bot|robot|human|real person)\b/.test(normalized)) {
    return "I’m Chris, the website assistant. I can answer the basics and send your quote request directly to the Pressure Washing Xperts team."
  }
  return null
}

function normalizeName(message: string): string {
  return clean(
    message
      .replace(/^(my name is|i am|i'm|this is)\s+/i, "")
      .replace(/[^a-zÀ-ž' .-]/gi, ""),
    100,
  )
}

function normalizePhone(message: string): string | null {
  const candidate = message.match(/(?:\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/)?.[0]
  if (!candidate) return null
  const digits = candidate.replace(/\D/g, "")
  return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"))
    ? candidate.trim()
    : null
}

function normalizeEmail(message: string): string | null {
  const candidate = message.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)?.[0]
  if (!candidate) return null
  const email = candidate.replace(/[),.;]+$/, "").toLowerCase()
  return EMAIL_PATTERN.test(email) ? email.slice(0, 254) : null
}

function normalizeCity(message: string): string {
  return clean(
    message
      .replace(/^(i live in|i'm in|i am in|the city is|city is)\s+/i, "")
      .replace(/,?\s*(ga|georgia)\s*$/i, "")
      .replace(/[^a-zÀ-ž' .-]/gi, ""),
    100,
  )
}

function normalizeSqft(message: string): string | null | "unknown" {
  const normalized = message.toLowerCase().replace(/,/g, "")
  if (/\b(not sure|unsure|don't know|do not know|unknown|no idea)\b/.test(normalized)) {
    return "unknown"
  }
  if (/\b(over|more than|above)\s*4500\b|\b5000\b|\b6000\b/.test(normalized)) {
    return "over_4500"
  }
  if (/\b(3501|3500).*(4500)\b|\b(4[0-4]\d{2})\b/.test(normalized)) {
    return "3501_4500"
  }
  if (/\b2501.*3500\b|\b(2[6-9]\d{2}|3[0-4]\d{2})\b/.test(normalized)) {
    return "2501_3500"
  }
  if (/\b1500.*2500\b|\b(1[5-9]\d{2}|2[0-5]\d{2})\b/.test(normalized)) {
    return "1500_2500"
  }
  if (/\b(under|less than|below)\s*1500\b|\b([1-9]\d{2}|1[0-4]\d{2})\b/.test(normalized)) {
    return "under_1500"
  }
  return null
}

function sqftLabel(value: string): string {
  const labels: Record<string, string> = {
    under_1500: "Under 1,500 sq ft",
    "1500_2500": "1,500–2,500 sq ft",
    "2501_3500": "2,501–3,500 sq ft",
    "3501_4500": "3,501–4,500 sq ft",
    over_4500: "Over 4,500 sq ft",
  }
  return labels[value] ?? value
}

function completedLead(state: LocalChrisState): ChatLeadPayload | null {
  const { lead } = state
  if (
    !lead.name ||
    !lead.phone ||
    !lead.email ||
    !lead.city ||
    !lead.zip ||
    !lead.services ||
    !lead.approx_sqft
  ) {
    return null
  }
  return {
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    city: lead.city,
    zip: lead.zip,
    services: lead.services,
    approx_sqft: lead.approx_sqft,
    best_time: "Any time",
    how_heard: "Chris website chat",
    message: `Quote request submitted through Chris chat: ${lead.services}`,
  }
}

export function runLocalChris(messageValue: unknown, stateValue: unknown): LocalChrisResult {
  const message = clean(messageValue)
  const state = sanitizeState(stateValue)

  if (!message) {
    return { reply: "What can I help you with today?", state }
  }

  if (state.submitted) {
    return {
      reply:
        "Your quote request is already with the team. Someone will reach out within 24 hours. You can also call (800) 451-7213 anytime.",
      state,
    }
  }

  switch (state.step) {
    case "service": {
      const answer = serviceAnswer(message)
      if (!SERVICE_WORDS.test(message)) {
        return {
          reply: `${answer ? `${answer} ` : ""}What would you like us to clean?`,
          state,
        }
      }
      const next = withUpdate(state, "name", { services: message })
      return {
        reply: `${answer ? `${answer} ` : "Happy to help with that. "}We also offer 15% off for first-time customers. What's your full name?`,
        state: next,
      }
    }
    case "name": {
      const fullName = normalizeName(message)
      if (fullName.length < 2) {
        return { reply: "What full name should I put on the quote request?", state }
      }
      return {
        reply: `Thanks, ${fullName.split(/\s+/)[0]}. What's the best phone number to reach you?`,
        state: withUpdate(state, "phone", { name: fullName }),
      }
    }
    case "phone": {
      const phone = normalizePhone(message)
      if (!phone) {
        return { reply: "Please send a 10-digit phone number so the team can reach you.", state }
      }
      return {
        reply: "Got it. What's the best email for your quote?",
        state: withUpdate(state, "email", { phone }),
      }
    }
    case "email": {
      const email = normalizeEmail(message)
      if (!email) {
        return { reply: "That email looks incomplete. Could you send it again?", state }
      }
      return {
        reply: "What Georgia city is the property in?",
        state: withUpdate(state, "city", { email }),
      }
    }
    case "city": {
      const city = normalizeCity(message)
      if (city.length < 2) {
        return { reply: "Which city in Georgia is the property in?", state }
      }
      return {
        reply: "And what's the 5-digit ZIP code?",
        state: withUpdate(state, "zip", { city }),
      }
    }
    case "zip": {
      const zip = message.match(/\b\d{5}(?:-\d{4})?\b/)?.[0]
      if (!zip) {
        return { reply: "Please send the property's 5-digit ZIP code.", state }
      }
      return {
        reply:
          "About how large is the home or area: under 1,500; 1,500–2,500; 2,501–3,500; 3,501–4,500; or over 4,500 sq ft? You can also say “not sure.”",
        state: withUpdate(state, "sqft", { zip }),
      }
    }
    case "sqft": {
      const sqft = normalizeSqft(message)
      if (!sqft) {
        return {
          reply:
            "Which range is closest: under 1,500; 1,500–2,500; 2,501–3,500; 3,501–4,500; or over 4,500 sq ft? “Not sure” is okay too.",
          state,
        }
      }
      const next = withUpdate(
        state,
        "complete",
        { approx_sqft: sqft === "unknown" ? "Not sure" : sqftLabel(sqft) },
      )
      const lead = completedLead(next)
      if (!lead) {
        return { reply: "What would you like us to clean?", state: initialState() }
      }
      return { reply: "Thanks—I'm sending that to the team now.", state: next, lead }
    }
    case "complete": {
      const lead = completedLead(state)
      if (!lead) return { reply: "What would you like us to clean?", state: initialState() }
      return { reply: "I'll try sending your quote request again now.", state, lead }
    }
  }
}
