import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

const ConformityPage = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Conformité</h1>
          <p className="text-muted-foreground">Gérez la conformité réglementaire de vos clients</p>
        </div>
        <Button asChild className="bg-gradient-primary hover:shadow-hover transition-all">
          <Link to="/conformity/new">
            <Plus className="mr-2 h-4 w-4" /> 
            Nouvelle vérification
          </Link>
        </Button>
      </div>

      <Card className="bg-gradient-card shadow-card border-0">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Rechercher conformité..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              Filtrer
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span>Vérifications de conformité</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <ShieldCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Conformité réglementaire
            </h3>
            <p className="text-muted-foreground mb-6">
              Les vérifications de conformité LCB-FT et autres seront affichées ici
            </p>
            <Link to="/conformity/new">
              <Button className="bg-gradient-primary">
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle vérification
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConformityPage;