"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider"
import { galleryItemIsComparison, galleryItems } from "@/data/gallery"
import { ctaPress } from "@/lib/ctaInteraction"
import { businessPhoneDisplay, businessPhoneTelHref } from "@/data/site"

type Comparison = {
  id: number
  title: string
  description: string
  location: string
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  /** CSS object-position for the before layer (fine-tune alignment vs after). */
  beforeObjectPosition?: string
  /** CSS object-position for the after layer. */
  afterObjectPosition?: string
}

function buildComparisons(): Comparison[] {
  return galleryItems
    .filter((item) => item.category === "before-after" && galleryItemIsComparison(item))
    .sort((a, b) => a.id - b.id)
    .map((item) => ({
      id: item.id,
      title: item.title.replace(/:\s*.+$/, ""),
      description: "",
      location: "Metro Atlanta area",
      beforeSrc: item.beforeSrc!,
      afterSrc: item.afterSrc!,
      beforeAlt: item.beforeAlt!,
      afterAlt: item.afterAlt!,
      beforeObjectPosition: item.beforeObjectPosition,
      afterObjectPosition: item.afterObjectPosition,
    }))
}

interface BeforeAfterProps {
  onOpenQuoteForm?: () => void
}

export function BeforeAfter({ onOpenQuoteForm }: BeforeAfterProps = {}) {
  const comparisons = useMemo(() => buildComparisons(), [])
  const [currentIndex, setCurrentIndex] = useState(0)

  const current = comparisons[currentIndex]
  const showCarousel = comparisons.length > 1

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + comparisons.length) % comparisons.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % comparisons.length)
  }

  if (!current) {
    return null
  }

  return (
    <section className="bg-ps-bg-alt py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.28em] text-ps-cyan">
            Real Results
          </p>
          <h2 className="font-display uppercase tracking-wide text-white text-4xl sm:text-5xl lg:text-6xl">
            See The <span className="text-ps-cyan text-glow-cyan">Difference</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-ps-text-muted">
            Real results. Real homes. Metro Atlanta.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="mx-auto w-full max-w-4xl md:w-[58%] md:max-w-3xl">
            <BeforeAfterSlider
              key={current.id}
              beforeSrc={current.beforeSrc}
              afterSrc={current.afterSrc}
              beforeAlt={current.beforeAlt}
              afterAlt={current.afterAlt}
              beforeObjectPosition={current.beforeObjectPosition}
              afterObjectPosition={current.afterObjectPosition}
              comparisonLabel={current.title}
              variant="section"
              aspectClassName="aspect-video"
            />
          </div>

          <div className="mt-4 text-center">
            <h3 className="mb-0.5 text-lg font-bold text-white">{current.title}</h3>
            <p className="text-sm font-medium text-ps-cyan">{current.location}</p>
          </div>

          {showCarousel ? (
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={goToPrevious}
                className="rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-ps-cyan hover:text-[#06121f]"
                aria-label="Previous comparison"
              >
                <ChevronLeft className="size-5" />
              </button>
              <div className="flex max-w-[min(100%,280px)] flex-wrap justify-center gap-2">
                {comparisons.map((c, index) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setCurrentIndex(index)
                    }}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-6 bg-ps-cyan"
                        : "w-2 bg-white/25 hover:bg-white/40"
                    }`}
                    aria-label={`Go to comparison ${index + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={goToNext}
                className="rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-ps-cyan hover:text-[#06121f]"
                aria-label="Next comparison"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          ) : null}

          <div className="mt-7 text-center">
            <p className="mb-3 text-ps-text-muted text-sm sm:text-base">Want results like these for your property? Call now for instant pricing.</p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className={`bg-ps-cyan font-bold text-[#06121f] hover:bg-brand-yellow-dark shadow-lg ${ctaPress}`}
              >
                <a href={businessPhoneTelHref}>
                  <Phone className="size-5 shrink-0" aria-hidden />
                  Call {businessPhoneDisplay} Now
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className={`border-2 border-ps-cyan/60 bg-transparent font-bold text-ps-cyan hover:bg-ps-cyan/10 hover:text-ps-cyan ${ctaPress}`}
              >
<<<<<<< HEAD
                <Link href="/contact">Request Callback</Link>
=======
                Request Callback
>>>>>>> origin/main
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
