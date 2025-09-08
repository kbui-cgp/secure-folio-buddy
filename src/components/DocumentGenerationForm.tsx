"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, FileText, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  clientId: z.string().min(1, { message: "Veuillez sélectionner un client." }),
  modeleId: z.string().min(1, { message: "Veuillez sélectionner un modèle." }),
  dateCreation: z.date().optional(),
});

type DocumentGenerationFormValues = z.infer<typeof formSchema>;

interface Client {
  id: string;
  nom: string | null;
  prenom: string | null;
  raison_sociale: string | null;
  entity_type: string;
}

interface Template {
  id: string;
  nom_modele: string;
  type_document: string;
}

const DocumentGenerationForm = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [generatedDocument, setGeneratedDocument] = useState<any>(null);

  const form = useForm<DocumentGenerationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateCreation: new Date(),
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setDataLoading(true);
    try {
      // Fetch clients
      const { data: clientsData, error: clientsError } = await supabase
        .from("clients")
        .select("id, nom, prenom, raison_sociale, entity_type")
        .order("created_at", { ascending: false });

      if (clientsError) throw clientsError;

      // Fetch templates
      const { data: templatesData, error: templatesError } = await supabase
        .from("modeles_documents")
        .select("id, nom_modele, type_document")
        .order("nom_modele");

      if (templatesError) throw templatesError;

      setClients(clientsData || []);
      setTemplates(templatesData || []);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      toast.error("Erreur lors du chargement des données");
    } finally {
      setDataLoading(false);
    }
  };

  const getClientDisplayName = (client: Client) => {
    if (client.entity_type === "personne_physique") {
      return `${client.prenom || ""} ${client.nom || ""}`.trim();
    }
    return client.raison_sociale || "";
  };

  const onSubmit = async (values: DocumentGenerationFormValues) => {
    setLoading(true);
    setGeneratedDocument(null);

    try {
      // Create document record
      const { data: documentData, error: documentError } = await supabase
        .from("documents")
        .insert([
          {
            client_id: values.clientId,
            modele_id: values.modeleId,
            type_document: templates.find(t => t.id === values.modeleId)?.type_document || "Document",
            created_by: (await supabase.auth.getUser()).data.user?.id,
          }
        ])
        .select()
        .single();

      if (documentError) throw documentError;

      toast.success("Document généré avec succès !");
      setGeneratedDocument(documentData);
      form.reset({ dateCreation: new Date() });
    } catch (error: any) {
      console.error("Error generating document:", error);
      toast.error("Erreur lors de la génération du document");
    } finally {
      setLoading(false);
    }
  };

  if (dataLoading) {
    return (
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>Génération de document</span>
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
                    <FormLabel>Client</FormLabel>
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
                name="modeleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modèle de document</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un modèle" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.nom_modele} - {template.type_document}
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
                name="dateCreation"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date de création</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: fr })
                            ) : (
                              <span>Sélectionnez une date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Génération en cours...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Générer le document
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {generatedDocument && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Document généré avec succès</AlertTitle>
          <AlertDescription>
            Le document "{generatedDocument.type_document}" a été créé pour le client sélectionné.
            Vous pouvez le consulter dans la section Documents.
          </AlertDescription>
        </Alert>
      )}

      {clients.length === 0 && !dataLoading && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Aucun client disponible</AlertTitle>
          <AlertDescription>
            Vous devez d'abord créer des clients avant de pouvoir générer des documents.
          </AlertDescription>
        </Alert>
      )}

      {templates.length === 0 && !dataLoading && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Aucun modèle disponible</AlertTitle>
          <AlertDescription>
            Vous devez d'abord créer des modèles de documents avant de pouvoir générer des documents.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default DocumentGenerationForm;