import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

type Trend = "up" | "down" | "flat";

export function StatCard({
  label,
  value,
  delta,
  hint,
  trend,
}: {
  label: string;
  value: string;
  delta: string;
  hint: string;
  trend: Trend;
}) {
  const trendColor =
    trend === "down" ? "text-emerald-600 bg-emerald-50" : trend === "up" ? "text-brand-600 bg-brand-50" : "text-ink-500 bg-ink-100";
  const Icon = trend === "down" ? ArrowDownRight : trend === "up" ? ArrowUpRight : Minus;

  return (
    <Card className="p-5">
      <p className="text-xs font-medium text-ink-400">{label}</p>
      <p className="mt-2 text-[26px] font-extrabold tracking-tight text-ink-900">{value}</p>
      <div className="mt-3 flex items-center gap-2">
        <span className={cn("inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-semibold", trendColor)}>
          <Icon size={12} />
          {delta}
        </span>
        <span className="text-[11px] text-ink-400">{hint}</span>
      </div>
    </Card>
  );
}
