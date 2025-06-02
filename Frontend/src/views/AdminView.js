// src/views/AdminView.js
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import axios from 'axios';

const AdminView = () => {
  const [clases, setClases] = useState([]);

  useEffect(() => {
    
    const fetchClases = async () => {
      try {
        const response = await axios.get('/api/admin/clases');
        setClases(response.data);
      } catch (error) {
        console.error('Error al obtener clases:', error);
      }
    };

    fetchClases();
  }, []);

  return (
    <DashboardLayout>
      <h1>Bienvenido, Administrador</h1>
      <ul>
        {clases.map(clase => (
          <li key={clase.id}>{clase.nombre}</li>
        ))}
      </ul>
    </DashboardLayout>
  );
};

export default AdminView;
