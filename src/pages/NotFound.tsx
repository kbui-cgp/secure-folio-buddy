import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center bg-gradient-card shadow-elegant border-0 animate-scale-in">
        <CardContent className="pt-12 pb-8">
          <div className="text-8xl font-bold text-primary mb-4">404</div>
          <h1 className="text-2xl font-bold text-foreground mb-4">Page non trouvée</h1>
          <p className="text-muted-foreground mb-8">
            Désolé, la page que vous cherchez n'existe pas ou a été déplacée.
          </p>
          <div className="space-y-3">
            <Link to="/dashboard" className="block">
              <Button className="w-full bg-gradient-primary hover:shadow-hover transition-all">
                <Home className="mr-2 h-4 w-4" />
                Retour au tableau de bord
              </Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Page précédente
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;