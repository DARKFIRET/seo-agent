import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "@/components/PrivateRoute";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SEOServices from "./pages/SEOServices";
import YandexDirectServices from "./pages/YandexDirectServices";
import CasesPage from "./pages/CasesPage";
import AboutPage from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const LeadsManagement = lazy(() => import("./pages/admin/LeadsManagement"));
const ContentManagement = lazy(() => import("./pages/admin/ContentManagement"));
const BlogManagement = lazy(() => import("./pages/admin/BlogManagement"));
const SEOManagement = lazy(() => import("./pages/admin/SEOManagement"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const CasesManagement = lazy(() => import("./pages/admin/CasesManagement"));

const queryClient = new QueryClient();

export function AppRoutes() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Загрузка...</div>}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/services/seo" element={<SEOServices />} />
        <Route path="/services/yandex-direct" element={<YandexDirectServices />} />
        <Route path="/cases" element={<CasesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfUse />} />

        {/* Admin auth */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected admin routes */}
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/leads" element={<PrivateRoute><LeadsManagement /></PrivateRoute>} />
        <Route path="/admin/blog" element={<PrivateRoute><BlogManagement /></PrivateRoute>} />
        <Route path="/admin/content" element={<PrivateRoute><ContentManagement /></PrivateRoute>} />
        <Route path="/admin/cases" element={<PrivateRoute><CasesManagement /></PrivateRoute>} />
        <Route path="/admin/seo" element={<PrivateRoute><SEOManagement /></PrivateRoute>} />
        <Route path="/admin/settings" element={<PrivateRoute><AdminSettings /></PrivateRoute>} />

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
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
