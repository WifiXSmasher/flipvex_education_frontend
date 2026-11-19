import { useState } from 'react'
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Award,
  ChartNoAxesCombined,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { site } from '@/config/site'
import { useLogin } from '@/hooks/useLogin'
import SmartLink from '@/components/ui/SmartLink'

const Login = () => {
  const { values, errors, loading, message, setField, setMessage, submit } = useLogin()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <main className="min-h-screen bg-slate-50 p-3 sm:p-5 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-24px)] max-w-[1500px] overflow-hidden rounded-[28px] bg-white shadow-2xl shadow-slate-200/70 sm:min-h-[calc(100vh-40px)] lg:grid-cols-[1.08fr_0.92fr]">
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-600 to-sky-400 p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
          <div className="absolute -right-32 top-20 h-96 w-96 rounded-full border border-white/10" />
          <div className="absolute -right-20 top-32 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10">
            <a href="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-lg">
                <GraduationCap size={29} />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">{site.brand}</span>
            </a>
          </div>

          <div className="relative z-10 my-12 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur-md">
              <Sparkles size={14} />
              YOUR LEARNING JOURNEY STARTS HERE
            </div>

            <h1 className="mt-8 text-5xl font-extrabold leading-[1.15] tracking-tight xl:text-6xl">
              Learn better.
              <br />
              Grow faster.
              <br />
              <span className="text-blue-200">Achieve more.</span>
            </h1>

            <p className="mt-7 max-w-md text-base leading-8 text-blue-100">
              Your entire learning experience, connected in one place. Access your courses, track your
              progress and reach your goals with {site.brand}.
            </p>

            <div className="mt-12 max-w-md rounded-2xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-blue-100">Learning overview</p>
                  <h3 className="mt-1 text-lg font-bold">Your progress</h3>
                </div>
                <div className="rounded-xl bg-white/20 p-3">
                  <ChartNoAxesCombined size={23} />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  ['12', 'Courses'],
                  ['08', 'Completed'],
                  ['92%', 'Progress'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-xl bg-white/10 p-3">
                    <p className="text-xl font-bold">{value}</p>
                    <p className="mt-1 text-xs text-blue-100">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-xl bg-white/10 p-3">
                <div className="rounded-lg bg-white/20 p-2">
                  <Award size={21} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Keep moving forward!</p>
                  <p className="mt-1 text-xs text-blue-100">Every lesson takes you closer to success.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between gap-4 text-xs text-blue-100">
            <p>© 2026 {site.brand}. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <ShieldCheck size={15} />
              Secure learning environment
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-12 lg:px-12 xl:px-20">
          <div className="w-full max-w-md">
            <a href="/" className="mb-12 flex items-center justify-center gap-2 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <GraduationCap size={25} />
              </div>
              <span className="text-2xl font-extrabold">{site.brand}</span>
            </a>

            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                <Sparkles size={13} />
                Welcome to {site.brand}
              </span>
              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Welcome back!
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Sign in to access your personalized learning dashboard.
              </p>
            </div>

            <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-800">
                  Email address
                </label>
                <div
                  className={`flex h-13 items-center gap-3 rounded-xl border bg-white px-4 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 ${
                    errors.email ? 'border-red-400' : 'border-slate-200'
                  }`}
                >
                  <Mail size={19} className="shrink-0 text-slate-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="username"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={(e) => setField('email', e.target.value)}
                    className="h-full w-full bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    required
                    aria-invalid={!!errors.email}
                  />

                </div>
                {errors.email && <p className="mt-2 text-xs text-red-500">{errors.email}</p>}
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-semibold text-slate-800">
                    Password
                  </label>
                </div>
                <div
                  className={`flex h-13 items-center gap-3 rounded-xl border bg-white px-4 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 ${
                    errors.password ? 'border-red-400' : 'border-slate-200'
                  }`}
                >
                  <Lock size={19} className="shrink-0 text-slate-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={(e) => setField('password', e.target.value)}
                    className="h-full w-full min-w-0 bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    required
                    aria-invalid={!!errors.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="shrink-0 text-slate-400 hover:text-blue-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
                {errors.password && <p className="mt-2 text-xs text-red-500">{errors.password}</p>}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={values.rememberMe}
                    onChange={(e) => setField('rememberMe', e.target.checked)}
                    className="h-4 w-4 accent-blue-600"
                  />
                  Remember me
                </label>
                <SmartLink
                  href="/forgot-password"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </SmartLink>
              </div>

              {message && (
                <div role="alert" className="rounded-xl border border-blue-100 bg-blue-50 p-3 text-sm text-red-500">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Signing in...' : `Sign In to ${site.brand}`}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="mt-9 border-t border-slate-100 pt-6">
              <p className="mb-4 text-center text-sm text-slate-600">
                Don't have an account?{' '}
                <SmartLink
                  href="/signup"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Create an account
                </SmartLink>
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <CheckCircle2 size={15} className="text-green-500" />
                Your learning space is protected and secure.
              </div>
              <div className="mt-6 flex justify-center gap-5 text-xs text-slate-400">
                <a href="/privacy" className="hover:text-blue-600">Privacy Policy</a>
                <a href="/terms" className="hover:text-blue-600">Terms of Service</a>
                <a href="/contact" className="hover:text-blue-600">Help</a>
              </div>
              <p className="mt-5 text-center text-xs text-slate-400 lg:hidden">
                © 2026 {site.brand}. All rights reserved.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Login
