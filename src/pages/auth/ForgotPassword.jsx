
import { Link } from "react-router";
import {
  GraduationCap,
  Mail,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
  KeyRound,
} from "lucide-react";
import { useForgotPassword } from "@/hooks/useForgotPassword";

export default function ForgotPassword() {
  const { email, setEmail, error, loading, sent, submit, proceedToReset } = useForgotPassword();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-500 to-sky-200 px-4 py-10">

      {/* Background decoration */}
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

        {/* Card */}
        <div className="rounded-3xl border border-white/60 bg-white p-7 shadow-2xl shadow-blue-950/20 sm:p-10">

          {!sent ? (
            <>
              {/* Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Mail size={27} />
              </div>

              <h1 className="mt-7 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Forgot your password?
              </h1>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Don't worry! Enter your registered email address
                and we'll send you an OTP to reset your password.
              </p>

              <form onSubmit={submit} className="mt-8 space-y-5">

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Email address
                  </label>

                  <div className={`flex h-13 items-center gap-3 rounded-xl border px-4 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 ${
                    error ? "border-red-400" : "border-slate-200"
                  }`}>
                    <Mail size={19} className="shrink-0 text-slate-400" />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    />
                  </div>

                  {error && (
                    <p role="alert" className="mt-2 text-xs text-red-500">
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:opacity-60"
                >
                  {loading ? "Sending OTP..." : "Send Reset OTP"}
                  {!loading && <ArrowRight size={17} />}
                </button>
              </form>

              <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck size={15} className="text-green-500" />
                Your account security is our priority.
              </div>
            </>
          ) : (
            <>
              {/* Confirmation state */}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
                <CheckCircle2 size={34} />
              </div>

              <h1 className="mt-7 text-center text-2xl font-extrabold text-slate-900">
                Check your email
              </h1>

              <p className="mt-3 text-center text-sm leading-7 text-slate-500">
                If an account exists with this email, an OTP code has been sent.
              </p>

              <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-xs font-semibold text-blue-800">
                  Recovery email address
                </p>
                <p className="mt-1 break-all text-sm font-medium text-blue-700">
                  {email}
                </p>
              </div>

              <div className="mt-6 space-y-3 text-sm text-slate-500">
                <p>Things to check:</p>
                <ul className="list-inside list-disc space-y-2 text-xs leading-6">
                  <li>Check your inbox and spam folder for the 6-digit OTP code.</li>
                  <li>The OTP is valid for 10 minutes.</li>
                </ul>
              </div>

              <button
                type="button"
                onClick={proceedToReset}
                className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                <KeyRound size={17} />
                Enter OTP & Reset Password
              </button>

              <button
                type="button"
                onClick={submit}
                disabled={loading}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
              >
                <RefreshCw size={16} />
                {loading ? "Sending..." : "Resend OTP"}
              </button>
            </>
          )}

          <div className="mt-7 border-t border-slate-100 pt-6">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            >
              <ArrowLeft size={16} />
              Back to Sign In
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
