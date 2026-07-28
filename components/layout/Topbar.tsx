"use client";

import { Bell, Search, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [vendor, setVendor] = useState<any>(null);

  useEffect(() => {
    const storedVendor = localStorage.getItem("dbmsc_vendor");

    if (storedVendor) {
      setVendor(JSON.parse(storedVendor));
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials =
    vendor?.contactName
      ?.split(" ")
      .filter(Boolean)
      .map((word: string) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "V";

  return (
    <header
      className={`sticky top-0 z-20 border-b bg-white/80 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "border-ink-100 shadow-[0_2px_16px_-4px_rgba(15,15,15,0.08)]" : "border-transparent"
      }`}
    >
      <div className="flex min-h-16 items-center justify-between gap-2 px-3 sm:px-5 lg:px-8">
        <div className="flex min-w-0 flex-shrink items-center gap-2">
          <button
            className="flex-shrink-0 rounded-lg p-2 text-ink-500 transition-colors hover:bg-ink-50 active:bg-ink-100 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-[15px] font-bold leading-tight text-ink-900 sm:text-[17px]">
              {title}
            </h1>
            {subtitle && (
              <p className="hidden truncate text-xs text-ink-400 xs:block">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-3">
          {/* Desktop search */}
          <div className="group hidden items-center gap-2 rounded-xl bg-ink-50 px-3 py-2 text-sm text-ink-400 ring-1 ring-inset ring-transparent transition-all focus-within:bg-white focus-within:ring-brand-500/40 lg:flex lg:w-72">
            <Search size={16} className="flex-shrink-0 transition-colors group-focus-within:text-brand-500" />
            <input
              placeholder="Search invoices, POs, vendors..."
              className="w-full bg-transparent text-ink-700 outline-none placeholder:text-ink-400"
            />
          </div>

          {/* Mobile search toggle */}
          <button
            className="rounded-xl p-2.5 text-ink-500 ring-1 ring-inset ring-ink-100 transition-colors hover:bg-ink-50 active:bg-ink-100 lg:hidden"
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
          >
            {searchOpen ? <X size={18} /> : <Search size={18} />}
          </button>

          <button
            className="group relative rounded-xl p-2.5 text-ink-500 ring-1 ring-inset ring-ink-100 transition-colors hover:bg-ink-50 active:bg-ink-100"
            aria-label="Notifications"
          >
            <Bell size={18} className="transition-transform group-hover:-rotate-6" />
            <span className="absolute right-2 top-2 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
            </span>
          </button>

          <div className="flex min-w-0 items-center gap-2 rounded-xl border border-gray-200 bg-white py-1.5 pl-1.5 pr-2 transition-shadow hover:shadow-sm sm:px-2">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-xs font-bold text-white ring-2 ring-white">
              {initials}
            </div>
            <div className="hidden min-w-0 md:block">
              <p className="max-w-[170px] truncate text-xs font-semibold text-ink-800">
                {vendor?.email || "Unknown Vendor"}
              </p>
              <p className="truncate text-[11px] text-ink-400">
                {vendor?.vendorId || "Vendor ID not available"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out lg:hidden ${
          searchOpen ? "max-h-16 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex items-center gap-2 border-t border-ink-100 bg-white px-3 py-2.5 sm:px-5">
          <Search size={16} className="flex-shrink-0 text-ink-400" />
          <input
            autoFocus={searchOpen}
            placeholder="Search invoices, POs, vendors..."
            className="w-full bg-transparent text-sm text-ink-700 outline-none placeholder:text-ink-400"
          />
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}