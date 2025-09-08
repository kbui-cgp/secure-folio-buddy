import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { useSession } from "./SessionContextProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Layout = () => {
  const { user, loading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;