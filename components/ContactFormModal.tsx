"use client"

import { useState } from "react"
import Image from "next/image"
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

interface ContactFormModalProps {
  isOpen: boolean
  onClose: () => void
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

export function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
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

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission (frontend only)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after showing success
    setTimeout(() => {
      setIsSubmitted(false)
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
      onClose()
    }, 3000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label="Close form"
        >
          <X className="size-5" />
        </button>

        {/* Success State */}
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
            <Image
              src="/images/mascot.png"
              alt="Pressure Washing Expert"
              width={100}
              height={125}
              className="h-24 w-auto mx-auto"
            />
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-brand-blue p-6 rounded-t-2xl">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/mascot.png"
                  alt="Pressure Washing Expert"
                  width={60}
                  height={75}
                  className="h-16 w-auto"
                />
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Get a Free Quote Today
                  </h2>
                  <p className="text-white/80 text-sm">
                    Fill out the form below and {"we'll"} get back to you ASAP
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Full Name */}
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

              {/* Email & Phone Row */}
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

              {/* City, State, ZIP Row */}
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

              {/* Message */}
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

              {/* How Did You Hear About Us */}
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

              {/* Submit Button */}
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

              {/* Contact Info */}
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
