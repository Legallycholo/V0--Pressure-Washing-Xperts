"use client"

import { useId, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
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
import {
  offers,
  OFFER_NONE,
  OFFER_PRICING_SQFT_DISCLAIMER,
} from "@/data/offers"
import { modalCopyDefault } from "@/data/modalCopy"
import { CONTACT_FORM_STATES } from "@/data/contactFormStates"
import {
  isValidApproxSqftEstimateForStorage,
  SQFT_RANGE_OPTIONS,
} from "@/data/sqftEstimateOptions"
import { submitLeadRequest } from "@/lib/submitLead"

export type QuoteFormCopy = typeof modalCopyDefault

const howHeardOptions = [
  { value: "google-ad", label: "Google Ad" },
  { value: "search", label: "Google Search (organic)" },
  { value: "referral", label: "Referral / Friends & Family" },
  { value: "nextdoor", label: "Nextdoor" },
  { value: "social", label: "Social Media (Facebook/Instagram)" },
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
  approxSqftEstimate: "",
  selectedOffer: OFFER_NONE as typeof OFFER_NONE | OfferId,
})

export interface ContactQuoteFormProps {
  variant: "modal" | "inline"
  copy: QuoteFormCopy
  showOfferSelect?: boolean
  initialOfferId?: OfferId
  className?: string
  /** When set, successful submit navigates here (e.g. homepage /#contact form → /thank-you). */
  successRedirectHref?: string
}

export function ContactQuoteForm({
  variant,
  copy,
  showOfferSelect = true,
  initialOfferId,
  className,
  successRedirectHref,
}: ContactQuoteFormProps) {
  const uid = useId()
  const fieldId = (name: string) => `${uid}-${name}`
  const pathname = usePathname()
  const router = useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [formStep, setFormStep] = useState<1 | 2 | 3>(1)
  const [stepError, setStepError] = useState<string | null>(null)
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

  const handleNextStep = () => {
    setStepError(null)
    if (formStep === 1) {
      setFormStep(2)
      return
    }
    if (formStep === 2) {
      const { fullName, email, phone, howHeard } = formData
      if (!fullName.trim() || !email.trim() || !phone.trim() || !howHeard.trim()) {
        setStepError("Please fill in all fields before continuing.")
        return
      }
      setFormStep(3)
    }
  }

  const handleBackStep = () => {
    setStepError(null)
    setFormStep((s) => (s <= 1 ? 1 : ((s - 1) as 1 | 2 | 3)))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formStep !== 3) return

    if (!isValidApproxSqftEstimateForStorage(formData.approxSqftEstimate)) {
      setSubmitError("Please select approximate square footage.")
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

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
      approx_sqft_estimate: formData.approxSqftEstimate,
      submission_type: "Free on-site quote",
      page_path: pathname ?? undefined,
    })

    setIsSubmitting(false)

    if (!result.ok) {
      setSubmitError(result.error)
      return
    }

    if (successRedirectHref) {
      const qs =
        typeof window !== "undefined" ? window.location.search ?? "" : ""
      router.push(`${successRedirectHref}${qs}`)
      return
    }

    setIsSubmitted(true)
    setFormStep(1)
    setStepError(null)
    setFormData({
      ...emptyForm(),
      selectedOffer: initialOfferId ?? OFFER_NONE,
    })
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
          isInline ? "py-8 px-3" : "p-6",
          className
        )}
      >
        <div className="mb-4">
          <div
            className={cn(
              "mx-auto w-14 h-14 rounded-full flex items-center justify-center",
              isInline ? "bg-white/10" : "bg-green-100"
            )}
          >
            <CheckCircle
              className={cn(
                "size-7",
                isInline ? "text-emerald-400" : "text-green-600"
              )}
            />
          </div>
        </div>
        <h3
          className={cn(
            "text-xl font-bold mb-2",
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
        <div className="bg-brand-blue p-4 rounded-t-2xl">
          <h2 className="text-lg font-bold text-white">{copy.headline}</h2>
          {copy.subline ? (
            <p className="text-white/80 text-sm mt-1">{copy.subline}</p>
          ) : null}
          <p className="mt-2 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
            {copy.badge}
          </p>
        </div>
      ) : (
        <div className={cn("mb-4", !copy.subline && "mb-3")}>
          <h3 className="text-lg font-bold text-white">{copy.headline}</h3>
          {copy.subline ? (
            <p className="text-white/70 text-sm mt-1">{copy.subline}</p>
          ) : null}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={cn("space-y-4", !isInline && "p-4")}
        noValidate
      >
        {/* Progress indicator */}
        <div className="space-y-2">
          <p className={cn("text-center text-sm font-semibold", isInline ? "text-white/80" : "text-foreground")}>
            Step {formStep} of 3
          </p>
          <div
            className="flex gap-1.5"
            role="progressbar"
            aria-valuenow={formStep}
            aria-valuemin={1}
            aria-valuemax={3}
            aria-label={`Form progress: step ${formStep} of 3`}
          >
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  s <= formStep ? "bg-brand-yellow" : isInline ? "bg-white/20" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>

        {stepError ? (
          <p
            className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900"
            role="status"
          >
            {stepError}
          </p>
        ) : null}

        {/* Step 1: Service selection */}
        {formStep === 1 ? (
          <div>
            <Label htmlFor={fieldId("selectedOffer")} className={labelClass}>
              What type of service do you need?{" "}
              <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.selectedOffer}
              onValueChange={(value) => handleSelectChange("selectedOffer", value)}
              required
            >
              <SelectTrigger
                id={fieldId("selectedOffer")}
                className={cn("mt-1 w-full", isInline && selectTriggerClass.replace("mt-1 w-full ", ""))}
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
            <p
              className={cn(
                "mt-2 text-xs leading-snug",
                isInline ? "text-white/55" : "text-muted-foreground"
              )}
            >
              {OFFER_PRICING_SQFT_DISCLAIMER}
            </p>
          </div>
        ) : null}

        {/* Step 2: Contact info */}
        {formStep === 2 ? (
          <div className="space-y-3">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            <div>
              <Label htmlFor={fieldId("howHeard")} className={labelClass}>
                How did you hear about us?{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.howHeard}
                onValueChange={(value) => handleSelectChange("howHeard", value)}
                required
              >
                <SelectTrigger
                  id={fieldId("howHeard")}
                  className={selectTriggerClass}
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
          </div>
        ) : null}

        {/* Step 3: Location & project details */}
        {formStep === 3 ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
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
                    className={selectTriggerClass}
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
              <Label htmlFor={fieldId("approxSqftEstimate")} className={labelClass}>
                Approximate total square footage{" "}
                <span className="text-destructive">*</span>
              </Label>
              <p
                className={cn(
                  "mt-1 text-xs leading-snug",
                  isInline ? "text-white/55" : "text-muted-foreground"
                )}
              >
                Rough total area helps us prepare your estimate.
              </p>
              <Select
                value={formData.approxSqftEstimate}
                onValueChange={(value) =>
                  handleSelectChange("approxSqftEstimate", value)
                }
                required
              >
                <SelectTrigger
                  id={fieldId("approxSqftEstimate")}
                  className={selectTriggerClass}
                >
                  <SelectValue placeholder="Select a range" />
                </SelectTrigger>
                <SelectContent {...formSelectContentPlacementProps}>
                  {SQFT_RANGE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                List surfaces, rough size, and when you want service.
              </p>
              <Textarea
                id={fieldId("message")}
                name="message"
                required
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Example: Two-story siding and front walk, medium lot, next week."
                className={cn("mt-2 min-h-[100px]", isInline && fieldClass)}
              />
            </div>
          </div>
        ) : null}

        {/* Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleBackStep}
            disabled={formStep <= 1}
            className={cn(
              "min-w-[5.5rem] disabled:pointer-events-none disabled:opacity-40",
              isInline && "border-white/30 text-white hover:bg-white/10"
            )}
          >
            Back
          </Button>
          {formStep < 3 ? (
            <Button
              type="button"
              onClick={handleNextStep}
              className="min-w-[5.5rem] bg-brand-blue text-white hover:bg-brand-blue-light"
            >
              Next
            </Button>
          ) : null}
        </div>

        {formStep === 3 ? (
          <div className="space-y-2 border-t border-border pt-4">
            {submitError ? (
              <p
                className={cn(
                  "rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm",
                  isInline ? "text-red-100" : "text-red-800"
                )}
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
          </div>
        ) : null}
      </form>

    </div>
  )
}
