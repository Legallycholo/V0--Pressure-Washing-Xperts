"use client"

import { useState, type FormEvent } from "react"
import { Mail, CheckCircle2, ShieldCheck, Tag, FileText, ArrowRight } from "lucide-react"
import { Reveal } from "@/components/motion/Reveal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const perks = [
  { Icon: Tag, title: "Exclusive savings", body: "Special offers & seasonal service promo codes." },
  { Icon: FileText, title: "Care checklists", body: "Spring refresh & fall winterization guides." },
  { Icon: ShieldCheck, title: "Pro maintenance", body: "Prevent Georgia red clay & algae damage." },
]

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      setStatus("error")
      setErrorMessage("Please enter a valid email address.")
      return
    }

    setStatus("loading")

    // Placeholder interaction: simulate quick network request
    setTimeout(() => {
      setStatus("success")
      setErrorMessage("")
    }, 600)
  }

  const handleReset = () => {
    setEmail("")
    setStatus("idle")
    setErrorMessage("")
  }

  return (
    <section id="newsletter" className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 rounded-3xl border border-border bg-section-light p-6 sm:p-10 lg:grid-cols-12 lg:items-center lg:p-12">
          <Reveal className="lg:col-span-7">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-blue">
              Newsletter &amp; blog updates
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-brand-blue-dark sm:text-4xl">
              Stay ahead of mold and grime
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Join Metro Atlanta homeowners receiving our seasonal exterior care checklists, pro tips to protect siding &amp; shingles, and subscriber-only discount codes.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {perks.map(({ Icon, title, body }) => (
                <li key={title} className="rounded-2xl border border-border bg-white p-4">
                  <Icon className="size-5 text-brand-blue" aria-hidden />
                  <h3 className="mt-3 text-sm font-semibold text-brand-blue-dark">{title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{body}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
              {status === "success" ? (
                <div className="py-4 text-center">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="size-8" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-brand-blue-dark">You&apos;re subscribed!</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Thank you for joining. Use code <span className="font-mono font-bold text-brand-blue">XPERTS10</span> for 10% off your next soft wash or power washing service!
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-6 text-sm font-semibold text-brand-blue underline-offset-4 hover:underline"
                  >
                    Subscribe another email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <label htmlFor="newsletter-email" className="flex items-center gap-2 text-sm font-semibold text-brand-blue-dark">
                    <Mail className="size-4 text-brand-blue" aria-hidden />
                    Sign up for email updates
                  </label>
                  <div>
                    <Input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (status === "error") setStatus("idle")
                      }}
                      placeholder="you@example.com"
                      required
                      className="h-12 rounded-xl bg-white"
                    />
                    {status === "error" && (
                      <p className="mt-1.5 text-xs text-red-600">{errorMessage}</p>
                    )}
                  </div>

                  <Button type="submit" size="lg" disabled={status === "loading"} className="w-full">
                    {status === "loading" ? (
                      "Subscribing..."
                    ) : (
                      <>
                        Subscribe free
                        <ArrowRight className="size-4" aria-hidden />
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    No spam. Unsubscribe at any time with one click.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
