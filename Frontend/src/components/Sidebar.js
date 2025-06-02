// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ role }) => {
  const handleLogout = () => {
    localStorage.clear(); // o tu lógica para logout
    window.location.href = '/';
  };

  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/admin">Inicio</Link></li>

        {role === 'Administrador' && (
          <>
            <li><Link to="/admin/clases">Gestionar Clases</Link></li>
            <li><Link to="/admin/usuarios">Usuarios</Link></li>
          </>
        )}

        {role === 'Entrenador' && (
          <>
            <li><Link to="/dashboard/mis-clases">Mis Clases</Link></li>
          </>
        )}

        {role === 'Socio' && (
          <>
            <li><Link to="/dashboard/clases-vigentes">Clases Disponibles</Link></li>
            <li><Link to="/dashboard/mis-reservas">Mis Reservas</Link></li>
          </>
        )}

        {/* Botón visible para todos */}
        <li>
          <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
