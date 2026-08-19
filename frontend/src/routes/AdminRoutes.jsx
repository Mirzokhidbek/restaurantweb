import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

const AdminRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading text="Verifying admin credentials..." />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminRoutes;
