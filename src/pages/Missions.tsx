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
        type: "Medical Emergency",
        urgency: "critical" as const,
        location: "125 Park Avenue, Sector 7",
        time: "5 minutes ago",
        distance: "1.2 km",
      },
    ],
    completed: [
      {
        id: "2",
        type: "Traffic Incident",
        urgency: "medium" as const,
        location: "Oak Street & 5th Avenue",
        time: "2 hours ago",
        distance: "3.5 km",
      },
      {
        id: "3",
        type: "Public Disturbance",
        urgency: "low" as const,
        location: "Central Park North Entrance",
        time: "5 hours ago",
        distance: "2.1 km",
      },
    ],
    pending: [
      {
        id: "4",
        type: "Equipment Check",
        urgency: "low" as const,
        location: "Station 12",
        time: "Scheduled for tomorrow",
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
            <h1 className="font-display font-bold text-2xl">My Missions</h1>
            <p className="text-sm text-white/80">View and manage your assignments</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-4">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="active" className="gap-2">
              <Clock className="w-4 h-4" />
              Active
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <CheckCircle className="w-4 h-4" />
              Completed
            </TabsTrigger>
            <TabsTrigger value="pending" className="gap-2">
              <AlertCircle className="w-4 h-4" />
              Pending
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
                <p className="text-lg font-semibold">No active missions</p>
                <p className="text-sm">You're all caught up!</p>
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
