"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, FilePlus2, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

const DocumentsPage = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Documents</h1>
          <p className="text-muted-foreground">Gérez tous vos documents réglementaires</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" className="shadow-card hover:shadow-hover transition-all">
            <Link to="/document-templates">
              <FileText className="mr-2 h-4 w-4" /> 
              Modèles
            </Link>
          </Button>
          <Button asChild className="bg-gradient-primary hover:shadow-hover transition-all">
            <Link to="/documents/generate">
              <FilePlus2 className="mr-2 h-4 w-4" /> 
              Générer document
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
                placeholder="Rechercher un document..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              Filtrer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>Documents générés ({254})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Liste des documents
            </h3>
            <p className="text-muted-foreground mb-6">
              Tous les documents existants seront affichés ici avec les fonctionnalités de tri et filtrage
            </p>
            <Link to="/documents/generate">
              <Button className="bg-gradient-primary">
                <FilePlus2 className="mr-2 h-4 w-4" />
                Générer votre premier document
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsPage;