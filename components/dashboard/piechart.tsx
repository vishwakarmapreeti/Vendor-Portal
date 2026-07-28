"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Props = {
  totalInvoices: number;
  approvedInvoices: number;
  rejectedInvoices: number;
};

export default function StatusChart({
  approvedInvoices,
  rejectedInvoices,
  totalInvoices,
}: Props) {
  const data = [
    {
      name: "Total",
      value: totalInvoices,
      color: "#F97316", // Orange
    },
    {
      name: "Approved",
      value: approvedInvoices,
      color: "#22C55E", // Green
    },
    {
      name: "Rejected",
      value: rejectedInvoices,
      color: "#EF4444", // Red
    },
  ];

  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-md">
      <div className="mb-5">
        <h3 className="text-xl font-semibold text-gray-800">
          Invoice Status
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Distribution of invoices by status
        </p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={105}
            innerRadius={55}
            paddingAngle={4}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #FED7AA",
              backgroundColor: "#fff",
            }}
          />

          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            wrapperStyle={{
              fontSize: "14px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}