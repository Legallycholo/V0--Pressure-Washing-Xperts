"use client"

import { useId, useState } from "react"
import { CheckCircle, Loader2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formSelectContentPlacementProps } from "@/lib/formSelectContentProps"
import { cn } from "@/lib/utils"
import type { OfferId } from "@/data/offers"
import { offers, OFFER_NONE } from "@/data/offers"
import { modalCopyDefault } from "@/data/modalCopy"
import { CONTACT_FORM_STATES } from "@/data/contactFormStates"

export type QuoteFormCopy = typeof modalCopyDefault

const howHeardOptions = [
  { value: "search", label: "Search / Google" },
  { value: "referral", label: "Referral / Friends & Family" },
  { value: "ai", label: "AI (ChatGPT, etc.)" },
]

const emptyForm = () => ({
  fullName: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  zip: "",
  message: "",
  howHeard: "",
  selectedOffer: OFFER_NONE as typeof OFFER_NONE | OfferId,
})

export interface ContactQuoteFormProps {
  variant: "modal" | "inline"
  copy: QuoteFormCopy
  showOfferSelect?: boolean
  initialOfferId?: OfferId
  /** Called after the success message is shown (e.g. modal close). */
  onAfterSuccess?: () => void
  className?: string
}

export function ContactQuoteForm({
  variant,
  copy,
  showOfferSelect = true,
  initialOfferId,
  onAfterSuccess,
  className,
}: ContactQuoteFormProps) {
  const uid = useId()
  const fieldId = (name: string) => `${uid}-${name}`

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState(() => ({
    ...emptyForm(),
    selectedOffer: initialOfferId ?? OFFER_NONE,
  }))

  const openedWithOfferIntent = Boolean(initialOfferId)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    console.info("Form submitted", {
      submissionType: copy.badge,
      openedWithOfferIntent,
      ...formData,
    })

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    window.setTimeout(() => {
      if (variant === "inline") {
        setIsSubmitted(false)
        setFormData({
          ...emptyForm(),
          selectedOffer: initialOfferId ?? OFFER_NONE,
        })
      }
      onAfterSuccess?.()
    }, 3000)
  }

  const isInline = variant === "inline"
  const labelClass = isInline ? "text-white/85" : "text-foreground"
  const fieldClass = isInline
    ? "mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/45 focus-visible:ring-brand-yellow/40"
    : "mt-1"
  const selectTriggerClass = cn(
    "mt-1 w-full",
    isInline &&
      "bg-white/10 border-white/20 text-white data-[placeholder]:text-white/45 [&_svg]:text-white/50 focus-visible:ring-brand-yellow/40"
  )

  if (isSubmitted) {
    return (
      <div
        className={cn(
          "animate-success-pop-in text-center",
          isInline ? "py-10 px-4" : "p-8",
          className
        )}
      >
        <div className="mb-6">
          <div
            className={cn(
              "mx-auto w-16 h-16 rounded-full flex items-center justify-center",
              isInline ? "bg-white/10" : "bg-green-100"
            )}
          >
            <CheckCircle
              className={cn(
                "size-8",
                isInline ? "text-emerald-400" : "text-green-600"
              )}
            />
          </div>
        </div>
        <h3
          className={cn(
            "text-2xl font-bold mb-2",
            isInline ? "text-white" : "text-foreground"
          )}
        >
          Thank You!
        </h3>
        <p
          className={cn(
            "mb-4",
            isInline ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {copy.successLead}
        </p>
        <p
          className={cn(
            "mb-4 text-sm",
            isInline ? "text-white/65" : "text-muted-foreground"
          )}
        >
          {copy.successFollowUp}
        </p>
        {openedWithOfferIntent && copy.successExtra ? (
          <p
            className={cn(
              "text-sm mb-4",
              isInline ? "text-white/65" : "text-muted-foreground"
            )}
          >
            {copy.successExtra}
          </p>
        ) : null}
        <p
          className={cn(
            "text-xs font-medium",
            isInline ? "text-brand-yellow" : "text-brand-blue"
          )}
        >
          Submission Type: {copy.badge}
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      {!isInline ? (
        <div className="bg-brand-blue p-6 rounded-t-2xl">
          <h2 className="text-xl font-bold text-white">{copy.headline}</h2>
          {copy.subline ? (
            <p className="text-white/80 text-sm mt-1">{copy.subline}</p>
          ) : null}
          <p className="mt-2 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
            {copy.badge}
          </p>
        </div>
      ) : (
        <div className={cn("mb-6", !copy.subline && "mb-4")}>
          <h3 className="text-xl font-bold text-white">{copy.headline}</h3>
          {copy.subline ? (
            <p className="text-white/70 text-sm mt-1">{copy.subline}</p>
          ) : null}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={cn("space-y-4", !isInline && "p-6")}
      >
        {showOfferSelect ? (
          <div>
            <Label htmlFor={fieldId("selectedOffer")} className={labelClass}>
              Offer <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.selectedOffer}
              onValueChange={(value) =>
                handleSelectChange("selectedOffer", value)
              }
              required
            >
              <SelectTrigger
                id={fieldId("selectedOffer")}
                className={cn(!isInline && "mt-1 w-full", isInline && selectTriggerClass)}
              >
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent {...formSelectContentPlacementProps}>
                <SelectItem value={OFFER_NONE}>
                  No offer — general quote only
                </SelectItem>
                {offers.map((o) => (
                  <SelectItem key={o.id} value={o.id}>
                    {o.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : null}

        <div>
          <Label htmlFor={fieldId("fullName")} className={labelClass}>
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id={fieldId("fullName")}
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Your full name"
            className={fieldClass}
            autoComplete="name"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={fieldId("email")} className={labelClass}>
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id={fieldId("email")}
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              className={fieldClass}
              autoComplete="email"
            />
          </div>
          <div>
            <Label htmlFor={fieldId("phone")} className={labelClass}>
              Phone <span className="text-destructive">*</span>
            </Label>
            <Input
              id={fieldId("phone")}
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="(555) 123-4567"
              className={fieldClass}
              autoComplete="tel"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor={fieldId("city")} className={labelClass}>
              City <span className="text-destructive">*</span>
            </Label>
            <Input
              id={fieldId("city")}
              name="city"
              type="text"
              required
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              className={fieldClass}
              autoComplete="address-level2"
            />
          </div>
          <div>
            <Label htmlFor={fieldId("state")} className={labelClass}>
              State <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.state}
              onValueChange={(value) => handleSelectChange("state", value)}
              required
            >
              <SelectTrigger
                id={fieldId("state")}
                className={cn(!isInline && "mt-1 w-full", isInline && selectTriggerClass)}
              >
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
            <Label htmlFor={fieldId("zip")} className={labelClass}>
              ZIP <span className="text-destructive">*</span>
            </Label>
            <Input
              id={fieldId("zip")}
              name="zip"
              type="text"
              required
              value={formData.zip}
              onChange={handleInputChange}
              placeholder="12345"
              className={fieldClass}
              autoComplete="postal-code"
            />
          </div>
        </div>

        <div>
          <Label htmlFor={fieldId("message")} className={labelClass}>
            Project details <span className="text-destructive">*</span>
          </Label>
          <p
            className={cn(
              "mt-1 text-xs leading-snug",
              isInline ? "text-white/55" : "text-muted-foreground"
            )}
          >
            Surfaces (siding, driveway, deck, roof, etc.), rough size or photos
            if you have them, and when you would like service.
          </p>
          <Textarea
            id={fieldId("message")}
            name="message"
            required
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Example: Two-story vinyl siding + front concrete walk. Medium lot. Hoping for next week."
            className={cn("mt-2 min-h-[100px]", isInline && fieldClass)}
          />
        </div>

        <div>
          <Label htmlFor={fieldId("howHeard")} className={labelClass}>
            How Did You Hear About Us?{" "}
            <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.howHeard}
            onValueChange={(value) => handleSelectChange("howHeard", value)}
            required
          >
            <SelectTrigger
              id={fieldId("howHeard")}
              className={cn(!isInline && "mt-1 w-full", isInline && selectTriggerClass)}
            >
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

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-yellow text-brand-blue-dark font-bold hover:bg-brand-yellow-dark py-6 text-lg inline-flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-5 animate-spin shrink-0" />
              Sending...
            </>
          ) : (
            <>
              <Send className="size-5 shrink-0" aria-hidden />
              {copy.submitLabel}
            </>
          )}
        </Button>

        <p
          className={cn(
            "text-center text-xs leading-relaxed",
            isInline ? "text-white/50" : "text-muted-foreground"
          )}
        >
          {copy.trustNote}
        </p>

        <p
          className={cn(
            "text-center text-sm",
            isInline ? "text-white/55" : "text-muted-foreground"
          )}
        >
          Or call us directly at{" "}
          <a
            href="tel:800-451-7213"
            className={cn(
              "font-medium hover:underline",
              isInline ? "text-brand-yellow" : "text-brand-blue"
            )}
          >
            (800)-451-7213
          </a>
        </p>
      </form>
    </div>
  )
}
