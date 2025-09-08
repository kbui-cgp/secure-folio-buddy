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
import { Input } from "@/components/ui/input";
import { useSession } from "@/components/SessionContextProvider";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Client {
  id: string;
  nom: string | null;
  prenom: string | null;
  email: string | null;
  telephone: string | null;
  adresse: string | null;
  date_naissance: string | null;
  ville: string | null;
  entity_type: "personne_physique" | "personne_morale" | "contrepartie_eligible";
  raison_sociale: string | null;
  siren: string | null;
  workflow_stage: string;
  date_entree_relation: string | null;
  der_sent_at: string | null;
  der_signed_at: string | null;
  last_annual_review_at: string | null;
  kyc_completed_at: string | null;
  investor_questionnaire_completed_at: string | null;
  lcb_ft_completed_at: string | null;
  mission_letter_sent_at: string | null;
  mission_letter_signed_at: string | null;
  adequacy_declaration_sent_at: string | null;
  adequacy_declaration_signed_at: string | null;
  subscription_completed_at: string | null;
  created_at: string;
}

const ClientTable = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user, loading: sessionLoading } = useSession();

  const fetchClients = useCallback(async (searchQuery: string) => {
    if (sessionLoading) return;

    setLoading(true);
    if (!user) {
      toast.error("Vous devez être connecté pour voir les clients.");
      navigate("/login");
      setLoading(false);
      return;
    }

    let query = supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (searchQuery.trim()) {
      query = query.or(`nom.ilike.%${searchQuery}%,prenom.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,raison_sociale.ilike.%${searchQuery}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching clients:", error);
      toast.error("Erreur lors du chargement des clients");
    } else {
      setClients(data || []);
    }

    setLoading(false);
  }, [user, sessionLoading, navigate]);

  useEffect(() => {
    fetchClients(searchTerm);
  }, [fetchClients, searchTerm]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const getWorkflowStageLabel = (stage: string) => {
    const labels = {
      der: "DER",
      kyc_investor_profile: "KYC & Profil Investisseur",
      lcb_ft_governance: "LCB-FT & Gouvernance",
      mission_rto_letter: "Lettre de Mission RTO",
      adequacy_report: "Déclaration d'Adéquation",
      subscription_stage: "Souscription",
      follow_up: "Suivi"
    };
    return labels[stage as keyof typeof labels] || stage;
  };

  const getWorkflowStatus = (client: Client) => {
    switch (client.workflow_stage) {
      case "der":
        if (client.der_signed_at) return "✅ DER Signé";
        if (client.der_sent_at) return "📧 DER Envoyé";
        return "⏳ DER à envoyer";
      
      case "kyc_investor_profile":
        if (client.kyc_completed_at && client.investor_questionnaire_completed_at) return "✅ KYC & Profil complétés";
        if (client.kyc_completed_at) return "🔄 KYC complété, Profil en attente";
        if (client.investor_questionnaire_completed_at) return "🔄 Profil complété, KYC en attente";
        return "⏳ KYC & Profil à compléter";
      
      case "lcb_ft_governance":
        if (client.lcb_ft_completed_at) return "✅ LCB-FT complété";
        return "⏳ LCB-FT à compléter";
      
      case "mission_rto_letter":
        if (client.mission_letter_signed_at) return "✅ Lettre signée";
        if (client.mission_letter_sent_at) return "📧 Lettre envoyée";
        return "⏳ Lettre à envoyer";
      
      case "adequacy_report":
        if (client.adequacy_declaration_signed_at) return "✅ Déclaration signée";
        if (client.adequacy_declaration_sent_at) return "📧 Déclaration envoyée";
        return "⏳ Déclaration à envoyer";
      
      case "subscription_stage":
        if (client.subscription_completed_at) return "✅ Souscription complétée";
        return "⏳ Souscription en cours";
      
      case "follow_up":
        return "👁️ Suivi actif";
      
      default:
        return "❓ Statut inconnu";
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
          placeholder="Rechercher par nom, prénom, email ou raison sociale..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Étape Workflow</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date création</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>
                  {client.entity_type === "personne_physique" 
                    ? `${client.prenom || ""} ${client.nom || ""}`.trim()
                    : client.raison_sociale || ""}
                </TableCell>
                <TableCell>
                  <div>
                    {client.email && <div>{client.email}</div>}
                    {client.telephone && <div>{client.telephone}</div>}
                  </div>
                </TableCell>
                <TableCell>
                  {client.entity_type === "personne_physique" ? "Personne physique" :
                   client.entity_type === "personne_morale" ? "Personne morale" :
                   "Contrepartie éligible"}
                </TableCell>
                <TableCell>{getWorkflowStageLabel(client.workflow_stage)}</TableCell>
                <TableCell>
                  <div className="text-sm">{getWorkflowStatus(client)}</div>
                </TableCell>
                <TableCell>
                  {format(new Date(client.created_at), "dd/MM/yyyy", { locale: fr })}
                </TableCell>
                <TableCell>
                  <Link to={`/clients/${client.id}`}>
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

      {clients.length === 0 && !loading && (
        <div className="text-center py-8 text-muted-foreground">
          Aucun client trouvé.
        </div>
      )}
    </div>
  );
};

export default ClientTable;