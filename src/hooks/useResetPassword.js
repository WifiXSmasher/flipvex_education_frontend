import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { confirmPasswordReset } from '@/api/auth'

export function useResetPassword() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [values, setValues] = useState({
    email: searchParams.get('email') || '',
    otp: searchParams.get('otp') || '',
    password: '',
    confirm: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((e) => ({ ...e, [name]: '' }))
  }

  const validate = () => {
    const next = {}
    if (!values.email.trim()) next.email = 'Email address is required'
    if (!values.otp.trim()) next.otp = '6-digit OTP code is required'
    else if (values.otp.trim().length !== 6) next.otp = 'OTP must be 6 digits'
    if (values.password.length < 8) next.password = 'Use at least 8 characters'
    if (values.confirm !== values.password) next.confirm = 'Passwords do not match'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = async (e) => {
    if (e && e.preventDefault) e.preventDefault()
    setMessage('')
    if (!validate()) return

    try {
      setLoading(true)
      await confirmPasswordReset({
        email: values.email.trim().toLowerCase(),
        otp: values.otp.trim(),
        new_password: values.password,
      })
      setSuccess(true)
    } catch (err) {
      const data = err?.response?.data
      setMessage(
        data?.otp?.[0] ||
        data?.new_password?.[0] ||
        data?.detail ||
        'Unable to reset password. Please check your OTP and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return { values, errors, loading, message, success, setField, submit }
}
