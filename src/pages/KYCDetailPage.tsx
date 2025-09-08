import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldCheck, Edit } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const KYCDetailPage = () => {
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
          <h1 className="text-3xl font-bold text-foreground">KYC Client</h1>
          <p className="text-muted-foreground">Profil d'investisseur et connaissance client</p>
        </div>
        <Button variant="outline">
          <Edit className="h-4 w-4 mr-2" />
          Modifier KYC
        </Button>
      </div>

      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span>Profil KYC</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <ShieldCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Know Your Customer
            </h3>
            <p className="text-muted-foreground">
              Le profil KYC détaillé du client sera affiché ici avec toutes les informations réglementaires
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KYCDetailPage;