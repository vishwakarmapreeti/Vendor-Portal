"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, LayoutDashboard, FileText, ClipboardList, UserPlus, ListChecks, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Invoice List", href: "/invoices", icon: ListChecks },
  { label: "Upload Document", href: "/invoices/upload", icon: UploadCloud },
  { label: "Purchase Orders", href: "/purchase-orders", icon: ClipboardList },
  { label: "Onboarding", href: "/onboarding", icon: UserPlus },
];

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <div className="absolute inset-0 bg-ink-950/60" onClick={onClose} />
      <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-ink-900 p-4 animate-fade-in">
        <div className="flex items-center justify-between px-2 py-2">
          <Logo variant="dark" />
          <button onClick={onClose} className="rounded-lg p-2 text-white/60 hover:bg-white/10" aria-label="Close menu">
            <X size={18} />
          </button>
        </div>
        <nav className="mt-4 flex flex-col gap-1">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
                  active ? "bg-white/[0.08] text-white" : "text-white/60 hover:bg-white/[0.05]"
                )}
              >
                <link.icon size={18} className={active ? "text-brand-400" : "text-white/40"} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
