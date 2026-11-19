
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { validateSignup } from '@/utils/signupValidation'
import { registerRequest, verifyOTPRequest, resendOTPRequest } from '@/api/auth'

const initialFormData = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  password: '',
}

export default function useSignup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState('register') // 'register' | 'otp' | 'success'
  const [otp, setOtp] = useState('')
  const [resending, setResending] = useState(false)
  const [resendMessage, setResendMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: '',
      non_field_errors: '',
      detail: '',
    }))
  }

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault()

    const validationErrors = validateSignup(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setLoading(true)

    try {
      const payload = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      }
      if (formData.phone && formData.phone.trim()) {
        payload.phone = formData.phone.trim()
      }

      const response = await registerRequest(payload)
      setStep('otp')
      return response
    } catch (error) {
      const responseData = error.response?.data

      if (responseData && typeof responseData === 'object') {
        setErrors(responseData)
      } else {
        setErrors({
          non_field_errors: 'Registration failed. Please try again.',
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e) => {
    if (e && e.preventDefault) e.preventDefault()
    setErrors({})

    if (!otp.trim()) {
      setErrors({ otp: 'Please enter the 6-digit OTP' })
      return
    }

    setLoading(true)
    try {
      await verifyOTPRequest({
        email: formData.email.trim().toLowerCase(),
        otp: otp.trim(),
      })
      setStep('success')
    } catch (error) {
      const responseData = error.response?.data
      if (responseData && typeof responseData === 'object') {
        setErrors(responseData)
      } else {
        setErrors({ otp: 'Invalid or expired OTP. Please try again.' })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setResending(true)
    setResendMessage('')
    setErrors({})
    try {
      const res = await resendOTPRequest(formData.email.trim().toLowerCase())
      setResendMessage(res?.detail || 'New OTP sent to your email.')
    } catch (err) {
      setResendMessage(err?.response?.data?.detail || 'Unable to resend OTP at this time.')
    } finally {
      setResending(false)
    }
  }

  return {
    formData,
    errors,
    loading,
    step,
    otp,
    setOtp,
    resending,
    resendMessage,
    handleChange,
    handleSubmit,
    handleVerifyOTP,
    handleResendOTP,
  }
}

