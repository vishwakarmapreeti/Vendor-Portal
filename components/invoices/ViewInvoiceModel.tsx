"use client";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { useState } from "react";

export default function ViewInvoiceModal({
    show,
    onClose,
    invoice,
    onStatusChange,
}: any) {
    const [isApproving, setIsApproving] = useState(false);
    const status = invoice?.status || "PENDING";
    const isCompleted = status === "APPROVED" || status === "REJECTED";
    if (!invoice) return null;

const {
    supplierInformation: supplier = {},
    customerVatNumber = null,
    vatTotal = null,
    items = [],
} = invoice;

    const parseAmount = (value: any) => {
        if (value == null) return 0;

        return Number(
            String(value)
                .replace(/\$/g, "")
                .replace(/,/g, "")
                .trim()
        );
    };

    const total = items.reduce((sum: number, item: any) => {
        const rowTotal =
            parseAmount(item.total) ||
            parseAmount(item.qty) * parseAmount(item.rate);

        return sum + rowTotal;
    }, 0);

    const extractedVat =
        items.length > 0 ? parseAmount(items[0].vat) : 0;

    const hasVat =
        items.length > 0 &&
        items[0].vat !== null &&
        items[0].vat !== undefined &&
        items[0].vat !== "";

    const invoiceGrandTotal =
        items.length > 0
            ? parseAmount(items[0].grandTotal)
            : total;

    const handleApprove = async () => {
        try {
            setIsApproving(true);

            const res = await fetch("/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(invoice),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || "Failed to send email");
                return;
            }

            // Show success message
            alert("Invoice approved successfully!");

            // Update status
            await onStatusChange("APPROVED");

        } catch (err) {
            console.error(err);
            alert("Failed to send email");
        } finally {
            setIsApproving(false);
        }
    };

    return (
        <Modal
            show={show}
            onHide={onClose}
            size="lg"
            centered
            contentClassName="rounded-2xl overflow-hidden border-0 shadow-2xl"
        >
            <Modal.Header
                closeButton
                className="border-0 bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2.5 text-white"
            >
                <Modal.Title className="text-lg font-semibold">
                    Invoice Details
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="max-h-[75vh] overflow-y-auto bg-orange-50/60 p-4 sm:p-6">

                {/* Supplier Information */}
                <h5 className="mb-4 text-xs font-bold uppercase tracking-wider text-orange-600">
                    Supplier Information
                </h5>

                <div className="mb-6 rounded-xl border border-orange-100 bg-white p-4 shadow-sm sm:p-5">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                        <InfoRow label="Name" value={supplier.name} />
                        <InfoRow label="Invoice Date" value={supplier.invoiceDate} />
                        <InfoRow label="Invoice Number" value={supplier.invoiceNumber} />

                        <InfoRow label="Due Date" value={supplier.dueDate} />
                        <InfoRow label="PO Date" value={supplier.poDate} />
                        <InfoRow label="PO Number" value={supplier.poNumber} />
                        <InfoRow
                            label="Supplier VAT No."
                            value={supplier.vatNumber}
                        />

                        <InfoRow
                            label="Customer VAT No."
                            value={invoice.customerVatNumber}
                        />
                        <InfoRow label="Phone" value={supplier.phone} />
                        <InfoRow label="Email" value={supplier.email} />
                    </div>

                    <div className="mt-4 border-t border-orange-100 pt-3">
                        <InfoRow label="Address" value={supplier.address} stacked />
                    </div>
                </div>

                {/* Items */}
                <h5 className="mb-3 text-xs font-bold uppercase tracking-wider text-orange-600">
                    Items
                </h5>

                <div className="overflow-hidden rounded-xl border border-orange-100 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse text-sm">
                            <thead className="bg-gradient-to-r from-orange-500 to-orange-600 text-xs font-semibold uppercase tracking-wide text-white">
                                <tr>
                                    <th className="whitespace-nowrap px-4 py-3 text-left">SKU</th>
                                    <th className="px-4 py-3 text-left">Description</th>
                                    <th className="whitespace-nowrap px-4 py-3 text-left">Qty</th>
                                    <th className="whitespace-nowrap px-4 py-3 text-left">Rate</th>
                                    <th className="whitespace-nowrap px-4 py-3 text-left">Total</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-orange-50">
                                {items.map((item: any, index: number) => (
                                    <tr
                                        key={index}
                                        className={`transition-colors hover:bg-orange-50/70 ${index % 2 === 1 ? "bg-orange-50/30" : "bg-white"
                                            }`}
                                    >
                                        <td className="whitespace-nowrap px-4 py-2.5 text-xs text-gray-600">
                                            {item.sku || "-"}
                                        </td>
                                        <td className="px-4 py-2.5 text-xs text-gray-800">
                                            {item.description}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2.5 text-xs text-gray-600">
                                            {item.qty}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2.5 text-xs text-gray-600">
                                            ${Number(item.rate).toFixed(2)}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2.5 text-xs font-medium text-gray-800">
                                            ${Number(item.total).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                            <tfoot>
                                <tr className="border-t border-orange-100">
                                    <td colSpan={3} className="px-4 py-2"></td>
                                    <td className="whitespace-nowrap px-4 py-2 text-xs font-semibold text-gray-700">
                                        Total
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-xs font-semibold text-gray-800">
                                        ${total.toFixed(2)}
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={3} className="px-4 py-2"></td>

                                    <td className="whitespace-nowrap px-4 py-2 text-xs font-semibold text-gray-700">
                                        VAT (15%)
                                    </td>

                                    <td className="whitespace-nowrap px-4 py-2 text-xs font-semibold text-gray-800">
                                        {vatTotal != null ? vatTotal.toFixed(2) : "-"}
                                    </td>
                                </tr>

                                <tr className="border-t border-orange-100 bg-orange-50/60">
                                    <td colSpan={3} className="px-4 py-3"></td>
                                    <td className="whitespace-nowrap px-4 py-3 text-sm font-bold text-orange-700">
                                        Grand Total
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3 text-sm font-bold text-orange-700">
                                        {invoiceGrandTotal ? `$${invoiceGrandTotal.toFixed(2)}` : "-"}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

            </Modal.Body>

            <Modal.Footer className="border-0 p-0">
                <div className="flex w-full flex-col gap-3 bg-orange-50 px-5 py-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2 sm:mr-auto">
                        <strong className="text-sm text-gray-700">Status:</strong>
                        <span
                            className={`rounded-full px-4 py-1.5 text-xs font-semibold ${status === "PENDING"
                                ? "bg-yellow-100 text-yellow-700"
                                : status === "APPROVED"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                        >
                            {status}
                        </span>
                    </div>

                    {!isCompleted && (
                        <div className="flex gap-2">
                            <>
                                <Button
                                    variant="success"
                                    onClick={handleApprove}
                                    disabled={isApproving}
                                >
                                    {isApproving ? "Approving..." : "Approve"}
                                </Button>

                                <Button
                                    variant="danger"
                                    onClick={() => onStatusChange("REJECTED")}
                                >
                                    Reject
                                </Button>
                            </>
                        </div>
                    )}

                    <button
                        className="rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

function InfoRow({
    label,
    value,
    stacked = false,
}: {
    label: string;
    value?: string;
    stacked?: boolean;
}) {
    if (stacked) {
        return (
            <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-orange-600">
                    {label}
                </p>
                <p className="mt-1 break-words text-xs leading-5 text-gray-700">
                    {value || "-"}
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap items-baseline gap-1.5 text-sm">
            <span className="font-semibold text-gray-800">{label}:</span>
            <span className="break-words text-gray-600">{value || "-"}</span>
        </div>
    );
}