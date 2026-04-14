'use client'

import { useEffect } from 'react'

const MOBILE_BREAKPOINT = 768
const DESKTOP_CHAT_MAX_HEIGHT = 700
const DESKTOP_CHAT_MIN_HEIGHT = 460
const DESKTOP_CHAT_VIEWPORT_MARGIN = 40
const LAUNCHER_SELECTOR = '.vfrc-launcher'
const ATTENTION_CLASS = 'vf-attention-active'
const NUDGE_CLASS = 'vf-launcher-nudge'
const ATTENTION_STOP_KEY = 'vfLauncherAttentionStopped'
const INITIAL_NUDGE_DELAY_MS = 12_000
const NUDGE_COOLDOWN_MS = 28_000
const NUDGE_DURATION_MS = 750

type VoiceflowLoadConfig = {
  verify: { projectID: string }
  url: string
  versionID: string
  voice: { url: string }
  assistant?: {
    side?: 'left' | 'right'
    persistence?: 'localStorage' | 'sessionStorage' | 'memory'
    spacing?: {
      side?: string
      bottom?: string
    }
  }
}

declare global {
  interface Window {
    voiceflow?: {
      chat?: {
        load: (config: VoiceflowLoadConfig) => void
      }
    }
    __voiceflowChatLoaded?: boolean
  }
}

const SCRIPT_ID = 'voiceflow-widget-script'

function isVoiceflowStaleSessionError(reason: unknown): boolean {
  if (typeof reason === 'string') {
    return reason.includes('Session is stale')
  }

  if (reason && typeof reason === 'object') {
    const maybeMessage =
      'message' in reason && typeof reason.message === 'string'
        ? reason.message
        : undefined
    const maybeStack =
      'stack' in reason && typeof reason.stack === 'string'
        ? reason.stack
        : undefined

    if (maybeMessage?.includes('Session is stale')) {
      if (!maybeStack) return true
      return maybeStack.includes('cdn.voiceflow.com/widget-next/bundle.mjs')
    }
  }

  if (!(reason instanceof Error)) return false

  const hasMessage = reason.message.includes('Session is stale')
  const hasVoiceflowStack = reason.stack?.includes('cdn.voiceflow.com/widget-next/bundle.mjs')
  return Boolean(hasMessage && hasVoiceflowStack)
}

export function VoiceflowChat() {
  useEffect(() => {
    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (!isVoiceflowStaleSessionError(event.reason)) return
      // Prevent third-party rejection from tripping the Next.js runtime overlay.
      event.preventDefault()
    }

    window.addEventListener('unhandledrejection', onUnhandledRejection)
    return () => {
      window.removeEventListener('unhandledrejection', onUnhandledRejection)
    }
  }, [])

  useEffect(() => {
    const syncDesktopMaxHeight = () => {
      const boundedHeight = Math.max(
        DESKTOP_CHAT_MIN_HEIGHT,
        Math.min(
          DESKTOP_CHAT_MAX_HEIGHT,
          window.innerHeight - DESKTOP_CHAT_VIEWPORT_MARGIN
        )
      )
      document.documentElement.style.setProperty(
        '--vf-chat-max-height',
        `${boundedHeight}px`
      )
    }

    syncDesktopMaxHeight()
    window.addEventListener('resize', syncDesktopMaxHeight)
    return () => {
      window.removeEventListener('resize', syncDesktopMaxHeight)
    }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    try {
      if (sessionStorage.getItem(ATTENTION_STOP_KEY) === '1') {
        return
      }
    } catch {
      // Ignore session storage errors in locked-down browser modes.
    }

    let launcher: HTMLElement | null = null
    let observer: MutationObserver | null = null
    let initialNudgeTimeout: ReturnType<typeof setTimeout> | null = null
    let nudgeInterval: ReturnType<typeof setInterval> | null = null
    let nudgeCleanupTimeout: ReturnType<typeof setTimeout> | null = null

    const clearTimers = () => {
      if (initialNudgeTimeout) clearTimeout(initialNudgeTimeout)
      if (nudgeInterval) clearInterval(nudgeInterval)
      if (nudgeCleanupTimeout) clearTimeout(nudgeCleanupTimeout)
      initialNudgeTimeout = null
      nudgeInterval = null
      nudgeCleanupTimeout = null
    }

    const runNudge = () => {
      if (!launcher) return
      launcher.classList.remove(NUDGE_CLASS)
      launcher.classList.add(NUDGE_CLASS)
      if (nudgeCleanupTimeout) clearTimeout(nudgeCleanupTimeout)
      nudgeCleanupTimeout = setTimeout(() => {
        launcher?.classList.remove(NUDGE_CLASS)
      }, NUDGE_DURATION_MS)
    }

    const stopAttention = () => {
      clearTimers()
      if (launcher) {
        launcher.classList.remove(ATTENTION_CLASS, NUDGE_CLASS)
        launcher.removeEventListener('click', stopAttention)
      }
      window.removeEventListener('message', onWidgetEvent)
      try {
        sessionStorage.setItem(ATTENTION_STOP_KEY, '1')
      } catch {
        // Ignore session storage errors in locked-down browser modes.
      }
    }

    const onWidgetEvent = (event: MessageEvent) => {
      if (typeof event.data !== 'string') return
      if (event.data.includes('"type":"voiceflow:open"')) {
        stopAttention()
      }
    }

    const attachLauncher = (element: HTMLElement) => {
      if (launcher === element) return
      if (launcher) {
        launcher.removeEventListener('click', stopAttention)
      }

      launcher = element
      launcher.classList.add(ATTENTION_CLASS)
      launcher.addEventListener('click', stopAttention)

      if (!initialNudgeTimeout && !nudgeInterval) {
        initialNudgeTimeout = setTimeout(() => {
          runNudge()
          nudgeInterval = setInterval(runNudge, NUDGE_COOLDOWN_MS)
        }, INITIAL_NUDGE_DELAY_MS)
      }
    }

    const detectLauncher = () => {
      const element = document.querySelector(LAUNCHER_SELECTOR)
      if (element instanceof HTMLElement) {
        attachLauncher(element)
      }
    }

    detectLauncher()
    observer = new MutationObserver(detectLauncher)
    observer.observe(document.body, { childList: true, subtree: true })
    window.addEventListener('message', onWidgetEvent)

    return () => {
      clearTimers()
      if (observer) observer.disconnect()
      window.removeEventListener('message', onWidgetEvent)
      if (launcher) {
        launcher.classList.remove(NUDGE_CLASS)
        launcher.removeEventListener('click', stopAttention)
      }
    }
  }, [])

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
        assistant: {
          side: 'right',
          persistence: 'memory',
          spacing: {
            side: '16',
            bottom: window.innerWidth < MOBILE_BREAKPOINT ? '88' : '24',
          },
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
