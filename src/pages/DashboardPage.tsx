"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useSession } from "@/components/SessionContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, FileText, ShieldAlert, CircleDot, Clock, BarChart3, TrendingUp } from "lucide-react";

interface DashboardData {
  totalClients: number;
  kycPending: number;
  lcbftEnhancedVigilance: number;
  totalDocuments: number;
  totalQuestionnaires: number;
  urgentAlertsCount: number;
}

interface RecentActivityItem {
  id: string;
  type: "Client" | "KYC" | "LCB-FT" | "Questionnaire Investisseur" | "Document";
  name: string;
  date: string;
  link: string;
  updated_at: string;
}

const DashboardPage = () => {
  const { user, loading: sessionLoading } = useSession();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [recentActivities, setRecentActivities] = useState<RecentActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (sessionLoading) return;

      if (!user) {
        toast.error("Vous devez être connecté pour accéder au tableau de bord.");
        navigate("/login");
        setLoading(false);
        return;
      }

      setLoading(true);

      // Simulate API calls with mock data
      setTimeout(() => {
        setDashboardData({
          totalClients: 127,
          kycPending: 8,
          lcbftEnhancedVigilance: 3,
          totalDocuments: 254,
          totalQuestionnaires: 89,
          urgentAlertsCount: 5,
        });

        setRecentActivities([
          {
            id: "1",
            type: "Client",
            name: "Marie Dupont",
            date: new Date().toLocaleString(),
            link: "/clients/1",
            updated_at: new Date().toISOString(),
          },
          {
            id: "2", 
            type: "KYC",
            name: "Jean Martin",
            date: new Date(Date.now() - 3600000).toLocaleString(),
            link: "/clients/2/kyc",
            updated_at: new Date(Date.now() - 3600000).toISOString(),
          },
          {
            id: "3",
            type: "Document",
            name: "Convention RTO",
            date: new Date(Date.now() - 7200000).toLocaleString(),
            link: "/documents/3",
            updated_at: new Date(Date.now() - 7200000).toISOString(),
          },
        ]);

        setLoading(false);
      }, 1000);
    };

    fetchDashboardData();
  }, [user, sessionLoading, navigate]);

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground">Tableau de Bord</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  const kpiCards = [
    {
      title: "Clients Créés",
      value: dashboardData?.totalClients || 0,
      description: "Total de clients gérés",
      icon: Users,
      link: "/clients",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "KYC en Attente", 
      value: dashboardData?.kycPending || 0,
      description: "Profils KYC à compléter",
      icon: CircleDot,
      link: "/clients",
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: "Vigilance Renforcée",
      value: dashboardData?.lcbftEnhancedVigilance || 0,
      description: "Clients sous surveillance accrue",
      icon: ShieldAlert,
      link: "/clients",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      title: "Documents Générés",
      value: dashboardData?.totalDocuments || 0,
      description: "Total de documents créés",
      icon: FileText,
      link: "/documents",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Questionnaires",
      value: dashboardData?.totalQuestionnaires || 0,
      description: "Questionnaires complétés",
      icon: BarChart3,
      link: "/clients",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Alertes Urgentes",
      value: dashboardData?.urgentAlertsCount || 0,
      description: "Actions requises",
      icon: TrendingUp,
      link: "/conformity",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Tableau de Bord</h1>
        <div className="text-sm text-muted-foreground">
          Dernière mise à jour: {new Date().toLocaleString()}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {kpiCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card 
              key={index}
              className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300 border-0 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <Icon className={`h-5 w-5 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {card.value}
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  {card.description}
                </p>
                <Link 
                  to={card.link} 
                  className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Voir plus →
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activities */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-primary" />
            <span>Activités Récentes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentActivities.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Aucune activité récente.
            </p>
          ) : (
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div 
                  key={activity.id} 
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-grow">
                    <Link 
                      to={activity.link} 
                      className="font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {activity.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {activity.type} • {activity.date}
                    </p>
                  </div>
                  <Link 
                    to={activity.link}
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Voir →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;