import { Clock, Users, Star, ArrowRight, BookOpen } from 'lucide-react'

export default function CourseCard({ course }) {
  const Icon = course.icon

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white bg-white p-6 shadow-[0_10px_32px_-18px_rgba(30,64,175,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_-16px_rgba(37,99,235,0.23)] sm:p-7">
      {/* Soft gradient background */}
      <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-gradient-to-br from-blue-300/40 via-sky-200/30 to-indigo-300/40 blur-[60px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-indigo-50/30" />

      <div className="relative flex flex-1 flex-col">
        {/* Icon and badge */}
        <div className="flex items-center justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-700 shadow-sm">
            {Icon && <Icon size={25} strokeWidth={1.7} />}
          </div>

          <span className="rounded-full border border-blue-100 bg-blue-50/80 px-3 py-1.5 text-xs font-semibold text-blue-700">
            {course.badge}
          </span>
        </div>

        {/* Course information */}
        <div className="mt-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              {course.category}
            </span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span className="flex items-center gap-1 text-xs font-semibold text-amber-500">
              <Star size={13} fill="currentColor" />
              {course.rating}
            </span>
          </div>

          <h3 className="mt-2.5 text-xl font-bold tracking-tight text-slate-900">
            {course.title}
          </h3>

          <p className="mt-2.5 text-sm leading-6 text-slate-500">
            {course.description}
          </p>
        </div>

        {/* Course details */}
        <div className="mt-5 space-y-2.5">
          <div className="flex items-center gap-2.5 text-sm text-slate-600">
            <Clock size={15} className="text-blue-600" />
            {course.duration} learning program
          </div>

          <div className="flex items-center gap-2.5 text-sm text-slate-600">
            <Users size={15} className="text-blue-600" />
            {course.students}
          </div>

          <div className="flex items-center gap-2.5 text-sm text-slate-600">
            <BookOpen size={15} className="text-blue-600" />
            {course.level}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 border-t border-slate-100 pt-5">
          <a
            href="#enquiry"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:from-blue-700 hover:via-indigo-600 hover:to-indigo-700"
          >
            Explore Course
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <p className="mt-2.5 text-center text-xs text-slate-400">
            Enquire now to explore the curriculum
          </p>
        </div>
      </div>
    </article>
  )
}
