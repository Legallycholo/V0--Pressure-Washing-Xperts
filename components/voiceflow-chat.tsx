'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    voiceflow?: {
      chat?: {
        load: (config: {
          verify: { projectID: string }
          url: string
          versionID: string
          voice: { url: string }
        }) => void
      }
    }
    __voiceflowChatLoaded?: boolean
  }
}

const SCRIPT_ID = 'voiceflow-widget-script'

export function VoiceflowChat() {
  useEffect(() => {
    if (window.__voiceflowChatLoaded) {
      return
    }

    const loadChat = () => {
      if (window.__voiceflowChatLoaded || !window.voiceflow?.chat?.load) {
        return
      }

      window.voiceflow.chat.load({
        verify: { projectID: '69dd9d010f5914da645bf6d0' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
        voice: {
          url: 'https://runtime-api.voiceflow.com',
        },
      })

      window.__voiceflowChatLoaded = true
    }

    const existingScript = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null

    if (existingScript) {
      existingScript.addEventListener('load', loadChat)
      loadChat()
      return () => {
        existingScript.removeEventListener('load', loadChat)
      }
    }

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs'
    script.type = 'text/javascript'
    script.async = true
    script.addEventListener('load', loadChat)

    document.body.appendChild(script)

    return () => {
      script.removeEventListener('load', loadChat)
    }
  }, [])

  return null
}
