"use client"

import { useId, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, Loader2, ArrowLeft, Send, CheckSquare, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const STEPS = [
  { n: 1 as const, label: "What needs cleaning" },
  { n: 2 as const, label: "How we reach you" },
  { n: 3 as const, label: "Where and when" },
]

const CALL_TIMES = ["Any time", "Morning", "Afternoon", "Evening"]
const HOW_HEARD = [
  "Google search",
  "Saw the truck or a yard sign",
  "Friend or neighbor",
  "Facebook or Instagram",
  "Nextdoor",
  "Repeat customer",
]

const SERVICES_LIST = [
  "House Washing",
  "Roof Cleaning",
  "Driveways & Sidewalks",
  "Decks & Fences",
  "Gutters",
  "Commercial/Other",
]

type FormState = {
  services: string[]
  name: string
  phone: string
  email: string
  city: string
  zip: string
  approx_sqft: string
  best_time: string
  how_heard: string
  message: string
}

const emptyForm = (): FormState => ({
  services: [],
  name: "",
  phone: "",
  email: "",
  city: "",
  zip: "",
  approx_sqft: "",
  best_time: CALL_TIMES[0],
  how_heard: "",
  message: "",
})

export interface ContactFormProps {
  className?: string
}

export function ContactForm({ className }: ContactFormProps) {
  const uid = useId()
  const fieldId = (name: string) => `${uid}-${name}`
  const router = useRouter()

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [formData, setFormData] = useState<FormState>(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [missing, setMissing] = useState<string[]>([])

  useEffect(() => {
    if (step === 3) router.prefetch("/thank-you")
  }, [step, router])

  const labelClass = "text-white/85"
  const fieldClass =
    "mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/45 focus-visible:ring-brand-yellow/40"

  const set = (k: keyof FormState, v: string | string[]) =>
    setFormData((f) => ({ ...f, [k]: v }))

  const toggleService = (name: string) =>
    setFormData((f) => ({
      ...f,
      services: f.services.includes(name)
        ? f.services.filter((s) => s !== name)
        : [...f.services, name],
    }))

  const validate = (which: 1 | 2 | 3) => {
    const gaps: string[] = []
    if (which === 1 && formData.services.length === 0) gaps.push("services")
    if (which === 2) {
      if (!formData.name.trim()) gaps.push("name")
      if (!formData.phone.trim()) gaps.push("phone")
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim())) gaps.push("email")
    }
    setMissing(gaps)
    return gaps
  }

  const next = () => {
    setSubmitError(null)
    const gaps = validate(step)
    if (gaps.length) {
      setSubmitError(
        step === 1
          ? "Pick at least one thing you'd like cleaned."
          : gaps.includes("email") && gaps.length === 1
            ? "That email address doesn't look right."
            : "We need those fields to be able to call you back."
      )
      return
    }
    setStep((s) => (s === 3 ? 3 : ((s + 1) as 1 | 2 | 3)))
  }

  const back = () => {
    setSubmitError(null)
    setMissing([])
    setStep((s) => (s === 1 ? 1 : ((s - 1) as 1 | 2 | 3)))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    if (step < 3) {
      next()
      return
    }

    const gaps = [...validate(1), ...validate(2)]
    setMissing(gaps)
    if (gaps.length) {
      const firstBad = gaps.some((g) => g === "services") ? 1 : 2
      setStep(firstBad as 1 | 2 | 3)
      setSubmitError("Something above got cleared. Check the highlighted fields.")
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          services: formData.services.join(", "),
        }),
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
        setIsSubmitting(false)
        return
      }

      setIsSubmitted(true)
      // Redirect or show in-place
      router.push("/thank-you")
    } catch {
      setSubmitError("We couldn't send your message. Please try again in a moment.")
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className={cn("animate-success-pop-in rounded-2xl border border-white/10 bg-white/5 p-8 text-center", className)}>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20">
          <CheckCircle className="size-8 text-green-400" aria-hidden />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Message sent!</h3>
        <p className="text-white/70 text-sm leading-relaxed">
          Thanks! We'll be in touch soon.
        </p>
      </div>
    )
  }

  const invalid = (name: string) => missing.includes(name)

  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-white/10 bg-white/5", className)}>
      <div className="bg-black/20 px-5 py-4 sm:px-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg text-white sm:text-xl">
            {STEPS[step - 1].label}
          </h3>
          <span className="shrink-0 text-xs font-bold uppercase tracking-[0.14em] text-white/50">
            Step {step} of 3
          </span>
        </div>
        <ol className="mt-3 flex gap-1.5" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3}>
          {STEPS.map((s) => (
            <li
              key={s.n}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors duration-300",
                s.n <= step ? "bg-brand-yellow" : "bg-white/15"
              )}
            />
          ))}
        </ol>
      </div>

      <form onSubmit={handleSubmit} noValidate className="px-5 py-5 sm:px-6 sm:py-6 space-y-4">
        {step === 1 && (
          <fieldset>
            <legend className={cn("text-sm font-bold", labelClass)}>
              Pick everything you'd like looked at
              <span className="ml-1 text-destructive">*</span>
            </legend>
            <div className={cn("mt-3 flex flex-wrap gap-2", invalid("services") && "ring-2 ring-destructive ring-offset-2 ring-offset-transparent rounded-lg")}>
              {SERVICES_LIST.map((s) => {
                const on = formData.services.includes(s)
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleService(s)}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all",
                      on
                        ? "border-brand-yellow bg-brand-yellow text-brand-blue-dark"
                        : "border-white/20 bg-white/10 text-white hover:border-brand-yellow/50"
                    )}
                  >
                    {on ? <CheckSquare className="size-4" /> : <Square className="size-4" />}
                    {s}
                  </button>
                )
              })}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor={fieldId("name")} className={labelClass}>
                Your name <span className="text-destructive">*</span>
              </Label>
              <Input
                id={fieldId("name")}
                name="name"
                autoFocus
                required
                value={formData.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="First and last"
                className={cn(fieldClass, invalid("name") && "border-destructive")}
              />
            </div>
            <div>
              <Label htmlFor={fieldId("phone")} className={labelClass}>
                Mobile number <span className="text-destructive">*</span>
              </Label>
              <p className="mt-0.5 text-xs text-white/50">The number we'll call you back on.</p>
              <Input
                id={fieldId("phone")}
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="(555) 123-4567"
                className={cn(fieldClass, invalid("phone") && "border-destructive")}
              />
            </div>
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
                onChange={(e) => set("email", e.target.value)}
                placeholder="you@example.com"
                className={cn(fieldClass, invalid("email") && "border-destructive")}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={fieldId("city")} className={labelClass}>Town / City</Label>
                <Input
                  id={fieldId("city")}
                  value={formData.city}
                  onChange={(e) => set("city", e.target.value)}
                  placeholder="Atlanta"
                  className={fieldClass}
                />
              </div>
              <div>
                <Label htmlFor={fieldId("zip")} className={labelClass}>Zip Code</Label>
                <Input
                  id={fieldId("zip")}
                  value={formData.zip}
                  onChange={(e) => set("zip", e.target.value)}
                  placeholder="30301"
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={fieldId("approx_sqft")} className={labelClass}>Approx Sq Ft</Label>
                <Input
                  id={fieldId("approx_sqft")}
                  value={formData.approx_sqft}
                  onChange={(e) => set("approx_sqft", e.target.value)}
                  placeholder="e.g. 2500"
                  className={fieldClass}
                />
              </div>
              <div>
                <Label htmlFor={fieldId("best_time")} className={labelClass}>Best time to reach you</Label>
                <select
                  id={fieldId("best_time")}
                  value={formData.best_time}
                  onChange={(e) => set("best_time", e.target.value)}
                  className={cn("flex h-9 w-full rounded-md px-3 py-1 text-sm shadow-sm transition-colors", fieldClass)}
                >
                  {CALL_TIMES.map((t) => (
                    <option key={t} value={t} className="text-black">{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor={fieldId("how_heard")} className={labelClass}>How did you find us?</Label>
              <select
                id={fieldId("how_heard")}
                value={formData.how_heard}
                onChange={(e) => set("how_heard", e.target.value)}
                className={cn("flex h-9 w-full rounded-md px-3 py-1 text-sm shadow-sm transition-colors", fieldClass)}
              >
                <option value="" className="text-black">Prefer not to say</option>
                {HOW_HEARD.map((h) => (
                  <option key={h} value={h} className="text-black">{h}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor={fieldId("message")} className={labelClass}>
                Anything we should know?
              </Label>
              <p className="mt-0.5 text-xs text-white/50">Optional. Notes about the project, timelines, etc.</p>
              <Textarea
                id={fieldId("message")}
                rows={3}
                value={formData.message}
                onChange={(e) => set("message", e.target.value)}
                placeholder="North side is green and there's a dog in the yard."
                className={cn(fieldClass, "resize-y")}
              />
            </div>
          </div>
        )}

        <input type="text" name="_hp" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

        {submitError && (
          <div role="alert" className="mt-4 rounded-xl bg-destructive/10 p-3.5 text-sm text-red-200 border border-destructive/20">
            <p className="font-semibold">{submitError}</p>
          </div>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          {step > 1 ? (
            <Button type="button" variant="ghost" onClick={back} className="text-white hover:bg-white/10 hover:text-white">
              <ArrowLeft className="mr-2 size-4" /> Back
            </Button>
          ) : (
            <span className="hidden sm:block" />
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto bg-brand-yellow text-brand-blue-dark hover:bg-brand-yellow/90 font-semibold">
            {step < 3 ? (
              "Continue"
            ) : isSubmitting ? (
              <><Loader2 className="mr-2 size-4 animate-spin" /> Sending...</>
            ) : (
              <><Send className="mr-2 size-4" /> Request my callback</>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
