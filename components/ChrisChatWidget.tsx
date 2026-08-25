'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { X, Send, MessageCircle, Phone, Droplets } from 'lucide-react'

/* ─── Types ────────────────────────────────────────────────────────────────── */

interface Message {
  id: string
  role: 'user' | 'assistant'
  text: string
}

/* ─── Constants ─────────────────────────────────────────────────────────────── */

const GREETING =
  "Hi, I'm Chris with Pressure Washing Xperts. How can I help you today?"

const ATTENTION_DELAY_MS = 25_000

const ATTENTION_BUBBLE_TEXT = "👋 Need a booking request? I'm here to help!"

/* ─── Helpers ───────────────────────────────────────────────────────────────── */

function playChime() {
  try {
    type WebkitWindow = Window & { webkitAudioContext?: typeof AudioContext }
    const Ctx =
      window.AudioContext ?? (window as WebkitWindow).webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    const play = (
      freq: number,
      start: number,
      dur: number,
      vol: number,
    ) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0, ctx.currentTime + start)
      gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + start + 0.02)
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + start + dur,
      )
      osc.start(ctx.currentTime + start)
      osc.stop(ctx.currentTime + start + dur + 0.05)
    }
    play(880, 0, 0.4, 0.22)
    play(1100, 0.2, 0.4, 0.18)
    play(1320, 0.38, 0.5, 0.15)
  } catch {
    /* audio not available */
  }
}

/* ─── Component ─────────────────────────────────────────────────────────────── */

export function ChrisChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: 'greeting', role: 'assistant', text: GREETING },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)

  /* Attention state */
  const [showBubble, setShowBubble] = useState(false)
  const [showPing, setShowPing] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)
  const attentionFired = useRef(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  /* Auto-scroll */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  /* Focus input on open; clear unread */
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false)
      setShowBubble(false)
      setShowPing(false)
      setTimeout(() => inputRef.current?.focus(), 120)
    }
  }, [isOpen])

  /* Attention-grabber timer */
  useEffect(() => {
    if (attentionFired.current) return
    const timer = setTimeout(() => {
      if (isOpen) return
      attentionFired.current = true
      playChime()
      setHasUnread(true)
      setShowPing(true)
      setShowBubble(true)
      setTimeout(() => setShowBubble(false), 8_000)
    }, ATTENTION_DELAY_MS)
    return () => clearTimeout(timer)
  }, [isOpen])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || isLoading) return

    const userMsg: Message = { id: `u_${Date.now()}`, role: 'user', text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId }),
      })
      const data = (await res.json()) as {
        reply?: string
        sessionId?: string
        error?: string
      }

      if (!res.ok || !data.reply) {
        throw new Error(
          data.error ??
            'Sorry, I had trouble responding. Call us at (800) 451-7213 for immediate help.',
        )
      }

      if (data.sessionId) {
        setSessionId(data.sessionId)
      }

      const replyText = data.reply

      setMessages((prev) => [
        ...prev,
        {
          id: `a_${Date.now()}`,
          role: 'assistant',
<<<<<<< HEAD
          text: replyText,
=======
          text: data.reply ?? '',
>>>>>>> origin/main
        },
      ])
    } catch (error) {
      const fallback =
        error instanceof Error
          ? error.message
          : 'Sorry, I had trouble responding. Call us at (800) 451-7213 for immediate help.'
      setMessages((prev) => [
        ...prev,
        {
          id: `a_${Date.now()}`,
          role: 'assistant',
          text: fallback,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, sessionId])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  /* ─── Render ──────────────────────────────────────────────────────────────── */

  return (
    <>
      {/* ── Chat Panel ─────────────────────────────────────────────────────── */}
      <div
        className={`fixed bottom-[5.5rem] right-4 z-50 flex flex-col rounded-2xl overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-90 pointer-events-none'
        }`}
        style={{
          width: '370px',
          maxWidth: 'calc(100vw - 2rem)',
          height: '540px',
          boxShadow:
            '0 25px 60px rgba(15,23,42,0.3), 0 8px 20px rgba(15,23,42,0.2)',
          border: '1px solid rgba(30,58,95,0.15)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Chat with Chris"
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-4 py-3 shrink-0"
          style={{
            background:
              'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)',
          }}
        >
          <div className="relative shrink-0">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
              style={{ background: '#fbbf24', color: '#1e3a5f' }}
            >
              C
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0f172a]" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm leading-tight">
              Chris
            </p>
            <p className="text-blue-300 text-xs truncate">
              Pressure Washing Xperts · Online now
            </p>
          </div>

          <a
            href="tel:+18004517213"
            className="text-blue-300 hover:text-[#fbbf24] transition-colors p-1.5 rounded-lg"
            aria-label="Call us"
            title="Call (800) 451-7213"
          >
            <Phone size={16} />
          </a>
          <button
            onClick={() => setIsOpen(false)}
            className="text-blue-300 hover:text-white transition-colors p-1.5 rounded-lg"
            aria-label="Close chat"
          >
            <X size={16} />
          </button>
        </div>

        {/* Brand strip */}
        <div
          className="flex items-center gap-2 px-4 py-1.5 shrink-0"
          style={{
            background: 'rgba(251,191,36,0.12)',
            borderBottom: '1px solid rgba(251,191,36,0.2)',
          }}
        >
          <Droplets size={12} style={{ color: '#fbbf24' }} />
          <p className="text-xs" style={{ color: '#92400e' }}>
            Ready-to-book service · Serving Metro Atlanta & GA
          </p>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
          style={{ background: '#f8fafc' }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: '#fbbf24', color: '#1e3a5f' }}
                >
                  C
                </div>
              )}

              <div
                className={`max-w-[76%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'
                }`}
                style={
                  msg.role === 'user'
                    ? { background: '#1e3a5f', color: '#ffffff' }
                    : {
                        background: '#ffffff',
                        color: '#1e293b',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                      }
                }
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex items-end gap-2 justify-start">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{ background: '#fbbf24', color: '#1e3a5f' }}
              >
                C
              </div>
              <div
                className="rounded-2xl rounded-bl-sm px-4 py-3"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}
              >
                <div className="flex gap-1 items-center h-4">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{
                        background: '#94a3b8',
                        animationDelay: `${delay}ms`,
                        animationDuration: '1s',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Call CTA strip */}
        <div
          className="flex items-center justify-center gap-2 px-4 py-2 shrink-0"
          style={{
            background: '#f1f5f9',
            borderTop: '1px solid #e2e8f0',
          }}
        >
          <Phone size={11} style={{ color: '#64748b' }} />
          <p className="text-xs text-slate-500">
            Prefer to talk?{' '}
            <a
              href="tel:+18004517213"
              className="font-semibold transition-colors"
              style={{ color: '#1e3a5f' }}
            >
              (800) 451-7213
            </a>
          </p>
        </div>

        {/* Input */}
        <div
          className="flex items-center gap-2 px-3 py-3 shrink-0"
          style={{
            background: '#ffffff',
            borderTop: '1px solid #e2e8f0',
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message…"
            disabled={isLoading}
            className="flex-1 rounded-xl px-3.5 py-2.5 text-sm outline-none disabled:opacity-50 transition-colors"
            style={{
              background: '#f1f5f9',
              border: '1.5px solid #e2e8f0',
              color: '#1e293b',
            }}
            aria-label="Type a message to Chris"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="rounded-xl p-2.5 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shrink-0"
            style={{ background: '#1e3a5f', color: '#fbbf24' }}
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* ── Attention Bubble ────────────────────────────────────────────────── */}
      {showBubble && !isOpen && (
        <div
          className="fixed bottom-[5.5rem] right-20 z-50 animate-in fade-in slide-in-from-bottom-2 duration-300"
          style={{ maxWidth: '220px' }}
        >
          <div
            className="rounded-2xl rounded-br-sm px-4 py-3 text-sm font-medium shadow-lg"
            style={{
              background: '#1e3a5f',
              color: '#ffffff',
              boxShadow: '0 8px 24px rgba(30,58,95,0.35)',
            }}
          >
            {ATTENTION_BUBBLE_TEXT}
          </div>
          {/* Tail */}
          <div
            className="absolute -right-2 bottom-3 w-0 h-0"
            style={{
              borderTop: '6px solid transparent',
              borderBottom: '6px solid transparent',
              borderLeft: '8px solid #1e3a5f',
            }}
          />
        </div>
      )}

      {/* ── Ping Ring ───────────────────────────────────────────────────────── */}
      {showPing && !isOpen && (
        <span
          className="fixed bottom-6 right-4 z-40 w-14 h-14 rounded-full animate-ping pointer-events-none"
          style={{ background: 'rgba(251,191,36,0.35)' }}
        />
      )}

      {/* ── Floating Bubble Button ──────────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 right-4 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)',
          boxShadow: '0 8px 28px rgba(15,23,42,0.4)',
        }}
        aria-label={isOpen ? 'Close chat' : 'Chat with Chris'}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
            isOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
          }`}
        >
          <X size={22} style={{ color: '#fbbf24' }} />
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
            isOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'
          }`}
        >
          <MessageCircle size={22} style={{ color: '#fbbf24' }} />
        </span>

        {/* Unread badge */}
        {hasUnread && !isOpen && (
          <span
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold animate-in zoom-in duration-200"
            style={{ background: '#fbbf24', color: '#1e3a5f' }}
            aria-label="1 unread message"
          >
            1
          </span>
        )}
      </button>
    </>
  )
}
