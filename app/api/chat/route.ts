import { randomUUID } from "crypto"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { runAgent } from "@/lib/agentRuntime"
import { runLocalChris, type LocalChrisState } from "@/lib/localChris"

type ChatRequestBody = {
  message?: unknown
  sessionId?: unknown
  state?: unknown
}

function asTrimmedString(value: unknown): string | null {
  if (typeof value !== "string") return null
  const t = value.trim()
  return t ? t : null
}

export async function POST(request: Request) {
  let body: ChatRequestBody
  try {
    body = (await request.json()) as ChatRequestBody
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const message = asTrimmedString(body.message)
  if (!message) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 })
  }

  const cookieStore = await cookies()
  let userId = cookieStore.get("chat_user_id")?.value
  if (!userId) {
    userId = randomUUID()
    cookieStore.set("chat_user_id", userId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    })
  }

  // The local assistant is the no-credit default. Set CHRIS_CHAT_PROVIDER=google
  // to use the existing Vertex agent; any provider failure falls back locally.
  const sessionId = asTrimmedString(body.sessionId)
  const provider = process.env.CHRIS_CHAT_PROVIDER?.trim().toLowerCase()
  const hasLocalState = Boolean(body.state && typeof body.state === "object")

  if (provider === "google" && !hasLocalState) {
    try {
      const { reply, sessionId: activeSessionId } = await runAgent({ message, userId, sessionId })
      return NextResponse.json({ reply, sessionId: activeSessionId })
    } catch (error) {
      console.error("[api/chat] Google agent unavailable; using local Chris", error)
    }
  }

  const result = runLocalChris(message, body.state as LocalChrisState | undefined)
  return NextResponse.json(result)
}
