"use client";

import { useMemo, useState, useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import {
  Search, SlidersHorizontal, Download, Eye, ChevronLeft,
  ChevronRight, Trash2
} from "lucide-react";

type InvoiceStatus =
  | "Pending Approval"
  | "Approved"
  | "Rejected";

const FILTERS = [
  "All",
  "PENDING",
  "APPROVED",
  "REJECTED",
];



export function InvoiceTable({
  invoices,
  onView,
  onDelete,
}: {
  invoices: any[];
  onView: (invoice: any) => void;
  onDelete: (invoice: any) => void;
}) {

  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);



  const itemsPerPage = 10;

  const filteredRows = useMemo(() => {
    return invoices.filter((inv) => {
      const supplier = inv.supplierInformation;

      const matchesFilter =
        filter === "All" || inv.status === filter;

      const matchesQuery =
        query.trim() === "" ||
        supplier.name.toLowerCase().includes(query.toLowerCase()) ||
        supplier.invoiceNumber.toLowerCase().includes(query.toLowerCase());

      return matchesFilter && matchesQuery;
    });
  }, [invoices, filter, query]);




  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

  const currentRows = filteredRows.slice(startIndex, endIndex);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-3 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 rounded-xl bg-ink-50 px-3 py-2 text-sm sm:w-80">
          <Search size={16} className="text-ink-400" />
          <input
            value={query}
            onChange={handleSearch}
            placeholder="Search invoice, vendor, or PO..."
            className="w-full bg-transparent text-ink-700 outline-none placeholder:text-ink-400"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${filter === f ? "bg-ink-900 text-white" : "bg-ink-50 text-ink-500 hover:bg-ink-100"
                }`}
            >
              {f}
            </button>
          ))}
          <button className="flex items-center gap-1.5 rounded-full bg-ink-50 px-3 py-1.5 text-xs font-semibold text-ink-500 hover:bg-ink-100">
            <SlidersHorizontal size={13} />
            Filters
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs text-ink-400">
              <th className="px-5 py-3 font-medium">No.</th>
              <th className="px-2 py-3 font-medium">Vendor Name</th>
              <th className="px-2 py-3 font-medium">Invoice Number</th>
              <th className="px-2 py-3 font-medium">Phone Number</th>
              <th className="px-2 py-3 font-medium">Email</th>
              <th className="px-2 py-3 font-medium">Invoice Date</th>
              <th className="px-2 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((inv, index) => (
              <tr key={startIndex + index + 1} className="border-t border-ink-100 hover:bg-ink-50/60">
                <td className="px-5 py-3.5 font-semibold text-ink-800">{startIndex + index + 1}</td>
                <td className="px-2 py-3.5 text-ink-600">{inv.supplierInformation.name}</td>
                <td className="px-2 py-3.5 text-ink-500">{inv.supplierInformation.invoiceNumber}</td>
                <td className="px-2 py-3.5 font-mono text-xs text-ink-400">{inv.supplierInformation.phone}</td>
                <td className="px-2 py-3.5 font-semibold text-ink-800">{inv.supplierInformation.email}</td>
                <td className="px-2 py-3.5 text-ink-500">{inv.supplierInformation.invoiceDate}</td>
                <td className="px-2 py-3.5">
                  <span
                    className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold ${inv.status === "APPROVED"
                      ? "bg-green-100 text-green-700"
                      : inv.status === "REJECTED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {inv.status === "PENDING"
                      ? "PENDING"
                      : inv.status === "APPROVED"
                        ? "APPROVED"
                        : inv.status === "REJECTED"
                          ? "REJECTED"
                          : "PENDING"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-2">
                    {/* View */}
                    <button
                      title="View"
                      onClick={() => onView(inv)}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-orange-200 bg-orange-50 text-orange-600 transition-all duration-200 hover:scale-105 hover:bg-orange-500 hover:text-white hover:shadow-md"
                    >
                      <Eye size={16} />
                    </button>

                    {/* Delete */}
                  <button
  title="Delete"
  onClick={() => onDelete(inv)}
  className="flex h-9 w-9 items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-600 transition-all duration-200 hover:scale-105 hover:bg-red-500 hover:text-white hover:shadow-md"
>
  <Trash2 size={16} />
</button>
                  </div>
                </td>
              </tr>
            ))}
            {currentRows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-10 text-center text-sm text-ink-400">
                  No invoices match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-ink-100 px-5 py-3.5 text-xs text-ink-400">
        Showing {startIndex + 1}-{Math.min(endIndex, filteredRows.length)} of{" "}
        {filteredRows.length} invoices
        <span>Synced with SAP FI · every 5 minutes</span>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-ink-100 px-5 py-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-lg border p-2 disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={totalPages}
                value={currentPage}
                onChange={(e) =>
                  handlePageChange(Number(e.target.value) || 1)
                }
                className="w-14 rounded border text-center"
              />

              <span className="text-sm text-ink-500">
                / {totalPages}
              </span>
            </div>

            <span className="text-xs text-ink-500">
              Showing {startIndex + 1}-
              {Math.min(endIndex, filteredRows.length)} of{" "}
              {filteredRows.length}
            </span>
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-lg border p-2 disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
