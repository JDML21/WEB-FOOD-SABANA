import { useAuth } from '../Contexts/authContext';
import { Navigate } from 'react-router-dom';
import React from 'react';

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, userRole, loading } = useAuth();

  if (loading) {
    return <div>Cargando sesión...</div>; // O spinner personalizado
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
