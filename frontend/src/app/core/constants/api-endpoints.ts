const API_BASE_URL = '/api';

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    currentUser: `${API_BASE_URL}/auth/me`
  },
  tickets: `${API_BASE_URL}/tickets`,
  notifications: `${API_BASE_URL}/notifications`,
  technicians: `${API_BASE_URL}/technicians`,
  users: `${API_BASE_URL}/users`
} as const;