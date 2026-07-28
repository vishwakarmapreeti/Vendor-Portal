"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { spendByCategory } from "@/lib/data";

const COLORS = ["#F36F21", "#F78B44", "#FAA96D", "#262A35", "#9CA5B3"];

export function SpendChart() {
  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={spendByCategory}
            dataKey="value"
            nameKey="name"
            innerRadius={58}
            outerRadius={82}
            paddingAngle={3}
            strokeWidth={0}
          >
            {spendByCategory.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB", fontSize: 12 }}
            formatter={(value: number, name: string) => [`${value}%`, name]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-2 grid w-full grid-cols-1 gap-2">
        {spendByCategory.map((item, i) => (
          <div key={item.name} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-ink-500">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              {item.name}
            </span>
            <span className="font-semibold text-ink-800">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
