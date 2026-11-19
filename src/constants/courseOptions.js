// Values must match what the Django API accepts/returns. Agree these with the backend developer.

export const COURSE_TYPES = [
  { value: 'all', label: 'All' },
  { value: 'one_year', label: '1 year' },
  { value: 'crash', label: 'Crash' },
  { value: 'weekend', label: 'Weekend' },
]

export const TYPE_LABELS = {
  one_year: '1 year course',
  crash: 'Crash course',
  weekend: 'Weekend course',
}

export const LEARNING_MODES = [
  { value: 'all', label: 'All modes' },
  { value: 'live_online', label: 'Live online' },
  { value: 'classroom', label: 'Classroom' },
  { value: 'hybrid', label: 'Hybrid' },
]

export const MODE_LABELS = {
  live_online: 'Live online',
  classroom: 'Classroom',
  hybrid: 'Hybrid',
}

export const SORT_OPTIONS = [
  { value: 'popular', label: 'Most popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'fee_asc', label: 'Fee: low to high' },
  { value: 'fee_desc', label: 'Fee: high to low' },
]