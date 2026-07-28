interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

export default function SummaryCard({
  title,
  value,
  icon,
}: SummaryCardProps) {
  return (
    <div className="rounded-2xl border-t-4 border-orange-500 bg-white p-6 shadow-md transition hover:shadow-lg">
      <div className="flex items-center gap-5">
        {/* Icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600">
          {icon}
        </div>

        {/* Content */}
        <div>
          <h3 className="text-2xl font-medium text-gray-600">
            {title}
          </h3>

          <p className="mt-1 text-4xl font-bold text-orange-600">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}