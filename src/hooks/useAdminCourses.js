import { useCallback, useEffect, useRef, useState } from 'react'
import {
  createCourse as createCourseRequest,
  fetchAdminCourses,
  fetchCategories,
} from '@/api/courses'
import { getErrorMessage, getFieldErrors } from '@/api/errors'

const SEARCH_DELAY_MS = 400

export function useAdminCourses() {
  const [courses, setCourses] = useState([])
  const [count, setCount] = useState(0)
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  // Ignore responses from older requests (e.g. fast typing in the search box)
  const requestId = useRef(0)

  const loadCourses = useCallback(async (query) => {
    const id = ++requestId.current
    setIsLoading(true)
    setError('')
    try {
      const data = await fetchAdminCourses({ search: query })
      if (id !== requestId.current) return
      setCourses(data.results)
      setCount(data.count)
    } catch (err) {
      if (id !== requestId.current) return
      setError(getErrorMessage(err, 'Unable to load courses.'))
    } finally {
      if (id === requestId.current) setIsLoading(false)
    }
  }, [])

  // Categories load once (the list is not paginated)
  useEffect(() => {
    let active = true
    fetchCategories()
      .then((data) => active && setCategories(data))
      .catch(() => active && setCategories([]))
    return () => {
      active = false
    }
  }, [])

  // Wait until the user stops typing before calling the API
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), SEARCH_DELAY_MS)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    loadCourses(debouncedSearch)
  }, [debouncedSearch, loadCourses])

  const openModal = useCallback(() => {
    setFormErrors({})
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    if (isCreating) return // don't close while saving
    setFormErrors({})
    setIsModalOpen(false)
  }, [isCreating])

  // Returns true on success, false on failure, so the form knows whether to reset
  const createCourse = useCallback(
    async (data) => {
      setIsCreating(true)
      setFormErrors({})
      try {
        await createCourseRequest(data)
        setIsModalOpen(false)
        await loadCourses(debouncedSearch)
        return true
      } catch (err) {
        const { non_field_errors, ...fields } = getFieldErrors(err)
        const hasFieldErrors = Object.keys(fields).length > 0
        setFormErrors(
          hasFieldErrors && !non_field_errors
            ? fields
            : { ...fields, form: non_field_errors || getErrorMessage(err, 'Unable to create course.') }
        )
        return false
      } finally {
        setIsCreating(false)
      }
    },
    [debouncedSearch, loadCourses]
  )

  const reload = useCallback(() => loadCourses(debouncedSearch), [debouncedSearch, loadCourses])

  return {
    courses,
    count,
    categories,
    isLoading,
    error,
    reload,
    search,
    setSearch,
    isModalOpen,
    openModal,
    closeModal,
    createCourse,
    isCreating,
    formErrors,
  }
}

export default useAdminCourses