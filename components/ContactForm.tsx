"use client"

import { useId, useState } from "react"
import { CheckCircle, Loader2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type FormState = {
  name: string
  email: string
  phone: string
  message: string
}

const emptyForm = (): FormState => ({
  name: "",
  email: "",
  phone: "",
  message: "",
})

export interface ContactFormProps {
  className?: string
}

export function ContactForm({ className }: ContactFormProps) {
  const uid = useId()
  const fieldId = (name: string) => `${uid}-${name}`

  const [formData, setFormData] = useState<FormState>(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const labelClass = "text-white/85"
  const fieldClass =
    "mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/45 focus-visible:ring-brand-yellow/40"

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data: unknown = await res.json().catch(() => ({}))
      const message =
        typeof data === "object" &&
        data !== null &&
        "error" in data &&
        typeof (data as { error: unknown }).error === "string"
          ? (data as { error: string }).error
          : "We couldn't send your message. Please try again in a moment."

      if (!res.ok) {
        setSubmitError(message)
        return
      }

      setIsSubmitted(true)
      setFormData(emptyForm())
    } catch {
      setSubmitError("We couldn't send your message. Please try again in a moment.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div
        className={cn(
          "animate-success-pop-in rounded-2xl border border-white/10 bg-white/5 p-8 text-center",
          className
        )}
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20">
          <CheckCircle className="size-8 text-green-400" aria-hidden />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Message sent!</h3>
        <p className="text-white/70 text-sm leading-relaxed">
          Thanks — we&apos;ll be in touch soon.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6 border-white/30 text-white hover:bg-white/10"
          onClick={() => {
            setIsSubmitted(false)
            setSubmitError(null)
          }}
        >
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 space-y-4",
        className
      )}
      noValidate
    >
      <div>
        <Label htmlFor={fieldId("name")} className={labelClass}>
          Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id={fieldId("name")}
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
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
            onChange={handleChange}
            placeholder="you@example.com"
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
            onChange={handleChange}
            placeholder="(555) 123-4567"
            className={fieldClass}
            autoComplete="tel"
          />
        </div>
      </div>

      <div>
        <Label htmlFor={fieldId("message")} className={labelClass}>
          Message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id={fieldId("message")}
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project..."
          rows={4}
          className={cn(fieldClass, "resize-y min-h-[100px]")}
        />
      </div>

      {submitError ? (
        <p
          className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200"
          role="alert"
          aria-live="assertive"
        >
          {submitError}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-yellow text-brand-blue-dark hover:bg-brand-yellow/90 font-semibold"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Sending...
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}
