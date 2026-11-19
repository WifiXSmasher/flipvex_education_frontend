
import { useState } from 'react'
import { Link } from 'react-router'
import { Eye, EyeOff, KeyRound, Mail, CheckCircle2, ArrowRight, RefreshCw } from 'lucide-react'
import useSignup from '@/hooks/useSignup'

export default function SignupForm() {
  const {
    formData,
    errors,
    loading,
    step,
    otp,
    setOtp,
    resending,
    resendMessage,
    handleChange,
    handleSubmit,
    handleVerifyOTP,
    handleResendOTP,
  } = useSignup()

  const [showPassword, setShowPassword] = useState(false)

  const fields = [
    { name: 'first_name', label: 'First Name', placeholder: 'Enter first name' },
    { name: 'last_name', label: 'Last Name', placeholder: 'Enter last name' },
    { name: 'email', label: 'Email Address', placeholder: 'you@example.com', type: 'email' },
    { name: 'phone', label: 'Phone Number (Optional)', placeholder: '10-digit phone number', type: 'tel' },
  ]

  if (step === 'success') {
    return (
      <div className="py-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
          <CheckCircle2 size={36} />
        </div>
        <h2 className="mt-5 text-xl font-bold text-slate-900">Account verified!</h2>
        <p className="mt-2 text-sm text-slate-500">
          Your email has been successfully verified. You can now sign in to your account.
        </p>
        <Link
          to="/login"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
        >
          Sign In Now <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  if (step === 'otp') {
    return (
      <form onSubmit={handleVerifyOTP} className="space-y-5">
        <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-2">
            <Mail size={18} />
          </div>
          <p className="text-xs font-semibold text-blue-900">OTP Sent</p>
          <p className="mt-1 text-xs text-slate-600">
            We sent a 6-digit verification code to <b className="text-slate-800">{formData.email}</b>.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Enter 6-digit OTP
          </label>
          <div className="relative">
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="123456"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-11 font-mono text-center tracking-[0.3em] text-base outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:tracking-normal placeholder:font-sans"
              required
            />
            <KeyRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          {errors.otp && (
            <p className="mt-1 text-xs text-red-500">
              {Array.isArray(errors.otp) ? errors.otp[0] : errors.otp}
            </p>
          )}
        </div>

        {errors.detail && (
          <p className="text-xs text-red-500">{errors.detail}</p>
        )}

        {resendMessage && (
          <p className="text-xs text-blue-600 text-center font-medium">{resendMessage}</p>
        )}

        <button
          type="submit"
          disabled={loading || otp.length !== 6}
          className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Verifying...' : 'Verify Email & Complete Registration'}
        </button>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={resending}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 disabled:opacity-50"
          >
            <RefreshCw size={13} className={resending ? 'animate-spin' : ''} />
            {resending ? 'Resending OTP...' : 'Resend OTP'}
          </button>
        </div>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
              {field.label}
            </label>

            <input
              type={field.type || 'text'}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />

            {errors[field.name] && (
              <p className="mt-1 text-xs text-red-500">
                {Array.isArray(errors[field.name])
                  ? errors[field.name][0]
                  : errors[field.name]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-slate-700">
          Password
        </label>

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="At least 8 characters"
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-12 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>

        {errors.password && (
          <p className="mt-1 text-xs text-red-500">
            {Array.isArray(errors.password)
              ? errors.password[0]
              : errors.password}
          </p>
        )}
      </div>

      {errors.non_field_errors && (
        <p className="text-xs text-red-500">
          {Array.isArray(errors.non_field_errors)
            ? errors.non_field_errors[0]
            : errors.non_field_errors}
        </p>
      )}

      {errors.detail && (
        <p className="text-xs text-red-500">
          {Array.isArray(errors.detail) ? errors.detail[0] : errors.detail}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  )
}

