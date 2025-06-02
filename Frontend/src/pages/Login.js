// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ⬅️ Usar el contexto
import { login as loginUser } from '../api/authService'; // ⬅️ Servicio correcto
import '../FormStyles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // ⬅️ Obtener función login del contexto
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await loginUser({ email, password });
      login(user, token); // ⬅️ Guardar usuario y token en contexto
      alert(`Bienvenido, ${user.fullName}`);

      // Redirección según el rol
      if (user.role === 'Administrador') navigate('/admin');
      else if (user.role === 'Socio') navigate('/socio');
      else if (user.role === 'Entrenador') navigate('/entrenador');
    } catch (error) {
      alert("Credenciales inválidas o error al iniciar sesión");
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <form className="form-card" onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>
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
        <button type="submit">Entrar</button>
        <p>¿Todavía no tienes una cuenta? <Link to="/register">Regístrate</Link></p>
      </form>
    </div>
  );
};

export default Login;
