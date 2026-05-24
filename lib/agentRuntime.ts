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

function toEventArray(raw: unknown): AgentEvent[] {
  if (Array.isArray(raw)) return raw as AgentEvent[]
  if (raw && typeof raw === "object") {
    const obj = raw as Record<string, unknown>
    if (Array.isArray(obj.output)) return obj.output as AgentEvent[]
    if (obj.output && typeof obj.output === "object") return [obj.output as AgentEvent]
  }
  return []
}

export async function runAgent(params: {
  message: string
  userId: string
  sessionId: string
}) {
  const projectId = requiredEnv("GOOGLE_CLOUD_PROJECT")
  const location = requiredEnv("GOOGLE_CLOUD_LOCATION")
  const resourceId = requiredEnv("GOOGLE_AGENT_RESOURCE_ID")

  const token = await getGoogleAccessToken([
    "https://www.googleapis.com/auth/cloud-platform",
  ])

  // Vertex AI Reasoning Engine :query endpoint (v1beta1)
  const endpoint = `https://${location}-aiplatform.googleapis.com/v1beta1/projects/${projectId}/locations/${location}/reasoningEngines/${resourceId}:query`
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: {
        user_id: params.userId,
        session_id: params.sessionId,
        new_message: {
          role: "user",
          parts: [{ text: params.message }],
        },
      },
      class_method: "query",
    }),
    cache: "no-store",
  })

  if (!response.ok) {
    const errText = await response.text().catch(() => "")
    throw new Error(`Agent runtime error ${response.status}: ${errText}`)
  }

  const raw = await response.json()
  const events = toEventArray(raw)
  const reply = extractAssistantText(events)
  if (!reply) {
    console.error("[agentRuntime] unexpected response shape:", JSON.stringify(raw).slice(0, 500))
    throw new Error("Agent returned no assistant text.")
  }

  return { reply }
}
