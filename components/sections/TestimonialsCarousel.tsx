"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote, ExternalLink, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { GOOGLE_BUSINESS_REVIEW_URL } from "@/data/review-summary"
import type { GoogleReview } from "@/data/reviews"
import { cn } from "@/lib/utils"

interface TestimonialsCarouselProps {
  testimonials: GoogleReview[]
  reviewCount: number
  rating: number
}

const arrowClass =
  "inline-flex size-10 items-center justify-center rounded-full border border-border bg-white text-brand-blue-dark shadow-sm transition-colors hover:border-brand-blue hover:text-brand-blue"

function ReviewCard({ review, featured = false }: { review: GoogleReview; featured?: boolean }) {
  return (
    <figure
      className={cn(
        "relative flex h-full flex-col rounded-2xl border bg-white p-6",
        featured ? "border-brand-blue/40 shadow-[0_16px_40px_-24px_rgba(27,108,181,0.6)]" : "border-border"
      )}
    >
      <Quote className="absolute right-5 top-5 size-7 text-accent" aria-hidden />
      <div className="flex items-center gap-2 pr-8">
        <div className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} className="size-4 fill-amber-400 text-amber-400" aria-hidden />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">{review.timeAgo}</span>
      </div>

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
        <p className="line-clamp-6">{review.text ? `“${review.text}”` : "Rating-only review"}</p>
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-brand-blue">
          {review.author.charAt(0).toUpperCase()}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-brand-blue-dark">{review.author}</span>
          <span className="block truncate text-xs text-muted-foreground">
            Google review · {review.serviceLabel}
          </span>
        </span>
      </figcaption>
    </figure>
  )
}

export function TestimonialsCarousel({
  testimonials,
  reviewCount,
  rating,
}: TestimonialsCarouselProps) {
  const prefersReduced = useReducedMotion()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  // Pause while the user is reading: hover, focus, or touch (WCAG 2.2.2)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || isPaused || prefersReduced) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, isPaused, prefersReduced, testimonials.length])

  const handleSwipeEnd = (
    _e: unknown,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const power = info.offset.x + info.velocity.x * 0.2
    if (power < -60) goToNext()
    else if (power > 60) goToPrevious()
  }

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  // Desktop shows three cards at a time, starting at the current index
  const visibleTestimonials = [0, 1, 2].map(
    (offset) => testimonials[(currentIndex + offset) % testimonials.length]
  )

  return (
    <section id="testimonials" className="overflow-hidden bg-section-light py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Google reviews"
          title="What our customers say"
          description={
            <>
              Rated <strong className="font-semibold text-brand-blue-dark">{rating.toFixed(1)} out of 5</strong> across{" "}
              {reviewCount} Google reviews.
            </>
          }
        />

        <div
          className="relative mt-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          aria-live="polite"
        >
          {/* Desktop: three cards */}
          <div className="hidden gap-4 md:grid md:grid-cols-3">
            {visibleTestimonials.map((testimonial, index) => (
              <ReviewCard key={`${testimonial.id}-${index}`} review={testimonial} featured={index === 1} />
            ))}
          </div>

          {/* Mobile: one swipeable card */}
          <div className="touch-pan-y md:hidden">
            <motion.div
              key={currentIndex}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={handleSwipeEnd}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ReviewCard review={testimonials[currentIndex]} />
            </motion.div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button type="button" onClick={goToPrevious} className={arrowClass} aria-label="Previous review">
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <span className="min-w-[3.5rem] text-center text-sm tabular-nums text-muted-foreground">
            {currentIndex + 1} / {testimonials.length}
          </span>
          <button type="button" onClick={goToNext} className={arrowClass} aria-label="Next review">
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/reviews">
              Read all {reviewCount} reviews
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a
              href={GOOGLE_BUSINESS_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View all reviews on Google (opens in a new tab)"
            >
              See reviews on Google
              <ExternalLink className="size-4" aria-hidden />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
