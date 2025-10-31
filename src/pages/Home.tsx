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
      <header className="gradient-primary text-white p-3 sm:p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-display font-bold text-base sm:text-lg truncate">Mamadou Ndiaye</h2>
              <p className="text-xs text-white/80">ID: A-2547</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
              {showNotification && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-accent rounded-full animate-pulse" />
              )}
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
        {/* Status Section */}
        <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-md border border-border">
          <h3 className="font-display font-bold text-base sm:text-lg mb-3 sm:mb-4">Statut de l'Agent</h3>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <StatusBadge status={agentStatus} size="lg" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={agentStatus === "available" ? "success" : "outline"}
              size="sm"
              onClick={() => handleStatusChange("available")}
              className="text-xs sm:text-sm px-2 py-2"
            >
              Disponible
            </Button>
            <Button
              variant={agentStatus === "on-mission" ? "alert" : "outline"}
              size="sm"
              onClick={() => handleStatusChange("on-mission")}
              className="text-xs sm:text-sm px-2 py-2"
            >
              En Mission
            </Button>
            <Button
              variant={agentStatus === "unavailable" ? "destructive" : "outline"}
              size="sm"
              onClick={() => handleStatusChange("unavailable")}
              className="text-xs sm:text-sm px-2 py-2"
            >
              Pause
            </Button>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-card rounded-2xl overflow-hidden shadow-md border border-border">
          <div className="gradient-primary p-3 sm:p-4 text-white">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              <h3 className="font-display font-bold text-sm sm:text-base">Votre Position</h3>
            </div>
          </div>
          <div className="aspect-video bg-muted relative overflow-hidden">
            {/* Static Map using OpenStreetMap - Plateau, Dakar */}
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-17.4777%2C14.7067%2C-17.4577%2C14.7267&layer=mapnik&marker=14.7167%2C-17.4677"
              style={{ border: 0 }}
              title="Carte - Plateau, Dakar"
              className="w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4">
              <div className="text-center">
                <p className="text-xs sm:text-sm text-white font-semibold drop-shadow-lg">
                  Plateau, Dakar
                </p>
                <p className="text-xs text-white/80 drop-shadow-lg">
                  14.7167° N, 17.4677° W
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Notification */}
        {showNotification && (
          <div className="space-y-2 animate-slide-in">
            <div className="flex items-center gap-2 text-accent">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
              <h3 className="font-display font-bold text-base sm:text-lg">
                Nouvelle Alerte Mission
              </h3>
            </div>
            <div className="bg-gradient-to-br from-destructive/10 to-destructive/5 rounded-2xl p-1 shadow-xl">
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
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <Button
            variant="gradient"
            size="lg"
            onClick={() => navigate("/missions")}
            className="h-20 sm:h-24 flex-col text-sm sm:text-base"
          >
            <Bell className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2" />
            <span>Voir Missions</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/profile")}
            className="h-20 sm:h-24 flex-col text-sm sm:text-base"
          >
            <User className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2" />
            <span>Profil</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
