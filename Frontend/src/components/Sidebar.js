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
        {role === 'Administrador'?(
          <li><Link to="/admin">Inicio</Link></li>
        ):(
          <li><Link to="/socio">Inicio</Link></li>
        )
        }
        

        {role === 'Administrador' && (
          <>
            <li><Link to="/admin/clases">Gestionar Clases</Link></li>
            <li><Link to="/admin/usuarios">Usuarios</Link></li>
            <li><Link to="/admin/reservas">Reservas</Link></li>
          </>
        )}

        {role === 'Entrenador' && (
          <>
            <li><Link to="/dashboard/mis-clases">Mis Clases</Link></li>
          </>
        )}

        {role === 'Socio' && (
          <>
            <li><Link to="/socio/clases">Clases Disponibles</Link></li>
            <li><Link to="/socio/reservas">Mis Reservas</Link></li>
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
