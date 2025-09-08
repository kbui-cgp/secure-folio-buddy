"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/components/SessionContextProvider";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Document {
  id: string;
  client_id: string;
  clients: {
    nom: string;
    prenom: string;
  };
  type_document: string;
  created_at: string;
  sent_at: string | null;
  signed_at: string | null;
}

const DocumentTable = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user, loading: sessionLoading } = useSession();

  const fetchDocuments = useCallback(async (searchQuery: string) => {
    if (sessionLoading) return;

    setLoading(true);
    if (!user) {
      toast.error("Vous devez être connecté pour voir les documents.");
      navigate("/login");
      setLoading(false);
      return;
    }

    let query = supabase
      .from("documents")
      .select("id, client_id, type_document, created_at, clients(nom, prenom), sent_at, signed_at")
      .order("created_at", { ascending: false });

    if (searchQuery.trim()) {
      query = query.or(
        `type_document.ilike.%${searchQuery}%,clients.nom.ilike.%${searchQuery}%,clients.prenom.ilike.%${searchQuery}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching documents:", error);
      toast.error("Erreur lors du chargement des documents");
    } else {
      setDocuments(data || []);
    }

    setLoading(false);
  }, [user, sessionLoading, navigate]);

  useEffect(() => {
    fetchDocuments(searchTerm);
  }, [fetchDocuments, searchTerm]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const getStatusBadge = (document: Document) => {
    if (document.signed_at) {
      return <span className="text-green-600 font-medium">✅ Signé</span>;
    } else if (document.sent_at) {
      return <span className="text-blue-600 font-medium">📧 Envoyé</span>;
    } else {
      return <span className="text-gray-600 font-medium">📄 Généré</span>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Rechercher par type de document ou nom du client..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type de document</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date de création</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((document) => (
              <TableRow key={document.id}>
                <TableCell className="font-medium">
                  {document.type_document}
                </TableCell>
                <TableCell>
                  {`${document.clients?.prenom || ""} ${document.clients?.nom || ""}`.trim()}
                </TableCell>
                <TableCell>
                  {format(new Date(document.created_at), "dd/MM/yyyy HH:mm", { locale: fr })}
                </TableCell>
                <TableCell>
                  {getStatusBadge(document)}
                </TableCell>
                <TableCell>
                  <Link to={`/documents/${document.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Voir
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {documents.length === 0 && !loading && (
        <div className="text-center py-8 text-muted-foreground">
          Aucun document trouvé.
        </div>
      )}
    </div>
  );
};

export default DocumentTable;