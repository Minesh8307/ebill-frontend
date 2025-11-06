import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Sell from "./pages/Sell";
import { AuthProvider, useAuth } from "./context/AuthContext";

// This component protects your main pages
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  // If user is not logged in, send them to login page
  return currentUser ? children : <Navigate to="/login" />;
};

// This component is for pages like Login/Signup
const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();
  // If user IS logged in, send them to the dashboard
  return currentUser ? <Navigate to="/dashboard" /> : children;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicRoute><Homepage /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />

          {/* Private Routes (Must be logged in) */}
          <Route
            path="/dashboard"
            element={<PrivateRoute><Dashboard /></PrivateRoute>}
          />
          <Route
            path="/inventory"
            element={<PrivateRoute><Inventory /></PrivateRoute>}
          />
          <Route
            path="/sell"
            element={<PrivateRoute><Sell /></PrivateRoute>}
          />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

