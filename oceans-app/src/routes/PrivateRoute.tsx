import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthData } from "../hooks/useAuthData";

export const PrivateRoute: React.FC = () => {
  const userInfo = useAuthData();
  return userInfo?.token ? <Outlet /> : <Navigate to="/login" />;
};
