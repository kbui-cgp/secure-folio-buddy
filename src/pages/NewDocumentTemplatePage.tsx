import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FilePlus } from "lucide-react";
import { Link } from "react-router-dom";

const NewDocumentTemplatePage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center space-x-4">
        <Link to="/document-templates">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Nouveau Modèle</h1>
          <p className="text-muted-foreground">Créer un nouveau modèle de document</p>
        </div>
      </div>

      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FilePlus className="h-5 w-5 text-primary" />
            <span>Création de modèle</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FilePlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nouveau modèle de document
            </h3>
            <p className="text-muted-foreground">
              Le formulaire de création de modèle sera intégré ici
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewDocumentTemplatePage;