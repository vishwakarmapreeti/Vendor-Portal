"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

type Props = {
  totalInvoices: number;
  approvedInvoices: number;
  rejectedInvoices: number;
};

export default function InvoiceTrendChart({}: Props) {
  const data = [
    { month: "Jan", total: 25, approved: 20, rejected: 5 },
    { month: "Feb", total: 35, approved: 28, rejected: 7 },
    { month: "Mar", total: 42, approved: 35, rejected: 7 },
    { month: "Apr", total: 55, approved: 48, rejected: 7 },
    { month: "May", total: 63, approved: 54, rejected: 9 },
    { month: "Jun", total: 74, approved: 65, rejected: 9 },
    { month: "Jul", total: 90, approved: 78, rejected: 12 },
  ];

  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-md">
      <div className="mb-5">
        <h3 className="text-xl font-semibold text-gray-800">
          Invoice Trend
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Monthly invoice activity
        </p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid stroke="#F3F4F6" strokeDasharray="3 3" />

          <XAxis
            dataKey="month"
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
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #FED7AA",
              backgroundColor: "#fff",
            }}
          />

          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{
              fontSize: "14px",
            }}
          />

          <Line
            type="monotone"
            dataKey="total"
            name="Total"
            stroke="#F97316"
            strokeWidth={3}
            dot={{ r: 4, fill: "#F97316" }}
            activeDot={{ r: 6 }}
          />

          <Line
            type="monotone"
            dataKey="approved"
            name="Approved"
            stroke="#22C55E"
            strokeWidth={3}
            dot={{ r: 4, fill: "#22C55E" }}
            activeDot={{ r: 6 }}
          />

          <Line
            type="monotone"
            dataKey="rejected"
            name="Rejected"
            stroke="#EF4444"
            strokeWidth={3}
            dot={{ r: 4, fill: "#EF4444" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}