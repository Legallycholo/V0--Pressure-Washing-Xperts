"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

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

const comparisons: Comparison[] = [
  {
    id: 1,
    title: "Driveway cleaning",
    description:
      "Heavy grime and staining removed from the same concrete slabs—slide to compare the transformation.",
    location: "Residential driveway",
    beforeSrc: "/before-after/driveway-before.png",
    afterSrc: "/before-after/driveway-after.png",
    beforeAlt:
      "Residential concrete driveway before cleaning, with dark stains and a covered vehicle on the left.",
    afterAlt:
      "Same driveway after professional washing, with a clean surface and matching framing to the before photo.",
    // Before: lower camera; after: more street-level—offset vertical anchor so garage, cover, and joints meet at the slider.
    beforeObjectPosition: "49% 44%",
    afterObjectPosition: "51% 54%",
  },
]

interface BeforeAfterProps {
  onOpenQuoteForm: () => void
}

export function BeforeAfter({ onOpenQuoteForm }: BeforeAfterProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sliderPosition, setSliderPosition] = useState(50)

  const current = comparisons[currentIndex]
  const showCarousel = comparisons.length > 1

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + comparisons.length) % comparisons.length)
    setSliderPosition(50)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % comparisons.length)
    setSliderPosition(50)
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value))
  }

  const clipBefore = `inset(0 ${100 - sliderPosition}% 0 0)`

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-blue">
            See The Difference
          </p>
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Before & After Results
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Slide to compare and see the transformations we achieve with professional pressure washing.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
            <div
              className="relative aspect-[4/3] select-none touch-pan-y"
              role="img"
              aria-label={`Before and after: ${current.title}. Slider at ${sliderPosition} percent.`}
            >
              {/* After: native assets are 4:3; matching aspect avoids extra crop skew vs a wider frame */}
              <Image
                src={current.afterSrc}
                alt={current.afterAlt}
                fill
                draggable={false}
                className="object-cover"
                style={{ objectPosition: current.afterObjectPosition ?? "50% 50%" }}
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />

              {/* Before: same object-fit + tuned object-position so static features line up at the slider edge */}
              <div
                className="absolute inset-0 z-[1]"
                style={{ clipPath: clipBefore }}
              >
                <Image
                  src={current.beforeSrc}
                  alt={current.beforeAlt}
                  fill
                  draggable={false}
                  className="object-cover"
                  style={{ objectPosition: current.beforeObjectPosition ?? "50% 50%" }}
                  sizes="(max-width: 896px) 100vw, 896px"
                  priority
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
                onChange={handleSliderChange}
                className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
                aria-label="Before and after comparison slider"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={sliderPosition}
              />

              <div className="pointer-events-none absolute bottom-3 left-3 z-[5] rounded-full bg-black/65 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                Before
              </div>
              <div className="pointer-events-none absolute bottom-3 right-3 z-[5] rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-brand-blue-dark shadow-sm backdrop-blur-sm">
                After
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <h3 className="mb-1 text-xl font-bold text-foreground">{current.title}</h3>
              <p className="mb-1 text-muted-foreground">{current.description}</p>
              <p className="text-sm font-medium text-brand-blue">{current.location}</p>
            </div>

            {showCarousel ? (
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="rounded-full bg-section-light p-3 transition-colors hover:bg-brand-blue hover:text-white"
                  aria-label="Previous comparison"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <div className="flex gap-2">
                  {comparisons.map((_, index) => (
                    <button
                      key={comparisons[index].id}
                      type="button"
                      onClick={() => {
                        setCurrentIndex(index)
                        setSliderPosition(50)
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
                  className="rounded-full bg-section-light p-3 transition-colors hover:bg-brand-blue hover:text-white"
                  aria-label="Next comparison"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            ) : null}
          </div>

          <div className="mt-10 text-center">
            <p className="mb-4 text-muted-foreground">Want results like these for your property?</p>
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
