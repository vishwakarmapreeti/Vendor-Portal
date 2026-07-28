import { Topbar } from "@/components/layout/Topbar";
import { Card } from "@/components/ui/Card";
import { POTable } from "@/components/invoices/POTable";

export default function PurchaseOrdersPage() {
  return (
    <div className="animate-fade-in">
      <Topbar title="Purchase Orders" subtitle="Live purchase order data from SAP MM" />
      <main className="p-5 lg:p-8">
        <Card className="overflow-hidden">
          <POTable />
        </Card>
      </main>
    </div>
  );
}
