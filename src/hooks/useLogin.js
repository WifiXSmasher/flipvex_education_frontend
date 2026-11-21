import { useState } from 'react'
import { useAuth } from '@/auth/AuthContext'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useLogin() {
  const { login } = useAuth()
  const [values, setValues] = useState({ email: '', password: '', rememberMe: false })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((e) => ({ ...e, [name]: '' }))
  }

  const validate = () => {
    const next = {}
    if (!values.email.trim()) next.email = 'Email address is required'
    else if (!EMAIL_RE.test(values.email)) next.email = 'Enter a valid email address'
    if (!values.password) next.password = 'Password is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    setMessage('')
    if (!validate()) return

    try {
      setLoading(true)
      await login({ ...values, email: values.email.trim() })
      // redirect happens in GuestRoute once `user` is set
    } catch (err) {
      const status = err.response?.status
      if (!err.response) setMessage('Unable to reach the server. Please try again.')
      else if (status === 400 || status === 401)
        setMessage(err.response.data?.detail || 'Invalid email or password.')
      else if (status >= 500) setMessage('Server error. Please try again later.')
      else setMessage('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return { values, errors, loading, message, setField, submit }
}

export default useLogin