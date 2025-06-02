import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import axios from 'axios';

const SocioReservas = () => {
  const [reservas, setReservas] = useState([]);

  const token = localStorage.getItem('token');

  const api = axios.create({
    baseURL: 'http://localhost:5296/api/socio',
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    
    const obtenerReservas = async () => {
    const res = await api.get('/mis-reservas');
    setReservas(res.data);
  };

    obtenerReservas();
  }, []);

  return (
    <DashboardLayout>
      <h1>Control de Reservas</h1>
      <div className="card-container">
  {reservas.map((reserva, index) => (
    <div key={index} className="class-card">
      <h2 className="class-title">{reserva.clase.nombre}</h2>
      <p><strong>Descripción:</strong> {reserva.clase.descripcion}</p>
      <p><strong>Fecha:</strong> {reserva.clase.fecha}</p>
      <p><strong>Capacidad:</strong> {reserva.clase.capacidadMaxima}</p>
    </div>
  ))}
</div>
    </DashboardLayout>
  );
};

export default SocioReservas;