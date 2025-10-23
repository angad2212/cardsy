import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Decks from "./pages/Decks";
import Analytics from "./pages/Analytics";
import Social from "./pages/Social";
import Account from "./pages/Account";
import Practice from "./pages/Practice";
import DeckManagement from "./pages/DeckManagement";
import UserProfile from "./pages/UserProfile";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Index />} />
          <Route path="/decks" element={<Decks />} />
          <Route path="/deck/:deckId" element={<DeckManagement />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/social" element={<Social />} />
          <Route path="/account" element={<Account />} />
          <Route path="/practice" element={<Practice />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
