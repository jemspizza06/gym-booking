// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5296/api', // ✅ importante
});

export default api;
