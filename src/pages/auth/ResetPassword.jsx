
import { useMemo, useState } from "react";
import { Link } from "react-router";
import {
  GraduationCap,
  Mail,
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  CircleCheck,
  Circle,
  AlertCircle,
} from "lucide-react";
import { useResetPassword } from "@/hooks/useResetPassword";

export default function ResetPassword() {
  const { values, errors, loading, message, success, setField, submit } = useResetPassword();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const rules = useMemo(() => ({
    length: values.password.length >= 8,
    uppercase: /[A-Z]/.test(values.password),
    lowercase: /[a-z]/.test(values.password),
    number: /[0-9]/.test(values.password),
    special: /[^A-Za-z0-9]/.test(values.password),
  }), [values.password]);

  const passwordsMatch =
    values.password.length > 0 && values.password === values.confirm;

  const PasswordRule = ({ valid, children }) => (
    <div className={`flex items-center gap-2 text-xs ${
      valid ? "text-green-600" : "text-slate-400"
    }`}>
      {valid ? <CircleCheck size={15} /> : <Circle size={15} />}
      {children}
    </div>
  );

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-500 to-sky-200 px-4 py-10">

      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-blue-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">

        {/* Branding */}
        <Link to="/" className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-lg">
            <GraduationCap size={29} />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white">
            Learnova
          </span>
        </Link>

        <div className="rounded-3xl border border-white/60 bg-white p-7 shadow-2xl shadow-blue-950/20 sm:p-10">

          {success ? (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
                <CheckCircle2 size={35} />
              </div>

              <h1 className="mt-7 text-center text-2xl font-extrabold text-slate-900">
                Password reset successful!
              </h1>

              <p className="mt-3 text-center text-sm leading-7 text-slate-500">
                Your password has been updated successfully.
                You can now sign in using your new password.
              </p>

              <Link
                to="/login"
                className="mt-8 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Continue to Sign In <ArrowRight size={17} />
              </Link>
            </>
          ) : (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <ShieldCheck size={27} />
              </div>

              <h1 className="mt-7 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Reset your password
              </h1>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Enter your email, the 6-digit OTP code sent to your inbox, and choose a new password.
              </p>

              <form onSubmit={submit} className="mt-8 space-y-4">

                {/* Email */}
                <div>
                  <label htmlFor="reset-email" className="mb-1.5 block text-xs font-semibold text-slate-800">
                    Email address
                  </label>
                  <div className={`flex h-12 items-center gap-3 rounded-xl border px-3.5 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 ${
                    errors.email ? "border-red-400" : "border-slate-200"
                  }`}>
                    <Mail size={17} className="shrink-0 text-slate-400" />
                    <input
                      id="reset-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={values.email}
                      onChange={(e) => setField("email", e.target.value)}
                      className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                {/* OTP */}
                <div>
                  <label htmlFor="reset-otp" className="mb-1.5 block text-xs font-semibold text-slate-800">
                    6-digit OTP code
                  </label>
                  <div className={`flex h-12 items-center gap-3 rounded-xl border px-3.5 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 ${
                    errors.otp ? "border-red-400" : "border-slate-200"
                  }`}>
                    <KeyRound size={17} className="shrink-0 text-slate-400" />
                    <input
                      id="reset-otp"
                      name="otp"
                      type="text"
                      maxLength={6}
                      placeholder="123456"
                      value={values.otp}
                      onChange={(e) => setField("otp", e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-transparent font-mono tracking-widest text-sm outline-none placeholder:tracking-normal placeholder:font-sans placeholder:text-slate-400"
                    />
                  </div>
                  {errors.otp && <p className="mt-1 text-xs text-red-500">{errors.otp}</p>}
                </div>

                {/* New password */}
                <div>
                  <label htmlFor="new-password" className="mb-1.5 block text-xs font-semibold text-slate-800">
                    New password
                  </label>

                  <div className={`flex h-12 items-center gap-3 rounded-xl border px-3.5 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 ${
                    errors.password ? "border-red-400" : "border-slate-200"
                  }`}>
                    <Lock size={17} className="shrink-0 text-slate-400" />

                    <input
                      id="new-password"
                      name="new_password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Enter new password"
                      value={values.password}
                      onChange={(e) => setField("password", e.target.value)}
                      className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-blue-600"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                </div>

                {/* Password requirements */}
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                  <p className="mb-2.5 text-[11px] font-bold text-slate-700">
                    Password requirements
                  </p>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <PasswordRule valid={rules.length}>
                      At least 8 characters
                    </PasswordRule>
                    <PasswordRule valid={rules.uppercase}>
                      One uppercase letter
                    </PasswordRule>
                    <PasswordRule valid={rules.lowercase}>
                      One lowercase letter
                    </PasswordRule>
                    <PasswordRule valid={rules.number}>
                      One number
                    </PasswordRule>
                    <PasswordRule valid={rules.special}>
                      One special character
                    </PasswordRule>
                  </div>
                </div>

                {/* Confirm password */}
                <div>
                  <label htmlFor="confirm-password" className="mb-1.5 block text-xs font-semibold text-slate-800">
                    Confirm new password
                  </label>

                  <div className={`flex h-12 items-center gap-3 rounded-xl border px-3.5 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 ${
                    errors.confirm ? "border-red-400" : "border-slate-200"
                  }`}>
                    <Lock size={17} className="shrink-0 text-slate-400" />

                    <input
                      id="confirm-password"
                      name="confirm_password"
                      type={showConfirm ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Re-enter new password"
                      value={values.confirm}
                      onChange={(e) => setField("confirm", e.target.value)}
                      className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="text-slate-400 hover:text-blue-600"
                      aria-label={showConfirm ? "Hide confirmation" : "Show confirmation"}
                    >
                      {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>

                  {values.confirm && (
                    <p className={`mt-1.5 flex items-center gap-1.5 text-xs ${
                      passwordsMatch ? "text-green-600" : "text-red-500"
                    }`}>
                      {passwordsMatch ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
                      {passwordsMatch ? "Passwords match" : "Passwords do not match"}
                    </p>
                  )}
                  {errors.confirm && <p className="mt-1 text-xs text-red-500">{errors.confirm}</p>}
                </div>

                {message && (
                  <div role="alert" className="rounded-xl border border-red-100 bg-red-50 p-3 text-xs text-red-600">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Updating password..." : "Reset Password"}
                  {!loading && <ArrowRight size={17} />}
                </button>
              </form>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck size={15} className="text-green-500" />
                All active sessions will be terminated upon reset.
              </div>
            </>
          )}

          <div className="mt-7 border-t border-slate-100 pt-6 flex items-center justify-between text-xs font-semibold">
            <Link
              to="/forgot-password"
              className="text-slate-500 hover:text-slate-800"
            >
              Request new OTP
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft size={15} /> Back to Sign In
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-white/80">
          © 2026 Learnova. All rights reserved.
        </p>
      </div>
    </main>
  );
}
