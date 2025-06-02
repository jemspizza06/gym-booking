// src/views/AdminView.js
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import axios from 'axios';

const AdminView = () => {

  const [usuarios, setUsuarios] = useState([]);
  const [clases, setClases] = useState([]);
  const [reservas, setReservas] = useState([]);

  
  const token = localStorage.getItem('token');

  const apiUsers = axios.create({
    baseURL: 'http://localhost:5296/api/Users',
    // headers: { Authorization: `Bearer ${token}` },
  });

  const apiAdmin = axios.create({
    baseURL: 'http://localhost:5296/api/admin',
    headers: { Authorization: `Bearer ${token}` },
  });

  const obtenerUsuarios = async () => {
    const res = await apiUsers.get();
    setUsuarios(res.data);
  };

  const obtenerClases = async () => {
    const res = await apiAdmin.get('/clases');
    setClases(res.data);
  };

  const obtenerReservas = async () => {
    const res = await apiAdmin.get('/reservas');
    setReservas(res.data);
  };

  useEffect(() => {
    
    obtenerUsuarios();
    obtenerClases();
    obtenerReservas();
    // fetchClases();
  }, []);

  return (
    <DashboardLayout>
      <h1>Bienvenido, Administrador</h1>
      <div className="dashboard-container">
  <h2 className="dashboard-title">📊 Control de Actividad en el Gimnasio</h2>

  <div className="dashboard-cards">
    <div className="dashboard-briefing-card">
      <h3>💪 Clases</h3>
      <p>Número de clases registradas: {clases.length}</p>
      <a href='/admin/clases'>      
      <button className='dashboard-button'>Control</button>
      </a>
    </div>

    <div className="dashboard-briefing-card">
      <h3>🧍 Usuarios</h3>
      <p>Usuarios registrados: {usuarios.length}</p>
      <a href='/admin/usuarios'>      
        <button className='dashboard-button'>Control</button>
      </a>
    </div>
    <div className="dashboard-briefing-card">
      <h3>🧍 Reservas</h3>
      <p>Reservas realizadas: {reservas.length}</p>
      <a href='/admin/reservas'>      
        <button className='dashboard-button'>Control</button>
      </a>
    </div>
  </div>
</div>

    </DashboardLayout>
  );
};

export default AdminView;
