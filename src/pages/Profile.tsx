import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, Shield, Bell, Globe, LogOut } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/auth");
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
          <h1 className="font-display font-bold text-2xl">Profile & Settings</h1>
        </div>
      </header>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Agent Info */}
        <div className="bg-card rounded-2xl p-6 shadow-md border border-border text-center">
          <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold mb-1">Agent Silva</h2>
          <p className="text-muted-foreground mb-4">ID: A-2547</p>
          <StatusBadge status="available" size="md" />
          
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
            <div>
              <p className="text-2xl font-display font-bold text-primary">
                42
              </p>
              <p className="text-xs text-muted-foreground">Missions</p>
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-success">
                98%
              </p>
              <p className="text-xs text-muted-foreground">Success Rate</p>
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-accent">
                4.9
              </p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
          </div>
        </div>

        {/* Specialization */}
        <div className="bg-card rounded-2xl p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-primary-light" />
            <h3 className="font-display font-bold text-lg">Specialization</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Medical Response
            </span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Emergency Coordination
            </span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Crisis Management
            </span>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-card rounded-2xl p-6 shadow-md border border-border space-y-6">
          <h3 className="font-display font-bold text-lg">Settings</h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary-light" />
              <div>
                <Label htmlFor="notifications" className="text-base font-semibold">
                  Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive mission alerts
                </p>
              </div>
            </div>
            <Switch
              id="notifications"
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-primary-light" />
              <div>
                <Label htmlFor="language" className="text-base font-semibold">
                  Language
                </Label>
                <p className="text-sm text-muted-foreground">English (US)</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Change
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-primary-light" />
              <div>
                <Label className="text-base font-semibold">
                  Dark Mode
                </Label>
                <p className="text-sm text-muted-foreground">
                  Toggle theme
                </p>
              </div>
            </div>
            <Switch
              id="darkMode"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button variant="outline" size="lg" className="w-full">
            Edit Profile
          </Button>
          <Button
            variant="destructive"
            size="lg"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
