// src/components/Header.js
import React from 'react';

const Header = ({ user }) => {
  return (
    <header className="header">
      <h2>Hola, {user?.fullName || "Usuario"}</h2>
    </header>
  );
};

export default Header;
