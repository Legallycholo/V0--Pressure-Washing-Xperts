"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { galleryItemIsComparison, galleryItems } from "@/data/gallery"

type Comparison = {
  id: number
  title: string
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
      beforeSrc: item.beforeSrc!,
      afterSrc: item.afterSrc!,
      beforeAlt: item.beforeAlt!,
      afterAlt: item.afterAlt!,
      beforeObjectPosition: item.beforeObjectPosition,
      afterObjectPosition: item.afterObjectPosition,
    }))
}

const navButtonClass =
  "inline-flex size-10 items-center justify-center rounded-full border border-border bg-white text-brand-blue-dark transition-colors hover:border-brand-blue hover:text-brand-blue"

export function BeforeAfter() {
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
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Real results"
          title="See the difference"
          description="Drag the slider on real jobs from homes and businesses across Metro Atlanta."
        />

        <div className="mx-auto mt-10 max-w-3xl">
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

          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="min-w-0 truncate font-semibold text-brand-blue-dark">{current.title}</p>
            {showCarousel ? (
              <div className="flex shrink-0 items-center gap-3">
                <button type="button" onClick={goToPrevious} className={navButtonClass} aria-label="Previous comparison">
                  <ChevronLeft className="size-5" aria-hidden />
                </button>
                <span className="min-w-[3.5rem] text-center text-sm tabular-nums text-muted-foreground" aria-live="polite">
                  {currentIndex + 1} / {comparisons.length}
                </span>
                <button type="button" onClick={goToNext} className={navButtonClass} aria-label="Next comparison">
                  <ChevronRight className="size-5" aria-hidden />
                </button>
              </div>
            ) : null}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/gallery?category=before-after"
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:underline"
            >
              See every before &amp; after
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
