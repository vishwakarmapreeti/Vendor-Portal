import { vendorsOnboarding } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";

export function VendorOnboardingTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-xs text-ink-400">
            <th className="px-5 py-3 font-medium">Vendor</th>
            <th className="px-2 py-3 font-medium">Category</th>
            <th className="px-2 py-3 font-medium">Contact</th>
            <th className="px-2 py-3 font-medium">Progress</th>
            <th className="px-5 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {vendorsOnboarding.map((v) => (
            <tr key={v.name} className="border-t border-ink-100 hover:bg-ink-50/60">
              <td className="px-5 py-3.5 font-semibold text-ink-800">{v.name}</td>
              <td className="px-2 py-3.5 text-ink-500">{v.category}</td>
              <td className="px-2 py-3.5 text-ink-500">{v.contact}</td>
              <td className="px-2 py-3.5">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-ink-100">
                    <div
                      className="h-full rounded-full bg-brand-gradient"
                      style={{ width: `${v.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-ink-500">{v.progress}%</span>
                </div>
              </td>
              <td className="px-5 py-3.5">
                <Badge>{v.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
