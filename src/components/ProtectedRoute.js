import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isToken = localStorage.getItem("token") || null;

  return isToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
