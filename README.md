# DBMSC Supplier & Vendor Portal

A Next.js 14 (App Router) + TypeScript + Tailwind CSS starter for a SAP-integrated
supplier/vendor portal, styled around the DBMSC Steel brand.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 — it redirects to `/dashboard`.

## Folder structure

```
app/
  layout.tsx                 Root layout (fonts, metadata)
  page.tsx                   Redirects "/" -> "/dashboard"
  globals.css                Tailwind base + brand utilities
  (portal)/                  Route group sharing the sidebar shell
    layout.tsx                Sidebar + content shell
    dashboard/page.tsx         KPI cards, charts, activity feed
    invoices/page.tsx          Invoice list (filter + search)
    invoices/upload/page.tsx   Upload Document (drag & drop + SAP match pipeline)
    purchase-orders/page.tsx   Purchase order list synced from SAP MM
    onboarding/page.tsx        Vendor onboarding stepper + pipeline table

components/
  layout/       Sidebar, Topbar, MobileNav, Logo
  ui/           Button, Card, Badge — shared primitives
  dashboard/    StatCard, PayablesChart, SpendChart, ActivityFeed
  invoices/     InvoiceTable, POTable, UploadDropzone
  onboarding/   OnboardingStepper, VendorOnboardingTable

lib/
  data.ts        Mock data shaped like SAP FI/MM records — swap for real API/BAPI calls
  utils.ts       cn(), formatCurrency(), formatDate()
```

## Wiring to SAP

`lib/data.ts` mirrors the shape of data you'd pull from SAP (FI invoice documents,
MM purchase orders, vendor master). To connect it for real:

1. Stand up a middleware layer (SAP API Business Hub / OData Gateway / PI-PO / BTP
   Integration Suite) that exposes REST/OData endpoints for:
   - `MIRO`/`FB60` invoice documents (Invoices)
   - `ME21N`/`ME23N` purchase orders (Purchase Orders)
   - Vendor master `XK01`/`BP` (Onboarding)
2. Replace the static arrays in `lib/data.ts` with `fetch()` calls (Next.js Server
   Components can call these directly — no separate API route needed).
3. Keep the SAP sync indicator in the sidebar wired to your middleware's health
   endpoint so the "Last sync" timestamp is real.

## Branding

- Primary color: `#F36F21` (see `tailwind.config.ts` → `brand`)
- Gradients: `bg-brand-gradient` and `bg-fade-white-down` utility classes
- Logo: pulled live from `https://dbmscsteel.ae/wp-content/uploads/2022/06/logo-2.svg`
  via `components/layout/Logo.tsx`, with an automatic "DBMSC" wordmark fallback if
  the remote asset can't load. Swap in a locally hosted SVG under `public/` for
  production to avoid depending on an external host.
- Fonts default to a system font stack (`Inter`/`-apple-system`/`Segoe UI`) so the
  project builds without external network calls. To use a custom webfont, add it
  via `next/font` in `app/layout.tsx`.

## Notes

- All data is mocked for demonstration — no backend calls are made.
- Recharts is used for the dashboard's area and donut charts.
- Tailwind config lives in `tailwind.config.ts`; brand tokens are under `theme.extend.colors.brand`.
