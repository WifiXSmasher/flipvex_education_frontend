import { useState } from 'react'
import { useNavigate } from 'react-router'
import { requestPasswordReset } from '@/api/auth'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const submit = async (e) => {
    if (e && e.preventDefault) e.preventDefault()
    setError('')
    const trimmed = email.trim()
    if (!EMAIL_RE.test(trimmed)) {
      setError('Enter a valid email address')
      return false
    }
    try {
      setLoading(true)
      await requestPasswordReset(trimmed)
      setSent(true)
      return true
    } catch (err) {
      setError(err?.response?.data?.detail || 'Unable to process your request. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }

  const proceedToReset = () => {
    navigate(`/reset-password?email=${encodeURIComponent(email.trim())}`)
  }

  return { email, setEmail, error, setError, loading, sent, submit, proceedToReset }
}
