// components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";

const ProtectedRoute = ({ children }) => {
  const [authUser] = useAuth();
  const location = useLocation();

  if (!authUser) {
    // Redirect to signup and remember where the user wanted to go
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
