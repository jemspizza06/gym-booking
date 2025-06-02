// src/pages/ClasesDisponibles.js
import React, { useEffect, useState } from 'react';
import '../FormStyles.css'; // Reutilizando estilos generales
// import { getClases } from '../services/clasesService'; ← si tienes un backend, podrías usar esto

const ClasesDisponibles = () => {
  const [clases, setClases] = useState([]);

  // Simulamos datos por ahora
  useEffect(() => {
    const clasesFake = [
      { id: 1, nombre: 'Yoga', horario: 'Lunes 18:00', entrenador: 'Ana P.', cupos: 10 },
      { id: 2, nombre: 'Spinning', horario: 'Martes 19:00', entrenador: 'Carlos M.', cupos: 5 },
      { id: 3, nombre: 'Zumba', horario: 'Miércoles 17:00', entrenador: 'Laura Q.', cupos: 8 }
    ];
    setClases(clasesFake);
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
            <p><strong>Horario:</strong> {clase.horario}</p>
            <p><strong>Entrenador:</strong> {clase.entrenador}</p>
            <p><strong>Cupos disponibles:</strong> {clase.cupos}</p>
            <button style={{ marginTop: '0.5rem' }}>Inscribirse</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClasesDisponibles;
