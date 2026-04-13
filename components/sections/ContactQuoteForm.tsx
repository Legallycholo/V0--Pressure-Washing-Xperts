"use client"

import { useId, useMemo, useRef, useState } from "react"
import { usePathname } from "next/navigation"
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
  getOfferById,
  getPremiumOffer,
  isOfferId,
  offers,
  OFFER_NONE,
  PREMIUM_OFFER_UPSELL_BUTTON_SUBLINE,
  PREMIUM_OFFER_UPSELL_EXPLANATION,
} from "@/data/offers"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { modalCopyDefault } from "@/data/modalCopy"
import { CONTACT_FORM_STATES } from "@/data/contactFormStates"
import { submitLeadRequest } from "@/lib/submitLead"
import { trackLeadFormSubmit } from "@/lib/leadAnalytics"

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
  className?: string
}

export function ContactQuoteForm({
  variant,
  copy,
  showOfferSelect = true,
  initialOfferId,
  className,
}: ContactQuoteFormProps) {
  const uid = useId()
  const fieldId = (name: string) => `${uid}-${name}`
  const pathname = usePathname()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [formData, setFormData] = useState(() => ({
    ...emptyForm(),
    selectedOffer: initialOfferId ?? OFFER_NONE,
  }))
  /** When set, the offer confirmation dialog is open and shows this id. */
  const [offerDialogOfferId, setOfferDialogOfferId] = useState<OfferId | null>(
    null
  )

  const revertOfferRef = useRef<typeof OFFER_NONE | OfferId>(OFFER_NONE)
  const offerAcceptedRef = useRef(false)

  const premiumOffer = useMemo(() => getPremiumOffer(), [])

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

  const handleOfferDialogOpenChange = (open: boolean) => {
    if (!open) {
      if (!offerAcceptedRef.current) {
        setFormData((prev) => ({
          ...prev,
          selectedOffer: revertOfferRef.current,
        }))
      }
      offerAcceptedRef.current = false
      setOfferDialogOfferId(null)
    }
  }

  const handleOfferSelectChange = (value: string) => {
    if (value === OFFER_NONE) {
      if (offerDialogOfferId !== null) {
        offerAcceptedRef.current = true
      }
      setFormData((prev) => ({ ...prev, selectedOffer: OFFER_NONE }))
      setOfferDialogOfferId(null)
      return
    }
    if (isOfferId(value)) {
      revertOfferRef.current = formData.selectedOffer
      setFormData((prev) => ({ ...prev, selectedOffer: value }))
      setOfferDialogOfferId(value)
    }
  }

  const confirmSelectedOffer = () => {
    offerAcceptedRef.current = true
    setOfferDialogOfferId(null)
  }

  const switchToPremiumOffer = () => {
    offerAcceptedRef.current = true
    setFormData((prev) => ({ ...prev, selectedOffer: premiumOffer.id }))
    setOfferDialogOfferId(null)
  }

  const selectedOfferDetails = offerDialogOfferId
    ? getOfferById(offerDialogOfferId)
    : undefined

  const showPremiumUpsell =
    selectedOfferDetails != null &&
    selectedOfferDetails.id !== premiumOffer.id &&
    selectedOfferDetails.id !== "seasonal"

  const OfferIconForDialog = selectedOfferDetails?.icon

  const handleSubmit = async (e: React.FormEvent) => {
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
      submission_type: copy.badge,
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
        className={cn(
          "space-y-3",
          !isInline && "p-4",
          isInline &&
            "lg:grid lg:grid-cols-2 lg:gap-x-4 lg:gap-y-3 lg:space-y-0"
        )}
      >
        {showOfferSelect ? (
          <div className={cn(isInline && "lg:col-span-2")}>
            <Label htmlFor={fieldId("selectedOffer")} className={labelClass}>
              Offer <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.selectedOffer}
              onValueChange={handleOfferSelectChange}
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
        ) : null}

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

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
        </div>

        <div className={cn(isInline && "space-y-3 lg:flex lg:flex-col")}>
          <div className={cn(isInline && "lg:flex-1")}>
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
              className={cn(
                "mt-2 min-h-[88px]",
                isInline && fieldClass,
                isInline && "lg:min-h-[120px] xl:min-h-[100px]"
              )}
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
        </div>

        <div className={cn("space-y-2", isInline && "lg:col-span-2")}>
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
      </form>

      {selectedOfferDetails ? (
        <Dialog
          modal={false}
          open={offerDialogOfferId !== null}
          onOpenChange={handleOfferDialogOpenChange}
        >
          <DialogContent
            nonBlocking
            showCloseButton
            className="flex max-h-[min(92vh,52rem)] w-[min(100%,calc(100vw-1.5rem))] max-w-[52rem] flex-col gap-0 overflow-hidden p-0 shadow-xl !top-1/2 !right-auto !left-3 !translate-x-0 !-translate-y-1/2 duration-300 ease-out sm:!left-5 md:!left-8 motion-reduce:!transition-none data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100 data-[state=closed]:slide-out-to-left-4 data-[state=open]:slide-in-from-left-4 motion-reduce:data-[state=closed]:slide-out-to-left-0 motion-reduce:data-[state=open]:slide-in-from-left-0"
          >
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 pr-12 sm:px-7 sm:py-7 sm:pr-14">
              <DialogHeader className="text-left">
                <div className="mb-4 flex items-start gap-4">
                  <span className="bg-brand-blue/10 text-brand-blue flex size-14 shrink-0 items-center justify-center rounded-xl sm:size-16">
                    {OfferIconForDialog ? (
                      <OfferIconForDialog
                        className="size-7 sm:size-8"
                        aria-hidden
                      />
                    ) : null}
                  </span>
                  <div className="min-w-0 space-y-1.5">
                    <p className="text-brand-blue text-sm font-semibold uppercase tracking-wide">
                      {selectedOfferDetails.discount}
                    </p>
                    <DialogTitle className="text-2xl leading-snug sm:text-[1.65rem]">
                      {selectedOfferDetails.title}
                    </DialogTitle>
                  </div>
                </div>
                <DialogDescription className="text-foreground text-base leading-relaxed sm:text-lg">
                  {selectedOfferDetails.description}
                </DialogDescription>
                <p className="text-muted-foreground mt-5 text-xs leading-snug sm:text-[0.8125rem]">
                  {selectedOfferDetails.terms}
                </p>
                {showPremiumUpsell ? (
                  <div
                    className="border-border bg-brand-blue/5 mt-6 rounded-xl border border-l-4 border-l-brand-blue p-4 sm:p-5"
                    role="note"
                  >
                    <p className="text-brand-blue text-sm font-semibold sm:text-base">
                      Why we suggest {premiumOffer.title}
                    </p>
                    <p className="text-foreground mt-2 text-xs leading-relaxed sm:text-sm">
                      {PREMIUM_OFFER_UPSELL_EXPLANATION}
                    </p>
                  </div>
                ) : null}
              </DialogHeader>
            </div>
            <DialogFooter className="border-border bg-muted/30 !flex-col gap-3 border-t p-4 sm:p-5 sm:!flex-col">
              <div className="flex w-full min-w-0 flex-col gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 w-full shrink-0"
                  onClick={() => handleOfferDialogOpenChange(false)}
                >
                  Go back
                </Button>
                {showPremiumUpsell ? (
                  <Button
                    type="button"
                    variant="secondary"
                    className="h-auto min-h-[3.25rem] w-full flex-col items-stretch gap-1 whitespace-normal py-3 text-left leading-snug"
                    onClick={switchToPremiumOffer}
                  >
                    <span className="font-semibold">
                      Use {premiumOffer.title} instead
                    </span>
                    <span className="text-muted-foreground text-[0.6875rem] font-normal leading-snug sm:text-[0.75rem]">
                      {PREMIUM_OFFER_UPSELL_BUTTON_SUBLINE}
                    </span>
                  </Button>
                ) : null}
                <Button
                  type="button"
                  className="bg-brand-yellow text-brand-blue-dark hover:bg-brand-yellow-dark h-auto min-h-12 w-full whitespace-normal py-3.5 font-bold leading-snug"
                  onClick={confirmSelectedOffer}
                >
                  Continue with {selectedOfferDetails.title}
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  )
}
