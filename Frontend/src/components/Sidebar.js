// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ role }) => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/dashboard">Inicio</Link></li>

        {role === 'Administrador' && (
          <>
            <li><Link to="/admin/clases">Gestionar Clases</Link></li>
            <li><Link to="/dashboard/usuarios">Usuarios</Link></li>
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
      </ul>
    </div>
  );
};

export default Sidebar;
