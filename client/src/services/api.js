import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('novita_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const reqUrl = err.config?.url || '';
    const isLoginAttempt = reqUrl.includes('/auth/login');
    if (err.response?.status === 401 && !isLoginAttempt) {
      localStorage.removeItem('novita_token');
      localStorage.removeItem('novita_admin');
      if (!window.location.pathname.startsWith('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(err);
  }
);

export default api;

export const appointmentsApi = {
  create: (data) => api.post('/appointments', data),
  list: () => api.get('/appointments'),
  updateStatus: (id, status) => api.patch(`/appointments/${id}`, { status }),
  remove: (id) => api.delete(`/appointments/${id}`),
};

export const contactApi = {
  create: (data) => api.post('/contact', data),
  list: () => api.get('/contact'),
  markRead: (id) => api.patch(`/contact/${id}/read`),
};

export const doctorsApi = {
  list: () => api.get('/doctors'),
  listAll: () => api.get('/doctors/all'),
  create: (data) => api.post('/doctors', data),
  update: (id, data) => api.put(`/doctors/${id}`, data),
  remove: (id) => api.delete(`/doctors/${id}`),
};

export const servicesApi = {
  list: () => api.get('/services'),
  listAll: () => api.get('/services/all'),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  remove: (id) => api.delete(`/services/${id}`),
};

export const authApi = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  me: () => api.get('/auth/me'),
  updateProfile: (data) => api.patch('/auth/profile', data),
  changePassword: (data) => api.patch('/auth/password', data),
};
