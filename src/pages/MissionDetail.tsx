import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Clock, Users, Camera, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const MissionDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isResolved, setIsResolved] = useState(false);

  const handleResolve = () => {
    setIsResolved(true);
    toast.success("Mission marked as resolved!");
    setTimeout(() => {
      navigate("/missions");
    }, 2000);
  };

  const handleRequestReinforcement = () => {
    toast.info("Reinforcement request sent to dispatch");
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
          <div className="flex-1">
            <h1 className="font-display font-bold text-xl">Mission #{id}</h1>
            <p className="text-sm text-white/80">In Progress</p>
          </div>
        </div>
      </header>

      {/* Mission Content */}
      <div className="p-4 space-y-6">
        {/* Mission Info */}
        <div className="bg-card rounded-2xl p-6 shadow-md border border-border space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold mb-2">
                Medical Emergency
              </h2>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-sm font-semibold bg-destructive/10 text-destructive">
                Critical Priority
              </div>
            </div>
            {isResolved && (
              <CheckCircle className="w-12 h-12 text-success animate-scale-in" />
            )}
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary-light mt-0.5" />
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-sm text-muted-foreground">
                  125 Park Avenue, Sector 7
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary-light mt-0.5" />
              <div>
                <p className="font-semibold">Received</p>
                <p className="text-sm text-muted-foreground">5 minutes ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Map */}
        <div className="bg-card rounded-2xl overflow-hidden shadow-md border border-border">
          <div className="gradient-primary p-4 text-white">
            <h3 className="font-display font-bold flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Live Navigation
            </h3>
          </div>
          <div className="aspect-video bg-muted relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <MapPin className="w-16 h-16 text-primary-light animate-pulse" />
              <div className="text-center">
                <p className="text-2xl font-display font-bold text-primary">
                  1.2 km
                </p>
                <p className="text-sm text-muted-foreground">
                  Estimated: 4 minutes
                </p>
              </div>
              <Button variant="gradient" size="lg">
                Open in Maps
              </Button>
            </div>
          </div>
        </div>

        {/* Mission Steps */}
        <div className="bg-card rounded-2xl p-6 shadow-md border border-border">
          <h3 className="font-display font-bold text-lg mb-4">
            Mission Progress
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center text-white text-sm font-bold">
                ✓
              </div>
              <span className="text-muted-foreground line-through">
                Mission accepted
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-white text-sm font-bold animate-pulse">
                2
              </div>
              <span className="font-semibold">En route to location</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-bold">
                3
              </div>
              <span className="text-muted-foreground">
                Complete mission objectives
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-bold">
                4
              </div>
              <span className="text-muted-foreground">Submit report</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="gradient"
            size="lg"
            className="w-full"
            onClick={handleResolve}
            disabled={isResolved}
          >
            <CheckCircle className="w-5 h-5" />
            {isResolved ? "Mission Resolved" : "Mark as Resolved"}
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="lg">
              <Camera className="w-5 h-5" />
              Add Photo
            </Button>
            <Button
              variant="alert"
              size="lg"
              onClick={handleRequestReinforcement}
            >
              <Users className="w-5 h-5" />
              Request Backup
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionDetail;
