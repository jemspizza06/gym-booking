// src/components/Header.js
import React from 'react';

const Header = ({ user }) => {
  return (
    <header className="header">
      <h2>Hola, {user?.fullName || "Usuario"}</h2>
      <button onClick={() => {
        localStorage.clear(); // o tu lógica para logout
        window.location.href = '/';
      }}>Cerrar sesión</button>
    </header>
  );
};

export default Header;
