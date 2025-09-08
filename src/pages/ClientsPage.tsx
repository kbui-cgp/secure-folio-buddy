"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, FilePlus2, Users, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const ClientsPage = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Liste des Clients</h1>
          <p className="text-muted-foreground">Gérez tous vos clients en toute conformité</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" className="shadow-card hover:shadow-hover transition-all">
            <Link to="/documents/generate">
              <FilePlus2 className="mr-2 h-4 w-4" /> 
              Générer un document
            </Link>
          </Button>
          <Button asChild className="bg-gradient-primary hover:shadow-hover transition-all">
            <Link to="/clients/new">
              <PlusCircle className="mr-2 h-4 w-4" /> 
              Nouveau client
            </Link>
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Rechercher un client..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              Filtrer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Client Table Placeholder */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <span>Clients ({127})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Tableau des clients
            </h3>
            <p className="text-muted-foreground mb-6">
              Le composant ClientTable sera intégré ici avec toutes les fonctionnalités existantes
            </p>
            <Link to="/clients/new">
              <Button className="bg-gradient-primary">
                <PlusCircle className="mr-2 h-4 w-4" />
                Créer votre premier client
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientsPage;