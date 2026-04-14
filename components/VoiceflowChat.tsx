'use client'

import Script from 'next/script'

type VoiceflowLoadConfig = {
  verify: { projectID: string }
  url: string
  versionID: string
  voice: { url: string }
}

const DEFAULT_RUNTIME_URL = 'https://general-runtime.voiceflow.com'
const DEFAULT_VOICE_URL = 'https://runtime-api.voiceflow.com'

function getVoiceflowConfig(): VoiceflowLoadConfig {
  const projectID =
    process.env.NEXT_PUBLIC_VOICEFLOW_PROJECT_ID ??
    '69dd9d010f5914da645bf6d0'
  const versionID =
    process.env.NEXT_PUBLIC_VOICEFLOW_VERSION_ID ??
    '69dd9d010f5914da645bf6d1'

  return {
    verify: { projectID },
    url: process.env.NEXT_PUBLIC_VOICEFLOW_RUNTIME_URL ?? DEFAULT_RUNTIME_URL,
    versionID,
    voice: {
      url: process.env.NEXT_PUBLIC_VOICEFLOW_VOICE_URL ?? DEFAULT_VOICE_URL,
    },
  }
}

export function VoiceflowChat() {
  const config = getVoiceflowConfig()

  if (!config.verify.projectID) {
    return null
  }

  return (
    <Script
      src="https://cdn.voiceflow.com/widget-next/bundle.mjs"
      strategy="afterInteractive"
      onLoad={() => {
        const w = window as Window & {
          voiceflow?: { chat?: { load: (c: VoiceflowLoadConfig) => void } }
        }
        w.voiceflow?.chat?.load({ ...config })
      }}
    />
  )
}
