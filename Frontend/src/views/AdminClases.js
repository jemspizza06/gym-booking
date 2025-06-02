import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout';
import '../layouts/MainLayout.css'; // reutiliza los estilos del formulario de usuarios

const AdminClases = () => {
  const [clases, setClases] = useState([]);
  const [entrenadores, setEntrenadores] = useState([]);
  const [editando, setEditando] = useState(null);

  const [nuevaClase, setNuevaClase] = useState({
    nombre: '',
    descripcion: '',
    fecha: '',
    capacidadMaxima: '',
  });

  const token = localStorage.getItem('token');

  // Instancia de axios para solicitudes al backend como administrador
  const api = axios.create({
    baseURL: 'http://localhost:5296/api/admin',
    headers: { Authorization: `Bearer ${token}` },
  });

  const obtenerClases = async () => {
    const res = await api.get('/clases');
    setClases(res.data);
  };

  const obtenerEntrenadores = async () => {
    const res = await api.get('/entrenadores');
    setEntrenadores(res.data);
  };

  const crearClase = async () => {
    try {
      await api.post('/clases', nuevaClase);
      setNuevaClase({ nombre: '', descripcion: '', fecha: '', capacidadMaxima: '' });
      obtenerClases();
    } catch (error) {
      console.error('Error al crear clase', error);
    }
  };

  const eliminarClase = async (id) => {
    const result = await Swal.fire({
      title: "¿Está seguro de eliminar?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
    await api.delete(`/clases/${id}`);
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Clase eliminada",
          showConfirmButton: false,
          timer: 2000,
        });
        obtenerClases();
      } catch (error) {
        console.error("Error al eliminar clase:", error);
      }
    }
  };

  const editarClase = async (id, claseEditada) => {
    await api.put(`/clases/${id}`, claseEditada);
    setEditando(null);
    obtenerClases();
  };

  const asignarEntrenador = async (claseId, entrenadorId) => {
    await api.put(`/clases/${claseId}/asignar-entrenador/${entrenadorId}`);
    obtenerClases();
  };

  useEffect(() => {
    obtenerClases();
    obtenerEntrenadores();
  }, []);

  return (
    <DashboardLayout>
      <div className="table-container">
        <div className="search-box">
          <h2>Crear Nueva Clase</h2>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            crearClase();
          }}
          style={{
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxWidth: '400px',
          }}
        >
          <input
            type="text"
            placeholder="Nombre"
            value={nuevaClase.nombre}
            onChange={(e) => setNuevaClase({ ...nuevaClase, nombre: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Descripción"
            value={nuevaClase.descripcion}
            onChange={(e) => setNuevaClase({ ...nuevaClase, descripcion: e.target.value })}
            required
          />
          <input
            type="datetime-local"
            value={nuevaClase.fecha}
            onChange={(e) => setNuevaClase({ ...nuevaClase, fecha: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Capacidad"
            value={nuevaClase.capacidadMaxima}
            onChange={(e) => setNuevaClase({ ...nuevaClase, capacidadMaxima: e.target.value })}
            required
          />
          <button type="submit" className="btn-new">+ Crear Clase</button>
        </form>

        <h2>Listado de Clases</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Fecha</th>
              <th>Capacidad</th>
              <th>Entrenador</th>
              <th>Asignar</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clases.map((clase) => (
              <tr key={clase.id}>
                <td>
                  {editando === clase.id ? (
                    <input
                      value={clase.nombre}
                      onChange={(e) =>
                        setClases((prev) =>
                          prev.map((c) => c.id === clase.id ? { ...c, nombre: e.target.value } : c)
                        )
                      }
                    />
                  ) : (
                    clase.nombre
                  )}
                </td>
                <td>
                  {editando === clase.id ? (
                    <input
                      value={clase.descripcion}
                      onChange={(e) =>
                        setClases((prev) =>
                          prev.map((c) => c.id === clase.id ? { ...c, descripcion: e.target.value } : c)
                        )
                      }
                    />
                  ) : (
                    clase.descripcion
                  )}
                </td>
                <td>
                  {editando === clase.id ? (
                    <input
                      type="datetime-local"
                      value={new Date(clase.fecha).toISOString().slice(0, 16)}
                      onChange={(e) =>
                        setClases((prev) =>
                          prev.map((c) => c.id === clase.id ? { ...c, fecha: e.target.value } : c)
                        )
                      }
                    />
                  ) : (
                    new Date(clase.fecha).toLocaleString()
                  )}
                </td>
                <td>
                  {editando === clase.id ? (
                    <input
                      type="number"
                      value={clase.capacidadMaxima}
                      onChange={(e) =>
                        setClases((prev) =>
                          prev.map((c) =>
                            c.id === clase.id
                              ? { ...c, capacidadMaxima: parseInt(e.target.value) }
                              : c
                          )
                        )
                      }
                    />
                  ) : (
                    clase.capacidadMaxima
                  )}
                </td>
                <td>{clase.entrenador?.fullName || 'Sin asignar'}</td>
                <td>
                  <select
                    defaultValue=""
                    onChange={(e) => asignarEntrenador(clase.id, e.target.value)}
                  >
                    <option value="" disabled>Seleccionar</option>
                    {entrenadores.map((ent) => (
                      <option key={ent.id} value={ent.id}>
                        {ent.fullName}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <div className="actions">
                    {editando === clase.id ? (
                    <>
                        <button onClick={() => editarClase(clase.id, clase)} className="btn-edit">
                          <FaSave />
                        </button>
                        <button onClick={() => setEditando(null)} className="btn-delete">
                          <FaTimes />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => setEditando(clase.id)} className="btn-edit">
                          <FaEdit />
                        </button>
                        <button onClick={() => eliminarClase(clase.id)} className="btn-delete">
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default AdminClases;
