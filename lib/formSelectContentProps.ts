/**
 * Radix Select collision logic often opens menus upward inside scrollable regions
 * (modals, overflow containers). Use these props on SelectContent in quote/contact
 * forms so dropdowns stay below the trigger.
 */
export const formSelectContentPlacementProps = {
  side: "bottom" as const,
  sideOffset: 4,
  avoidCollisions: false,
}
