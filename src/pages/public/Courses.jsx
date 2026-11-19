import { Link } from 'react-router'
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Clock,
  GraduationCap,
  Radio,
  Search,
  SearchX,
  Star,
  Zap,
} from 'lucide-react'
import { useCourses } from '@/hooks/useCourses'
import {
  COURSE_TYPES,
  LEARNING_MODES,
  MODE_LABELS,
  SORT_OPTIONS,
  TYPE_LABELS,
} from '@/constants/courseOptions'

/* ---------- display helpers (design only) ---------- */

const COVER = {
  one_year: { gradient: 'from-forest-600 to-forest-900', Icon: GraduationCap },
  crash: { gradient: 'from-gold-500 to-amber-700', Icon: Zap },
  weekend: { gradient: 'from-emerald-600 to-forest-700', Icon: CalendarDays },
}

const formatFee = (n) => `₹${new Intl.NumberFormat('en-IN').format(n)}`
const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'To be announced'

/* ---------- small local components ---------- */

function CourseCard({ course }) {
  const cover = COVER[course.type] ?? COVER.one_year
  const { Icon } = cover

  return (
    <article className="flex flex-col rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className={`relative flex h-44 items-center justify-center rounded-2xl bg-gradient-to-br ${cover.gradient}`}>
        <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-forest-800">
          {TYPE_LABELS[course.type] ?? 'Course'}
        </span>
        {course.seatsLeft !== null && course.seatsLeft <= 10 && (
          <span className="absolute right-3 top-3 rounded-full bg-forest-900/70 px-3 py-1 text-xs font-semibold text-white">
            {course.seatsLeft} seats left
          </span>
        )}
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/40 bg-white/20 text-white">
          <Icon size={36} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-semibold leading-snug text-slate-900">{course.name}</h3>
        {course.instructor && <p className="mt-1 text-sm text-slate-500">with {course.instructor}</p>}

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={15} />
            {course.durationWeeks} weeks
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Radio size={15} />
            {MODE_LABELS[course.mode] ?? course.mode}
          </span>
        </div>

        {course.rating && (
          <div className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-slate-800">
            <Star size={15} className="fill-gold-500 text-gold-500" />
            {course.rating}
            <span className="font-normal text-slate-500">({course.reviewCount} reviews)</span>
          </div>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-dashed border-slate-200 pt-4">
          <div>
            <p className="text-xs text-slate-500">Course fee</p>
            <p className="text-lg font-semibold text-slate-900">{formatFee(course.fee)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Next batch</p>
            <p className="text-sm font-semibold text-slate-900">{formatDate(course.nextBatch)}</p>
          </div>
          <Link
            to={`/courses/${course.id}`}
            className="rounded-xl bg-forest-800 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-forest-700"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  )
}

function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-3">
      <div className="h-44 rounded-2xl bg-slate-200" />
      <div className="space-y-3 p-4">
        <div className="h-5 w-3/4 rounded bg-slate-200" />
        <div className="h-4 w-1/2 rounded bg-slate-200" />
        <div className="h-4 w-2/3 rounded bg-slate-200" />
        <div className="h-10 rounded bg-slate-100" />
      </div>
    </div>
  )
}

function Pagination({ page, totalPages, onChange }) {
  const pageBtn = 'flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-semibold transition'
  return (
    <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className={`${pageBtn} bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40`}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-current={n === page ? 'page' : undefined}
          className={`${pageBtn} ${n === page ? 'bg-forest-800 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
        >
          {n}
        </button>
      ))}
      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className={`${pageBtn} bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40`}
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  )
}

/* ---------- page ---------- */

export default function Courses() {
  const { courses, count, totalPages, filters, setFilter, resetFilters, page, setPage, loading, error, retry } =
    useCourses()

  const goToPage = (n) => {
    setPage(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const selectClass =
    'h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-forest-600'

  return (
    <>
      {/* Header band (pt-36 leaves room for the floating navbar) */}
      <section className="bg-forest-900 px-5 pb-16 pt-36 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Courses</h1>
          <p className="mt-4 max-w-xl text-lg text-white/70">
            Pick a one year program, a crash course or a weekend batch. Learn live, in a classroom or both.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-12">
        <div className="mx-auto max-w-7xl">
          {/* Toolbar */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {COURSE_TYPES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setFilter('type', t.value)}
                  className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                    filters.type === t.value
                      ? 'border-forest-800 bg-forest-800 text-white'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-forest-600'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 focus-within:border-forest-600">
                <Search size={17} className="text-slate-400" />
                <input
                  type="search"
                  value={filters.search}
                  onChange={(e) => setFilter('search', e.target.value)}
                  placeholder="Search courses or instructors"
                  className="w-56 bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>
              <select value={filters.mode} onChange={(e) => setFilter('mode', e.target.value)} className={selectClass}>
                {LEARNING_MODES.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
              <select value={filters.ordering} onChange={(e) => setFilter('ordering', e.target.value)} className={selectClass}>
                {SORT_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          <p className="mt-6 text-sm text-slate-500" aria-live="polite">
            {loading && courses.length === 0 ? 'Loading courses...' : `${count} ${count === 1 ? 'course' : 'courses'}`}
          </p>

          {/* Results */}
          <div className="mt-4">
            {error ? (
              <div className="flex flex-col items-center rounded-3xl border border-red-100 bg-white px-6 py-16 text-center">
                <CircleAlert size={36} className="text-red-500" />
                <p className="mt-4 font-semibold text-slate-900">{error}</p>
                <button type="button" onClick={retry} className="mt-6 rounded-xl bg-forest-800 px-6 py-3 text-sm font-bold text-white hover:bg-forest-700">
                  Try again
                </button>
              </div>
            ) : loading && courses.length === 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }, (_, i) => <CardSkeleton key={i} />)}
              </div>
            ) : courses.length === 0 ? (
              <div className="flex flex-col items-center rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center">
                <SearchX size={36} className="text-slate-400" />
                <p className="mt-4 font-semibold text-slate-900">No courses match these filters</p>
                <p className="mt-1 text-sm text-slate-500">Try a different search or clear the filters.</p>
                <button type="button" onClick={resetFilters} className="mt-6 rounded-xl bg-forest-800 px-6 py-3 text-sm font-bold text-white hover:bg-forest-700">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 transition-opacity sm:grid-cols-2 lg:grid-cols-3 ${loading ? 'opacity-60' : ''}`}>
                {courses.map((course) => <CourseCard key={course.id} course={course} />)}
              </div>
            )}
          </div>

          {!error && totalPages > 1 && <Pagination page={page} totalPages={totalPages} onChange={goToPage} />}
        </div>
      </section>
    </>
  )
}