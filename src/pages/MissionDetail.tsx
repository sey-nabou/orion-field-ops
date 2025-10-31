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
    toast.success("Mission marquée comme résolue !");
    setTimeout(() => {
      navigate("/missions");
    }, 2000);
  };

  const handleRequestReinforcement = () => {
    toast.info("Demande de renfort envoyée au dispatching");
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
            <h1 className="font-display font-bold text-lg sm:text-xl truncate">Mission #{id}</h1>
            <p className="text-xs sm:text-sm text-white/80">En cours</p>
          </div>
        </div>
      </header>

      {/* Mission Content */}
      <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
        {/* Mission Info */}
        <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-md border border-border space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h2 className="font-display text-xl sm:text-2xl font-bold mb-2 break-words">
                Urgence Médicale
              </h2>
              <div className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-semibold bg-destructive/10 text-destructive">
                Priorité Critique
              </div>
            </div>
            {isResolved && (
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-success animate-scale-in flex-shrink-0" />
            )}
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-2 sm:gap-3">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary-light mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm sm:text-base">Localisation</p>
                <p className="text-xs sm:text-sm text-muted-foreground break-words">
                  Avenue Léopold Sédar Senghor, Plateau
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary-light mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm sm:text-base">Reçue</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Il y a 5 minutes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Map */}
        <div className="bg-card rounded-2xl overflow-hidden shadow-md border border-border">
          <div className="gradient-primary p-4 text-white">
            <h3 className="font-display font-bold flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Navigation en Direct
            </h3>
          </div>
          <div className="aspect-video bg-muted relative overflow-hidden">
            {/* Static Google Maps Image - Using coordinates for Dakar, Senegal */}
            <img 
              src="https://maps.googleapis.com/maps/api/staticmap?center=14.7167,-17.4677&zoom=15&size=600x400&markers=color:red%7C14.7167,-17.4677&key=YOUR_API_KEY_HERE"
              alt="Carte de localisation - Avenue Léopold Sédar Senghor, Dakar"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to OpenStreetMap tile if Google Maps fails
                e.currentTarget.src = `https://www.openstreetmap.org/export/embed.html?bbox=-17.4777,-17.4577,14.7067,14.7267&layer=mapnik&marker=14.7167,-17.4677`;
                e.currentTarget.style.border = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-3 px-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                <p className="text-xl sm:text-2xl font-display font-bold text-primary">
                  1.2 km
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Estimé : 4 minutes
                </p>
              </div>
              <Button 
                variant="gradient" 
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=14.7167,-17.4677`, '_blank')}
              >
                <MapPin className="w-4 h-4" />
                Ouvrir dans Maps
              </Button>
            </div>
          </div>
        </div>

        {/* Mission Steps */}
        <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-md border border-border">
          <h3 className="font-display font-bold text-base sm:text-lg mb-4">
            Progression de la Mission
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-success flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0">
                ✓
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground line-through">
                Mission acceptée
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary-light flex items-center justify-center text-white text-xs sm:text-sm font-bold animate-pulse flex-shrink-0">
                2
              </div>
              <span className="text-xs sm:text-sm font-semibold">En route vers le lieu</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs sm:text-sm font-bold flex-shrink-0">
                3
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground">
                Compléter les objectifs
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs sm:text-sm font-bold flex-shrink-0">
                4
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground">Soumettre le rapport</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="gradient"
            size="lg"
            className="w-full text-sm sm:text-base"
            onClick={handleResolve}
            disabled={isResolved}
          >
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            {isResolved ? "Mission Résolue" : "Marquer comme Résolue"}
          </Button>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <Button variant="outline" size="lg" className="text-xs sm:text-sm">
              <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Ajouter Photo</span>
              <span className="sm:hidden">Photo</span>
            </Button>
            <Button
              variant="alert"
              size="lg"
              className="text-xs sm:text-sm"
              onClick={handleRequestReinforcement}
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Demander Renfort</span>
              <span className="sm:hidden">Renfort</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionDetail;
