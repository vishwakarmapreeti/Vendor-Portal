"use client";
import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { UploadDropzone } from "@/components/invoices/UploadDropzone";
import { ShieldCheck, Zap, FileSearch } from "lucide-react";
import SupplierInvoiceForm from "@/components/invoices/SupplierInvoiceForm";
import { useState } from "react";
import ItemsTable from "@/components/invoices/ItemsTable";
import { useRouter } from "next/navigation";
const STEPS = [
  { icon: FileSearch, title: "OCR Extraction", desc: "Line items, tax, and totals are read automatically." },
  { icon: Zap, title: "SAP 3-Way Match", desc: "Matched against PO and goods receipt in SAP MM." },
  { icon: ShieldCheck, title: "Approval Routing", desc: "Sent to the right approver based on tolerance rules." },
];

export default function UploadPage() {
const emptyInvoice = {
  supplierInformation: {
    name: "",
    invoiceDate: "",
    invoiceNumber: "",
    dueDate: "",
    poDate: "",
    poNumber: "",
    phone: "",
    email: "",
    address: "",
    vatNumber: "",
  },
  customerVatNumber: "",
  vatTotal: null,
  items: [],
};
  const router = useRouter();
  const [invoiceData, setInvoiceData] = useState(emptyInvoice);
 const handleSubmit = () => {
  const existing = JSON.parse(localStorage.getItem("records") || "[]");

  const newInvoice = {
    id: crypto.randomUUID(), // unique id
    ...invoiceData,
    status: "Pending Approval",
  };

  const updated = [newInvoice, ...existing];

  localStorage.setItem("records", JSON.stringify(updated));

  router.push("/invoices");
};
  return (
    <div className="animate-fade-in">
      <Topbar title="Upload Invoice" subtitle="Submit invoices for automated SAP matching" />

      <main className="grid grid-cols-1 gap-5 p-5 lg:grid-cols-3 lg:p-8">
        {/* Upload Card */}
        <Card className="lg:col-span-2">
          <CardHeader>

          </CardHeader>

          <CardContent>
            <UploadDropzone
              onPdfProcessed={(data) => setInvoiceData(data)}
            />
          </CardContent>
        </Card>

        {/* Right Card */}
        <Card>
          <CardHeader>
            <h3 className="text-sm font-bold text-ink-900">
              What happens next
            </h3>
          </CardHeader>

          <CardContent className="flex flex-col gap-5">
            {STEPS.map((step, i) => (
              <div key={step.title} className="flex gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <step.icon size={16} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-ink-800">
                    {i + 1}. {step.title}
                  </p>

                  <p className="mt-0.5 text-xs text-ink-400">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Supplier Form */}
    <div className="lg:col-span-3">
  <SupplierInvoiceForm
    supplier={invoiceData.supplierInformation}
    customerVatNumber={invoiceData.customerVatNumber}
    vatTotal={invoiceData.vatTotal}
  />
</div>
        {/* Items Table */}
        <div className="lg:col-span-3">
          <ItemsTable
            items={invoiceData.items}
              vatTotal={invoiceData.vatTotal}
          />
        </div>

        <div className="lg:col-span-3 flex justify-end">
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-orange-500 px-8 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-orange-600"
          >
            Submit
          </button>
        </div>
      </main>
    </div>
  );
}
