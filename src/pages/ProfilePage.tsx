import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Edit, Settings } from "lucide-react";
import { useSession } from "@/components/SessionContextProvider";

const ProfilePage = () => {
  const { user } = useSession();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mon Profil</h1>
          <p className="text-muted-foreground">Gérez vos informations personnelles</p>
        </div>
        <Button variant="outline" className="shadow-card hover:shadow-hover transition-all">
          <Edit className="mr-2 h-4 w-4" /> 
          Modifier le profil
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Information */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <span>Informations personnelles</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-foreground">{user?.email || "Non renseigné"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Dernière connexion</label>
              <p className="text-foreground">{user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : "Jamais"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Compte créé le</label>
              <p className="text-foreground">{user?.created_at ? new Date(user.created_at).toLocaleDateString() : "Non disponible"}</p>
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-primary" />
              <span>Paramètres du compte</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-8">
              <Settings className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Paramètres
              </h3>
              <p className="text-muted-foreground">
                Les paramètres de sécurité et préférences seront disponibles ici
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;