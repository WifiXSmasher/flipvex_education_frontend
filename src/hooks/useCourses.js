import { useEffect, useState } from 'react'
import { fetchCourses } from '@/api/courses'

const PAGE_SIZE = 6
const DEFAULT_FILTERS = { search: '', type: 'all', mode: 'all', ordering: 'popular' }

export function useCourses() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [page, setPage] = useState(1)
  const [data, setData] = useState({ count: 0, results: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  // Wait until the user stops typing before calling the API
  useEffect(() => {
    if (filters.search === debouncedSearch) return
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search)
      setPage(1)
    }, 300)
    return () => clearTimeout(timer)
  }, [filters.search, debouncedSearch])

  // Load courses whenever a filter, the page or the retry counter changes
  useEffect(() => {
    let ignore = false // drops answers from outdated requests
    setLoading(true)
    setError('')

    fetchCourses({
      search: debouncedSearch,
      type: filters.type,
      mode: filters.mode,
      ordering: filters.ordering,
      page,
      pageSize: PAGE_SIZE,
    })
      .then((result) => {
        if (!ignore) setData(result)
      })
      .catch(() => {
        if (!ignore) setError('We could not load the courses. Please try again.')
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [debouncedSearch, filters.type, filters.mode, filters.ordering, page, reloadKey])

  const setFilter = (name, value) => {
    setFilters((f) => ({ ...f, [name]: value }))
    if (name !== 'search') setPage(1) // search resets the page after its delay
  }

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS)
    setDebouncedSearch('')
    setPage(1)
  }

  return {
    courses: data.results,
    count: data.count,
    totalPages: Math.max(1, Math.ceil(data.count / PAGE_SIZE)),
    filters,
    setFilter,
    resetFilters,
    page,
    setPage,
    loading,
    error,
    retry: () => setReloadKey((k) => k + 1),
  }
}