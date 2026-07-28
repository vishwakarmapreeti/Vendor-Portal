"use client";

import { useMemo, useState } from "react";
import { purchaseOrders, type POStatus } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Search, FileDown } from "lucide-react";

const FILTERS: (POStatus | "All")[] = ["All", "Open", "Partially Delivered", "Fulfilled", "Closed"];

export function POTable() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    return purchaseOrders.filter((po) => {
      const matchesFilter = filter === "All" || po.status === filter;
      const matchesQuery =
        query.trim() === "" ||
        po.id.toLowerCase().includes(query.toLowerCase()) ||
        po.vendor.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  return (
    <div>
      <div className="flex flex-col gap-3 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 rounded-xl bg-ink-50 px-3 py-2 text-sm sm:w-80">
          <Search size={16} className="text-ink-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search PO number or vendor..."
            className="w-full bg-transparent text-ink-700 outline-none placeholder:text-ink-400"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                filter === f ? "bg-ink-900 text-white" : "bg-ink-50 text-ink-500 hover:bg-ink-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs text-ink-400">
              <th className="px-5 py-3 font-medium">PO Number</th>
              <th className="px-2 py-3 font-medium">Vendor</th>
              <th className="px-2 py-3 font-medium">Description</th>
              <th className="px-2 py-3 font-medium">Plant</th>
              <th className="px-2 py-3 font-medium">Value</th>
              <th className="px-2 py-3 font-medium">Delivery</th>
              <th className="px-2 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((po) => (
              <tr key={po.id} className="border-t border-ink-100 hover:bg-ink-50/60">
                <td className="px-5 py-3.5 font-semibold text-ink-800">{po.id}</td>
                <td className="px-2 py-3.5 text-ink-600">{po.vendor}</td>
                <td className="px-2 py-3.5 text-ink-500">{po.description}</td>
                <td className="px-2 py-3.5 text-ink-500">{po.plant}</td>
                <td className="px-2 py-3.5 font-semibold text-ink-800">{formatCurrency(po.value)}</td>
                <td className="px-2 py-3.5 text-ink-500">{formatDate(po.delivery)}</td>
                <td className="px-2 py-3.5">
                  <Badge>{po.status}</Badge>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <button className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 hover:text-ink-700" aria-label="Export">
                    <FileDown size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-ink-100 px-5 py-3.5 text-xs text-ink-400">
        <span>Showing {rows.length} of {purchaseOrders.length} purchase orders</span>
        <span>Source: SAP MM · Document type NB</span>
      </div>
    </div>
  );
}
