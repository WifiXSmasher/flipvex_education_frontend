import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { fetchMe, loginRequest, logoutRequest } from '@/api/auth'
import { getAccess, getRefresh, saveTokens, clearTokens } from './tokenStorage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // const [user, setUser] = useState(null)
  const [user, setUser] = useState(null)
  // Only "loading" if there is a stored token to check
  const [loading, setLoading] = useState(() => !!(getAccess() || getRefresh()))

  // Restore the session on page load / refresh
  useEffect(() => {
    if (!getAccess() && !getRefresh()) return
    let active = true

    fetchMe()
      .then((me) => active && setUser(me))
      .catch(() => active && setUser(null)) // axios already clears tokens on auth failure
      .finally(() => active && setLoading(false))

    return () => {
      active = false
    }
  }, [])

  // axios tells us when the refresh token has failed
  useEffect(() => {
    const onForcedLogout = () => setUser(null)
    window.addEventListener('auth:logout', onForcedLogout)
    return () => window.removeEventListener('auth:logout', onForcedLogout)
  }, [])

  const login = useCallback(async ({ email, password, rememberMe }) => {
    const data = await loginRequest({ email, password })
    saveTokens({ access: data.access, refresh: data.refresh }, rememberMe)
    setUser(data.user)
    return data.user
  }, [])

  const logout = useCallback(async () => {
    const refresh = getRefresh()
    try {
      if (refresh) await logoutRequest(refresh) // lets Django invalidate the token
    } catch {
      // ignore: we still log out locally
    }
    clearTokens()
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}