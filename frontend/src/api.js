const API = 'http://localhost:8080/api'

async function request(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || data.error || 'Something went wrong')
  return data
}

export const api = {
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  quizzes: () => request('/quizzes'),
  quiz: (id) => request(`/quizzes/${id}`),
  submitAttempt: (body) => request('/attempts', { method: 'POST', body: JSON.stringify(body) }),
  history: (id) => request(`/attempts/user/${id}`),
  leaderboard: () => request('/leaderboard')
}
