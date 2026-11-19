import { GraduationCap, ArrowRight, Play } from 'lucide-react'
import Button from '@/components/ui/Button'
import Reveal from './Reveal'

function DashboardPreview() {
  return (
    <div className="relative mx-auto mt-16 max-w-5xl">
      <div className="absolute -inset-5 rounded-[2rem] bg-blue-400/20 blur-3xl" />

      <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white p-4 shadow-2xl shadow-blue-900/15 sm:p-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <GraduationCap size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Institute Dashboard</p>
              <p className="text-xs text-slate-400">Overview / 2026</p>
            </div>
          </div>
          <div className="hidden rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600 sm:block">
            ● System Active
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 py-5 sm:grid-cols-4">
          {[
            ['Total Students', '2,480', '+12.5%'],
            ['Active Batches', '36', '+4.2%'],
            ['Fee Collection', '₹8.4L', '+18.2%'],
            ['Placement Rate', '92%', '+8.4%'],
          ].map(([title, value, change]) => (
            <div key={title} className="rounded-xl border border-slate-100 bg-slate-50 p-3 sm:p-4">
              <p className="text-xs text-slate-500">{title}</p>
              <p className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">{value}</p>
              <p className="mt-1 text-xs font-medium text-green-600">{change}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
          <div className="rounded-xl border border-slate-100 p-4">
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-slate-800">Student Enrolment</p>
              <span className="text-xs text-slate-400">This year</span>
            </div>
            <div className="mt-6 flex h-36 items-end gap-3">
              {[35, 52, 43, 70, 58, 85, 68, 95, 78, 88, 72, 100].map((height, index) => (
                <div
                  key={index}
                  style={{ height: `${height}%` }}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-blue-600 to-sky-400"
                />
              ))}
            </div>
            <div className="mt-3 flex justify-between text-xs text-slate-400">
              {['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Dec'].map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 p-4">
            <p className="text-sm font-semibold text-slate-800">Recent Activities</p>
            <div className="mt-5 space-y-5">
              {[
                ['New student enrolled', '2 minutes ago'],
                ['Fee payment received', '15 minutes ago'],
                ['New batch created', '1 hour ago'],
                ['Certificate generated', '3 hours ago'],
              ].map(([title, time]) => (
                <div key={title} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                  <div>
                    <p className="text-xs font-medium text-slate-700">{title}</p>
                    <p className="mt-1 text-xs text-slate-400">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-700 via-blue-400 to-sky-200 px-5 pb-20 sm:pb-28">
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-500/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-40 h-96 w-96 rounded-full bg-indigo-300/40 blur-3xl" />

      <Reveal className="relative z-10 mx-auto max-w-5xl pt-44 text-center sm:pt-52">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-5 py-2 text-xs font-semibold text-blue-700 shadow-sm sm:text-sm">
          ✨ Your institute, intelligently connected
        </span>

        <h1 className="mx-auto mt-8 max-w-5xl text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl md:text-7xl">
          The smarter way to
          <br className="hidden sm:block" /> train, manage and place
          <span className="text-white"> students.</span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-800 sm:text-lg">
          Everything your institute needs, from student admissions and attendance to fee
          management, learning and placements. All in one powerful platform.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/login">
            Get Started for Free
            <ArrowRight size={18} />
          </Button>
          <Button variant="secondary" href="#features">
            <Play size={16} />
            Explore Features
          </Button>
        </div>

        <p className="mt-5 text-xs font-medium text-slate-700 sm:text-sm">
          No complicated setup · Everything in one place
        </p>
      </Reveal>

      <Reveal className="relative z-10" delay={120}>
        <DashboardPreview />
      </Reveal>
    </section>
  )
}
