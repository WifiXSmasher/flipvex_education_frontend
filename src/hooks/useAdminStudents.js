import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchUsers, createUser as createUserRequest, deactivateUser, activateUser } from '@/api/users'
import { getErrorMessage, getFieldErrors } from '@/api/errors'

const SEARCH_DELAY_MS = 400

export function useAdminStudents() {
  const [students, setStudents] = useState([])
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All') // 'All' | 'Active' | 'Inactive'

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  const requestId = useRef(0)

  const loadStudents = useCallback(async (query, status) => {
    const id = ++requestId.current
    setIsLoading(true)
    setError('')
    try {
      const params = {
        role: 'student',
        search: query,
      }
      if (status === 'Active') params.isActive = true
      if (status === 'Inactive') params.isActive = false

      const data = await fetchUsers(params)
      if (id !== requestId.current) return
      setStudents(data.results)
      setCount(data.count)
    } catch (err) {
      if (id !== requestId.current) return
      setError(getErrorMessage(err, 'Unable to load students.'))
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
    loadStudents(debouncedSearch, statusFilter)
  }, [debouncedSearch, statusFilter, loadStudents])

  const openModal = useCallback(() => {
    setFormErrors({})
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    if (isCreating) return
    setFormErrors({})
    setIsModalOpen(false)
  }, [isCreating])

  const createStudent = useCallback(
    async (formData) => {
      setIsCreating(true)
      setFormErrors({})
      try {
        const payload = {
          role: 'student',
          email: formData.email.trim(),
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          phone: formData.phone?.trim() || '',
          password: formData.password || undefined,
        }
        await createUserRequest(payload)
        setIsModalOpen(false)
        await loadStudents(debouncedSearch, statusFilter)
        return true
      } catch (err) {
        const { non_field_errors, ...fields } = getFieldErrors(err)
        const hasFieldErrors = Object.keys(fields).length > 0
        setFormErrors(
          hasFieldErrors && !non_field_errors
            ? fields
            : { ...fields, form: non_field_errors || getErrorMessage(err, 'Unable to create student.') }
        )
        return false
      } finally {
        setIsCreating(false)
      }
    },
    [debouncedSearch, statusFilter, loadStudents]
  )

  const toggleStudentStatus = useCallback(
    async (student) => {
      try {
        if (student.is_active) {
          await deactivateUser(student.id)
        } else {
          await activateUser(student.id)
        }
        await loadStudents(debouncedSearch, statusFilter)
      } catch (err) {
        setError(getErrorMessage(err, 'Failed to update student status.'))
      }
    },
    [debouncedSearch, statusFilter, loadStudents]
  )

  const reload = useCallback(
    () => loadStudents(debouncedSearch, statusFilter),
    [debouncedSearch, statusFilter, loadStudents]
  )

  return {
    students,
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
    createStudent,
    isCreating,
    formErrors,
    toggleStudentStatus,
  }
}

export default useAdminStudents
