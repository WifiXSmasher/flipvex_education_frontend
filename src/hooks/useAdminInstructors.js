import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchUsers, createUser as createUserRequest, deactivateUser, activateUser } from '@/api/users'
import { getErrorMessage, getFieldErrors } from '@/api/errors'

const SEARCH_DELAY_MS = 400

// The UI says "instructor", but the backend role value is "teacher"
const INSTRUCTOR_ROLE = 'teacher'

export function useAdminInstructors() {
  const [instructors, setInstructors] = useState([])
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All') // 'All' | 'Active' | 'Inactive'

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  // Ignore responses from older requests (fast typing, quick filter changes)
  const requestId = useRef(0)

  const loadInstructors = useCallback(async (query, status) => {
    const id = ++requestId.current
    setIsLoading(true)
    setError('')
    try {
      const params = {
        role: INSTRUCTOR_ROLE,
        search: query,
      }
      if (status === 'Active') params.isActive = true
      if (status === 'Inactive') params.isActive = false

      const data = await fetchUsers(params)
      if (id !== requestId.current) return
      setInstructors(data.results)
      setCount(data.count)
    } catch (err) {
      if (id !== requestId.current) return
      setError(getErrorMessage(err, 'Unable to load instructors.'))
    } finally {
      if (id === requestId.current) setIsLoading(false)
    }
  }, [])

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), SEARCH_DELAY_MS)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    loadInstructors(debouncedSearch, statusFilter)
  }, [debouncedSearch, statusFilter, loadInstructors])

  const openModal = useCallback(() => {
    setFormErrors({})
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    if (isCreating) return
    setFormErrors({})
    setIsModalOpen(false)
  }, [isCreating])

  // Returns true on success, false on failure
  const createInstructor = useCallback(
    async (formData) => {
      setIsCreating(true)
      setFormErrors({})
      try {
        const payload = {
          role: INSTRUCTOR_ROLE,
          email: formData.email.trim(),
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          phone: formData.phone?.trim() || '',
          // Optional. If empty, the instructor sets their own via "Forgot password"
          password: formData.password || undefined,
        }
        await createUserRequest(payload)
        setIsModalOpen(false)
        await loadInstructors(debouncedSearch, statusFilter)
        return true
      } catch (err) {
        const { non_field_errors, ...fields } = getFieldErrors(err)
        const hasFieldErrors = Object.keys(fields).length > 0
        setFormErrors(
          hasFieldErrors && !non_field_errors
            ? fields
            : { ...fields, form: non_field_errors || getErrorMessage(err, 'Unable to create instructor.') }
        )
        return false
      } finally {
        setIsCreating(false)
      }
    },
    [debouncedSearch, statusFilter, loadInstructors]
  )

  const toggleInstructorStatus = useCallback(
    async (instructor) => {
      try {
        if (instructor.is_active) {
          await deactivateUser(instructor.id)
        } else {
          await activateUser(instructor.id)
        }
        await loadInstructors(debouncedSearch, statusFilter)
      } catch (err) {
        setError(getErrorMessage(err, 'Failed to update instructor status.'))
      }
    },
    [debouncedSearch, statusFilter, loadInstructors]
  )

  const reload = useCallback(
    () => loadInstructors(debouncedSearch, statusFilter),
    [debouncedSearch, statusFilter, loadInstructors]
  )

  return {
    instructors,
    count,
    isLoading,
    error,
    reload,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    isModalOpen,
    openModal,
    closeModal,
    createInstructor,
    isCreating,
    formErrors,
    toggleInstructorStatus,
  }
}

export default useAdminInstructors