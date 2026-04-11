"use client"

import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight, Quote, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const GOOGLE_BUSINESS_REVIEW_URL =
  "https://www.google.com/maps/place/Pressure+Washing+Xperts/@33.6543368,-84.2940254,12z/data=!4m12!1m2!2m1!1sPressure+Washing+Xperts+LLC+dekalb!3m8!1s0x88f4ff586effbf87:0xdce4ba9e7e2c13d9!8m2!3d33.6542916!4d-84.2938419!9m1!1b1!15sCiJQcmVzc3VyZSBXYXNoaW5nIFhwZXJ0cyBMTEMgZGVrYWxiWiQiInByZXNzdXJlIHdhc2hpbmcgeHBlcnRzIGxsYyBkZWthbGKSARhwcmVzc3VyZV93YXNoaW5nX3NlcnZpY2WaAURDaTlEUVVsUlFVTnZaRU5vZEhsalJqbHZUMjV3UzJScVdYUk5WM2hoVVZkS1JGUnNSbmxWU0ZJelRsUkdhRTFJWXhBQuABAPoBBAgAED4!16s%2Fg%2F11vpwbzydj?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D"

const testimonials = [
  {
    id: 1,
    name: "Giselle",
    location: "Atlanta, GA",
    rating: 5,
    text: "Arthur did an amazing job! My house looks brand new! He did a walk through with me and fully explained what to expect. Will definitely use his services again. Try him! You won't regret it.",
    service: "House Washing",
    source: "Groupon · Top Reviewer",
  },
  {
    id: 2,
    name: "Jasmin",
    location: "Atlanta, GA",
    rating: 5,
    text: "Arthur was prompt and professional. He did an amazing job pressure washing my home and patio area. Will definitely use him again!",
    service: "House & Patio Washing",
    source: "Google · Top Reviewer",
  },
  {
    id: 3,
    name: "Keera",
    location: "Atlanta, GA",
    rating: 5,
    text: "Great communication and speedy service! Worked diligently around our home and has it looking brand new. Most definitely recommend!",
    service: "Residential Cleaning",
    source: "Groupon · Verified Review",
  },
  {
    id: 4,
    name: "Lynette",
    location: "Atlanta, GA",
    rating: 5,
    text: "Art did an amazing job on the house. He was thorough and on time. My house looks as good as the day we moved in.",
    service: "House Washing",
    source: "Google · Verified Review",
  },
  {
    id: 5,
    name: "Ben",
    location: "Atlanta, GA",
    rating: 5,
    text: "Was able to come to do the job very quickly, great service and will use again!",
    service: "Pressure Washing",
    source: "Google · Verified Review",
  },
  {
    id: 6,
    name: "Yvonne",
    location: "Atlanta, GA",
    rating: 5,
    text: "Great service.",
    service: "Residential Cleaning",
    source: "Groupon · Verified Review",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

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
    const items = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length
      items.push({ ...testimonials[index], displayIndex: i })
    }
    return items
  }

  return (
    <section id="testimonials" className="py-20 bg-section-dark overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-brand-yellow font-semibold text-sm uppercase tracking-wider mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl text-balance">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto text-lg">
            {"Don't just take our word for it."} Rated{" "}
            <span className="text-brand-yellow font-semibold">5.0 ★</span> across{" "}
            <span className="text-white font-semibold">32+ verified reviews</span>{" "}
            on Google &amp; Groupon.
          </p>
          <div className="mt-6 flex justify-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-brand-yellow/80 text-brand-yellow hover:bg-brand-yellow hover:text-brand-blue-dark gap-2"
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
        <div className="relative">
          {/* Desktop View - 3 cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className={`relative rounded-xl p-6 transition-all duration-500 ${
                  index === 1
                    ? "bg-white/10 border-2 border-brand-yellow scale-105"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                {/* Quote Icon */}
                <Quote className="absolute top-4 right-4 size-8 text-brand-yellow/20" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="size-4 fill-brand-yellow text-brand-yellow" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-white/80 text-sm leading-relaxed mb-6 min-h-[100px]">
                  {`"${testimonial.text}"`}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  {/* Avatar Placeholder */}
                  <div className="w-12 h-12 rounded-full bg-brand-blue/30 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-white/60 text-sm">{testimonial.location}</p>
                    <p className="text-white/40 text-xs mt-0.5">{testimonial.source}</p>
                  </div>
                </div>

                {/* Service Badge */}
                <div className="mt-4 inline-block bg-brand-yellow/20 text-brand-yellow text-xs font-medium px-3 py-1 rounded-full">
                  {testimonial.service}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View - Single card */}
          <div className="md:hidden">
            <div className="relative rounded-xl bg-white/10 border border-white/10 p-6">
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 size-8 text-brand-yellow/20" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="size-4 fill-brand-yellow text-brand-yellow" />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                {`"${testimonials[currentIndex].text}"`}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-blue/30 flex items-center justify-center text-white font-bold">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonials[currentIndex].name}</p>
                  <p className="text-white/60 text-sm">{testimonials[currentIndex].location}</p>
                  <p className="text-white/40 text-xs mt-0.5">{testimonials[currentIndex].source}</p>
                </div>
              </div>

              {/* Service Badge */}
              <div className="mt-4 inline-block bg-brand-yellow/20 text-brand-yellow text-xs font-medium px-3 py-1 rounded-full">
                {testimonials[currentIndex].service}
              </div>
            </div>
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
        <div className="flex justify-center gap-2 mt-8">
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
        <div className="flex justify-center gap-4 mt-6 md:hidden">
          <button
            onClick={goToPrevious}
            className="p-3 rounded-full bg-white/10 text-white hover:bg-brand-yellow hover:text-brand-blue-dark transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={goToNext}
            className="p-3 rounded-full bg-white/10 text-white hover:bg-brand-yellow hover:text-brand-blue-dark transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

      </div>
    </section>
  )
}
