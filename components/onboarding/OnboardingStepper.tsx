import { onboardingSteps } from "@/lib/data";
import { CheckCircle2, Clock, AlertTriangle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const ICON = {
  Approved: { Icon: CheckCircle2, cls: "bg-emerald-500 text-white" },
  "In Review": { Icon: Clock, cls: "bg-sky-500 text-white" },
  "Action Required": { Icon: AlertTriangle, cls: "bg-brand-500 text-white" },
  "Not Started": { Icon: Circle, cls: "bg-ink-200 text-ink-400" },
} as const;

export function OnboardingStepper() {
  return (
    <div className="flex flex-col">
      {onboardingSteps.map((step, i) => {
        const { Icon, cls } = ICON[step.status];
        return (
          <div key={step.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full", cls)}>
                <Icon size={16} />
              </div>
              {i < onboardingSteps.length - 1 && <div className="my-1 w-px flex-1 bg-ink-100" />}
            </div>
            <div className="pb-7">
              <p className="text-sm font-semibold text-ink-800">{step.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-ink-400">{step.description}</p>
              <span
                className={cn(
                  "mt-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                  step.status === "Approved" && "bg-emerald-50 text-emerald-700",
                  step.status === "In Review" && "bg-sky-50 text-sky-700",
                  step.status === "Action Required" && "bg-brand-50 text-brand-700",
                  step.status === "Not Started" && "bg-ink-100 text-ink-400"
                )}
              >
                {step.status}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
