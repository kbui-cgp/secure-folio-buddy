"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { PlusCircle, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/components/SessionContextProvider";

// Define the schema for a single checklist item
const checklistItemSchema = z.object({
  description: z.string().min(1, { message: "La description est requise." }),
  status: z.boolean().default(false),
});

// Define the main form schema
const formSchema = z.object({
  id: z.string().optional(),
  clientId: z.string().min(1, { message: "Veuillez sélectionner un client." }),
  documentId: z.string().optional().nullable(),
  statut_global: z.enum(["En attente", "Conforme", "Non conforme"], {
    message: "Veuillez sélectionner un statut global.",
  }),
  checklist: z.array(checklistItemSchema).min(1, { message: "La checklist doit contenir au moins un élément." }),
});

type ConformityFormValues = z.infer<typeof formSchema>;

interface Client {
  id: string;
  nom: string | null;
  prenom: string | null;
  raison_sociale: string | null;
  entity_type: string;
}

interface Document {
  id: string;
  type_document: string;
}

interface ConformityFormProps {
  conformityId?: string;
  onSave?: () => void;
}

const ConformityForm = ({ conformityId, onSave }: ConformityFormProps) => {
  const navigate = useNavigate();
  const { user } = useSession();
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const form = useForm<ConformityFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      statut_global: "En attente",
      checklist: [{ description: "", status: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "checklist",
  });

  const selectedClientId = form.watch("clientId");

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedClientId) {
      fetchDocuments(selectedClientId);
    } else {
      setDocuments([]);
    }
  }, [selectedClientId]);

  useEffect(() => {
    if (conformityId) {
      loadConformity();
    }
  }, [conformityId]);

  const fetchInitialData = async () => {
    try {
      const { data: clientsData, error: clientsError } = await supabase
        .from("clients")
        .select("id, nom, prenom, raison_sociale, entity_type")
        .order("created_at", { ascending: false });

      if (clientsError) throw clientsError;
      setClients(clientsData || []);
    } catch (error: any) {
      console.error("Error fetching clients:", error);
      toast.error("Erreur lors du chargement des clients");
    } finally {
      setLoadingData(false);
    }
  };

  const fetchDocuments = async (clientId: string) => {
    try {
      const { data: documentsData, error: documentsError } = await supabase
        .from("documents")
        .select("id, type_document")
        .eq("client_id", clientId)
        .order("created_at", { ascending: false });

      if (documentsError) throw documentsError;
      setDocuments(documentsData || []);
    } catch (error: any) {
      console.error("Error fetching documents:", error);
      toast.error("Erreur lors du chargement des documents");
    }
  };

  const loadConformity = async () => {
    try {
      const { data: conformity, error } = await supabase
        .from("conformite")
        .select("*")
        .eq("id", conformityId)
        .single();

      if (error) throw error;

      if (conformity) {
        // Parse the checklist from JSON
        const checklistData = Array.isArray(conformity.checklist) 
          ? conformity.checklist.map((item: any) => ({
              description: item.description || "",
              status: Boolean(item.status)
            }))
          : [{ description: "", status: false }];

        form.reset({
          id: conformity.id,
          clientId: conformity.client_id || "",
          documentId: conformity.document_id || null,
          statut_global: (conformity.statut_global as "En attente" | "Conforme" | "Non conforme") || "En attente",
          checklist: checklistData,
        });
      }
    } catch (error: any) {
      console.error("Error loading conformity:", error);
      toast.error("Erreur lors du chargement de la conformité");
    }
  };

  const getClientDisplayName = (client: Client) => {
    if (client.entity_type === "personne_physique") {
      return `${client.prenom || ""} ${client.nom || ""}`.trim();
    }
    return client.raison_sociale || "";
  };

  const onSubmit = async (values: ConformityFormValues) => {
    if (!user) {
      toast.error("Vous devez être connecté pour créer une conformité.");
      return;
    }

    setLoading(true);

    try {
      const conformityData = {
        client_id: values.clientId,
        document_id: values.documentId || null,
        statut_global: values.statut_global,
        checklist: values.checklist, // Store as JSON
        responsable_id: user.id,
      };

      if (conformityId) {
        // Update existing conformity
        const { error } = await supabase
          .from("conformite")
          .update(conformityData)
          .eq("id", conformityId);

        if (error) throw error;

        toast.success("Conformité mise à jour avec succès !");
      } else {
        // Create new conformity
        const { error } = await supabase
          .from("conformite")
          .insert([conformityData]);

        if (error) throw error;

        toast.success("Conformité créée avec succès !");
        form.reset({
          statut_global: "En attente",
          checklist: [{ description: "", status: false }],
        });
      }

      if (onSave) {
        onSave();
      } else {
        navigate("/conformity");
      }
    } catch (error: any) {
      console.error("Error saving conformity:", error);
      toast.error("Erreur lors de la sauvegarde de la conformité");
    } finally {
      setLoading(false);
    }
  };

  const addChecklistItem = () => {
    append({ description: "", status: false });
  };

  const removeChecklistItem = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  if (loadingData) {
    return <div>Chargement...</div>;
  }

  return (
    <Card className="bg-gradient-card shadow-card border-0">
      <CardHeader>
        <CardTitle>
          {conformityId ? "Modifier la conformité" : "Nouvelle conformité"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un client" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {getClientDisplayName(client)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="documentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document (optionnel)</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un document" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">Aucun document spécifique</SelectItem>
                      {documents.map((document) => (
                        <SelectItem key={document.id} value={document.id}>
                          {document.type_document}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="statut_global"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Statut global *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un statut" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="En attente">En attente</SelectItem>
                      <SelectItem value="Conforme">Conforme</SelectItem>
                      <SelectItem value="Non conforme">Non conforme</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel>Checklist de conformité *</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addChecklistItem}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Ajouter un élément
                </Button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <FormField
                    control={form.control}
                    name={`checklist.${index}.description`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="Description de l'élément de conformité"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`checklist.${index}.status`}
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm">Conforme</FormLabel>
                      </FormItem>
                    )}
                  />

                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeChecklistItem(index)}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Enregistrement..." : conformityId ? "Mettre à jour" : "Créer la conformité"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ConformityForm;