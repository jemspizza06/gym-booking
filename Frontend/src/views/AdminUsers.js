import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout';
import '../layouts/MainLayout.css'; // reutiliza los estilos del formulario de usuarios
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const AdminUsers = () => {
  const [usuarios, setUsuarios] = useState([]);
//   const [entrenadores, setEntrenadores] = useState([]);
  const [editando, setEditando] = useState(null);

// llamando al usuario logeado en localStorage
  const almacenUsuario = useAuth()

  const roles = [
    {
      id:1,
      cargo: "Administrador"
    },
    {
      id:2,
      cargo: "Entrenador"
    },
    {
      id:3,
      cargo: "Socio"
    }
  ]

  const [nuevoUsuario, setNuevoUsuario] = useState({
    fullName: '',
    email: '',
    password: '',
    role: '',
  });

  const [usuarioEditado, setUsuarioEditado] = useState({
    fullName: '',
    email: '',
    passwordHash: '',
    role: '',
  })

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
    setNuevoUsuario({ fullName: '', email: '', password: '', role: '' });
    toast.success("Usuario creado con exito");
    obtenerUsuarios();
    } catch (error) {
              console.error('Error al crear usuario:', error);
    }
  } 

  const editarUsuario = () => {
    return null
  }

  const eliminarUsuario = async(id) => {
    try {
      const response = await apiUsers.delete(`/delete/${id}`);
      toast.success("Usuario eliminado con exito")
      obtenerUsuarios();
    } catch (error) {
      console.log("Error:",error);
      toast.error("Error al eliminar usuario")
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
          {/* Llamndo el nombre del usuario logeado */}
          {almacenUsuario.user.role == "Socio"?(
                      <h2>Hola socio: {almacenUsuario.user.fullName}</h2>
          ):(
            // <h2>Hola admin: {almacenUsuario.user.fullName}</h2>
            <>
            </>
          )}
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
            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, fullName: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Correo"
            value={nuevoUsuario.email}
            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Contrasena"
            value={nuevoUsuario.password}
            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Rol"
            value={nuevoUsuario.role}
            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, role: e.target.value })}
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
              <th>Contraseña</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>
                  {editando === usuario.id ? (
                    <input
                      value={usuario.fullName}
                      onChange={(e) =>
                        setUsuarios((prev) =>
                          prev.map((c) => c.id === usuario.id ? { ...c, fullName: e.target.value } : c)
                        )
                      }
                    />
                  ) : (
                    usuario.fullName
                  )}
                </td>
                <td>
                  {editando === usuario.id ? (
                    <input
                      value={usuario.email}
                      onChange={(e) =>
                        setUsuarios((prev) =>
                          prev.map((c) => c.id === usuario.id ? { ...c, email: e.target.value } : c)
                        )
                      }
                    />
                  ) : (
                    usuario.email
                  )}
                </td>
                <td>
                  {editando === usuario.id ? (
                    <input
                      type="password"
                      value={usuario.password}
                      onChange={(e) =>
                        setUsuarios((prev) =>
                          prev.map((c) => c.id === usuario.id ? { ...c, password: e.target.value } : c)
                        )
                      }
                    />
                  ) : (
                    usuario.passwordHash
                  )}
                </td>

                {/* Realizar modificaciones necesarias para asignar rol */}
                <td>
                  <select
                    defaultValue=""
                    onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, role: e.target.value })}
                  >
                    <option value="" disabled>Seleccionar</option>
                    {roles.map((rol) => (
                      <option key={rol.id} value={rol.cargo}>
                        {rol.cargo}
                      </option>
                    ))}
                  </select>
                </td>
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
                        <button onClick={() => setEditando(usuario.id)} className="btn-edit">
                          <FaEdit />
                        </button>
                        <button onClick={() => eliminarUsuario(usuario.id)} className="btn-delete">
                          <FaTrash />
                        </button>
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
