import { randomUUID } from "crypto"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { runAgent } from "@/lib/agentRuntime"

type ChatRequestBody = {
  message?: unknown
  sessionId?: unknown
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

  const sessionId = asTrimmedString(body.sessionId) ?? randomUUID()

  try {
    const { reply } = await runAgent({ message, userId, sessionId })
    return NextResponse.json({ reply, sessionId })
  } catch (error) {
    console.error("[api/chat] failed to run agent", error)
    return NextResponse.json(
      {
        error:
          "I had trouble reaching our assistant. You can call us at (800) 451-7213 for immediate help.",
      },
      { status: 502 },
    )
  }
}
