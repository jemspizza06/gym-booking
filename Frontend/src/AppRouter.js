// src/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminView from './views/AdminView';
import EntrenadorView from './views/EntrenadorView';
import SocioView from './views/SocioView';
import Login from './pages/Login';


const AppRouter = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const getDashboard = () => {
    if (!user) return <Navigate to="/login" />;
    
    switch (user.role) {
      case 'Administrador':
        return <AdminView />;
      case 'Entrenador':
        return <EntrenadorView />;
      case 'Socio':
        return <SocioView />;
      default:
        return <Navigate to="/login" />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={getDashboard()} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
