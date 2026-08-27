"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote, ExternalLink, ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  GOOGLE_REVIEWS,
  GOOGLE_BUSINESS_REVIEW_URL,
  getReviewStats,
  type GoogleReview,
} from "@/data/reviews"

export function Testimonials() {
  const prefersReduced = useReducedMotion()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  // Pause while the user is reading: hover, focus, or touch (WCAG 2.2.2)
  const [isPaused, setIsPaused] = useState(false)

  // Use top curated real Google reviews for homepage carousel
  const testimonials = GOOGLE_REVIEWS.slice(0, 15)
  const stats = getReviewStats()

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || isPaused || prefersReduced) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
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

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  // Get visible testimonials for desktop (3 at a time)
  const getVisibleTestimonials = () => {
    const items: (GoogleReview & { displayIndex: number })[] = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length
      items.push({ ...testimonials[index], displayIndex: i })
    }
    return items
  }

  return (
    <section id="testimonials" className="py-14 sm:py-16 lg:py-20 bg-section-dark overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-9">
          <p className="text-ps-cyan font-semibold text-sm uppercase tracking-[0.28em] mb-2">
            Verified Testimonials
          </p>
          <h2 className="font-display uppercase tracking-wide text-white text-4xl sm:text-5xl lg:text-6xl">
            What Our <span className="text-ps-cyan text-glow-cyan">Customers Say</span>
          </h2>
          <p className="mt-3 text-ps-text-muted max-w-2xl mx-auto text-base">
            {"Don't just take our word for it."} Rated{" "}
            <span className="text-yellow-400 font-semibold">5.0 ★</span> across{" "}
            <span className="text-white font-semibold">{stats.displayCount} verified Google reviews</span>.
          </p>
          <div className="mt-5 flex flex-wrap justify-center items-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-brand-yellow text-brand-blue-dark font-bold hover:bg-brand-yellow-dark gap-2 shadow-lg"
            >
              <Link href="/reviews">
                View All {stats.total} Reviews
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white bg-transparent hover:bg-white/10 gap-2"
            >
              <a
                href={GOOGLE_BUSINESS_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Leave us a review on Google (opens in a new tab)"
              >
                Leave us a review
                <ExternalLink className="size-4" aria-hidden />
              </a>
            </Button>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          aria-live="polite"
        >
          {/* Desktop View - 3 cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-4">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className={`relative flex flex-col justify-between rounded-xl p-5 transition-all duration-500 ${
                  index === 1
                    ? "bg-white/10 border-2 border-brand-yellow scale-[1.02] shadow-xl shadow-brand-yellow/10"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                <div>
                  {/* Quote Icon */}
                  <Quote className="absolute top-3 right-3 size-8 text-ps-cyan/25" />

                  {/* Rating + Time */}
                  <div className="flex items-center justify-between mb-3 pr-8">
                    <div className="flex gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs text-white/50">{testimonial.timeAgo}</span>
                  </div>

                  {/* Text */}
                  <p className="text-white/85 text-sm leading-relaxed mb-4 min-h-[72px]">
                    {`"${testimonial.text}"`}
                  </p>
                </div>

                <div>
                  {/* Author */}
                  <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-ps-cyan flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {testimonial.author.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-white text-sm truncate flex items-center gap-1.5">
                        <span>{testimonial.author}</span>
                        {testimonial.isLocalGuide && (
                          <span className="text-[10px] font-normal text-orange-400 bg-orange-400/10 px-1 py-0.2 rounded inline-flex items-center gap-0.5">
                            <ShieldCheck className="size-2.5" /> Guide
                          </span>
                        )}
                      </p>
                      <p className="text-white/50 text-xs">Google Verified Review</p>
                    </div>
                  </div>

                  {/* Service Badge */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-block bg-brand-yellow/20 text-brand-yellow text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {testimonial.serviceLabel}
                    </div>
                    {testimonial.highlightTag && (
                      <span className="text-[11px] text-white/50 italic">
                        {testimonial.highlightTag}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View - Single swipeable card */}
          <div className="md:hidden touch-pan-y">
            <motion.div
              key={currentIndex}
              className="relative flex flex-col justify-between rounded-xl bg-white/10 border border-white/10 p-5 min-h-[260px]"
              drag={prefersReduced ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={handleSwipeEnd}
              initial={prefersReduced ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                {/* Quote Icon */}
                <Quote className="absolute top-3 right-3 size-8 text-ps-cyan/25" />

                {/* Rating */}
                <div className="flex items-center justify-between mb-3 pr-8">
                  <div className="flex gap-1">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-white/50">{testimonials[currentIndex].timeAgo}</span>
                </div>

                {/* Text */}
                <p className="text-white/90 text-sm leading-relaxed mb-4">
                  {`"${testimonials[currentIndex].text}"`}
                </p>
              </div>

              <div>
                {/* Author */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-ps-cyan flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {testimonials[currentIndex].author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">
                      {testimonials[currentIndex].author}
                    </p>
                    <p className="text-white/50 text-xs">Google Verified Review</p>
                  </div>
                </div>

                {/* Service Badge */}
                <div className="mt-3 flex items-center justify-between">
                  <div className="inline-block bg-brand-yellow/20 text-brand-yellow text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {testimonials[currentIndex].serviceLabel}
                  </div>
                  {testimonials[currentIndex].highlightTag && (
                    <span className="text-[11px] text-white/50 italic">
                      {testimonials[currentIndex].highlightTag}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
            <p className="mt-2 text-center text-xs text-white/40" aria-hidden>
              Swipe to see more reviews
            </p>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 p-3 rounded-full bg-white/10 text-white hover:bg-brand-yellow hover:text-brand-blue-dark transition-colors hidden md:block"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 p-3 rounded-full bg-white/10 text-white hover:bg-brand-yellow hover:text-brand-blue-dark transition-colors hidden md:block"
            aria-label="Next testimonial"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-brand-yellow w-6"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile Navigation Arrows */}
        <div className="flex justify-center gap-4 mt-4 md:hidden">
          <button
            onClick={goToPrevious}
            className="p-3 min-h-[44px] min-w-[44px] rounded-full bg-white/10 text-white hover:bg-brand-yellow hover:text-brand-blue-dark transition-colors flex items-center justify-center"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={goToNext}
            className="p-3 min-h-[44px] min-w-[44px] rounded-full bg-white/10 text-white hover:bg-brand-yellow hover:text-brand-blue-dark transition-colors flex items-center justify-center"
            aria-label="Next testimonial"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

      </div>
    </section>
  )
}
