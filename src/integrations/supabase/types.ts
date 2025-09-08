export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      adequacy_reports: {
        Row: {
          advisor_id: string | null
          analysis_preconisations: Json | null
          client_id: string
          client_summary: Json | null
          created_at: string | null
          declaration_client_acknowledgement: boolean | null
          esg_info: Json | null
          id: string
          justification_adequation: Json | null
          objectives_missions: Json | null
          other_elements_advice: Json | null
          periodic_review_info: Json | null
          recommendation: Json | null
          report_date: string
          updated_at: string | null
        }
        Insert: {
          advisor_id?: string | null
          analysis_preconisations?: Json | null
          client_id: string
          client_summary?: Json | null
          created_at?: string | null
          declaration_client_acknowledgement?: boolean | null
          esg_info?: Json | null
          id?: string
          justification_adequation?: Json | null
          objectives_missions?: Json | null
          other_elements_advice?: Json | null
          periodic_review_info?: Json | null
          recommendation?: Json | null
          report_date?: string
          updated_at?: string | null
        }
        Update: {
          advisor_id?: string | null
          analysis_preconisations?: Json | null
          client_id?: string
          client_summary?: Json | null
          created_at?: string | null
          declaration_client_acknowledgement?: boolean | null
          esg_info?: Json | null
          id?: string
          justification_adequation?: Json | null
          objectives_missions?: Json | null
          other_elements_advice?: Json | null
          periodic_review_info?: Json | null
          recommendation?: Json | null
          report_date?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "adequacy_reports_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_files: {
        Row: {
          client_id: string
          created_at: string | null
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          mime_type: string | null
          uploaded_by: string
        }
        Insert: {
          client_id: string
          created_at?: string | null
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          uploaded_by: string
        }
        Update: {
          client_id?: string
          created_at?: string | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_files_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          adequacy_declaration_sent_at: string | null
          adequacy_declaration_signed_at: string | null
          adresse: string | null
          created_at: string | null
          created_by: string | null
          date_entree_relation: string | null
          date_naissance: string | null
          der_reminded_at: string | null
          der_sent_at: string | null
          der_signed_at: string | null
          email: string | null
          entity_type: Database["public"]["Enums"]["client_entity_type"] | null
          id: string
          investor_questionnaire_completed_at: string | null
          kyc_completed_at: string | null
          last_annual_review_at: string | null
          lcb_ft_completed_at: string | null
          mission_letter_sent_at: string | null
          mission_letter_signed_at: string | null
          nom: string | null
          prenom: string | null
          raison_sociale: string | null
          siren: string | null
          situation_patrimoniale: Json | null
          subscription_completed_at: string | null
          tags: string[] | null
          telephone: string | null
          updated_at: string | null
          ville: string | null
          workflow_stage:
            | Database["public"]["Enums"]["client_workflow_stage"]
            | null
        }
        Insert: {
          adequacy_declaration_sent_at?: string | null
          adequacy_declaration_signed_at?: string | null
          adresse?: string | null
          created_at?: string | null
          created_by?: string | null
          date_entree_relation?: string | null
          date_naissance?: string | null
          der_reminded_at?: string | null
          der_sent_at?: string | null
          der_signed_at?: string | null
          email?: string | null
          entity_type?: Database["public"]["Enums"]["client_entity_type"] | null
          id?: string
          investor_questionnaire_completed_at?: string | null
          kyc_completed_at?: string | null
          last_annual_review_at?: string | null
          lcb_ft_completed_at?: string | null
          mission_letter_sent_at?: string | null
          mission_letter_signed_at?: string | null
          nom?: string | null
          prenom?: string | null
          raison_sociale?: string | null
          siren?: string | null
          situation_patrimoniale?: Json | null
          subscription_completed_at?: string | null
          tags?: string[] | null
          telephone?: string | null
          updated_at?: string | null
          ville?: string | null
          workflow_stage?:
            | Database["public"]["Enums"]["client_workflow_stage"]
            | null
        }
        Update: {
          adequacy_declaration_sent_at?: string | null
          adequacy_declaration_signed_at?: string | null
          adresse?: string | null
          created_at?: string | null
          created_by?: string | null
          date_entree_relation?: string | null
          date_naissance?: string | null
          der_reminded_at?: string | null
          der_sent_at?: string | null
          der_signed_at?: string | null
          email?: string | null
          entity_type?: Database["public"]["Enums"]["client_entity_type"] | null
          id?: string
          investor_questionnaire_completed_at?: string | null
          kyc_completed_at?: string | null
          last_annual_review_at?: string | null
          lcb_ft_completed_at?: string | null
          mission_letter_sent_at?: string | null
          mission_letter_signed_at?: string | null
          nom?: string | null
          prenom?: string | null
          raison_sociale?: string | null
          siren?: string | null
          situation_patrimoniale?: Json | null
          subscription_completed_at?: string | null
          tags?: string[] | null
          telephone?: string | null
          updated_at?: string | null
          ville?: string | null
          workflow_stage?:
            | Database["public"]["Enums"]["client_workflow_stage"]
            | null
        }
        Relationships: []
      }
      conformite: {
        Row: {
          checklist: Json | null
          client_id: string | null
          created_at: string | null
          document_id: string | null
          id: string
          responsable_id: string | null
          statut_global: Database["public"]["Enums"]["conformity_status"] | null
          updated_at: string | null
        }
        Insert: {
          checklist?: Json | null
          client_id?: string | null
          created_at?: string | null
          document_id?: string | null
          id?: string
          responsable_id?: string | null
          statut_global?:
            | Database["public"]["Enums"]["conformity_status"]
            | null
          updated_at?: string | null
        }
        Update: {
          checklist?: Json | null
          client_id?: string | null
          created_at?: string | null
          document_id?: string | null
          id?: string
          responsable_id?: string | null
          statut_global?:
            | Database["public"]["Enums"]["conformity_status"]
            | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conformite_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conformite_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      document_audit_logs: {
        Row: {
          action_type: string
          client_file_id: string | null
          client_id: string | null
          created_at: string | null
          description: string | null
          document_id: string | null
          id: string
          user_id: string
        }
        Insert: {
          action_type: string
          client_file_id?: string | null
          client_id?: string | null
          created_at?: string | null
          description?: string | null
          document_id?: string | null
          id?: string
          user_id: string
        }
        Update: {
          action_type?: string
          client_file_id?: string | null
          client_id?: string | null
          created_at?: string | null
          description?: string | null
          document_id?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_audit_logs_client_file_id_fkey"
            columns: ["client_file_id"]
            isOneToOne: false
            referencedRelation: "client_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_audit_logs_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_audit_logs_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          client_id: string | null
          created_at: string | null
          created_by: string | null
          document_file_name: string | null
          document_file_path: string | null
          fichier_url: string | null
          id: string
          modele_id: string | null
          reminded_at: string | null
          sent_at: string | null
          signed_at: string | null
          statut_conformite:
            | Database["public"]["Enums"]["document_status"]
            | null
          type_document: string
          updated_at: string | null
          version: number | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          created_by?: string | null
          document_file_name?: string | null
          document_file_path?: string | null
          fichier_url?: string | null
          id?: string
          modele_id?: string | null
          reminded_at?: string | null
          sent_at?: string | null
          signed_at?: string | null
          statut_conformite?:
            | Database["public"]["Enums"]["document_status"]
            | null
          type_document: string
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          created_by?: string | null
          document_file_name?: string | null
          document_file_path?: string | null
          fichier_url?: string | null
          id?: string
          modele_id?: string | null
          reminded_at?: string | null
          sent_at?: string | null
          signed_at?: string | null
          statut_conformite?:
            | Database["public"]["Enums"]["document_status"]
            | null
          type_document?: string
          updated_at?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_modele_id_fkey"
            columns: ["modele_id"]
            isOneToOne: false
            referencedRelation: "modeles_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      investor_questionnaires: {
        Row: {
          annees_placements_financiers: string | null
          attitude_gains_pertes: string | null
          attitude_proche: string | null
          client_id: string
          climat_economique_3ans: string | null
          connaissance_instruments_financiers: Json | null
          conseil_professionnel_importance: string | null
          created_at: string | null
          created_by: string
          dimension_esg: string | null
          exclusion_activites: string | null
          experience_investisseur: string | null
          id: string
          impacts_negatifs_prendre_en_compte: string | null
          inclure_esg: boolean | null
          investor_type_final: string | null
          knowledge_experience_level_final: string | null
          last_reminded_at: string | null
          liquidites_insuffisantes_si: string | null
          methode_durabilite: string | null
          modes_gestion_choisis: string[] | null
          modes_gestion_connus: string[] | null
          part_minimale_alignee: string | null
          part_minimale_sfdr: string | null
          patrimoine_evolution: string | null
          profession_marches_financiers: boolean | null
          profile_result:
            | Database["public"]["Enums"]["investor_profile_type"]
            | null
          reaction_derniere_perte: string | null
          reaction_valeur_diminue: string | null
          rendement_prefere: string | null
          revenus_evolution: string | null
          scenarios_placement_answers: Json | null
          sources_information: string[] | null
          updated_at: string | null
        }
        Insert: {
          annees_placements_financiers?: string | null
          attitude_gains_pertes?: string | null
          attitude_proche?: string | null
          client_id: string
          climat_economique_3ans?: string | null
          connaissance_instruments_financiers?: Json | null
          conseil_professionnel_importance?: string | null
          created_at?: string | null
          created_by: string
          dimension_esg?: string | null
          exclusion_activites?: string | null
          experience_investisseur?: string | null
          id?: string
          impacts_negatifs_prendre_en_compte?: string | null
          inclure_esg?: boolean | null
          investor_type_final?: string | null
          knowledge_experience_level_final?: string | null
          last_reminded_at?: string | null
          liquidites_insuffisantes_si?: string | null
          methode_durabilite?: string | null
          modes_gestion_choisis?: string[] | null
          modes_gestion_connus?: string[] | null
          part_minimale_alignee?: string | null
          part_minimale_sfdr?: string | null
          patrimoine_evolution?: string | null
          profession_marches_financiers?: boolean | null
          profile_result?:
            | Database["public"]["Enums"]["investor_profile_type"]
            | null
          reaction_derniere_perte?: string | null
          reaction_valeur_diminue?: string | null
          rendement_prefere?: string | null
          revenus_evolution?: string | null
          scenarios_placement_answers?: Json | null
          sources_information?: string[] | null
          updated_at?: string | null
        }
        Update: {
          annees_placements_financiers?: string | null
          attitude_gains_pertes?: string | null
          attitude_proche?: string | null
          client_id?: string
          climat_economique_3ans?: string | null
          connaissance_instruments_financiers?: Json | null
          conseil_professionnel_importance?: string | null
          created_at?: string | null
          created_by?: string
          dimension_esg?: string | null
          exclusion_activites?: string | null
          experience_investisseur?: string | null
          id?: string
          impacts_negatifs_prendre_en_compte?: string | null
          inclure_esg?: boolean | null
          investor_type_final?: string | null
          knowledge_experience_level_final?: string | null
          last_reminded_at?: string | null
          liquidites_insuffisantes_si?: string | null
          methode_durabilite?: string | null
          modes_gestion_choisis?: string[] | null
          modes_gestion_connus?: string[] | null
          part_minimale_alignee?: string | null
          part_minimale_sfdr?: string | null
          patrimoine_evolution?: string | null
          profession_marches_financiers?: boolean | null
          profile_result?:
            | Database["public"]["Enums"]["investor_profile_type"]
            | null
          reaction_derniere_perte?: string | null
          reaction_valeur_diminue?: string | null
          rendement_prefere?: string | null
          revenus_evolution?: string | null
          scenarios_placement_answers?: Json | null
          sources_information?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "investor_questionnaires_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      kyc_profiles: {
        Row: {
          actifs_patrimoine: Json | null
          adresse_postale_kyc: string | null
          anciennete_profession: string | null
          avantage_matrimonial: string | null
          categorie_socio_professionnelle: string | null
          charges_details: Json | null
          civilite: string | null
          client_id: string
          code_postal_kyc: string | null
          consultant_avertissement_envoye: boolean | null
          consultant_coherence_informations: boolean | null
          consultant_completude_informations: boolean | null
          consultant_note: string | null
          created_at: string | null
          date_evenement_familial: string | null
          date_mesure_protection: string | null
          date_naissance_detail: string | null
          dispositions_autres: boolean | null
          dispositions_autres_donations: boolean | null
          dispositions_donation_dernier_vivant: boolean | null
          dispositions_donation_partage: boolean | null
          dispositions_legs_particuliers: boolean | null
          dispositions_legs_universels: boolean | null
          dispositions_precisions: string | null
          enfants_rattaches: Json | null
          epargne_precaution_souhaitee: string | null
          fatca_crs_citoyen_americain: boolean | null
          fatca_crs_code_nif: string | null
          fatca_crs_code_tin: string | null
          fatca_crs_pays_residence_fiscale: string | null
          horizon: string | null
          id: string
          ifi_base_imposable: string | null
          ifi_droits_immobiliers: string | null
          ifi_ifi_net_a_payer: string | null
          ifi_immeubles_batis: string | null
          ifi_immeubles_non_batis: string | null
          ifi_note: string | null
          ifi_passifs_deductibles: string | null
          ifi_reductions_ifi: string | null
          ifi_tmi_ifi: string | null
          ir_acquitte_en: string | null
          ir_charges_deductibles_revenu_global: string | null
          ir_csg_deductible: string | null
          ir_decote: string | null
          ir_deficit_foncier_reportable: string | null
          ir_disponible_fiscal: string | null
          ir_impot_revenu_bareme: string | null
          ir_impot_revenu_net_avant_correction: string | null
          ir_nombre_parts_fiscales: string | null
          ir_plafond_epargne_retraite_non_utilise: string | null
          ir_revenu_brut_global: string | null
          ir_revenu_fiscal_reference: string | null
          ir_revenu_imposable: string | null
          ir_taux_imposition: string | null
          ir_tmi_ir: string | null
          ir_total_credits_impot_imputations: string | null
          ir_total_impot_revenu_net: string | null
          ir_total_prelevements_sociaux_nets: string | null
          ir_total_reductions_impot: string | null
          ir_total_salaires_assimiles: string | null
          last_reminded_at: string | null
          last_updated_by: string | null
          lieu_naissance: string | null
          logement_note: string | null
          logement_status: string | null
          mesure_protection: string | null
          nationalite: string | null
          nom_naissance: string | null
          nom_societe: string | null
          objectifs_personnels_details: Json | null
          origine_revenus_sans_activite: string | null
          passifs_patrimoine: Json | null
          pays_residence_fiscale_kyc: string | null
          ppe_anciennete: string | null
          ppe_expose: boolean | null
          ppe_motif: string | null
          ppe_pays_exercice: string | null
          ppe_personne_exposee: string | null
          precisions_professionnelles: string | null
          profession: string | null
          profil_adequation:
            | Database["public"]["Enums"]["investor_profile_type"]
            | null
          regime_matrimonial: string | null
          revenus_details: Json | null
          situation_familiale: string | null
          statut_kyc: Database["public"]["Enums"]["kyc_status"] | null
          taux_endettement: string | null
          telephone_bureau: string | null
          telephone_domicile: string | null
          tolerance_risque: string | null
          total_actifs_bruts: string | null
          total_charges: string | null
          total_passifs: string | null
          total_revenus: string | null
          updated_at: string | null
          ville_kyc: string | null
        }
        Insert: {
          actifs_patrimoine?: Json | null
          adresse_postale_kyc?: string | null
          anciennete_profession?: string | null
          avantage_matrimonial?: string | null
          categorie_socio_professionnelle?: string | null
          charges_details?: Json | null
          civilite?: string | null
          client_id: string
          code_postal_kyc?: string | null
          consultant_avertissement_envoye?: boolean | null
          consultant_coherence_informations?: boolean | null
          consultant_completude_informations?: boolean | null
          consultant_note?: string | null
          created_at?: string | null
          date_evenement_familial?: string | null
          date_mesure_protection?: string | null
          date_naissance_detail?: string | null
          dispositions_autres?: boolean | null
          dispositions_autres_donations?: boolean | null
          dispositions_donation_dernier_vivant?: boolean | null
          dispositions_donation_partage?: boolean | null
          dispositions_legs_particuliers?: boolean | null
          dispositions_legs_universels?: boolean | null
          dispositions_precisions?: string | null
          enfants_rattaches?: Json | null
          epargne_precaution_souhaitee?: string | null
          fatca_crs_citoyen_americain?: boolean | null
          fatca_crs_code_nif?: string | null
          fatca_crs_code_tin?: string | null
          fatca_crs_pays_residence_fiscale?: string | null
          horizon?: string | null
          id?: string
          ifi_base_imposable?: string | null
          ifi_droits_immobiliers?: string | null
          ifi_ifi_net_a_payer?: string | null
          ifi_immeubles_batis?: string | null
          ifi_immeubles_non_batis?: string | null
          ifi_note?: string | null
          ifi_passifs_deductibles?: string | null
          ifi_reductions_ifi?: string | null
          ifi_tmi_ifi?: string | null
          ir_acquitte_en?: string | null
          ir_charges_deductibles_revenu_global?: string | null
          ir_csg_deductible?: string | null
          ir_decote?: string | null
          ir_deficit_foncier_reportable?: string | null
          ir_disponible_fiscal?: string | null
          ir_impot_revenu_bareme?: string | null
          ir_impot_revenu_net_avant_correction?: string | null
          ir_nombre_parts_fiscales?: string | null
          ir_plafond_epargne_retraite_non_utilise?: string | null
          ir_revenu_brut_global?: string | null
          ir_revenu_fiscal_reference?: string | null
          ir_revenu_imposable?: string | null
          ir_taux_imposition?: string | null
          ir_tmi_ir?: string | null
          ir_total_credits_impot_imputations?: string | null
          ir_total_impot_revenu_net?: string | null
          ir_total_prelevements_sociaux_nets?: string | null
          ir_total_reductions_impot?: string | null
          ir_total_salaires_assimiles?: string | null
          last_reminded_at?: string | null
          last_updated_by?: string | null
          lieu_naissance?: string | null
          logement_note?: string | null
          logement_status?: string | null
          mesure_protection?: string | null
          nationalite?: string | null
          nom_naissance?: string | null
          nom_societe?: string | null
          objectifs_personnels_details?: Json | null
          origine_revenus_sans_activite?: string | null
          passifs_patrimoine?: Json | null
          pays_residence_fiscale_kyc?: string | null
          ppe_anciennete?: string | null
          ppe_expose?: boolean | null
          ppe_motif?: string | null
          ppe_pays_exercice?: string | null
          ppe_personne_exposee?: string | null
          precisions_professionnelles?: string | null
          profession?: string | null
          profil_adequation?:
            | Database["public"]["Enums"]["investor_profile_type"]
            | null
          regime_matrimonial?: string | null
          revenus_details?: Json | null
          situation_familiale?: string | null
          statut_kyc?: Database["public"]["Enums"]["kyc_status"] | null
          taux_endettement?: string | null
          telephone_bureau?: string | null
          telephone_domicile?: string | null
          tolerance_risque?: string | null
          total_actifs_bruts?: string | null
          total_charges?: string | null
          total_passifs?: string | null
          total_revenus?: string | null
          updated_at?: string | null
          ville_kyc?: string | null
        }
        Update: {
          actifs_patrimoine?: Json | null
          adresse_postale_kyc?: string | null
          anciennete_profession?: string | null
          avantage_matrimonial?: string | null
          categorie_socio_professionnelle?: string | null
          charges_details?: Json | null
          civilite?: string | null
          client_id?: string
          code_postal_kyc?: string | null
          consultant_avertissement_envoye?: boolean | null
          consultant_coherence_informations?: boolean | null
          consultant_completude_informations?: boolean | null
          consultant_note?: string | null
          created_at?: string | null
          date_evenement_familial?: string | null
          date_mesure_protection?: string | null
          date_naissance_detail?: string | null
          dispositions_autres?: boolean | null
          dispositions_autres_donations?: boolean | null
          dispositions_donation_dernier_vivant?: boolean | null
          dispositions_donation_partage?: boolean | null
          dispositions_legs_particuliers?: boolean | null
          dispositions_legs_universels?: boolean | null
          dispositions_precisions?: string | null
          enfants_rattaches?: Json | null
          epargne_precaution_souhaitee?: string | null
          fatca_crs_citoyen_americain?: boolean | null
          fatca_crs_code_nif?: string | null
          fatca_crs_code_tin?: string | null
          fatca_crs_pays_residence_fiscale?: string | null
          horizon?: string | null
          id?: string
          ifi_base_imposable?: string | null
          ifi_droits_immobiliers?: string | null
          ifi_ifi_net_a_payer?: string | null
          ifi_immeubles_batis?: string | null
          ifi_immeubles_non_batis?: string | null
          ifi_note?: string | null
          ifi_passifs_deductibles?: string | null
          ifi_reductions_ifi?: string | null
          ifi_tmi_ifi?: string | null
          ir_acquitte_en?: string | null
          ir_charges_deductibles_revenu_global?: string | null
          ir_csg_deductible?: string | null
          ir_decote?: string | null
          ir_deficit_foncier_reportable?: string | null
          ir_disponible_fiscal?: string | null
          ir_impot_revenu_bareme?: string | null
          ir_impot_revenu_net_avant_correction?: string | null
          ir_nombre_parts_fiscales?: string | null
          ir_plafond_epargne_retraite_non_utilise?: string | null
          ir_revenu_brut_global?: string | null
          ir_revenu_fiscal_reference?: string | null
          ir_revenu_imposable?: string | null
          ir_taux_imposition?: string | null
          ir_tmi_ir?: string | null
          ir_total_credits_impot_imputations?: string | null
          ir_total_impot_revenu_net?: string | null
          ir_total_prelevements_sociaux_nets?: string | null
          ir_total_reductions_impot?: string | null
          ir_total_salaires_assimiles?: string | null
          last_reminded_at?: string | null
          last_updated_by?: string | null
          lieu_naissance?: string | null
          logement_note?: string | null
          logement_status?: string | null
          mesure_protection?: string | null
          nationalite?: string | null
          nom_naissance?: string | null
          nom_societe?: string | null
          objectifs_personnels_details?: Json | null
          origine_revenus_sans_activite?: string | null
          passifs_patrimoine?: Json | null
          pays_residence_fiscale_kyc?: string | null
          ppe_anciennete?: string | null
          ppe_expose?: boolean | null
          ppe_motif?: string | null
          ppe_pays_exercice?: string | null
          ppe_personne_exposee?: string | null
          precisions_professionnelles?: string | null
          profession?: string | null
          profil_adequation?:
            | Database["public"]["Enums"]["investor_profile_type"]
            | null
          regime_matrimonial?: string | null
          revenus_details?: Json | null
          situation_familiale?: string | null
          statut_kyc?: Database["public"]["Enums"]["kyc_status"] | null
          taux_endettement?: string | null
          telephone_bureau?: string | null
          telephone_domicile?: string | null
          tolerance_risque?: string | null
          total_actifs_bruts?: string | null
          total_charges?: string | null
          total_passifs?: string | null
          total_revenus?: string | null
          updated_at?: string | null
          ville_kyc?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kyc_profiles_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: true
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      lcb_ft_records: {
        Row: {
          client_id: string
          created_at: string | null
          created_by: string | null
          documents: Json | null
          gel_avoirs_last_checked_at: string | null
          gel_avoirs_status: boolean | null
          id: string
          manual_review_date: string | null
          manual_review_notes: string | null
          status: Database["public"]["Enums"]["lcb_ft_status"] | null
          updated_at: string | null
          vigilance_level: Database["public"]["Enums"]["vigilance_level"] | null
          vigilance_questionnaire: Json | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          created_by?: string | null
          documents?: Json | null
          gel_avoirs_last_checked_at?: string | null
          gel_avoirs_status?: boolean | null
          id?: string
          manual_review_date?: string | null
          manual_review_notes?: string | null
          status?: Database["public"]["Enums"]["lcb_ft_status"] | null
          updated_at?: string | null
          vigilance_level?:
            | Database["public"]["Enums"]["vigilance_level"]
            | null
          vigilance_questionnaire?: Json | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          created_by?: string | null
          documents?: Json | null
          gel_avoirs_last_checked_at?: string | null
          gel_avoirs_status?: boolean | null
          id?: string
          manual_review_date?: string | null
          manual_review_notes?: string | null
          status?: Database["public"]["Enums"]["lcb_ft_status"] | null
          updated_at?: string | null
          vigilance_level?:
            | Database["public"]["Enums"]["vigilance_level"]
            | null
          vigilance_questionnaire?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "lcb_ft_records_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: true
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      model_portfolio_etfs: {
        Row: {
          allocation_percentage: number
          created_at: string | null
          etf_name: string
          id: string
          model_portfolio_id: string
          updated_at: string | null
        }
        Insert: {
          allocation_percentage: number
          created_at?: string | null
          etf_name: string
          id?: string
          model_portfolio_id: string
          updated_at?: string | null
        }
        Update: {
          allocation_percentage?: number
          created_at?: string | null
          etf_name?: string
          id?: string
          model_portfolio_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "model_portfolio_etfs_model_portfolio_id_fkey"
            columns: ["model_portfolio_id"]
            isOneToOne: false
            referencedRelation: "model_portfolios"
            referencedColumns: ["id"]
          },
        ]
      }
      model_portfolios: {
        Row: {
          advisory_fee_rate: number
          created_at: string | null
          created_by: string | null
          custody_fee_rate: number
          description: string | null
          id: string
          name: string
          rebate_rate: number
          updated_at: string | null
        }
        Insert: {
          advisory_fee_rate?: number
          created_at?: string | null
          created_by?: string | null
          custody_fee_rate?: number
          description?: string | null
          id?: string
          name: string
          rebate_rate?: number
          updated_at?: string | null
        }
        Update: {
          advisory_fee_rate?: number
          created_at?: string | null
          created_by?: string | null
          custody_fee_rate?: number
          description?: string | null
          id?: string
          name?: string
          rebate_rate?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      modeles_documents: {
        Row: {
          contenu_modele: string | null
          created_at: string | null
          created_by: string | null
          id: string
          nom_modele: string
          tags_detectes: string[] | null
          template_file_name: string | null
          template_file_path: string | null
          type_document: string
          updated_at: string | null
          version: number | null
        }
        Insert: {
          contenu_modele?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          nom_modele: string
          tags_detectes?: string[] | null
          template_file_name?: string | null
          template_file_path?: string | null
          type_document: string
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          contenu_modele?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          nom_modele?: string
          tags_detectes?: string[] | null
          template_file_name?: string | null
          template_file_path?: string | null
          type_document?: string
          updated_at?: string | null
          version?: number | null
        }
        Relationships: []
      }
      product_governance: {
        Row: {
          activites_negatives_exclues: string | null
          caracteristiques_environnementales_sociales: string | null
          classification_instrument_financier: string
          code_isin: string | null
          connaissance_confirme: boolean | null
          connaissance_faible_basique: boolean | null
          connaissance_informe: boolean | null
          created_at: string | null
          created_by: string | null
          description_instrument_financier: string
          garantie_capital: boolean | null
          horizon_investissement: string | null
          id: string
          incidence_negative: string | null
          indicateur_srri: string | null
          investisseurs_vises: string | null
          liquidite_immediate: boolean | null
          marche_cible_negatif: string | null
          nature_instrument_financier: string
          nom_instrument_financier: string
          nom_societe_gestion: string
          objectif_investissement_durable: string | null
          objectifs_besoins_client: Json | null
          perte_capital_excedent_investi: boolean | null
          perte_capital_limitee: boolean | null
          rendement_garanti: boolean | null
          risque_evolution_rendement: boolean | null
          risque_liquidite: boolean | null
          risque_perte_capital: boolean | null
          sfdr_classification: string | null
          taxonomie_environnementale: string | null
          type_contrepartie_eligible: boolean | null
          type_investisseur_non_pro: boolean | null
          type_investisseur_pro: boolean | null
          typologie: string
          updated_at: string | null
        }
        Insert: {
          activites_negatives_exclues?: string | null
          caracteristiques_environnementales_sociales?: string | null
          classification_instrument_financier: string
          code_isin?: string | null
          connaissance_confirme?: boolean | null
          connaissance_faible_basique?: boolean | null
          connaissance_informe?: boolean | null
          created_at?: string | null
          created_by?: string | null
          description_instrument_financier: string
          garantie_capital?: boolean | null
          horizon_investissement?: string | null
          id?: string
          incidence_negative?: string | null
          indicateur_srri?: string | null
          investisseurs_vises?: string | null
          liquidite_immediate?: boolean | null
          marche_cible_negatif?: string | null
          nature_instrument_financier: string
          nom_instrument_financier: string
          nom_societe_gestion: string
          objectif_investissement_durable?: string | null
          objectifs_besoins_client?: Json | null
          perte_capital_excedent_investi?: boolean | null
          perte_capital_limitee?: boolean | null
          rendement_garanti?: boolean | null
          risque_evolution_rendement?: boolean | null
          risque_liquidite?: boolean | null
          risque_perte_capital?: boolean | null
          sfdr_classification?: string | null
          taxonomie_environnementale?: string | null
          type_contrepartie_eligible?: boolean | null
          type_investisseur_non_pro?: boolean | null
          type_investisseur_pro?: boolean | null
          typologie: string
          updated_at?: string | null
        }
        Update: {
          activites_negatives_exclues?: string | null
          caracteristiques_environnementales_sociales?: string | null
          classification_instrument_financier?: string
          code_isin?: string | null
          connaissance_confirme?: boolean | null
          connaissance_faible_basique?: boolean | null
          connaissance_informe?: boolean | null
          created_at?: string | null
          created_by?: string | null
          description_instrument_financier?: string
          garantie_capital?: boolean | null
          horizon_investissement?: string | null
          id?: string
          incidence_negative?: string | null
          indicateur_srri?: string | null
          investisseurs_vises?: string | null
          liquidite_immediate?: boolean | null
          marche_cible_negatif?: string | null
          nature_instrument_financier?: string
          nom_instrument_financier?: string
          nom_societe_gestion?: string
          objectif_investissement_durable?: string | null
          objectifs_besoins_client?: Json | null
          perte_capital_excedent_investi?: boolean | null
          perte_capital_limitee?: boolean | null
          rendement_garanti?: boolean | null
          risque_evolution_rendement?: boolean | null
          risque_liquidite?: boolean | null
          risque_perte_capital?: boolean | null
          sfdr_classification?: string | null
          taxonomie_environnementale?: string | null
          type_contrepartie_eligible?: boolean | null
          type_investisseur_non_pro?: boolean | null
          type_investisseur_pro?: boolean | null
          typologie?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tags_mapping: {
        Row: {
          client_field: string
          created_at: string | null
          id: string
          modele_id: string | null
          tag_name: string
        }
        Insert: {
          client_field: string
          created_at?: string | null
          id?: string
          modele_id?: string | null
          tag_name: string
        }
        Update: {
          client_field?: string
          created_at?: string | null
          id?: string
          modele_id?: string | null
          tag_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "tags_mapping_modele_id_fkey"
            columns: ["modele_id"]
            isOneToOne: false
            referencedRelation: "modeles_documents"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      run_daily_asset_freeze_check: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      client_entity_type:
        | "personne_physique"
        | "personne_morale"
        | "contrepartie_eligible"
      client_workflow_stage:
        | "creation"
        | "kyc_complete"
        | "lcb_ft_complete"
        | "mission_letter"
        | "adequacy_declaration"
        | "subscription"
        | "annual_review"
        | "der"
        | "kyc_investor_profile"
        | "lcb_ft_governance"
        | "mission_rto_letter"
        | "adequacy_report"
        | "subscription_stage"
        | "follow_up"
      conformity_status: "En attente" | "Conforme" | "Non conforme" | "En cours"
      document_status: "En attente" | "Validé" | "Rejeté" | "En révision"
      investor_profile_type:
        | "Prudent"
        | "Équilibré"
        | "Dynamique"
        | "Agressif"
        | "Non défini"
        | "Sécurisé"
        | "Dynamique +"
        | "Offensif"
        | "Offensif +"
      kyc_status: "En attente" | "Complet" | "Validé"
      lcb_ft_status: "En attente" | "Validé" | "Rejeté"
      user_role: "admin" | "conseiller" | "client"
      vigilance_level: "Normale" | "Renforcée"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      client_entity_type: [
        "personne_physique",
        "personne_morale",
        "contrepartie_eligible",
      ],
      client_workflow_stage: [
        "creation",
        "kyc_complete",
        "lcb_ft_complete",
        "mission_letter",
        "adequacy_declaration",
        "subscription",
        "annual_review",
        "der",
        "kyc_investor_profile",
        "lcb_ft_governance",
        "mission_rto_letter",
        "adequacy_report",
        "subscription_stage",
        "follow_up",
      ],
      conformity_status: ["En attente", "Conforme", "Non conforme", "En cours"],
      document_status: ["En attente", "Validé", "Rejeté", "En révision"],
      investor_profile_type: [
        "Prudent",
        "Équilibré",
        "Dynamique",
        "Agressif",
        "Non défini",
        "Sécurisé",
        "Dynamique +",
        "Offensif",
        "Offensif +",
      ],
      kyc_status: ["En attente", "Complet", "Validé"],
      lcb_ft_status: ["En attente", "Validé", "Rejeté"],
      user_role: ["admin", "conseiller", "client"],
      vigilance_level: ["Normale", "Renforcée"],
    },
  },
} as const
