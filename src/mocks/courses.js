// Mock data shaped like the planned Django response (snake_case, DRF decimals as strings).
// Delete this file once GET /api/courses/ is live.

const MOCK_COURSES = [
  { course_id: 1, course_name: 'Full Stack Web Development', course_type: 'one_year', duration_weeks: 48, total_fee: '58000.00', learning_mode: 'hybrid', instructor_name: 'Rahul Nair', rating: 4.8, review_count: 312, next_batch_date: '2026-12-02', seats_left: 12, created_at: '2026-06-01' },
  { course_id: 2, course_name: 'Data Analytics', course_type: 'crash', duration_weeks: 6, total_fee: '12500.00', learning_mode: 'live_online', instructor_name: 'Dr. Anjali Menon', rating: 4.9, review_count: 186, next_batch_date: '2026-11-25', seats_left: 8, created_at: '2026-07-10' },
  { course_id: 3, course_name: 'UI/UX Design', course_type: 'weekend', duration_weeks: 12, total_fee: '18000.00', learning_mode: 'classroom', instructor_name: 'Sneha Pillai', rating: 4.7, review_count: 142, next_batch_date: '2026-11-28', seats_left: 15, created_at: '2026-08-04' },
  { course_id: 4, course_name: 'Python Programming', course_type: 'crash', duration_weeks: 4, total_fee: '7500.00', learning_mode: 'live_online', instructor_name: 'Arun Krishnan', rating: 4.8, review_count: 254, next_batch_date: '2026-11-24', seats_left: 20, created_at: '2026-05-20' },
  { course_id: 5, course_name: 'Digital Marketing', course_type: 'weekend', duration_weeks: 10, total_fee: '15000.00', learning_mode: 'hybrid', instructor_name: 'Divya Varma', rating: 4.6, review_count: 98, next_batch_date: '2026-11-29', seats_left: 6, created_at: '2026-09-12' },
  { course_id: 6, course_name: 'Spoken English and Communication', course_type: 'weekend', duration_weeks: 8, total_fee: '9000.00', learning_mode: 'hybrid', instructor_name: 'Mohammed Faisal', rating: 4.7, review_count: 121, next_batch_date: '2026-11-30', seats_left: 18, created_at: '2026-04-02' },
  { course_id: 7, course_name: 'Excel and Reporting', course_type: 'crash', duration_weeks: 3, total_fee: '5500.00', learning_mode: 'live_online', instructor_name: 'Dr. Anjali Menon', rating: 4.5, review_count: 77, next_batch_date: '2026-12-05', seats_left: 25, created_at: '2026-10-08' },
  { course_id: 8, course_name: 'Career Foundation Program', course_type: 'one_year', duration_weeks: 40, total_fee: '36000.00', learning_mode: 'classroom', instructor_name: 'Mohammed Faisal', rating: 4.6, review_count: 64, next_batch_date: '2026-12-10', seats_left: 10, created_at: '2026-03-15' },
]

const SORTERS = {
  '-review_count': (a, b) => b.review_count - a.review_count,
  '-created_at': (a, b) => new Date(b.created_at) - new Date(a.created_at),
  total_fee: (a, b) => Number(a.total_fee) - Number(b.total_fee),
  '-total_fee': (a, b) => Number(b.total_fee) - Number(a.total_fee),
}

// Accepts the same query params the real endpoint will (see api/courses.js)
// and returns the same paginated shape: { count, results }.
export async function mockFetchCourses({ search, course_type, learning_mode, ordering, page = 1, page_size = 6 }) {
  await new Promise((resolve) => setTimeout(resolve, 400)) // fake network delay

  let rows = [...MOCK_COURSES]

  if (search) {
    const q = search.toLowerCase()
    rows = rows.filter(
      (c) => c.course_name.toLowerCase().includes(q) || c.instructor_name.toLowerCase().includes(q)
    )
  }
  if (course_type) rows = rows.filter((c) => c.course_type === course_type)
  if (learning_mode) rows = rows.filter((c) => c.learning_mode === learning_mode)

  rows.sort(SORTERS[ordering] ?? SORTERS['-review_count'])

  const start = (page - 1) * page_size
  return { count: rows.length, results: rows.slice(start, start + page_size) }
}