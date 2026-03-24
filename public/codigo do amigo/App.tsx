import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import GhostCursor from "./components/GhostCursor";
import PageWrapper from "./components/PageWrapper";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HardwareProjectsPage from "./pages/HardwareProjectsPage";
import SoftwareProjectsPage from "./pages/SoftwareProjectsPage";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Index />
            </PageWrapper>
          }
        />
        <Route
          path="/software"
          element={
            <PageWrapper>
              <SoftwareProjectsPage />
            </PageWrapper>
          }
        />
        <Route
          path="/programacao"
          element={
            <PageWrapper>
              <SoftwareProjectsPage />
            </PageWrapper>
          }
        />
        <Route
          path="/hardware"
          element={
            <PageWrapper>
              <HardwareProjectsPage />
            </PageWrapper>
          }
        />
        <Route
          path="*"
          element={
            <PageWrapper>
              <NotFound />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
      <AppRoutes />
        </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
