import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from './AuthContext'
import { ROLE_HOME } from './roles'

export default function ProtectedRoute({ allowedRoles }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  // 1. Still checking the session (e.g. after a page refresh)
  if (loading) return <div className="p-8 text-center">Loading...</div>

  // 2. Not logged in
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  // 3. Logged in, but wrong role for this section
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={ROLE_HOME[user.role] ?? '/'} replace />
  }

  return <Outlet />
}