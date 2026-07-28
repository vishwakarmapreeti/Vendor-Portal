"use client";
import { Topbar } from "@/components/layout/Topbar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { UploadCloud, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ViewInvoiceModal from "@/components/invoices/ViewInvoiceModel";

export default function InvoicesPage() {

  const [invoices, setInvoices] = useState<any[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const records = JSON.parse(localStorage.getItem("records") || "[]");
    setInvoices(records);
  }, []);

  const handleView = (invoice: any) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
  };


  const handleDelete = (invoice: any) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this invoice?"
  );

  if (!confirmDelete) return;

  const updated = invoices.filter(
    (item) => item.id !== invoice.id
  );

  setInvoices(updated);

  localStorage.setItem("records", JSON.stringify(updated));
};
const handleStatusChange = (newStatus: string) => {
  const updatedInvoices = invoices.map((invoice) =>
    invoice.id === selectedInvoice.id
      ? { ...invoice, status: newStatus }
      : invoice
  );

  setInvoices(updatedInvoices);

  localStorage.setItem("records", JSON.stringify(updatedInvoices));

  setSelectedInvoice({
    ...selectedInvoice,
    status: newStatus,
  });

  setShowModal(false);
};
  return (
    <div className="animate-fade-in p-1">
      <Topbar title="Invoices" subtitle="All invoice documents matched against SAP purchase orders" />

      <main className="p-5 lg:p-8">
        <div className="mb-5 flex items-center justify-end gap-3">
          <Link href="/invoices/upload">
            <Button variant="secondary">
              <UploadCloud size={16} />
              Upload Invoice
            </Button>
          </Link>

        </div>

        <Card className="overflow-hidden">
          <InvoiceTable
            invoices={invoices}
            onView={handleView}
              onDelete={handleDelete} />
            
        </Card>
        <ViewInvoiceModal
          show={showModal}
          invoice={selectedInvoice}
          onClose={() => setShowModal(false)}
          onStatusChange={handleStatusChange}
        />
      </main>
    </div>
  );
}
