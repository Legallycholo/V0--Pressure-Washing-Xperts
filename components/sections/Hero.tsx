"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { Check, CheckCircle, Loader2, Send } from "lucide-react"
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
import { formSelectContentPlacementProps } from "@/lib/formSelectContentProps"
import { ctaPress } from "@/lib/ctaInteraction"
import { CONTACT_FORM_STATES } from "@/data/contactFormStates"
import { modalCopyDefault } from "@/data/modalCopy"
import {
  offers,
  OFFER_NONE,
  isOfferId,
  type OfferId,
} from "@/data/offers"
import { submitLeadRequest } from "@/lib/submitLead"
import { trackLeadFormSubmit } from "@/lib/leadAnalytics"

interface HeroProps {
  onOpenQuoteForm: () => void
  /** From `?offer=` when claiming an offer; keeps hero and contact form in sync. */
  initialOfferId?: OfferId
}

export function Hero({ onOpenQuoteForm, initialOfferId }: HeroProps) {
  const pathname = usePathname()
  const howHeardOptions = [
    { value: "search", label: "Search / Google" },
    { value: "referral", label: "Referral / Friends & Family" },
    { value: "ai", label: "AI (ChatGPT, etc.)" },
  ]

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [formData, setFormData] = useState(() => ({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    zip: "",
    message: "",
    howHeard: "",
    selectedOffer: initialOfferId ?? OFFER_NONE,
  }))

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      selectedOffer: initialOfferId ?? OFFER_NONE,
    }))
  }, [initialOfferId])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    const sp =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams()
    const utmSource = sp.get("utm_source") ?? undefined
    const utmMedium = sp.get("utm_medium") ?? undefined
    const utmCampaign = sp.get("utm_campaign") ?? undefined

    const result = await submitLeadRequest({
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      message: formData.message,
      how_heard: formData.howHeard,
      selected_offer: formData.selectedOffer,
      submission_type: modalCopyDefault.badge,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      page_path: pathname ?? undefined,
    })

    setIsSubmitting(false)

    if (!result.ok) {
      setSubmitError(result.error)
      return
    }

    trackLeadFormSubmit({
      utmSource,
      utmMedium,
      utmCampaign,
      pagePath: pathname ?? undefined,
    })

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
      selectedOffer: initialOfferId ?? OFFER_NONE,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section
      id="hero"
      className="scroll-offset-header relative overflow-hidden bg-gradient-to-br from-brand-blue-dark via-[#1a2942] to-brand-blue pt-header-offset"
    >
      {/* Background image overlay */}
      <div className="absolute inset-0 z-0 bg-hero-pattern opacity-10" />
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-dark/80 via-transparent to-brand-blue/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/90 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-10 pb-10 sm:pb-12 lg:pb-14">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
          <div className="animate-fade-in-up lg:col-span-5 text-center lg:text-left hero-mobile-height flex flex-col justify-center lg:min-h-0">
            <p className="mb-3 text-brand-yellow font-semibold text-sm tracking-[0.24em] uppercase">
              Atlanta&apos;s top-rated service
            </p>

            <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
              Professional Pressure Washing &{" "}
              <span className="block text-brand-blue-light mt-1">Soft Wash Cleaning</span>
            </h1>

            <p className="mt-4 max-w-2xl text-base text-white/85 leading-relaxed sm:text-lg lg:mx-0 mx-auto">
              Restore your home or business with safe, effective exterior cleaning.
            </p>

            <div className="mt-5 hidden sm:flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-white/85 lg:justify-start">
              <span className="inline-flex items-center gap-2">
                <Check className="size-4 text-brand-blue-light" />
                Licensed & Insured
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="size-4 text-brand-blue-light" />
                14 Years Experience
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="size-4 text-brand-blue-light" />
                Residential & Commercial
              </span>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className={`w-full sm:w-auto bg-brand-yellow text-brand-blue-dark font-bold text-base px-6 py-4 hover:bg-brand-yellow-dark transition-all duration-300 shadow-lg min-h-[44px] ${ctaPress}`}
              >
                <a href="tel:800-451-7213">Call now</a>
              </Button>
              <Button
                type="button"
                onClick={onOpenQuoteForm}
                size="lg"
                className={`w-full sm:w-auto bg-transparent border-2 border-white/50 text-white font-semibold text-base px-6 py-4 hover:bg-white/10 hover:border-white transition-all duration-300 min-h-[44px] ${ctaPress}`}
              >
                Get your free estimate
              </Button>
            </div>
          </div>

          <div className="hidden lg:block animate-fade-in-up lg:col-span-7 lg:pl-6 xl:pl-10 2xl:pl-12">
            <div className="rounded-2xl bg-white/95 shadow-2xl border border-white/30 overflow-hidden backdrop-blur-sm">
              <div className="bg-brand-blue p-4 sm:p-5">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {modalCopyDefault.headline}
                </h2>
                {modalCopyDefault.subline ? (
                  <p className="text-white/80 text-sm mt-1">
                    {modalCopyDefault.subline}
                  </p>
                ) : null}
                <p className="mt-2 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                  {modalCopyDefault.badge}
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-5 sm:p-6 text-center">
                  <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="size-7 text-green-600" aria-hidden />
                  </div>
                  <p className="text-lg font-bold text-brand-blue-dark">Thank you!</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {modalCopyDefault.successLead}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {modalCopyDefault.successFollowUp}
                  </p>
                  <p className="mt-3 text-xs font-medium text-brand-blue">
                    Submission type: {modalCopyDefault.badge}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-4 sm:p-5 space-y-3 lg:grid lg:grid-cols-2 lg:gap-x-4 lg:gap-y-3 lg:space-y-0"
                >
                  <div className="lg:col-span-2">
                    <Label htmlFor="hero-selected-offer" className="text-foreground">
                      Offer <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.selectedOffer}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          selectedOffer:
                            value === OFFER_NONE || isOfferId(value)
                              ? value
                              : OFFER_NONE,
                        }))
                      }
                      required
                    >
                      <SelectTrigger
                        id="hero-selected-offer"
                        className="mt-1 w-full"
                      >
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent {...formSelectContentPlacementProps}>
                        <SelectItem value={OFFER_NONE}>
                          No offer: general quote only
                        </SelectItem>
                        {offers.map((o) => (
                          <SelectItem key={o.id} value={o.id}>
                            {o.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
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
                        placeholder="Your full name"
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                          onValueChange={(value) =>
                            handleSelectChange("state", value)
                          }
                          required
                        >
                          <SelectTrigger className="mt-1 w-full">
                            <SelectValue placeholder="State" />
                          </SelectTrigger>
                          <SelectContent {...formSelectContentPlacementProps}>
                            {CONTACT_FORM_STATES.map((state) => (
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
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="message" className="text-foreground">
                        Project details <span className="text-destructive">*</span>
                      </Label>
                      <p className="mt-1 text-xs text-muted-foreground leading-snug">
                        List surfaces, rough size, and when you want service.
                      </p>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Example: Two-story siding and front walk, medium lot, next week."
                        className="mt-2 min-h-[88px] lg:min-h-[120px] xl:min-h-[100px]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="howHeard" className="text-foreground">
                        How Did You Hear About Us?{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.howHeard}
                        onValueChange={(value) =>
                          handleSelectChange("howHeard", value)
                        }
                        required
                      >
                        <SelectTrigger className="mt-1 w-full">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent {...formSelectContentPlacementProps}>
                          {howHeardOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2 lg:col-span-2">
                    {submitError ? (
                      <p
                        className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
                        role="alert"
                      >
                        {submitError}
                      </p>
                    ) : null}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-yellow text-brand-blue-dark font-bold hover:bg-brand-yellow-dark py-4 text-base inline-flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="size-5 animate-spin shrink-0" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="size-5 shrink-0" aria-hidden />
                          {modalCopyDefault.submitLabel}
                        </>
                      )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground leading-relaxed">
                      {modalCopyDefault.trustNote}
                    </p>

                    <p className="text-center text-sm text-muted-foreground">
                      Or call us directly at{" "}
                      <a
                        href="tel:800-451-7213"
                        className="text-brand-blue font-medium hover:underline"
                      >
                        (800)-451-7213
                      </a>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Reads `?offer=` for the homepage hero so lead rows store the same offer id as the contact form. */
export function HeroWithOfferFromUrl(
  props: Omit<HeroProps, "initialOfferId">
) {
  const searchParams = useSearchParams()
  const raw = searchParams.get("offer")
  const initialOfferId = isOfferId(raw) ? raw : undefined
  return <Hero {...props} initialOfferId={initialOfferId} />
}
