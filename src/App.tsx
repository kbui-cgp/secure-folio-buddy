import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NewClientPage from "./pages/NewClientPage";
import ClientsPage from "./pages/ClientsPage";
import ClientDetailPage from "./pages/ClientDetailPage";
import EditClientPage from "./pages/EditClientPage";
import DocumentTemplatesPage from "./pages/DocumentTemplatesPage";
import NewDocumentTemplatePage from "./pages/NewDocumentTemplatePage";
import DocumentTemplateDetailPage from "./pages/DocumentTemplateDetailPage";
import EditDocumentTemplatePage from "./pages/EditDocumentTemplatePage";
import GenerateDocumentPage from "./pages/GenerateDocumentPage";
import DocumentsPage from "./pages/DocumentsPage";
import DocumentDetailPage from "./pages/DocumentDetailPage";
import ConformityPage from "./pages/ConformityPage";
import NewConformityPage from "./pages/NewConformityPage";
import ConformityDetailPage from "./pages/ConformityDetailPage";
import EditConformityPage from "./pages/EditConformityPage";
import UsersPage from "./pages/UsersPage";
import UserDetailPage from "./pages/UserDetailPage";
import ProfilePage from "./pages/ProfilePage";
import KYCDetailPage from "./pages/KYCDetailPage";
import LCBFTDetailPage from "./pages/LCBFTDetailPage";
import DashboardPage from "./pages/DashboardPage";
import NewClientDocumentPage from "./pages/NewClientDocumentPage";
import NewInvestorQuestionnairePage from "./pages/NewInvestorQuestionnairePage";
import InvestorQuestionnaireDetailPage from "./pages/InvestorQuestionnaireDetailPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import SessionContextProvider from "./components/SessionContextProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SessionContextProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="dashboard" element={<DashboardPage />} />
              
              {/* Client Routes */}
              <Route path="clients" element={<ClientsPage />} />
              <Route path="clients/new" element={<NewClientPage />} />
              <Route path="clients/:id" element={<ClientDetailPage />} />
              <Route path="clients/:id/edit" element={<EditClientPage />} />
              <Route path="clients/:id/kyc" element={<KYCDetailPage />} />
              <Route path="clients/:id/lcb-ft" element={<LCBFTDetailPage />} />
              <Route path="clients/:id/documents/new" element={<NewClientDocumentPage />} />
              <Route path="clients/:id/investor-questionnaire/new" element={<NewInvestorQuestionnairePage />} />
              <Route path="clients/:id/investor-questionnaire/:questionnaireId" element={<InvestorQuestionnaireDetailPage />} />
              
              {/* Document Routes */}
              <Route path="documents" element={<DocumentsPage />} />
              <Route path="documents/generate" element={<GenerateDocumentPage />} />
              <Route path="documents/:id" element={<DocumentDetailPage />} />
              <Route path="document-templates" element={<DocumentTemplatesPage />} />
              <Route path="document-templates/new" element={<NewDocumentTemplatePage />} />
              <Route path="document-templates/:id" element={<DocumentTemplateDetailPage />} />
              <Route path="document-templates/:id/edit" element={<EditDocumentTemplatePage />} />
              
              {/* Conformity Routes */}
              <Route path="conformity" element={<ConformityPage />} />
              <Route path="conformity/new" element={<NewConformityPage />} />
              <Route path="conformity/:id" element={<ConformityDetailPage />} />
              <Route path="conformity/:id/edit" element={<EditConformityPage />} />
              
              {/* User Routes */}
              <Route path="users" element={<UsersPage />} />
              <Route path="users/:id" element={<UserDetailPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SessionContextProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;