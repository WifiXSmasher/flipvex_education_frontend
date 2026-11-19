import { Outlet } from 'react-router'
import Footer from './Footer'
import Navbar from './Navbar'


export default function PublicLayout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white font-sans text-slate-900">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
