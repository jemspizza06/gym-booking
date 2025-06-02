import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import axios from 'axios';

const AdminReservas = () => {
  const [clases, setClases] = useState([]);

  const token = localStorage.getItem('token');

  const api = axios.create({
    baseURL: 'http://localhost:5296/api/admin',
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    
    const obtenerClases = async () => {
    const res = await api.get('/clases');
    setClases(res.data);
  };

    obtenerClases();
  }, []);

  return (
    <DashboardLayout>
      <h1>Control de Reservas</h1>
      <div className="card-container">
  {clases.map((clase, index) => (
    <div key={index} className="class-card">
      <h2 className="class-title">{clase.nombre}</h2>
      <p><strong>Descripción:</strong> {clase.descripcion}</p>
      <p><strong>Fecha:</strong> {clase.fecha}</p>
      <p><strong>Capacidad:</strong> {clase.capacidadMaxima}</p>
    </div>
  ))}
</div>
    </DashboardLayout>
  );
};

export default AdminReservas;