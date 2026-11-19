import api from './axios'
import { mockFetchCourses } from '@/mocks/courses'

// While the Django endpoint is not ready, put this in frontend/.env:
//   VITE_USE_MOCK_API=true
// When it is ready, set it to false (or remove it). Nothing else changes.
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true'

// UI sort option -> DRF `ordering` value
const ORDERING = {
  popular: '-review_count',
  newest: '-created_at',
  fee_asc: 'total_fee',
  fee_desc: '-total_fee',
}

// Backend (snake_case) -> the shape the pages use. If a field name changes in Django,
// fix it here and no page or hook needs to change.
const normalizeCourse = (c) => ({
  id: c.course_id,
  name: c.course_name,
  type: c.course_type,
  durationWeeks: c.duration_weeks,
  fee: Number(c.total_fee),
  mode: c.learning_mode,
  instructor: c.instructor_name ?? '',
  rating: c.rating ?? null,
  reviewCount: c.review_count ?? 0,
  nextBatch: c.next_batch_date ?? null,
  seatsLeft: c.seats_left ?? null,
})

/**
 * GET /api/courses/
 * Query params: search, course_type, learning_mode, ordering, page, page_size
 * Expected response (DRF PageNumberPagination): { count, results: [ ...courses ] }
 */
export async function fetchCourses({
  search = '',
  type = 'all',
  mode = 'all',
  ordering = 'popular',
  page = 1,
  pageSize = 6,
} = {}) {
  const params = { page, page_size: pageSize, ordering: ORDERING[ordering] ?? ORDERING.popular }
  if (search) params.search = search
  if (type !== 'all') params.course_type = type
  if (mode !== 'all') params.learning_mode = mode

  const data = USE_MOCK ? await mockFetchCourses(params) : (await api.get('/courses/', { params })).data

  return { count: data.count, results: data.results.map(normalizeCourse) }
}