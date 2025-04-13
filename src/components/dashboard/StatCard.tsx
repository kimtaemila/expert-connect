
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change: {
    value: string;
    positive: boolean;
  };
  icon: JSX.Element;
}

export function StatCard({ title, value, change, icon }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div>
          <div className="stat-label">{title}</div>
          <div className="stat-value">{value}</div>
          <div className={cn(
            "stat-change",
            change.positive ? "stat-change-positive" : "stat-change-negative"
          )}>
            {change.positive ? (
              <ArrowUpIcon className="w-3 h-3 mr-1" />
            ) : (
              <ArrowDownIcon className="w-3 h-3 mr-1" />
            )}
            {change.value}
          </div>
        </div>
        <div className="p-2 rounded-md bg-muted">
          {icon}
        </div>
      </div>
    </div>
  );
}
