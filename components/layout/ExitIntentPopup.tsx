"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { KeyboardEvent as ReactKeyboardEvent } from "react"
import { createPortal } from "react-dom"

const SESSION_KEY = "exitPopupShown"
const REOPEN_UI_KEY = "exitPopupReopenChip"
const TARGET = new Date("2026-04-30T23:59:00")

const TOTAL_APRIL_SLOTS = 20
const CLAIMED_SLOTS = 7

const MODAL_BG = "#1a2744"
const GOLD = "#f0a500"
const SLOT_FILLED = "#e53e3e"
const SLOT_OPEN = "#38a169"
const TEXT = "#ffffff"
const FINE_PRINT = "rgba(255,255,255,0.72)"
const DISMISS = "rgba(255,255,255,0.55)"
const SHADOW = "0 25px 60px rgba(0,0,0,0.6)"

export function ExitIntentPopup() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [entered, setEntered] = useState(false)
  const [timeLeft, setTimeLeft] = useState("")
  const [reducedMotion, setReducedMotion] = useState(false)
  const [showReopenChip, setShowReopenChip] = useState(false)

  const modalRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const prevFocusRef = useRef<HTMLElement | null>(null)
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setMounted(true)
    try {
      if (
        sessionStorage.getItem(REOPEN_UI_KEY) === "1" &&
        sessionStorage.getItem(SESSION_KEY) === "1"
      ) {
        setShowReopenChip(true)
      }
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const finishClose = useCallback(() => {
    document.body.style.overflow = ""
    setIsOpen(false)
    setEntered(false)
    const el = prevFocusRef.current
    if (el && typeof el.focus === "function") {
      try {
        el.focus()
      } catch {
        /* ignore */
      }
    }
    prevFocusRef.current = null
  }, [])

  const close = useCallback(() => {
    setEntered(false)
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    closeTimeoutRef.current = setTimeout(() => {
      closeTimeoutRef.current = null
      finishClose()
    }, 300)
  }, [finishClose])

  const closeFromX = useCallback(() => {
    try {
      sessionStorage.setItem(REOPEN_UI_KEY, "1")
    } catch {
      /* ignore */
    }
    setShowReopenChip(true)
    close()
  }, [close])

  const openFromChip = useCallback(() => {
    prevFocusRef.current = document.activeElement as HTMLElement | null
    setIsOpen(true)
  }, [])

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY > 20) return
      if (sessionStorage.getItem(SESSION_KEY)) return
      if (openTimeoutRef.current) return
      openTimeoutRef.current = setTimeout(() => {
        openTimeoutRef.current = null
        try {
          sessionStorage.setItem(SESSION_KEY, "1")
        } catch {
          /* ignore */
        }
        prevFocusRef.current = document.activeElement as HTMLElement | null
        setIsOpen(true)
      }, 200)
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      if (openTimeoutRef.current) {
        clearTimeout(openTimeoutRef.current)
        openTimeoutRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = "hidden"
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntered(true))
    })
    return () => cancelAnimationFrame(id)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const t = window.setTimeout(() => {
      closeBtnRef.current?.focus()
    }, 0)
    return () => clearTimeout(t)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const tick = () => {
      const diff = TARGET.getTime() - Date.now()
      if (diff <= 0) {
        setTimeLeft("Expired")
        return
      }
      const d = Math.floor(diff / 86_400_000)
      const h = Math.floor((diff % 86_400_000) / 3_600_000)
      const m = Math.floor((diff % 3_600_000) / 60_000)
      const s = Math.floor((diff % 60_000) / 1_000)
      setTimeLeft(`${d}d ${h}h ${m}m ${s}s`)
    }
    tick()
    const id = window.setInterval(tick, 1_000)
    return () => clearInterval(id)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        close()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen, close])

  const handleModalKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !modalRef.current) return
    const focusables = modalRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]):not([tabindex="-1"]), a[href]:not([tabindex="-1"])'
    )
    const list = Array.from(focusables).filter(
      (el) =>
        !el.hasAttribute("hidden") &&
        (el.offsetParent !== null || el.getClientRects().length > 0)
    )
    if (list.length === 0) return
    const first = list[0]
    const last = list[list.length - 1]
    const active = document.activeElement
    if (!e.shiftKey && active === last) {
      e.preventDefault()
      first.focus()
    } else if (e.shiftKey && active === first) {
      e.preventDefault()
      last.focus()
    }
  }

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
      document.body.style.overflow = ""
    }
  }, [])

  if (!mounted) return null

  const backdropOpacity = entered ? 0.6 : 0
  const modalTransform = entered ? "translateY(0)" : "translateY(-40px)"
  const modalOpacity = entered ? 1 : 0
  const transitionBackdrop = "opacity 300ms ease-out"
  const transitionModal = "opacity 400ms ease-out, transform 400ms ease-out"

  const pulseAnimation = reducedMotion
    ? undefined
    : "exit-intent-cta-pulse 1.8s ease-in-out infinite"

  const slotsLabel = `${CLAIMED_SLOTS} of ${TOTAL_APRIL_SLOTS} April spots claimed`

  const modal =
    isOpen &&
    (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
        <button
          type="button"
          aria-label="Close dialog"
          tabIndex={-1}
          className="absolute inset-0 cursor-default border-0 p-0"
          style={{
            opacity: backdropOpacity,
            transition: transitionBackdrop,
            backgroundColor: "rgb(0,0,0)",
            pointerEvents: entered ? "auto" : "none",
          }}
          onClick={close}
        />
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-intent-heading"
          aria-describedby="exit-intent-desc"
          tabIndex={-1}
          onKeyDown={handleModalKeyDown}
          className="relative z-[1] w-full max-w-lg overflow-y-auto rounded-[12px] outline-none"
          style={{
            backgroundColor: MODAL_BG,
            boxShadow: SHADOW,
            color: TEXT,
            maxHeight: "min(90dvh, 720px)",
            opacity: modalOpacity,
            transform: modalTransform,
            transition: transitionModal,
            marginLeft: "max(0px, env(safe-area-inset-left))",
            marginRight: "max(0px, env(safe-area-inset-right))",
          }}
        >
          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeFromX}
            aria-label="Close offer"
            className="absolute right-3 top-3 z-[2] rounded-md px-3 py-2 text-base font-medium leading-none"
            style={{ color: DISMISS }}
          >
            ✕
          </button>

          <div className="px-4 pb-6 pt-10 sm:px-6 sm:pb-8 sm:pt-12">
            <p
              className="text-center text-base font-semibold leading-snug sm:text-lg"
              style={{ color: TEXT }}
            >
              🔴 April Slots Filling Fast: Only 13 Spots Left This Month!
            </p>

            <div
              className="mt-4 flex w-full flex-nowrap justify-center gap-1 sm:gap-1.5"
              role="img"
              aria-label={slotsLabel}
            >
              {Array.from({ length: TOTAL_APRIL_SLOTS }, (_, i) => (
                <span
                  key={i}
                  className="h-3 min-w-0 flex-1 rounded-sm sm:h-3.5"
                  style={{
                    backgroundColor:
                      i < CLAIMED_SLOTS ? SLOT_FILLED : SLOT_OPEN,
                  }}
                />
              ))}
            </div>
            <p
              className="mt-2 text-center text-sm font-medium sm:text-base"
              style={{ color: FINE_PRINT }}
            >
              {slotsLabel}
            </p>

            <h2
              id="exit-intent-heading"
              className="mt-8 text-center font-bold leading-tight sm:mt-10"
              style={{
                color: TEXT,
                fontSize: "clamp(1.375rem, 4vw, 1.75rem)",
              }}
            >
              Wait: Don&apos;t Miss This April Special!
            </h2>
            <p
              id="exit-intent-desc"
              className="mx-auto mt-3 max-w-md text-center text-base leading-relaxed sm:text-lg"
              style={{ color: FINE_PRINT }}
            >
              Spring is peak season. Lock in your rate before May pricing kicks
              in.
            </p>

            <div
              className="mt-6 rounded-lg px-4 py-4 text-base leading-relaxed sm:text-lg sm:leading-relaxed"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                color: GOLD,
              }}
            >
              <p className="font-semibold">🏠 House Wash + Driveway Bundle</p>
              <p className="mt-2">Regular: $230 + $235 = $465</p>
              <p className="mt-1 font-semibold">
                April Exclusive: $380 (you save $85)
              </p>
            </div>

            <p
              className="mt-5 text-center text-lg font-semibold sm:text-xl"
              style={{ color: TEXT }}
            >
              ⏳ Expires in: {timeLeft || "…"}
            </p>

            <a
              href="tel:18004517213"
              className="mt-6 flex w-full items-center justify-center rounded-lg px-4 py-4 text-center text-lg font-bold leading-snug text-[#1a2744] no-underline sm:text-xl sm:py-5"
              style={{
                backgroundColor: GOLD,
                animation: pulseAnimation,
              }}
            >
              📞 Claim Your Spot: Call 1-800-451-7213
            </a>

            <p
              className="mt-4 text-center text-sm leading-relaxed sm:text-base"
              style={{ color: FINE_PRINT }}
            >
              Cannot be combined with other offers. Minimum job total applies.
              Call to confirm availability.
            </p>

            <button
              type="button"
              onClick={close}
              className="mt-4 w-full text-center text-sm font-medium underline decoration-white/30 underline-offset-2 sm:text-base"
              style={{ color: DISMISS }}
            >
              No thanks, I&apos;ll take my chances in May →
            </button>
          </div>
        </div>
      </div>
    )

  const reopenChip =
    showReopenChip &&
    !isOpen && (
      <div className="pointer-events-none fixed bottom-24 left-4 right-4 z-[105] flex justify-center p-0 pb-[max(0px,env(safe-area-inset-bottom))] md:bottom-6 md:left-auto md:right-6 md:justify-end md:p-0">
        <button
          type="button"
          onClick={openFromChip}
          className="pointer-events-auto max-w-[min(100%,20rem)] rounded-full border-2 px-4 py-3 text-center text-sm font-bold shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] sm:text-base"
          style={{
            backgroundColor: MODAL_BG,
            borderColor: GOLD,
            color: GOLD,
            boxShadow: SHADOW,
          }}
          aria-label="Open April special offer again"
        >
          View April special again
        </button>
      </div>
    )

  if (!modal && !reopenChip) return null

  return createPortal(
    <>
      <style>{`
        @keyframes exit-intent-cta-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
      `}</style>
      {modal}
      {reopenChip}
    </>,
    document.body
  )
}
