import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// 1. MUDANÇA AQUI: Importe HashRouter em vez de BrowserRouter
import { HashRouter, Routes, Route } from "react-router-dom"; 
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectsPage from "./pages/ProjectsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* 2. MUDANÇA AQUI: Troque BrowserRouter por HashRouter */}
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/:category" element={<ProjectsPage />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;