import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Suspense, lazy } from "react";

import GhostCursor from "./components/GhostCursor";
// 1. Substituímos o PageTransition pelo novo PageWrapper
import PageWrapper from "./components/PageWrapper";
// 2. Importamos a Navbar
import Navbar from "./components/Navbar";

// Lazy loading das páginas
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const MacropadPage = lazy(() => import("./pages/projetos-destaque/MacropadPage"));

const PageLoader = () => <div className="min-h-screen bg-background w-full" />;

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    // 3. Adicionamos onExitComplete para voltar ao topo na troca de página
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Suspense fallback={<PageLoader />}><PageWrapper><Index /></PageWrapper></Suspense>} />
        <Route path="/:category" element={<Suspense fallback={<PageLoader />}><PageWrapper><ProjectsPage /></PageWrapper></Suspense>} />
        <Route path="/projeto/macropad" element={<Suspense fallback={<PageLoader />}><PageWrapper><MacropadPage /></PageWrapper></Suspense>} />
        <Route path="*" element={<Suspense fallback={<PageLoader />}><PageWrapper><NotFound /></PageWrapper></Suspense>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GhostCursor />
      <Toaster />
      <Sonner />
      <HashRouter>
        {/* 4. A Navbar fica aqui para aparecer por cima de todas as rotas */}
        <Navbar />
        <AnimatedRoutes />
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;