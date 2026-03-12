import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom"; 
import { AnimatePresence } from "framer-motion";
import { Suspense, lazy } from "react"; // <-- Adicionado

import GhostCursor from "./components/GhostCursor";
import PageTransition from "./components/PageTransition"; 

// Lazy loading das páginas!
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const MacropadPage = lazy(() => import("./pages/projetos-destaque/MacropadPage"));

const PageLoader = () => <div className="min-h-screen bg-background w-full" />;

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Adicionado Suspense para lidar com o carregamento suave */}
        <Route path="/" element={<Suspense fallback={<PageLoader />}><PageTransition><Index /></PageTransition></Suspense>} />
        <Route path="/:category" element={<Suspense fallback={<PageLoader />}><PageTransition><ProjectsPage /></PageTransition></Suspense>} /> 
        <Route path="/projeto/macropad" element={<Suspense fallback={<PageLoader />}><PageTransition><MacropadPage /></PageTransition></Suspense>} />
        <Route path="*" element={<Suspense fallback={<PageLoader />}><PageTransition><NotFound /></PageTransition></Suspense>} />
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
        <AnimatedRoutes />
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;