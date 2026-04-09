"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const comparisons = [
  {
    id: 1,
    title: "Driveway Cleaning",
    description: "Complete transformation of a heavily stained concrete driveway.",
    location: "Residential Property",
  },
  {
    id: 2,
    title: "Deck Restoration",
    description: "Wood deck restored from years of weathering and mold buildup.",
    location: "Family Home",
  },
  {
    id: 3,
    title: "Commercial Storefront",
    description: "Storefront sidewalk cleaning for improved customer experience.",
    location: "Retail Location",
  },
  {
    id: 4,
    title: "Roof Soft Wash",
    description: "Algae and moss removal using safe soft washing techniques.",
    location: "Residential Roof",
  },
]

interface BeforeAfterProps {
  onOpenQuoteForm: () => void
}

export function BeforeAfter({ onOpenQuoteForm }: BeforeAfterProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sliderPosition, setSliderPosition] = useState(50)

  const currentComparison = comparisons[currentIndex]

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

  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-brand-blue font-semibold text-sm uppercase tracking-wider mb-3">
            See The Difference
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            Before & After Results
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Slide to compare and see the dramatic transformations we achieve with our professional pressure washing services.
          </p>
        </div>

        {/* Comparison Container */}
        <div className="max-w-4xl mx-auto">
          {/* Main Comparison */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            {/* Before/After Container */}
            <div className="relative aspect-[16/10]">
              {/* After Image (Full width background) */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-brand-blue/40 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl font-bold mb-2">AFTER</div>
                  <p className="text-lg opacity-80">Clean & Restored</p>
                </div>
              </div>

              {/* Before Image (Clipped based on slider) */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-amber-900/60 to-gray-800/80 flex items-center justify-center"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <div className="text-center text-white">
                  <div className="text-6xl font-bold mb-2">BEFORE</div>
                  <p className="text-lg opacity-80">Dirty & Stained</p>
                </div>
              </div>

              {/* Slider Line */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
                style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
              >
                {/* Slider Handle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
                  <div className="flex gap-0.5">
                    <ChevronLeft className="size-5 text-brand-blue" />
                    <ChevronRight className="size-5 text-brand-blue" />
                  </div>
                </div>
              </div>

              {/* Slider Input (invisible, covers the whole area) */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={handleSliderChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                aria-label="Comparison slider"
              />

              {/* Labels */}
              <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                Before
              </div>
              <div className="absolute bottom-4 right-4 bg-white/90 text-brand-blue-dark px-3 py-1 rounded-full text-sm font-medium">
                After
              </div>
            </div>
          </div>

          {/* Info & Navigation */}
          <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Info */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-foreground mb-1">
                {currentComparison.title}
              </h3>
              <p className="text-muted-foreground mb-1">
                {currentComparison.description}
              </p>
              <p className="text-sm text-brand-blue font-medium">
                {currentComparison.location}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={goToPrevious}
                className="p-3 rounded-full bg-section-light hover:bg-brand-blue hover:text-white transition-colors"
                aria-label="Previous comparison"
              >
                <ChevronLeft className="size-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {comparisons.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index)
                      setSliderPosition(50)
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-brand-blue w-6"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to comparison ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="p-3 rounded-full bg-section-light hover:bg-brand-blue hover:text-white transition-colors"
                aria-label="Next comparison"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <p className="text-muted-foreground mb-4">
              Want results like these for your property?
            </p>
            <Button
              onClick={onOpenQuoteForm}
              size="lg"
              className="bg-brand-blue text-white font-bold hover:bg-brand-blue-light"
            >
              Get Your Free Quote Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
