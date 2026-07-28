"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Props {
  totalAmount: number;
  approvedAmount: number;
  rejectedAmount: number;
}

export default function InvoiceChart({
  totalAmount,
  approvedAmount,
  rejectedAmount,
}: Props) {
  const data = [
    {
      name: "Total",
      amount: totalAmount,
      color: "#F97316", // Orange
    },
    {
      name: "Approved",
      amount: approvedAmount,
      color: "#22C55E", // Green
    },
    {
      name: "Rejected",
      amount: rejectedAmount,
      color: "#EF4444", // Red
    },
  ];

  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-md">
      <div className="mb-5">
        <h3 className="text-xl font-semibold text-gray-800">
          Invoice Amount Overview
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Total amount by invoice status
        </p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#F3F4F6" strokeDasharray="3 3" />

          <XAxis
            dataKey="name"
            tick={{ fill: "#6B7280", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: "#6B7280", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{ fill: "#FFF7ED" }}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #FED7AA",
              backgroundColor: "#fff",
            }}
          />

          <Bar
            dataKey="amount"
            radius={[10, 10, 0, 0]}
            barSize={55}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}