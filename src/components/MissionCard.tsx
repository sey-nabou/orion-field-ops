import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MissionCardProps {
  id: string;
  type: string;
  urgency: "low" | "medium" | "high" | "critical";
  location: string;
  time: string;
  distance?: string;
  onAccept?: () => void;
  onDecline?: () => void;
  isNotification?: boolean;
}

const urgencyConfig = {
  low: {
    label: "Priorité Basse",
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success",
  },
  medium: {
    label: "Priorité Moyenne",
    color: "text-status-mission",
    bgColor: "bg-status-mission/10",
    borderColor: "border-status-mission",
  },
  high: {
    label: "Priorité Haute",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent",
  },
  critical: {
    label: "Critique",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive",
  },
};

export const MissionCard = ({
  id,
  type,
  urgency,
  location,
  time,
  distance,
  onAccept,
  onDecline,
  isNotification = false,
}: MissionCardProps) => {
  const config = urgencyConfig[urgency];

  return (
    <Card
      className={cn(
        "p-5 animate-slide-in border-2 shadow-lg hover:shadow-xl transition-all duration-300",
        isNotification && config.borderColor
      )}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-display text-lg font-bold text-foreground">
              {type}
            </h3>
            <div
              className={cn(
                "inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold",
                config.bgColor,
                config.color
              )}
            >
              <AlertCircle className="w-3 h-3" />
              {config.label}
            </div>
          </div>
          {distance && (
            <div className="text-sm font-semibold text-primary-light">
              {distance}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary-light" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-primary-light" />
            <span>{time}</span>
          </div>
        </div>

        {/* Actions */}
        {isNotification && (onAccept || onDecline) && (
          <div className="flex gap-3 pt-2">
            {onAccept && (
              <Button
                variant="gradient"
                size="lg"
                onClick={onAccept}
                className="flex-1"
              >
                Accepter Mission
              </Button>
            )}
            {onDecline && (
              <Button
                variant="outline"
                size="lg"
                onClick={onDecline}
                className="flex-1"
              >
                Refuser
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
