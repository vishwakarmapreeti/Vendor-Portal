"use client";

interface SupplierData {
  name?: string;
  invoiceDate?: string;
  invoiceNumber?: string;
  dueDate?: string;
  poDate?: string;
  poNumber?: string;
  phone?: string;
  email?: string;
  address?: string;
  vatNumber?: string;
  customerVatNumber?: string;
}

interface InvoiceData {
  supplierInformation: SupplierData;
  customerVatNumber?: string;
  vatTotal?: number;
}

interface SupplierInvoiceFormProps {
  supplier: SupplierData;
  customerVatNumber?: string;
  vatTotal?: number | null;
}

export default function SupplierInvoiceForm({
  supplier,
  customerVatNumber,
  vatTotal,
}: SupplierInvoiceFormProps) {


  // console.log("supplier:-",supplier);
  
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-orange-600">
          Supplier Invoice Information
        </h2>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Field label="Supplier Name" value={supplier.name} />
        <Field label="Invoice Date" value={supplier.invoiceDate} />
        <Field label="Invoice Number" value={supplier.invoiceNumber} />


        <Field label="Supplier VAT No." value={supplier.vatNumber} />
        <Field label="Customer VAT No." value={customerVatNumber} />

        <Field label="Due Date" value={supplier.dueDate} />
        <Field label="PO Date" value={supplier.poDate} />
        <Field label="PO Number" value={supplier.poNumber} />

        <Field label="Phone Number" value={supplier.phone} />
        <Field label="Email" value={supplier.email} />

        {/* Empty column to match screenshot */}
        <div />

        {/* Full width Address */}
        <div className="md:col-span-2 xl:col-span-3 border-t border-gray-200 pt-5">
          <Field label="Address" value={supplier.address} />
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
        {label}
      </label>

      <input
        value={value ?? ""}
        readOnly
        className="
    h-8
    w-full
    rounded-lg
    border
    border-orange-200
    bg-white
    px-3
    text-sm
    text-gray-700
    outline-none
    transition-all
    focus:border-orange-500
    focus:ring-2
    focus:ring-orange-100
  "
      />
    </div>
  );
}