import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom"; 
import { AnimatePresence } from "framer-motion";

// Voltamos para as importações normais e seguras
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectsPage from "./pages/ProjectsPage";
import MacropadPage from "./pages/projetos-destaque/MacropadPage";

import GhostCursor from "./components/GhostCursor";
import PageTransition from "./components/PageTransition"; // Certifique-se de que este arquivo foi criado!

const queryClient = new QueryClient();

// O AnimatedRoutes gerencia as trocas de tela com a animação
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/:category" element={<PageTransition><ProjectsPage /></PageTransition>} /> 
        <Route path="/projeto/macropad" element={<PageTransition><MacropadPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
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