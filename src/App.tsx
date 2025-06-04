import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import Pages
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import PasswordRecoveryPage from "./pages/PasswordRecoveryPage";
import PostLoginPage from "./pages/PostLoginPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

// Basic auth check placeholder (replace with actual auth context/logic)
const isAuthenticated = () => {
  // In a real app, you'd check for a token in localStorage, context, etc.
  // For this example, let's assume not authenticated by default for routing to login.
  // PostLoginPage itself doesn't enforce this; it's for route protection.
  return false; // Or a function that checks auth status
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  // This is a very basic protected route.
  // For demonstration, we'll directly navigate to PostLoginPage.
  // In a real app, replace `isAuthenticated()` with your actual auth check.
  // If we wanted to protect '/post-login-page', we'd use this.
  // For now, we'll let PostLoginPage be directly accessible for simplicity of example.
  // If you want to enforce auth:
  // if (!isAuthenticated()) {
  // return <Navigate to="/login" replace />;
  // }
  return children;
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/recover-password" element={<PasswordRecoveryPage />} />

          {/* Default route: if not authenticated, go to login, else to dashboard */}
          {/* For simplicity, we will make '/' go to LoginPage */}
          <Route path="/" element={<Navigate to="/login" replace />} />


          {/* Authenticated Routes */}
          {/* 
            Example of a protected route structure:
            <Route 
              path="/post-login-page" 
              element={
                <ProtectedRoute>
                  <PostLoginPage />
                </ProtectedRoute>
              } 
            />
            For this example, we'll keep it simple and directly route.
          */}
          <Route path="/post-login-page" element={<PostLoginPage />} />

          {/* Placeholder for terms page if needed from registration */}
          <Route path="/terms-and-conditions" element={<div><h1>Terms and Conditions</h1><p>Details about terms...</p><Link to="/register">Back to Registration</Link></div>} />


          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;