// Turns an axios error into one message a user can read.
// The backend can return `detail` as a string OR an array, so both are handled.
export function getErrorMessage(err, fallback = 'Something went wrong. Please try again.') {
  if (!err.response) return 'Unable to reach the server. Please try again.'
  if (err.response.status === 429) return 'Too many attempts. Please wait a moment and try again.'
  if (err.response.status === 403) return 'You do not have permission to do this.'

  const detail = err.response.data?.detail
  if (Array.isArray(detail)) return detail[0]
  if (typeof detail === 'string') return detail
  return fallback
}

// { title: ['This field is required.'], fee: ['...'] } -> { title: 'This field is required.', fee: '...' }
// Keys with array values become field errors. `detail` is skipped (use getErrorMessage for it).
export function getFieldErrors(err) {
  const data = err.response?.data
  if (!data || typeof data !== 'object' || Array.isArray(data)) return {}

  return Object.fromEntries(
    Object.entries(data)
      .filter(([key, val]) => key !== 'detail' && Array.isArray(val) && val.length > 0)
      .map(([key, val]) => [key, String(val[0])])
  )
}