import { useState } from 'react'
import { Link } from 'react-router'
import {
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  Sparkles,
} from 'lucide-react'
import { useLogin } from '@/hooks/useLogin'

export default function LoginPage() {
  const { values, errors, loading, message, setField, submit } = useLogin()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-[#faf9f7] flex flex-col font-sans text-[#28143f]">
      {/* Header */}
      <header className="w-full max-w-[1280px] mx-auto px-6 md:px-10 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#27123d] flex items-center justify-center text-white shadow-sm">
            <GraduationCap size={20} strokeWidth={2.2} />
          </div>

          <div>
            <h1 className="font-bold text-base text-[#27123d] leading-tight tracking-tight">
              Learnova
            </h1>
            <p className="text-[9px] font-semibold tracking-[2px] text-gray-400 uppercase mt-0.5">
              Academic Studio
            </p>
          </div>
        </Link>
      </header>

      {/* Main Card Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-4">
        <div className="w-full max-w-[1040px] bg-white rounded-[24px] shadow-[0_20px_50px_-15px_rgba(39,18,61,0.08)] border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Promotional Panel */}
          <section className="relative overflow-hidden bg-[#27123d] text-white px-8 py-10 md:px-12 md:py-12 flex flex-col justify-between min-h-[540px]">
            {/* Subtle Decorative Background Circles */}
            <div className="absolute -top-14 -right-14 w-52 h-52 rounded-full bg-[#4a3525]/50 pointer-events-none" />
            <div className="absolute -bottom-24 -left-16 w-56 h-56 rounded-full border-[14px] border-[#4a3525]/45 pointer-events-none" />

            {/* Top Badge */}
            <div className="relative z-10 flex items-center gap-3.5">
              <div className="w-10 h-10 bg-[#f6c945] rounded-xl flex items-center justify-center text-[#27123d] shadow-sm">
                <Sparkles size={19} strokeWidth={2.2} />
              </div>
              <span className="text-[11px] font-bold tracking-[2px] uppercase text-white/95">
                Learnova Members
              </span>
            </div>

            {/* Center Headline & Copy */}
            <div className="relative z-10 my-10">
              <p className="text-[10px] font-bold tracking-[2.5px] text-white/80 mb-4 uppercase">
                Welcome back
              </p>

              <h2 className="text-3xl md:text-[34px] leading-[1.18] font-bold tracking-tight mb-5">
                Your next milestone is closer than you think.
              </h2>

              <p className="text-[13px] text-purple-200/85 leading-[1.7] max-w-[350px]">
                Return to focused lessons, thoughtful feedback, and a learning
                plan built around your ambitions.
              </p>
            </div>

            {/* Testimonial Box with Corner Brackets */}
            <div className="relative z-10 p-5">
              <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#f6c945]/75 rounded-tl-md" />
              <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#f6c945]/75 rounded-tr-md" />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#f6c945]/75 rounded-bl-md" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#f6c945]/75 rounded-br-md" />

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#f6c945] text-[#27123d] flex items-center justify-center font-serif font-black text-lg shrink-0 mt-0.5">
                  “
                </div>
                <div>
                  <p className="text-xs text-purple-100/95 leading-[1.6]">
                    &ldquo;Learnova gives every study session a clear sense of
                    direction.&rdquo;
                  </p>
                  <p className="text-[9px] font-bold tracking-[1.8px] mt-2.5 text-white/85 uppercase">
                    Elena Cruz · Product Design Student
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Right Login Form Panel */}
          <section className="px-8 py-10 md:px-14 md:py-12 flex flex-col justify-center bg-white">
            

            {/* Form Title */}
            <div className="mb-7">
              <h2 className="text-[28px] font-bold text-[#27123d] tracking-tight mb-2">
                Welcome back
              </h2>
              <p className="text-[13px] text-gray-500 leading-relaxed">
                Sign in to continue your learning journey and see what is next
                on your path.
              </p>
            </div>

            {/* Backend Error Banner */}
            {message && (
              <div
                role="alert"
                className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600 font-medium"
              >
                {message}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={submit} className="space-y-4" noValidate>
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-[#27123d] mb-2"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="maya@email.com"
                  value={values.email}
                  onChange={(e) => setField('email', e.target.value)}
                  className={`w-full h-11 px-4 rounded-xl border ${
                    errors.email ? 'border-red-400 bg-red-50/20' : 'border-gray-200/90 bg-[#fafafa]'
                  } text-[13px] text-gray-800 placeholder:text-gray-400 outline-none transition focus:bg-white focus:border-[#6b46c1] focus:ring-2 focus:ring-[#6b46c1]/10`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-[#27123d] mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={(e) => setField('password', e.target.value)}
                    className={`w-full h-11 px-4 pr-11 rounded-xl border ${
                      errors.password ? 'border-red-400 bg-red-50/20' : 'border-gray-200/90 bg-[#fafafa]'
                    } text-[13px] text-gray-800 placeholder:text-gray-400 outline-none transition focus:bg-white focus:border-[#6b46c1] focus:ring-2 focus:ring-[#6b46c1]/10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#27123d] transition cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-1 pb-2 text-xs">
                <label className="flex items-center gap-2 text-gray-500 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={values.rememberMe}
                    onChange={(e) => setField('rememberMe', e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-gray-300 accent-[#6b46c1] cursor-pointer"
                  />
                  Remember me
                </label>

                <Link
                  to="/forgot-password"
                  className="font-semibold text-[#6b46c1] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl bg-[#f6c945] hover:bg-[#eab932] disabled:opacity-60 disabled:cursor-not-allowed text-[#27123d] font-bold text-[13px] flex items-center justify-center gap-2.5 transition shadow-sm cursor-pointer"
              >
                {loading ? 'Signing in...' : 'Sign in to Learnova'}
                {!loading && <ArrowRight size={15} strokeWidth={2.5} />}
              </button>
            </form>

            {/* Bottom Sign-up Link */}
            <p className="text-center text-xs text-gray-500 mt-6">
              New here?{' '}
              <Link
                to="/signup"
                className="font-semibold text-[#6b46c1] hover:underline"
              >
                Create an account
              </Link>
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-[11px] text-gray-500">
        © 2026 Learnova · Private, secure learning for every student
      </footer>
    </div>
  )
}
