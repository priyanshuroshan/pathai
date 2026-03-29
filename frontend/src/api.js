import axios from 'axios';

// Render URL ke peeche slash (/) BILKUL NAHI hona chahiye
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
