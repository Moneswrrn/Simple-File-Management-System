import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const api = axios.create({ baseURL: API_BASE + '/routes' });

export async function fetchNotes() {
  const res = await api.get('/notes');
  return res.data;
}

export async function createNote(data) {
  const res = await api.post('/notes', data);
  return res.data;
}

export async function updateNote(id, data) {
  const res = await api.put(`/notes/${id}`, data);
  return res.data;
}

export async function deleteNote(id) {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
}
