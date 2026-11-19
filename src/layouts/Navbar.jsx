import { useState } from 'react'
import { ArrowRight, Menu, X, LogOut, User } from 'lucide-react'
import { useNavigate } from 'react-router'
import Button from '@/components/ui/Button'
import Logo from '@/components/ui/Logo'
import { useAuth } from '@/auth/AuthContext'
import { ROLE_HOME } from '@/auth/roles'

const links = [
  ['Home', '/'],
  ['Courses', '#courses'],
  ['Features', '#features'],
  ['Why Us', '#benefits'],
  ['Contact us', '#enquiry'],
  ['Enquiry','#Enquiry']
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  const dashboardPath = user ? (ROLE_HOME[user.role] || '/admin') : '/login'

  return (
    <header className="absolute inset-x-0 top-0 z-20 px-5 pt-5">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-white px-5 py-3 shadow-xl shadow-blue-950/10 sm:px-8">
          <Logo />

          <nav className="hidden items-center gap-1 rounded-xl border border-slate-200 p-1 lg:flex">
            {links.map(([name, link]) => (
              <a
                key={name}
                href={link}
                className="rounded-lg px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
              >
                {name}
              </a>
            ))}
          </nav>
            {/* -----------------logout added------------ */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <>
                <Button href={dashboardPath}>
                  Dashboard
                  <ArrowRight size={16} />
                </Button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                >
                  <LogOut size={15} />
                  Sign out
                </button>
              </>
            ) : (
              <Button href="/login">
                Login
                <ArrowRight size={16} />
              </Button>
            )}
          
          
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-lg p-2 text-slate-800 lg:hidden"
            aria-label="Toggle navigation"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <nav className="mt-2 space-y-1 rounded-2xl bg-white p-4 shadow-xl lg:hidden">
            {links.map(([name, link]) => (
              <a
                key={name}
                href={link}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-medium hover:bg-blue-50"
              >
                {name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Get Started for Free
            </a>
            
          </nav>
        )}
      </div>
    </header>
  )
}
