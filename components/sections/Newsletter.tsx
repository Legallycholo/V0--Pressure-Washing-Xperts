"use client"

import { useState, type FormEvent } from "react"
import { Mail, Sparkles, CheckCircle2, ShieldCheck, Tag, FileText, ArrowRight } from "lucide-react"
import { Reveal } from "@/components/motion/Reveal"

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
    <section id="newsletter" className="relative overflow-hidden bg-ps-bg py-16 sm:py-20 lg:py-24">
      {/* Background ambient lighting effects */}
      <div 
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-ps-cyan/10 blur-[120px]" 
        aria-hidden="true" 
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-ps-cyan/20 bg-ps-bg-alt/90 p-8 sm:p-12 lg:p-16 shadow-[0_0_50px_-15px_rgba(0,229,255,0.15)] backdrop-blur-sm">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Content Column */}
            <Reveal className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-ps-cyan/30 bg-ps-cyan/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-ps-cyan">
                <Sparkles className="size-3.5 shrink-0" />
                <span>Newsletter &amp; Blog Updates</span>
              </div>

              <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl lg:text-5xl">
                Stay Ahead of <span className="text-ps-cyan text-glow-cyan">Property Mold &amp; Grime</span>
              </h2>

              <p className="mt-4 text-base leading-relaxed text-ps-text-muted sm:text-lg">
                Join Metro Atlanta homeowners receiving our seasonal exterior care checklists, pro tips to protect siding &amp; shingles, and subscriber-only discount codes.
              </p>

              {/* Value Proposition Points */}
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-ps-cyan/30">
                  <Tag className="mt-0.5 size-5 shrink-0 text-ps-cyan" />
                  <div>
                    <h3 className="text-sm font-semibold text-white">Exclusive Savings</h3>
                    <p className="mt-1 text-xs text-ps-text-muted">Special offers &amp; seasonal service promo codes.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-ps-cyan/30">
                  <FileText className="mt-0.5 size-5 shrink-0 text-ps-cyan" />
                  <div>
                    <h3 className="text-sm font-semibold text-white">Care Checklists</h3>
                    <p className="mt-1 text-xs text-ps-text-muted">Spring refresh &amp; fall winterization guides.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-ps-cyan/30">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-ps-cyan" />
                  <div>
                    <h3 className="text-sm font-semibold text-white">Pro Maintenance</h3>
                    <p className="mt-1 text-xs text-ps-text-muted">Prevent Georgia red clay &amp; algae damage.</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right Signup Box Column */}
            <Reveal delay={0.15} className="lg:col-span-5">
              <div className="rounded-2xl border border-white/10 bg-ps-bg p-6 sm:p-8 shadow-2xl">
                {status === "success" ? (
                  <div className="py-4 text-center">
                    <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-ps-cyan/20 text-ps-cyan">
                      <CheckCircle2 className="size-8" />
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-bold text-white">You&apos;re Subscribed!</h3>
                    <p className="mt-2 text-sm text-ps-text-muted">
                      Thank you for joining. Use code <span className="font-mono font-bold text-ps-cyan">XPERTS10</span> for 10% off your next soft wash or power washing service!
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-ps-cyan underline-offset-4 hover:underline"
                    >
                      Subscribe another email
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <Mail className="size-4 text-ps-cyan" />
                      <span>Sign up for email updates</span>
                    </div>

                    <div>
                      <label htmlFor="newsletter-email" className="sr-only">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          id="newsletter-email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                            if (status === "error") setStatus("idle")
                          }}
                          placeholder="Enter your email address..."
                          required
                          className="w-full rounded-xl border border-white/15 bg-white/5 py-3.5 pl-4 pr-11 text-sm text-white placeholder-white/40 focus:border-ps-cyan focus:outline-none focus:ring-1 focus:ring-ps-cyan"
                        />
                        <Mail className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-white/40" />
                      </div>
                      {status === "error" && (
                        <p className="mt-1.5 text-xs text-red-400">{errorMessage}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-ps-cyan px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-ps-bg transition-all duration-200 hover:bg-ps-cyan/90 hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] active:scale-[0.99] disabled:opacity-50"
                    >
                      {status === "loading" ? (
                        <span>Subscribing...</span>
                      ) : (
                        <>
                          <span>Subscribe Free</span>
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-ps-text-muted">
                      🔒 No spam. Unsubscribe at any time with one click.
                    </p>
                  </form>
                )}
              </div>
            </Reveal>

          </div>
        </div>
      </div>
    </section>
  )
}
