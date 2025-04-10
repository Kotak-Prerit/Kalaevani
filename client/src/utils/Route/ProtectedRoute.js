import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && user?.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
