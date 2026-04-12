"use client"

import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider"
import { galleryItemIsComparison, galleryItems } from "@/data/gallery"

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

const HOMEPAGE_BLURB =
  "Slide the handle to compare the same property before and after our wash."

function buildComparisons(): Comparison[] {
  return galleryItems
    .filter((item) => item.category === "before-after" && galleryItemIsComparison(item))
    .sort((a, b) => a.id - b.id)
    .map((item) => ({
      id: item.id,
      title: item.title,
      description: HOMEPAGE_BLURB,
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
  onOpenQuoteForm: () => void
}

export function BeforeAfter({ onOpenQuoteForm }: BeforeAfterProps) {
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
    <section className="bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-blue">
            See The Difference
          </p>
          <h2 className="text-balance text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            Before & After Results
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
            Slide to compare and see the transformations we achieve with professional pressure washing.
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

          <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <h3 className="mb-1 text-lg font-bold text-foreground">{current.title}</h3>
              <p className="mb-1 text-muted-foreground">{current.description}</p>
              <p className="text-sm font-medium text-brand-blue">{current.location}</p>
            </div>

            {showCarousel ? (
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="rounded-full bg-section-light p-2.5 transition-colors hover:bg-brand-blue hover:text-white"
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
                          ? "w-6 bg-brand-blue"
                          : "w-2 bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to comparison ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={goToNext}
                  className="rounded-full bg-section-light p-2.5 transition-colors hover:bg-brand-blue hover:text-white"
                  aria-label="Next comparison"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            ) : null}
          </div>

          <div className="mt-7 text-center">
            <p className="mb-3 text-muted-foreground text-sm sm:text-base">Want results like these for your property?</p>
            <Button
              onClick={onOpenQuoteForm}
              size="lg"
              className="bg-brand-blue font-bold text-white hover:bg-brand-blue-light"
            >
              Get Your Free Quote Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
