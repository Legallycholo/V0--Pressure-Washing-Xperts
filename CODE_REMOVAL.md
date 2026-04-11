# CODE_REMOVAL — Structure & UI prototype

This document records what was identified for removal to keep a **structure-and-UI-only** Next.js prototype: no database, no API layer, and no unused component library surface area.

**Methodology:** Starting imports from `app/**` and `components/**` (excluding `components/ui/**`), the only `@/components/ui/*` modules referenced were: `accordion`, `button`, `input`, `label`, `navigation-menu`, `select`, `textarea`. Every other file under `components/ui/` was only referenced by other removed UI modules or was unreachable. `hooks/use-toast.ts` and `hooks/use-mobile.ts` were only consumed by removed UI. `components/theme-provider.tsx` was never imported.

---

## 1. Database

**Status: Nothing to remove.**

Audit performed (repo snapshot):

- No Prisma or Drizzle packages or schemas.
- No `.sql` migrations or `.prisma` files.
- No `DATABASE_URL` or related env usage in application source.

---

## 2. API / Backend

**Status: No App Router API routes or server actions.**

Audit performed:

- No `app/api/**/route.ts` (or `.js`) handlers.
- No `"use server"` server actions in the codebase.
- No client `fetch()` calls to an application backend.

### 2.1 Removed integration (optional “backend-ish” surface)

| Target | Action |
|--------|--------|
| [`app/layout.tsx`](app/layout.tsx) — `@vercel/analytics` | **Removed** (production-only analytics script). |
| [`package.json`](package.json) — `@vercel/analytics` | **Removed** dependency. |

---

## 3. Redundant logic

### 3.1 Deleted — `components/ui/` (unused shadcn-style primitives)

These files were not imported from `app/` or feature components under `components/` (only from other removed UI files):

- `alert-dialog.tsx`
- `alert.tsx`
- `aspect-ratio.tsx`
- `avatar.tsx`
- `badge.tsx`
- `breadcrumb.tsx`
- `button-group.tsx`
- `calendar.tsx`
- `card.tsx`
- `carousel.tsx`
- `chart.tsx`
- `checkbox.tsx`
- `collapsible.tsx`
- `command.tsx`
- `context-menu.tsx`
- `dialog.tsx`
- `drawer.tsx`
- `dropdown-menu.tsx`
- `empty.tsx`
- `field.tsx`
- `form.tsx`
- `hover-card.tsx`
- `input-group.tsx`
- `input-otp.tsx`
- `item.tsx`
- `kbd.tsx`
- `menubar.tsx`
- `pagination.tsx`
- `popover.tsx`
- `progress.tsx`
- `radio-group.tsx`
- `resizable.tsx`
- `scroll-area.tsx`
- `sheet.tsx`
- `sidebar.tsx`
- `skeleton.tsx`
- `slider.tsx`
- `sonner.tsx`
- `spinner.tsx`
- `switch.tsx`
- `table.tsx`
- `tabs.tsx`
- `toast.tsx`
- `toaster.tsx`
- `toggle-group.tsx`
- `toggle.tsx`
- `tooltip.tsx`
- `use-mobile.tsx`
- `use-toast.ts`

### 3.2 Kept — `components/ui/` (required by live pages)

- `accordion.tsx`
- `button.tsx`
- `input.tsx`
- `label.tsx`
- `navigation-menu.tsx`
- `select.tsx`
- `textarea.tsx`

### 3.3 Deleted — hooks and theme wrapper

| File | Reason |
|------|--------|
| `hooks/use-toast.ts` | Only referenced by removed `toaster.tsx`. |
| `hooks/use-mobile.ts` | Only referenced by removed `sidebar.tsx`. |
| `hooks/` directory | Removed after the two hook files were deleted (no remaining hook modules). |
| `components/theme-provider.tsx` | Never imported; `next-themes` removed from dependencies. |

### 3.4 Intentionally not treated as “redundant”

- Duplicate US state lists and separate hero vs. modal form implementations in [`components/Hero.tsx`](components/Hero.tsx) and [`components/ContactQuoteForm.tsx`](components/ContactQuoteForm.tsx) — **UI/copy structure**; left as-is (consolidation is a separate refactor).
- Forms already use mock submit (`console.info` / delay); no backend POST.

### 3.5 `package.json` dependency removals

Removed npm packages that only supported deleted UI or analytics (exact set applied in [`package.json`](package.json)): unused `@radix-ui/*` primitives, `@vercel/analytics`, `@hookform/resolvers`, `cmdk`, `date-fns`, `embla-carousel-react`, `input-otp`, `next-themes`, `react-day-picker`, `react-hook-form`, `react-resizable-panels`, `recharts`, `sonner`, `vaul`, `zod`.

**Kept `@radix-ui` packages:** `react-accordion`, `react-label`, `react-navigation-menu`, `react-select`, `react-slot` (used by the kept button primitive).

---

## 4. Preserved (per prototype goals)

- All routes under `app/`, feature components, `data/*`, `lib/utils.ts`, `lib/formSelectContentProps.ts`, `public/` assets.
- CSS/Tailwind animations (no `framer-motion` was present in this repo).
- Functional CTAs: `tel:`, `mailto:`, `next/link` navigation, quote modal, mock form submission.

---

## 5. Interactive checklist (process)

For future edits, use explicit **Authorized** per section before bulk deletes:

- [x] **Database** — N/A; no action.
- [x] **API / Backend** — Analytics removal (if desired).
- [x] **Redundant logic** — Unused UI, hooks, theme wrapper, then `npm install` / `npm run build`.

---

## 6. Verification

After changes:

```bash
npm install
npm run build
```

Spot-check: home, a service hub, a service detail page, gallery, and `app/service-areas/[city]`.
