import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  Paid: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Approved: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Fulfilled: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Closed: "bg-ink-100 text-ink-500 ring-ink-300/40",
  "Pending Approval": "bg-amber-50 text-amber-700 ring-amber-600/20",
  "In Review": "bg-amber-50 text-amber-700 ring-amber-600/20",
  Open: "bg-sky-50 text-sky-700 ring-sky-600/20",
  "Partially Delivered": "bg-sky-50 text-sky-700 ring-sky-600/20",
  Overdue: "bg-red-50 text-red-700 ring-red-600/20",
  Rejected: "bg-red-50 text-red-700 ring-red-600/20",
  "Action Required": "bg-brand-50 text-brand-700 ring-brand-600/20",
  "Not Started": "bg-ink-100 text-ink-400 ring-ink-300/40",
};

export function Badge({ children, className }: { children: string; className?: string }) {
  const style = STATUS_STYLES[children] ?? "bg-ink-100 text-ink-500 ring-ink-300/40";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset whitespace-nowrap",
        style,
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {children}
    </span>
  );
}
