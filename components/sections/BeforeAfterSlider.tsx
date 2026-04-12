"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const KEYBOARD_STEP = 3

export type BeforeAfterSliderProps = {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  beforeObjectPosition?: string
  afterObjectPosition?: string
  /** Used in aria labels, e.g. comparison title */
  comparisonLabel: string
  /** Tailwind aspect classes for the frame (e.g. aspect-[4/3] or arbitrary aspect-[16/9]) */
  aspectClassName?: string
  sizes?: string
  className?: string
  /** `section`: light badges; `lightbox`: higher-contrast badges on dark overlay */
  variant?: "section" | "lightbox"
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return reduced
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeObjectPosition,
  afterObjectPosition,
  comparisonLabel,
  aspectClassName = "aspect-[4/3]",
  sizes = "(max-width: 896px) 100vw, 896px",
  className,
  variant = "section",
}: BeforeAfterSliderProps) {
  const reducedMotion = usePrefersReducedMotion()
  const [sliderPosition, setSliderPosition] = useState(0)
  const [beforeLoaded, setBeforeLoaded] = useState(false)
  const [afterLoaded, setAfterLoaded] = useState(false)
  const pairReady = beforeLoaded && afterLoaded
  const introDoneRef = useRef(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const [pointerDragging, setPointerDragging] = useState(false)

  const clipBefore = `inset(0 ${100 - sliderPosition}% 0 0)`

  const setPositionFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current
    if (!el) return
    const { left, width } = el.getBoundingClientRect()
    if (width <= 0) return
    const p = ((clientX - left) / width) * 100
    setSliderPosition(Math.min(100, Math.max(0, p)))
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setSliderPosition(50)
      introDoneRef.current = true
    }
  }, [reducedMotion])

  useEffect(() => {
    if (!pairReady || introDoneRef.current || reducedMotion) {
      return
    }

    const start = performance.now()
    const duration = 520
    const from = 0
    const to = 50

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - t) ** 2
      setSliderPosition(from + (to - from) * eased)
      if (t < 1) {
        requestAnimationFrame(tick)
      } else {
        introDoneRef.current = true
      }
    }
    requestAnimationFrame(tick)
  }, [pairReady, reducedMotion])

  useEffect(() => {
    if (!pointerDragging) return

    const onMove = (e: PointerEvent) => {
      setPositionFromClientX(e.clientX)
    }
    const onUp = () => {
      setPointerDragging(false)
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    window.addEventListener("pointercancel", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("pointercancel", onUp)
    }
  }, [pointerDragging, setPositionFromClientX])

  const onRangeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      setSliderPosition((p) => Math.max(0, p - KEYBOARD_STEP))
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      setSliderPosition((p) => Math.min(100, p + KEYBOARD_STEP))
    }
  }

  const badgeBefore =
    variant === "lightbox"
      ? "bg-black/75 text-white ring-1 ring-white/20"
      : "bg-black/65 text-white backdrop-blur-sm"

  const badgeAfter =
    variant === "lightbox"
      ? "bg-white/95 text-brand-blue-dark ring-1 ring-white/30 shadow-sm"
      : "bg-white/90 text-brand-blue-dark shadow-sm backdrop-blur-sm"

  return (
    <div className={cn("relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5", className)}>
      <div
        ref={trackRef}
        className={cn(
          "relative touch-none select-none",
          aspectClassName,
          !pairReady && "bg-neutral-900/90"
        )}
        role="img"
        aria-label={`Before and after: ${comparisonLabel}. Slider at ${Math.round(sliderPosition)} percent.`}
      >
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            pairReady ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={afterSrc}
            alt={afterAlt}
            fill
            draggable={false}
            className="object-cover"
            style={{ objectPosition: afterObjectPosition ?? "50% 50%" }}
            sizes={sizes}
            priority
            onLoad={() => setAfterLoaded(true)}
          />

          <div className="absolute inset-0 z-[1]" style={{ clipPath: clipBefore }}>
            <Image
              src={beforeSrc}
              alt={beforeAlt}
              fill
              draggable={false}
              className="object-cover"
              style={{ objectPosition: beforeObjectPosition ?? "50% 50%" }}
              sizes={sizes}
              priority
              onLoad={() => setBeforeLoaded(true)}
            />
          </div>

          <div
            className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.35)]"
            style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
          >
            <div className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg ring-2 ring-white/80">
              <div className="flex gap-0">
                <ChevronLeft className="size-4 text-brand-blue" aria-hidden />
                <ChevronRight className="size-4 text-brand-blue" aria-hidden />
              </div>
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            onKeyDown={onRangeKeyDown}
            onPointerDown={(e) => {
              if (e.button !== 0) return
              setPointerDragging(true)
              setPositionFromClientX(e.clientX)
            }}
            className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
            aria-label={`Before and after comparison slider for ${comparisonLabel}. Drag or use arrow keys to adjust.`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPosition)}
          />

          <div
            className={cn(
              "pointer-events-none absolute bottom-3 left-3 z-[5] rounded-full px-3 py-1 text-sm font-medium backdrop-blur-sm",
              badgeBefore
            )}
          >
            Before
          </div>
          <div
            className={cn(
              "pointer-events-none absolute bottom-3 right-3 z-[5] rounded-full px-3 py-1 text-sm font-medium backdrop-blur-sm",
              badgeAfter
            )}
          >
            After
          </div>
        </div>
      </div>
    </div>
  )
}
