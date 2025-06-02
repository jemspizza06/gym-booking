// src/pages/ClasesDisponibles.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../FormStyles.css'; // Reutilizando estilos generales
import toast from 'react-hot-toast';
// import { getClases } from '../services/clasesService'; ← si tienes un backend, podrías usar esto

const ClasesDisponibles = () => {
  const [clases, setClases] = useState([]);

  const token = localStorage.getItem('token');
    
      // Instancia de axios para solicitudes al backend como administrador
      const api = axios.create({
        baseURL: 'http://localhost:5296/api/admin',
        headers: { Authorization: `Bearer ${token}` },
      });

      const apiSocio = axios.create({
        baseURL: 'http://localhost:5296/api/socio',
        headers: { Authorization: `Bearer ${token}` },
      });

      const obtenerClases = async () => {
    const res = await api.get('/clases');
    setClases(res.data);
  };

  const reservarClase = async(id) => {
    try {
          const response = await apiSocio.post(`/reservar/${id}`);
        toast.success("Clase reservada con exito")
    } catch (error) {
        toast.error("Ya tienes una reserva para esta clase")
    }

  }

  // Simulamos datos por ahora
  useEffect(() => {
    obtenerClases();
  }, []);

  return (
    <div className="main-content">
      <h2>Clases Disponibles</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {clases.map(clase => (
          <div key={clase.id} style={{
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3>{clase.nombre}</h3>
            <p><strong>Fecha:</strong> {clase.fecha}</p>
            <p><strong>Entrenador:</strong> Mr. Osmar Tito</p>
            <p><strong>Cupos disponibles:</strong> {clase.capacidadMaxima}</p>
            <button style={{ marginTop: '0.5rem' }} onClick={() => reservarClase(clase.id)}>Inscribirse</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClasesDisponibles;
