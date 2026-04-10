"use client"

import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Customer Name",
    location: "City, State",
    rating: 5,
    text: "Placeholder testimonial text. The team at Pressure Washing Xperts did an amazing job on our driveway and patio. Highly recommend their services!",
    service: "Residential Cleaning",
  },
  {
    id: 2,
    name: "Customer Name",
    location: "City, State",
    rating: 5,
    text: "Placeholder testimonial text. Professional service from start to finish. Our commercial building looks brand new thanks to their expert pressure washing.",
    service: "Commercial Cleaning",
  },
  {
    id: 3,
    name: "Customer Name",
    location: "City, State",
    rating: 5,
    text: "Placeholder testimonial text. We manage several HOA communities and Pressure Washing Xperts handles all our pressure washing needs. Consistent quality every time.",
    service: "HOA & Community",
  },
  {
    id: 4,
    name: "Customer Name",
    location: "City, State",
    rating: 5,
    text: "Placeholder testimonial text. The roof soft wash service was exactly what our home needed. No damage, just a beautifully clean roof. Will use again!",
    service: "Roof Cleaning",
  },
  {
    id: 5,
    name: "Customer Name",
    location: "City, State",
    rating: 5,
    text: "Placeholder testimonial text. Quick response, fair pricing, and excellent results. Our warehouse floor has never looked this good. True professionals!",
    service: "Industrial Cleaning",
  },
  {
    id: 6,
    name: "Customer Name",
    location: "City, State",
    rating: 5,
    text: "Placeholder testimonial text. The before and after difference was incredible. Our brick pathway looks restored to its original beauty. Thank you!",
    service: "Masonry & Stone",
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
            {"Don't just take our word for it. Here's what our satisfied customers have to say about our services."}
          </p>
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
