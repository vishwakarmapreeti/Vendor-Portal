"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { payablesTrend } from "@/lib/data";

export function PayablesChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={payablesTrend} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="payables" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F36F21" stopOpacity={0.28} />
            <stop offset="100%" stopColor="#F36F21" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="paid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#12141A" stopOpacity={0.14} />
            <stop offset="100%" stopColor="#12141A" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#6B7386" }} />
        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#6B7386" }} tickFormatter={(v) => `${v}M`} />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB", fontSize: 12, boxShadow: "0 8px 24px rgba(18,20,26,0.08)" }}
          formatter={(value: number, name: string) => [`AED ${value}M`, name === "payables" ? "Outstanding" : "Paid"]}
        />
        <Area type="monotone" dataKey="payables" stroke="#F36F21" strokeWidth={2.5} fill="url(#payables)" />
        <Area type="monotone" dataKey="paid" stroke="#12141A" strokeWidth={2} fill="url(#paid)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
