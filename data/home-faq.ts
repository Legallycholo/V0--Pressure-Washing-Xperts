export interface HomeFaqItem {
  question: string
  answer: string
}

/**
 * Homepage FAQ — single source for UI (`FAQ.tsx`) and FAQPage JSON-LD on the home route.
 * First sentence of each answer is the direct answer (AEO).
 */
export const homeFaqItems: HomeFaqItem[] = [
  {
    question: "What types of surfaces can you pressure wash?",
    answer:
      "We clean concrete, brick, stone, asphalt, wood and composite decks, vinyl and fiber-cement siding, fences, and many roof systems. We match pressure, flow, and detergents to each surface so grime lifts without unnecessary wear.",
  },
  {
    question: "How much does pressure washing cost in Metro Atlanta?",
    answer:
      "Many driveways and walks fall in roughly the low hundreds, while full home exteriors often range from a few hundred up based on size, height, and how much organic growth is present. We provide free quotes so pricing matches your property—not a generic online guess.",
  },
  {
    question: "Is pressure washing safe for my property?",
    answer:
      "Yes, when it is done with the right technique. We use controlled pressure on durable hardscapes and soft washing (low pressure plus appropriate solution) on siding, painted surfaces, and roofs where high pressure would risk damage.",
  },
  {
    question: "How often should I have my property pressure washed?",
    answer:
      "Most residential exteriors and flatwork look their best with annual cleaning in humid Georgia. Shaded sides, lots of tree cover, or commercial traffic may call for every six months on entries, walks, or high-visibility facades.",
  },
  {
    question: "Do you serve both residential and commercial customers?",
    answer:
      "Yes. We handle single-family homes and multi-property residential plans, plus retail, offices, HOAs, hospitality, fleet yards, and other commercial sites across Metro Atlanta. Crew sizing, equipment, and scheduling are matched to the job.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "We operate as a licensed and insured pressure washing provider. If you need a certificate of insurance for a property manager or HOA, tell us when you book and we will route it through the normal onboarding steps.",
  },
  {
    question: "Do I need to be home during the service?",
    answer:
      "No, as long as we have safe access to the work areas and a working outdoor water source. A short walkthrough is helpful when you are available, but it is not required for many exterior-only projects.",
  },
  {
    question: "What is soft washing and when do you use it?",
    answer:
      "Soft washing is low-pressure rinsing combined with detergents that kill and lift algae, mildew, and traffic film. We use it on roofs, painted siding, stucco, and other surfaces where high-pressure spray could strip finish or drive water where it should not go.",
  },
  {
    question: "Are your cleaning solutions environmentally friendly?",
    answer:
      "We use professional-grade products selected for the surface and soil type, applied in controlled amounts and rinsed thoroughly. We avoid unnecessary runoff and keep plantings and pets in mind while we work.",
  },
  {
    question: "How do I prepare for my pressure washing appointment?",
    answer:
      "Move vehicles, planters, and loose patio items out of the work zone, close windows and doors, and make sure gates are unlocked. If anything cannot be moved, tell the crew on arrival so we can protect it or adjust the plan.",
  },
]
