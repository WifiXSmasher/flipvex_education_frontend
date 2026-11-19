import { createBrowserRouter } from 'react-router'

import PublicLayout from '@/layouts/PublicLayout'
// import StudentLayout from '@/layouts/StudentLayout'
// import ProtectedRoute from '@/auth/ProtectedRoute'

import Home from '@/pages/public/Home'
import Courses from '@/pages/public/Courses'
// import CourseDetail from '@/pages/public/CourseDetail'
// import Contact from '@/pages/public/Contact'

import Login from '@/pages/auth/Login'
import Signup from '@/pages/auth/Signup'
import ForgotPassword from '@/pages/auth/ForgotPassword'
import ResetPassword from '@/pages/auth/ResetPassword'
import GuestRoute from '@/auth/GuestRoute'
import ProtectedRoute from '@/auth/ProtectedRoute'
import AdminDashboard from '@/pages/admin/AdminDashboard'

// import Forbidden from '@/pages/auth/Forbidden'
// import NotFound from '@/pages/auth/NotFound'
// import StudentDashboard from '@/pages/student/Dashboard'

export const router = createBrowserRouter([
  // Public website: navbar + footer layout
  {
    element: <PublicLayout /> ,
    children:[
      { path: '/', element: <Home /> },
      { path: '/courses', element: <Courses /> },
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
  // {
  //   path: '/student',
  //   element: <ProtectedRoute allowedRoles={['Student']} />,
  //   children: [
  //     {
  //       element: <StudentLayout />,
  //       children: [
  //         { path: 'dashboard', element: <StudentDashboard /> },
  //         // { path: 'assignments', element: <Assignments /> },
  //       ],
  //     },
  //   ],
  // },
  // Add /counsellor, /admin, /faculty the same way

  // { path: '*', element: <NotFound /> },



  {
  element:<ProtectedRoute allowedRoles={['admin', 'Admin']} />,
  children: [
    { path: '/admin', element: <AdminDashboard /> },
  ],
},
])