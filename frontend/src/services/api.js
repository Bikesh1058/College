import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach JWT token from localStorage if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('khwopa_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API Methods
export const api = {
  // PageBuilder CMS
  getPage: async (slug) => {
    const res = await apiClient.get(`/pages/${slug}`);
    return res.data.data;
  },

  // Faculty Directory
  getFaculty: async (params = {}) => {
    const res = await apiClient.get('/faculty', { params });
    return res.data;
  },

  // Academic Programmes
  getProgrammes: async (params = {}) => {
    const res = await apiClient.get('/programmes', { params });
    return res.data;
  },
  getProgramme: async (slug) => {
    const res = await apiClient.get(`/programmes/${slug}`);
    return res.data.data;
  },

  // Notices
  getNotices: async (params = {}) => {
    const res = await apiClient.get('/notices', { params });
    return res.data;
  },
  getNotice: async (slug) => {
    const res = await apiClient.get(`/notices/${slug}`);
    return res.data.data;
  },

  // Auth / CMS Login
  login: async (credentials) => {
    const res = await apiClient.post('/auth/login', credentials);
    return res.data;
  },
  getMe: async () => {
    const res = await apiClient.get('/auth/me');
    return res.data.user;
  },

  // News & Articles
  getNews: async (params = {}) => {
    const res = await apiClient.get('/content/news', { params });
    return res.data;
  },
  createNews: async (payload) => {
    const res = await apiClient.post('/content/news', payload);
    return res.data;
  },

  // Events
  getEvents: async (params = {}) => {
    const res = await apiClient.get('/content/events', { params });
    return res.data;
  },
  createEvent: async (payload) => {
    const res = await apiClient.post('/content/events', payload);
    return res.data;
  },

  // Research
  getResearch: async (params = {}) => {
    const res = await apiClient.get('/content/research', { params });
    return res.data;
  },
  createResearch: async (payload) => {
    const res = await apiClient.post('/content/research', payload);
    return res.data;
  },
  deleteResearch: async (id) => {
    const res = await apiClient.delete(`/content/research/${id}`);
    return res.data;
  },

  // Clubs
  getClubs: async () => {
    const res = await apiClient.get('/content/clubs');
    return res.data;
  },
  createClub: async (payload) => {
    const res = await apiClient.post('/content/clubs', payload);
    return res.data;
  },
  deleteClub: async (id) => {
    const res = await apiClient.delete(`/content/clubs/${id}`);
    return res.data;
  },

  // Facilities / Campus Media
  getFacilities: async () => {
    const res = await apiClient.get('/content/facilities');
    return res.data;
  },

  // Documents
  getDocuments: async () => {
    const res = await apiClient.get('/content/documents');
    return res.data;
  },
  createDocument: async (payload) => {
    const res = await apiClient.post('/content/documents', payload);
    return res.data;
  },
  deleteDocument: async (id) => {
    const res = await apiClient.delete(`/content/documents/${id}`);
    return res.data;
  },

  // Programmes CRUD
  createProgramme: async (payload) => {
    const res = await apiClient.post('/programmes', payload);
    return res.data;
  },
  updateProgramme: async (id, payload) => {
    const res = await apiClient.put(`/programmes/${id}`, payload);
    return res.data;
  },
  deleteProgramme: async (id) => {
    const res = await apiClient.delete(`/programmes/${id}`);
    return res.data;
  },

  // Admissions & Applications
  submitAdmissionApplication: async (payload) => {
    const res = await apiClient.post('/admissions/apply', payload);
    return res.data;
  },
  getAdmissionApplications: async (params = {}) => {
    const res = await apiClient.get('/admissions/applications', { params });
    return res.data;
  },
  getAdmissionApplication: async (id) => {
    const res = await apiClient.get(`/admissions/applications/${id}`);
    return res.data;
  },
  updateAdmissionStatus: async (id, payload) => {
    const res = await apiClient.put(`/admissions/applications/${id}/status`, payload);
    return res.data;
  },
  sendApplicantEmail: async (id, payload) => {
    const res = await apiClient.post(`/admissions/applications/${id}/send-email`, payload);
    return res.data;
  },

  // Newsletter Subscription
  subscribeNewsletter: async (email) => {
    const res = await apiClient.post('/content/newsletter/subscribe', { email });
    return res.data;
  },
  getSubscribers: async () => {
    const res = await apiClient.get('/content/newsletter/subscribers');
    return res.data;
  }
};

