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
      <header className="gradient-primary text-white p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="font-display font-bold text-2xl">Mes Missions</h1>
            <p className="text-sm text-white/80">Consultez et gérez vos affectations</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-4">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="active" className="gap-2">
              <Clock className="w-4 h-4" />
              Actives
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <CheckCircle className="w-4 h-4" />
              Terminées
            </TabsTrigger>
            <TabsTrigger value="pending" className="gap-2">
              <AlertCircle className="w-4 h-4" />
              En attente
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
