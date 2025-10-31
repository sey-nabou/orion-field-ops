import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MissionCard } from "@/components/MissionCard";
import { ArrowLeft, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Missions = () => {
  const navigate = useNavigate();

  const missions = {
    active: [
      {
        id: "1",
        type: "Urgence Médicale",
        urgency: "critical" as const,
        location: "Avenue Léopold Sédar Senghor, Plateau",
        time: "Il y a 5 minutes",
        distance: "1.2 km",
      },
    ],
    completed: [
      {
        id: "2",
        type: "Accident de Circulation",
        urgency: "medium" as const,
        location: "Route de Rufisque, Pikine",
        time: "Il y a 2 heures",
        distance: "3.5 km",
      },
      {
        id: "3",
        type: "Désordre Public",
        urgency: "low" as const,
        location: "Marché Sandaga, Médina",
        time: "Il y a 5 heures",
        distance: "2.1 km",
      },
    ],
    pending: [
      {
        id: "4",
        type: "Vérification Équipement",
        urgency: "low" as const,
        location: "Commissariat Central, Thiès",
        time: "Prévu pour demain",
        distance: "4.2 km",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="gradient-primary text-white p-3 sm:p-4 shadow-lg">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-bold text-xl sm:text-2xl">Mes Missions</h1>
            <p className="text-xs sm:text-sm text-white/80 truncate">Consultez et gérez vos affectations</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 sm:mb-6">
            <TabsTrigger value="active" className="gap-1 sm:gap-2 text-xs sm:text-sm">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Actives</span>
              <span className="xs:hidden">Act.</span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-1 sm:gap-2 text-xs sm:text-sm">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Terminées</span>
              <span className="xs:hidden">Term.</span>
            </TabsTrigger>
            <TabsTrigger value="pending" className="gap-1 sm:gap-2 text-xs sm:text-sm">
              <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">En attente</span>
              <span className="xs:hidden">Att.</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {missions.active.length > 0 ? (
              missions.active.map((mission) => (
                <div
                  key={mission.id}
                  onClick={() => navigate(`/mission/${mission.id}`)}
                  className="cursor-pointer"
                >
                  <MissionCard {...mission} />
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-semibold">Aucune mission active</p>
                <p className="text-sm">Vous êtes à jour !</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {missions.completed.map((mission) => (
              <div
                key={mission.id}
                onClick={() => navigate(`/mission/${mission.id}`)}
                className="cursor-pointer"
              >
                <MissionCard {...mission} />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {missions.pending.map((mission) => (
              <div
                key={mission.id}
                onClick={() => navigate(`/mission/${mission.id}`)}
                className="cursor-pointer"
              >
                <MissionCard {...mission} />
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Missions;
