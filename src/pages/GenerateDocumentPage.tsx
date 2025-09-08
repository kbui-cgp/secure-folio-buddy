import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileOutput } from "lucide-react";
import { Link } from "react-router-dom";

const GenerateDocumentPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center space-x-4">
        <Link to="/documents">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Générer un Document</h1>
          <p className="text-muted-foreground">Créer un nouveau document à partir d'un modèle</p>
        </div>
      </div>

      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileOutput className="h-5 w-5 text-primary" />
            <span>Génération de document</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FileOutput className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Générateur de documents
            </h3>
            <p className="text-muted-foreground">
              Le système de génération de documents sera intégré ici
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenerateDocumentPage;