
import { Link } from 'react-router'
import SignupForm from '@/components/SignupForm'

export default function Signup() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-7 shadow-xl shadow-blue-900/5 sm:p-9">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Join us and start your learning journey.
          </p>
        </div>

        <SignupForm />

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
