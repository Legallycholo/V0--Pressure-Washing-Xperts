"use client"

import { useState } from "react"
import { Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface HeroProps {
  onOpenQuoteForm: () => void
}

export function Hero({ onOpenQuoteForm }: HeroProps) {
  // Kept for compatibility with parent props while CTA is phone-first.
  void onOpenQuoteForm
  const usStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
    "Wisconsin", "Wyoming",
  ]

  const howHeardOptions = [
    { value: "search", label: "Search / Google" },
    { value: "referral", label: "Referral / Friends & Family" },
    { value: "ai", label: "AI (ChatGPT, etc.)" },
  ]

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    zip: "",
    message: "",
    howHeard: "",
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      zip: "",
      message: "",
      howHeard: "",
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-brand-blue-dark via-[#1a2942] to-brand-blue pt-header-offset"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0 bg-hero-pattern opacity-10" />
      
      {/* Dynamic Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-dark/80 via-transparent to-brand-blue/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/90 via-transparent to-transparent" />
      </div>

      {/* Decorative Elements - Enhanced */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-yellow/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-blue-light/15 rounded-full blur-3xl animate-pulse-slower" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-3xl" />
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="animate-fade-in-up lg:col-span-7 text-center lg:text-left">
            <p className="mb-4 text-brand-yellow font-semibold text-sm sm:text-base tracking-[0.24em] uppercase">
              Atlanta&apos;s top-rated service
            </p>

            <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl xl:text-7xl">
              Professional Pressure Washing &{" "}
              <span className="block text-brand-blue-light mt-1">Soft Wash Cleaning</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-white/85 leading-relaxed sm:text-xl lg:mx-0 mx-auto">
              Restore your home or business with safe, effective exterior cleaning.
              PWNA-approved methods to protect your property and boost curb appeal.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm sm:text-base text-white/85 lg:justify-start">
              <span className="inline-flex items-center gap-2">
                <Check className="size-4 text-brand-blue-light" />
                Licensed & Insured
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="size-4 text-brand-blue-light" />
                PWNA Safety Standards
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="size-4 text-brand-blue-light" />
                Residential & Commercial
              </span>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-brand-yellow text-brand-blue-dark font-bold text-lg px-8 py-6 hover:bg-brand-yellow-dark transition-all duration-300 shadow-lg"
              >
                <a href="tel:800-451-7213">Call now</a>
              </Button>
            </div>
          </div>

          <div className="animate-fade-in-up lg:col-span-5">
            <div className="rounded-2xl bg-white/95 shadow-2xl border border-white/30 overflow-hidden backdrop-blur-sm">
              <div className="bg-brand-blue p-5 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white">Request a Fast Quote</h2>
                <p className="text-white/80 text-sm mt-1">
                  Frontend-only form structure for the new hero layout.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-6 sm:p-8">
                  <p className="text-lg font-semibold text-brand-blue-dark">Thanks! We got your request.</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    This demo is frontend-only for layout testing, with no backend integration.
                  </p>
                  <Button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-5 w-full bg-brand-yellow text-brand-blue-dark font-bold hover:bg-brand-yellow-dark"
                  >
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
                  <div>
                    <Label htmlFor="fullName" className="text-foreground">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-foreground">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-foreground">
                        Phone <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 123-4567"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <Label htmlFor="city" className="text-foreground">
                        City <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-foreground">
                        State <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.state}
                        onValueChange={(value) => handleSelectChange("state", value)}
                        required
                      >
                        <SelectTrigger className="mt-1 w-full">
                          <SelectValue placeholder="State" />
                        </SelectTrigger>
                        <SelectContent>
                          {usStates.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zip" className="text-foreground">
                        ZIP <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="zip"
                        name="zip"
                        type="text"
                        required
                        value={formData.zip}
                        onChange={handleInputChange}
                        placeholder="12345"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-foreground">
                      How Can We Help? <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project..."
                      className="mt-1 min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="howHeard" className="text-foreground">
                      How Did You Hear About Us? <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.howHeard}
                      onValueChange={(value) => handleSelectChange("howHeard", value)}
                      required
                    >
                      <SelectTrigger className="mt-1 w-full">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {howHeardOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-yellow text-brand-blue-dark font-bold hover:bg-brand-yellow-dark py-6 text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-5 animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Quote Request"
                    )}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Or call us directly at{" "}
                    <a href="tel:800-451-7213" className="text-brand-blue font-medium hover:underline">
                      (800)-451-7213
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
