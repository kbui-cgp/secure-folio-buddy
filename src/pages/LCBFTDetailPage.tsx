import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Edit } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const LCBFTDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center space-x-4">
        <Link to={`/clients/${id}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">LCB-FT Client</h1>
          <p className="text-muted-foreground">Lutte contre le blanchiment et financement du terrorisme</p>
        </div>
        <Button variant="outline">
          <Edit className="h-4 w-4 mr-2" />
          Modifier LCB-FT
        </Button>
      </div>

      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>Dossier LCB-FT</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Contrôles LCB-FT
            </h3>
            <p className="text-muted-foreground">
              Les vérifications LCB-FT, pièces justificatives et niveau de vigilance seront affichés ici
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LCBFTDetailPage;