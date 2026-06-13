function nonEmpty(value: string | undefined): string | undefined {
  const t = value?.trim()
  return t ? t : undefined
}

export type TwilioConfig = {
  accountSid: string
  authToken: string
  fromNumber: string
  toNumber?: string
}

/** Returns Twilio config when all required vars are set; otherwise null. */
export function getTwilioConfig(): TwilioConfig | null {
  const accountSid = nonEmpty(process.env.TWILIO_ACCOUNT_SID)
  const authToken = nonEmpty(process.env.TWILIO_AUTH_TOKEN)
  const fromNumber = nonEmpty(process.env.TWILIO_FROM_NUMBER)
  if (!accountSid || !authToken || !fromNumber) return null

  const toNumber =
    nonEmpty(process.env.TWILIO_TO_NUMBER) ??
    nonEmpty(process.env.TWILIO_NOTIFY_PHONE)

  return {
    accountSid,
    authToken,
    fromNumber,
    toNumber,
  }
}

export function isTwilioSmsEnabled(): boolean {
  const config = getTwilioConfig()
  return Boolean(config?.toNumber)
}
