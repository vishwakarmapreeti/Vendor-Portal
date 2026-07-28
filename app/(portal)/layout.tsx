import { Sidebar } from "@/components/layout/Sidebar";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F7F8]">
      <Sidebar />
      <div className="lg:pl-[268px]">{children}</div>
    </div>
  );
}
