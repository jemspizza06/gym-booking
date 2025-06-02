import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout';
import '../layouts/MainLayout.css'; // reutiliza los estilos del formulario de usuarios

const AdminUsers = () => {
  const [usuarios, setUsuarios] = useState([]);
//   const [entrenadores, setEntrenadores] = useState([]);
  const [editando, setEditando] = useState(null);

  const [nuevoUsuario, setNuevoUsuario] = useState({
    fullName: '',
    email: '',
    password: '',
    role: '',
  });

  const token = localStorage.getItem('token');

  // Instancia de axios para solicitudes al backend en los endpoint de usuarios
  const apiUsers = axios.create({
    baseURL: 'http://localhost:5296/api/Users',
    // headers: { Authorization: `Bearer ${token}` },
  });

  const obtenerUsuarios = async () => {
    const res = await apiUsers.get();
    setUsuarios(res.data);
  };

  const registrarUsuario = async() => {
    try {
    const res = await apiUsers.post("/Register", nuevoUsuario)
    setNuevoUsuario({ nombre: '', descripcion: '', fecha: '', capacidadMaxima: '' });
    obtenerUsuarios();
    } catch (error) {
              console.error('Error al crear usuario:', error);
    }
  } 

//   const editarUsuario = async() => {
//     try {
//         const res = await apiUsers.put("")
//     } catch (error) {
//         console.log("Error al editar usuario:",error)
//     }
//   }

  
  useEffect(() => {
    obtenerUsuarios();
    // obtenerEntrenadores();
  }, []);

  return (
    <DashboardLayout>
      <div className="table-container">
        <div className="search-box">
          <h2>Crear Nuevo Usuario</h2>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            registrarUsuario();
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
            value={nuevoUsuario.fullName}
            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Correo"
            value={nuevoUsuario.email}
            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, descripcion: e.target.value })}
            required
          />
          <input
            type="password"
            value={nuevoUsuario.password}
            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, fecha: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Rol"
            value={nuevoUsuario.role}
            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, capacidadMaxima: e.target.value })}
            required
          />
          <button type="submit" className="btn-new">+ Crear Usuario</button>
        </form>

        <h2>Listado de Usuarios</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Capacidad</th>
              <th>Entrenador</th>
              <th>Asignar</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>
                  {editando === usuario.id ? (
                    <input
                      value={usuario.nombre}
                      onChange={(e) =>
                        setUsuarios((prev) =>
                          prev.map((c) => c.id === usuario.id ? { ...c, nombre: e.target.value } : c)
                        )
                      }
                    />
                  ) : (
                    usuario.nombre
                  )}
                </td>
                <td>
                  {editando === usuario.id ? (
                    <input
                      value={usuario.descripcion}
                      onChange={(e) =>
                        setUsuarios((prev) =>
                          prev.map((c) => c.id === usuario.id ? { ...c, descripcion: e.target.value } : c)
                        )
                      }
                    />
                  ) : (
                    usuario.descripcion
                  )}
                </td>
                <td>
                  {editando === usuario.id ? (
                    <input
                      type="datetime-local"
                      value={new Date(usuario.fecha).toISOString().slice(0, 16)}
                      onChange={(e) =>
                        setUsuarios((prev) =>
                          prev.map((c) => c.id === usuario.id ? { ...c, fecha: e.target.value } : c)
                        )
                      }
                    />
                  ) : (
                    new Date(usuario.fecha).toLocaleString()
                  )}
                </td>
                <td>
                  {editando === usuario.id ? (
                    <input
                      type="number"
                      value={usuario.capacidadMaxima}
                      onChange={(e) =>
                        setUsuarios((prev) =>
                          prev.map((c) =>
                            c.id === usuario.id
                              ? { ...c, capacidadMaxima: parseInt(e.target.value) }
                              : c
                          )
                        )
                      }
                    />
                  ) : (
                    usuario.capacidadMaxima
                  )}
                </td>
                <td>{usuario.entrenador?.fullName || 'Sin asignar'}</td>

                {/* Realizar modificaciones necesarias para asignar rol */}
                {/* <td>
                  <select
                    defaultValue=""
                    onChange={(e) => asignarEntrenador(usuario.id, e.target.value)}
                  >
                    <option value="" disabled>Seleccionar</option>
                    {entrenadores.map((ent) => (
                      <option key={ent.id} value={ent.id}>
                        {ent.fullName}
                      </option>
                    ))}
                  </select>
                </td> */}
                <td>
                  <div className="actions">
                    {/* {editando === usuario.id ? (
                    <>
                        <button onClick={() => editarUsuario(usuario.id, usuario)} className="btn-edit">
                          <FaSave />
                        </button>
                        <button onClick={() => setEditando(null)} className="btn-delete">
                          <FaTimes />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => setEditando(usuario.id)} className="btn-edit">
                          <FaEdit />
                        </button>
                        <button onClick={() => eliminarusuario(usuario.id)} className="btn-delete">
                          <FaTrash />
                        </button>
                      </>
                    )} */}
                    <>
                        {/* <button onClick={() => setEditando(usuario.id)} className="btn-edit">
                          <FaEdit />
                        </button> */}
                        {/* <button onClick={() => eliminarusuario(usuario.id)} className="btn-delete">
                          <FaTrash />
                        </button> */}
                      </>
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

export default AdminUsers;
