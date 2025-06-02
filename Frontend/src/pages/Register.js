// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/authService'; // ✅ Servicio correcto
import '../FormStyles.css';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register({
        fullName: nombre,
        email,
        password,
        role: 'Socio', // Puedes modificar el rol si lo deseas
      });
      alert("Registro exitoso");
      navigate('/');
    } catch (error) {
      alert("Error al registrarse: " + (error.response?.data?.message || "Revisa los datos"));
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <form className="form-card" onSubmit={handleRegister}>
        <h2>Registro</h2>
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="ejemplo@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrarse</button>
        <p>¿Ya tienes una cuenta? <Link to="/">Inicia sesión</Link></p>
      </form>
    </div>
  );
};

export default Register;
