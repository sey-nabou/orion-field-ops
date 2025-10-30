import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { MissionCard } from "@/components/MissionCard";
import { MapPin, Bell, User, Menu } from "lucide-react";
import { toast } from "sonner";

type AgentStatus = "available" | "on-mission" | "unavailable";

const Home = () => {
  const navigate = useNavigate();
  const [agentStatus, setAgentStatus] = useState<AgentStatus>("available");
  const [showNotification, setShowNotification] = useState(true);

  const handleStatusChange = (newStatus: AgentStatus) => {
    setAgentStatus(newStatus);
    toast.success(`Status updated to ${newStatus}`);
  };

  const handleAcceptMission = () => {
    setShowNotification(false);
    setAgentStatus("on-mission");
    toast.success("Mission accepted!");
    navigate("/mission/1");
  };

  const handleDeclineMission = () => {
    setShowNotification(false);
    toast.info("Mission declined");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="gradient-primary text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg">Agent Silva</h2>
              <p className="text-xs text-white/80">ID: A-2547</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2">
              <Bell className="w-6 h-6" />
              {showNotification && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-accent rounded-full animate-pulse" />
              )}
            </button>
            <button className="p-2">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Status Section */}
        <div className="bg-card rounded-2xl p-6 shadow-md border border-border">
          <h3 className="font-display font-bold text-lg mb-4">Agent Status</h3>
          <div className="flex items-center justify-between mb-4">
            <StatusBadge status={agentStatus} size="lg" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={agentStatus === "available" ? "success" : "outline"}
              size="sm"
              onClick={() => handleStatusChange("available")}
            >
              Available
            </Button>
            <Button
              variant={agentStatus === "on-mission" ? "alert" : "outline"}
              size="sm"
              onClick={() => handleStatusChange("on-mission")}
            >
              On Mission
            </Button>
            <Button
              variant={agentStatus === "unavailable" ? "destructive" : "outline"}
              size="sm"
              onClick={() => handleStatusChange("unavailable")}
            >
              Break
            </Button>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-card rounded-2xl overflow-hidden shadow-md border border-border">
          <div className="gradient-primary p-4 text-white">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <h3 className="font-display font-bold">Your Location</h3>
            </div>
          </div>
          <div className="aspect-video bg-muted relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="w-12 h-12 text-primary-light mx-auto animate-pulse" />
                <p className="text-sm text-muted-foreground font-medium">
                  Downtown Sector 7
                </p>
                <p className="text-xs text-muted-foreground">
                  Coordinates: 40.7128° N, 74.0060° W
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Notification */}
        {showNotification && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-accent">
              <Bell className="w-5 h-5 animate-pulse" />
              <h3 className="font-display font-bold text-lg">
                New Mission Alert
              </h3>
            </div>
            <MissionCard
              id="1"
              type="Medical Emergency"
              urgency="critical"
              location="125 Park Avenue, Sector 7"
              time="2 minutes ago"
              distance="1.2 km"
              isNotification
              onAccept={handleAcceptMission}
              onDecline={handleDeclineMission}
            />
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="gradient"
            size="lg"
            onClick={() => navigate("/missions")}
            className="h-24 flex-col"
          >
            <Bell className="w-8 h-8 mb-2" />
            <span>View Missions</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/profile")}
            className="h-24 flex-col"
          >
            <User className="w-8 h-8 mb-2" />
            <span>Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
