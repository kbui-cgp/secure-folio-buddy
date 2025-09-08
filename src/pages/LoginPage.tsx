import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/components/SessionContextProvider";
import { useEffect } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useSession();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Connexion réussie");
      navigate("/dashboard");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4">
      <Card className="w-full max-w-md animate-scale-in bg-gradient-card shadow-elegant">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
            <ShieldCheck className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">CRM Réglementaire</CardTitle>
          <CardDescription>
            Connectez-vous à votre espace sécurisé
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                className="transition-all duration-200 focus:shadow-card"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="transition-all duration-200 focus:shadow-card"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-primary hover:shadow-hover transition-all duration-200"
              disabled={loading}
            >
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;