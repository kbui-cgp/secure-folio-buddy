import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/components/SessionContextProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Users, FileText, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { user, loading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-elegant">
            <ShieldCheck className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            CRM Réglementaire
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Gérez vos clients en toute conformité avec les exigences AMF, ACPR, ORIAS, MIFID II, DDA et LCB-FT
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-gradient-primary hover:shadow-hover transition-all duration-300">
              Accéder au CRM
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {[
            {
              icon: Users,
              title: "Gestion Clients",
              description: "Créez et gérez vos clients avec workflows conformes"
            },
            {
              icon: ShieldCheck,
              title: "KYC & LCB-FT",
              description: "Profils investisseurs et vérifications anti-blanchiment"
            },
            {
              icon: FileText,
              title: "Documents",
              description: "Génération automatique de tous vos documents réglementaires"
            },
            {
              icon: BarChart3,
              title: "Conformité",
              description: "Tableau de bord et alertes pour rester conforme"
            }
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300 border-0 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Compliance Section */}
        <Card className="bg-gradient-card shadow-card border-0 animate-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-4">Conformité Réglementaire Complète</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3 text-center">
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-2">AMF / ACPR / ORIAS</h3>
                <p className="text-sm text-muted-foreground">Respect des obligations des autorités de tutelle</p>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-2">MIFID II / DDA</h3>
                <p className="text-sm text-muted-foreground">Questionnaires et évaluations conformes</p>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-2">LCB-FT</h3>
                <p className="text-sm text-muted-foreground">Lutte contre le blanchiment et financement du terrorisme</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;