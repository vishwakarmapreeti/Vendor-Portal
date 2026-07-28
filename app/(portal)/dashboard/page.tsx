"use client";



import InvoiceChart from "@/components/dashboard/barChart";
import InvoiceTrendChart from "@/components/dashboard/lineChart";
import StatusChart from "@/components/dashboard/piechart";
import SummaryCard from "@/components/dashboard/SummaryCard";
import {
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";


import { useEffect, useState } from "react";

export default function Dashboard() {
  // Replace these with API data later


const [records, setRecords] = useState<any[]>([]);

useEffect(() => {
  const saved = localStorage.getItem("records");

  if (saved) {
    setRecords(JSON.parse(saved));
  }
}, []);

const totalInvoices = records.length;

const approvedInvoices = records.filter(
  (record) => record.status === "APPROVED"
).length;

console.log("approvedInvoices",approvedInvoices);


const rejectedInvoices = records.filter(
  (record) => record.status === "REJECTED"
).length;

console.log("rejectedInvoices",rejectedInvoices);


const getGrandTotal = (record: any) => {
  return Number(record.items?.[0]?.grandTotal || 0);
};

const totalAmount = records.reduce(
  (sum, record) => sum + getGrandTotal(record),
  0
);

console.log("totalAmount",totalAmount);


const approvedAmount = records
  .filter((record) => record.status === "APPROVED")
  .reduce((sum, record) => sum + getGrandTotal(record), 0);

console.log("approvedAmount",approvedAmount);


const rejectedAmount = records
  .filter((record) => record.status === "REJECTED")
  .reduce((sum, record) => sum + getGrandTotal(record), 0);

console.log("rejectedAmount",rejectedAmount);

return (
  <div className="min-h-screen  p-8">
    {/* Header */}
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-orange-600">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back! Here's your invoice overview.
        </p>
      </div>

      {/* <div className="rounded-xl border border-orange-200 bg-white px-5 py-3 shadow-sm">
        <p className="text-xs uppercase tracking-wider text-orange-500">
          Total Invoice Amount
        </p>

        <h2 className="mt-1 text-2xl font-bold text-orange-600">
          ${totalAmount.toLocaleString()}
        </h2>
      </div> */}
    </div>

    {/* Cards */}
    <div className="mb-8 grid gap-6 lg:grid-cols-3">
      <SummaryCard
        title="Total Invoices"
        value={totalInvoices}
        icon={<FileText size={28} />}
      />

      <SummaryCard
        title="Approved"
        value={approvedInvoices}
        icon={<CheckCircle size={28} />}
      />

      <SummaryCard
        title="Rejected"
        value={rejectedInvoices}
        icon={<XCircle size={28} />}
      />
    </div>

    {/* Charts */}
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
        <InvoiceChart
          totalAmount={totalAmount}
          approvedAmount={approvedAmount}
          rejectedAmount={rejectedAmount}
        />
      </div>

      <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
        <StatusChart
          totalInvoices={totalInvoices}
          approvedInvoices={approvedInvoices}
          rejectedInvoices={rejectedInvoices}
        />
      </div>

      <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
        <InvoiceTrendChart
          totalInvoices={totalInvoices}
          approvedInvoices={approvedInvoices}
          rejectedInvoices={rejectedInvoices}
        />
      </div>
    </div>
  </div>
);
}