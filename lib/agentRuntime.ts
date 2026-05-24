import { getGoogleAccessToken } from "@/lib/googleAuth"

type AgentMessagePart = { text?: string }
type AgentEvent = {
  content?: { parts?: AgentMessagePart[]; role?: string }
}

const RETRY_DELAYS_MS = [1200, 2500]

function requiredEnv(name: string) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required env var: ${name}`)
  return value
}

function extractAssistantText(events: AgentEvent[]): string | null {
  for (let i = events.length - 1; i >= 0; i -= 1) {
    const event = events[i]
    const parts = event.content?.parts ?? []
    for (const part of parts) {
      if (typeof part.text === "string" && part.text.trim()) {
        return part.text.trim()
      }
    }
  }
  return null
}

// :streamQuery returns NDJSON; each line is a direct ADK Event dict
function parseStreamEvents(body: string): AgentEvent[] {
  const events: AgentEvent[] = []
  for (const line of body.split("\n")) {
    const trimmed = line.trim()
    if (!trimmed) continue
    try {
      const parsed = JSON.parse(trimmed) as Record<string, unknown>
      // Direct event format: {"content": {...}, "model_version": "...", ...}
      if (parsed.content && typeof parsed.content === "object") {
        events.push(parsed as AgentEvent)
      } else if (parsed.output && typeof parsed.output === "object") {
        // Fallback for wrapped format: {"output": <event>}
        events.push(parsed.output as AgentEvent)
      }
    } catch {
      // skip malformed lines
    }
  }
  return events
}

function isRateLimitError(text: string) {
  const normalized = text.toLowerCase()
  return (
    normalized.includes('"code": 429') ||
    normalized.includes("resource_exhausted") ||
    normalized.includes("rate limit") ||
    normalized.includes("too many requests")
  )
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}

// Creates a session via the native Vertex AI session API (not the ADK REST method).
// Returns the session ID (last path segment of the created session name).
async function createAdkSession(
  base: string,
  resourceId: string,
  userId: string,
  token: string,
): Promise<string> {
  const endpoint = `${base}/reasoningEngines/${resourceId}/sessions`
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
    cache: "no-store",
  })
  if (!res.ok) {
    const err = await res.text().catch(() => "")
    throw new Error(`Failed to create Vertex AI session (${res.status}): ${err}`)
  }
  const data = (await res.json()) as Record<string, unknown>
  // name: "projects/.../sessions/{sessionId}/operations/..."
  // response.name: "projects/.../sessions/{sessionId}"
  const responseName =
    (data.response as Record<string, unknown> | null)?.name ??
    (data.name as string | undefined)
  if (typeof responseName !== "string") {
    throw new Error(`Session creation returned unexpected shape: ${JSON.stringify(data).slice(0, 300)}`)
  }
  const parts = responseName.split("/")
  const sessionsIdx = parts.lastIndexOf("sessions")
  const sessionId = sessionsIdx !== -1 ? parts[sessionsIdx + 1] : null
  if (!sessionId) {
    throw new Error(`Could not parse session ID from: ${responseName}`)
  }
  return sessionId
}

export async function runAgent(params: {
  message: string
  userId: string
  sessionId: string | null
}) {
  const projectId = requiredEnv("GOOGLE_CLOUD_PROJECT")
  const location = requiredEnv("GOOGLE_CLOUD_LOCATION")
  const resourceId = requiredEnv("GOOGLE_AGENT_RESOURCE_ID")

  const token = await getGoogleAccessToken([
    "https://www.googleapis.com/auth/cloud-platform",
  ])

  const base = `https://${location}-aiplatform.googleapis.com/v1beta1/projects/${projectId}/locations/${location}`

  // Create a session if this is the first message
  const sessionId =
    params.sessionId ?? (await createAdkSession(base, resourceId, params.userId, token))

  const streamEndpoint = `${base}/reasoningEngines/${resourceId}:streamQuery`
  let lastBody = ""
  let lastStatus = 0
  let shouldRetry = false

  for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt += 1) {
    shouldRetry = false
    const response = await fetch(streamEndpoint, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        input: {
          message: params.message,
          user_id: params.userId,
          session_id: sessionId,
        },
        class_method: "stream_query",
      }),
      cache: "no-store",
    })

    lastStatus = response.status
    const body = await response.text().catch(() => "")
    lastBody = body

    if (!response.ok) {
      shouldRetry = response.status === 429 && attempt < RETRY_DELAYS_MS.length
      if (!shouldRetry) {
        throw new Error(`Agent runtime error ${response.status}: ${body}`)
      }
    } else {
      const events = parseStreamEvents(body)
      const reply = extractAssistantText(events)
      if (reply) {
        return { reply, sessionId }
      }
      shouldRetry = isRateLimitError(body) && attempt < RETRY_DELAYS_MS.length
      if (!shouldRetry) {
        console.error("[agentRuntime] unexpected response body:", body.slice(0, 800))
        throw new Error("Agent returned no assistant text.")
      }
    }

    if (shouldRetry) {
      const delay = RETRY_DELAYS_MS[attempt]
      console.warn(
        `[agentRuntime] rate-limited by model provider; retrying in ${delay}ms (attempt ${attempt + 1}/${RETRY_DELAYS_MS.length + 1})`,
      )
      await wait(delay)
    }
  }

  throw new Error(
    `Agent runtime exhausted retries${lastStatus ? ` (${lastStatus})` : ""}: ${lastBody.slice(0, 300)}`,
  )
}
