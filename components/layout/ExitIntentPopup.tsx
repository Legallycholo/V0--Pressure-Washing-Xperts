"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { KeyboardEvent as ReactKeyboardEvent } from "react"
import { createPortal } from "react-dom"

const SESSION_KEY = "exitPopupShown"
const REOPEN_UI_KEY = "exitPopupReopenChip"
const TARGET = new Date("2026-04-30T23:59:00")

/** Scroll: open at 35% of scrollable height or at least 200px (short pages). */
const SCROLL_DEPTH_RATIO = 0.35
const SCROLL_MIN_PX = 200
/** Delayed open: skipped when prefers-reduced-motion to avoid pushy timed overlays. */
const AUTO_OPEN_DELAY_MS = 14_000

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

function sessionHasShown(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1"
  } catch {
    return false
  }
}

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
  const exitIntentTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isOpenRef = useRef(false)
  const openingRef = useRef(false)
  const hasBeenSeenRef = useRef(false)
  const scrollRafRef = useRef<number | null>(null)

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

  useEffect(() => {
    isOpenRef.current = isOpen
    // Allow a new openPopup() after state has caught up (openingRef guards the sync gap only).
    openingRef.current = false
  }, [isOpen])

  const openPopup = useCallback(() => {
    if (isOpenRef.current || openingRef.current) return
    if (sessionHasShown()) return
    openingRef.current = true
    prevFocusRef.current = document.activeElement as HTMLElement | null
    setIsOpen(true)
  }, [])

  const finishClose = useCallback(() => {
    document.body.style.overflow = ""
    setIsOpen(false)
    setEntered(false)
    hasBeenSeenRef.current = false
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
    if (hasBeenSeenRef.current) {
      try {
        sessionStorage.setItem(REOPEN_UI_KEY, "1")
      } catch {
        /* ignore */
      }
      setShowReopenChip(true)
    }
    setEntered(false)
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    closeTimeoutRef.current = setTimeout(() => {
      closeTimeoutRef.current = null
      finishClose()
    }, 300)
  }, [finishClose])

  const openFromChip = useCallback(() => {
    prevFocusRef.current = document.activeElement as HTMLElement | null
    setIsOpen(true)
  }, [])

  /** Session "consumed" only after the modal is visibly presented. */
  useEffect(() => {
    if (!isOpen || !entered) return
    hasBeenSeenRef.current = true
    try {
      sessionStorage.setItem(SESSION_KEY, "1")
    } catch {
      /* ignore */
    }
  }, [isOpen, entered])

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY > 20) return
      if (sessionHasShown()) return
      if (isOpenRef.current) return
      if (exitIntentTimerRef.current) return
      exitIntentTimerRef.current = setTimeout(() => {
        exitIntentTimerRef.current = null
        openPopup()
      }, 200)
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      if (exitIntentTimerRef.current) {
        clearTimeout(exitIntentTimerRef.current)
        exitIntentTimerRef.current = null
      }
    }
  }, [openPopup])

  useEffect(() => {
    const evaluateScroll = () => {
      if (sessionHasShown() || isOpenRef.current) return
      const doc = document.documentElement
      const scrollable = Math.max(1, doc.scrollHeight - window.innerHeight)
      const y = window.scrollY
      if (y / scrollable >= SCROLL_DEPTH_RATIO || y >= SCROLL_MIN_PX) {
        openPopup()
      }
    }

    const onScroll = () => {
      if (scrollRafRef.current !== null) return
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = null
        evaluateScroll()
      })
    }

    evaluateScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (scrollRafRef.current !== null) {
        cancelAnimationFrame(scrollRafRef.current)
        scrollRafRef.current = null
      }
    }
  }, [openPopup])

  // Timed auto-open: omit when reduced motion - user still gets scroll + exit-intent.
  useEffect(() => {
    if (!mounted || reducedMotion) return
    const id = window.setTimeout(() => openPopup(), AUTO_OPEN_DELAY_MS)
    return () => clearTimeout(id)
  }, [mounted, reducedMotion, openPopup])

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
            maxHeight: "min(85dvh, 640px)",
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
            onClick={close}
            aria-label="Close offer"
            className="absolute right-2 top-2 z-[2] flex items-center justify-center rounded-full min-h-[44px] min-w-[44px] text-base font-bold leading-none transition-colors hover:bg-white/10"
            style={{ color: TEXT }}
          >
            ✕
          </button>

          <div className="px-4 pb-5 pt-8 sm:px-6 sm:pb-7 sm:pt-10">
            <h2
              id="exit-intent-heading"
              className="text-center font-bold leading-tight"
              style={{
                color: TEXT,
                fontSize: "clamp(1.25rem, 4vw, 1.625rem)",
              }}
            >
              April Special: Save $85 on House + Driveway
            </h2>
            <p
              id="exit-intent-desc"
              className="mx-auto mt-2 max-w-sm text-center text-sm leading-relaxed sm:text-base"
              style={{ color: FINE_PRINT }}
            >
              Lock in spring pricing before May rates kick in.
            </p>

            <div
              className="mt-4 flex w-full flex-nowrap justify-center gap-1 sm:gap-1.5"
              role="img"
              aria-label={slotsLabel}
            >
              {Array.from({ length: TOTAL_APRIL_SLOTS }, (_, i) => (
                <span
                  key={i}
                  className="h-2.5 min-w-0 flex-1 rounded-sm sm:h-3"
                  style={{
                    backgroundColor:
                      i < CLAIMED_SLOTS ? SLOT_FILLED : SLOT_OPEN,
                  }}
                />
              ))}
            </div>
            <p
              className="mt-1.5 text-center text-xs font-medium sm:text-sm"
              style={{ color: FINE_PRINT }}
            >
              {slotsLabel}
            </p>

            <div
              className="mt-4 rounded-lg px-4 py-3 text-sm leading-relaxed sm:text-base"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                color: GOLD,
              }}
            >
              <p className="font-semibold">House Wash + Driveway Bundle</p>
              <p className="mt-1">
                <span className="line-through opacity-70">$465</span>{" "}
                <span className="font-bold">→ $380</span>
              </p>
            </div>

            <p
              className="mt-3 text-center text-sm font-semibold sm:text-base"
              style={{ color: TEXT }}
            >
              ⏳ Expires: {timeLeft || "…"}
            </p>

            <a
              href="tel:18004517213"
              className="mt-4 flex w-full items-center justify-center rounded-lg px-4 py-4 text-center text-lg font-bold leading-snug text-[#1a2744] no-underline min-h-[52px] sm:text-xl"
              style={{
                backgroundColor: GOLD,
                animation: pulseAnimation,
              }}
            >
              Call Now: 1-800-451-7213
            </a>

            <p
              className="mt-3 text-center text-xs leading-relaxed"
              style={{ color: FINE_PRINT }}
            >
              Cannot be combined with other offers. Call to confirm availability.
            </p>

            <button
              type="button"
              onClick={close}
              className="mt-3 w-full text-center text-sm font-medium underline decoration-white/30 underline-offset-2 min-h-[44px]"
              style={{ color: DISMISS }}
            >
              No thanks →
            </button>
          </div>
        </div>
      </div>
    )

  const reopenChip =
    showReopenChip &&
    !isOpen && (
      <div className="pointer-events-none fixed left-0 top-1/2 z-[95] flex -translate-y-1/2 items-center justify-start pl-[max(0px,env(safe-area-inset-left))] md:top-auto md:bottom-6 md:left-6 md:translate-y-0">
        <button
          type="button"
          onClick={openFromChip}
          className="pointer-events-auto min-h-[132px] min-w-[46px] rounded-r-xl rounded-l-none border-2 border-l-0 px-2 py-3 text-center text-xs font-bold shadow-lg transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:scale-[1.02] active:scale-[0.98] [text-orientation:mixed] [writing-mode:vertical-lr] md:min-h-[44px] md:min-w-0 md:max-w-[15rem] md:rounded-full md:border-l-2 md:px-4 md:py-2.5 md:text-sm md:[writing-mode:horizontal-tb]"
          style={{
            backgroundColor: MODAL_BG,
            borderColor: GOLD,
            color: GOLD,
            boxShadow: SHADOW,
          }}
          aria-label="Open April special offer again"
        >
          <span className="md:hidden">April offer</span>
          <span className="hidden md:inline">View April special again</span>
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
