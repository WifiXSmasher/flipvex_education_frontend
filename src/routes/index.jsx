import { createBrowserRouter, Navigate } from 'react-router'

import PublicLayout from '@/layouts/PublicLayout'
import StudentLayout from '@/layouts/StudentLayout'
import ProtectedRoute from '@/auth/ProtectedRoute'

import Home from '@/pages/public/Home'
import Courses from '@/pages/public/Courses'
// import CourseDetail from '@/pages/public/CourseDetail'
// import Contact from '@/pages/public/Contact'

import Login from '@/pages/auth/Login'
import Signup from '@/pages/auth/Signup'
import ForgotPassword from '@/pages/auth/ForgotPassword'
import ResetPassword from '@/pages/auth/ResetPassword'
import GuestRoute from '@/auth/GuestRoute'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import StudentDashboard from '@/pages/student/StudentDashboard'
import CourseView from '@/pages/student/views/CourseView'
import AttendanceView from '@/pages/student/views/AttendenceView'
import NotFound from '@/pages/auth/NotFound'

export const router = createBrowserRouter([
  // Public website: navbar + footer layout
  {
    element: <PublicLayout /> ,
    children:[
      { path: '/', element: <Home /> },
      { path: '/courses/', element: <Courses /> },
      // { path: '/courses/:courseId', element: <CourseDetail /> },
      // { path: '/contact', element: <Contact /> },
    ],
  },

  // Auth pages, no public navbar

{
  element: <GuestRoute />,
  children: [
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/register', element: <Signup /> },
  ],
},
{ path: '/forgot-password', element: <ForgotPassword /> },
{ path: '/reset-password', element: <ResetPassword /> },
  // { path: '/403', element: <Forbidden /> },

  // Role areas: guard first, then layout, then pages
  {
    path: '/student',
    element: <ProtectedRoute allowedRoles={['student', 'Student']} />,
    children: [
      {
        element: <StudentLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <StudentDashboard /> },
          { path: 'courses', element: <CourseView /> },
          { path: 'attendance', element: <AttendanceView /> },
          // { path: 'assignments', element: <Assignments /> },
        ],
      },
    ],
  },
  // Add /counsellor, /admin, /faculty the same way

  {
    element: <ProtectedRoute allowedRoles={['admin', 'Admin']} />,
    children: [
      { path: '/admin', element: <AdminDashboard /> },
    ],
  },
  { path: '*', element: <NotFound /> },
])