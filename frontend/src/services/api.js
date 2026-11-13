
const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export function getToken() {
  return localStorage.getItem('syncradius_token');
}

export function setSession(token, user) {
  localStorage.setItem('syncradius_token', token);
  localStorage.setItem('syncradius_user', JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem('syncradius_token');
  localStorage.removeItem('syncradius_user');
}

export function getSavedUser() {
  try {
    return JSON.parse(localStorage.getItem('syncradius_user') || 'null');
  } catch {
    return null;
  }
}

export async function api(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  let body = options.body;

  if (body && typeof body !== 'string' && !(body instanceof URLSearchParams)) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(body);
  }

  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    body,
    headers
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = typeof data?.detail === 'string'
      ? data.detail
      : JSON.stringify(data?.detail || data);
    throw new Error(message || `Request failed (${response.status})`);
  }

  return data;
}
