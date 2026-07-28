export type InvoiceStatus = "Pending Approval" | "Approved" | "Paid" | "Overdue" | "Rejected";
export type POStatus = "Open" | "Partially Delivered" | "Fulfilled" | "Closed";
export type OnboardingStatus = "Not Started" | "In Review" | "Action Required" | "Approved";

export const kpis = [
  {
    label: "Outstanding Payables",
    value: "AED 4.82M",
    delta: "-6.2%",
    trend: "down" as const,
    hint: "vs. last month",
  },
  {
    label: "Invoices Awaiting Approval",
    value: "23",
    delta: "+4",
    trend: "up" as const,
    hint: "since Monday",
  },
  {
    label: "Open Purchase Orders",
    value: "58",
    delta: "AED 12.4M value",
    trend: "flat" as const,
    hint: "across 31 vendors",
  },
  {
    label: "Avg. Payment Cycle",
    value: "27 days",
    delta: "-3 days",
    trend: "down" as const,
    hint: "vs. target of 30",
  },
];

export const payablesTrend = [
  { month: "Feb", payables: 3.9, paid: 3.4 },
  { month: "Mar", payables: 4.3, paid: 3.8 },
  { month: "Apr", payables: 4.1, paid: 4.0 },
  { month: "May", payables: 4.6, paid: 4.1 },
  { month: "Jun", payables: 5.1, paid: 4.4 },
  { month: "Jul", payables: 4.82, paid: 4.6 },
];

export const spendByCategory = [
  { name: "Flats & Coils", value: 34 },
  { name: "Longs & Rebar", value: 26 },
  { name: "Tubulars", value: 18 },
  { name: "Fittings", value: 12 },
  { name: "Stainless & Exotic", value: 10 },
];

export const invoices: {
  id: string;
  vendor: string;
  poRef: string;
  amount: number;
  currency: string;
  submitted: string;
  dueDate: string;
  status: InvoiceStatus;
  sapDocNo: string;
}[] = [
  { id: "INV-20487", vendor: "Al Rashid Steel Trading LLC", poRef: "PO-88213", amount: 412500, currency: "AED", submitted: "2026-06-28", dueDate: "2026-07-28", status: "Pending Approval", sapDocNo: "5100234871" },
  { id: "INV-20486", vendor: "Gulf Tubular Industries", poRef: "PO-88190", amount: 187300, currency: "AED", submitted: "2026-06-26", dueDate: "2026-07-10", status: "Overdue", sapDocNo: "5100234822" },
  { id: "INV-20485", vendor: "Emirates Stainless Co.", poRef: "PO-88177", amount: 96400, currency: "AED", submitted: "2026-06-24", dueDate: "2026-07-24", status: "Approved", sapDocNo: "5100234790" },
  { id: "INV-20484", vendor: "Al Rashid Steel Trading LLC", poRef: "PO-88150", amount: 254800, currency: "AED", submitted: "2026-06-20", dueDate: "2026-07-05", status: "Paid", sapDocNo: "5100234701" },
  { id: "INV-20483", vendor: "Falcon Fittings & Flanges", poRef: "PO-88142", amount: 63200, currency: "AED", submitted: "2026-06-18", dueDate: "2026-07-18", status: "Pending Approval", sapDocNo: "5100234655" },
  { id: "INV-20482", vendor: "Gulf Tubular Industries", poRef: "PO-88109", amount: 305600, currency: "AED", submitted: "2026-06-14", dueDate: "2026-06-29", status: "Rejected", sapDocNo: "5100234602" },
  { id: "INV-20481", vendor: "Northern Longs Supply Co.", poRef: "PO-88090", amount: 142900, currency: "AED", submitted: "2026-06-10", dueDate: "2026-07-10", status: "Approved", sapDocNo: "5100234541" },
  { id: "INV-20480", vendor: "Emirates Stainless Co.", poRef: "PO-88072", amount: 78650, currency: "AED", submitted: "2026-06-05", dueDate: "2026-06-20", status: "Paid", sapDocNo: "5100234488" },
];

export const purchaseOrders: {
  id: string;
  vendor: string;
  description: string;
  value: number;
  currency: string;
  issued: string;
  delivery: string;
  status: POStatus;
  plant: string;
}[] = [
  { id: "PO-88213", vendor: "Al Rashid Steel Trading LLC", description: "HRC Coils — Grade S355", value: 620000, currency: "AED", issued: "2026-06-18", delivery: "2026-07-30", status: "Open", plant: "Jebel Ali — Plant 1000" },
  { id: "PO-88190", vendor: "Gulf Tubular Industries", description: "Seamless Pipes — API 5L X52", value: 410000, currency: "AED", issued: "2026-06-12", delivery: "2026-07-15", status: "Partially Delivered", plant: "Jebel Ali — Plant 1000" },
  { id: "PO-88177", vendor: "Emirates Stainless Co.", description: "SS 316L Plates", value: 210000, currency: "AED", issued: "2026-06-08", delivery: "2026-07-02", status: "Fulfilled", plant: "Abu Dhabi — Plant 1200" },
  { id: "PO-88150", vendor: "Al Rashid Steel Trading LLC", description: "Rebar 16mm — BS4449", value: 335000, currency: "AED", issued: "2026-05-29", delivery: "2026-06-25", status: "Closed", plant: "Jebel Ali — Plant 1000" },
  { id: "PO-88142", vendor: "Falcon Fittings & Flanges", description: "Forged Flanges — ANSI B16.5", value: 96000, currency: "AED", issued: "2026-05-24", delivery: "2026-06-20", status: "Open", plant: "Sharjah — Plant 1300" },
  { id: "PO-88109", vendor: "Gulf Tubular Industries", description: "ERW Pipes — ASTM A53", value: 452000, currency: "AED", issued: "2026-05-15", delivery: "2026-06-10", status: "Fulfilled", plant: "Jebel Ali — Plant 1000" },
];

export const onboardingSteps: {
  id: string;
  title: string;
  description: string;
  status: OnboardingStatus;
}[] = [
  { id: "step-1", title: "Company & Trade License", description: "Trade license, VAT certificate, and incorporation documents.", status: "Approved" },
  { id: "step-2", title: "Banking & Payment Details", description: "IBAN verification and bank confirmation letter.", status: "Approved" },
  { id: "step-3", title: "Compliance & Certifications", description: "ISO 9001, material test certificates, HSE policy.", status: "Action Required" },
  { id: "step-4", title: "SAP Vendor Master Sync", description: "Auto-creation of vendor master record in SAP MM.", status: "In Review" },
  { id: "step-5", title: "Contract & Rate Agreement", description: "Framework agreement and pricing conditions.", status: "Not Started" },
];

export const vendorsOnboarding: {
  name: string;
  category: string;
  progress: number;
  status: OnboardingStatus;
  contact: string;
}[] = [
  { name: "Meridian Metals FZE", category: "Flats & Coils", progress: 80, status: "Action Required", contact: "a.hussain@meridianmetals.ae" },
  { name: "Sapphire Alloys Trading", category: "Stainless & Exotic", progress: 45, status: "In Review", contact: "procurement@sapphirealloys.com" },
  { name: "Horizon Pipe Works", category: "Tubulars", progress: 100, status: "Approved", contact: "sales@horizonpipe.ae" },
  { name: "Zenith Fasteners LLC", category: "Fittings", progress: 15, status: "Not Started", contact: "info@zenithfasteners.ae" },
];

export const activity: { id: string; text: string; time: string }[] = [
  { id: "a1", text: "SAP sync completed — 14 vendor master records updated", time: "2 min ago" },
  { id: "a2", text: "INV-20487 submitted by Al Rashid Steel Trading LLC", time: "38 min ago" },
  { id: "a3", text: "PO-88213 released and posted to SAP MM", time: "1 hr ago" },
  { id: "a4", text: "Emirates Stainless Co. completed onboarding step 2", time: "3 hrs ago" },
  { id: "a5", text: "3-way match exception flagged on INV-20482", time: "5 hrs ago" },
];
