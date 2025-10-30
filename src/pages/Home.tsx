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
    const statusMessages = {
      available: "Disponible",
      "on-mission": "En mission",
      unavailable: "Indisponible"
    };
    toast.success(`Statut mis à jour : ${statusMessages[newStatus]}`);
  };

  const handleAcceptMission = () => {
    setShowNotification(false);
    setAgentStatus("on-mission");
    toast.success("Mission acceptée !");
    navigate("/mission/1");
  };

  const handleDeclineMission = () => {
    setShowNotification(false);
    toast.info("Mission refusée");
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
              <h2 className="font-display font-bold text-lg">Mamadou Ndiaye</h2>
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
          <h3 className="font-display font-bold text-lg mb-4">Statut de l'Agent</h3>
          <div className="flex items-center justify-between mb-4">
            <StatusBadge status={agentStatus} size="lg" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={agentStatus === "available" ? "success" : "outline"}
              size="sm"
              onClick={() => handleStatusChange("available")}
            >
              Disponible
            </Button>
            <Button
              variant={agentStatus === "on-mission" ? "alert" : "outline"}
              size="sm"
              onClick={() => handleStatusChange("on-mission")}
            >
              En Mission
            </Button>
            <Button
              variant={agentStatus === "unavailable" ? "destructive" : "outline"}
              size="sm"
              onClick={() => handleStatusChange("unavailable")}
            >
              Pause
            </Button>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-card rounded-2xl overflow-hidden shadow-md border border-border">
          <div className="gradient-primary p-4 text-white">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <h3 className="font-display font-bold">Votre Position</h3>
            </div>
          </div>
          <div className="aspect-video bg-muted relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="w-12 h-12 text-primary-light mx-auto animate-pulse" />
                <p className="text-sm text-muted-foreground font-medium">
                  Plateau, Dakar
                </p>
                <p className="text-xs text-muted-foreground">
                  Coordonnées: 14.7167° N, 17.4677° W
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
                Nouvelle Alerte Mission
              </h3>
            </div>
            <MissionCard
              id="1"
              type="Urgence Médicale"
              urgency="critical"
              location="Avenue Léopold Sédar Senghor, Plateau"
              time="Il y a 2 minutes"
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
            <span>Voir Missions</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/profile")}
            className="h-24 flex-col"
          >
            <User className="w-8 h-8 mb-2" />
            <span>Profil</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
