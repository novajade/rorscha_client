import type { JSX } from "react";
import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    isAuthenticated: boolean;
    children: JSX.Element;
  }
  
  const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, children }) => {
    console.log("🔐 PrivateRoute 진입, 인증 상태:", isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/denied" replace />;
  };
  
  export default PrivateRoute;
  