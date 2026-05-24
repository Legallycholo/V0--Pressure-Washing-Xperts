import { getGoogleAccessToken } from "@/lib/googleAuth"

type AgentMessagePart = { text?: string }
type AgentEvent = {
  content?: { parts?: AgentMessagePart[]; role?: string }
}

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

  if (!response.ok) {
    const errText = await response.text().catch(() => "")
    throw new Error(`Agent runtime error ${response.status}: ${errText}`)
  }

  const body = await response.text()
  const events = parseStreamEvents(body)
  const reply = extractAssistantText(events)
  if (!reply) {
    console.error("[agentRuntime] unexpected response body:", body.slice(0, 800))
    throw new Error("Agent returned no assistant text.")
  }

  return { reply, sessionId }
}
