import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { OnboardingStepper } from "@/components/onboarding/OnboardingStepper";
import { VendorOnboardingTable } from "@/components/onboarding/VendorOnboardingTable";
import { Button } from "@/components/ui/Button";
import { UserPlus } from "lucide-react";

export default function OnboardingPage() {
  return (
    <div className="animate-fade-in">
      <Topbar title="Onboarding" subtitle="Vendor qualification and SAP vendor master creation" />

      <main className="grid grid-cols-1 gap-5 p-5 lg:grid-cols-3 lg:p-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <div>
              <h3 className="text-sm font-bold text-ink-900">Your Onboarding Progress</h3>
              <p className="text-xs text-ink-400">Al Rashid Steel Trading LLC</p>
            </div>
          </CardHeader>
          <CardContent>
            <OnboardingStepper />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <h3 className="text-sm font-bold text-ink-900">Vendor Pipeline</h3>
              <p className="text-xs text-ink-400">Prospective vendors in qualification</p>
            </div>
            <Button variant="primary" className="shrink-0">
              <UserPlus size={15} />
              Invite Vendor
            </Button>
          </CardHeader>
          <CardContent className="p-0 pt-4">
            <VendorOnboardingTable />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
