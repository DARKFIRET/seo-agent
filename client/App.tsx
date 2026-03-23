import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "@/components/PrivateRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SEOServices from "./pages/SEOServices";
import YandexDirectServices from "./pages/YandexDirectServices";
import CasesPage from "./pages/CasesPage";
import AboutPage from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import LeadsManagement from "./pages/admin/LeadsManagement";
import ContentManagement from "./pages/admin/ContentManagement";
import SEOManagement from "./pages/admin/SEOManagement";
import AdminSettings from "./pages/admin/AdminSettings";
import CasesManagement from "./pages/admin/CasesManagement";

const queryClient = new QueryClient();

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Index />} />
      <Route path="/services/seo" element={<SEOServices />} />
      <Route path="/services/yandex-direct" element={<YandexDirectServices />} />
      <Route path="/cases" element={<CasesPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contacts" element={<ContactsPage />} />

      {/* Admin auth */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected admin routes */}
      <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      <Route path="/admin/leads" element={<PrivateRoute><LeadsManagement /></PrivateRoute>} />
      <Route path="/admin/content" element={<PrivateRoute><ContentManagement /></PrivateRoute>} />
      <Route path="/admin/cases" element={<PrivateRoute><CasesManagement /></PrivateRoute>} />
      <Route path="/admin/seo" element={<PrivateRoute><SEOManagement /></PrivateRoute>} />
      <Route path="/admin/settings" element={<PrivateRoute><AdminSettings /></PrivateRoute>} />

      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
}
