import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import LoginProcess from './Components/LoginProcess';
import AccessDenied from './Components/AccessDenied';
import Dashboard from './Components/Dashboard';
import PrivateRoute from "./Components/PrivateRoute";
import { useAuth } from "./AuthContext";

function App() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginProcess />} />
        <Route path="/dashboard" element={
          isAuthenticated
          ? <Dashboard />
          : <Navigate to="/denied" />
        } />
        <Route path="/denied" element={<AccessDenied />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
