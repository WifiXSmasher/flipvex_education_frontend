import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from './AuthContext'
import { ROLE_HOME } from './roles'

export default function GuestRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <div className="p-8 text-center">Loading...</div>

  if (user) {
    const from = location.state?.from
    const target = from ? from.pathname + from.search : ROLE_HOME[user.role] ?? '/'
    return <Navigate to={target} replace />
  }

  return <Outlet />
}