"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  UserPlus,
  ChevronDown,
  ListChecks,
  UploadCloud,
  RefreshCw,
  LogOut,
  Settings,
  Sparkles,
  Zap,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { useLoader } from "../LoaderProvider";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  children?: { label: string; href: string; icon: React.ElementType }[];
};


const HAIRLINE = "rgba(255,255,255,0.08)";

const NAV: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    label: "Invoices",
    href: "/invoices",
    icon: FileText,
    children: [
      { label: "Invoice List", href: "/invoices", icon: ListChecks },
      { label: "Upload Document", href: "/invoices/upload", icon: UploadCloud },
    ],
  },
  { label: "Purchase Orders", href: "/purchase-orders", icon: ClipboardList },
  { label: "Onboarding", href: "/onboarding", icon: UserPlus },
];

export function Sidebar() {
  const { start, stop } = useLoader();

  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>("Invoices");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const router = useRouter();
  const handleSignout = () => {
    localStorage.removeItem("dbmsc_vendor");
    router.replace("/login");
  }



  const navigate = (href: string) => {
    start();

    setTimeout(() => {
      router.push(href);
    }, 700);
  };

  useEffect(() => {
    stop();
  }, [pathname, stop]);

  useEffect(() => {
    stop();
  }, [pathname, stop]);

  return (
       <aside className="fixed inset-y-0 left-0 z-30 hidden w-[280px] flex-col bg-gradient-to-b from-gray-50 via-white to-gray-50/80 shadow-[2px_0_8px_rgba(0,0,0,0.04)] lg:flex">
      {/* ---------------- Brand Header ---------------- */}
      <div
        className="flex h-20 items-center gap-3 px-6"
        style={{ borderBottom: `1px solid ${HAIRLINE}` }}
      >
        {/* Logo mark */}
  <div className="h-80 w-80 flex items-center justify-center">
  <Logo variant="light" />
</div>

        {/* Stacked brand lockup — ties logo + product name into one unit */}
        <div className="flex min-w-0 flex-col leading-none">
          {/* <span className="text-[15px] font-extrabold tracking-tight text-gray-900">
            DBMSC
          </span> */}
          <div className="mt-1 flex items-center gap-1.5">
            <span className="h-3 w-px bg-orange-300/70" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-500">
              Supplier Portal
            </span>
          </div>
        </div>
      </div>
      {/* Navigation */}
      <div className="relative flex-1 overflow-y-auto scrollbar-thin px-4 py-5">
        <p className="px-3 pb-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400/80">
          Workspace
        </p>
        <nav className="flex flex-col gap-1.5">
          {NAV.map((item) => {
            const isParentActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            const hasChildren = !!item.children;
            const isOpen = openGroup === item.label;

            return (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() => {
                    if (hasChildren) {
                      setOpenGroup(isOpen ? null : item.label);
                      return;
                    }

                    navigate(item.href);
                  }}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "group relative flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300",
                    isParentActive
                      ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg shadow-orange-300/40"
                      : "text-gray-600 hover:bg-orange-50/80 hover:text-orange-600"
                  )}
                >
                  {!isParentActive && (
                    <div
                      className={cn(
                        "absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/10 to-orange-500/5 opacity-0 transition-opacity duration-300",
                        hoveredItem === item.label && "opacity-100"
                      )}
                    />
                  )}

                  <span className="relative flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-300",
                        isParentActive
                          ? "bg-white/20"
                          : "bg-orange-100/60 group-hover:bg-orange-100"
                      )}
                    >
                      <item.icon
                        size={18}
                        className={cn(
                          isParentActive
                            ? "text-white"
                            : "text-orange-500 group-hover:text-orange-600"
                        )}
                      />
                    </div>

                    <span>{item.label}</span>
                  </span>

                  {hasChildren && (
                    <ChevronDown
                      size={16}
                      className={cn(
                        "transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                    />
                  )}
                </button>

                {/* Dropdown Children */}
                {hasChildren && (
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="ml-8 mt-2 flex flex-col gap-1 border-l-2 border-orange-200/60 pl-4">
                        {item.children!.map((child) => {
                          const isActive = pathname === child.href;
                          return (
                            <button
                              key={child.href}
                              type="button"
                              onClick={() => navigate(child.href)}
                              className={cn(
                                "group flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-300",
                                isActive
                                  ? "bg-orange-50 text-orange-600"
                                  : "text-gray-400 hover:bg-orange-50/50 hover:text-orange-500"
                              )}
                            >
                              <child.icon
                                size={14}
                                strokeWidth={2}
                                className={cn(
                                  "transition-colors",
                                  isActive
                                    ? "text-orange-500"
                                    : "text-gray-300 group-hover:text-orange-400"
                                )}
                              />

                              {child.label}

                              {isActive && (
                                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-orange-500" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Quick Stats Section */}
        <div className="mt-8 px-3">
          <div className="rounded-2xl bg-gradient-to-br from-orange-50 via-white to-orange-50/50 p-4 border border-orange-100/60">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <p className="text-xs font-semibold text-gray-700">Quick Stats</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-500">This Month</span>
                <span className="text-sm font-bold text-gray-800">247</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-orange-100">
                <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-orange-400 to-orange-500" />
              </div>
              <p className="text-[10px] text-gray-400">68% of monthly target</p>
            </div>
          </div>
        </div>

        <p className="px-3 pb-2.5 pt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400/80">
          System
        </p>
        <Link
          href="#"
          className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-gray-500 transition-all duration-300 hover:bg-orange-50/80 hover:text-orange-600"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-100/60 transition-colors group-hover:bg-orange-100">
            <Settings size={18} className="text-orange-400 group-hover:text-orange-500" />
          </div>
          Settings
        </Link>
      </div>

      {/* SAP Connection Status */}
      <div className="relative border-t border-orange-100/60 bg-gradient-to-r from-orange-50/30 via-white to-orange-50/30 p-4">
        <div className="rounded-2xl bg-white p-4 border border-orange-100/60 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-r from-orange-400 to-orange-500" />
                </span>
              </div>
              <span className="text-xs font-semibold text-gray-700">Connected</span>
            </div>
            <div className="rounded-lg bg-orange-100 px-2 py-0.5">
              <span className="text-[10px] font-bold text-orange-600">SAP S/4HANA</span>
            </div>
          </div>
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-gray-400">
            <RefreshCw size={11} className="text-orange-300" />
            Last sync: 2 minutes ago
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[10px] text-gray-300">
            <Zap className="h-3 w-3 text-orange-400" />
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text font-semibold text-transparent">
              Enterprise Grade Connection
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignout}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-3 text-sm font-medium text-gray-500 transition-all duration-300 hover:from-gray-200 hover:to-gray-100 hover:text-gray-600">
          <LogOut size={18} className="text-orange-300" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
