import api from './axios'

/**
 * GET /api/v1/users/?role=student
 * Query params: role, is_active, is_verified, search, ordering, page
 */
export async function fetchUsers({
  role = 'student',
  isActive,
  isVerified,
  search = '',
  ordering = '-date_joined',
  page = 1,
} = {}) {
  const params = { role, ordering, page }
  if (typeof isActive === 'boolean') params.is_active = isActive
  if (typeof isVerified === 'boolean') params.is_verified = isVerified
  if (search) params.search = search

  const { data } = await api.get('/users/', { params })
  const results = Array.isArray(data) ? data : data?.results ?? []
  const count = data?.count ?? results.length

  return { count, results, next: data?.next ?? null, previous: data?.previous ?? null }
}

/**
 * POST /api/v1/users/
 * Create a new user with any role (pre-verified by admin)
 */
export async function createUser(userData) {
  const { data } = await api.post('/users/', userData)
  return data
}

/**
 * PATCH /api/v1/users/{id}/
 */
export async function updateUser(id, updates) {
  const { data } = await api.patch(`/users/${id}/`, updates)
  return data
}

/**
 * POST /api/v1/users/{id}/deactivate/
 */
export async function deactivateUser(id) {
  const { data } = await api.post(`/users/${id}/deactivate/`)
  return data
}

/**
 * POST /api/v1/users/{id}/activate/
 */
export async function activateUser(id) {
  const { data } = await api.post(`/users/${id}/activate/`)
  return data
}
