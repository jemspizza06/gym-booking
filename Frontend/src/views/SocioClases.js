// src/views/AdminView.js
import React, { useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import ClasesDisponibles from '../pages/Clases';


const SocioClases = () => {

    

  useEffect(() => {
    
    // obtenerUsuarios();
    // obtenerClases();
    // obtenerReservas();
  }, []);

  return (
    <DashboardLayout>
      
        <ClasesDisponibles/>
    </DashboardLayout>
  );
};

export default SocioClases;
