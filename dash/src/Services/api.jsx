const BASE_URL = '/api/v1';
export const BACKEND_URL = 'http://localhost:8080';

export function getImageUrl(imageUrl) {
  if (!imageUrl) return null;

  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  if (!imageUrl.startsWith('/')) {
    return `${BACKEND_URL}/images/${imageUrl}`;
  }

  return `${BACKEND_URL}${imageUrl}`;
}

function getAuthHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function getCurrentUser() {
  const raw = localStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
}

export function isAdmin() {
  const user = getCurrentUser();
  return user?.role === 'ADMIN';
}

async function request(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
      ...options.headers,
    },
    ...options,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    if (data.validationErrors?.length) {
      const detail = data.validationErrors
        .map(e => e.message)
        .join(', ');
      throw new Error(detail);
    }

    throw new Error(data.message || 'Une erreur est survenue');
  }

  return data;
}

async function requestFormData(endpoint, formData, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: options.method || 'POST',
    headers: {
      ...getAuthHeader(),
      ...options.headers,
    },
    body: formData,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    if (data.validationErrors?.length) {
      throw new Error(data.validationErrors.map(e => e.message).join(', '));
    }

    throw new Error(data.message || 'Une erreur est survenue');
  }

  return data;
}

export const userService = {
  login: (dto) => request('/users/login', {
    method: 'POST',
    body: JSON.stringify(dto),
  }),

  register: (dto) => request('/users/register', {
    method: 'POST',
    body: JSON.stringify(dto),
  }),
};

export const voitureService = {
  getAll: () => request('/voitures'),

  getById: (id) => request(`/voitures/${id}`),

  create: (voitureData, imageFile) => {
    const formData = new FormData();

    formData.append(
      'voiture',
      new Blob([JSON.stringify(voitureData)], { type: 'application/json' })
    );

    if (imageFile) {
      formData.append('image', imageFile);
    }

    return requestFormData('/voitures', formData);
  },
};

export const clientService = {
  getById: (id) => request(`/clients/${id}`),

  update: (id, dto) => request(`/clients/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dto),
  }),
};

export const reservationService = {
  create: (dto) => request('/reservations', {
    method: 'POST',
    body: JSON.stringify(dto),
  }),

  createComplete: (dto) => request('/reservations/complete', {
    method: 'POST',
    body: JSON.stringify(dto),
  }),

  getByClient: (clientId) => request(`/reservations/client/${clientId}`),

  annuler: (id) => request(`/reservations/${id}`, {
    method: 'DELETE',
  }),
};