// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Perfil from './pages/Perfil';
import Clases from './pages/Clases';
import AdminView from './views/AdminView';
import SocioView from './views/SocioView';
import EntrenadorView from './views/EntrenadorView';
import ProtectedRoute from './components/ProtectedRoute';
import AdminClases from './views/AdminClases'; 
import AdminUsers from './views/AdminUsers';
import AdminReservas from './views/AdminReservas';
import SocioClases from './views/SocioClases';
import SocioReservas from './views/SocioReservas';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/perfil" element={<ProtectedRoute><Perfil/></ProtectedRoute>} />
          <Route path="/clases" element={<ProtectedRoute><Clases/></ProtectedRoute>} />
          <Route path="/admin/clases" element={
  <ProtectedRoute allowedRoles={['Administrador']}>
    {/* Vista administacion de clases */}
    <AdminClases />
  </ProtectedRoute>

} />
<Route path="/admin/usuarios" element={
  <ProtectedRoute allowedRoles={['Administrador']}>
    {/* Vista pagina para administrar usuarios */}
    <AdminUsers/>
  </ProtectedRoute>

} />
<Route path="/admin/reservas" element={
  <ProtectedRoute allowedRoles={['Administrador']}>
    {/* Vista pagina para administrar usuarios */}
    <AdminReservas/>
  </ProtectedRoute>

} />



          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['Administrador']}>
              {/* Vista pagina de inicio del administador */}
              <AdminView />
            </ProtectedRoute>
          }/>

          <Route path="/socio" element={
            <ProtectedRoute allowedRoles={['Socio']}>
              <SocioView />
            </ProtectedRoute>
          }/>
          <Route path="/socio/clases" element={
  <ProtectedRoute allowedRoles={['Socio']}>
    {/* Vista pagina para administrar usuarios */}
    <SocioClases/>
  </ProtectedRoute>

} />
<Route path="/socio/reservas" element={
  <ProtectedRoute allowedRoles={['Socio']}>
    {/* Vista pagina para administrar usuarios */}
    <SocioReservas/>
  </ProtectedRoute>

} />

          <Route path="/entrenador" element={
            <ProtectedRoute allowedRoles={['Entrenador']}>
              <EntrenadorView />
            </ProtectedRoute>
          }/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
