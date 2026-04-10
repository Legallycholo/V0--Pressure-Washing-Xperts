"use client"

import { useEffect, useState } from "react"
import { X, CheckCircle, Loader2 } from "lucide-react"
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
import type { OfferId } from "@/data/offers"
import { offers, OFFER_NONE } from "@/data/offers"
import { modalCopyDefault, modalCopyOfferIntent } from "@/data/modalCopy"

interface ContactFormModalProps {
  isOpen: boolean
  onClose: () => void
  /** When set, form opens with this offer selected and offer-intent header copy */
  initialOfferId?: OfferId
}

const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
]

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

export function ContactFormModal({
  isOpen,
  onClose,
  initialOfferId,
}: ContactFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState(emptyForm)
  const [openedWithOfferIntent, setOpenedWithOfferIntent] = useState(false)

  const headerCopy = openedWithOfferIntent ? modalCopyOfferIntent : modalCopyDefault

  useEffect(() => {
    if (!isOpen) return
    const intent = Boolean(initialOfferId)
    setOpenedWithOfferIntent(intent)
    setFormData({
      ...emptyForm(),
      selectedOffer: initialOfferId ?? OFFER_NONE,
    })
  }, [isOpen, initialOfferId])

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

    const submissionType = headerCopy.badge

    console.info("Form submitted", {
      submissionType,
      openedWithOfferIntent,
      ...formData,
    })

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    setTimeout(() => {
      setIsSubmitted(false)
      setFormData(emptyForm())
      onClose()
    }, 3000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in-up">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label="Close form"
        >
          <X className="size-5" />
        </button>

        {isSubmitted ? (
          <div className="p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="size-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Thank You!
            </h3>
            <p className="text-muted-foreground mb-4">
              Your quote request has been submitted successfully. We will contact you shortly.
            </p>
            {openedWithOfferIntent && headerCopy.successExtra ? (
              <p className="text-muted-foreground text-sm mb-4">
                {headerCopy.successExtra}
              </p>
            ) : null}
            <p className="text-xs font-medium text-brand-blue">
              Submission Type: {headerCopy.badge}
            </p>
          </div>
        ) : (
          <>
            <div className="bg-brand-blue p-6 rounded-t-2xl">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {headerCopy.headline}
                </h2>
                <p className="text-white/80 text-sm mt-1">
                  {headerCopy.subline}
                </p>
                <p className="mt-2 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                  {headerCopy.badge}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <Label htmlFor="selectedOffer" className="text-foreground">
                  Special offer <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.selectedOffer}
                  onValueChange={(value) =>
                    handleSelectChange("selectedOffer", value)
                  }
                  required
                >
                  <SelectTrigger id="selectedOffer" className="mt-1 w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={OFFER_NONE}>
                      General quote — no specific offer
                    </SelectItem>
                    {offers.map((o) => (
                      <SelectItem key={o.id} value={o.id}>
                        {o.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

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
                    <SelectTrigger id="state" className="mt-1 w-full">
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
                  <SelectTrigger id="howHeard" className="mt-1 w-full">
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
                  headerCopy.submitLabel
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Or call us directly at{" "}
                <a href="tel:800-451-7213" className="text-brand-blue font-medium hover:underline">
                  (800)-451-7213
                </a>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
