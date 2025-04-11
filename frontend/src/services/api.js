const API_URL = 'http://localhost:5000/api';

// Generic fetch function with error handling
async function fetchApi(endpoint, options = {}) {
  const url = `${API_URL}/${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

// API objects for various services

export const appointmentsApi = {
  getAll: () => fetchApi('appointments'),
  create: (data) =>
    fetchApi('appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export const behaviorsApi = {
  getAll: () => fetchApi('behaviors'),
  create: (data) =>
    fetchApi('behaviors', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export const progressApi = {
  getAll: () => fetchApi('progress'),
  create: (data) =>
    fetchApi('progress', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export const recommendationsApi = {
  getAll: () => fetchApi('recommendations'),
  create: (data) =>
    fetchApi('recommendations', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export const reportsApi = {
  getAll: () => fetchApi('reports'),
  create: (data) =>
    fetchApi('reports', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export const goalsApi = {
  getAll: () => fetchApi('goals'),
  create: (data) =>
    fetchApi('goals', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export const wellbeingApi = {
  getAll: () => fetchApi('wellbeing'),
  create: (data) =>
    fetchApi('wellbeing', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export const emotionalJournalApi = {
  getAll: () => fetchApi('emotions'),
  create: (data) =>
    fetchApi('emotions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export const notificationsApi = {
  getAll: () => fetchApi('notifications'),
  create: (data) =>
    fetchApi('notifications', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export const videosApi = {
  getAll: () => fetchApi('videos'),
  create: (data) =>
    fetchApi('videos', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export const observationsApi = {
  getAll: () => fetchApi('observations'),
  create: (data) =>
    fetchApi('observations', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export const uploadApi = {
  uploadFile: (formData) =>
    fetchApi('upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set content type for FormData
    }),
};
export const questionsApi = {
  getAll: () => fetchApi('questions'),
  create: (data) =>
    fetchApi('questions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

