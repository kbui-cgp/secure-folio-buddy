import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const NewClientDocumentPage = () => {
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
        <div>
          <h1 className="text-3xl font-bold text-foreground">Nouveau Document Client</h1>
          <p className="text-muted-foreground">Générer un document pour le client {id}</p>
        </div>
      </div>

      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>Génération de document</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Document client
            </h3>
            <p className="text-muted-foreground">
              Le générateur de documents spécifique au client sera intégré ici
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewClientDocumentPage;