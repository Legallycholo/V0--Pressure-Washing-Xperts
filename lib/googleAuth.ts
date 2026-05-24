import { GoogleAuth, type OAuth2Client } from "google-auth-library"

let cachedAuth: GoogleAuth<OAuth2Client> | null = null

function parseServiceAccountJson() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!raw) return undefined
  try {
    return JSON.parse(raw) as Record<string, unknown>
  } catch (error) {
    console.error("[googleAuth] Invalid GOOGLE_SERVICE_ACCOUNT_JSON", error)
    return undefined
  }
}

export function getGoogleAuth(scopes: string[]) {
  if (cachedAuth) return cachedAuth

  const credentials = parseServiceAccountJson()
  cachedAuth = new GoogleAuth({
    credentials,
    scopes,
    projectId: process.env.GOOGLE_CLOUD_PROJECT,
  })
  return cachedAuth
}

export async function getGoogleAccessToken(scopes: string[]) {
  const auth = getGoogleAuth(scopes)
  const client = await auth.getClient()
  const token = await client.getAccessToken()
  if (!token.token) {
    throw new Error("Failed to acquire Google access token.")
  }
  return token.token
}
