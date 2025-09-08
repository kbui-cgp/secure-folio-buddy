import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const EditConformityPage = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center space-x-4">
        <Link to={`/conformity/${id}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Modifier Conformité</h1>
          <p className="text-muted-foreground">ID: {id}</p>
        </div>
      </div>

      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Edit className="h-5 w-5 text-primary" />
            <span>Modification conformité</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Edit className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Modification conformité
            </h3>
            <p className="text-muted-foreground">
              Le formulaire de modification sera intégré ici
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditConformityPage;