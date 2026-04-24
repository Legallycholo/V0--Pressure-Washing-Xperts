export const SQFT_RANGE_OPTIONS = [
  { value: "under_1500", label: "Under 1,500 sq ft" },
  { value: "1500_2500", label: "1,500–2,500 sq ft" },
  { value: "2501_3500", label: "2,501–3,500 sq ft" },
  { value: "3501_4500", label: "3,501–4,500 sq ft" },
  { value: "over_4500", label: "Over 4,500 sq ft" },
] as const

const STORED_VALUES = new Set<string>(SQFT_RANGE_OPTIONS.map((o) => o.value))

export function isValidApproxSqftEstimateForStorage(value: string): boolean {
  return STORED_VALUES.has(value)
}
