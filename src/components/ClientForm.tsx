"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
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
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/components/SessionContextProvider";

const formSchema = z.object({
  id: z.string().optional(),
  entity_type: z.enum(["personne_physique", "personne_morale", "contrepartie_eligible"], {
    message: "Veuillez sélectionner un type d'entité.",
  }).default("personne_physique"),
  nom: z.string().optional(),
  prenom: z.string().optional(),
  raison_sociale: z.string().optional(),
  siren: z.string().optional(),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }).optional().or(z.literal("")),
  telephone: z.string().optional(),
  adresse: z.string().optional(),
  ville: z.string().optional(),
  date_naissance: z.date().optional(),
  date_entree_relation: z.date().optional(),
});

type ClientFormValues = z.infer<typeof formSchema>;

interface ClientFormProps {
  clientId?: string;
  onSave?: () => void;
}

const ClientForm = ({ clientId, onSave }: ClientFormProps) => {
  const navigate = useNavigate();
  const { user } = useSession();
  const [loading, setLoading] = useState(false);

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entity_type: "personne_physique",
      nom: "",
      prenom: "",
      raison_sociale: "",
      siren: "",
      email: "",
      telephone: "",
      adresse: "",
      ville: "",
    },
  });

  const entityType = form.watch("entity_type");

  useEffect(() => {
    if (clientId) {
      loadClient();
    }
  }, [clientId]);

  const loadClient = async () => {
    try {
      const { data: client, error } = await supabase
        .from("clients")
        .select("*")
        .eq("id", clientId)
        .single();

      if (error) throw error;

      if (client) {
        form.reset({
          id: client.id,
          entity_type: client.entity_type || "personne_physique",
          nom: client.nom || "",
          prenom: client.prenom || "",
          raison_sociale: client.raison_sociale || "",
          siren: client.siren || "",
          email: client.email || "",
          telephone: client.telephone || "",
          adresse: client.adresse || "",
          ville: client.ville || "",
          date_naissance: client.date_naissance ? new Date(client.date_naissance) : undefined,
          date_entree_relation: client.date_entree_relation ? new Date(client.date_entree_relation) : undefined,
        });
      }
    } catch (error: any) {
      console.error("Error loading client:", error);
      toast.error("Erreur lors du chargement du client");
    }
  };

  const onSubmit = async (values: ClientFormValues) => {
    if (!user) {
      toast.error("Vous devez être connecté pour créer un client.");
      return;
    }

    setLoading(true);

    try {
      // Validation based on entity type
      if (values.entity_type === "personne_physique") {
        if (!values.nom || !values.prenom) {
          toast.error("Le nom et le prénom sont requis pour une personne physique.");
          setLoading(false);
          return;
        }
      } else if (values.entity_type === "personne_morale" || values.entity_type === "contrepartie_eligible") {
        if (!values.raison_sociale) {
          toast.error("La raison sociale est requise pour une personne morale.");
          setLoading(false);
          return;
        }
      }

      const clientData = {
        entity_type: values.entity_type,
        nom: values.nom || null,
        prenom: values.prenom || null,
        raison_sociale: values.raison_sociale || null,
        siren: values.siren || null,
        email: values.email || null,
        telephone: values.telephone || null,
        adresse: values.adresse || null,
        ville: values.ville || null,
        date_naissance: values.date_naissance?.toISOString().split('T')[0] || null,
        date_entree_relation: values.date_entree_relation?.toISOString().split('T')[0] || null,
        created_by: user.id,
      };

      if (clientId) {
        // Update existing client
        const { error } = await supabase
          .from("clients")
          .update(clientData)
          .eq("id", clientId);

        if (error) throw error;

        toast.success("Client mis à jour avec succès !");
      } else {
        // Create new client
        const { error } = await supabase
          .from("clients")
          .insert([clientData]);

        if (error) throw error;

        toast.success("Client créé avec succès !");
        form.reset();
      }

      if (onSave) {
        onSave();
      } else {
        navigate("/clients");
      }
    } catch (error: any) {
      console.error("Error saving client:", error);
      toast.error("Erreur lors de la sauvegarde du client");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card border-0">
      <CardHeader>
        <CardTitle>
          {clientId ? "Modifier le client" : "Nouveau client"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="entity_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type d'entité</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le type d'entité" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="personne_physique">Personne physique</SelectItem>
                      <SelectItem value="personne_morale">Personne morale</SelectItem>
                      <SelectItem value="contrepartie_eligible">Contrepartie éligible</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {entityType === "personne_physique" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="nom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom *</FormLabel>
                        <FormControl>
                          <Input placeholder="Nom" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="prenom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom *</FormLabel>
                        <FormControl>
                          <Input placeholder="Prénom" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="date_naissance"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date de naissance</FormLabel>
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
              </>
            )}

            {(entityType === "personne_morale" || entityType === "contrepartie_eligible") && (
              <>
                <FormField
                  control={form.control}
                  name="raison_sociale"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Raison sociale *</FormLabel>
                      <FormControl>
                        <Input placeholder="Raison sociale" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="siren"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SIREN</FormLabel>
                      <FormControl>
                        <Input placeholder="SIREN" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telephone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input placeholder="Téléphone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="adresse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse</FormLabel>
                    <FormControl>
                      <Input placeholder="Adresse" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ville"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ville</FormLabel>
                    <FormControl>
                      <Input placeholder="Ville" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="date_entree_relation"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date d'entrée en relation</FormLabel>
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
              {loading ? "Enregistrement..." : clientId ? "Mettre à jour" : "Créer le client"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ClientForm;