import { cn } from "@/lib/utils";

type Status = "available" | "on-mission" | "unavailable";

interface StatusBadgeProps {
  status: Status;
  size?: "sm" | "md" | "lg";
}

const statusConfig = {
  available: {
    label: "Disponible",
    color: "bg-status-available",
    icon: "🟢",
  },
  "on-mission": {
    label: "En Mission",
    color: "bg-status-mission",
    icon: "🟡",
  },
  unavailable: {
    label: "Indisponible",
    color: "bg-status-unavailable",
    icon: "🔴",
  },
};

export const StatusBadge = ({ status, size = "md" }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full font-medium text-white shadow-md",
        config.color,
        sizeClasses[size]
      )}
    >
      <span className="text-xs">{config.icon}</span>
      {config.label}
    </div>
  );
};
