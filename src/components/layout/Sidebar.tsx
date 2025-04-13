
import { useEffect, useState } from "react";
import { 
  Database, 
  Clock, 
  LineChart, 
  Settings, 
  Info 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const SidebarItem = ({ icon, isActive, onClick }: SidebarItemProps) => {
  return (
    <button
      className={cn(
        "w-12 h-12 flex items-center justify-center rounded-lg mb-2 transition-all",
        isActive ? "bg-primary text-white" : "text-gray-400 hover:bg-secondary hover:text-primary"
      )}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export function Sidebar({ onNavChange }: { onNavChange: (nav: string) => void }) {
  const [activeNav, setActiveNav] = useState<string>("database");

  useEffect(() => {
    onNavChange(activeNav);
  }, [activeNav, onNavChange]);

  return (
    <div className="flex flex-col items-center py-6 bg-sidebar w-16 border-r border-border">
      <div className="flex flex-col items-center mb-8">
        <div className="bg-primary rounded-lg p-2 mb-3">
          <Database size={24} className="text-white" />
        </div>
      </div>

      <div className="flex flex-col items-center flex-1 space-y-1">
        <SidebarItem
          icon={<Database size={20} />}
          isActive={activeNav === "database"}
          onClick={() => setActiveNav("database")}
        />
        <SidebarItem
          icon={<Clock size={20} />}
          isActive={activeNav === "activity"}
          onClick={() => setActiveNav("activity")}
        />
        <SidebarItem
          icon={<LineChart size={20} />}
          isActive={activeNav === "analytics"}
          onClick={() => setActiveNav("analytics")}
        />
        <SidebarItem
          icon={<Settings size={20} />}
          isActive={activeNav === "settings"}
          onClick={() => setActiveNav("settings")}
        />
      </div>

      <div className="mt-auto">
        <SidebarItem
          icon={<Info size={20} />}
          isActive={activeNav === "info"}
          onClick={() => setActiveNav("info")}
        />
      </div>
    </div>
  );
}
