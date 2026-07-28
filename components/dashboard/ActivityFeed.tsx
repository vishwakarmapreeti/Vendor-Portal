import { activity } from "@/lib/data";
import { Zap } from "lucide-react";

export function ActivityFeed() {
  return (
    <div className="flex flex-col">
      {activity.map((item, i) => (
        <div key={item.id} className="flex gap-3 py-3">
          <div className="flex flex-col items-center">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Zap size={13} />
            </div>
            {i < activity.length - 1 && <div className="mt-1 w-px flex-1 bg-ink-100" />}
          </div>
          <div className="pb-1">
            <p className="text-[13px] leading-snug text-ink-700">{item.text}</p>
            <p className="mt-0.5 text-[11px] text-ink-400">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
