// src/api/authService.js
import api from './api';

export const login = async (data) => {
  const response = await api.post('/Users/Login', data);
  const { token, user } = response.data;
  localStorage.setItem('token', token);
  return { token, user }; // asegúrate de retornar el objeto correcto
};



export const register = async (data) => {
  return await api.post('/Users/Register', data);
};
