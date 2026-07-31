import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wraps any page that requires login. Usage in App.jsx:
// <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  // Wait for AuthContext to finish checking localStorage before deciding —
  // otherwise a page refresh briefly redirects to /login even when a
  // valid token exists.
  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}