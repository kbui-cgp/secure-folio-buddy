"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const NewClientPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center space-x-4">
        <Link to="/clients">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Nouveau Client</h1>
          <p className="text-muted-foreground">Créer un nouveau client dans le système</p>
        </div>
      </div>

      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5 text-primary" />
            <span>Informations du client</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Formulaire de création client
            </h3>
            <p className="text-muted-foreground">
              Le formulaire de création client existant sera intégré ici
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewClientPage;