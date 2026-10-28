import Link from "next/link"
import { CheckCircle2, Phone } from "lucide-react"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal"
import { ctaPress } from "@/lib/ctaInteraction"
import { businessPhoneDisplay, businessPhoneTelHref } from "@/data/site"
import { GOOGLE_REVIEW_COUNT, GOOGLE_REVIEW_RATING } from "@/data/review-summary"

/** Quotes are copied word for word from data/google-reviews.generated.ts. */
const proofPoints = [
  {
    title: "We show up when we say we will.",
    body: "If we tell you 9 a.m., we are in your driveway at 9 a.m. Levi put it this way: “He was on time for the initial consultation and early for the actual appointment.” That is the standard. Not a lucky day.",
  },
  {
    title: "Same-day work when we can fit it.",
    body: "Call in the morning and there is a good chance we can quote you that day. Many jobs start and finish in one visit, so you are not living with a half-washed house for a week.",
  },
  {
    title: "Saturdays too.",
    body: "We are open 8 a.m. to 10 p.m., seven days a week. When daylight ran out on one house, we came back Saturday morning to finish it. Tiffany had booked other companies that never showed up. We did.",
  },
  {
    title: "The stains other crews skip.",
    body: "Georgia red clay. Oil spots that have sat for years. Rust. Black streaks on the roof. These take the right chemistry, not just more pressure. We have a plan for each one, and we stay until it comes up.",
  },
  {
    title: "Soft wash and pressure wash, matched to the surface.",
    body: "Concrete can take high pressure. Your roof and siding cannot. We soft wash shingles, vinyl, and painted surfaces at low pressure and save the heavy pressure for flatwork. Nothing gets stripped or forced behind your siding.",
  },
  {
    title: "Local to Ellenwood.",
    body: "We are based on Gateway Trail in Ellenwood. We are not driving in from the other side of the metro, so we get to you faster and we come back quickly if something needs a touch-up.",
  },
  {
    title: "Before and after photos.",
    body: "You see the difference for yourself. Customers get before and after shots of the work, so there is no guessing about what got done.",
  },
  {
    title: "Reviews from real customers.",
    body: `We have ${GOOGLE_REVIEW_COUNT} Google reviews and a ${GOOGLE_REVIEW_RATING.toFixed(1)} rating. Weston wrote: “Watched Arthur work super hard on taking care of my mom's entire backyard.” That is the review we are proudest of.`,
  },
] as const

export function HardestWorkingProof() {
  return (
    <section
      id="proof"
      aria-labelledby="proof-heading"
      className="bg-ps-bg-alt py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.28em] text-ps-cyan">
            The Proof
          </p>
          <h2
            id="proof-heading"
            className="font-display uppercase tracking-wide text-white text-3xl sm:text-4xl lg:text-5xl"
          >
            Here Is the <span className="text-ps-cyan text-glow-cyan">Proof</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ps-text-muted sm:text-lg">
            Anyone can say they work hard. We would rather show you. Pressure Washing Xperts is the
            hardest-working pressure washer in Ellenwood, GA, and here is what that looks like on a
            real job.
          </p>
        </Reveal>

        <RevealGroup
          as="ul"
          stagger={0.06}
          className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-2 lg:gap-5"
        >
          {proofPoints.map((point) => (
            <RevealItem
              key={point.title}
              as="li"
              className="rounded-xl border border-white/10 bg-ps-bg p-5 sm:p-6"
            >
              <h3 className="flex items-start gap-2.5 text-base font-semibold text-white sm:text-lg">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-ps-cyan" aria-hidden />
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ps-text-muted sm:text-base">
                {point.body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mx-auto mt-10 max-w-3xl text-center">
          <p className="text-base leading-relaxed text-ps-text sm:text-lg">
            That is how we earned the name. If you want the hardest-working pressure washer in
            Ellenwood, GA on your house, driveway, or roof, call us or request a callback.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={businessPhoneTelHref}
              className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-ps-cyan px-6 py-3 font-display text-lg tracking-wide text-[#06121f] transition-colors hover:bg-brand-yellow-dark ${ctaPress}`}
            >
              <Phone className="size-5 shrink-0" aria-hidden />
              Call {businessPhoneDisplay}
            </a>
            <Link
              href="/contact"
              className={`inline-flex min-h-[48px] items-center justify-center rounded-md border-2 border-ps-cyan/60 px-6 py-3 font-semibold text-ps-cyan transition-all hover:border-ps-cyan hover:bg-ps-cyan/10 ${ctaPress}`}
            >
              Request Callback
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
