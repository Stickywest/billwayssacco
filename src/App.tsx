import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import MembershipApplication from "./pages/MembershipApplication";
import WhatsAppButton from "./components/WhatsAppButton";
import LoanApplicationPage from './pages/LoanApplicationPage';
import BillwaysFAQ from './components/BillwaysFAQ';
import Chatbot from './components/Chatbot';
import BillwaysBlog from './pages/BillwaysBlog';
import SocialMediaIcons from "./components/SocialMediaIcons";
import BusinessLoan from "./components/BusinessLoan";
const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/membership" element={<MembershipApplication />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/apply" element={<LoanApplicationPage />} />
            <Route path="/faq" element={<BillwaysFAQ />} />
            <Route path="/blog" element={<BillwaysBlog />} />
            <Route path="/social" element={<SocialMediaIcons />} />
            <Route path="/business-loan" element={<BusinessLoan />} />
            {/* Add more routes as needed */}  
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Chatbot />
        <WhatsAppButton />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
