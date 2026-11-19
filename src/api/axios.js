import axios from 'axios'
import { getAccess, getRefresh, saveTokens, clearTokens } from '@/auth/tokenStorage'

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const PROTECTED_PREFIXES = ['/student', '/faculty', '/counsellor', '/admin']

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT access token (from localStorage or sessionStorage, via tokenStorage)
api.interceptors.request.use(
  (config) => {
    const accessToken = getAccess()
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
    return config
  },
  (error) => Promise.reject(error)
)

// One shared refresh request, even if several calls fail at the same time
let refreshPromise = null

function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${BASE_URL}/auth/token/refresh/`, { refresh: getRefresh() }) // plain axios: no interceptor loop
      .then(({ data }) => {
        // No "remember" argument: keeps using the store (local or session) already in use
        saveTokens({ access: data.access, refresh: data.refresh })
        return data.access
      })
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}

// Clears tokens, tells AuthContext, and goes to /login only from protected pages
function endSession() {
  clearTokens()
  window.dispatchEvent(new Event('auth:logout')) // AuthContext listens for this
  const onProtectedPage = PROTECTED_PREFIXES.some((p) => window.location.pathname.startsWith(p))
  if (onProtectedPage) window.location.assign('/login')
  return onProtectedPage
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    const isLoginRequest = original?.url?.includes('/auth/login')

    if (
      error.response?.status !== 401 ||
      !original ||
      original._retry ||
      isLoginRequest ||
      !getRefresh()
    ) {
      return Promise.reject(error)
    }

    original._retry = true
    try {
      const newAccess = await refreshAccessToken()
      original.headers.Authorization = `Bearer ${newAccess}`
      return api(original)
    } catch (refreshError) {
      const redirected = endSession()
      if (!redirected) {
        // Public page with a stale token: retry once as an anonymous visitor
        delete original.headers.Authorization
        return api(original)
      }
      return Promise.reject(refreshError)
    }
  }
)

export default api