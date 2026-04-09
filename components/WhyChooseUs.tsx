"use client"

import Image from "next/image"
import { CheckCircle, Star, Clock, Shield, Award, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Fully licensed and insured professionals. Your property is protected with our comprehensive coverage.",
  },
  {
    icon: Star,
    title: "5-Star Service",
    description: "Consistently rated 5 stars by our customers. We take pride in delivering exceptional results.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Quick response times and efficient service. We work around your schedule to minimize disruption.",
  },
  {
    icon: Wrench,
    title: "Professional Equipment",
    description: "State-of-the-art pressure washing equipment for superior cleaning without surface damage.",
  },
  {
    icon: Award,
    title: "Satisfaction Guaranteed",
    description: "We stand behind our work with a 100% satisfaction guarantee on every project.",
  },
  {
    icon: CheckCircle,
    title: "Free Estimates",
    description: "No obligation quotes. We provide detailed estimates so you know exactly what to expect.",
  },
]

interface WhyChooseUsProps {
  onOpenQuoteForm: () => void
}

export function WhyChooseUs({ onOpenQuoteForm }: WhyChooseUsProps) {
  return (
    <section id="why-us" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="order-2 lg:order-1">
            {/* Section Header */}
            <p className="text-brand-blue font-semibold text-sm uppercase tracking-wider mb-3">
              Why Choose Us
            </p>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance mb-6">
              The Trusted Choice for
              <span className="text-brand-blue"> Pressure Washing</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              With years of experience serving residential, commercial, and industrial clients, 
              we have built a reputation for quality workmanship and exceptional customer service.
            </p>

            {/* Features Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`flex gap-4 animate-fade-in-up stagger-${index + 1}`}
                  style={{ opacity: 0 }}
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                      <feature.icon className="size-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10">
              <Button
                onClick={onOpenQuoteForm}
                size="lg"
                className="bg-brand-blue text-white font-bold hover:bg-brand-blue-light"
              >
                Get Your Free Quote
              </Button>
            </div>
          </div>

          {/* Right Column - Image & Mascot */}
          <div className="order-1 lg:order-2 relative">
            {/* Background Shape */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-brand-yellow/10 rounded-3xl -rotate-3" />
            
            {/* Main Image Placeholder */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-section-dark to-brand-blue flex items-center justify-center">
                <div className="text-center text-white/30">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-4xl">IMG</span>
                  </div>
                  <p>Work Image Placeholder</p>
                </div>
              </div>
            </div>

            {/* Mascot Overlay */}
            <div className="absolute -bottom-6 -right-6 z-10">
              <Image
                src="/images/mascot.png"
                alt="Pressure Washing Expert"
                width={180}
                height={220}
                className="h-44 w-auto drop-shadow-2xl"
              />
            </div>

            {/* Stats Badge */}
            <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4 z-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-blue">500+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
            </div>

            {/* Rating Badge */}
            <div className="absolute top-1/2 -right-4 bg-brand-yellow rounded-xl shadow-lg p-4 z-10">
              <div className="text-center">
                <div className="flex gap-1 justify-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-brand-blue-dark text-brand-blue-dark" />
                  ))}
                </div>
                <div className="text-sm font-semibold text-brand-blue-dark">5.0 Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
