import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    // Simulate login
    toast.success("Connexion réussie !");
    navigate("/");
  };

  return (
    <div className="min-h-screen gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 shadow-xl">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h1 className="font-display text-4xl font-bold text-white mb-2">
            ORION
          </h1>
          <p className="text-white/80 text-lg">
            Assistant Intelligent de Terrain
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-semibold">
              Adresse Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="agent@orion.sn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-base font-semibold">
              Mot de Passe
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 text-base"
            />
          </div>

          <Button
            type="submit"
            variant="gradient"
            size="lg"
            className="w-full"
          >
            Se Connecter
          </Button>

          <button
            type="button"
            className="w-full text-center text-sm text-primary-light hover:text-primary transition-colors"
          >
            Mot de passe oublié ?
          </button>
        </form>

        <p className="text-center text-white/60 text-sm mt-6">
          © 2026 Système ORION - JOJ Sénégal. Tous droits réservés.
        </p>
      </div>
    </div>
  );
};

export default Auth;
