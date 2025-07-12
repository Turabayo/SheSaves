
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Goals from "./pages/Goals";
import Dashboard from "./pages/Dashboard";
import AddInvestment from "./pages/AddInvestment";
import Investments from "./pages/Investments";
import Insights from "./pages/Insights";
import Community from "./pages/Community";
import Assistant from "./pages/Assistant";
import Settings from "./pages/Settings";
import TopUp from "./pages/TopUp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-investment" element={<AddInvestment />} />
            <Route path="/investments" element={<Investments />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/community" element={<Community />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/top-up" element={<TopUp />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;